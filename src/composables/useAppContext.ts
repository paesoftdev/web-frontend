import { inject } from 'vue'
import type { InjectionKey } from 'vue'
import type { useNavigation } from './useNavigation'
import type { useChat } from './useChat'

// Define injection keys
export const NavigationKey: InjectionKey<ReturnType<typeof useNavigation>> = Symbol('navigation')
export const ChatKey: InjectionKey<ReturnType<typeof useChat>> = Symbol('chat')

// Helper functions to inject the context
export function useAppNavigation() {
  const navigation = inject(NavigationKey)
  if (!navigation) {
    throw new Error('Navigation context not provided. Make sure App.vue provides it.')
  }
  return navigation
}

export function useAppChat() {
  const chat = inject(ChatKey)
  if (!chat) {
    throw new Error('Chat context not provided. Make sure App.vue provides it.')
  }
  return chat
}

