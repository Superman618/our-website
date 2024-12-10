import { create } from 'zustand'

interface ChatStore {
  messages: Message[]
  addMessage: (message: Message) => void
  // 其他状态和方法
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
  // ...
})) 