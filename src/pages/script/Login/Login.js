import { useRouter } from "vue-router";
import { ref } from "vue";
import { LoginCredential, Login } from "src/composables/Login";

export default {
  data() {
    const router = useRouter();

    let loginDetails = ref({
      username: "",
      password: "",
    });

    const loginFunction = () => {
      Login(loginDetails.value).then((response) => {
        if (response.status === "success") {
          if (LoginCredential.value[0].status === 0) {
            router.push({
              name: "dashboard",
              params: {
                id: LoginCredential.value[0].user_id,
              },
            });
          } else if (LoginCredential.value[0].status === 1) {
            console.log("User account has been suspended");
          } else if (LoginCredential.value[0].status === 2) {
            console.log("User account has been deleted");
          }
        }
      });
    };

    let isShowPassword = ref(true);

    return {
      loginDetails,
      isShowPassword,
      loginFunction,
    };
  },
};
