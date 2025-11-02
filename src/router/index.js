import DefaultLayout from "@/components/DefaultLayout.vue";
import { createWebHistory, createRouter } from "vue-router";
import routePaths from "@/config/routes";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: routePaths.home,
                name: "home",
                component: DefaultLayout
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