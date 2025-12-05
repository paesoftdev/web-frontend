<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectsData } from '@/data/projects'
import { generateSlug } from '@/utils/projectUtils'
import type { Project } from '@/data/projects'
import { useSEO } from '@/composables/useSEO'

// SEO Meta Tags
useSEO({
  title: 'Our Projects - PA Energy | Solar Installations Portfolio',
  description: 'Explore our portfolio of successful solar energy installations across the Philippines. Residential, commercial, industrial, and government solar projects.',
  keywords: 'solar projects Philippines, solar installations, solar portfolio, residential solar projects, commercial solar, solar case studies',
  image: '/images/solar-bg-1.jpg'
})

// Use shared project data
const allProjects = ref<Project[]>(projectsData)

// Filter state
const selectedCategory = ref<string | null>(null)

// Available categories
const categories = ['All', 'Residential', 'Commercial', 'Government', 'Industrial', 'Educational']

// Filtered projects
const filteredProjects = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 'All') {
    return allProjects.value
  }
  return allProjects.value.filter(project => project.category === selectedCategory.value)
})

// Get category color
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Residential': 'bg-[#0A2540] text-white',
    'Commercial': 'bg-[#FF6B35] text-white',
    'Government': 'bg-[#1E3A5F] text-white',
    'Industrial': 'bg-[#E55A2B] text-white',
    'Educational': 'bg-[#FF8C61] text-white'
  }
  return colors[category] || 'bg-gray-600 text-white'
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Statistics Banner -->
    <section class="relative py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
      <!-- Background Image -->
      <div 
        class="absolute inset-0 z-0"
        :style="{
          backgroundImage: 'url(/images/solar-bg-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15
        }"
      ></div>
      <!-- Decorative diagonal line -->
      <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-100/50 to-transparent transform -skew-y-1 origin-top z-[1]"></div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">
        <div class="max-w-6xl mx-auto">
          <!-- Main Statistic -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            :inViewOptions="{ once: true }"
            class="text-center mb-16"
          >
            <div class="text-7xl md:text-8xl font-bold text-[#FF6B35] mb-4">
              2.20MW
            </div>
            <div class="text-2xl md:text-3xl font-semibold text-[#0A2540]">
              of Installed Solar
            </div>
          </div>

          <!-- Detailed Statistics Grid -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            :inViewOptions="{ once: true }"
            class="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <!-- Total Panels -->
            <div class="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#FF6B35]">
              <div class="text-sm font-medium text-[#0A2540] mb-2">
                Total Number of Panels Installed
              </div>
              <div class="text-5xl font-bold text-[#FF6B35]">
                6,369
              </div>
            </div>

            <!-- Residential Customers -->
            <div class="bg-gradient-to-br from-[#0A2540] to-[#1E3A5F] rounded-2xl p-8 shadow-lg text-white">
              <div class="text-sm font-medium text-white/90 mb-2">
                Number of Residential Customers Installed
              </div>
              <div class="text-5xl font-bold text-white">
                146
              </div>
            </div>

            <!-- Commercial Customers -->
            <div class="bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] rounded-2xl p-8 shadow-lg text-white">
              <div class="text-sm font-medium text-white/90 mb-2">
                Number of Commercial Customers Installed
              </div>
              <div class="text-5xl font-bold text-white">
                63
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Grid Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          :inViewOptions="{ once: true }"
          class="text-center mb-12"
        >
          <h2 class="text-4xl md:text-5xl font-bold text-[#0A2540] mb-4">Our Projects</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Explore our portfolio of successful solar energy installations across the Philippines
          </p>

          <!-- Filter Buttons -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
            :inViewOptions="{ once: true }"
            class="flex flex-wrap justify-center gap-3 mb-8"
          >
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category === 'All' ? null : category"
              class="px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              :class="
                (selectedCategory === null && category === 'All') || selectedCategory === category
                  ? 'bg-[#FF6B35] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              "
            >
              {{ category }}
            </button>
          </div>

          <!-- Results Count -->
          <div class="text-sm text-gray-600 mb-8">
            Showing {{ filteredProjects.length }} of {{ allProjects.length }} projects
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: index * 50 } }"
            :inViewOptions="{ once: true }"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div class="absolute top-4 right-4">
                <span 
                  class="px-3 py-1 rounded-full text-sm font-semibold"
                  :class="getCategoryColor(project.category)"
                >
                  {{ project.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-[#0A2540] mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ project.description }}</p>
              
              <!-- Tags -->
              <div v-if="project.tags && project.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="(tag, tagIndex) in project.tags.slice(0, 3)"
                  :key="tagIndex"
                  class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  {{ tag }}
                </span>
                <span
                  v-if="project.tags.length > 3"
                  class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  +{{ project.tags.length - 3 }}
                </span>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center text-[#FF6B35]">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span class="font-semibold">{{ project.capacity }}</span>
                </div>
                <router-link 
                  :to="`/projects/${generateSlug(project.title)}`"
                  class="text-[#FF6B35] hover:text-[#E55A2B] font-semibold transition-colors inline-flex items-center"
                >
                  View Details →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

