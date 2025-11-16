<script>
import LoanSlipListTab from '@/components/LoanSlipListTab.vue';

export default {
    components: {
        LoanSlipListTab
    },
    data() {
      return {
        activeTab: 'pending'
      }
    },
    watch: {
    activeTab(newPage) {
      if (newPage) {
        this.$router.push({ query: { status: newPage } });
      }
    },
  },
   mounted() {
  this.activeTab = this.$route.query.status;
  }
};
</script>
<template>
  <div class="loanSlipList underline-tabs mb-5 container" style="height: auto;">
    <ul class="nav nav-tabs" id="underlineTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'pending' }"
          @click="activeTab = 'pending'"
          type="button"
        >
          Chờ duyệt
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'approved' }"
          @click="activeTab = 'approved'"
          type="button"
        >
          Đã duyệt
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'borrowed' }"
          @click="activeTab = 'borrowed'"
          type="button"
        >
          Đang mượn
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'returned' }"
          @click="activeTab = 'returned'"
          type="button"
        >
          Đã trả
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'rejected' }"
          @click="activeTab = 'rejected'"
          type="button"
        >
          Đã hủy
        </button>
      </li>
    </ul>

    <div class="tab-content mt-1" id="underlineTabsContent">
      <div
        class="pb-4 tab-pane fade show active"
        v-if="activeTab === 'pending'"
      >
        <LoanSlipListTab :status="'pending'" />
      </div>

      <div
        class="pb-4 tab-pane fade show active"
        v-if="activeTab === 'approved'"
      >
        <LoanSlipListTab :status="'approved'" />
      </div>

      <div
        class="pb-4 tab-pane fade show active"
        v-if="activeTab === 'borrowed'"
      >
        <LoanSlipListTab :status="'borrowed'" />
      </div>

      <div
        class="pb-4 tab-pane fade show active"
        v-if="activeTab === 'returned'"
      >
        <LoanSlipListTab :status="'returned'" />
      </div>

      <div
        class="pb-4 tab-pane fade show active"
        v-if="activeTab === 'rejected'"
      >
        <LoanSlipListTab :status="'rejected'" />
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
