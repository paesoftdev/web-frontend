<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSEO } from '@/composables/useSEO'

// SEO Meta Tags
useSEO({
  title: 'Payment Portal - PA Energy | Secure Payment with Maya',
  description: 'Make secure payments for your solar energy services using Maya (PayMaya). Fast, secure, and convenient payment options.',
  keywords: 'payment, PayMaya, Maya payment, solar payment, online payment, secure payment',
  image: '/images/maya-logo.png'
})

// Form state
const paymentForm = ref({
  customerName: '',
  email: '',
  phone: '',
  amount: '',
  description: '',
  invoiceNumber: ''
})

const isProcessing = ref(false)
const paymentStatus = ref<'idle' | 'processing' | 'success' | 'error'>('idle')
const errorMessage = ref('')

// Validate form
const isFormValid = computed(() => {
  return (
    paymentForm.value.customerName.trim() !== '' &&
    paymentForm.value.email.trim() !== '' &&
    paymentForm.value.phone.trim() !== '' &&
    paymentForm.value.amount.trim() !== '' &&
    paymentForm.value.description.trim() !== '' &&
    !isNaN(parseFloat(paymentForm.value.amount)) &&
    parseFloat(paymentForm.value.amount) > 0
  )
})

// Handle payment submission
const handlePayment = async () => {
  if (!isFormValid.value) {
    errorMessage.value = 'Please fill in all required fields with valid information.'
    return
  }

  isProcessing.value = true
  paymentStatus.value = 'processing'
  errorMessage.value = ''

  try {
    // TODO: Integrate with PayMaya API
    // This is a placeholder - you'll need to implement the actual PayMaya integration
    // See PAYMAYA_SETUP_GUIDE.md for instructions
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In production, you would:
    // 1. Create a payment request on your backend
    // 2. Get the PayMaya checkout URL
    // 3. Redirect user to PayMaya checkout
    // 4. Handle the callback/redirect back
    
    paymentStatus.value = 'success'
    
    // Reset form after successful payment
    setTimeout(() => {
      paymentForm.value = {
        customerName: '',
        email: '',
        phone: '',
        amount: '',
        description: '',
        invoiceNumber: ''
      }
      paymentStatus.value = 'idle'
    }, 3000)
  } catch (error) {
    paymentStatus.value = 'error'
    errorMessage.value = 'Payment processing failed. Please try again or contact support.'
    console.error('Payment error:', error)
  } finally {
    isProcessing.value = false
  }
}

// Format amount as currency
const formatCurrency = (value: string) => {
  const num = parseFloat(value)
  if (isNaN(num)) return ''
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(num)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20">
    <!-- Header Banner -->
    <section class="relative py-16 bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] text-white overflow-hidden">
      <div class="absolute inset-0 opacity-10">
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
            <div class="flex items-center justify-center mb-6">
              <img 
                src="/images/maya-logo.png" 
                alt="Maya Logo" 
                class="h-16 w-auto"
              />
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Payment Portal</h1>
            <p class="text-xl text-gray-300">
              Secure and convenient payment using Maya (PayMaya)
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Form Section -->
    <section class="py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Payment Form -->
            <div class="lg:col-span-2">
              <div
                v-motion
                :initial="{ opacity: 0, x: -30 }"
                :visible="{ opacity: 1, x: 0, transition: { duration: 600 } }"
                :inViewOptions="{ once: true }"
                class="bg-white rounded-2xl shadow-xl p-8 md:p-10"
              >
                <!-- Success Message -->
                <div
                  v-if="paymentStatus === 'success'"
                  class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 class="text-green-800 font-semibold">Payment Initiated Successfully!</h3>
                      <p class="text-green-700 text-sm">You will be redirected to Maya checkout shortly.</p>
                    </div>
                  </div>
                </div>

                <!-- Error Message -->
                <div
                  v-if="paymentStatus === 'error' && errorMessage"
                  class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-red-700 text-sm">{{ errorMessage }}</p>
                  </div>
                </div>

                <h2 class="text-2xl font-bold text-[#0A2540] mb-6">Payment Information</h2>
                
                <form class="space-y-6">
              <!-- Customer Name -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="paymentForm.customerName"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="paymentForm.email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">
                  Phone Number <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="paymentForm.phone"
                  type="tel"
                  required
                  placeholder="+63 912 345 6789"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                />
              </div>

              <!-- Invoice Number -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">
                  Invoice Number (Optional)
                </label>
                <input
                  v-model="paymentForm.invoiceNumber"
                  type="text"
                  placeholder="INV-2024-001"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                />
              </div>

              <!-- Amount -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">
                  Payment Amount (PHP) <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₱</span>
                  <input
                    v-model="paymentForm.amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    placeholder="0.00"
                    class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">
                  Payment Description <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="paymentForm.description"
                  required
                  rows="4"
                  placeholder="e.g., Payment for solar installation service..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

                </form>
              </div>
            </div>

            <!-- Right Column: Payment Summary & Button -->
            <div class="lg:col-span-1">
              <div
                v-motion
                :initial="{ opacity: 0, x: 30 }"
                :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
                :inViewOptions="{ once: true }"
                class="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-24"
              >
                <h3 class="text-xl font-bold text-[#0A2540] mb-6">Payment Summary</h3>

                <!-- Summary Details -->
                <div class="space-y-4 mb-6">
                  <div v-if="paymentForm.customerName" class="pb-4 border-b border-gray-200">
                    <p class="text-sm text-gray-600 mb-1">Customer Name</p>
                    <p class="font-semibold text-[#0A2540]">{{ paymentForm.customerName }}</p>
                  </div>

                  <div v-if="paymentForm.email" class="pb-4 border-b border-gray-200">
                    <p class="text-sm text-gray-600 mb-1">Email</p>
                    <p class="font-semibold text-[#0A2540] text-sm">{{ paymentForm.email }}</p>
                  </div>

                  <div v-if="paymentForm.invoiceNumber" class="pb-4 border-b border-gray-200">
                    <p class="text-sm text-gray-600 mb-1">Invoice Number</p>
                    <p class="font-semibold text-[#0A2540]">{{ paymentForm.invoiceNumber }}</p>
                  </div>

                  <div v-if="paymentForm.description" class="pb-4 border-b border-gray-200">
                    <p class="text-sm text-gray-600 mb-1">Description</p>
                    <p class="font-semibold text-[#0A2540] text-sm">{{ paymentForm.description }}</p>
                  </div>

                  <div class="pt-4">
                    <div class="flex justify-between items-center mb-2">
                      <p class="text-gray-600">Subtotal</p>
                      <p class="font-semibold text-[#0A2540]">
                        {{ paymentForm.amount ? formatCurrency(paymentForm.amount) : '₱0.00' }}
                      </p>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                      <p class="text-gray-600">Processing Fee</p>
                      <p class="font-semibold text-gray-500">Free</p>
                    </div>
                    <div class="pt-4 border-t-2 border-gray-300">
                      <div class="flex justify-between items-center">
                        <p class="text-lg font-bold text-[#0A2540]">Total</p>
                        <p class="text-2xl font-bold text-[#FF6B35]">
                          {{ paymentForm.amount ? formatCurrency(paymentForm.amount) : '₱0.00' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Security Notice -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <p class="text-sm text-blue-800 font-medium mb-1">Secure Payment</p>
                      <p class="text-xs text-blue-700">
                        Your payment information is encrypted and secure. We use Maya (PayMaya) for secure payment processing.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <button
                  @click="handlePayment"
                  :disabled="!isFormValid || isProcessing"
                  class="w-full bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#E55A2B] hover:to-[#FF6B35] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center space-x-2"
                >
                  <span v-if="!isProcessing">Proceed to Maya Payment</span>
                  <span v-else class="flex items-center space-x-2">
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </span>
                </button>

                <!-- Payment Methods Info -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <h4 class="text-sm font-semibold text-[#0A2540] mb-3">Accepted Payment Methods</h4>
                  <div class="flex flex-wrap gap-2">
                    <div class="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <img src="/images/maya-logo.png" alt="Maya" class="h-5 w-auto" />
                      <span class="text-xs text-gray-700">Maya Wallet</span>
                    </div>
                    <div class="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <img src="/images/maya-logo.png" alt="Maya" class="h-5 w-auto" />
                      <span class="text-xs text-gray-700">Cards</span>
                    </div>
                    <div class="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <img src="/images/maya-logo.png" alt="Maya" class="h-5 w-auto" />
                      <span class="text-xs text-gray-700">Bank</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Help Section -->
          <div class="mt-8 text-center">
            <p class="text-gray-600 mb-2">Need help with your payment?</p>
            <a href="tel:+639566777790" class="text-[#FF6B35] hover:text-[#E55A2B] font-semibold transition-colors">
              Contact Support: +63 956 677 7790
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

