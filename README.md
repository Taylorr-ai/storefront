# 123kids storefront

A cheerful storefront concept for two original coloring-book products for ages 0–6. The covers are bespoke SVG display illustrations, with responsive product pages and a clearly disclosed email-offer signup preview.

## Products

- **My First Big Coloring Book** — ages 0–3, 25 pages, $10 USD.
- **Little Explorers Coloring Adventures** — ages 4–6, 25 pages, $10 USD.
- A 50% discount ($5 per book) is advertised for customers who opt in to occasional product and service updates and verify their email.
- Printable US Letter and A4 PDF editions and occasional simple prompts are planned for both books.

## Preview locally

Open `index.html` in a browser, or run:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000`.

## Deploy to Cloudflare Pages

Use `/` as the build output directory and leave the build command empty.

## Before launch

This repository is a static storefront preview. The add-to-bag buttons are demonstrative only; payment checkout is not connected. The signup form intentionally does not transmit or store email addresses. Connect an email marketing provider that supports explicit consent, email verification, and coupon delivery before making the offer redeemable. Upload the final US Letter and A4 PDF files and connect delivery after purchase. Configure the custom domain `www.123kids.shop` in Cloudflare Pages and verify DNS/TLS there; the canonical and social metadata already use that URL.
