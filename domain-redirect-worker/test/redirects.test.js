import assert from "node:assert/strict";
import test from "node:test";

import { redirectRequest, targetForHostname } from "../src/index.js";

const EXPECTED_TARGETS = {
  "xx5official.in": "https://xx5-india.com/",
  "getxx5.in": "https://xx5-india.com/download/",
  "xx5download.in": "https://xx5-india.com/download/",
  "xx5play.co.in": "https://xx5-india.com/",
  "playxx5.in": "https://xx5-india.com/",
};

test("maps every purchased domain to its permanent target", () => {
  for (const [hostname, target] of Object.entries(EXPECTED_TARGETS)) {
    assert.equal(targetForHostname(hostname), target);
    assert.equal(targetForHostname(`www.${hostname}`), target);
  }
});

test("returns permanent redirects and preserves query strings", () => {
  for (const [hostname, target] of Object.entries(EXPECTED_TARGETS)) {
    const response = redirectRequest(
      new Request(`https://${hostname}/old/path?utm_source=test`),
    );

    assert.equal(response.status, 301);
    assert.equal(
      response.headers.get("location"),
      `${target}?utm_source=test`,
    );
  }
});

test("fails closed for an unknown hostname", async () => {
  const response = redirectRequest(new Request("https://example.com/"));

  assert.equal(response.status, 404);
  assert.equal(await response.text(), "Not found");
});
