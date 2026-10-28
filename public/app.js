// ChefAI Application Engine
let allRecipes = [];
let savedRecipeIds = new Set(JSON.parse(localStorage.getItem('chef-bookmarks') || '[]'));
let selectedIngredients = new Set();
let activeCategory = 'All';

// Cooking Timer State
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  fetchRecipes();
  setupSearch();
  setupFilterChips();
  setupFridgePicker();
  setupBookmarkNav();
  setupModalHandlers();
});

// 1. Theme Engine (inspired by mj-shoppingapp.vercel.app)
function initThemeEngine() {
  const savedTheme = localStorage.getItem('chef-theme') || 'chef';
  setTheme(savedTheme);

  const toggleBtn = document.getElementById('theme-toggle-btn');
  const menu = document.getElementById('theme-menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      menu.classList.remove('show');
    });

    menu.querySelectorAll('.theme-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const theme = opt.getAttribute('data-theme');
        setTheme(theme);
        menu.classList.remove('show');
      });
    });
  }
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('chef-theme', theme);

  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-theme') === theme);
  });

  const label = document.getElementById('theme-label');
  if (label) {
    const names = {
      chef: 'Chef Classic',
      sunset: 'Sunset Glow',
      emerald: 'Emerald Herb',
      royal: 'Royal Plum',
      midnight: 'Midnight Slate',
      ocean: 'Ocean Aegean'
    };
    label.textContent = names[theme] || 'Theme';
  }
}

// 2. Fetch and Render Recipes
async function fetchRecipes(category = 'All', search = '') {
  try {
    let url = '/api/recipes?';
    if (category && category !== 'All') url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;

    const res = await fetch(url);
    const data = await res.json();
    allRecipes = data.recipes || [];
    renderRecipes(allRecipes);
  } catch (err) {
    console.error('Failed to load recipes:', err);
  }
}

function renderRecipes(recipes) {
  const grid = document.getElementById('recipes-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (recipes.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">🍳 No recipes matched your search.</p>
        <p style="font-size: 0.9rem;">Try selecting different ingredients or clearing filters.</p>
      </div>
    `;
    return;
  }

  recipes.forEach(recipe => {
    const isBookmarked = savedRecipeIds.has(recipe.id);
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.innerHTML = `
      <div class="recipe-img-box">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" loading="lazy">
        <span class="recipe-badge-time">⏱️ ${recipe.time} min</span>
        <button class="recipe-bookmark-btn" data-id="${recipe.id}" title="Save Recipe">
          ${isBookmarked ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="recipe-body">
        <div class="recipe-cat-row">
          <span>${recipe.category}</span>
          <span>${recipe.cuisine}</span>
        </div>
        <h3 class="recipe-title">${recipe.title}</h3>
        <p class="recipe-desc">${recipe.description}</p>

        <div class="macros-row">
          <span><strong>${recipe.calories}</strong> kcal</span>
          <span>🥩 <strong>${recipe.protein}</strong></span>
          <span>🍞 <strong>${recipe.carbs}</strong></span>
          <span>🥑 <strong>${recipe.fat}</strong></span>
        </div>

        <button class="recipe-cook-btn" data-id="${recipe.id}">
          👨‍🍳 Start Cooking
        </button>
      </div>
    `;

    // Event listeners
    card.querySelector('.recipe-bookmark-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBookmark(recipe.id, e.currentTarget);
    });

    card.querySelector('.recipe-cook-btn').addEventListener('click', () => {
      openCookingModal(recipe);
    });

    grid.appendChild(card);
  });
}

function toggleBookmark(id, btn) {
  if (savedRecipeIds.has(id)) {
    savedRecipeIds.delete(id);
    btn.textContent = '🤍';
  } else {
    savedRecipeIds.add(id);
    btn.textContent = '❤️';
  }
  localStorage.setItem('chef-bookmarks', JSON.stringify([...savedRecipeIds]));
  updateBookmarkBadge();
}

function updateBookmarkBadge() {
  const badge = document.getElementById('saved-count');
  if (badge) {
    badge.textContent = savedRecipeIds.size;
  }
}

// 3. Search & Filter Bar
function setupSearch() {
  const input = document.getElementById('global-search');
  if (!input) return;

  let debounceTimer;
  input.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = e.target.value.trim();
      fetchRecipes(activeCategory, q);
    }, 200);
  });
}

function setupFilterChips() {
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat');
      activeCategory = cat;
      fetchRecipes(cat, document.getElementById('global-search').value.trim());
    });
  });
}

function setupBookmarkNav() {
  const savedBtn = document.getElementById('saved-recipes-btn');
  if (!savedBtn) return;

  savedBtn.addEventListener('click', () => {
    const bookmarked = allRecipes.filter(r => savedRecipeIds.has(r.id));
    const title = document.getElementById('section-heading');
    if (title) title.textContent = `❤️ Saved Recipes (${bookmarked.length})`;
    renderRecipes(bookmarked);
  });
  updateBookmarkBadge();
}

// 4. Fridge Ingredient Quick Picker & AI Generator
function setupFridgePicker() {
  const tags = document.querySelectorAll('.ing-tag');
  const input = document.getElementById('fridge-custom-input');
  const generateBtn = document.getElementById('generate-ai-recipe-btn');

  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      const ing = tag.getAttribute('data-ing').toLowerCase();
      if (selectedIngredients.has(ing)) {
        selectedIngredients.delete(ing);
        tag.classList.remove('selected');
      } else {
        selectedIngredients.add(ing);
        tag.classList.add('selected');
      }
    });
  });

  if (generateBtn) {
    generateBtn.addEventListener('click', async () => {
      const customItems = input.value.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      const combined = [...new Set([...selectedIngredients, ...customItems])];

      if (combined.length === 0) {
        alert('Please tap at least one ingredient or type what you have in your fridge!');
        return;
      }

      generateBtn.disabled = true;
      generateBtn.innerHTML = '<span>⏳</span> ChefAI is crafting recipe...';

      try {
        const res = await fetch('/api/ai-recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients: combined })
        });
        const data = await res.json();

        // Open custom created recipe in cooking modal immediately!
        openCookingModal(data.recipe, data);
      } catch (err) {
        alert('AI Recipe generation encountered a network error.');
      } finally {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<span>✨</span> Cook with My Fridge';
      }
    });
  }
}

// 5. Interactive Cooking Mode & Live Kitchen Timer Modal
function setupModalHandlers() {
  const overlay = document.getElementById('cooking-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => closeModal());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  // Timer controls
  const startBtn = document.getElementById('timer-start-btn');
  const pauseBtn = document.getElementById('timer-pause-btn');
  const resetBtn = document.getElementById('timer-reset-btn');

  if (startBtn) startBtn.addEventListener('click', startTimer);
  if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
  if (resetBtn) resetBtn.addEventListener('click', resetTimer);
}

function openCookingModal(recipe, aiMeta = null) {
  const overlay = document.getElementById('cooking-modal-overlay');
  if (!overlay) return;

  document.getElementById('modal-img').src = recipe.image;
  document.getElementById('modal-title').textContent = recipe.title;
  document.getElementById('modal-cat').textContent = `${recipe.category} • ${recipe.cuisine} Cuisine`;
  document.getElementById('modal-desc').textContent = recipe.description;

  // AI tip banner if present
  const tipBox = document.getElementById('modal-ai-tip');
  if (aiMeta && aiMeta.chefTip) {
    tipBox.style.display = 'block';
    tipBox.innerHTML = `<strong>💡 ChefAI Tip:</strong> ${aiMeta.chefTip}`;
  } else {
    tipBox.style.display = 'none';
  }

  // Nutrition Macros
  document.getElementById('macro-cal').textContent = `${recipe.calories} kcal`;
  document.getElementById('macro-pro').textContent = recipe.protein;
  document.getElementById('macro-carb').textContent = recipe.carbs;
  document.getElementById('macro-fat').textContent = recipe.fat;

  // Ingredients Checklist
  const ingList = document.getElementById('modal-ingredients-list');
  ingList.innerHTML = '';
  recipe.ingredients.forEach(ing => {
    const div = document.createElement('div');
    div.className = 'checklist-item';
    div.innerHTML = `<input type="checkbox"> <span>${ing}</span>`;
    div.addEventListener('click', (e) => {
      const cb = div.querySelector('input');
      if (e.target !== cb) cb.checked = !cb.checked;
      div.classList.toggle('done', cb.checked);
    });
    ingList.appendChild(div);
  });

  // Steps
  const stepsList = document.getElementById('modal-steps-list');
  stepsList.innerHTML = '';
  recipe.steps.forEach((step, idx) => {
    const row = document.createElement('div');
    row.className = 'step-row';
    row.innerHTML = `
      <div class="step-num">${idx + 1}</div>
      <div class="step-text">${step}</div>
    `;
    stepsList.appendChild(row);
  });

  // Initialize Kitchen Timer with recipe time
  timerSeconds = (recipe.time || 20) * 60;
  timerRunning = false;
  if (timerInterval) clearInterval(timerInterval);
  updateTimerUI();

  overlay.classList.add('open');
}

function closeModal() {
  const overlay = document.getElementById('cooking-modal-overlay');
  if (overlay) overlay.classList.remove('open');
  if (timerInterval) clearInterval(timerInterval);
  timerRunning = false;
}

// Timer Functions
function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerUI();
    } else {
      clearInterval(timerInterval);
      timerRunning = false;
      playTimerChime();
      alert('🔔 Kitchen Timer Complete! Check on your dish!');
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  if (timerInterval) clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  timerSeconds = 20 * 60;
  updateTimerUI();
}

function updateTimerUI() {
  const display = document.getElementById('timer-display');
  if (!display) return;
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  display.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Audio Chime via Web Audio API
function playTimerChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (_) {}
}


// 6. Integrated AI Assistant Interactive Controller
function setupAiAssistant() {
  const toggleBtn = document.getElementById('ai-chat-toggle-btn');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const drawer = document.getElementById('ai-chat-drawer');
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-chat-input');
  const messages = document.getElementById('ai-chat-messages');

  if (!drawer) return;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('hidden');
      if (!drawer.classList.contains('hidden') && input) input.focus();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => drawer.classList.add('hidden'));
  }

  document.querySelectorAll('.ai-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-q');
      if (q) sendMessage(q);
    });
  });

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      sendMessage(text);
    });
  }

  async function sendMessage(text) {
    // Append user message
    appendBubble(text, 'user');

    // Loading indicator
    const loadingId = 'ai-loading-' + Date.now();
    const loadDiv = document.createElement('div');
    loadDiv.className = 'ai-msg ai-msg-bot';
    loadDiv.id = loadingId;
    loadDiv.innerHTML = `<div class="msg-bubble" style="opacity: 0.7;">👨‍🍳 Chef is thinking...</div>`;
    messages.appendChild(loadDiv);
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      const el = document.getElementById(loadingId);
      if (el) el.remove();

      appendBubble(data.reply || "Bon appétit! Let me know what else you'd like to cook.", 'bot');
    } catch (err) {
      const el = document.getElementById(loadingId);
      if (el) el.remove();
      appendBubble("I had trouble connecting to the kitchen server. Please try again!", 'bot');
    }
  }

  function appendBubble(text, sender) {
    const div = document.createElement('div');
    div.className = `ai-msg ai-msg-${sender}`;
    div.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

// Hook setupAiAssistant into DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupAiAssistant();
});
