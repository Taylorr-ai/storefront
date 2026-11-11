# Form & Field storefront

A responsive, minimal storefront built with plain HTML, CSS, and JavaScript. No build step or framework is required, so it can be deployed directly to Cloudflare Pages.

## Preview locally

Open `index.html` in a browser, or run a small static server from this directory, for example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and choose this repository.
3. For a static deployment, leave the build command empty and set the output directory to `/` (the repository root).
4. Deploy. The site uses `index.html` as its entry point.

## Customize the sample store

- Change the brand name, copy, and contact email in `index.html`.
- Edit the `PRODUCTS` array near the top of `app.js` to update names, prices, categories, and images.
- Replace the sample imagery with your own product photography. Current sample images and web fonts load from external services.
- The newsletter form is a front-end demo only; connect it to your email provider before collecting subscriptions.

## PayPal checkout

In `app.js`, replace `YOUR_PAYPAL_HOSTED_BUTTON_ID` with the hosted button ID from your PayPal button's HTML embed code. For sandbox testing, set `PAYPAL_ENVIRONMENT` to `www.sandbox.paypal.com`; use `www.paypal.com` for live checkout.

**Important:** a standard PayPal hosted button is tied to the product and price configured for that button. It does not automatically receive this site's cart contents or subtotal. Before accepting orders for multiple products, configure a PayPal cart button that supports the intended checkout flow, or implement PayPal Checkout with the JS SDK and a server-side Cloudflare Worker/Pages Function. Do not expose PayPal secret credentials in browser code. Test checkout in PayPal sandbox before launch.
