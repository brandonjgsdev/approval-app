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
    login({ userData, auth }) {
      this.user = userData;
      this.isAuthenticated = true;

      LocalStorage.set("accessToken", auth.accessToken);
      LocalStorage.set("userData", userData);
    },

    async logout() {
      // const response = await axios.post(
      //   `${import.meta.env.VITE_APP_URL}/logout`
      // );

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
