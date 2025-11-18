<script>
import BookCard from "./BookCard.vue";

export default {
  components: {
    BookCard,
  },
  props: { books: { type: Array, default: [] } },
};
</script>
<template>
  <div class="row mt-2">
    <div v-for="book in books" :key="book._id" class="col-2 mb-2">
      <BookCard :book="book" />
    </div>
  </div>
</template>
