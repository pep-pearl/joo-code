import { decorate } from "./decorate";
import { Decorate, Tree } from "./types";

/**
 * api tree
 *
 * 선언 방법:
 *
 * 1. leaf endpoint
 *    login: "POST" // POST /auth/login
 *
 * 2. 현재 node 자체가 endpoint인 경우
 *    posts: {
 *      _: "GET" // GET /posts
 *    }
 *
 * 3. 현재 node도 endpoint이고, 하위 endpoint도 있는 경우
 *    posts: {
 *      _: "GET",        // GET /posts
 *      create: "POST",  // POST /posts/create
 *    }
 */
export const API_TREE = {
  auth: {
    user: {
      login: "POST",
      logout: "POST",
      me: "GET",
    },
    token: {
      refresh: "POST",
    },
  },

  posts: {
    _: "GET",
    create: "POST",

    ":postId": {
      _: "GET",
      update: "PUT",
      delete: "DELETE",

      comments: {
        _: "GET",
        create: "POST",

        ":commentId": {
          _: "GET",
          update: "PATCH",
          delete: "DELETE",
        },
      },
    },
  },

  users: {
    _: "GET",
    create: "POST",

    ":userId": {
      _: "GET",
      update: "PATCH",
      delete: "DELETE",

      profile: {
        _: "GET",
        update: "PUT",
      },
    },
  },
} as const satisfies Tree;

export type ApiTree = typeof API_TREE;

export type ApiMap = Decorate<ApiTree>;

export const apiMap = decorate(API_TREE);
