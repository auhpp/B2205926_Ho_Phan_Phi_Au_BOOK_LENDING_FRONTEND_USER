<script>
import { LoanSlipStatus } from "@/utils/constant";
import { formatDate, formatDateTime } from "@/utils/formatDate";

export default {
  props: {
    loanSlip: { type: Object, required: true },
  },
  methods: {
    formatDate,
    formatDateTime,
    getBooks() {
      if (this.loanSlip) {
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
        console.log(this.books);
      }
    },
  },
  watch: {
    loanSlip: {
      handler(newValue, oldValue) {
        this.getBooks();
      },
      deep: true,
    },
  },
  data() {
    return {
      LoanSlipStatus: LoanSlipStatus,
      books: [],
    };
  },
  mounted() {
    this.getBooks();
  },
};
</script>

<template>
  <div
    class="card mb-2"
    v-if="loanSlip"
    @click="
      this.$router.push({
        name: 'loanSlip.detail',
        params: { id: loanSlip._id },
      })
    "
  >
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <span>Mã: {{ loanSlip._id }}</span>
        <span class="fw-bold text-uppercase text-danger">{{
          LoanSlipStatus[loanSlip.status].desc
        }}</span>
      </div>
    </div>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col">
          <div class="row g-3 align-items-center">
            <div class="col-2">
              <label for="inputNote" class="col-form-label fw-bold"
                >Ngày mượn:</label
              >
            </div>
            <div class="col-sm-8 col-lg-10">
              {{ formatDateTime(loanSlip.borrowedDate) }}
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row g-3 align-items-center">
            <div class="col-2">
              <label for="inputNote" class="col-form-label fw-bold"
                >Hạn trả:</label
              >
            </div>
            <div class="col-sm-8 col-lg-10">
              {{ formatDate(loanSlip.returnDate) }}
            </div>
          </div>
        </div>
      </div>
      <div class="row g-3 align-items-center" v-if="loanSlip.returnedDate">
        <div class="col-1">
          <label for="inputNote" class="col-form-label fw-bold"
            >Ngày trả:</label
          >
        </div>
        <div class="col-sm-8 col-lg-10">
          {{ formatDateTime(loanSlip.returnedDate) }}
        </div>
      </div>
      <div class="books mb-3">
        <div class="book-item" v-for="book in books" :key="book._id">
          <hr class="ms-1 me-1" />
          <div class="row">
            <div class="col-2">
              <div class="">
                <img class="img-book-loanSlip" :src="book.images[0]" />
              </div>
            </div>
            <div class="col">
              <div>
                {{ book.name }}
              </div>
              <div>x{{ book.quantity }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.img-book-loanSlip {
  width: 120px;
}
</style>
