<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { ref, watch, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useSEO } from '@/composables/useSEO'

// SEO Meta Tags
useSEO({
  title: 'PA Energy - Solar Power Solutions | Renewable Energy Philippines',
  description: 'Leading solar energy solutions in the Philippines. Clean, renewable energy for homes and businesses. Residential and commercial solar installations with expert service.',
  keywords: 'solar energy Philippines, solar panels, renewable energy, solar installation, solar power, clean energy, residential solar, commercial solar',
  image: '/images/solar-bg-1.jpg'
})

// Add structured data for SEO
onMounted(() => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://paenergy.ph'
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PA Energy',
    description: 'Leading solar energy solutions in the Philippines. Clean, renewable energy for homes and businesses.',
    url: baseUrl,
    logo: `${baseUrl}/images/pae-logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+63-912-345-6789',
      contactType: 'Customer Service',
      areaServed: 'PH',
      availableLanguage: ['en', 'fil']
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Metro Manila',
      addressCountry: 'PH'
    },
    sameAs: [
      // Add social media links if available
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '209'
    }
  }
  
  let script = document.querySelector('script[type="application/ld+json"]')
  if (!script) {
    script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(structuredData)
})

const isScrolled = ref(false)
const currentBackground = ref(0)

const { y } = useWindowScroll()

// Watch scroll position with delay for smooth transition
let scrollTimeout: ReturnType<typeof setTimeout> | null = null

watch(y, (newY) => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  scrollTimeout = setTimeout(() => {
    isScrolled.value = newY > 50
  }, 150)
}, { immediate: true })

// Calculate parallax offset for banner background
const parallaxOffset = computed(() => {
  const windowHeight = window.innerHeight
  if (y.value <= windowHeight) {
    return y.value * 0.5
  }
  return windowHeight * 0.5
})

// Solar panel background variations
const solarBackgrounds = [
  '/images/solar-bg-1.jpg',
  '/images/solar-bg-2.jpg',
  '/images/solar-bg-3.jpg',
  '/images/solar-bg-4.jpg'
]

let backgroundInterval: ReturnType<typeof setInterval> | null = null

const changeBackground = () => {
  let nextIndex
  do {
    nextIndex = Math.floor(Math.random() * solarBackgrounds.length)
  } while (nextIndex === currentBackground.value && solarBackgrounds.length > 1)
  currentBackground.value = nextIndex
}

onMounted(() => {
  currentBackground.value = 0
  backgroundInterval = setInterval(changeBackground, 10000)
})

onUnmounted(() => {
  if (backgroundInterval) {
    clearInterval(backgroundInterval)
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section id="home" class="min-h-screen flex items-center justify-center text-white relative overflow-hidden">
      <!-- Solar Panel Backgrounds with fade transition and parallax -->
      <div class="absolute inset-0 z-[0] overflow-hidden">
        <div 
          v-for="(bg, index) in solarBackgrounds" 
          :key="`bg-${index}`"
          class="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          :style="{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0A2540',
            opacity: currentBackground === index ? 1 : 0,
            zIndex: currentBackground === index ? 1 : 0,
            pointerEvents: currentBackground === index ? 'auto' : 'none',
            transform: `translateY(${parallaxOffset}px) scale(1.1)`,
            willChange: 'transform, opacity'
          }"
        ></div>
      </div>
      
      <!-- Overlay gradient for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#0A2540]/60 via-[#1E3A5F]/50 to-[#0A2540]/60 z-[2] pointer-events-none"></div>
      
      <!-- Background decorative elements -->
      <div class="absolute inset-0 opacity-10 z-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-[#FF6B35] rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6B35] rounded-full blur-3xl"></div>
      </div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            :inViewOptions="{ once: true }"
            class="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Power Your Future with
            <span class="text-[#FF6B35]">Solar Energy</span>
          </h2>
          <p 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            :inViewOptions="{ once: true }"
            class="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
          >
            Clean, renewable energy solutions for homes and businesses across the Philippines
          </p>
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
            :inViewOptions="{ once: true }"
            class="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button @click="scrollToSection('contact')" class="bg-[#FF6B35] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#E55A2B] transition-all transform hover:scale-105 shadow-lg">
              Get Free Quote
            </button>
            <button @click="scrollToSection('services')" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#0A2540] transition-all">
              Our Services
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          :inViewOptions="{ once: true }"
          class="text-center mb-16"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">Our Services</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solar energy solutions tailored to your needs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Residential Solar -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
            :inViewOptions="{ once: true }"
            class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            <div class="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Residential Solar</h3>
            <p class="text-gray-600 leading-relaxed">
              Custom solar panel installations for homes, reducing electricity bills and carbon footprint.
            </p>
          </div>

          <!-- Commercial Solar -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            :inViewOptions="{ once: true }"
            class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            <div class="w-16 h-16 bg-[#0A2540] rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Commercial Solar</h3>
            <p class="text-gray-600 leading-relaxed">
              Large-scale solar solutions for businesses, factories, and commercial establishments.
            </p>
          </div>

          <!-- Maintenance -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
            :inViewOptions="{ once: true }"
            class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            <div class="w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Maintenance</h3>
            <p class="text-gray-600 leading-relaxed">
              Regular maintenance and monitoring services to ensure optimal solar system performance.
            </p>
          </div>

          <!-- Consulting -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
            :inViewOptions="{ once: true }"
            class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            <div class="w-16 h-16 bg-[#0A2540] rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Consulting</h3>
            <p class="text-gray-600 leading-relaxed">
              Expert consultation and feasibility studies to help you make informed solar energy decisions.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          :inViewOptions="{ once: true }"
          class="text-center mb-16"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">Benefits of Solar Energy</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of Filipinos are switching to solar power
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Cost Savings -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
            :inViewOptions="{ once: true }"
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div class="text-5xl mb-4">💰</div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Cost Savings</h3>
            <p class="text-gray-600 leading-relaxed">
              Reduce your electricity bills by up to 90% and protect yourself from rising energy costs.
            </p>
          </div>

          <!-- Environmentally Friendly -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            :inViewOptions="{ once: true }"
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div class="text-5xl mb-4">🌱</div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Environmentally Friendly</h3>
            <p class="text-gray-600 leading-relaxed">
              Reduce your carbon footprint and contribute to a cleaner, more sustainable future.
            </p>
          </div>

          <!-- Energy Independence -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
            :inViewOptions="{ once: true }"
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div class="text-5xl mb-4">⚡</div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Energy Independence</h3>
            <p class="text-gray-600 leading-relaxed">
              Generate your own power and become less dependent on the grid, especially during outages.
            </p>
          </div>

          <!-- Low Maintenance -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
            :inViewOptions="{ once: true }"
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div class="text-5xl mb-4">🔧</div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Low Maintenance</h3>
            <p class="text-gray-600 leading-relaxed">
              Solar panels require minimal maintenance and have a lifespan of 25+ years.
            </p>
          </div>

          <!-- Government Incentives -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 } }"
            :inViewOptions="{ once: true }"
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div class="text-5xl mb-4">📋</div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Government Incentives</h3>
            <p class="text-gray-600 leading-relaxed">
              Take advantage of tax incentives and rebates available for solar installations.
            </p>
          </div>

          <!-- Increased Property Value -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }"
            :inViewOptions="{ once: true }"
            class="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div class="text-5xl mb-4">🏠</div>
            <h3 class="text-2xl font-bold text-[#0A2540] mb-4">Increased Property Value</h3>
            <p class="text-gray-600 leading-relaxed">
              Solar installations can increase your property value by 3-4% on average.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment & Services Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Maya Payment Announcement -->
            <router-link
              to="/payment"
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :visible="{ opacity: 1, x: 0, transition: { duration: 600 } }"
              :inViewOptions="{ once: true }"
              class="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer block"
            >
              <div class="flex items-center mb-6">
                <img 
                  src="/images/maya-logo.png" 
                  alt="Maya Logo" 
                  class="h-12 w-auto mr-4"
                />
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-[#0A2540] mb-4">
                Maya Payment is now Accepted!
              </h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                You can now pay us with your Maya account. Enjoy convenient and secure payment options for all our solar energy services.
              </p>
              <div class="mt-6 flex items-center space-x-2 text-[#FF6B35]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-semibold">Secure & Fast Transactions</span>
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </router-link>

            <!-- Service Cards -->
            <div class="space-y-6">
              <!-- Customer Support Card -->
              <div
                v-motion
                :initial="{ opacity: 0, x: 30 }"
                :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 100 } }"
                :inViewOptions="{ once: true }"
                class="bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl md:text-2xl font-bold mb-2">Customer Support</h3>
                    <p class="text-white/90 leading-relaxed">
                      Chat with our customer service representative for immediate assistance and answers to your questions.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Book A Free Assessment Card -->
              <div
                v-motion
                :initial="{ opacity: 0, x: 30 }"
                :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
                :inViewOptions="{ once: true }"
                class="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl md:text-2xl font-bold mb-2">Book A Free Assessment</h3>
                    <p class="text-white/90 leading-relaxed">
                      Book for a free inspection and assessment to find the best system for your needs and budget.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Self Assessment Card -->
              <div
                v-motion
                :initial="{ opacity: 0, x: 30 }"
                :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 300 } }"
                :inViewOptions="{ once: true }"
                class="bg-gradient-to-br from-[#1E3A5F] to-[#0A2540] rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0 w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-xl md:text-2xl font-bold mb-2">Self Assessment</h3>
                    <p class="text-white/90 leading-relaxed">
                      Send us pictures of your meter and other details to help us determine the best system for your consumption and budget.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          :inViewOptions="{ once: true }"
          class="text-center mb-12"
        >
          <h2 class="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to make the switch to solar? Contact us today for a free consultation
          </p>
        </div>
        <div class="max-w-2xl mx-auto">
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            :inViewOptions="{ once: true }"
            class="bg-white/10 backdrop-blur-md rounded-xl p-8"
          >
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold mb-2">Email</h3>
                <a href="mailto:info@paenergy.com" class="text-[#FF6B35] hover:text-[#FF8C61] transition-colors">
                  info@paenergy.com
                </a>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Phone</h3>
                <a href="tel:+639123456789" class="text-[#FF6B35] hover:text-[#FF8C61] transition-colors">
                  +63 912 345 6789
                </a>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Address</h3>
                <p class="text-gray-300">
                  Metro Manila, Philippines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

