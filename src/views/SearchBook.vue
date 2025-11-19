<script>
import BookList from "@/components/BookList.vue";
import Pagination from "@/components/Pagination.vue";
import bookService from "@/services/book.service";

export default {
  components: {
    BookList,
    Pagination,
  },
  data() {
    return {
      books: [],
      totalPages: 1,
      limit: 12,
    };
  },
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    currentName() {
      return this.$route.query.query || "";
    },
  },
  watch: {
    "$route.query": {
      handler: "retrieveBooks",
      immediate: true,
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        const result = await bookService.findAll({
          page: this.currentPage,
          limit: this.limit,
          name: this.currentName,
        });
        this.books = result.result.data;
        this.totalPages = result.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    handleChangePage(pageNum) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pageNum,
        },
      });
    },
  },
};
</script>

<template>
  <div class="container" style="height: auto">
    <div class="head-inner-title">
      <div class="head-title">
        <h2 class="title">
          Kết quả tìm kiếm cho từ khóa:
          <span class="query-val">
            {{ currentName }}
          </span>
        </h2>
      </div>
      <div class="progress" style="height: 4px">
        <div class="progress-bar" style="width: 30%"></div>
      </div>
    </div>
    <BookList :books="books" />
    <div class="d-flex justify-content-center mt-3">
      <Pagination
        :model-value="currentPage"
        :total-pages="totalPages"
        @update:model-value="handleChangePage"
      />
    </div>
  </div>
</template>

<style>
.head-title .query-val {
  text-transform: none;
}
</style>
