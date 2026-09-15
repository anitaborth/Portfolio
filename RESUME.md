# Resume PDF

`ana-borthagaray-resume.pdf` is generated from `resume.html`, not maintained by
hand — the `@media print` rules in `styles.css` are what the file looks like.

Regenerate after any edit to the resume content or its print styles:

1. Start the local server (the `static` config, port 4173).
2. `npm run resume:pdf`

Verified on the committed file: 4 pages, text layer with ToUnicode maps on all
four embedded fonts, no rasterised images, and the full content extracting in
reading order.
