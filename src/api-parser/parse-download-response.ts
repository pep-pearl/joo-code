export interface ParseDownloadResponse {
  blob: Blob;
  filename: string;
}

export async function parseDownloadResponse(
  response: Response,
): Promise<ParseDownloadResponse> {
  const blob = await response.blob();

  const { headers } = response;
  const cd =
    headers.get("content-disposition") ??
    headers.get("Content-Disposition") ??
    "";

  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(cd);

  let filename = "download.bin";
  if (matches == null || matches[1] == null) {
    filename = "download";
  } else {
    filename = matches[1];
    // remove quote characters
    filename = filename.replace(/["']/g, "");
  }

  return { blob, filename };
}
