<script>
import { LoanSlipStatus } from "@/utils/constant";
import { formatDate, formatDateTime } from "@/utils/formatDate";

export default {
  props: {
    loanSlip: { type: Object, required: true },
  },
  data() {
    return {
      LoanSlipStatus: LoanSlipStatus,
      books: [],
    };
  },
  computed: {
    isOverdue() {
      if (!this.loanSlip || this.loanSlip.returnedDate) return false;

      if (
        this.loanSlip.status === LoanSlipStatus.rejected.name ||
        this.loanSlip.status === LoanSlipStatus.returned.name
      ) {
        return false;
      }

      const returnDate = new Date(this.loanSlip.returnDate);
      const today = new Date();
      return today > returnDate;
    },

    overdueDays() {
      if (!this.isOverdue) return 0;
      const returnDate = new Date(this.loanSlip.returnDate);
      const today = new Date();
      const diffTime = Math.abs(today - returnDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
  },
  methods: {
    formatDate,
    formatDateTime,
    getBooks() {
      if (this.loanSlip) {
        this.books = [];
        const bookData = new Map();
        var mark = new Map();

        this.loanSlip.bookCopies.forEach((element) => {
          if (!mark.has(element.bookData._id)) {
            mark.set(element.bookData._id, 1);
          } else {
            mark.set(element.bookData._id, mark.get(element.bookData._id) + 1);
          }
          if (!bookData.has(element.bookData._id)) {
            bookData.set(element.bookData._id, element.bookData);
          }
        });
        bookData.forEach((val, key) => {
          this.books.push({ ...val, quantity: mark.get(key) });
        });
      }
    },
  },
  watch: {
    loanSlip: {
      handler(newValue, oldValue) {
        this.getBooks();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<template>
  <div
    class="card mb-3 transition-hover"
    v-if="loanSlip"
    :class="{ 'border-danger overdue-card': isOverdue }"
    @click="
      this.$router.push({
        name: 'loanSlip.detail',
        params: { id: loanSlip._id },
      })
    "
    style="cursor: pointer"
  >
    <div class="card-header" :class="{ 'bg-danger-subtle': isOverdue }">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <span class="fw-bold text-secondary">#{{ loanSlip.loanCode }}</span>
          <span v-if="isOverdue" class="badge bg-danger ms-2">
            <i class="fa-solid fa-triangle-exclamation me-1"></i> Quá hạn
            {{ overdueDays }} ngày
          </span>
        </div>

        <span
          class="fw-bold text-uppercase"
          :class="`text-${LoanSlipStatus[loanSlip.status].color}`"
        >
          {{ LoanSlipStatus[loanSlip.status].desc }}
        </span>
      </div>
    </div>

    <div class="card-body">
      <div class="row justify-content-between mb-2">
        <div class="col-md-6">
          <div class="d-flex align-items-center mb-1">
            <span class="text-secondary small me-2" style="min-width: 80px"
              >Ngày mượn:</span
            >
            <span class="fw-medium">{{
              formatDateTime(loanSlip.borrowedDate)
            }}</span>
          </div>
        </div>

        <div class="col-md-6">
          <div class="d-flex align-items-center">
            <span class="text-secondary small me-2" style="min-width: 80px"
              >Hạn trả:</span
            >
            <span
              class="fw-medium"
              :class="{ 'text-danger fw-bold': isOverdue }"
            >
              {{ formatDate(loanSlip.returnDate) }}
              <i
                v-if="isOverdue"
                class="fa-regular fa-clock text-danger ms-1 animate-pulse"
              ></i>
            </span>
          </div>
        </div>
        <div class="col-md-6" v-if="loanSlip.updatedDate">
          <div class="d-flex align-items-center">
            <span class="text-secondary small me-2" style="min-width: 80px">{{
              loanSlip.status == LoanSlipStatus.rejected.name
                ? "Ngày hủy:"
                : "Ngày cập nhật:"
            }}</span>
            <span class="fw-medium">{{
              formatDateTime(loanSlip.updatedDate)
            }}</span>
          </div>
        </div>
        <div class="col-md-6" v-if="loanSlip.returnedDate">
          <div class="d-flex align-items-center">
            <span class="text-secondary small me-2" style="min-width: 80px"
              >Ngày trả:</span
            >
            <span class="text-success fw-bold">{{
              formatDateTime(loanSlip.returnedDate)
            }}</span>
          </div>
        </div>
      </div>

      <hr class="text-muted opacity-25 mt-1 mb-3" />

      <div class="books">
        <div class="book-item mb-4" v-for="book in books" :key="book._id">
          <div class="d-flex align-items-start">
            <div class="me-3 position-relative">
              <img
                class="img-book-loanSlip rounded border"
                :src="book.images[0]"
                style="object-fit: cover; aspect-ratio: 3/4"
              />
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
              >
                x{{ book.quantity }}
              </span>
            </div>
            <div class="flex-grow-1">
              <h6 class="mb-1 text-dark text-truncate-2">{{ book.name }}</h6>
              <div class="small text-muted">
                {{ book.code }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="isOverdue"
        class="alert alert-danger d-flex align-items-center p-2 mb-0 mt-2 small"
        role="alert"
      >
        <i class="fa-solid fa-circle-info me-2"></i>
        <div>
          Đơn mượn này đã trễ hạn <strong>{{ overdueDays }} ngày</strong>.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-book-loanSlip {
  width: 60px;
  height: 80px;
}

.transition-hover {
  transition: transform 0.2s, box-shadow 0.2s;
}
.transition-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.overdue-card {
  background-color: #fff5f5;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.animate-pulse {
  animation: pulse 2s infinite;
}
</style>
