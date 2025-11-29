<script>
import CartList from "@/components/CartList.vue";
import Pagination from "@/components/Pagination.vue";
import cartService from "@/services/cart.service";
import { mapActions } from "pinia";
import { useCartStore } from "@/stores/cartStore";
export default {
  components: {
    Pagination,
    CartList,
  },
  data() {
    return {
      carts: [],
      currentPage: 1,
      totalPages: 1,
      limit: 10,
      selectedIds: [],
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
    async retrieveCarts() {
      try {
        const data = await cartService.findAll({
          page: this.currentPage,
          limit: this.limit,
        });
        this.carts = data.result.data;
        this.totalPages = data.result.totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    handleChangePage(pageNum) {
      this.currentPage = pageNum;
    },

    ...mapActions(useCartStore, ["fetchCartCount"]),
    async deleteCartItem(cart) {
      const data = await cartService.deleteById(cart._id);
      if (data) {
        await this.fetchCartCount();
        alert("Xóa sách trong giỏ hàng thành công");
        this.retrieveCarts();
      }
    },
    async updateCart(cart) {
      const data = await cartService.create(cart);
      if (data) {
        this.retrieveCarts();
      }
    },
    hanldeSelectBook(ids) {
      this.selectedIds = ids;
      console.log("Selected IDs:", ids);
    },
    handleNavigateToCheckout() {
      const bookJson = JSON.stringify(this.finalSelectedBooks);

      sessionStorage.setItem("selectedBookForCheckout", bookJson);
      this.$router.push({ name: "checkout" });
    },
  },
  computed: {
    finalSelectedBooks() {
      if (!this.carts.length || !this.selectedIds.length) return [];

      return this.carts.filter((cartItem) =>
        this.selectedIds.includes(cartItem._id)
      );
    },

    totalQuantity() {
      return this.finalSelectedBooks.reduce(
        (prev, curr) => prev + curr.quantity,
        0
      );
    },
  },
  created() {
    this.retrieveCarts();
  },
};
</script>

<template>
  <div class="inner-content container">
    <!-- {/* head */} -->
    <div class="head">
      <div class="title">
        <span> Giỏ sách </span>
        <span>
          <!-- ({cart.cartSize} sản phẩm) -->
        </span>
      </div>
    </div>
    <!-- {/* main content */} -->
    <div class="content row">
      <!-- {/* content left */} -->
      <div class="content-left col-9">
        <!-- {/* header */} -->
        <div class="header row">
          <div class="form-check col-4">
            <span> Sản phẩm </span>
          </div>
          <div class="product-type col-4"></div>
          <div class="product-type col-3">
            <span>Số lượng</span>
          </div>
          <div class="product-type col-1"></div>
        </div>

        <div v-if="carts.length != 0" class="cart-list row">
          <CartList
            :carts="carts"
            @delete:cart="deleteCartItem"
            @update:cart="updateCart"
            @update:select-book="hanldeSelectBook"
          />
          <div class="d-flex justify-content-center mt-3 mb-3">
            <Pagination v-model="currentPage" :total-pages="totalPages" />
          </div>
        </div>
      </div>
      <!-- {/* end content left */} -->
      <!-- {/* content right */} -->
      <div class="col-3">
        <div class="content-right">
          <!-- <div class="money">
            <span>Thành tiền</span>
            <span> đ</span>
          </div> -->
          <div class="amount">
            <span>Tổng số sách</span>
            <span class="price">
              {{ totalQuantity }}
              cuốn</span
            >
          </div>
          <button
            :disabled="finalSelectedBooks.length == 0"
            @click="handleNavigateToCheckout"
            class="btn btn-danger btn-payment"
          >
            Mượn
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.inner-content .head .title span:first-child {
  font-size: 20px;
  text-transform: uppercase;
  margin-right: 4px;
}

.inner-content .head .title {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.inner-content {
  padding: 20px 0;
  height: auto;
}

/* content left */
.content-left .header {
  background-color: white;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--black-title);
  margin-bottom: 14px;
}

/* Content right */
.content-right {
  background-color: white;
  padding: 12px;
  border-radius: 8px;
}

.content-right .money {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--grey-text);
  padding: 4px;
  border-bottom: 1px solid var(--grey-border);
}

.content-right .amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding: 10px 0;
}

.content-right .amount .price {
  color: var(--red-price);
}

.btn-payment {
  width: 100%;
}

.img-product,
.product-title {
  cursor: pointer;
}

.cart-list {
  background-color: white;
  border-radius: 8px;
}
</style>
