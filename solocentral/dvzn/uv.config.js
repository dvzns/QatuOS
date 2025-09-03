// This file overwrites the stock UV config.js

self.__uv$config = {
  prefix: "/szvy/szvy/",
  bare: "/bare/",
  encodeUrl: Ultraviolet.codec.base64.encode,
  decodeUrl: Ultraviolet.codec.base64.decode,
  handler: "/szvy/uv.handler.js",
  client: "/szvy/uv.client.js",
  bundle: "/szvy/uv.bundle.js",
  config: "/szvy/uv.config.js",
  sw: "/szvy/uv.sw.js",
};
