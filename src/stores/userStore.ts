import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userId: null as string | null,
    username: "",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  }),
  actions: {
    setUser(userId: string, username: string) {
      this.userId = userId;
      this.username = username;
    },
    changeAvatar(url: string) {
      this.avatarUrl = url;
    },
    logout() {
      this.userId = null;
      this.username = "";
    },
  },
});
