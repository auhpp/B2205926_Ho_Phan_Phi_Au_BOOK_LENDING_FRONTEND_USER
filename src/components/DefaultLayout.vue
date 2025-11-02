<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div class="default-layout g-0">
    <main class="container main-content">
      <AppHeader />
      <div class="mt-3 content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style>
.default-layout .main-content {
  padding-inline: 0;
  padding-top: 60px;
  height: 100vh;
  overflow-y: auto;
}

.default-layout {
  height: 100vh;
  width: 100%;
}
</style>
