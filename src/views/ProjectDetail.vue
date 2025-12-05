<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projectsData, type Project } from '@/data/projects'
import { findProjectBySlug, generateSlug } from '@/utils/projectUtils'
import { useSEO } from '@/composables/useSEO'

const route = useRoute()
const router = useRouter()
const project = ref<Project | null>(null)
const isLoading = ref(true)
const selectedImageIndex = ref(0)

// Initialize SEO with default values
const { updateMetaTags } = useSEO({
  title: 'Project Details - PA Energy',
  description: 'View detailed information about our solar energy project.',
  image: '/images/solar-bg-1.jpg'
})

onMounted(() => {
  const slug = route.params.slug as string
  const foundProject = findProjectBySlug(projectsData, slug)
  
  if (foundProject) {
    project.value = foundProject
  } else {
    router.push('/projects')
  }
  isLoading.value = false
})

// Update SEO Meta Tags when project loads
watch(project, (newProject) => {
  if (newProject) {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const projectUrl = `${baseUrl}${route.path}`
    const projectImage = newProject.images && newProject.images.length > 0 
      ? newProject.images[0] 
      : newProject.image
    
    updateMetaTags({
      title: `${newProject.title} - PA Energy | Solar Project Details`,
      description: `${newProject.description} Located in ${newProject.location || 'Philippines'}. ${newProject.capacity} solar installation with ${newProject.panelsInstalled || 'multiple'} panels. ${newProject.annualSavings ? `Annual savings: ${newProject.annualSavings}.` : ''} View full project details.`,
      keywords: `${newProject.category.toLowerCase()} solar, ${newProject.title}, solar installation ${newProject.location || ''}, ${newProject.capacity} solar system, solar panels Philippines, ${newProject.category} solar project`,
      image: projectImage,
      url: projectUrl,
      type: 'article'
    })
  }
}, { immediate: true })

const projectImages = computed(() => {
  if (!project.value) return []
  return project.value.images && project.value.images.length > 0 
    ? project.value.images 
    : [project.value.image]
})

const relatedProjects = computed(() => {
  if (!project.value) return []
  return projectsData
    .filter(p => p.id !== project.value!.id && p.category === project.value!.category)
    .slice(0, 3)
})

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

const selectImage = (index: number) => {
  selectedImageIndex.value = index
}

const nextImage = () => {
  if (selectedImageIndex.value < projectImages.value.length - 1) {
    selectedImageIndex.value++
  }
}

const prevImage = () => {
  if (selectedImageIndex.value > 0) {
    selectedImageIndex.value--
  }
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Loading State -->
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mx-auto mb-4"></div>
        <p class="text-gray-600">Loading project details...</p>
      </div>
    </div>

    <!-- Project Detail Content -->
    <div v-else-if="project" class="pt-20">
      <!-- Image Gallery Section -->
      <section class="relative bg-gray-900 w-full">
        <div class="w-full">
          <!-- Main Image Display -->
          <div 
            class="relative h-[70vh] min-h-[600px] w-full overflow-hidden transition-all duration-500"
            :style="{
              backgroundImage: `url(${projectImages[selectedImageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <!-- Navigation Arrows -->
            <button
              v-if="projectImages.length > 1"
              @click="prevImage"
              :disabled="selectedImageIndex === 0"
              class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              v-if="projectImages.length > 1"
              @click="nextImage"
              :disabled="selectedImageIndex === projectImages.length - 1"
              class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Image Counter -->
            <div v-if="projectImages.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {{ selectedImageIndex + 1 }} / {{ projectImages.length }}
            </div>

            <!-- Project Title Overlay -->
            <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div class="max-w-7xl mx-auto">
                <span 
                  class="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
                  :class="getCategoryColor(project.category)"
                >
                  {{ project.category }}
                </span>
                <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">{{ project.title }}</h1>
                <div class="flex flex-wrap items-center gap-6 text-white/90">
                  <div v-if="project.location" class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-lg">{{ project.location }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span class="text-lg font-semibold">{{ project.capacity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Thumbnail Gallery -->
          <div v-if="projectImages.length > 1" class="bg-gray-100 p-4">
            <div class="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-2">
              <button
                v-for="(image, index) in projectImages"
                :key="index"
                @click="selectImage(index)"
                class="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all"
                :class="selectedImageIndex === index ? 'border-[#FF6B35] ring-2 ring-[#FF6B35]' : 'border-transparent hover:border-gray-300'"
              >
                <img 
                  :src="image" 
                  :alt="`${project.title} - Image ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content Section -->
      <section class="py-12 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left Column - Main Content -->
              <div class="lg:col-span-2 space-y-8">
                <!-- Overview -->
                <div 
                  v-motion
                  :initial="{ opacity: 0, y: 30 }"
                  :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
                  :inViewOptions="{ once: true }"
                >
                  <h2 class="text-3xl font-bold text-[#0A2540] mb-4">About This Project</h2>
                  <div class="prose prose-lg max-w-none text-gray-600">
                    <p class="text-lg leading-relaxed mb-4">
                      {{ project.description }}
                    </p>
                    <p class="text-lg leading-relaxed">
                      This {{ project.category.toLowerCase() }} solar installation represents our commitment to delivering 
                      high-quality renewable energy solutions. The project was completed with precision and attention to detail, 
                      ensuring optimal performance and maximum energy savings for the client.
                    </p>
                  </div>
                </div>

                <!-- Key Features -->
                <div 
                  v-if="project.features && project.features.length > 0"
                  v-motion
                  :initial="{ opacity: 0, y: 30 }"
                  :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
                  :inViewOptions="{ once: true }"
                >
                  <h2 class="text-3xl font-bold text-[#0A2540] mb-6">Key Features</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="(feature, index) in project.features"
                      :key="index"
                      class="flex items-start space-x-3 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-100"
                    >
                      <div class="flex-shrink-0 w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span class="text-gray-700 font-medium pt-1">{{ feature }}</span>
                    </div>
                  </div>
                </div>

                <!-- Tags -->
                <div 
                  v-if="project.tags && project.tags.length > 0"
                  v-motion
                  :initial="{ opacity: 0, y: 30 }"
                  :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
                  :inViewOptions="{ once: true }"
                  class="mb-8"
                >
                  <h2 class="text-3xl font-bold text-[#0A2540] mb-4">Project Tags</h2>
                  <div class="flex flex-wrap gap-3">
                    <span
                      v-for="(tag, index) in project.tags"
                      :key="index"
                      class="px-4 py-2 bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Specifications -->
                <div 
                  v-motion
                  :initial="{ opacity: 0, y: 30 }"
                  :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
                  :inViewOptions="{ once: true }"
                  class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8"
                >
                  <h2 class="text-3xl font-bold text-[#0A2540] mb-6">Project Specifications</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-center justify-between py-3 border-b border-gray-200">
                      <span class="text-gray-600 font-medium">System Capacity</span>
                      <span class="text-[#0A2540] font-bold text-lg">{{ project.capacity }}</span>
                    </div>
                    <div v-if="project.panelsInstalled" class="flex items-center justify-between py-3 border-b border-gray-200">
                      <span class="text-gray-600 font-medium">Panels Installed</span>
                      <span class="text-[#0A2540] font-bold text-lg">{{ project.panelsInstalled.toLocaleString() }}</span>
                    </div>
                    <div v-if="project.location" class="flex items-center justify-between py-3 border-b border-gray-200">
                      <span class="text-gray-600 font-medium">Location</span>
                      <span class="text-[#0A2540] font-bold text-lg">{{ project.location }}</span>
                    </div>
                    <div v-if="project.dateCompleted" class="flex items-center justify-between py-3 border-b border-gray-200">
                      <span class="text-gray-600 font-medium">Completed</span>
                      <span class="text-[#0A2540] font-bold text-lg">
                        {{ new Date(project.dateCompleted).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) }}
                      </span>
                    </div>
                    <div v-if="project.annualSavings" class="flex items-center justify-between py-3 border-b border-gray-200">
                      <span class="text-gray-600 font-medium">Annual Savings</span>
                      <span class="text-[#FF6B35] font-bold text-lg">{{ project.annualSavings }}</span>
                    </div>
                    <div v-if="project.co2Reduction" class="flex items-center justify-between py-3 border-b border-gray-200">
                      <span class="text-gray-600 font-medium">CO₂ Reduction</span>
                      <span class="text-[#0A2540] font-bold text-lg">{{ project.co2Reduction }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column - Sticky Sidebar -->
              <div class="lg:col-span-1">
                <div 
                  v-motion
                  :initial="{ opacity: 0, y: 30 }"
                  :visible="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
                  :inViewOptions="{ once: true }"
                  class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-24"
                >
                  <!-- Quick Stats -->
                  <div class="space-y-4 mb-6 pb-6 border-b border-gray-200">
                    <div class="text-center">
                      <div class="text-4xl font-bold text-[#FF6B35] mb-1">{{ project.capacity }}</div>
                      <div class="text-sm text-gray-600">System Capacity</div>
                    </div>
                    <div v-if="project.annualSavings" class="text-center">
                      <div class="text-3xl font-bold text-[#0A2540] mb-1">{{ project.annualSavings }}</div>
                      <div class="text-sm text-gray-600">Annual Savings</div>
                    </div>
                    <div v-if="project.co2Reduction" class="text-center">
                      <div class="text-2xl font-bold text-[#0A2540] mb-1">{{ project.co2Reduction }}</div>
                      <div class="text-sm text-gray-600">CO₂ Reduction</div>
                    </div>
                  </div>

                  <!-- Category Badge -->
                  <div class="mb-6">
                    <div class="text-sm text-gray-600 mb-2">Project Category</div>
                    <span 
                      class="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                      :class="getCategoryColor(project.category)"
                    >
                      {{ project.category }}
                    </span>
                  </div>

                  <!-- Location -->
                  <div v-if="project.location" class="mb-6">
                    <div class="text-sm text-gray-600 mb-2">Location</div>
                    <div class="flex items-start space-x-2">
                      <svg class="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="text-[#0A2540] font-medium">{{ project.location }}</span>
                    </div>
                  </div>

                  <!-- CTA Buttons -->
                  <div class="space-y-3">
                    <router-link
                      to="/"
                      class="block w-full bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white text-center px-6 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                      Get Free Quote
                    </router-link>
                    <router-link
                      to="/projects"
                      class="block w-full bg-white border-2 border-[#FF6B35] text-[#FF6B35] text-center px-6 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                    >
                      View All Projects
                    </router-link>
                    <button
                      class="w-full bg-gray-100 text-[#0A2540] text-center px-6 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span>Share Project</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Projects -->
      <section v-if="relatedProjects.length > 0" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl font-bold text-[#0A2540] mb-8">Similar Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <router-link
                v-for="relatedProject in relatedProjects"
                :key="relatedProject.id"
                :to="`/projects/${generateSlug(relatedProject.title)}`"
                class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div class="relative h-48 overflow-hidden">
                  <img 
                    :src="relatedProject.image" 
                    :alt="relatedProject.title"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div class="absolute top-4 right-4">
                    <span 
                      class="px-3 py-1 rounded-full text-sm font-semibold"
                      :class="getCategoryColor(relatedProject.category)"
                    >
                      {{ relatedProject.category }}
                    </span>
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-[#0A2540] mb-2 group-hover:text-[#FF6B35] transition-colors">
                    {{ relatedProject.title }}
                  </h3>
                  <p class="text-gray-600 mb-4 line-clamp-2">{{ relatedProject.description }}</p>
                  <div class="flex items-center text-[#FF6B35] font-semibold">
                    <span>{{ relatedProject.capacity }}</span>
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
