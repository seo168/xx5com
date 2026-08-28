# XX5 domain redirects

Deploy-ready Cloudflare Worker that permanently redirects five defensive XX5
domains into the primary SEO property, `https://xx5-india.com/`.

## Redirect map

| Source | Destination |
| --- | --- |
| `xx5official.in` and `www` | `https://xx5-india.com/` |
| `getxx5.in` and `www` | `https://xx5-india.com/download/` |
| `xx5download.in` and `www` | `https://xx5-india.com/download/` |
| `xx5play.co.in` and `www` | `https://xx5-india.com/` |
| `playxx5.in` and `www` | `https://xx5-india.com/` |

All redirects use HTTP `301`. Query strings are preserved. Old path suffixes
are intentionally discarded so every domain consolidates into the strongest
matching page on the primary site.

## Prerequisites

1. Add all five domains to the same Cloudflare account.
2. At Namecheap, point every domain to its assigned Cloudflare nameservers.
3. Wait for every Cloudflare zone to become **Active**.
4. Create proxied DNS records for the apex and `www` hostnames in every zone.
5. Install Node.js 20+ and authenticate Wrangler with the target account.

No API keys, account IDs, zone IDs, or other secrets belong in this repository.

## Validate and deploy

```bash
npm install
npm test
npm run check
npm run deploy
```

Wrangler attaches the Worker to the apex and `www` routes declared in
`wrangler.jsonc`. Deployment will fail safely if a zone is missing from the
authenticated Cloudflare account.

## Post-deployment verification

For each domain, test HTTP, HTTPS, apex, `www`, a random path, and a query
string. Every response must be `301` with the expected `Location` header.

```bash
curl -I "https://getxx5.in/test?utm_source=verify"
```

The expected destination is:

```text
https://xx5-india.com/download/?utm_source=verify
```

Do not publish copied pages or copied assets on these domains. The Worker is
designed to consolidate brand and link signals into the primary domain instead
of creating duplicate content or doorway pages.
