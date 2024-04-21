import { defineStore } from "pinia";
import axios from "axios";

export const useApprovalRequestStore = defineStore("approvalRequest", {
  state: () => ({
    all: [],
    received: [],
    sended: [],
  }),
  actions: {
    async getSendedApprovalRequest() {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/approval-request/sended`
      );

      this.sended = response.data.data;
    },
    async getReceivedApprovalRequest() {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/approval-request/received`
      );

      this.received = response.data.data;
    },
    async getAllApprovalRequest() {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/approval-request/all`
      );

      this.all = response.data.data;
    },
    deleteData() {
      this.sended = [];
      this.received = [];
      this.all = [];
    },
  },
});
