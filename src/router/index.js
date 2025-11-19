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
import LoanSlipList from "@/views/LoanSlipList.vue";
import LoanSlipDetail from "@/views/LoanSlipDetail.vue";
import PenaltyTicketList from "@/views/PenaltyTicketList.vue";
import SearchBook from "@/views/SearchBook.vue";

const ifLoggedInRedirectToHome = (to, from, next) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        next({ name: 'home' });
    } else {
        next();
    }
};

const ifNotLoggedInRedirectToSignin = (to, from, next) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        next({ name: 'signin' });
    } else {
        next();
    }
};

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        beforeEnter: ifNotLoggedInRedirectToSignin,
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
            },
            {
                path: routePaths.loanSlip,
                name: "loanSlip",
                component: LoanSlipList,
            },
            {
                path: routePaths.loanSlip + "/:id",
                name: "loanSlip.detail",
                component: LoanSlipDetail,
                props: true
            },
            {
                path: routePaths.penaltyTicket,
                name: "penaltyTicket",
                component: PenaltyTicketList,
            },
            {
                path: routePaths.search,
                name: "search",
                component: SearchBook,
            },
        ]
    },
    {
        path: routePaths.signin,
        name: "signin",
        component: SignIn,
        beforeEnter: ifLoggedInRedirectToHome
    },
    {
        path: routePaths.signup,
        name: "signup",
        component: SignUp,
        beforeEnter: ifLoggedInRedirectToHome
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;