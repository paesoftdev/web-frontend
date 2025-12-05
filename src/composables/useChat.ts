import { ref, watch, nextTick, onUnmounted } from 'vue'

interface ChatMessage {
  text: string
  sender: 'user' | 'assistant'
}

export function useChat() {
  const isChatOpen = ref(false)
  const isSmileyHovered = ref(false)
  const chatMessage = ref('')
  const showUserInfoForm = ref(false)
  const userInfo = ref({
    firstName: '',
    lastName: '',
    email: ''
  })
  const isUserInfoCollected = ref(false)
  const isSubmittingForm = ref(false)
  const isTyping = ref(false)
  const isChatHovered = ref(false)
  const isChatScrolling = ref(false)
  let chatScrollTimeout: ReturnType<typeof setTimeout> | null = null
  const chatMessagesContainer = ref<HTMLElement | null>(null)
  const chatMessages = ref<ChatMessage[]>([])
  const webhookUrl = 'https://automate.lfaderon.com/webhook/pae-web-assistant'

  const handleChatScroll = () => {
    isChatScrolling.value = true
    if (chatScrollTimeout) {
      clearTimeout(chatScrollTimeout)
    }
    chatScrollTimeout = setTimeout(() => {
      isChatScrolling.value = false
    }, 1000)
  }

  const scrollToBottom = () => {
    nextTick(() => {
      if (chatMessagesContainer.value) {
        chatMessagesContainer.value.scrollTo({
          top: chatMessagesContainer.value.scrollHeight,
          behavior: 'smooth'
        })
      }
    })
  }

  // Watch for new messages and auto-scroll
  watch(chatMessages, () => {
    scrollToBottom()
  }, { deep: true })

  // Watch for typing indicator changes
  watch(isTyping, (newVal) => {
    if (newVal) {
      scrollToBottom()
    }
  })

  const toggleChat = () => {
    if (!isUserInfoCollected.value) {
      // Show user info form first
      showUserInfoForm.value = true
      isChatOpen.value = true
    } else {
      isChatOpen.value = !isChatOpen.value
    }
  }

  const submitUserInfo = async () => {
    // Validate form
    if (!userInfo.value.firstName.trim() || !userInfo.value.lastName.trim() || !userInfo.value.email.trim()) {
      alert('Please fill in all fields')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userInfo.value.email)) {
      alert('Please enter a valid email address')
      return
    }

    try {
      isSubmittingForm.value = true
      // Send user info to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: userInfo.value.firstName,
          lastName: userInfo.value.lastName,
          email: userInfo.value.email,
          sessionStart: new Date().toISOString(),
          action: 'session_start'
        })
      })

      if (response.ok) {
        const data = await response.json()
        isUserInfoCollected.value = true
        showUserInfoForm.value = false
        // Initialize chat with welcome message from webhook or fallback
        const welcomeMessage = data.output || `Hello ${userInfo.value.firstName}! How can I help you with solar energy today?`
        chatMessages.value = [
          { text: welcomeMessage, sender: 'assistant' }
        ]
        // Scroll to bottom after welcome message
        scrollToBottom()
      } else {
        throw new Error('Failed to initialize chat session')
      }
    } catch (error) {
      console.error('Error initializing chat session:', error)
      alert('Failed to start chat. Please try again.')
    } finally {
      isSubmittingForm.value = false
    }
  }

  const sendMessage = async () => {
    if (chatMessage.value.trim()) {
      const userMessage = chatMessage.value.trim()
      chatMessages.value.push({ text: userMessage, sender: 'user' })
      chatMessage.value = ''
      
      try {
        isTyping.value = true
        // Send message to webhook
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: userInfo.value.firstName,
            lastName: userInfo.value.lastName,
            email: userInfo.value.email,
            message: userMessage,
            action: 'user_message',
            timestamp: new Date().toISOString()
          })
        })

        if (response.ok) {
          const data = await response.json()
          // Add assistant response from webhook (check for 'output' property)
          if (data.output) {
            chatMessages.value.push({ 
              text: data.output, 
              sender: 'assistant' 
            })
          } else if (data.response || data.message) {
            chatMessages.value.push({ 
              text: data.response || data.message, 
              sender: 'assistant' 
            })
          } else {
            // Fallback response
            chatMessages.value.push({ 
              text: 'Thank you for your message! Our team will get back to you soon. In the meantime, feel free to ask about our solar solutions.', 
              sender: 'assistant' 
            })
          }
        } else {
          throw new Error('Failed to send message')
        }
      } catch (error) {
        console.error('Error sending message to webhook:', error)
        isTyping.value = false
        // Fallback response on error
        chatMessages.value.push({ 
          text: 'Thank you for your message! Our team will get back to you soon. In the meantime, feel free to ask about our solar solutions.', 
          sender: 'assistant' 
        })
      } finally {
        isTyping.value = false
      }
    }
  }

  onUnmounted(() => {
    if (chatScrollTimeout) {
      clearTimeout(chatScrollTimeout)
    }
  })

  return {
    isChatOpen,
    isSmileyHovered,
    chatMessage,
    showUserInfoForm,
    userInfo,
    isUserInfoCollected,
    isSubmittingForm,
    isTyping,
    isChatHovered,
    isChatScrolling,
    chatMessagesContainer,
    chatMessages,
    toggleChat,
    submitUserInfo,
    sendMessage,
    handleChatScroll
  }
}

