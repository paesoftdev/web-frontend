<script setup lang="ts">
import { useSEO } from '@/composables/useSEO'

// SEO Meta Tags
useSEO({
  title: 'About Us - PA Energy | Leading Solar Energy Solutions in the Philippines',
  description: 'Learn about PA Energy\'s mission to make clean, renewable solar energy accessible to every Filipino home and business. Certified professionals, quality products, and comprehensive support.',
  keywords: 'about PA Energy, solar energy company Philippines, solar professionals, certified solar installers, solar company mission',
  image: '/images/solar-bg-3.jpg'
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Banner Header -->
    <section class="relative pt-32 pb-20 bg-gradient-to-br from-[#0A2540] via-[#1E3A5F] to-[#0A2540] overflow-hidden">
      <!-- Background Image -->
      <div 
        class="absolute inset-0 z-0 opacity-10"
        :style="{
          backgroundImage: 'url(/images/solar-bg-3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
      
      <!-- Decorative elements -->
      <div class="absolute inset-0 opacity-5 z-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-[#FF6B35] rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#FF6B35] rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            :inViewOptions="{ once: true }"
          >
            <!-- Icon -->
            <div class="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-[#FF6B35]/20 rounded-2xl mb-6 backdrop-blur-sm border border-[#FF6B35]/30">
              <svg class="w-10 h-10 md:w-12 md:h-12 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
              About PA Energy
            </h1>
            <p class="text-xl md:text-2xl text-gray-300">
              Leading the solar energy revolution in the Philippines
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-4xl mx-auto">

        <!-- Mission -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          :inViewOptions="{ once: true }"
          class="mb-12"
        >
          <h2 class="text-3xl font-bold text-[#0A2540] mb-4">Our Mission</h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            At PA Energy, our mission is to make clean, renewable solar energy accessible to every Filipino home and business. We believe that sustainable energy solutions should be affordable, reliable, and easy to adopt. Through innovative technology, expert installation, and exceptional customer service, we empower our clients to reduce their carbon footprint while saving on energy costs.
          </p>
        </div>

        <!-- Vision -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          :inViewOptions="{ once: true }"
          class="mb-12"
        >
          <h2 class="text-3xl font-bold text-[#0A2540] mb-4">Our Vision</h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            We envision a Philippines where solar energy is the primary source of power for homes and businesses. By 2030, we aim to have installed over 10MW of solar capacity, helping thousands of Filipinos achieve energy independence and contribute to a cleaner, more sustainable future for generations to come.
          </p>
        </div>

        <!-- Statistics -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
          :inViewOptions="{ once: true }"
          class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div class="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-xl p-8 text-white text-center">
            <div class="text-5xl font-bold mb-2">2.20MW</div>
            <div class="text-lg">Installed Solar</div>
          </div>
          <div class="bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] rounded-xl p-8 text-white text-center">
            <div class="text-5xl font-bold mb-2">209</div>
            <div class="text-lg">Happy Customers</div>
          </div>
          <div class="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-xl p-8 text-white text-center">
            <div class="text-5xl font-bold mb-2">6,369</div>
            <div class="text-lg">Panels Installed</div>
          </div>
        </div>

        <!-- Why Choose Us -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
          :inViewOptions="{ once: true }"
          class="mb-12"
        >
          <h2 class="text-3xl font-bold text-[#0A2540] mb-6">Why Choose PA Energy?</h2>
          <div class="space-y-4">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-[#0A2540] mb-2">Certified Professionals</h3>
                <p class="text-gray-600">Our team consists of certified solar engineers and technicians with years of experience in the industry.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-[#0A2540] mb-2">Quality Products</h3>
                <p class="text-gray-600">We only use premium solar panels and equipment from trusted manufacturers with proven track records.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-[#0A2540] mb-2">Comprehensive Support</h3>
                <p class="text-gray-600">From initial consultation to ongoing maintenance, we provide full support throughout your solar journey.</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-[#0A2540] mb-2">Competitive Pricing</h3>
                <p class="text-gray-600">We offer competitive pricing with flexible financing options to make solar energy accessible to everyone.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

