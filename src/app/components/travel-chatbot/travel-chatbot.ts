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
    MatCardModule,
  ],
  templateUrl: './travel-chatbot.html',
  styleUrls: ['./travel-chatbot.css'],
})
export class TravelChatbotComponent {
  isOpen = signal(false);
  isLoading = signal(false);
  userInput = '';

  messages = signal<ChatMessage[]>([
    {
      text: "Hi! I'm your travel assistant ✈️\n\nI can help you with:\n• Destination recommendations only related to\n• Budget planning\n• Packing tips\n• Weather & best time to visit\n• Food & attractions\n\nCurrently supported destinations:\n🇫🇷 Paris\n🌴 Bali\n🗼 Tokyo\n🗽 New York\n\nHow can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  // Travel-related keywords
  private travelKeywords = [
    'destination',
    'travel',
    'trip',
    'vacation',
    'holiday',
    'tour',
    'hotel',
    'flight',
    'booking',
    'budget',
    'price',
    'cost',
    'packing',
    'weather',
    'food',
    'visa',
    'passport',
    'attraction',
    'activity',
    'beach',
    'mountain',
    'city',
    'country',
    'tourism',
    'tourist',
    'journey',
    'adventure',
    'plan',
    'recommend',
    'suggest',
    'visit',
  ];

  // Supported destination responses
  private destinationResponses: { [key: string]: string } = {
    Bali: "Bali 🌴 is amazing! Best time: April-Oct (dry season).\n\nDon't miss:\n• Bali Ubud Rice Terraces\n• Bali Uluwatu Temple\n• Bali Beaches\n\nBudget: $30-100/day.",

    Tokyo:
      'Tokyo 🗼 is incredible! Best time: March-April or Oct-Nov.\n\nTop spots:\n• Tokyo Shibuya Crossing\n• Tokyo Senso-ji Temple\n• Tokyo Tower\n\nFood is amazing and affordable!',

    'New York':
      'New York 🗽 never sleeps!\n\nBest time: April-June or Sept-Nov.\n\nMust visit:\n• New York Times Square\n• New York Central Park\n• New York Statue of Liberty',

    Rome: 'Rome 🏛️ is historic! Best time: April-June or Sept-Oct.\n\nMust visit:\n• Rome Colosseum\n• Rome Vatican Museums\n• Rome Trevi Fountain',

    Dubai:
      'Dubai 🏙️ is futuristic! Best time: Nov-March (cooler months).\n\nMust visit:\n• Dubai Burj Khalifa\n• Dubai Mall\n• Dubai Desert Safari',

    Japan:
      'Japan 🌸 is unforgettable! Best time: March-May or Sept-Nov.\n\nMust visit:\n• Japan Mount Fuji\n• Japan Kyoto Temples\n• Japan Osaka Castle\n\nExperience culture, bullet trains, and incredible food!',

    Indonesia:
      'Indonesia 🌋 is diverse and beautiful! Best time: May-Sept.\n\nMust visit:\n• Indonesia Bali Island\n• Indonesia Komodo National Park\n• Indonesia Borobudur Temple\n\nDiscover wildlife, beaches, and ancient history!',

    'United States':
      'United States 🦅 is vast and dynamic! Best time: Spring or Autumn.\n\nMust visit:\n• United States Grand Canyon\n• United States New York City\n• United States Yellowstone Park\n\nExplore massive cities and incredible natural wonders!',

    USA: 'United States 🦅 is vast and dynamic! Best time: Spring or Autumn.\n\nMust visit:\n• United States Grand Canyon\n• United States New York City\n• United States Yellowstone Park\n\nExplore massive cities and incredible natural wonders!',

    Italy:
      'Italy 🍕 is a masterpiece! Best time: April-June or Sept-Oct.\n\nMust visit:\n• Italy Rome Colosseum\n• Italy Venice Canals\n• Italy Florence Cathedral\n\nEnjoy world-class art, history, and food!',

    'United Arab Emirates':
      'United Arab Emirates 🇦🇪 is luxurious! Best time: Oct-April.\n\nMust visit:\n• United Arab Emirates Burj Khalifa\n• United Arab Emirates Sheikh Zayed Mosque\n• United Arab Emirates Louvre Abu Dhabi\n\nExperience modern marvels and rich desert heritage!',

    UAE: 'United Arab Emirates 🇦🇪 is luxurious! Best time: Oct-April.\n\nMust visit:\n• United Arab Emirates Burj Khalifa\n• United Arab Emirates Sheikh Zayed Mosque\n• United Arab Emirates Louvre Abu Dhabi\n\nExperience modern marvels and rich desert heritage!',

    France:
      'France 🥐 is romantic! Best time: April-May or Sept-Oct.\n\nMust visit:\n• France Eiffel Tower\n• France Louvre Museum\n• France Palace of Versailles\n\nIndulge in art, fashion, and unforgettable cuisine!',
  };

  // Unsupported but commonly searched destinations
  private unsupportedDestinations = [
    'dubai',
    'singapore',
    'maldives',
    'thailand',
    'spain',
    'switzerland',
    'germany',
    'canada',
    'australia',
    'korea',
    'china',
    'india',
  ];

  // General travel responses
  private responses: { [key: string]: string } = {
    packing:
      'Essential packing items ✈️:\n• Passport & documents\n• Comfortable shoes\n• Power bank\n• Universal adapter\n• Weather-appropriate clothes\n• Medicines',

    budget:
      'Budget travel tips 💰:\n• Book flights early\n• Travel off-season\n• Use public transport\n• Stay in hostels/guesthouses\n• Eat local food',

    weather:
      'Always check weather forecasts before traveling 🌦️\n\nPack layers and keep an umbrella or sunscreen depending on the destination.',

    safety:
      'Safety tips 🛡️:\n• Keep copies of documents\n• Avoid isolated places at night\n• Use hotel safes\n• Learn emergency contacts',

    food: 'Food travel tips 🍜:\n• Try local cuisine\n• Visit local markets\n• Read food reviews\n• Drink safe water',

    'best time':
      'Generally, Spring 🌸 and Autumn 🍂 are the best travel seasons worldwide due to pleasant weather and fewer crowds.',
  };

  toggleChat() {
    this.isOpen.update((v) => !v);
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading()) return;

    const question = this.userInput.trim();
    this.userInput = '';

    // Add user message
    this.messages.update((msgs) => [
      ...msgs,
      {
        text: question,
        isUser: true,
        timestamp: new Date(),
      },
    ]);

    this.isLoading.set(true);

    setTimeout(() => {
      const response = this.getResponse(question);

      this.messages.update((msgs) => [
        ...msgs,
        {
          text: response,
          isUser: false,
          timestamp: new Date(),
        },
      ]);

      this.isLoading.set(false);
    }, 800);
  }

  private getResponse(question: string): string {
    const lowerQuestion = question.toLowerCase();

    // Check if question is travel-related
    const isTravelRelated = this.travelKeywords.some((keyword) => lowerQuestion.includes(keyword));

    if (!isTravelRelated) {
      return "I'm a travel assistant ✈️\n\nI can only help with travel-related questions like destinations, trips, hotels, budget planning, packing, and tourism.\n\nPlease ask something travel-related 🌍";
    }

    // Check supported destinations
    const supportedDestination = Object.keys(this.destinationResponses).find((destination) =>
      lowerQuestion.includes(destination.toLowerCase()),
    );

    if (supportedDestination) {
      return this.destinationResponses[supportedDestination];
    }

    // Check unsupported destinations
    const unsupportedDestination = this.unsupportedDestinations.find((destination) =>
      lowerQuestion.includes(destination.toLowerCase()),
    );

    if (unsupportedDestination) {
      return `Sorry 😅 Currently we don't have travel plans or guides for ${unsupportedDestination.charAt(0).toUpperCase() + unsupportedDestination.slice(1)} yet.

Right now I can help you with:
🇫🇷 Paris
🌴 Bali
🗼 Tokyo
🗽 New York

More destinations will be added soon ✈️`;
    }

    // General travel topics
    if (lowerQuestion.includes('pack') || lowerQuestion.includes('luggage')) {
      return this.responses['packing'];
    }

    if (
      lowerQuestion.includes('budget') ||
      lowerQuestion.includes('cheap') ||
      lowerQuestion.includes('cost')
    ) {
      return this.responses['budget'];
    }

    if (lowerQuestion.includes('weather') || lowerQuestion.includes('climate')) {
      return this.responses['weather'];
    }

    if (lowerQuestion.includes('safe') || lowerQuestion.includes('safety')) {
      return this.responses['safety'];
    }

    if (
      lowerQuestion.includes('food') ||
      lowerQuestion.includes('eat') ||
      lowerQuestion.includes('restaurant')
    ) {
      return this.responses['food'];
    }

    if (lowerQuestion.includes('best time') || lowerQuestion.includes('season')) {
      return this.responses['best time'];
    }

    // Generic fallback
    return `I understand you're asking about travel 🌍

Currently I can best help with:
• Paris 🇫🇷
• Bali 🌴
• Tokyo 🗼
• New York 🗽

You can also ask me about:
• Budget travel
• Packing tips
• Weather
• Food & attractions
• Travel safety`;
  }
}
