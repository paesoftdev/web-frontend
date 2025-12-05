<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSEO } from '@/composables/useSEO'

// SEO Meta Tags
useSEO({
  title: 'Payment Failed - PA Energy',
  description: 'Your payment could not be processed. Please try again or contact support.',
  image: '/images/maya-logo.png'
})

const route = useRoute()
const isCanceled = route.path.includes('/cancel')
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4 pt-20">
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.9 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 400 } }"
      class="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full text-center"
    >
      <!-- Error Icon -->
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="isCanceled"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Error Message -->
      <h1 class="text-3xl font-bold text-[#0A2540] mb-3">
        {{ isCanceled ? 'Payment Cancelled' : 'Payment Failed' }}
      </h1>
      <p class="text-gray-600 mb-6">
        <span v-if="isCanceled">
          Your payment was cancelled. No charges were made to your account.
        </span>
        <span v-else>
          Your payment could not be processed. Please check your payment details and try again.
        </span>
      </p>

      <!-- Common Issues -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
        <h3 class="text-sm font-semibold text-yellow-900 mb-2">Common Issues:</h3>
        <ul class="text-xs text-yellow-800 space-y-1">
          <li>• Insufficient funds in your account</li>
          <li>• Incorrect card details</li>
          <li>• Card expired or blocked</li>
          <li>• Network connection issues</li>
        </ul>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3">
        <router-link
          to="/payment"
          class="flex-1 bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors inline-block text-center"
        >
          Try Again
        </router-link>
        <router-link
          to="/"
          class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-block text-center"
        >
          Go Home
        </router-link>
      </div>

      <!-- Support Contact -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-600 mb-2">Need help?</p>
        <a
          href="tel:+639566777790"
          class="text-[#FF6B35] hover:text-[#E55A2B] font-semibold transition-colors"
        >
          Contact Support: +63 956 677 7790
        </a>
      </div>
    </div>
  </div>
</template>

