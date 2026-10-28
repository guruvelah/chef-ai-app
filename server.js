const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Curated Master Recipes
const RECIPES = [
  {
    id: 1,
    title: "Garlic Butter Tuscan Salmon",
    category: "High Protein",
    cuisine: "Italian",
    time: 25,
    difficulty: "Medium",
    calories: 480,
    protein: "42g",
    carbs: "8g",
    fat: "32g",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    description: "Pan-seared salmon fillets in a luscious sun-dried tomato, spinach, and garlic cream sauce.",
    ingredients: [
      "2 fresh salmon fillets (6 oz each)",
      "2 cloves garlic, minced",
      "1 cup fresh baby spinach",
      "1/2 cup heavy cream (or coconut milk)",
      "1/3 cup sun-dried tomatoes, drained",
      "2 tbsp olive oil & 1 tbsp butter",
      "1/4 cup freshly grated parmesan",
      "Salt, freshly cracked black pepper & red pepper flakes"
    ],
    steps: [
      "Season salmon fillets on both sides with salt, pepper, and a pinch of paprika.",
      "Heat olive oil and butter in a large skillet over medium-high heat. Sear salmon skin-side down for 5 minutes until crispy, flip and cook for 3 minutes. Remove to a warm plate.",
      "In the same skillet, add minced garlic and sun-dried tomatoes. Sauté for 1 minute until fragrant.",
      "Reduce heat to medium-low, pour in cream, and bring to a gentle simmer. Stir in parmesan until melted.",
      "Fold in fresh spinach until wilted. Return salmon to the skillet and spoon sauce over the fillets.",
      "Garnish with fresh basil and serve immediately with lemon wedges."
    ]
  },
  {
    id: 2,
    title: "Crispy Chili Garlic Tofu Bowls",
    category: "Vegetarian",
    cuisine: "Asian",
    time: 20,
    difficulty: "Easy",
    calories: 390,
    protein: "24g",
    carbs: "45g",
    fat: "14g",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    description: "Golden cubed tofu tossed in a sweet and spicy chili garlic glaze, served over jasmine rice with sesame greens.",
    ingredients: [
      "1 block extra firm tofu, pressed and cubed",
      "2 tbsp cornstarch",
      "2 tbsp soy sauce or tamari",
      "1.5 tbsp chili garlic crisp or Sriracha",
      "1 tbsp honey or maple syrup",
      "1 tsp sesame oil",
      "1 cup cooked jasmine rice or quinoa",
      "Sliced scallions, toasted sesame seeds & edamame"
    ],
    steps: [
      "Toss cubed tofu in cornstarch with a pinch of salt until evenly coated.",
      "Heat vegetable oil in a skillet over medium-high heat. Pan-fry tofu for 7-8 minutes, rotating until all sides are crunchy and golden.",
      "In a small bowl, whisk soy sauce, chili garlic crisp, honey, and sesame oil.",
      "Pour sauce into the pan with tofu. Toss vigorously for 60 seconds until sauce bubbles and forms a sticky glaze.",
      "Assemble bowls: scoop warm rice, top with glazed tofu, edamame, sliced scallions, and toasted sesame seeds."
    ]
  },
  {
    id: 3,
    title: "15-Minute Creamy Avocado Pesto Pasta",
    category: "Quick",
    cuisine: "Italian",
    time: 15,
    difficulty: "Easy",
    calories: 420,
    protein: "14g",
    carbs: "58g",
    fat: "18g",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=800&q=80",
    description: "Silky, no-cook avocado and fresh basil pesto clinging to al dente penne with blistered cherry tomatoes.",
    ingredients: [
      "8 oz penne or fettuccine pasta",
      "1 ripe Haas avocado, pitted",
      "1 cup fresh basil leaves",
      "2 cloves garlic",
      "2 tbsp extra virgin olive oil",
      "1 tbsp fresh lemon juice",
      "1/4 cup pine nuts or toasted walnuts",
      "1 cup cherry tomatoes, halved"
    ],
    steps: [
      "Bring a large pot of salted water to boil. Cook pasta according to package instructions until al dente. Reserve 1/2 cup pasta cooking water.",
      "In a food processor, blend avocado, fresh basil, garlic, olive oil, lemon juice, pine nuts, and a pinch of salt until velvety smooth.",
      "In a skillet, quickly blister halved cherry tomatoes in 1 tsp olive oil over high heat for 2 minutes.",
      "Drain pasta and return to warm pot. Toss immediately with avocado pesto and 2-3 tbsp reserved pasta water to emulsify.",
      "Garnish with blistered tomatoes, cracked black pepper, and shaved parmesan."
    ]
  },
  {
    id: 4,
    title: "Smoky Chipotle Chicken Burrito Bowl",
    category: "High Protein",
    cuisine: "Mexican",
    time: 25,
    difficulty: "Medium",
    calories: 520,
    protein: "48g",
    carbs: "46g",
    fat: "16g",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    description: "Tender chipotle-marinated chicken breast over cilantro lime brown rice, black beans, charred corn, and guacamole.",
    ingredients: [
      "2 chicken breasts, cut into bite-sized strips",
      "1 tbsp chipotle adobo sauce",
      "1 tsp ground cumin & smoked paprika",
      "1 can black beans, rinsed and warmed",
      "1 cup roasted corn kernels",
      "1.5 cups cooked brown rice tossed with chopped cilantro and lime",
      "Fresh guacamole, salsa verde & Greek yogurt"
    ],
    steps: [
      "Toss chicken strips with chipotle adobo sauce, olive oil, cumin, paprika, and salt.",
      "Sear chicken in a smoking hot skillet for 6-8 minutes until slightly charred and thoroughly cooked through.",
      "Season warm brown rice with fresh lime juice, zest, and minced cilantro.",
      "Layer bowls with cilantro rice, seasoned black beans, sweet corn, and chipotle chicken.",
      "Top with generous scoops of fresh guacamole, salsa verde, and a dollop of Greek yogurt as a healthy sour cream substitute."
    ]
  },
  {
    id: 5,
    title: "Mediterranean Shakshuka with Poached Eggs",
    category: "Vegetarian",
    cuisine: "Mediterranean",
    time: 20,
    difficulty: "Easy",
    calories: 310,
    protein: "19g",
    carbs: "18g",
    fat: "18g",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80",
    description: "Eggs gently poached in a rich spiced tomato, bell pepper, and cumin sauce, topped with creamy crumbled feta.",
    ingredients: [
      "4 large organic eggs",
      "1 can (14 oz) crushed San Marzano tomatoes",
      "1 red bell pepper, thinly diced",
      "1 yellow onion, chopped",
      "3 cloves garlic, minced",
      "1 tsp ground cumin & 1 tsp smoked paprika",
      "1/4 cup crumbled feta cheese",
      "Fresh cilantro or parsley, warm crusty sourdough"
    ],
    steps: [
      "Sauté diced onions and bell pepper in olive oil for 5 minutes until softened and translucent.",
      "Stir in minced garlic, ground cumin, smoked paprika, and a pinch of chili flakes. Cook for 1 minute.",
      "Pour in crushed tomatoes, season with salt and black pepper, and simmer on medium-low for 8 minutes until thickened.",
      "Use the back of a spoon to make 4 small wells in the simmering sauce. Gently crack one egg into each well.",
      "Cover skillet with a lid and cook for 5-7 minutes until egg whites are set but yolks remain gloriously runny.",
      "Sprinkle with crumbled feta and fresh herbs. Serve directly from skillet with warm crusty bread."
    ]
  },
  {
    id: 6,
    title: "Thai Green Curry with Crispy Vegetables",
    category: "Quick",
    cuisine: "Asian",
    time: 20,
    difficulty: "Medium",
    calories: 440,
    protein: "16g",
    carbs: "22g",
    fat: "32g",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
    description: "Aromatic coconut milk infused with authentic green curry paste, bamboo shoots, bell peppers, and fresh Thai basil.",
    ingredients: [
      "1 can full-fat coconut milk (13.5 oz)",
      "2.5 tbsp authentic Thai green curry paste",
      "1 cup sugar snap peas or green beans",
      "1 red bell pepper, sliced into strips",
      "1 cup bamboo shoots, drained",
      "1 tbsp coconut sugar & 1 tbsp soy sauce",
      "Handful of fresh Thai basil leaves",
      "Lime wedges and steamed jasmine rice"
    ],
    steps: [
      "Heat 3 tbsp of the thick coconut cream from top of can in a wok over medium-high heat. Whisk in green curry paste for 2 minutes until oil separates and aroma blooms.",
      "Pour in the remaining coconut milk along with 1/4 cup vegetable broth. Bring to a gentle boil.",
      "Add red bell peppers, snap peas, and bamboo shoots. Simmer for 6 minutes until vegetables are tender-crisp.",
      "Season with coconut sugar and soy sauce. Remove from heat and stir in fresh Thai basil leaves.",
      "Ladle over steamed jasmine rice with a squeeze of fresh lime juice."
    ]
  },
  {
    id: 7,
    title: "Keto Garlic Butter Ribeye with Asparagus",
    category: "Low Carb",
    cuisine: "American",
    time: 20,
    difficulty: "Medium",
    calories: 620,
    protein: "52g",
    carbs: "4g",
    fat: "44g",
    image: "https://images.unsplash.com/photo-1600891964292-8051261e4a30?auto=format&fit=crop&w=800&q=80",
    description: "Cast-iron seared ribeye basted in foaming herb butter alongside tender charred asparagus spears.",
    ingredients: [
      "1 prime ribeye steak (12 oz, room temperature)",
      "1 bunch fresh asparagus, trimmed",
      "3 tbsp unsalted butter",
      "3 cloves crushed garlic",
      "Fresh thyme & rosemary sprigs",
      "Coarse sea salt & freshly cracked black pepper"
    ],
    steps: [
      "Pat ribeye completely dry with paper towels. Season generously with coarse salt and pepper.",
      "Heat a heavy cast-iron skillet over high heat until smoking. Add 1 tbsp avocado oil, then lay steak in pan.",
      "Sear undisturbed for 3 minutes for a dark golden crust. Flip and sear the other side for 2 minutes.",
      "Reduce heat to medium, drop in butter, crushed garlic, thyme, and rosemary. Tilt pan and continuously baste foaming butter over steak for 2 minutes.",
      "Remove steak to rest on a cutting board for 8 minutes.",
      "Toss asparagus directly into the garlicky pan drippings and sauté for 4 minutes until bright green and tender. Slice steak against the grain and serve."
    ]
  },
  {
    id: 8,
    title: "Warm Berry Chia French Toast Crumble",
    category: "Dessert",
    cuisine: "Bakery",
    time: 15,
    difficulty: "Easy",
    calories: 360,
    protein: "18g",
    carbs: "48g",
    fat: "10g",
    image: "https://images.unsplash.com/photo-1484723091739-00822c710c80?auto=format&fit=crop&w=800&q=80",
    description: "Brioche soaked in vanilla cinnamon custard, griddled golden and topped with warm berry chia compote.",
    ingredients: [
      "4 slices thick brioche or challah",
      "2 large eggs beaten with 1/3 cup milk",
      "1 tsp pure vanilla extract & 1/2 tsp cinnamon",
      "1.5 cups mixed wild berries (fresh or frozen)",
      "1 tbsp chia seeds & 1 tbsp pure maple syrup",
      "Greek yogurt or mascarpone for topping"
    ],
    steps: [
      "In a small saucepan, simmer mixed berries with maple syrup for 5 minutes until jammy. Stir in chia seeds and remove from heat to thicken.",
      "In a shallow dish, whisk eggs, milk, vanilla, and cinnamon.",
      "Dip brioche slices into custard for 15 seconds per side.",
      "Melt butter on a hot griddle. Cook French toast for 3 minutes per side until golden brown and caramelized.",
      "Plate French toast, spoon warm berry chia compote over top, and finish with a scoop of cool Greek yogurt."
    ]
  }
];

// Endpoint: All Recipes
app.get('/api/recipes', (req, res) => {
  const { category, search } = req.query;
  let results = RECIPES;

  if (category && category !== 'All') {
    results = results.filter(r => r.category.toLowerCase() === category.toLowerCase() || r.cuisine.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(r => 
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.ingredients.some(i => i.toLowerCase().includes(q))
    );
  }

  res.json({ count: results.length, recipes: results });
});

// Endpoint: AI Fridge-to-Feast Ingredient Matcher
app.post('/api/ai-recipe', (req, res) => {
  const { ingredients, dietary, maxTime } = req.body || {};
  const inputList = Array.isArray(ingredients) ? ingredients : (ingredients || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

  if (inputList.length === 0) {
    return res.status(400).json({ error: "Please provide at least 1 ingredient from your kitchen!" });
  }

  // Calculate ingredient overlap against catalog
  const scored = RECIPES.map(recipe => {
    let matchScore = 0;
    const matchedItems = [];

    inputList.forEach(input => {
      const found = recipe.ingredients.some(ing => ing.toLowerCase().includes(input));
      if (found) {
        matchScore++;
        matchedItems.push(input);
      }
    });

    return {
      recipe,
      matchScore,
      matchPercentage: Math.min(100, Math.round((matchScore / Math.max(1, inputList.length)) * 100)),
      matchedIngredients: matchedItems
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const bestMatch = scored[0];

  // If match is moderate or good, return matched recipe plus AI adaptation tips
  if (bestMatch && bestMatch.matchScore > 0) {
    return res.json({
      type: "matched",
      headline: `ChefAI found an optimal match: ${bestMatch.recipe.title}!`,
      matchPercentage: Math.max(45, bestMatch.matchPercentage),
      recipe: bestMatch.recipe,
      matchedItems: bestMatch.matchedIngredients,
      chefTip: `You have ${bestMatch.matchedIngredients.join(', ')} ready! You can swap any missing garnishes with items already in your pantry.`
    });
  }

  // Otherwise generate custom creative AI recipe from scratch using supplied ingredients
  const mainIng = inputList[0] || "pantry staples";
  const secIng = inputList[1] || "fresh herbs";
  const generated = {
    id: 999,
    title: `Rustic Pan-Seared ${capitalize(mainIng)} & ${capitalize(secIng)} Skillet`,
    category: dietary || "Custom AI Creation",
    cuisine: "Fusion",
    time: maxTime || 20,
    difficulty: "Easy",
    calories: 410,
    protein: "28g",
    carbs: "22g",
    fat: "20g",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    description: `A custom recipe crafted by ChefAI utilizing your exact kitchen ingredients: ${inputList.join(', ')}.`,
    ingredients: inputList.map(i => `1 portion ${i}`).concat([
      "2 tbsp olive oil or butter",
      "2 cloves minced garlic",
      "Pinch of sea salt and freshly ground pepper",
      "Splash of fresh lemon juice or vinegar"
    ]),
    steps: [
      `Prep all ingredients: wash, chop, and season ${inputList.join(' and ')}.`,
      "Heat olive oil in a heavy-bottomed pan over medium-high heat until shimmering.",
      `Add ${mainIng} first to develop deep caramelization for 4-5 minutes.`,
      `Toss in ${inputList.slice(1).join(', ') || 'garlic'} and sauté for 3-4 minutes until tender.`,
      "Deglaze pan with a splash of water, lemon juice, or broth to create an instant silky pan sauce.",
      "Plate hot, finish with cracked black pepper, and enjoy your zero-waste meal!"
    ]
  };

  res.json({
    type: "generated",
    headline: `ChefAI created a custom zero-waste recipe for your kitchen!`,
    matchPercentage: 98,
    recipe: generated,
    matchedItems: inputList,
    chefTip: "No extra grocery trip needed! This dish maximizes flavor extraction from what you already own."
  });
});

// Integrated AI Culinary Assistant API
app.post('/api/chat', (req, res) => {
  const { message } = req.body || {};
  const q = (message || '').toLowerCase().trim();

  if (!q) {
    return res.status(400).json({ reply: "Please ask a culinary question or ingredient substitution!" });
  }

  let reply = "";
  let type = "chef_advice";

  if (q.includes("substitute") || q.includes("replace")) {
    if (q.includes("heavy cream") || q.includes("cream")) {
      reply = "To substitute heavy cream: Use full-fat canned coconut milk (1:1 ratio for dairy-free), or blend 3/4 cup whole milk with 1/3 cup melted unsalted butter.";
    } else if (q.includes("egg") || q.includes("eggs")) {
      reply = "For baking or binding: 1 egg = 1 tbsp chia seeds + 3 tbsp water (wait 5 mins), or 1/4 cup unsweetened applesauce, or 1/4 cup mashed banana.";
    } else if (q.includes("butter")) {
      reply = "Substitute butter with: Extra virgin olive oil (3:4 ratio), refined coconut oil (1:1), or mashed ripe avocado in spreads.";
    } else if (q.includes("parmesan") || q.includes("cheese")) {
      reply = "For a dairy-free umami parmesan substitute, use Nutritional Yeast flakes (1:1) or finely ground salted cashews with garlic powder.";
    } else {
      reply = `To substitute for that ingredient: Try matching the acidity, moisture, or fat content! For example, citrus juice can replace vinegar, and plain Greek yogurt can replace sour cream.`;
    }
  } else if (q.includes("salmon") || q.includes("fish")) {
    reply = "Pro Chef Salmon Tip: Sear skin-side down in a hot skillet for 80% of the cooking time (about 5 mins) to get ultra-crispy skin, then flip for just 2-3 mins. Internal temp should hit 125°F-130°F for tender medium-rare.";
  } else if (q.includes("tofu")) {
    reply = "To get ultra-crispy tofu: Always press the water out for 15 minutes between paper towels, cube it, and toss thoroughly in cornstarch with a pinch of salt before pan-frying!";
  } else if (q.includes("pasta") || q.includes("al dente")) {
    reply = "Always salt your pasta water generously (it should taste like the ocean) and cook 1-2 minutes LESS than the box directions. Finish cooking the pasta directly in the skillet with your sauce and 2 tbsp of starchy pasta water!";
  } else if (q.includes("how does") || q.includes("what is chefai") || q.includes("how to use")) {
    reply = "ChefAI helps you cook zero-waste meals! Tap the ingredients you have in the 'What's in your kitchen?' fridge scanner, and click 'Cook with My Fridge'. You can also search recipes, filter by diet, and use our interactive step-by-step cooking mode with a live kitchen timer!";
  } else if (q.includes("timer") || q.includes("cooking mode")) {
    reply = "Click 'Start Cooking' on any recipe card to open Cooking Mode. It includes an interactive checklist where you can check off ingredients as you prep, plus a live kitchen countdown timer with sound notifications!";
  } else {
    reply = `Great culinary question! For "${message}": Balance flavor across the 5 pillars—Salt, Fat, Acid, Heat, and Umami. If your dish tastes flat, try adding a squeeze of fresh lemon juice or a dash of flaky sea salt!`;
  }

  res.json({
    reply,
    type,
    timestamp: new Date().toISOString()
  });
});

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

app.listen(PORT, () => {
  console.log(`🍳 ChefAI server is running at http://localhost:${PORT}`);
});
