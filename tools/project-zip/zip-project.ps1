$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$excludedDirectories = @(
  ".git",
  ".cache",
  ".next",
  ".turbo",
  ".vite",
  ".superpowers",
  ".pnpm-store",
  "coverage",
  "dist",
  "node_modules",
  "storybook-static",
  "temp",
  "api-slot-kit"
)

$sourceRoot = (Resolve-Path ".").Path
$projectName = Split-Path $sourceRoot -Leaf
$outputPath = Join-Path (Split-Path $sourceRoot -Parent) "$projectName.zip"

function Normalize-PathForMatch {
  param ([string]$path)

  return $path.Replace("\", "/")
}

function Get-RelativePathCompat {
  param (
    [string]$BasePath,
    [string]$FullPath
  )

  $baseUri = New-Object System.Uri(($BasePath.TrimEnd("\") + "\"))
  $fullUri = New-Object System.Uri($FullPath)

  $relativeUri = $baseUri.MakeRelativeUri($fullUri)
  $relativePath = [System.Uri]::UnescapeDataString($relativeUri.ToString())

  return $relativePath.Replace("/", "\")
}

function Test-IsExcluded {
  param (
    [string]$RelativePath,
    [string]$AbsolutePath,
    [string]$OutputPath
  )

  $normalizedPath = Normalize-PathForMatch $RelativePath
  $segments = $normalizedPath.Split("/")
  $fileName = $segments[-1]

  if ($AbsolutePath -eq $OutputPath) {
    return $true
  }

  foreach ($segment in $segments) {
    if ($excludedDirectories -contains $segment) {
      return $true
    }
  }

  if (
    $fileName.EndsWith(".zip", [System.StringComparison]::Ordinal) -or
    $fileName.EndsWith(".log", [System.StringComparison]::Ordinal)
  ) {
    return $true
  }

  if (
    $fileName -eq ".env" -or
    ($fileName.StartsWith(".env.", [System.StringComparison]::Ordinal) -and $fileName -ne ".env.example")
  ) {
    return $true
  }

  return $false
}

if (Test-Path $outputPath) {
  Remove-Item $outputPath -Force
}

$outputDir = Split-Path $outputPath -Parent

if (!(Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$files = Get-ChildItem -Path $sourceRoot -Recurse -File -Force |
  Sort-Object FullName |
  Where-Object {
    $relativePath = Get-RelativePathCompat -BasePath $sourceRoot -FullPath $_.FullName

    -not (Test-IsExcluded `
      -RelativePath $relativePath `
      -AbsolutePath $_.FullName `
      -OutputPath $outputPath)
  }

$zip = [System.IO.Compression.ZipFile]::Open(
  $outputPath,
  [System.IO.Compression.ZipArchiveMode]::Create
)

try {
  foreach ($file in $files) {
    $relativePath = Get-RelativePathCompat -BasePath $sourceRoot -FullPath $file.FullName
    $entryName = Normalize-PathForMatch $relativePath

    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
      $zip,
      $file.FullName,
      $entryName,
      [System.IO.Compression.CompressionLevel]::Optimal
    ) | Out-Null
  }
}
finally {
  $zip.Dispose()
}

$zipInfo = Get-Item $outputPath

Write-Host "Created: $outputPath"
Write-Host "Files: $($files.Count), Size: $($zipInfo.Length.ToString('N0')) bytes"