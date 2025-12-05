<script setup lang="ts">
import { provide } from 'vue'
import { useNavigation } from '@/composables/useNavigation'
import { useChat } from '@/composables/useChat'
import { NavigationKey, ChatKey } from '@/composables/useAppContext'
import TopNavigation from '@/components/TopNavigation.vue'
import CookieConsent from '@/components/CookieConsent.vue'

// Use composables for navigation and chat
const navigation = useNavigation()
const chat = useChat()

// Provide navigation and chat globally to all child components using injection keys
provide(NavigationKey, navigation)
provide(ChatKey, chat)
// Destructure chat for use in template
const { 
  isChatOpen, 
  isSmileyHovered, 
  chatMessage, 
  showUserInfoForm, 
  userInfo, 
  isUserInfoCollected, 
  isSubmittingForm, 
  isTyping, 
  isChatHovered, 
  isChatScrolling, 
  chatMessagesContainer, 
  chatMessages, 
  toggleChat, 
  submitUserInfo, 
  sendMessage, 
  handleChatScroll 
} = chat

// Destructure navigation for footer (scrollToSection)
const { scrollToSection } = navigation
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Shared Top Navigation - Used by all pages -->
    <TopNavigation />

    <!-- Router View -->
    <router-view />

    <!-- Cookie Consent Popup -->
    <CookieConsent />

    <!-- Footer -->
    <footer class="bg-[#0A2540] text-white py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-2xl font-bold mb-4">
              <span class="text-[#FF6B35]">PA</span> Energy
            </h3>
            <p class="text-gray-400">
              Leading solar energy solutions in the Philippines. Powering a sustainable future.
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a @click="scrollToSection('home')" class="hover:text-[#FF6B35] cursor-pointer transition-colors">Home</a></li>
              <li><a @click="scrollToSection('services')" class="hover:text-[#FF6B35] cursor-pointer transition-colors">Services</a></li>
              <li><a @click="scrollToSection('about')" class="hover:text-[#FF6B35] cursor-pointer transition-colors">About</a></li>
              <li><a @click="scrollToSection('contact')" class="hover:text-[#FF6B35] cursor-pointer transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Services</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a class="hover:text-[#FF6B35] cursor-pointer transition-colors">Residential Solar</a></li>
              <li><a class="hover:text-[#FF6B35] cursor-pointer transition-colors">Commercial Solar</a></li>
              <li><a class="hover:text-[#FF6B35] cursor-pointer transition-colors">Maintenance</a></li>
              <li><a class="hover:text-[#FF6B35] cursor-pointer transition-colors">Consulting</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">Connect</h4>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-[#FF6B35]/20 rounded-full flex items-center justify-center hover:bg-[#FF6B35] transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-[#FF6B35]/20 rounded-full flex items-center justify-center hover:bg-[#FF6B35] transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-[#FF6B35]/20 rounded-full flex items-center justify-center hover:bg-[#FF6B35] transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p class="text-gray-400">&copy; 2024 PA Energy. All rights reserved.</p>
            <div class="flex space-x-6 text-gray-400 text-sm">
              <router-link to="/privacy" class="hover:text-[#FF6B35] transition-colors">
                Privacy Policy
              </router-link>
              <router-link to="/terms-condition" class="hover:text-[#FF6B35] transition-colors">
                Terms & Conditions
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Chat Window -->
    <div
      v-if="isChatOpen"
      v-motion
      :initial="{ opacity: 0, y: 20, scale: 0.9 }"
      :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 300, type: 'spring', stiffness: 100 } }"
      :leave="{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 200 } }"
      class="fixed bottom-8 right-8 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
    >
      <!-- Chat Header -->
      <div class="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
            <div class="w-6 h-6 bg-[#0A2540] rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h3 class="font-bold">Solar Assistant</h3>
            <p class="text-xs text-white/80">Online</p>
          </div>
        </div>
        <button @click="isChatOpen = false" class="text-white hover:text-gray-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- User Info Form (shown before chat) -->
      <div v-if="showUserInfoForm && !isUserInfoCollected" class="flex-1 overflow-y-auto p-6 bg-white">
        <div class="space-y-4">
          <div>
            <h3 class="text-xl font-bold text-[#0A2540] mb-2">Welcome to Solar Assistant!</h3>
            <p class="text-gray-600 text-sm mb-4">Please provide your information to start chatting with our AI assistant.</p>
          </div>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2 text-sm">First Name *</label>
            <input
              v-model="userInfo.firstName"
              type="text"
              placeholder="Enter your first name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-2 text-sm">Last Name *</label>
            <input
              v-model="userInfo.lastName"
              type="text"
              placeholder="Enter your last name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-medium mb-2 text-sm">Email Address *</label>
            <input
              v-model="userInfo.email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            />
          </div>

          <button
            @click="submitUserInfo"
            :disabled="isSubmittingForm"
            class="w-full bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <span v-if="!isSubmittingForm">Start Chat</span>
            <span v-else class="flex items-center space-x-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Starting chat...</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Chat Messages (shown after user info is collected) -->
      <div 
        v-if="isUserInfoCollected" 
        ref="chatMessagesContainer"
        @scroll="handleChatScroll"
        @mouseenter="isChatHovered = true"
        @mouseleave="isChatHovered = false"
        :class="[
          'flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 chat-messages-container',
          (isChatHovered || isChatScrolling) ? 'show-scrollbar' : 'hide-scrollbar'
        ]"
      >
        <div v-for="(message, index) in chatMessages" :key="index" class="flex" :class="{ 'justify-end': message.sender === 'user' }">
          <div
            class="max-w-[80%] rounded-2xl px-4 py-2"
            :class="message.sender === 'user' ? 'bg-[#FF6B35] text-white' : 'bg-white text-gray-800 shadow-sm'"
          >
            <div 
              v-if="message.sender === 'assistant'"
              class="text-sm prose prose-sm max-w-none"
              v-html="message.text"
            ></div>
            <p v-else class="text-sm">{{ message.text }}</p>
          </div>
        </div>
        
        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex">
          <div class="bg-white text-gray-800 shadow-sm rounded-2xl px-4 py-3">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input (shown after user info is collected) -->
      <div v-if="isUserInfoCollected" class="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div class="flex space-x-2">
          <input
            v-model="chatMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type your message..."
            :disabled="isTyping"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            @click="sendMessage"
            :disabled="isTyping || !chatMessage.trim()"
            class="bg-[#FF6B35] text-white px-6 py-2 rounded-lg hover:bg-[#E55A2B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Yellow Smiley Chat Assistant -->
    <button
      v-if="!isChatOpen"
      @click="toggleChat"
      @mouseenter="isSmileyHovered = true"
      @mouseleave="isSmileyHovered = false"
      v-motion
      :initial="{ scale: 0, rotate: -180 }"
      :enter="{ scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } }"
      class="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-yellow-400 shadow-xl transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer group"
    >
      <!-- Glow effect on hover -->
      <div 
        class="absolute inset-0 rounded-full bg-yellow-400 blur-2xl transition-opacity duration-300"
        :class="isSmileyHovered ? 'opacity-70' : 'opacity-0'"
      ></div>
      <div 
        class="absolute inset-0 rounded-full bg-yellow-300 blur-xl transition-opacity duration-300"
        :class="isSmileyHovered ? 'opacity-50' : 'opacity-0'"
      ></div>
      
      <!-- Smiley face -->
      <div class="relative w-full h-full flex items-center justify-center z-10">
        <!-- Eyes -->
        <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2">
          <div class="w-2.5 h-2.5 bg-[#0A2540] rounded-full transition-all duration-300" :class="{ 'scale-125': isSmileyHovered }"></div>
          <div class="w-2.5 h-2.5 bg-[#0A2540] rounded-full transition-all duration-300" :class="{ 'scale-125': isSmileyHovered }"></div>
        </div>
        
        <!-- Smiling mouth -->
        <div class="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 transition-all duration-300">
          <svg class="w-6 h-4" viewBox="0 0 24 12" fill="none">
            <path 
              d="M3 6 Q12 10 21 6" 
              stroke="#0A2540" 
              stroke-width="2.5" 
              stroke-linecap="round" 
              fill="none"
              :class="isSmileyHovered ? 'opacity-100' : 'opacity-90'"
            />
          </svg>
        </div>
      </div>
    </button>
  </div>
</template>
