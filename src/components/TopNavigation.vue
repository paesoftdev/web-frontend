<script setup lang="ts">
import { useAppNavigation } from '@/composables/useAppContext'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'

// Use the shared navigation from App context
const { route, isMenuOpen, isScrolled, toggleMenu, scrollToSection } = useAppNavigation()
const router = useRouter()

// Handle navigation with scroll
const handleSectionClick = async (sectionId: string, event?: Event) => {
  if (event) {
    event.preventDefault()
  }
  
  if (route.path !== '/') {
    // Navigate to home first
    await router.push('/')
    // Wait for route and DOM to be ready
    await nextTick()
    // Small delay to ensure page is rendered
    setTimeout(() => {
      scrollToSection(sectionId)
    }, 100)
  } else {
    // Already on home page, just scroll
    scrollToSection(sectionId)
  }
}
</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
    :class="isScrolled || route.path !== '/'
      ? 'bg-white/80 backdrop-blur-md shadow-lg py-2' 
      : 'bg-transparent py-4'"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 transition-all duration-300">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link 
            to="/"
            class="cursor-pointer flex items-center transition-opacity hover:opacity-80"
          >
            <img 
              src="/images/pae-logo.png" 
              alt="PA Energy Logo" 
              class="h-10 md:h-12 w-auto object-contain"
            />
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/"
            @click="route.path === '/' && scrollToSection('home')"
            class="cursor-pointer transition-colors font-medium"
            :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
          >Home</router-link>
          <router-link 
            to="/projects"
            class="cursor-pointer transition-colors font-medium"
            :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
          >Projects</router-link>
          <router-link 
            to="/"
            @click="handleSectionClick('services', $event)"
            class="cursor-pointer transition-colors font-medium"
            :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
          >Services</router-link>
          <router-link 
            to="/about"
            @click="route.path === '/' && scrollToSection('about')"
            class="cursor-pointer transition-colors font-medium"
            :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
          >About</router-link>
          <router-link 
            to="/"
            @click="handleSectionClick('benefits', $event)"
            class="cursor-pointer transition-colors font-medium"
            :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
          >Benefits</router-link>
          <router-link 
            to="/payment"
            class="cursor-pointer transition-colors font-medium"
            :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
          >Payment</router-link>
          <router-link 
            to="/"
            @click="handleSectionClick('contact', $event)"
            class="bg-[#FF6B35] text-white px-6 py-2 rounded-lg hover:bg-[#E55A2B] transition-colors font-medium"
          >Contact Us</router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMenu" 
          class="md:hidden focus:outline-none transition-colors"
          :class="isScrolled || route.path !== '/' ? 'text-[#0A2540]' : 'text-white'"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="isMenuOpen" 
        class="md:hidden pb-4 space-y-3 mt-4"
        :class="isScrolled || route.path !== '/' ? 'bg-white/95 backdrop-blur-md rounded-lg p-4' : ''"
      >
        <router-link 
          to="/"
          @click="route.path === '/' && scrollToSection('home'); isMenuOpen = false"
          class="block cursor-pointer transition-colors font-medium py-2"
          :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
        >Home</router-link>
        <router-link 
          to="/projects"
          @click="isMenuOpen = false"
          class="block cursor-pointer transition-colors font-medium py-2"
          :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
        >Projects</router-link>
        <router-link 
          to="/"
          @click="handleSectionClick('services', $event); isMenuOpen = false"
          class="block cursor-pointer transition-colors font-medium py-2"
          :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
        >Services</router-link>
        <router-link 
          to="/about"
          @click="route.path === '/' && scrollToSection('about'); isMenuOpen = false"
          class="block cursor-pointer transition-colors font-medium py-2"
          :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
        >About</router-link>
        <router-link 
          to="/"
          @click="handleSectionClick('benefits', $event); isMenuOpen = false"
          class="block cursor-pointer transition-colors font-medium py-2"
          :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
        >Benefits</router-link>
        <router-link 
          to="/payment"
          @click="isMenuOpen = false"
          class="block cursor-pointer transition-colors font-medium py-2"
          :class="isScrolled || route.path !== '/' ? 'text-[#0A2540] hover:text-[#FF6B35]' : 'text-white hover:text-[#FF6B35]'"
        >Payment</router-link>
        <router-link 
          to="/"
          @click="handleSectionClick('contact', $event); isMenuOpen = false"
          class="block bg-[#FF6B35] text-white px-6 py-2 rounded-lg hover:bg-[#E55A2B] transition-colors font-medium text-center"
        >Contact Us</router-link>
      </div>
    </div>
  </nav>
</template>

