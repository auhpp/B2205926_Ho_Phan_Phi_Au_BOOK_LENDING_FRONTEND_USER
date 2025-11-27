<script>
import authService from "@/services/auth.service";
import configurationService from "@/services/configuration.service";
import loanSlipService from "@/services/loanSlip.service";
import { mapActions } from "pinia";
import { useCartStore } from "@/stores/cartStore";
import LoadingOverlay from "@/components/loadingOverlay.vue";

export default {
  components: {
    LoadingOverlay,
  },
  data() {
    return {
      user: null,
      booksToCheckout: [],
      config: null,
      returnBookDate: null,
      isLoading: false,
    };
  },
  methods: {
    async getUser() {
      const data = await authService.getCurrentUser();
      this.user = data.result;
      if (!data.result.email || !data.result.phoneNumber) {
        alert("Hãy cập nhật Email và SĐT để có thể tạo đơn mượn sách");
        this.$router.replace({ name: "profile" });
      }
    },
    async getConfiguration() {
      const data = await configurationService.findByName("DEFAULT_BORROW_DAYS");
      this.config = data.result;
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + data.result.value);
      this.returnBookDate = futureDate;
    },

    ...mapActions(useCartStore, ["fetchCartCount"]),
    async createLoanSlip() {
      try {
        this.isLoading = true;
        const data = await loanSlipService.create({
          books: this.booksToCheckout.map((item) => {
            return { _id: item.bookDetails._id, quantity: item.quantity };
          }),
          borrowedDate: new Date(),
          returnDate: new Date(this.returnBookDate),
          readerId: this.user._id,
          status: "pending",
        });
        if (data.result) {
          await this.fetchCartCount();
          alert("Tạo phiếu mượn thành công");
          this.$router.push({ name: "home" });
        }
      } catch (error) {
        console.error("err loan slip", error);
        alert(
          "Tạo phiếu mượn thất bại có thể do: bạn có sách chưa trả, phiếu phạt chưa thanh toán hoặc số lượng sách đã hết!"
        );
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.getUser();
    this.getConfiguration();
    const booksJson = sessionStorage.getItem("selectedBookForCheckout");
    if (booksJson) {
      this.booksToCheckout = JSON.parse(booksJson);
      sessionStorage.removeItem("selectedBookForCheckout");
    } else {
      alert("Bạn chưa chọn sách");
      this.$router.push("cart");
    }
  },
};
</script>

<template>
  <div class="container" style="height: auto">
    <LoadingOverlay :visible="isLoading" />
    <!-- THông tin người mượn -->
    <section class="ship-address" v-if="user">
      <h3 class="title">
        <PlaceIcon />
        <span class="ms-1"> Thông tin người mượn </span>
      </h3>
      <hr />
      <div>
        <div class="info-item row">
          <div class="col-1 fw-bold">Họ tên:</div>
          <div class="col">{{ user.fullName }}</div>
        </div>
        <div class="info-item row">
          <div class="col-1 fw-bold">Email:</div>
          <div class="col">{{ user.email }}</div>
        </div>
        <div class="info-item row">
          <div class="col-1 fw-bold">SĐT:</div>
          <div class="col">{{ user.phoneNumber }}</div>
        </div>
      </div>
    </section>
    <!-- Thông tin ngày mượn ngày trả -->
    <section class="other-info">
      <h3 class="title">Thông tin ngày mượn và ngày trả</h3>
      <hr />
      <div class="row g-3 align-items-center">
        <div class="col-sm-4 col-lg-1">
          <label for="inputNote" class="col-form-label fw-bold"
            >Ngày mượn:</label
          >
        </div>
        <div class="col-sm-8 col-lg-10">
          {{ new Date().toLocaleDateString("vi-VN") }}
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-sm-4 col-lg-1">
          <label for="inputNote" class="col-form-label fw-bold"
            >Ngày trả:</label
          >
        </div>
        <div class="col-sm-8 col-lg-10">
          {{ returnBookDate ? returnBookDate.toLocaleDateString("vi-VN") : "" }}
        </div>
      </div>
    </section>
    <!-- Kiểm tra lại số lượng sách mượn -->
    <section class="re-check-order">
      <h3 class="title">Kiểm tra lại thông tin sách mượn</h3>
      <hr />
      <div class="header row">
        <div class="col-10 text-start">Sách</div>
        <div class="col text-center">Số lượng</div>
      </div>

      <div
        v-for="(book, index) in booksToCheckout"
        :key="book._id"
        :class="
          index != 0
            ? 'product row info-product mt-2 border-top'
            : 'product row info-product mt-2'
        "
      >
        <div class="col-2">
          <img :src="book.bookDetails.images[0]" alt="" class="img-product" />
        </div>
        <div class="col-xl-8 col-12">
          <p class="name-product">{{ book.bookDetails.name }}</p>
        </div>
        <div class="col">
          <div class="current-price d-inline-block d-xl-block text-center">
            <span>{{ book.quantity }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Xác nhận mượn -->
    <section class="info-pay">
      <h3 class="title">Đơn mượn</h3>
      <hr />
      <div class="content">
        <div class="sum-price row">
          <span class="col-6 text-end fw-bold mb-3"
            >Tổng lượng sách mượn:
          </span>
          <span class="col-6 all-price">{{
            booksToCheckout
              .map((e) => e.quantity)
              .reduce(
                (previousValue, currValue) => previousValue + currValue,
                0
              ) + " cuốn"
          }}</span>
        </div>
        <div class="text-center">
          <button
            @click="createLoanSlip"
            type="button"
            id=""
            class="btn btn-danger"
          >
            Xác nhận mượn
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/* Dia chi giao hang */
.pay .ship-address,
.pay-method,
.other-info,
.re-check-order,
.info-pay,
.ship-address {
  background-color: white;
  padding: 12px 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-top: 10px;
}

.ship-address .content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.ship-address .content .name-phone-number {
  font-weight: bold;
}

.ship-address .title,
.pay-method .title,
.other-info .title,
.re-check-order .title,
.info-pay .title {
  text-transform: uppercase;
  font-size: 16px;
  padding-top: 8px;
}

.pay {
  margin-top: 14px;
}

.ship-address .content label,
.pay-method label,
.other-info label {
  font-size: 14px;
}

.ship-address .content .input-item {
  padding: 8px 0;
}

.ship-address .content .input-item input {
  font-weight: bold;
}

.ship-address .content .input-item input,
.ship-address .content .input-item select,
.input-note {
  padding: 4px 16px;
  font-size: 14px;
}

.ship-address .content .input-item select {
  font-size: 14px;
}

.ship-address .content .input-item select option {
  font-size: 13px;
}

.ship-address .content .form-select:focus {
  border: 1px solid #ced4da;
}

/* Kiem tra lai don hang */
.re-check-order {
  margin-top: 14px;
}

.re-check-order .product .img-product {
  max-width: 120px;
}

.re-check-order .info-product {
  font-size: 14px;
  padding: 10px 0;
}

.re-check-order .info-product .original-price {
  text-decoration: line-through;
  font-size: 13px;
  color: var(--grey-text);
}

.re-check-order .info-product .price {
  color: var(--red-sale);
}
</style>
