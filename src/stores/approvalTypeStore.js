import { defineStore } from "pinia";
import axios from "axios";

export const useApprovalTypeStore = defineStore("approvalType", {
  state: () => ({
    options: [],
  }),
  actions: {
    async getAllTypes() {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/approval-request-types`
      );
      const options = response.data.data
        .flat()
        .map((item) => ({ label: item.name, value: item.id }));
      this.options = options;
    },
  },
});
