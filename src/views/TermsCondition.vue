<script setup lang="ts">
import { useSEO } from '@/composables/useSEO'

// SEO Meta Tags
useSEO({
  title: 'Terms & Conditions - PA Energy | Service Terms and Conditions',
  description: 'Review PA Energy\'s terms and conditions for solar energy services. Understand the terms of service, warranties, and agreements for our solar installations.',
  keywords: 'terms and conditions, service terms, PA Energy terms, solar service agreement, warranty terms',
  image: '/images/solar-bg-2.jpg'
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
          backgroundImage: 'url(/images/solar-bg-2.jpg)',
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
              Terms and Conditions
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 mb-2">
              Understanding our service agreement
            </p>
            <p class="text-sm md:text-base text-gray-400">
              Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-4xl mx-auto">

        <!-- Content -->
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          :inViewOptions="{ once: true }"
          class="prose prose-lg max-w-none"
        >
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">1. Acceptance of Terms</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              By accessing and using the PA Energy website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">2. Services</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              PA Energy provides solar energy installation, maintenance, and consulting services. All services are subject to availability and may be modified or discontinued at any time without prior notice.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">3. Quotations and Pricing</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              All quotations provided are estimates and are subject to change based on site assessment, current market prices, and specific project requirements. Final pricing will be confirmed in writing before work commences.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">4. Payment Terms</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              Payment terms will be specified in your service agreement. Generally:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>A deposit may be required upon contract signing</li>
              <li>Progress payments may be required at various stages of installation</li>
              <li>Final payment is due upon completion and acceptance of work</li>
              <li>Late payments may incur interest charges</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">5. Warranties</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              PA Energy provides warranties on workmanship and materials as specified in your service agreement. Manufacturer warranties apply to equipment and components. All warranties are subject to proper use, maintenance, and compliance with installation guidelines.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">6. Limitation of Liability</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              To the maximum extent permitted by law, PA Energy's liability is limited to the value of the services provided. We are not liable for indirect, incidental, or consequential damages arising from the use of our services.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">7. Installation Requirements</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              Customers are responsible for:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Obtaining necessary permits and approvals</li>
              <li>Ensuring site access and safety</li>
              <li>Providing accurate information about the installation site</li>
              <li>Compliance with local building codes and regulations</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">8. Cancellation and Refunds</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              Cancellation policies will be specified in your service agreement. Refunds, if applicable, will be processed according to the terms agreed upon. Cancellation fees may apply depending on the stage of the project.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">9. Intellectual Property</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              All content on this website, including text, graphics, logos, and images, is the property of PA Energy and is protected by copyright and other intellectual property laws.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">10. Governing Law</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              These terms and conditions are governed by the laws of the Republic of the Philippines. Any disputes will be subject to the exclusive jurisdiction of the courts of the Philippines.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">11. Changes to Terms</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              PA Energy reserves the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on this website. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">12. Contact Information</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              For questions about these Terms and Conditions, please contact us at:
            </p>
            <div class="bg-gray-50 rounded-lg p-6">
              <p class="text-gray-700 mb-2"><strong>Email:</strong> legal@paenergy.com</p>
              <p class="text-gray-700 mb-2"><strong>Phone:</strong> +63 912 345 6789</p>
              <p class="text-gray-700"><strong>Address:</strong> Metro Manila, Philippines</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

