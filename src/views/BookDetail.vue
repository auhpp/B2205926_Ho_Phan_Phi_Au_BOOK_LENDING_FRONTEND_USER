<script>
import bookService from "@/services/book.service";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import cartService from "@/services/cart.service";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      book: null,
      quantity: 1,
    };
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
  methods: {
    async findBookById() {
      try {
        const data = await bookService.findById(this.id);
        this.book = data.result;
      } catch (error) {
        alert("Lỗi lấy thông tin sách");
      }
    },
    handleMinus() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },
    handlePlus() {
      if (this.quantity + 1 <= this.book.bookCopyQuantity) this.quantity += 1;
    },
    async addToCart() {
      const data = await cartService.create({
        bookId: this.book._id,
        quantity: this.quantity,
      });
      if (data.result) {
        alert("Đã thêm sản phẩm vào giỏ sách");
        this.findBookById();
      }
    },
  },
  created() {
    this.findBookById();
  },
  watch: {
    quantity(newValue) {
      const numValue = parseInt(newValue);
      if (numValue < 1) {
        alert("Số lượng phải lớn hơn 0");
        this.quantity = 1;
      } else if (numValue > this.book.bookCopyQuantity) {
        alert(`Chỉ còn ${this.book.bookCopyQuantity}`);
        this.quantity = 1;
      }
    },
  },
};
</script>

<template>
  <div>
    <section>
      <div class="container" style="height: auto">
        <div class="row mt-5" v-if="book">
          <!-- book images -->
          <div class="col-lg-5">
            <div class="book-images">
              <Swiper :navigation="true" :modules="modules">
                <SwiperSlide v-for="bookImg in book.images" :key="bookImg">
                  <img class="img-book" :src="bookImg" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <!-- book info -->
          <div class="col">
            <div class="book-info">
              <h4 class="name-book mb-4">
                {{ book.name }}
              </h4>
              <div class="info-detail row">
                <div class="col-6 pt-3">
                  <span class="me-1 fw-bold">Nhà xuất bản:</span>
                  <span>{{ book.publisher.name }}</span>
                </div>
                <div class="col-6 pt-3">
                  <span class="me-1 fw-bold">Năm xuất bản:</span>
                  <span>2025</span>
                </div>
                <div class="col-12 pt-3">
                  <span class="me-1 fw-bold">Tác giả:</span>
                  <span
                    v-for="(author, index) in book.authors"
                    :key="author._id"
                    >{{ author.name }}
                    <span v-if="index != book.authors.length - 1">,</span>
                  </span>
                </div>
                <div class="col-12 pt-3 mb-4">
                  <span class="me-1 fw-bold">Thể loại:</span>
                  <span
                    v-for="(category, index) in book.categories"
                    :key="category._id"
                    >{{ category.name }}
                    <span
                      v-if="index != book.categories.length - 1"
                      class="me-1"
                      >,</span
                    >
                  </span>
                </div>
              </div>
              <div class="col ps-3">
                <div className="row align-items-center">
                  <div className="quantity-product col-2 p-0">
                    <i class="fa-solid fa-minus" @click="handleMinus"></i>
                    <input type="number" v-model="quantity" />
                    <i class="fa-solid fa-plus" @click="handlePlus"></i>
                  </div>
                  <span className="col stock"
                    >{{ this.book.bookCopyQuantity }} sách có sẵn
                  </span>
                </div>
              </div>
              <!-- button -->
              <div @click="addToCart" class="col mt-5">
                <button class="btn btn-danger">
                  <i class="fa-solid fa-cart-plus"></i>
                  Mượn sách
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.img-book {
  max-height: 450px;
  object-fit: contain;
}
.book-images,
.book-info {
  background-color: white;
  border-radius: 14px;
  padding: 14px 0;
}

.book-info {
  padding: 50px 30px;
}
/* quantity button */
.quantity-product {
  display: flex;
  max-width: 140px;
  height: 32px;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid var(--grey-light);
  background-color: var(--grey-bg);
}

.quantity-product i {
  cursor: pointer;
  padding: 6px 6px 6px 4px;
  font-size: 14px;
  text-align: center;
}

.stock {
  color: var(--grey-text);
}

.quantity-product input {
  margin: 0;
  width: 50%;
  font-size: 16px;
  text-align: center;
  background-color: #fff;
  border: none;
  outline: none;
  height: 100%;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
