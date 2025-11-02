import { defineStore } from "pinia";

export interface Message {
  sender: string;
  text: string;
}

export interface Chat {
  id: string;
  name: string;
  participants: string[];
  messages: Message[];
}

export const useChatStore = defineStore("chat", {
  state: () => ({
    activeChatId: null as string | null,
    chats: [
      {
        id: "1",
        name: "Alice",
        participants: ["1", "AliceId"],
        messages: [
          { sender: "Alice", text: "Hey there!" },
          { sender: "You", text: "Hello Alice!" },
        ],
      },
      {
        id: "2",
        name: "Study Group",
        participants: ["1", "BobId", "CharlieId"],
        messages: [
          { sender: "Bob", text: "Hello everyone!" },
          { sender: "Charlie", text: "Hi!" },
          { sender: "You", text: "Hey team!" },
        ],
      },
    ] as Chat[],
  }),
  actions: {
    setActiveChat(chatId: string) {
      this.activeChatId = chatId;
    },
    addMessage(chatId: string, sender: string, text: string) {
      const chat = this.chats.find((c) => c.id === chatId);
      if (!chat) return;
      chat.messages.push({ sender, text });
    },
    addChat(name: string, participants: string[]) {
      const newChat: Chat = {
        id: (this.chats.length + 1).toString(),
        name,
        participants,
        messages: [],
      };
      this.chats.push(newChat);
    },
  },
});
