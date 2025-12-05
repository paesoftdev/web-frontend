<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSEO } from '@/composables/useSEO'

// SEO Meta Tags
useSEO({
  title: 'Payment Successful - PA Energy',
  description: 'Your payment has been processed successfully. Thank you for choosing PA Energy.',
  image: '/images/maya-logo.png'
})

const route = useRoute()

// Get payment details from query params if available
const checkoutId = route.query.checkoutId as string | undefined
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4 pt-20">
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.9 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 400 } }"
      class="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full text-center"
    >
      <!-- Success Icon -->
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <!-- Success Message -->
      <h1 class="text-3xl font-bold text-[#0A2540] mb-3">Payment Successful!</h1>
      <p class="text-gray-600 mb-2">
        Thank you for your payment. Your transaction has been processed successfully.
      </p>
      <p v-if="checkoutId" class="text-sm text-gray-500 mb-6">
        Transaction ID: {{ checkoutId }}
      </p>

      <!-- Next Steps -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
        <h3 class="text-sm font-semibold text-blue-900 mb-2">What's Next?</h3>
        <ul class="text-xs text-blue-800 space-y-1">
          <li>• You will receive a confirmation email shortly</li>
          <li>• Our team will contact you to confirm your order</li>
          <li>• We'll process your request within 1-2 business days</li>
        </ul>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3">
        <router-link
          to="/"
          class="flex-1 bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors inline-block text-center"
        >
          Return to Home
        </router-link>
        <router-link
          to="/projects"
          class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-block text-center"
        >
          View Projects
        </router-link>
      </div>

      <!-- Support Contact -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <p class="text-sm text-gray-600 mb-2">Need assistance?</p>
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

