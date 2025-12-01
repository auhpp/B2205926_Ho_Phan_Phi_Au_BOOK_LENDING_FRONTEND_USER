<script>
import logo from "@/assets/images/logo.png";
import routes from "@/config/routes";
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import ReaderService from "@/services/reader.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const signupFormSchema = yup.object().shape({
      userName: yup.string().required("Username không được để trống"),
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ thường")
        .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ hoa")
        .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất một số")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"
        ),
    });
    return {
      logo: logo,
      routes: routes,
      userName: "",
      password: "",
      signupFormSchema,
      errorSignup: "",
      isShowPassword: false,
    };
  },
  methods: {
    async signup() {
      try {
        console.log("signup");
        const readerRes = await ReaderService.create({
          userName: this.userName,
          password: this.password,
        });
        console.log("navigate");
        this.$router.replace({ name: "signin" });
      } catch (error) {
        this.errorSignup = "Tên đăng nhập đã tồn tại.";
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="container d-flex align-items-center">
    <div class="row w-100">
      <main class="form-signin col-4 offset-4 text-center">
        <Form @submit="signup" :validation-schema="signupFormSchema">
          <div class="d-flex justify-content-center">
            <div class="logo w-100">
              <img class="" :src="logo" alt="" />
            </div>
          </div>
          <h1 class="h3 mb-3 fw-normal">Đăng ký</h1>
          <div v-if="errorSignup" class="alert alert-danger" role="alert">
            <span> {{ errorSignup }}</span>
          </div>
          <div class="form-floating text-start">
            <Field
              type="text"
              class="form-control"
              id="userName"
              name="userName"
              placeholder="userName"
              v-model="userName"
            />
            <label for="userName">Username</label>
            <ErrorMessage name="userName" class="text-danger" />
          </div>
          <div class="form-floating mt-2 text-start">
            <Field
              :type="isShowPassword ? 'text' : 'password'"
              class="form-control"
              id="password"
              placeholder="Password"
              name="password"
              v-model="password"
            />
            <label for="password">Password</label>
            <ErrorMessage name="password" class="text-danger" />
          </div>
          <div class="form-check pt-2 pb-1">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="isShowPassword"
              id="flexCheckDefault"
            />
            <label
              class="form-check-label d-flex justify-content-start"
              for="flexCheckDefault"
            >
              Hiển thị mật khẩu
            </label>
          </div>
          <div class="login-text pt-2 pb-1">
            <span class="text-secondary me-1">Đã có tài khoản? </span>
            <router-link :to="routes.signin" class="login-nav text-primary"
              >Đăng nhập</router-link
            >
          </div>

          <button class="w-100 btn btn-lg btn-primary mt-2">Đăng ký</button>
        </Form>
      </main>
    </div>
  </div>
</template>

<style>
.container {
  height: 100vh;
}
</style>
