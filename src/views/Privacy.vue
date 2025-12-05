<script setup lang="ts">
import { useSEO } from '@/composables/useSEO'

// SEO Meta Tags
useSEO({
  title: 'Privacy Policy - PA Energy | Data Protection & Privacy',
  description: 'Read PA Energy\'s privacy policy to understand how we collect, use, and protect your personal information when you use our solar energy services.',
  keywords: 'privacy policy, data protection, PA Energy privacy, personal information protection, GDPR compliance',
  image: '/images/solar-bg-1.jpg'
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
          backgroundImage: 'url(/images/solar-bg-1.jpg)',
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 mb-2">
              Your privacy matters to us
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
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">1. Introduction</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              PA Energy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">2. Information We Collect</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              We may collect information about you in a variety of ways. The information we may collect includes:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Personal identification information (name, email address, phone number, mailing address)</li>
              <li>Property information for solar installation quotes</li>
              <li>Payment information for service transactions</li>
              <li>Usage data and website interaction information</li>
              <li>Device information and IP addresses</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">3. How We Use Your Information</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Provide, operate, and maintain our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Improve our website and services</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">4. Information Sharing and Disclosure</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>With service providers who assist us in operating our business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">5. Data Security</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">6. Your Rights</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">7. Cookies and Tracking Technologies</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">8. Changes to This Privacy Policy</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-[#0A2540] mb-4">9. Contact Us</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div class="bg-gray-50 rounded-lg p-6">
              <p class="text-gray-700 mb-2"><strong>Email:</strong> privacy@paenergy.com</p>
              <p class="text-gray-700 mb-2"><strong>Phone:</strong> +63 912 345 6789</p>
              <p class="text-gray-700"><strong>Address:</strong> Metro Manila, Philippines</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

