import { Decorate, HTTP, Tree } from "./types";

const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
] as const satisfies ReadonlyArray<HTTP>;

function isHTTP(value: unknown): value is HTTP {
  return typeof value === "string" && HTTP_METHODS.includes(value as HTTP);
}

function joinPath(prefix: string, key: string) {
  return prefix ? `${prefix}/${key}` : `/${key}`;
}

export function decorate<TTree extends Tree>(tree: TTree): Decorate<TTree> {
  function walk(node: Tree, prefix: string): any {
    const out: any = {};

    for (const [key, value] of Object.entries(node)) {
      if (value === undefined) continue;

      if (key === "_") {
        if (isHTTP(value)) {
          out._ = {
            method: value,
            path: prefix || "/",
          };
        }

        continue;
      }

      const path = joinPath(prefix, key);

      if (isHTTP(value)) {
        out[key] = {
          method: value,
          path,
        };

        continue;
      }

      if (typeof value === "object" && value !== null) {
        out[key] = walk(value, path);
      }
    }

    return out;
  }

  return walk(tree, "");
}
