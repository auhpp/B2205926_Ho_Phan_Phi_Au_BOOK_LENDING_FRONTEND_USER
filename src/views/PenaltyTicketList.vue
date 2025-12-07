<script>
import PenaltyTicketListTab from "@/components/PenaltyTicketListTab.vue";
import penaltyTicketService from "@/services/penaltyTicket.service"; // Import service để lấy thống kê

export default {
  components: {
    PenaltyTicketListTab,
  },
  data() {
    return {
      activeTab: "NOT_PAID",
      // Thêm dữ liệu cho phần thống kê
      stats: {
        totalUnpaidAmount: 0,
        unpaidCount: 0,
        totalCount: 0,
      },
    };
  },
  watch: {
    activeTab(newPage) {
      if (newPage) {
        if (this.$route.query.paymentStatus !== newPage) {
          this.$router
            .push({ query: { paymentStatus: newPage } })
            .catch(() => {});
        }
      }
    },
  },
  methods: {
    // Hàm định dạng tiền tệ (VD: 15000 -> 15.000đ)
    formatCurrency(value) {
      if (!value) return "0đ";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    async fetchPenaltyStats() {
      try {
        const response = await penaltyTicketService.getStats();

        const data = response.result;

        this.stats.totalUnpaidAmount = data.totalUnpaidAmount;
        this.stats.unpaidCount = data.unpaidCount;
        this.stats.totalCount = data.totalCount;
      } catch (error) {
        console.error("Lỗi khi lấy thống kê:", error);
      }
    },
  },
  mounted() {
    if (this.$route.query.paymentStatus) {
      this.activeTab = this.$route.query.paymentStatus;
    }
    this.fetchPenaltyStats(); // Gọi hàm lấy thống kê khi trang tải
  },
};
</script>

<template>
  <div class="loanSlipList container" style="height: auto">
    <div class="mb-4 mt-5">
      <h4 class="text-dark">Phí phạt của tôi</h4>
      <p class="text-muted mb-3">Quản lý các phiếu phạt của bạn</p>

      <div
        v-if="stats.unpaidCount > 0"
        class="alert alert-danger d-flex align-items-center justify-content-between"
        role="alert"
        style="background-color: #ffebee; border-color: #ffcdd2"
      >
        <div>
          <div class="d-flex align-items-center mb-1">
            <i class="fa-solid fa-circle-exclamation text-danger me-2 fs-5"></i>
            <strong class="text-danger"
              >Bạn có {{ stats.unpaidCount }} phiếu phạt chưa thanh toán</strong
            >
          </div>
          <div class="ms-4 ps-2 text-danger small">
            Tổng số tiền:
            <strong>{{ formatCurrency(stats.totalUnpaidAmount) }}</strong>
          </div>
          <div class="ms-4 ps-2 text-danger small">
            Vui lòng thanh toán để tiếp tục mượn sách
          </div>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-md-6">
          <div class="card p-3 shadow-sm h-100 border rounded-3">
            <div class="text-muted small mb-1">Tổng phí chưa thanh toán</div>
            <div class="fs-4 fw-bold text-danger">
              {{ formatCurrency(stats.totalUnpaidAmount) }}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card p-3 shadow-sm h-100 border rounded-3">
            <div class="text-muted small mb-1">
              Số phiếu phạt chưa thanh toán
            </div>
            <div class="fs-4 fw-bold text-dark">
              {{ stats.unpaidCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="loanSlipList p-0 underline-tabs mb-5 container"
      style="height: auto"
    >
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
        <div class="pb-4 tab-pane fade show active">
          <PenaltyTicketListTab
            v-if="activeTab"
            :payment-status="activeTab"
            :key="activeTab"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Giữ nguyên style cũ của bạn */
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
