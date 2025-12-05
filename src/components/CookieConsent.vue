<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isVisible = ref(false)
const isAnimating = ref(false)

onMounted(() => {
  // Check if user has already made a choice
  const consent = localStorage.getItem('cookieConsent')
  if (!consent) {
    // Show after a short delay for better UX
    setTimeout(() => {
      isVisible.value = true
      isAnimating.value = true
    }, 1000)
  }
})

const acceptCookies = () => {
  localStorage.setItem('cookieConsent', 'accepted')
  localStorage.setItem('cookieConsentDate', new Date().toISOString())
  closeConsent()
}

const declineCookies = () => {
  localStorage.setItem('cookieConsent', 'declined')
  localStorage.setItem('cookieConsentDate', new Date().toISOString())
  closeConsent()
}

const closeConsent = () => {
  isAnimating.value = false
  setTimeout(() => {
    isVisible.value = false
  }, 300)
}

const openPrivacyPolicy = () => {
  router.push('/privacy')
  closeConsent()
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-10 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-10 scale-95"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        @click="declineCookies"
      ></div>

      <!-- Cookie Consent Card -->
      <div 
        class="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        :class="{ 'animate-in': isAnimating }"
      >
        <!-- Decorative gradient background -->
        <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF6B35] via-[#FF8C61] to-[#FF6B35]"></div>

        <div class="p-6 md:p-8">
          <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
            <!-- Cookie Icon -->
            <div class="flex-shrink-0">
              <div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <svg class="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1">
              <h3 class="text-2xl md:text-3xl font-bold text-[#0A2540] mb-3">
                We Value Your Privacy
              </h3>
              <p class="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies. You can also choose to customize your preferences 
                or learn more in our 
                <button 
                  @click="openPrivacyPolicy"
                  class="text-[#FF6B35] hover:text-[#E55A2B] font-semibold underline transition-colors"
                >
                  Privacy Policy
                </button>.
              </p>

              <!-- Cookie Types Info -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <div class="w-2 h-2 bg-[#FF6B35] rounded-full"></div>
                  <span>Essential Cookies</span>
                </div>
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <div class="w-2 h-2 bg-[#0A2540] rounded-full"></div>
                  <span>Analytics Cookies</span>
                </div>
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <div class="w-2 h-2 bg-[#FF8C61] rounded-full"></div>
                  <span>Marketing Cookies</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  @click="acceptCookies"
                  class="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Accept All Cookies</span>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  @click="declineCookies"
                  class="flex-1 bg-white border-2 border-gray-300 text-[#0A2540] px-6 py-3 rounded-lg font-semibold hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-200"
                >
                  Decline
                </button>
                <button
                  @click="openPrivacyPolicy"
                  class="flex-1 bg-gray-100 text-[#0A2540] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>

            <!-- Close Button -->
            <button
              @click="declineCookies"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-in {
  animation: slide-up 0.5s ease-out;
}
</style>

