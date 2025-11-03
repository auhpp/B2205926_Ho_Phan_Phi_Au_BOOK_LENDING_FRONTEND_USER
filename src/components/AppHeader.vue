<script>
import logo from "@/assets/images/logo.png";
import routes from "@/config/routes";
import authService from "@/services/auth.service";

export default {
  data() {
    return {
      logo: logo,
      routes: routes,
      user: null,
    };
  },
  methods: {
    async getUser() {
      const data = await authService.getCurrentUser();
      this.user = data.result;
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<template>
  <header class="mb-3 border-bottom fixed-top" style="height: 80px">
    <div class="container" style="height: 80px">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <router-link
          :to="routes.signin"
          class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
        >
          <img :src="logo" class="logo" alt="" />
        </router-link>

        <ul
          class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <li>
            <router-link
              :to="routes.home"
              class="nav-link px-2 text-black fw-bold"
              >Trang chủ</router-link
            >
          </li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input
            type="search"
            class="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
        <button
          @click="this.$router.push({ name: 'cart' })"
          type="button"
          class="btn btn-primary position-relative me-4"
        >
          <i class="fa-solid fa-cart-shopping"></i>
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            99+
            <span class="visually-hidden">unread messages</span>
          </span>
        </button>
        <div class="dropdown text-end" v-if="user">
          <a
            href="#"
            class="d-block link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              :src="user.avatar"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li>
              <router-link class="dropdown-item" :to="routes.profile"
                >Tài khoản của tôi</router-link
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <div class="dropdown-item">Đăng xuất</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1020;
  background-color: #fff;
}

.logo {
  width: 90px;
}

header {
  background-color: white;
}

.dropdown .dropdown-toggle::after {
  content: none;
}
</style>
