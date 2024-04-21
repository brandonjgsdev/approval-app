import { defineStore } from "pinia";

export const useApprovalTypeStore = defineStore("approvalType", {
  state: () => ({
    options: [],
  }),
  actions: {
    setOptions(options) {
      this.options = options;
    },
  },
});
