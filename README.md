# Goodlabel

Goodlabel is a responsive ingredient-label helper. Search a food product or scan its barcode, review available product and nutrition data, or photograph/upload an ingredient label and correct its OCR text before analysis.

## Run locally

No build step or package installation is required. From this directory, start a local web server:

```sh
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser. Camera access requires a secure context; `localhost` is supported by modern browsers. You can also upload a label image instead of using the camera.

## Features

- Product-name and barcode lookup through the Open Food Facts API.
- Product details, ingredients, product images, and available nutrition facts.
- Ingredient-label photo capture or image upload, with Tesseract.js OCR and editable extracted text.
- Good, Okay, and Bad ingredient groupings based on the app's lightweight term-matching heuristics.
- Same-category nutrition comparisons when the API provides enough comparable product data.

## Data and limitations

Product records and nutrition values come from Open Food Facts and may be incomplete, outdated, or differ from the package in your region. Similar-product comparisons are shown only when category and nutrition data are sufficient; if the API is unavailable or the data is incomplete, Goodlabel does not make a recommendation.

Good, Okay, and Bad are simple label heuristics, not a nutrition grade, medical advice, or a judgment about whether a food is right for a particular person. Check the current package and consider your own dietary needs.

OCR runs in the browser. The app loads Tesseract.js and its language data from a CDN; the selected image is processed locally by the browser and is not uploaded to Goodlabel. Product lookup requires an internet connection. Camera barcode scanning depends on browser support for `BarcodeDetector`; product names and manual ingredient entry remain available when it is unsupported.

## External services

- [Open Food Facts](https://world.openfoodfacts.org/) for product records and nutrition data.
- [Tesseract.js](https://github.com/naptha/tesseract.js) via jsDelivr for browser-based OCR.
- Google Fonts and Unsplash for page typography and photography.
