<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div class="default-layout g-0 ">
    <AppHeader />
    <main class="main-content">
      <div class="mt-3 content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style>
.default-layout {
  background-color: var(--grey-bg);
  height: 100vh;
}
.default-layout .main-content {
  padding-inline: 0;
  padding-top: 70px;
}

.main-content {
  background-color: var(--grey-bg);
}

.default-layout {
  width: 100%;
}
</style>
