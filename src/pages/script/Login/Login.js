import { useRouter } from "vue-router";
import { ref } from "vue";
import { LoginCredential, Login } from "src/composables/UserAccount";
import { useQuasar, SessionStorage } from "quasar";

export default {
  data() {
    const router = useRouter();
    const $q = useQuasar();

    //Session Storage
    let keySession = SessionStorage.getItem("cred");
    if (keySession) {
      router.push({ name: "home" });
    }

    let loginDetails = ref({
      username: null,
      password: null,
    });

    const loginFunction = () => {
      Login(loginDetails.value).then((response) => {
        if (response.status === "success") {
          if (LoginCredential.value[0].status === 0) {
            SessionStorage.set("cred", response.data[0]);
            router.push({
              name: "home",
            });
          } else if (LoginCredential.value[0].status === 1) {
            $q.notify({
              type: "warning",
              classes: "text-white",
              message: "This account has been suspended",
            });
          } else if (LoginCredential.value[0].status === 2) {
            $q.notify({
              type: "negative",
              message: "This account has been deleted",
            });
          }
        } else {
          $q.notify({
            type: "negative",
            message: "Incorrect username or password",
          });
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
