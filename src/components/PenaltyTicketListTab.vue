<script>
import Pagination from "./Pagination.vue";
import penaltyTicketService from "@/services/penaltyTicket.service";
import PenaltyTicketCard from "./PenaltyTicketCard.vue";

export default {
  components: {
    PenaltyTicketCard,
    Pagination,
  },
  props: {
    paymentStatus: { type: String, required: true },
  },
  data() {
    return {
      penaltyTickets: [],
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    };
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.findAllPenaltyTickets();
      }
    },
  },
  methods: {
    async findAllPenaltyTickets() {
      try {
        const data = await penaltyTicketService.findAll({
          page: this.currentPage,
          limit: this.limit,
          paymentStatus: this.paymentStatus,
        });
        this.penaltyTickets = data.result.data;
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
    this.findAllPenaltyTickets();
  },
};
</script>

<template>
  <div>
    <div v-if="penaltyTickets.length != 0">
      <PenaltyTicketCard
        v-for="penaltyTicket in penaltyTickets"
        :key="penaltyTicket._id"
        :penalty-ticket="penaltyTicket"
      />
      <div class="d-flex justify-content-center mt-3">
        <Pagination v-model="currentPage" :total-pages="totalPages" />
      </div>
    </div>
    <div v-else>
      <p class="text-center mt-5" style="font-size: 26px; color: grey">
        Không có phiếu phạt
      </p>
    </div>
  </div>
</template>
