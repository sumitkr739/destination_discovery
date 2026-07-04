import axios from 'axios';

class AIService {
  constructor() {
    this.useOpenRouter = !!process.env.OPENROUTER_API_KEY;
    this.useGemini = !!process.env.GEMINI_API_KEY;
    
    if (!this.useOpenRouter && !this.useGemini) {
      console.warn('⚠️  No AI API key configured. Please set OPENROUTER_API_KEY or GEMINI_API_KEY');
    }
  }

  async generateTripContent(params) {
    const { destination, budget, duration, personality, interests } = params;
    
    const prompt = this.buildPrompt(destination, budget, duration, personality, interests);
    
    try {
      if (this.useOpenRouter) {
        return await this.callOpenRouter(prompt);
      } else if (this.useGemini) {
        return await this.callGemini(prompt);
      } else {
        // Fallback for demo purposes
        return this.generateDemoContent(params);
      }
    } catch (error) {
      console.error('AI Service Error:', error.message);
      // Return demo content on error
      return this.generateDemoContent(params);
    }
  }

  buildPrompt(destination, budget, duration, personality, interests) {
    return `You are a cultural travel expert and storyteller. Create an immersive, authentic travel guide for ${destination}.

Traveler Profile:
- Budget: ${budget}
- Duration: ${duration}
- Personality: ${personality}
- Interests: ${interests.join(', ')}

Generate a comprehensive JSON response with the following structure (return ONLY valid JSON, no markdown):

{
  "story": "Write a 3-4 paragraph immersive narrative about the destination's soul, culture, and what makes it unique. Focus on sensory details, local life, and authentic experiences.",
  "hiddenGems": [
    {"name": "Place name", "description": "Why locals love it", "category": "category", "bestTime": "when to visit", "lat": 0.0, "lng": 0.0}
  ],
  "foodPassport": {
    "signature": [{"dish": "Name", "description": "What it is", "where": "Where to try", "price": "Approx cost"}],
    "street": [{"dish": "Name", "description": "Details", "where": "Location", "price": "Cost"}],
    "drinks": [{"drink": "Name", "description": "Details", "where": "Location", "price": "Cost"}],
    "sweetTreats": [{"item": "Name", "description": "Details", "where": "Location", "price": "Cost"}]
  },
  "culturalEtiquette": [
    {"category": "Greetings", "dos": ["Do this"], "donts": ["Avoid this"]},
    {"category": "Dining", "dos": [""], "donts": [""]},
    {"category": "Dress Code", "dos": [""], "donts": [""]}
  ],
  "festivals": [
    {"name": "Festival name", "month": "When", "description": "What happens", "experience": "What to expect"}
  ],
  "souvenirs": [
    {"item": "Name", "description": "Why it's special", "where": "Where to buy", "priceRange": "Cost"}
  ],
  "phrases": [
    {"phrase": "Hello", "pronunciation": "How to say", "meaning": "Translation"}
  ],
  "packingList": {
    "essentials": ["Item 1", "Item 2"],
    "clothing": ["Item 1", "Item 2"],
    "tech": ["Item 1", "Item 2"],
    "optional": ["Item 1", "Item 2"]
  },
  "timeline": [
    {"day": 1, "title": "Day title", "activities": [{"time": "9:00 AM", "activity": "What to do", "location": "Where", "tips": "Pro tips"}]}
  ],
  "attractions": [
    {"name": "Place", "type": "museum/temple/market", "description": "Details", "lat": 0.0, "lng": 0.0, "rating": 4.5}
  ]
}

Make it authentic, culturally rich, and personalized to the traveler's profile. Include at least 5 hidden gems, 8+ food items, 5+ attractions with real coordinates, and a day-by-day timeline matching the duration.`;
  }

  async callOpenRouter(prompt) {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat', // Free tier model
        messages: [
          {
            role: 'system',
            content: 'You are a cultural travel expert. Always respond with valid JSON only, no markdown formatting.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:5173',
          'X-Title': 'CultureLens AI'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    return this.parseAIResponse(content);
  }

  async callGemini(prompt) {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.candidates[0].content.parts[0].text;
    return this.parseAIResponse(content);
  }

  parseAIResponse(content) {
    // Remove markdown code blocks if present
    let cleaned = content.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/```\n?/g, '');
    }
    
    try {
      return JSON.parse(cleaned);
    } catch (error) {
      console.error('Failed to parse AI response:', error.message);
      throw new Error('Invalid AI response format');
    }
  }

  generateDemoContent(params) {
    const { destination, budget, duration, personality, interests } = params;
    
    return {
      story: `${destination} is a captivating destination that weaves together ancient traditions with modern vibrancy. Walking through its streets, you'll discover a tapestry of cultures, where the aroma of street food mingles with the sounds of local life. This ${personality} paradise offers authentic experiences that go beyond typical tourist trails.\n\nThe city's soul reveals itself in its hidden neighborhoods, where artisans practice centuries-old crafts and families gather in bustling markets. Every corner tells a story, from historic temples to contemporary art spaces, creating a unique blend that captures the essence of local culture.\n\nWith a ${budget} budget and ${duration} to explore, you'll uncover the destination's true character through its food, festivals, and the warmth of its people. This journey promises authentic connections and memories that transcend ordinary travel experiences.`,
      
      hiddenGems: [
        {
          name: "Local Artisan Quarter",
          description: "Where craftspeople create traditional handicrafts using techniques passed down through generations",
          category: "Cultural",
          bestTime: "Early morning or late afternoon",
          lat: 0.0,
          lng: 0.0
        },
        {
          name: "Sunrise Viewpoint",
          description: "A secret spot where locals gather to watch the sunrise over the city",
          category: "Nature",
          bestTime: "Dawn",
          lat: 0.0,
          lng: 0.0
        },
        {
          name: "Community Garden Cafe",
          description: "Farm-to-table cafe run by local cooperative, featuring seasonal ingredients",
          category: "Food & Culture",
          bestTime: "Lunch time",
          lat: 0.0,
          lng: 0.0
        },
        {
          name: "Heritage Walking Trail",
          description: "Self-guided path through historic neighborhoods with stories on every corner",
          category: "History",
          bestTime: "Cool evening hours",
          lat: 0.0,
          lng: 0.0
        },
        {
          name: "Local Music Hub",
          description: "Intimate venue where traditional and contemporary musicians perform nightly",
          category: "Entertainment",
          bestTime: "Evening",
          lat: 0.0,
          lng: 0.0
        }
      ],
      
      foodPassport: {
        signature: [
          {
            dish: "Regional Specialty",
            description: "Authentic local dish that defines the region's culinary identity",
            where: "Family-run restaurant in old quarter",
            price: `${budget === 'Budget' ? '$5-8' : budget === 'Mid-range' ? '$12-18' : '$25-35'}`
          },
          {
            dish: "Traditional Feast",
            description: "Multi-course meal showcasing regional flavors and cooking techniques",
            where: "Heritage restaurant",
            price: `${budget === 'Budget' ? '$8-12' : budget === 'Mid-range' ? '$20-30' : '$40-60'}`
          }
        ],
        street: [
          {
            dish: "Morning Market Snack",
            description: "Popular breakfast item sold by street vendors",
            where: "Central market area",
            price: "$2-4"
          },
          {
            dish: "Evening Street Food",
            description: "Savory street snack perfect for dinner",
            where: "Night market district",
            price: "$3-6"
          }
        ],
        drinks: [
          {
            drink: "Local Specialty Beverage",
            description: "Traditional drink made with regional ingredients",
            where: "Tea houses and cafes",
            price: "$2-5"
          }
        ],
        sweetTreats: [
          {
            item: "Traditional Dessert",
            description: "Sweet treat with cultural significance",
            where: "Local sweet shops",
            price: "$3-7"
          }
        ]
      },
      
      culturalEtiquette: [
        {
          category: "Greetings",
          dos: ["Learn basic greetings in local language", "Smile and make eye contact", "Respect personal space norms"],
          donts: ["Rush through introductions", "Ignore local greeting customs"]
        },
        {
          category: "Dining",
          dos: ["Try local specialties", "Follow table manners", "Compliment the food"],
          donts: ["Waste food", "Refuse hospitality rudely", "Point with utensils"]
        },
        {
          category: "Dress Code",
          dos: ["Dress modestly at religious sites", "Wear comfortable walking shoes", "Layer for temperature changes"],
          donts: ["Wear revealing clothing in conservative areas", "Forget to remove shoes where required"]
        },
        {
          category: "Photography",
          dos: ["Ask permission before photographing people", "Respect no-photo zones", "Be mindful of cultural sensitivities"],
          donts: ["Take photos without consent", "Photograph military or government buildings"]
        }
      ],
      
      festivals: [
        {
          name: "Cultural Heritage Festival",
          month: "Spring",
          description: "Annual celebration featuring traditional music, dance, and crafts",
          experience: "Join locals in parades, taste festival foods, watch performances"
        },
        {
          name: "Harvest Celebration",
          month: "Autumn",
          description: "Thanksgiving for successful harvest with community gatherings",
          experience: "Participate in traditional rituals, enjoy seasonal cuisine"
        }
      ],
      
      souvenirs: [
        {
          item: "Handcrafted Textile",
          description: "Traditional fabric woven using ancient techniques",
          where: "Artisan cooperative shops",
          priceRange: "$15-50"
        },
        {
          item: "Local Spice Blend",
          description: "Authentic spice mix used in regional cooking",
          where: "Spice markets",
          priceRange: "$5-15"
        },
        {
          item: "Traditional Handicraft",
          description: "Locally made artisan piece supporting community craftspeople",
          where: "Craft markets",
          priceRange: "$10-40"
        }
      ],
      
      phrases: [
        { phrase: "Hello", pronunciation: "heh-LOH", meaning: "Greeting" },
        { phrase: "Thank you", pronunciation: "THANK-you", meaning: "Expression of gratitude" },
        { phrase: "Please", pronunciation: "PLEEZ", meaning: "Polite request" },
        { phrase: "How much?", pronunciation: "how-MUCH", meaning: "Asking price" },
        { phrase: "Delicious!", pronunciation: "de-LISH-us", meaning: "Compliment for food" }
      ],
      
      packingList: {
        essentials: ["Passport and copies", "Travel insurance", "Local currency", "Reusable water bottle", "First aid kit"],
        clothing: ["Comfortable walking shoes", "Modest clothing for sites", "Light jacket", "Hat for sun protection"],
        tech: ["Phone and charger", "Universal adapter", "Portable battery", "Camera"],
        optional: ["Guidebook", "Snacks from home", "Travel pillow", "Daypack"]
      },
      
      timeline: this.generateTimeline(duration),
      
      attractions: [
        {
          name: "Historic Old Town",
          type: "historic",
          description: "Well-preserved historic district with traditional architecture",
          lat: 0.0,
          lng: 0.0,
          rating: 4.6
        },
        {
          name: "Central Market",
          type: "market",
          description: "Bustling local market with food, crafts, and daily life",
          lat: 0.0,
          lng: 0.0,
          rating: 4.5
        },
        {
          name: "Cultural Museum",
          type: "museum",
          description: "Showcases regional history, art, and traditions",
          lat: 0.0,
          lng: 0.0,
          rating: 4.4
        },
        {
          name: "Temple Complex",
          type: "temple",
          description: "Active place of worship with stunning architecture",
          lat: 0.0,
          lng: 0.0,
          rating: 4.7
        },
        {
          name: "Riverside Promenade",
          type: "nature",
          description: "Scenic walkway along the water with local atmosphere",
          lat: 0.0,
          lng: 0.0,
          rating: 4.3
        }
      ]
    };
  }

  generateTimeline(duration) {
    const days = parseInt(duration) || 3;
    const timeline = [];
    
    for (let i = 1; i <= Math.min(days, 7); i++) {
      timeline.push({
        day: i,
        title: i === 1 ? "Arrival & Local Orientation" : 
               i === days ? "Final Experiences & Departure" :
               `Cultural Immersion Day ${i}`,
        activities: [
          {
            time: "9:00 AM",
            activity: "Morning exploration",
            location: "Local neighborhood",
            tips: "Start early to beat crowds"
          },
          {
            time: "12:30 PM",
            activity: "Lunch at local spot",
            location: "Recommended restaurant",
            tips: "Try regional specialties"
          },
          {
            time: "3:00 PM",
            activity: "Afternoon cultural activity",
            location: "Main attraction",
            tips: "Take your time to soak in atmosphere"
          },
          {
            time: "7:00 PM",
            activity: "Evening experience",
            location: "Night market or cultural venue",
            tips: "Perfect time for street food"
          }
        ]
      });
    }
    
    return timeline;
  }
}

export default new AIService();
