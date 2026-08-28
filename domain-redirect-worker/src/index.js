const REDIRECT_TARGETS = Object.freeze({
  "xx5official.in": "https://xx5-india.com/",
  "getxx5.in": "https://xx5-india.com/download/",
  "xx5download.in": "https://xx5-india.com/download/",
  "xx5play.co.in": "https://xx5-india.com/",
  "playxx5.in": "https://xx5-india.com/",
});

export function targetForHostname(hostname) {
  const normalizedHostname = hostname.toLowerCase().replace(/^www\./, "");
  return REDIRECT_TARGETS[normalizedHostname] ?? null;
}

export function redirectRequest(request) {
  const requestUrl = new URL(request.url);
  const target = targetForHostname(requestUrl.hostname);

  if (target === null) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "cache-control": "no-store",
        "content-type": "text/plain; charset=utf-8",
        "x-content-type-options": "nosniff",
      },
    });
  }

  const targetUrl = new URL(target);
  targetUrl.search = requestUrl.search;

  return new Response(null, {
    status: 301,
    headers: {
      location: targetUrl.toString(),
      "cache-control": "public, max-age=3600",
      "referrer-policy": "strict-origin-when-cross-origin",
      "x-content-type-options": "nosniff",
    },
  });
}

export default {
  fetch(request) {
    return redirectRequest(request);
  },
};
