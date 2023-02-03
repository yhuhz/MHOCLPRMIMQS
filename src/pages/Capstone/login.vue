<template>
  <div class="login">
    <label>User Login</label>
    <q-input v-model="loginForm.username" label="Username" />
    <q-input
      v-model="loginForm.password"
      filled
      :type="isPwd ? 'password' : 'text'"
      hint="Password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-btn class="q-my-md" color="black" label="Login" @click="login()" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar, date } from "quasar";
import { LoginUser } from "src/composables/Login";

export default {
  /* eslint-disable */
  name: "Login",
  setup() {
    let isPwd = ref(true);
    let loginForm = ref({
      username: ref(),
      password: ref(),
    });
    const login = () => {
      // console.log(loginForm.value);
      LoginUser(loginForm.value).then((response) => {
        if (response.status === "success") {
          console.log("login success");
        } else {
          console.log("login error");
        }
      });
    };
    return {
      isPwd,
      loginForm,
      login,
    };
  },
};
</script>

<style lang="scss" scoped></style>
