import { defineStore } from "pinia";
import { LocalStorage, SessionStorage } from "quasar";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    allUsers: [],
    isAuthenticated: false,
  }),

  actions: {
    setAllUsers(users) {
      this.allUsers = users;
    },
    async getAllUsers() {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/users`
      );
      const options = response.data.data
        .flat()
        .map((item) => ({ label: item.name, value: item.id }));
      this.allUsers = options;
    },
    login({ userData, auth }) {
      this.user = userData;
      this.isAuthenticated = true;

      LocalStorage.set("accessToken", auth.accessToken);
      LocalStorage.set("userData", userData);
    },

    async logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.allUsers = [];

      LocalStorage.clear();
    },

    restoreUser() {
      const user = LocalStorage.getItem("userData");
      if (user) {
        this.user = user;
        this.isAuthenticated = true;
      }
    },
  },
});
