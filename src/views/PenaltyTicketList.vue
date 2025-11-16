<script>
import PenaltyTicketListTab from "@/components/PenaltyTicketListTab.vue";

export default {
  components: {
    PenaltyTicketListTab,
  },
  data() {
    return {
      activeTab: "NOT_PAID",
    };
  },
  watch: {
    activeTab(newPage) {
      if (newPage) {
        this.$router.push({ query: { paymentStatus: newPage } });
      }
    },
  },
  mounted() {
    this.activeTab = this.$route.query.paymentStatus;
  },
};
</script>
<template>
  <div class="loanSlipList underline-tabs mb-5 container" style="height: auto">
    <ul class="nav nav-tabs" id="underlineTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'NOT_PAID' }"
          @click="activeTab = 'NOT_PAID'"
          type="button"
        >
          Chưa thanh toán
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'PAID' }"
          @click="activeTab = 'PAID'"
          type="button"
        >
          Đã thanh toán
        </button>
      </li>
    </ul>

    <div class="tab-content mt-1" id="underlineTabsContent">
      <div
        class="pb-4 tab-pane fade show active"
        v-if="activeTab === 'NOT_PAID'"
      >
        <PenaltyTicketListTab :payment-status="'NOT_PAID'" />
      </div>

      <div class="pb-4 tab-pane fade show active" v-if="activeTab === 'PAID'">
        <PenaltyTicketListTab :payment-status="'PAID'" />
      </div>
    </div>
  </div>
</template>

<style>
body {
  background: #f8f9fa;
  padding: 2rem 0;
}

.loanSlipList.underline-tabs .nav-tabs {
  border-bottom: 2px solid #e9ecef;
}

.loanSlipList.underline-tabs .nav-link {
  border: none;
  border-bottom: 2px solid transparent;
  padding: 1rem 1.5rem;
  margin-bottom: -2px;
  font-weight: 500;
  color: #6c757d;
  transition: all 0.3s ease;
}

.loanSlipList.underline-tabs .nav-link:hover {
  border-bottom-color: #0d6efd50;
  color: #0d6efd;
}

.loanSlipList.underline-tabs .nav-link.active {
  border-bottom-color: #0d6efd;
  color: #0d6efd;
}

/* Content Animation */
.tab-pane.fade {
  transition: all 0.2s ease-out;
}

.tab-pane.fade.show {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
