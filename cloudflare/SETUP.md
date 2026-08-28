# XX5 defensive-domain setup

The five defensive domains consolidate their authority into the primary domain,
`https://xx5-india.com/`, using permanent HTTP 301 redirects. They must not host
copies of the primary site's HTML or assets.

## Redirect map

| Source domain | Permanent target |
| --- | --- |
| `xx5official.in` | `https://xx5-india.com/` |
| `getxx5.in` | `https://xx5-india.com/download/` |
| `xx5download.in` | `https://xx5-india.com/download/` |
| `xx5play.co.in` | `https://xx5-india.com/` |
| `playxx5.in` | `https://xx5-india.com/` |

## Cloudflare configuration

1. Add each apex domain as a Cloudflare zone.
2. At Namecheap, replace the registrar nameservers with the two nameservers
   assigned to that zone by Cloudflare.
3. Wait until all five zones show **Active**.
4. Create proxied placeholder DNS records for the apex and `www` hostnames if
   Cloudflare does not create them automatically.
5. Import `bulk-redirects.csv` into an account-level Bulk Redirect List.
6. Create and enable a Bulk Redirect Rule that references the imported list.
7. Confirm that HTTP, HTTPS, apex, `www`, and arbitrary paths return `301` and
   point to the expected `https://xx5-india.com/` destination.

The CSV settings preserve query strings, include subdomains, match subpaths,
and intentionally do not append the old path to the destination. This sends
download-intent domains to `/download/` and brand/play domains to the homepage.

## Required verification

Test all of these variants after DNS and SSL are active:

- `http://domain/`
- `https://domain/`
- `https://www.domain/`
- `https://domain/test-path?source=check`

The response must be `301`, never `200`, `302`, a redirect loop, or a parked
registrar page.
