import { ref, watch, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useRoute } from 'vue-router'

export function useNavigation() {
  const route = useRoute()
  const isMenuOpen = ref(false)
  const isScrolled = ref(false)
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

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      isMenuOpen.value = false
    }
  }

  onUnmounted(() => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
  })

  return {
    route,
    isMenuOpen,
    isScrolled,
    toggleMenu,
    scrollToSection
  }
}

