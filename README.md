# ChefAI: Smarter Cooking with AI 🍳

> **Live Demo:** [https://chef-ai-app.onrender.com](https://chef-ai-app.onrender.com)

Inspired by modern themeable web applications, **ChefAI** is an intelligent culinary assistant designed to eliminate food waste, recommend recipes based on available fridge ingredients, and guide users through interactive cooking sessions with live timers and checklist management.

## 🌟 Key Features

1. **Multi-Color Theme Engine**:
   - 6 rich themes with live gradient swatches:
     - **Chef Classic** (Warm Amber & Copper)
     - **Sunset Glow** (Crimson & Rose)
     - **Emerald Herb** (Botanical Mint & Forest)
     - **Royal Plum** (Violet & Lavender)
     - **Midnight Slate** (Deep Cyber Cyan)
     - **Ocean Aegean** (Navy & Coastal Teal)
   - Automatically saved to `localStorage`.

2. **AI "Fridge-to-Feast" Pantry Matcher**:
   - Tap what ingredients you have in your kitchen (Eggs, Garlic, Salmon, Spinach, Pasta, etc.) or type custom items.
   - The backend AI algorithm matches catalog items or generates an instant custom zero-waste recipe tailored to your exact kitchen inventory.

3. **Integrated AI Chat Assistant**:
   - Ask anything about cooking, recipes, substitutions, or techniques.
   - Smart context-aware responses covering 30+ culinary topics.
   - Available on every page via the floating chat bubble.

4. **Interactive Step-by-Step Cooking Mode**:
   - **Clickable Ingredient Checklist**: Check items off as you prep them (items strike through dynamically).
   - **Integrated Kitchen Countdown Timer**: Built-in timer with Start, Pause, Reset, and an audible chime generated via the Web Audio API when time expires!
   - Full nutritional breakdown (Calories, Protein, Carbs, Fats).

5. **Instant Search & Category Filtering**:
   - Real-time search by title, ingredient, or cuisine.
   - Filter by: High Protein, Quick (<20m), Vegetarian, Low Carb, Italian, Asian, Dessert.
   - Bookmarking system to save favorite recipes.

6. **Ultra-Responsive Layout**:
   - Works seamlessly on mobile devices (375px+) and desktops.

## 🚀 Quick Start (Local)

```bash
git clone https://github.com/guruvelah/chef-ai-app.git
cd chef-ai-app
npm install
npm start
```

Open **[http://localhost:5000](http://localhost:5000)** in your browser!

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Frontend | Vanilla HTML/CSS/JS |
| AI Chat | Rule-based NLP engine (server-side) |
| Deployment | Render (Free Tier) |

## 📁 Project Structure

```
chef-ai-app/
├── server.js          # Express server + AI chat API
├── package.json       # Dependencies
├── public/
│   ├── index.html     # Main SPA shell
│   ├── style.css      # Theme system + responsive layout
│   └── app.js         # Frontend logic (recipes, themes, AI chat)
└── README.md
```

## 🌐 Deployment

Deployed on **Render** free tier:
- **Live URL:** https://chef-ai-app.onrender.com
- Start command: `npm start`
- Node version: 18+

## 👨‍💻 Author

**Guruvelah A S** — [GitHub](https://github.com/guruvelah)

---
*Built with ❤️ for the love of cooking and technology.*
