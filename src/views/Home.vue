<script>
import BookList from "@/components/BookList.vue";
import Pagination from "@/components/Pagination.vue";
import bookService from "@/services/book.service";

export default {
  components: {
    BookList,
    Pagination
  },
  data() {
    return {
      books: [],
      currentPage: 1,
      totalPages: 1,
      limit: 12,
    };
  },
  watch: {
    currentPage(newPage) {
      if (newPage) {
        this.$router.push({ query: { page: newPage } });
        this.retrieveBooks();
      }
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        const result = await bookService.findAll({
          page: this.currentPage,
          limit: this.limit,
        });
        this.books = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    handleChangePage(pageNum) {
      this.currentPage = pageNum;
    },
  },
  mounted() {
    const pageFromUrl = parseInt(this.$route.query.page);
    if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
      this.currentPage = pageFromUrl;
    } else {
      this.currentPage = 1;
    }
    this.retrieveBooks();
  },
};
</script>

<template>
  <div class="container" style="height:auto;">
    <div class="head-inner-title">
      <div class="head-title">
        <h2 class="title">Sách</h2>
      </div>
      <div class="progress" style="height: 4px">
        <div class="progress-bar" style="width: 30%"></div>
      </div>
    </div>
    <BookList :books="books" />
    <div class="d-flex justify-content-center mt-3">
      <Pagination v-model="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

<style></style>
