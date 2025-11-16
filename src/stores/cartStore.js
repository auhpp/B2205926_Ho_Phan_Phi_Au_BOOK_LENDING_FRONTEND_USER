import cartService from '@/services/cart.service';
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        itemCount: 0,
    }),

    getters: {
        totalItems: (state) => state.itemCount,
    },

    actions: {
        async addToCart({ bookId, quantity }) {
            try {
                const data = await cartService.create({
                    bookId: bookId,
                    quantity: quantity,
                });
                if (data.result) {
                    await this.fetchCartCount();
                    alert("Đã thêm sản phẩm vào giỏ sách");
                }
            } catch (error) {
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
            }
        },
      
        async fetchCartCount() {
            try {
                const data = await cartService.countCart();
                this.itemCount = data.result;
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                this.itemCount = 0;
            }
        }
    }
});