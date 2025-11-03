<script>
export default {
  props: {
    book: { type: Object, required: true },
  },
};
</script>

<template>
  <div
    class="card"
    @click="
      this.$router.push({ name: 'book.detail', params: { id: book._id } })
    "
  >
    <div class="card-img">
      <img :src="book.images[0]" class="card-img-top" />
    </div>
    <div class="card-body title">
      <h3 class="card-text">
        {{ book.name }}
      </h3>
    </div>
  </div>
</template>

<style>
.card-img {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.card-img-top {
  max-width: 100%;
  max-height: 190px;
  object-fit: contain;
}

.card .title h3 {
  color: var(--black-title);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
}

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
  z-index: 1;
}

.card {
  position: relative;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
</style>
