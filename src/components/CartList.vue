<script>
export default {
  props: { carts: { type: Array, default: [], required: true } },
  emits: ["delete:cart", "update:cart", "update:selectBook"],
  methods: {
    handlDeleteCart(cart) {
      this.$emit("delete:cart", cart);
    },
    handleMinus(cart) {
      if (cart.quantity > 1) {
        cart.quantity -= 1;
        this.$emit("update:cart", cart);
      }
    },
    handlePlus(cart) {
      if (cart.quantity + 1 <= cart.book.availableCopies) {
        cart.quantity += 1;
        this.$emit("update:cart", cart);
        console.log(cart.quantity);
      }
    },
    validateQuantity(cart) {
      const numValue = parseInt(cart.quantity);
      if (numValue < 1) {
        alert("Số lượng phải lớn hơn 0");
        cart.quantity = 1;
      } else if (numValue > cart.book.availableCopies) {
        alert(`Chỉ còn ${cart.book.availableCopies}`);
        cart.quantity = 1;
      } else {
        this.$emit("update:cart", cart);
      }
    },
  },
  watch: {
    selectedBookIds(newIds) {
      this.$emit("update:selectBook", newIds);
    },
  },
  data() {
    return {
      selectedBookIds: [],
    };
  },
};
</script>

<template>
  <div v-if="carts">
    <div v-for="cart in carts" :key="cart._id" class="cart-item row">
      <div class="form-check col-8">
        <!-- {/* Checkbox */} -->
        <input
          class="form-check-input"
          type="checkbox"
          :id="'check-' + cart._id"
          :value="cart._id"
          v-model="selectedBookIds"
        />
        <!-- {/* card-cart-item */} -->
        <div
          class="card-cart-item mb-3"
          @click="
            this.$router.push({
              name: 'book.detail',
              params: { id: cart.bookDetails._id },
            })
          "
        >
          <div class="row g-0">
            <!-- {/* image */} -->
            <div class="col-md-4">
              <img
                :src="cart.bookDetails.images[0]"
                class="img-fluid rounded-start img-product"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-cart-item-body">
                <!-- {/* name */} -->
                <h5 class="card-cart-item-title title product-title">
                  {{ cart.bookDetails.name }}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <!-- {/* end card-cart-item */} -->
      </div>
      <!-- {/* quantity */} -->
      <div class="col-3 ps-3">
        <div class="row align-items-center">
          <div class="quantity-product col-6 p-0">
            <i class="fa-solid fa-minus" @click="handleMinus(cart)"></i>
            <input
              type="number"
              v-model="cart.quantity"
              @change="validateQuantity(cart)"
            />
            <i class="fa-solid fa-plus" @click="handlePlus(cart)"></i>
          </div>
          <span class="col-12 mt-1 p-0 stock"
            >{{ cart.book.availableCopies }} sách có sẵn
          </span>
        </div>
      </div>
      <div @click="handlDeleteCart(cart)" class="delete-icon col-1 text-center">
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  </div>
</template>

<style>
/* card-cart-item */
.card-cart-item {
  background-color: white;
  border-radius: 8px;
  padding: 8px 10px;
}

.cart-item .card-cart-item {
  border: none;
}

.card-cart-item .price-product .current-price {
  color: var(--red-price);
  font-weight: bold;
}

.card-cart-item .price-product .discount-price .original-price {
  font-size: 14px;
  color: var(--grey-text);
  text-decoration: line-through;
}

.card-cart-item {
  border: none;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
}

.card-cart-item .title {
  color: var(--black-title);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 4px;
}

/* cart-item */
.cart-item {
  padding: 16px 10px;
  border-top: 1px solid var(--white-bg);
}

.cart-item:first-child {
  border-top: none;
}

.cart-item .img-product,
.product-title {
  cursor: pointer;
}

.cart-item .img-product {
  max-height: 100px;
  object-fit: contain;
}

.delete-icon i {
  font-size: 20px;
  cursor: pointer;
}
</style>
