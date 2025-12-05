import { watch } from 'vue'
import { useRoute } from 'vue-router'

export interface SEOData {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

const defaultSEO: SEOData = {
  title: 'PA Energy - Solar Power Solutions | Renewable Energy Philippines',
  description: 'Leading solar energy solutions in the Philippines. Clean, renewable energy for homes and businesses. Get your free quote today!',
  keywords: 'solar energy, solar panels, renewable energy, Philippines, solar installation, solar power, clean energy',
  image: '/images/solar-bg-1.jpg',
  type: 'website'
}

export function useSEO(seoData?: Partial<SEOData>) {
  const route = useRoute()
  
  const updateMetaTags = (data: SEOData) => {
    const fullData = { ...defaultSEO, ...data }
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const currentUrl = `${baseUrl}${route.path}`
    
    // Update title
    document.title = fullData.title
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }
    
    // Update or create Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute('property', property)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }
    
    // Update or create Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute('name', name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }
    
    // Basic meta tags
    updateMetaTag('description', fullData.description)
    if (fullData.keywords) {
      updateMetaTag('keywords', fullData.keywords)
    }
    
    // Open Graph tags
    updateOGTag('og:title', fullData.title)
    updateOGTag('og:description', fullData.description)
    updateOGTag('og:type', fullData.type || 'website')
    updateOGTag('og:url', fullData.url || currentUrl)
    if (fullData.image) {
      const imageUrl = fullData.image.startsWith('http') 
        ? fullData.image 
        : `${baseUrl}${fullData.image}`
      updateOGTag('og:image', imageUrl)
    }
    
    // Twitter Card tags
    updateTwitterTag('twitter:card', 'summary_large_image')
    updateTwitterTag('twitter:title', fullData.title)
    updateTwitterTag('twitter:description', fullData.description)
    if (fullData.image) {
      const imageUrl = fullData.image.startsWith('http') 
        ? fullData.image 
        : `${baseUrl}${fullData.image}`
      updateTwitterTag('twitter:image', imageUrl)
    }
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', fullData.url || currentUrl)
  }
  
  // Update meta tags when route changes
  watch(
    () => route.path,
    () => {
      if (seoData) {
        updateMetaTags(seoData as SEOData)
      }
    },
    { immediate: true }
  )
  
  // Initial update
  if (seoData) {
    updateMetaTags(seoData as SEOData)
  }
  
  return {
    updateMetaTags
  }
}

