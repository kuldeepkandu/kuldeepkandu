const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;

export function withBasePath(path = "") {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  if (!path) return basePath;

  if (
    ABSOLUTE_URL_PATTERN.test(path) ||
    path.startsWith("data:") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
