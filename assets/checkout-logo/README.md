# Checkout logo — Summer closing sale

Replaces the Anniversary Sale checkout banner (`checkoutbanner.png`, 1600x940) for the summer closing sale.

## Copy, and where it comes from

All claims are taken from the summer sale as it is built in the theme `Copy of Ashcroftlondon store` (unpublished), so checkout says the same thing as the homepage and product pages:

| Element | Source |
| --- | --- |
| `SUMMER CLOSING SALE` | homepage slideshow title, product banner eyebrow |
| `ENDS SUNDAY 20 SEPTEMBER` | homepage story + footnote, product banner heading |
| 1 item 10% / 2 items 15% / 3+ items 20% | homepage tier blocks, product banner tier blocks, live automatic discounts |
| `★ 4.9/5` and the trust line | carried over unchanged from the current checkout banner |

## Files

- `ashcroft-checkout-summer-mono-1600.png` — monochrome, like-for-like replacement of the current banner
- `ashcroft-checkout-summer-green-1600.png` — deep green `#16281F` / gold `#C08A3E`, matching the sale sections
- `*-3200.png` — same at 2x
- `checkout-logo.html` — source; add `class="green"` to `<body>` for the green variant

## Rendering

Needs Cormorant Garamond and Jost in `fonts/fonts.css` next to the HTML (Google Fonts woff2 with the `fonts.gstatic.com` URLs rewritten to local filenames), then:

```
chrome --headless=new --hide-scrollbars --force-device-scale-factor=1 \
  --screenshot=out.png --window-size=1600,940 file://$PWD/checkout-logo.html
```

## Not applied

The asset is not uploaded and the checkout logo is not switched. The summer sale is still unpublished and the live discounts are named Anniversary Sale, so swapping checkout now would advertise a sale that is not running.
