<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    search() {
      this.$router.push({ name: "search", query: { query: this.query } });
    },
  },
};
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Tên sách ..."
      aria-label="Recipient’s username"
      aria-describedby="button-addon2"
      name="query"
      v-model="query"
    />
    <button
      @click="search"
      class="btn btn-outline-secondary"
      type="button"
      id="button-addon2"
    >
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
</template>
