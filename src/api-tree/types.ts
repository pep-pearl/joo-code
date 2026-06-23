export type HTTP = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type Tree = {
  /**
   * 현재 path 자체를 endpoint로 쓰고 싶을 때 사용
   *
   * 예:
   * posts: {
   *   _: "GET" // GET /posts
   * }
   */
  _?: HTTP;

  [key: string]: Tree | HTTP | undefined;
};

type JoinPath<Prefix extends string, Key extends string> = Prefix extends ""
  ? `/${Key}`
  : `${Prefix}/${Key}`;

type DecoratedEndpoint<TMethod extends HTTP, TPath extends string> = {
  method: TMethod;
  path: TPath;
};

export type Decorate<TTree extends Tree, Prefix extends string = ""> = {
  [K in keyof TTree as TTree[K] extends undefined ? never : K]: K extends "_"
    ? TTree[K] extends HTTP
      ? DecoratedEndpoint<TTree[K], Prefix extends "" ? "/" : Prefix>
      : never
    : TTree[K] extends HTTP
      ? DecoratedEndpoint<TTree[K], JoinPath<Prefix, Extract<K, string>>>
      : TTree[K] extends Tree
        ? Decorate<TTree[K], JoinPath<Prefix, Extract<K, string>>>
        : never;
};
