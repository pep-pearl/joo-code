#!/usr/bin/env node

import { deflateRawSync } from "node:zlib";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const EXCLUDED_DIRECTORIES = new Set([
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
  "api-slot-kit",
]);

const CRC_TABLE = createCrcTable();

function printHelp() {
  console.log(`joo-code project zip\n\nUsage:\n  node zip-project.mjs [--source <directory>] [--output <file.zip>]\n\nDefaults:\n  --source  current working directory\n  --output  ../<project-name>.zip\n\nExamples:\n  pnpm zip\n  pnpm zip -- --output ./backup/joo-code.zip\n  node zip-project.mjs --source ../my-project --output ../my-project.zip`);
}

function parseArguments(args) {
  const options = {
    source: process.cwd(),
    output: undefined,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "--help" || argument === "-h") {
      printHelp();
      process.exit(0);
    }

    if (argument === "--source" || argument === "-s") {
      options.source = args[index + 1];
      index += 1;
      continue;
    }

    if (argument === "--output" || argument === "-o") {
      options.output = args[index + 1];
      index += 1;
      continue;
    }

    throw new Error(`알 수 없는 옵션입니다: ${argument}`);
  }

  return options;
}

function createCrcTable() {
  return Array.from({ length: 256 }, (_, index) => {
    let value = index;

    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) === 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }

    return value >>> 0;
  });
}

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function toDosDateTime(date) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2);
  const dosDate =
    ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();

  return { dosDate, dosTime };
}

function isExcluded(relativePath, outputPath, absolutePath) {
  const normalized = relativePath.split(path.sep).join("/");
  const segments = normalized.split("/");
  const fileName = segments.at(-1) ?? "";

  if (absolutePath === outputPath) {
    return true;
  }

  if (segments.some((segment) => EXCLUDED_DIRECTORIES.has(segment))) {
    return true;
  }

  if (fileName.endsWith(".zip") || fileName.endsWith(".log")) {
    return true;
  }

  if (fileName === ".env" || (fileName.startsWith(".env.") && fileName !== ".env.example")) {
    return true;
  }

  return false;
}

async function collectFiles(sourceRoot, outputPath, currentDirectory = sourceRoot) {
  const entries = await readdir(currentDirectory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const absolutePath = path.join(currentDirectory, entry.name);
    const relativePath = path.relative(sourceRoot, absolutePath);

    if (isExcluded(relativePath, outputPath, absolutePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(sourceRoot, outputPath, absolutePath)));
      continue;
    }

    if (entry.isFile()) {
      files.push({ absolutePath, relativePath });
    }
  }

  return files;
}

function createLocalHeader({
  fileName,
  crc,
  compressedSize,
  uncompressedSize,
  compressionMethod,
  dosDate,
  dosTime,
}) {
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0x0800, 6);
  header.writeUInt16LE(compressionMethod, 8);
  header.writeUInt16LE(dosTime, 10);
  header.writeUInt16LE(dosDate, 12);
  header.writeUInt32LE(crc, 14);
  header.writeUInt32LE(compressedSize, 18);
  header.writeUInt32LE(uncompressedSize, 22);
  header.writeUInt16LE(fileName.length, 26);
  header.writeUInt16LE(0, 28);
  return header;
}

function createCentralHeader({
  fileName,
  crc,
  compressedSize,
  uncompressedSize,
  compressionMethod,
  dosDate,
  dosTime,
  localOffset,
}) {
  const header = Buffer.alloc(46);
  header.writeUInt32LE(0x02014b50, 0);
  header.writeUInt16LE(0x0314, 4);
  header.writeUInt16LE(20, 6);
  header.writeUInt16LE(0x0800, 8);
  header.writeUInt16LE(compressionMethod, 10);
  header.writeUInt16LE(dosTime, 12);
  header.writeUInt16LE(dosDate, 14);
  header.writeUInt32LE(crc, 16);
  header.writeUInt32LE(compressedSize, 20);
  header.writeUInt32LE(uncompressedSize, 24);
  header.writeUInt16LE(fileName.length, 28);
  header.writeUInt16LE(0, 30);
  header.writeUInt16LE(0, 32);
  header.writeUInt16LE(0, 34);
  header.writeUInt16LE(0, 36);
  header.writeUInt32LE(0, 38);
  header.writeUInt32LE(localOffset, 42);
  return header;
}

function createEndOfCentralDirectory(fileCount, centralSize, centralOffset) {
  const record = Buffer.alloc(22);
  record.writeUInt32LE(0x06054b50, 0);
  record.writeUInt16LE(0, 4);
  record.writeUInt16LE(0, 6);
  record.writeUInt16LE(fileCount, 8);
  record.writeUInt16LE(fileCount, 10);
  record.writeUInt32LE(centralSize, 12);
  record.writeUInt32LE(centralOffset, 16);
  record.writeUInt16LE(0, 20);
  return record;
}

async function createZip(sourceRoot, outputPath) {
  const sourceInfo = await stat(sourceRoot);

  if (!sourceInfo.isDirectory()) {
    throw new Error(`source가 디렉터리가 아닙니다: ${sourceRoot}`);
  }

  const files = await collectFiles(sourceRoot, outputPath);

  if (files.length > 0xffff) {
    throw new Error("ZIP64가 필요한 파일 개수는 지원하지 않습니다.");
  }

  const localChunks = [];
  const centralChunks = [];
  let localOffset = 0;

  for (const file of files) {
    const content = await readFile(file.absolutePath);
    const fileInfo = await stat(file.absolutePath);
    const compressed = deflateRawSync(content, { level: 9 });
    const useCompression = compressed.length < content.length;
    const archiveContent = useCompression ? compressed : content;
    const compressionMethod = useCompression ? 8 : 0;
    const fileName = Buffer.from(file.relativePath.split(path.sep).join("/"), "utf8");
    const checksum = crc32(content);
    const { dosDate, dosTime } = toDosDateTime(fileInfo.mtime);

    if (content.length > 0xffffffff || archiveContent.length > 0xffffffff) {
      throw new Error(`ZIP64가 필요한 파일 크기는 지원하지 않습니다: ${file.relativePath}`);
    }

    const metadata = {
      fileName,
      crc: checksum,
      compressedSize: archiveContent.length,
      uncompressedSize: content.length,
      compressionMethod,
      dosDate,
      dosTime,
      localOffset,
    };

    const localHeader = createLocalHeader(metadata);
    const centralHeader = createCentralHeader(metadata);

    localChunks.push(localHeader, fileName, archiveContent);
    centralChunks.push(centralHeader, fileName);
    localOffset += localHeader.length + fileName.length + archiveContent.length;
  }

  const centralDirectory = Buffer.concat(centralChunks);
  const endRecord = createEndOfCentralDirectory(
    files.length,
    centralDirectory.length,
    localOffset,
  );
  const archive = Buffer.concat([...localChunks, centralDirectory, endRecord]);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await rm(outputPath, { force: true });
  await writeFile(outputPath, archive);

  return { fileCount: files.length, size: archive.length };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const sourceRoot = path.resolve(options.source);
  const projectName = path.basename(sourceRoot);
  const outputPath = path.resolve(
    options.output ?? path.join(path.dirname(sourceRoot), `${projectName}.zip`),
  );

  const result = await createZip(sourceRoot, outputPath);
  console.log(`Created: ${outputPath}`);
  console.log(`Files: ${result.fileCount}, Size: ${result.size.toLocaleString("en-US")} bytes`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
