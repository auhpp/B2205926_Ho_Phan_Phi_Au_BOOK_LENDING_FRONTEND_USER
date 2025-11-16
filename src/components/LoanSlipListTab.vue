<script>
import loanSlipService from "@/services/loanSlip.service";
import LoanSlipCard from "./LoanSlipCard.vue";
import Pagination from "./Pagination.vue";

export default {
  components: {
    LoanSlipCard,
    Pagination,
  },
  props: {
    status: { type: String, required: true },
  },
  data() {
    return {
      loanSlips: [],
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    };
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.findAllLoanSlip();
      }
    },
  },
  methods: {
    async findAllLoanSlip() {
      try {
        const data = await loanSlipService.findAll({
          page: this.currentPage,
          limit: this.limit,
          status: this.status,
        });
        this.loanSlips = data.result.data;
        this.totalPages = data.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    const pageFromUrl = parseInt(this.$route.query.page);
    if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
      this.currentPage = pageFromUrl;
    } else {
      this.currentPage = 1;
    }
    this.findAllLoanSlip();
  },
};
</script>

<template>
  <div>
    <div v-if="loanSlips.length != 0">
      <LoanSlipCard
        v-for="loanSlip in loanSlips"
        :key="loanSlip._id"
        :loan-slip="loanSlip"
      />
      <div class="d-flex justify-content-center mt-3">
        <Pagination v-model="currentPage" :total-pages="totalPages" />
      </div>
    </div>
    <div v-else>
      <p class="text-center mt-5" style="font-size: 26px; color: grey;">Không có phiếu mượn</p>
    </div>
  </div>
</template>
