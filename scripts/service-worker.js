"use strict";

const scope = new URL(self.registration.scope);
const cachePrefix = `point-atlas:${scope.pathname}:`;
const cacheName = cachePrefix + "__RELEASE__";
const assetPaths = /* __PUBLIC_ASSETS__ */ [];
const assets = new Set(assetPaths.map((path) => new URL(path, scope).href));
const index = new URL("index.html", scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => {
    return cache.addAll([...assets].map((url) => new Request(url, { cache: "reload" })));
  }));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith(cachePrefix) && name !== cacheName)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== scope.origin) return;

  const key = request.mode === "navigate" && url.pathname === scope.pathname
    ? index
    : url.origin + url.pathname;
  if (!assets.has(key)) return;

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    return (await cache.match(key)) ?? fetch(request);
  })());
});
