import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-travel-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './travel-chatbot.html',
  styleUrls: ['./travel-chatbot.css']
})
export class TravelChatbotComponent {
  isOpen = signal(false);
  isLoading = signal(false);
  userInput = '';
  messages = signal<ChatMessage[]>([
    {
      text: "Hi! I'm your travel assistant! ✈️\n\nI can help you with:\n• Destination recommendations\n• Best time to visit\n• Travel tips & packing\n• Price estimates\n• Activity suggestions\n\nWhat would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);

  // Travel-related keywords to detect valid questions
  private travelKeywords = [
    'destination', 'travel', 'trip', 'vacation', 'holiday', 'tour',
    'hotel', 'flight', 'booking', 'price', 'cost', 'cheap', 'budget',
    'beach', 'mountain', 'city', 'country', 'paris', 'bali', 'tokyo',
    'nyc', 'rome', 'dubai', 'europe', 'asia', 'america',
    'weather', 'climate', 'season', 'summer', 'winter', 'spring', 'autumn',
    'food', 'cuisine', 'restaurant', 'eat',
    'culture', 'history', 'museum', 'temple',
    'shopping', 'souvenir', 'market',
    'safety', 'safe', 'dangerous',
    'visa', 'passport', 'document',
    'packing', 'luggage', 'bag',
    'attraction', 'activity', 'thing to do', 'landmark',
    'recommend', 'suggest', 'best', 'top', 'famous'
  ];

  // Predefined responses for common questions
  private responses: { [key: string]: string } = {
    'paris': "Paris 🇫🇷 is beautiful! Best time: April-June or Sept-Oct. Must-see: Eiffel Tower, Louvre Museum. Average hotel: $150-250/night.",
    'bali': "Bali 🌴 is amazing! Best time: April-Oct (dry season). Don't miss: Rice terraces, Ubud monkey forest. Budget: $30-100/day for comfortable travel.",
    'tokyo': "Tokyo 🗼 is incredible! Best time: March-April (cherry blossoms) or Oct-Nov. Top spots: Shibuya, Senso-ji Temple. Food is amazing and affordable!",
    'nyc': "New York 🗽 never sleeps! Best time: April-June or Sept-Nov. Must-visit: Times Square, Central Park, Statue of Liberty.",
    'packing': "Essential packing items ✈️: Passport, comfortable shoes, weather-appropriate clothes, power bank, universal adapter, medications, copy of documents.",
    'budget': "Budget travel tips 💰: Book flights 2-3 months early, stay in hostels/guesthouses, eat local street food, use public transport, travel off-season.",
    'weather': "Always check weather.com before traveling! Pack layers and prepare for unexpected changes. Don't forget umbrella and sunscreen ☀️🌧️",
    'safety': "Safety tips 🛡️: Keep copies of documents, use hotel safes, avoid dark alleys at night, learn local emergency numbers, trust your instincts.",
    'food': "Best way to experience local food 🍜: Visit local markets, ask hotel staff for recommendations, take a cooking class, try street food (check cleanliness first!)",
    'best time': "Best travel times vary by destination. Generally: Spring (Mar-May) and Fall (Sept-Nov) offer good weather and fewer crowds worldwide 🌸🍂"
  };

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading()) return;

    const question = this.userInput.trim();
    this.userInput = '';

    // Add user message
    this.messages.update(msgs => [...msgs, {
      text: question,
      isUser: true,
      timestamp: new Date()
    }]);

    this.isLoading.set(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = this.getResponse(question);
      this.messages.update(msgs => [...msgs, {
        text: response,
        isUser: false,
        timestamp: new Date()
      }]);
      this.isLoading.set(false);
    }, 800);
  }

  private getResponse(question: string): string {
    const lowerQuestion = question.toLowerCase();

    // Check if question is travel-related
    const isTravelRelated = this.travelKeywords.some(keyword => 
      lowerQuestion.includes(keyword)
    );

    if (!isTravelRelated) {
      return "I'm a travel assistant ✈️ I can only help with travel-related questions like destinations, booking, packing, budget tips, etc. Please ask me something about travel! 🌍";
    }

    // Check for destination-specific questions
    if (lowerQuestion.includes('paris')) return this.responses['paris'];
    if (lowerQuestion.includes('bali')) return this.responses['bali'];
    if (lowerQuestion.includes('tokyo')) return this.responses['tokyo'];
    if (lowerQuestion.includes('nyc') || lowerQuestion.includes('new york')) return this.responses['nyc'];
    
    // Check for common topics
    if (lowerQuestion.includes('pack') || lowerQuestion.includes('luggage')) return this.responses['packing'];
    if (lowerQuestion.includes('budget') || lowerQuestion.includes('cheap') || lowerQuestion.includes('cost')) return this.responses['budget'];
    if (lowerQuestion.includes('weather') || lowerQuestion.includes('climate')) return this.responses['weather'];
    if (lowerQuestion.includes('safety') || lowerQuestion.includes('safe')) return this.responses['safety'];
    if (lowerQuestion.includes('food') || lowerQuestion.includes('eat') || lowerQuestion.includes('cuisine')) return this.responses['food'];
    if (lowerQuestion.includes('best time') || lowerQuestion.includes('season')) return this.responses['best time'];

    // Default travel response
    return this.getDefaultResponse(question);
  }

  private getDefaultResponse(question: string): string {
    const responses = [
      `That's a great travel question! 🌍 For "${question}", I'd recommend checking our destination guides. Popular spots include Paris, Bali, Tokyo, and NYC. Each offers unique experiences! Would you like details about any specific destination?`,
      
      `Thanks for asking about travel! ✈️ While I have basic info, for "${question}" specifically, I suggest:\n\n• Check our destination pages\n• Read recent traveler reviews\n• Consider off-season travel for better deals\n\nCan I help with a specific destination instead?`,
      
      `Great question about travel! 💡 For the best experience:\n\n1. Research your destination's peak season\n2. Book flights 2-3 months in advance\n3. Look for package deals\n4. Read local travel blogs\n\nWant me to help with a specific place?`,
      
      `Travel is amazing! 🌟 Regarding "${question}", every destination has unique charm. Our top recommendations: Paris (romance), Bali (relaxation), Tokyo (culture), NYC (energy). Which interests you most?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}