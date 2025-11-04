import DefaultLayout from "@/components/DefaultLayout.vue";
import { createWebHistory, createRouter } from "vue-router";
import routePaths from "@/config/routes";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Home from "@/views/Home.vue";
import BookDetail from "@/views/BookDetail.vue";
import Profile from "@/views/Profile.vue";
import Cart from "@/views/Cart.vue";
import Checkout from "@/views/Checkout.vue";

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: routePaths.home,
                name: "home",
                component: Home
            },
            {
                path: routePaths.book + "/:id",
                name: "book.detail",
                component: BookDetail,
                props: true
            },
            {
                path: routePaths.profile,
                name: "profile",
                component: Profile,
            },
            {
                path: routePaths.cart,
                name: "cart",
                component: Cart,
            },
            {
                path: routePaths.checkout,
                name: "checkout",
                component: Checkout,
                props: true
            }
        ]
    },
    {
        path: routePaths.signin,
        name: "signin",
        component: SignIn
    },
    {
        path: routePaths.signup,
        name: "signup",
        component: SignUp
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;