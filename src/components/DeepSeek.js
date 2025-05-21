import axios from 'axios';

const OPENROUTER_API_KEY = process.env.DEEPSEEK_API_KEY||"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";
const SITE_URL = 'http://localhost:3000';

// Debugging cache
let lastRequest = null;
let lastResponse = null;

export async function processUserInput(message) {
  // Normalize input
  const cleanMessage = message.trim().toLowerCase();

  /* PHASE 1: INTENT CLASSIFICATION */
  const intent = await classifyIntent(cleanMessage);
  
  // If clear intent found, return it immediately
  if (!intent.startsWith('6|')) {
    return { type: 'intent', result: intent };
  }

  /* PHASE 2: FOOD TAG EXTRACTION (Fallback) */
  const tags = await extractFoodTags(cleanMessage);
  
  if (tags.length > 0) {
    return { 
      type: 'food_preferences',
      result: tags 
    };
  }

  /* PHASE 3: ULTIMATE FALLBACK */
  return { 
    type: 'unknown',
    result: 'Could not understand request' 
  };
}

// 1. Intent Classifier
async function classifyIntent(message) {
    const hardcodedIntents = {
        // Show restaurants intent (visual)
        'show me restaurants': '1|show_restaurants',
        'display restaurants': '1|show_restaurants',
        'find places to eat': '1|show_restaurants',
        'where can i eat': '1|show_restaurants',
        'show dining options': '1|show_restaurants',
        'what restaurants are nearby': '1|show_restaurants',
        'find food places': '1|show_restaurants',
        'show me food options': '1|show_restaurants',
        'display eateries': '1|show_restaurants',
        'show nearby restaurants': '1|show_restaurants',
      
        // List restaurants intent (audio)
        'list restaurants': '2|list_restaurants',
        'tell me restaurants': '2|list_restaurants',
        'name some places to eat': '2|list_restaurants',
        'what restaurants are there': '2|list_restaurants',
        'say restaurant names': '2|list_restaurants',
        'list food places': '2|list_restaurants',
        'tell me dining options': '2|list_restaurants',
        'name restaurants nearby': '2|list_restaurants',
        'what are my food options': '2|list_restaurants',
        'list places to eat': '2|list_restaurants',
      
        // Show menu intent
        'show me the menu': '3|show_menu',
        'display the menu': '3|show_menu',
        'whats on the menu': '3|show_menu',
        'show food options': '3|show_menu',
        'view menu items': '3|show_menu',
        'show me what you serve': '3|show_menu',
        'display your dishes': '3|show_menu',
        'what do you have': '3|show_menu',
        'show your offerings': '3|show_menu',
        'what can i order': '3|show_menu',
      
        // Read menu intent (audio)
        'read the menu': '4|read_menu',
        'tell me the menu': '4|read_menu',
        'say the dishes': '4|read_menu',
        'what are my choices': '4|read_menu',
        'list the menu items': '4|read_menu',
        'tell me what you serve': '4|read_menu',
        'say your offerings': '4|read_menu',
        'what are my options': '4|read_menu',
        'read me the dishes': '4|read_menu',
        'tell me available food': '4|read_menu',
      
        // Order item intent
        'i want to order': '5|order_item',
        'get me food': '5|order_item',
        'place an order': '5|order_item',
        'i want food': '5|order_item',
        'give me something to eat': '5|order_item',
        'can i order': '5|order_item',
        'take my order': '5|order_item',
        'i need food': '5|order_item',
        'prepare me a meal': '5|order_item',
        'make me something': '5|order_item',
      
        // Common variations
        'restaurants please': '1|show_restaurants',
        'food places': '1|show_restaurants',
        'show restaurants': '1|show_restaurants',
        'list places': '2|list_restaurants',
        'tell me options': '2|list_restaurants',
        'show me choices': '3|show_menu',
        'whats available': '3|show_menu',
        'i want something': '5|order_item'
      };

  if (hardcodedIntents[message]) {
    return hardcodedIntents[message];
  }

  const prompt = `
  INTENT CLASSIFICATION
  ====================
  Options:
  1|show_restaurants - User wants to see listings
  2|list_restaurants - User wants to hear names
  3|show_menu - View specific menu
  4|read_menu - Hear menu items
  5|order_item - Direct food order
  6|nothing_matches - No match

  Examples:
  "Display restaurants" → 1|show_restaurants
  "Tell me pizza places" → 2|list_restaurants
  "Show Burger King menu" → 3|show_menu

  Message: "${message}"
  Respond with "ID|INTENT" or "6|nothing_matches"`;

  try {
    const response = await callLanguageAPI(prompt);
    return validateIntentResponse(response);
  } catch (error) {
    console.error('Intent classification failed:', error);
    return '6|nothing_matches';
  }
}

// 2. Food Tag Extractor
async function extractFoodTags(message) {
    const quickTags = {
        // Flavors
        'spicy': ['spicy'],
        'hot': ['spicy'],
        'sweet': ['sweet'],
        'sour': ['sour'],
        'bitter': ['bitter'],
        'tangy': ['sour'],
        'mild': ['mild'],
        'savory': ['umami'],
        
        // Dietary Restrictions
        'vegetarian': ['vegetarian'],
        'veg ': ['vegetarian'], // Matches "veg " (space prevents matching "vegan")
        'vegan': ['vegan'],
        'gluten': ['gluten-free'],
        'dairy': ['dairy-free'],
        'lactose': ['dairy-free'],
        'egg': ['egg-free'],
        'nut free': ['nut-free'],
        'pescatarian': ['pescatarian'],
        
        // Health Conditions
        'pregnant': ['pregnant', 'sour'],
        'diabetic': ['diabetic', 'low-sugar'],
        'diabetes': ['diabetic', 'low-sugar'],
        'keto': ['keto', 'low-carb'],
        'low carb': ['low-carb'],
        'low fat': ['low-fat'],
        'high protein': ['high-protein'],
        'allerg': ['allergy'], // Matches "allergy" or "allergies"
        
        // Religious Dietary
        'halal': ['halal'],
        'kosher': ['kosher'],
        'jain': ['jain'],
        'buddhist': ['buddhist'],
        
        // Textures
        'crunchy': ['crunchy'],
        'creamy': ['creamy'],
        'chewy': ['chewy'],
        'soft': ['soft'],
        'crispy': ['crunchy'],
        
        // Cooking Styles
        'grilled': ['grilled'],
        'fried': ['fried'],
        'steamed': ['steamed'],
        'raw': ['raw'],
        'organic': ['organic'],
        
        // Meal Types
        'breakfast': ['breakfast'],
        'brunch': ['brunch'],
        'lunch': ['lunch'],
        'dinner': ['dinner'],
        'snack': ['snack'],
        
        // Regional
        'italian': ['italian'],
        'mexican': ['mexican'],
        'indian': ['indian'],
        'chinese': ['chinese'],
        'mediterranean': ['mediterranean'],
        
        // Verbs/Modifiers
        'craving': ['craving'],
        'want': ['want'],
        'need': ['need'],
        'would love': ['would love'],
        'in mood for': ['in mood for'],
        'looking for': ['looking for']
      };

  // Quick keyword check
  for (const [keyword, tags] of Object.entries(quickTags)) {
    if (message.includes(keyword)) {
      return tags;
    }
  }

  const prompt = `
  FOOD PREFERENCE ANALYSIS
  ========================
  Extract ALL applicable tags from:
  "${message}"

  Categories:
  - Flavors: spicy, sweet, sour, etc.
  - Diets: vegetarian, vegan, etc.
  - Health: pregnant, diabetic, etc.
  - Texture: crunchy, creamy, etc.
  - Verbs: craving, want, need

  Respond with comma-separated tags or "none".
  Examples:
  "I'm pregnant" → "pregnant,sour"
  "Want spicy tacos" → "spicy,want"`;

  try {
    const response = await callLanguageAPI(prompt);
    return parseTags(response);
  } catch (error) {
    console.error('Tag extraction failed:', error);
    return [];
  }
}

// Shared API Call Function
async function callLanguageAPI(prompt) {
  lastRequest = { prompt };
  
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'Respond concisely.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 30
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': SITE_URL,
        'Content-Type': 'application/json'
      },
      timeout: 8000
    }
  );

  lastResponse = response.data;
  return response.data.choices[0].message.content.trim();
}

// Response Validators
function validateIntentResponse(response) {
  if (/^[1-6]\|[\w_]+$/.test(response)) {
    return response;
  }
  return '6|nothing_matches';
}

function parseTags(response) {
  return response === 'none' ? [] : 
    response.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
}