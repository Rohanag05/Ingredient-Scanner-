const catalog = [
  {
    name: "Greek yogurt",
    aliases: ["plain greek yogurt", "yogurt", "plain yogurt"],
    score: 91,
    rating: "Good",
    category: "Dairy",
    description:
      "A short ingredient list with a good amount of protein. This sample is plain and unsweetened.",
    ingredients: ["Cultured milk", "Live active cultures"],
    flagged: [],
    positives: [
      "Short ingredient list",
      "No added sweeteners in this sample",
      "Live cultures are included",
    ],
    cautions: [
      "Contains dairy. Choose an alternative if that does not suit you.",
    ],
    alternatives: [
      {
        name: "Unsweetened soy yogurt",
        note: "A plant-based option with a similarly simple label.",
        badge: "PLANT-BASED",
      },
      {
        name: "Plain skyr",
        note: "Another cultured dairy option; compare labels for added sugar.",
        badge: "HIGH PROTEIN",
      },
    ],
  },
  {
    name: "Crunchy granola",
    aliases: ["granola", "honey granola", "crunchy oat granola"],
    score: 48,
    rating: "Bad",
    category: "Breakfast",
    description:
      "This example includes added sweeteners and several oils. A smaller serving or a less-sweet blend may suit you better.",
    ingredients: [
      "Rolled oats",
      "Honey",
      "Brown sugar",
      "Canola oil",
      "Dried cranberries",
      "Natural flavor",
    ],
    flagged: ["Brown sugar", "Canola oil", "Natural flavor"],
    positives: ["Rolled oats are the first ingredient", "Includes dried fruit"],
    cautions: [
      "Honey and brown sugar both add sweetness",
      "Natural flavor is a broad label term",
      "Compare serving sizes when checking sugar",
    ],
    alternatives: [
      {
        name: "Unsweetened toasted muesli",
        note: "Look for oats, nuts, and seeds near the top of the list.",
        badge: "LESS SWEET",
      },
      {
        name: "Plain rolled oats",
        note: "A simple base; add fruit or nuts the way you like.",
        badge: "SIMPLE LABEL",
      },
    ],
  },
  {
    name: "Oat milk",
    aliases: ["oat beverage", "barista oat milk", "oatmilk"],
    score: 72,
    rating: "Okay",
    category: "Dairy alternative",
    description:
      "A familiar oat drink with added oil and stabilizers. These ingredients are common in shelf-stable cartons; your preferences matter.",
    ingredients: [
      "Water",
      "Oats",
      "Sunflower oil",
      "Dipotassium phosphate",
      "Gellan gum",
      "Sea salt",
    ],
    flagged: ["Sunflower oil", "Dipotassium phosphate", "Gellan gum"],
    positives: [
      "Oats and water make up the base",
      "No added sweetener in this sample",
    ],
    cautions: [
      "Added oil contributes to the creamy texture",
      "Phosphate and gum ingredients help with stability",
      "Fortification varies between brands",
    ],
    alternatives: [
      {
        name: "Unsweetened soy drink",
        note: "Often offers more protein; check for fortification and added sugar.",
        badge: "MORE PROTEIN",
      },
      {
        name: "Unsweetened almond drink",
        note: "A lighter-tasting option; compare nutrition and allergy needs.",
        badge: "UNSWEETENED",
      },
    ],
  },
  {
    name: "Sparkling water",
    aliases: ["plain sparkling water", "seltzer", "carbonated water"],
    score: 96,
    rating: "Good",
    category: "Drinks",
    description:
      "A very short label: water and bubbles. This sample is unflavored and has no added sweetener.",
    ingredients: ["Carbonated water"],
    flagged: [],
    positives: [
      "Single listed ingredient",
      "No added sweeteners in this sample",
      "No colorings or preservatives listed",
    ],
    cautions: [
      "Flavored versions can have different ingredients. Check the specific label.",
    ],
    alternatives: [
      {
        name: "Still water",
        note: "The simplest swap if you'd rather skip the fizz.",
        badge: "ONE INGREDIENT",
      },
      {
        name: "Water with citrus",
        note: "Add a squeeze of lemon or lime for a little brightness.",
        badge: "ADD YOUR OWN",
      },
    ],
  },
];

const commonFlags = [
  {
    terms: [
      "high fructose corn syrup",
      "corn syrup",
      "glucose-fructose",
      "fructose - glucose syrup",
      "glucose syrup",
      "glucose-fructose syrup",
    ],
    label: "Added syrup",
    points: 22,
    note: "This ingredient is a source of added sugar.",
  },
  {
    terms: ["hydrogenated", "partially hydrogenated"],
    label: "Hydrogenated oil",
    points: 30,
    note: "Hydrogenated oils are worth checking closely on a label.",
  },
  {
    terms: ["sucralose", "aspartame", "acesulfame potassium", "acesulfame-k"],
    label: "Intense sweetener",
    points: 17,
    note: "A non-sugar sweetener is included.",
  },
  {
    terms: [
      "red 40",
      "yellow 5",
      "yellow 6",
      "blue 1",
      "artificial color",
      "colorant",
      "e150d",
    ],
    label: "Added coloring",
    points: 14,
    note: "A color additive is listed.",
  },
  {
    terms: ["maltodextrin"],
    label: "Maltodextrin",
    points: 10,
    note: "Maltodextrin is used as a thickener or bulking ingredient.",
  },
  {
    terms: ["sugar", "cane syrup", "agave", "dextrose", "molasses", "honey"],
    label: "Added sweetener",
    points: 8,
    note: "A sweetener is listed. The amount depends on the full nutrition label and serving size.",
  },
  {
    terms: ["preservative", "sodium benzoate", "potassium sorbate"],
    label: "Preservative",
    points: 8,
    note: "A preservative is included to help maintain freshness.",
  },
  {
    terms: ["natural flavor", "artificial flavor"],
    label: "Flavoring",
    points: 5,
    note: "Flavoring is a broad label term; its source is not specified here.",
  },
  {
    terms: ["gellan gum", "xanthan gum", "guar gum", "carrageenan"],
    label: "Thickener",
    points: 4,
    note: "A thickener is used for texture. These are common in packaged foods.",
  },
  {
    terms: ["sunflower oil", "canola oil", "soybean oil", "palm oil"],
    label: "Added oil",
    points: 4,
    note: "An added oil is listed. The nutrition panel shows how much is in a serving.",
  },
];

const productForm = document.querySelector("#product-panel");
const ingredientsForm = document.querySelector("#ingredients-panel");
const productInput = document.querySelector("#product-input");
const ingredientsInput = document.querySelector("#ingredients-input");
const feedback = document.querySelector("#feedback");
const resultsSection = document.querySelector("#analysis");
const analysisContent = document.querySelector("#analysis-content");
const cameraDialog = document.querySelector("#camera-dialog");
const cameraVideo = document.querySelector("#camera-video");
const cameraPlaceholder = document.querySelector("#camera-placeholder");
const cameraMessage = document.querySelector("#camera-message");
const cameraTitle = document.querySelector("#camera-title");
const cameraEyebrow = document.querySelector("#camera-eyebrow");
const captureLabelButton = document.querySelector("#capture-label");
const dialogUploadButton = document.querySelector("#dialog-upload");
const imageInput = document.querySelector("#label-image-input");
const ocrReview = document.querySelector("#ocr-review");
const ocrText = document.querySelector("#ocr-text");
const ocrStatus = document.querySelector("#ocr-status");
const imagePreview = document.querySelector("#label-image-preview");
let activeMode = "product";
let cameraStream;
let barcodeTimer;
let isAnalyzing = false;
let cameraMode = "barcode";
let imagePreviewUrl;

const openFoodFactsOrigin = "https://world.openfoodfacts.org";
const openFoodFactsFields =
  "code,product_name,product_name_en,generic_name,brands,ingredients_text,ingredients_text_en,ingredients,nutriments,image_front_url,image_url,quantity,categories,categories_tags";
const comparisonNutrients = [
  { key: "sugars_100g", label: "Sugars", unit: "g", minimumDifference: 0.1 },
  {
    key: "sodium_100g",
    fallback: "salt_100g",
    label: "Sodium",
    unit: "g",
    minimumDifference: 0.02,
  },
  {
    key: "saturated-fat_100g",
    label: "Saturated fat",
    unit: "g",
    minimumDifference: 0.1,
  },
];

function setMode(mode) {
  activeMode = mode;
  document.querySelectorAll(".mode-tab").forEach((tab) => {
    const selected = tab.dataset.mode === mode;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  productForm.hidden = mode !== "product";
  ingredientsForm.hidden = mode !== "ingredients";
  hideFeedback();
  (mode === "product" ? productInput : ingredientsInput).focus({
    preventScroll: true,
  });
}

function showFeedback(message, type = "info") {
  feedback.textContent = message;
  feedback.className = `feedback${type === "error" ? " is-error" : type === "loading" ? " is-loading" : ""}`;
  feedback.hidden = false;
}

function hideFeedback() {
  feedback.hidden = true;
  feedback.textContent = "";
  feedback.className = "feedback";
}

function findCatalogProduct(query) {
  const normalized = query.toLocaleLowerCase().trim().replace(/\s+/g, " ");
  const product = catalog.find((product) =>
    [product.name, ...product.aliases].some(
      (name) => name.toLocaleLowerCase() === normalized,
    ),
  );
  return product ? { ...product, isSample: true } : null;
}

function analyzeIngredients(rawIngredients) {
  const ingredients = rawIngredients
    .split(/[\n,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (ingredients.length === 0) return null;

  const normalized = rawIngredients.toLocaleLowerCase();
  const matchedFlags = commonFlags.filter((flag) =>
    flag.terms.some((term) => normalized.includes(term)),
  );
  const score = Math.max(
    25,
    Math.min(
      96,
      96 - matchedFlags.reduce((total, flag) => total + flag.points, 0),
    ),
  );
  const rating = score >= 78 ? "Good" : score >= 52 ? "Okay" : "Bad";
  const flaggedNames = matchedFlags.map((flag) => flag.label);
  const positives =
    ingredients.length <= 5
      ? [
          "A relatively short ingredient list",
          "No major common flags found in this check",
        ]
      : [
          "Ingredients are listed clearly",
          "Check the nutrition panel alongside this list",
        ];

  return {
    name: "Your ingredient check",
    category: "Ingredient list",
    score,
    rating,
    description:
      "A quick look for common label terms. This is a general guide, not a nutrition grade or a medical assessment.",
    ingredients,
    flagged: flaggedNames,
    positives,
    cautions: matchedFlags.length
      ? matchedFlags.map((flag) => flag.note)
      : [
          "No common flags were found in this quick check. That does not mean a product is right for every person.",
        ],
    alternatives: [],
    alternativesStatus: "not-a-product",
    isSample: false,
  };
}

function getIngredientText(product) {
  const ingredients =
    product.ingredients_text ||
    product.ingredients_text_en ||
    product.ingredients
      ?.map((ingredient) => ingredient.text)
      .filter(Boolean)
      .join(", ");
  return typeof ingredients === "string" ? ingredients.trim() : "";
}

function toOpenFoodFactsProduct(product) {
  if (!product) return null;

  const ingredientText = getIngredientText(product);
  const ingredientAnalysis = ingredientText
    ? analyzeIngredients(ingredientText)
    : null;
  const name =
    product.product_name_en ||
    product.product_name ||
    product.generic_name ||
    "Unnamed product";
  const category = product.categories?.split(",")[0]?.trim() || "Food product";
  return {
    ...(ingredientAnalysis || {}),
    name,
    category,
    brand: product.brands || "",
    barcode: product.code || "",
    quantity: product.quantity || "",
    description: ingredientAnalysis
      ? "Product information from Open Food Facts. The ingredient notes are a general guide; check the package for the current local label."
      : "Product details were found, but an ingredient list is not available in the catalog entry.",
    ingredients: ingredientAnalysis?.ingredients || [],
    flagged: ingredientAnalysis?.flagged || [],
    positives: ingredientAnalysis?.positives || [],
    cautions: ingredientAnalysis?.cautions || [
      "The catalog entry does not include ingredients, so a label classification is unavailable.",
    ],
    score: ingredientAnalysis?.score ?? null,
    rating: ingredientAnalysis?.rating || "Unavailable",
    image: product.image_front_url || product.image_url || "",
    nutrition: product.nutriments || {},
    ingredientsAvailable: Boolean(ingredientAnalysis),
    isSample: false,
    categoriesTags: product.categories_tags || [],
    alternatives: [],
    alternativesStatus: "pending",
  };
}

async function fetchOpenFoodFacts(url) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok)
      throw new Error(`Open Food Facts returned ${response.status}.`);
    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

async function lookupBarcode(barcode) {
  const fields = encodeURIComponent(openFoodFactsFields);
  const data = await fetchOpenFoodFacts(
    `${openFoodFactsOrigin}/api/v2/product/${encodeURIComponent(barcode)}.json?fields=${fields}`,
  );
  if (data.status !== 1) return null;
  return findHealthierAlternatives(toOpenFoodFactsProduct(data.product));
}

async function lookupProduct(query) {
  const params = new URLSearchParams({
    search_terms: query,
    search_simple: "1",
    action: "process",
    json: "1",
    page_size: "8",
    fields: openFoodFactsFields,
  });
  const data = await fetchOpenFoodFacts(
    `${openFoodFactsOrigin}/cgi/search.pl?${params}`,
  );
  const products = (data.products || []).filter(
    (product) =>
      product.product_name || product.product_name_en || product.generic_name,
  );
  if (!products.length) return null;
  const normalizedQuery = query.toLocaleLowerCase();
  const bestMatch = products.find((product) =>
    `${product.product_name || ""} ${product.product_name_en || ""} ${product.brands || ""}`
      .toLocaleLowerCase()
      .includes(normalizedQuery),
  );
  return findHealthierAlternatives(
    toOpenFoodFactsProduct(bestMatch || products[0]),
  );
}

function getComparableValue(nutrition, definition) {
  const directValue = nutrition?.[definition.key];
  if (directValue !== null && directValue !== undefined && directValue !== "") {
    const direct = Number(directValue);
    if (Number.isFinite(direct)) return direct;
  }
  if (definition.fallback) {
    const fallbackValue = nutrition?.[definition.fallback];
    if (
      fallbackValue !== null &&
      fallbackValue !== undefined &&
      fallbackValue !== ""
    ) {
      const fallback = Number(fallbackValue);
      if (Number.isFinite(fallback)) return fallback / 2.5;
    }
  }
  return null;
}

function categoryTagFor(product) {
  const genericTags = new Set([
    "en:food",
    "en:foods",
    "en:beverages",
    "en:beverage",
    "en:drinks",
    "en:sweetened-beverages",
    "en:sweetened-drinks",
    "en:sugary-drinks",
    "en:soft-drinks",
    "en:non-alcoholic-beverages",
    "en:plant-based-foods-and-beverages",
    "en:groceries",
  ]);
  return [...(product.categoriesTags || [])]
    .reverse()
    .find((tag) => tag.startsWith("en:") && !genericTags.has(tag));
}

function compareNutrition(original, alternative) {
  return comparisonNutrients.flatMap((definition) => {
    const originalValue = getComparableValue(original.nutrition, definition);
    const alternativeValue = getComparableValue(
      alternative.nutriments,
      definition,
    );
    if (originalValue === null || alternativeValue === null) return [];

    const difference = originalValue - alternativeValue;
    const percentLower =
      originalValue > 0 ? (difference / originalValue) * 100 : 0;
    return [
      {
        label: definition.label,
        unit: definition.unit,
        originalValue,
        alternativeValue,
        difference,
        percentLower,
        direction:
          difference > 0.005
            ? "lower"
            : difference < -0.005
              ? "higher"
              : "same",
        meaningfulReduction: difference >= definition.minimumDifference,
      },
    ];
  });
}

async function findHealthierAlternatives(original) {
  const categoryTag = categoryTagFor(original);
  const originalNutritionCount = comparisonNutrients.filter(
    (definition) => getComparableValue(original.nutrition, definition) !== null,
  ).length;
  if (!categoryTag) {
    original.alternativesStatus = "no-category";
    return original;
  }
  if (originalNutritionCount < 2) {
    original.alternativesStatus = "insufficient-original-data";
    return original;
  }

  const params = new URLSearchParams({
    action: "process",
    tagtype_0: "categories",
    tag_contains_0: "contains",
    tag_0: categoryTag,
    json: "1",
    page_size: "24",
    fields:
      "code,product_name,product_name_en,brands,categories_tags,nutriments,image_front_url",
  });

  try {
    const data = await fetchOpenFoodFacts(
      `${openFoodFactsOrigin}/cgi/search.pl?${params}`,
    );
    const ranked = (data.products || [])
      .filter(
        (candidate) =>
          candidate.code &&
          candidate.code !== original.barcode &&
          (candidate.product_name_en || candidate.product_name) &&
          candidate.categories_tags?.includes(categoryTag),
      )
      .map((candidate) => {
        const comparisons = compareNutrition(original, candidate);
        const improvements = comparisons.filter(
          (item) => item.meaningfulReduction,
        );
        const averageReduction = improvements.length
          ? improvements.reduce((total, item) => total + item.percentLower, 0) /
            improvements.length
          : 0;
        return { candidate, comparisons, improvements, averageReduction };
      })
      .filter(
        (item) => item.comparisons.length >= 2 && item.improvements.length > 0,
      )
      .sort(
        (left, right) =>
          right.improvements.length - left.improvements.length ||
          right.averageReduction - left.averageReduction,
      )
      .slice(0, 3);

    original.alternatives = ranked.map(
      ({ candidate, comparisons, improvements }) => ({
        name: candidate.product_name_en || candidate.product_name,
        brand: candidate.brands || "",
        barcode: candidate.code,
        image: candidate.image_front_url || "",
        comparisons,
        explanation: `Lower ${improvements.map((item) => `${item.label.toLowerCase()} by ${Number(item.percentLower.toFixed(0))}%`).join(" and ")} per 100 g / 100 ml.${
          comparisons.some((item) => item.direction === "higher")
            ? ` Higher ${comparisons
                .filter((item) => item.direction === "higher")
                .map((item) => item.label.toLowerCase())
                .join(" and ")} is shown below.`
            : ""
        }`,
      }),
    );
    original.alternativesStatus = original.alternatives.length
      ? "ready"
      : "no-supported-matches";
  } catch {
    original.alternativesStatus = "lookup-unavailable";
  }
  return original;
}

function nutritionEntries(nutrition = {}) {
  const definitions = [
    ["energy-kcal_100g", "Energy", "kcal"],
    ["proteins_100g", "Protein", "g"],
    ["carbohydrates_100g", "Carbohydrate", "g"],
    ["sugars_100g", "of which sugars", "g"],
    ["fat_100g", "Fat", "g"],
    ["salt_100g", "Salt", "g"],
  ];
  return definitions.flatMap(([key, label, unit]) => {
    const value = Number(nutrition[key]);
    return Number.isFinite(value)
      ? [{ label, value: `${Number(value.toFixed(1))} ${unit}` }]
      : [];
  });
}

function safeProductImage(image) {
  if (!image) return "";
  try {
    const url = new URL(image);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function escapeText(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
}

function renderResult(product) {
  const ratingClass = ["good", "okay", "bad"].includes(
    product.rating.toLowerCase(),
  )
    ? product.rating.toLowerCase()
    : "unavailable";
  const chips = product.ingredients
    .map((ingredient) => {
      const flagged = product.flagged.some(
        (flag) =>
          ingredient.toLocaleLowerCase().includes(flag.toLocaleLowerCase()) ||
          flag.toLocaleLowerCase().includes(ingredient.toLocaleLowerCase()),
      );
      return `<span class="ingredient-chip${flagged ? " ingredient-chip--flag" : ""}">${escapeText(ingredient)}</span>`;
    })
    .join("");
  const insights = [
    ...product.positives.map(
      (item) =>
        `<li><span class="insight-mark insight-mark--positive" aria-hidden="true">+</span><span>${escapeText(item)}</span></li>`,
    ),
    ...product.cautions.map(
      (item) =>
        `<li><span class="insight-mark insight-mark--caution" aria-hidden="true">!</span><span>${escapeText(item)}</span></li>`,
    ),
  ].join("");
  const alternatives = product.alternatives
    .map((item) => {
      const comparisons = item.comparisons
        .map((comparison) => {
          const originalValue = `${Number(comparison.originalValue.toFixed(2))} ${comparison.unit}`;
          const alternativeValue = `${Number(comparison.alternativeValue.toFixed(2))} ${comparison.unit}`;
          const change =
            comparison.direction === "lower"
              ? `↓ ${Number(Math.abs(comparison.difference).toFixed(2))} ${comparison.unit}`
              : comparison.direction === "higher"
                ? `↑ ${Number(Math.abs(comparison.difference).toFixed(2))} ${comparison.unit}`
                : "Similar";
          return `<div class="comparison-row"><span>${escapeText(comparison.label)}</span><span>${escapeText(originalValue)}</span><span>${escapeText(alternativeValue)}<small class="comparison-change comparison-change--${comparison.direction}">${escapeText(change)}</small></span></div>`;
        })
        .join("");
      const alternativeImage = safeProductImage(item.image);
      const originalImage = safeProductImage(product.image);
      return `<article class="comparison-card"><div class="comparison-products"><div class="comparison-product"><span class="comparison-label">CURRENT PRODUCT</span>${originalImage ? `<img src="${escapeText(originalImage)}" alt="" loading="lazy">` : ""}<strong>${escapeText(product.name)}</strong><small>${escapeText(product.brand || "Original")}</small></div><div class="comparison-product comparison-product--alternative"><span class="comparison-label">ALTERNATIVE</span>${alternativeImage ? `<img src="${escapeText(alternativeImage)}" alt="" loading="lazy">` : ""}<strong>${escapeText(item.name)}</strong><small>${escapeText(item.brand || "Open Food Facts")}</small></div></div><p class="comparison-explanation">${escapeText(item.explanation)}</p><div class="comparison-table"><div class="comparison-row comparison-row--head"><span>Per 100 g / 100 ml</span><span>Current</span><span>Alternative</span></div>${comparisons}</div></article>`;
    })
    .join("");
  const alternativeEmptyMessage =
    {
      "not-a-product":
        "Ingredient-only checks do not include enough product or nutrition data to recommend alternatives.",
      "no-category":
        "A specific food category is not available for this product, so no alternatives are shown.",
      "insufficient-original-data":
        "This product is missing at least two comparable nutrition values, so alternatives cannot be ranked reliably.",
      "lookup-unavailable":
        "We couldn't load same-category nutrition data. No alternatives are shown.",
      "no-supported-matches":
        "No same-category products with enough comparable nutrition data and a meaningful improvement were found.",
    }[product.alternativesStatus] ||
    "Search a live product to compare alternatives with verified category and nutrition data.";
  const alternativeContent =
    alternatives ||
    `<p class="alternatives-empty">${escapeText(alternativeEmptyMessage)}</p>`;
  const image = safeProductImage(product.image);
  const imageMarkup = image
    ? `<img class="product-image" src="${escapeText(image)}" alt="${escapeText(product.name)} product photo" loading="lazy">`
    : "";
  const scoreMarkup = Number.isFinite(product.score)
    ? `<div class="score-ring" style="--score:${product.score}" role="img" aria-label="Ingredient heuristic score ${product.score} out of 100"><div class="score-ring-inner"><span class="score-value">${product.score}</span><span class="score-caption">HEURISTIC</span></div></div>`
    : "";
  const metadata = [
    product.brand,
    product.quantity,
    product.barcode ? `Barcode ${product.barcode}` : "",
  ]
    .filter(Boolean)
    .map(escapeText)
    .join(" · ");
  const ingredientMarkup =
    product.ingredientsAvailable === false
      ? '<p class="nutrition-unavailable">Ingredient information is unavailable for this product.</p>'
      : chips ||
        '<p class="nutrition-unavailable">No ingredient text was provided.</p>';
  const nutrients = nutritionEntries(product.nutrition);
  const nutritionMarkup = product.isSample
    ? ""
    : `<div class="analysis-divider"></div><h4 class="detail-label">Nutrition per 100 g / 100 ml</h4>${nutrients.length ? `<div class="nutrition-grid">${nutrients.map((item) => `<div class="nutrition-item"><strong>${escapeText(item.value)}</strong><span>${escapeText(item.label)}</span></div>`).join("")}</div>` : '<p class="nutrition-unavailable">Nutrition facts are unavailable in this catalog entry.</p>'}`;
  const ratingText =
    ratingClass === "unavailable"
      ? "Unavailable · ingredient data was not provided"
      : `${escapeText(product.rating)} · ingredient-list heuristic, not a nutrition grade`;
  const sourceText = product.isSample ? "SAMPLE CHECK" : "OPEN FOOD FACTS";

  analysisContent.innerHTML = `
		<article class="analysis-card">
      ${imageMarkup}
			<div class="analysis-summary">
        <div><p class="product-kicker">${escapeText(product.category)} · ${sourceText}</p><h3 class="product-title">${escapeText(product.name)}</h3><p class="product-description">${escapeText(product.description)}</p>${metadata ? `<p class="product-meta">${metadata}</p>` : ""}</div>
        ${scoreMarkup}
			</div>
      <div class="classification classification--${ratingClass}"><span class="classification-dot"></span>${ratingText}</div>
			<div class="analysis-divider"></div>
			<h4 class="detail-label">Ingredients in this check</h4>
      <div class="ingredient-chips">${ingredientMarkup}</div>
      ${nutritionMarkup}
			<div class="analysis-divider"></div>
			<h4 class="detail-label">What stands out</h4>
			<ul class="insight-list">${insights}</ul>
		</article>
		<aside class="analysis-card alternatives-card" aria-labelledby="result-alternatives-title">
      <p class="detail-label">NUTRITION-BASED COMPARISON</p><h3 id="result-alternatives-title">Similar products</h3>
      <div class="alternative-list">${alternativeContent}</div>
      ${alternatives ? '<p class="alternatives-footnote">Comparisons use catalog values per 100 g / 100 ml. Check the current package; recipes and serving sizes can vary.</p>' : ""}
		</aside>`;
  resultsSection.hidden = false;
  hideFeedback();
  resultsSection.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}

async function startAnalysis(makeProduct, searchText = "Reading the label…") {
  if (isAnalyzing) return;
  isAnalyzing = true;
  showFeedback(searchText, "loading");
  try {
    const result = await makeProduct();
    isAnalyzing = false;
    if (!result) {
      showFeedback(
        "We couldn't find a matching product in Open Food Facts. Check the spelling or barcode, or paste the ingredients to analyze the label.",
        "error",
      );
      return;
    }
    renderResult(result);
  } catch (error) {
    isAnalyzing = false;
    showFeedback(
      error.name === "AbortError"
        ? "The product lookup took too long. Try again, or paste the ingredients instead."
        : "Open Food Facts couldn't be reached. Check your connection and try again, or paste the ingredients instead.",
      "error",
    );
  }
}

function stopCamera() {
  if (barcodeTimer) window.clearInterval(barcodeTimer);
  barcodeTimer = undefined;
  if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
  cameraStream = undefined;
  cameraVideo.srcObject = null;
  cameraPlaceholder.hidden = false;
}

async function scanForBarcode() {
  if (typeof BarcodeDetector === "undefined") {
    cameraMessage.textContent =
      "This browser can show the camera, but it can't read barcodes here. Use Ingredient list to paste the label instead.";
    cameraMessage.classList.add("is-error");
    return;
  }

  try {
    const detector = new BarcodeDetector({
      formats: ["ean_13", "ean_8", "upc_a", "upc_e"],
    });
    barcodeTimer = window.setInterval(async () => {
      if (!cameraVideo.readyState || cameraVideo.readyState < 2) return;
      try {
        const codes = await detector.detect(cameraVideo);
        if (!codes.length) return;
        const barcode = codes[0].rawValue;
        stopCamera();
        cameraDialog.close();
        setMode("product");
        productInput.value = barcode;
        startAnalysis(
          () => lookupBarcode(barcode),
          "Looking up barcode in Open Food Facts…",
        );
        document
          .querySelector("#scanner")
          .scrollIntoView({ behavior: "smooth", block: "start" });
      } catch {
        cameraMessage.textContent =
          "Couldn't read that barcode. Hold it steady in the frame, or paste the ingredient list instead.";
      }
    }, 450);
  } catch {
    cameraMessage.textContent =
      "Barcode scanning isn't available in this browser. You can still paste the ingredient list to check it.";
    cameraMessage.classList.add("is-error");
  }
}

async function openCamera(mode = "barcode") {
  cameraMode = mode;
  const isLabelPhoto = mode === "label";
  cameraEyebrow.textContent = isLabelPhoto
    ? "INGREDIENT LABEL PHOTO"
    : "BARCODE SCAN";
  cameraTitle.textContent = isLabelPhoto
    ? "Frame the ingredient list."
    : "Point at the barcode.";
  captureLabelButton.hidden = !isLabelPhoto;
  dialogUploadButton.hidden = !isLabelPhoto;
  cameraMessage.textContent = isLabelPhoto
    ? "Your image stays in this browser while Tesseract reads the label."
    : "Your camera stays on this device. Product details come from Open Food Facts.";
  cameraMessage.classList.remove("is-error");
  cameraPlaceholder.hidden = false;
  cameraDialog.showModal();

  if (!navigator.mediaDevices?.getUserMedia) {
    cameraMessage.textContent =
      "Camera access isn't available here. Open this page on a secure connection, or paste the ingredient list instead.";
    cameraMessage.classList.add("is-error");
    return;
  }

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    cameraVideo.srcObject = cameraStream;
    cameraPlaceholder.hidden = true;
    if (!isLabelPhoto) await scanForBarcode();
  } catch (error) {
    const denied =
      error.name === "NotAllowedError" ||
      error.name === "PermissionDeniedError";
    cameraMessage.textContent = denied
      ? "Camera permission was blocked. Allow camera access in your browser settings, or paste the ingredient list instead."
      : "We couldn't start the camera. Check that no other app is using it, or paste the ingredient list instead.";
    cameraMessage.classList.add("is-error");
    stopCamera();
  }
}

async function processLabelImage(file) {
  if (!file || !file.type.startsWith("image/")) {
    showFeedback("Choose an image file of the ingredient label.", "error");
    return;
  }
  if (file.size > 15 * 1024 * 1024) {
    showFeedback(
      "That image is over 15 MB. Choose a smaller photo and try again.",
      "error",
    );
    return;
  }

  if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
  imagePreviewUrl = URL.createObjectURL(file);
  imagePreview.src = imagePreviewUrl;
  imagePreview.hidden = false;
  ocrReview.hidden = false;
  ocrText.value = "";
  ocrStatus.textContent = "Preparing the image for text recognition…";
  showFeedback("Reading the ingredient label…", "loading");
  ocrReview.scrollIntoView({ behavior: "smooth", block: "nearest" });

  if (!window.Tesseract?.createWorker) {
    ocrStatus.textContent =
      "Text recognition did not load. Check your connection, or type the label into this box.";
    showFeedback(
      "Tesseract.js could not be loaded. You can still type or paste the ingredients below.",
      "error",
    );
    ocrText.focus();
    return;
  }

  let worker;
  try {
    worker = await window.Tesseract.createWorker("eng", 1, {
      logger: (message) => {
        if (message.status === "recognizing text") {
          ocrStatus.textContent = `Reading text… ${Math.round(message.progress * 100)}%`;
        }
      },
    });
    const { data } = await worker.recognize(file);
    ocrText.value = data.text.trim();
    ocrStatus.textContent = ocrText.value
      ? "Review the extracted text and correct any mistakes before analyzing."
      : "No text was detected. Try a sharper, well-lit photo or type the ingredients here.";
    hideFeedback();
    ocrText.focus({ preventScroll: true });
  } catch {
    ocrStatus.textContent =
      "We couldn't read this image. Try a sharper photo, or type the ingredients here.";
    showFeedback(
      "Text recognition failed for this image. You can still type or paste the ingredients below.",
      "error",
    );
  } finally {
    if (worker) await worker.terminate();
  }
}

function clearOcrReview() {
  if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
  imagePreviewUrl = undefined;
  imagePreview.removeAttribute("src");
  imagePreview.hidden = true;
  ocrText.value = "";
  ocrReview.hidden = true;
  imageInput.value = "";
  hideFeedback();
}

function captureIngredientPhoto() {
  if (!cameraVideo.videoWidth || !cameraVideo.videoHeight) {
    cameraMessage.textContent =
      "The camera is still starting. Try again in a moment.";
    return;
  }
  const canvas = document.createElement("canvas");
  canvas.width = cameraVideo.videoWidth;
  canvas.height = cameraVideo.videoHeight;
  canvas.getContext("2d").drawImage(cameraVideo, 0, 0);
  canvas.toBlob(
    (blob) => {
      if (!blob) {
        cameraMessage.textContent =
          "We couldn't capture that photo. Try again or upload an image instead.";
        return;
      }
      const image = new File([blob], "ingredient-label.jpg", {
        type: "image/jpeg",
      });
      stopCamera();
      cameraDialog.close();
      processLabelImage(image);
    },
    "image/jpeg",
    0.92,
  );
}

document
  .querySelectorAll(".mode-tab")
  .forEach((tab) =>
    tab.addEventListener("click", () => setMode(tab.dataset.mode)),
  );

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = productInput.value.trim();
  if (!query) {
    showFeedback(
      "Enter a product name to get started, or paste the ingredients instead.",
      "error",
    );
    productInput.focus();
    return;
  }
  const barcode = query.replace(/[\s-]/g, "");
  const isBarcode = /^\d{8,14}$/.test(barcode);
  startAnalysis(
    () => (isBarcode ? lookupBarcode(barcode) : lookupProduct(query)),
    isBarcode
      ? "Looking up barcode in Open Food Facts…"
      : "Searching Open Food Facts…",
  );
});

ingredientsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const rawIngredients = ingredientsInput.value.trim();
  if (!rawIngredients) {
    showFeedback(
      "Paste the ingredients from the package to get a quick read.",
      "error",
    );
    ingredientsInput.focus();
    return;
  }
  startAnalysis(() => Promise.resolve(analyzeIngredients(rawIngredients)));
});

document.querySelectorAll("[data-example]").forEach((button) =>
  button.addEventListener("click", () => {
    setMode("product");
    productInput.value = button.dataset.example;
    startAnalysis(() =>
      Promise.resolve(findCatalogProduct(button.dataset.example)),
    );
  }),
);

document.querySelector("#new-check").addEventListener("click", () => {
  resultsSection.hidden = true;
  document
    .querySelector("#scanner")
    .scrollIntoView({ behavior: "smooth", block: "start" });
  (activeMode === "product" ? productInput : ingredientsInput).focus({
    preventScroll: true,
  });
});

document.querySelector("#open-camera").addEventListener("click", openCamera);
document
  .querySelector("#open-label-camera")
  .addEventListener("click", () => openCamera("label"));
document
  .querySelector("#capture-label")
  .addEventListener("click", captureIngredientPhoto);
document
  .querySelector("#upload-label")
  .addEventListener("click", () => imageInput.click());
document
  .querySelector("#dialog-upload")
  .addEventListener("click", () => imageInput.click());
imageInput.addEventListener("change", () => {
  const [file] = imageInput.files || [];
  if (file) {
    if (cameraDialog.open) cameraDialog.close();
    processLabelImage(file);
  }
});
document.querySelector("#analyze-ocr").addEventListener("click", () => {
  const rawIngredients = ocrText.value.trim();
  if (!rawIngredients) {
    ocrStatus.textContent =
      "Add or correct the ingredient text before analyzing.";
    ocrText.focus();
    return;
  }
  startAnalysis(() => Promise.resolve(analyzeIngredients(rawIngredients)));
});
document.querySelector("#clear-ocr").addEventListener("click", clearOcrReview);
document
  .querySelector("#close-camera")
  .addEventListener("click", () => cameraDialog.close());
document
  .querySelector("#close-camera-secondary")
  .addEventListener("click", () => cameraDialog.close());
cameraDialog.addEventListener("close", stopCamera);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cameraDialog.open) stopCamera();
});
