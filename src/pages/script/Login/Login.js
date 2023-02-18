import { ref } from "vue"

export default {
  data() {

    let loginForm = ref({
      userID: null,
      password: null,
    })

    let isShowPassword= ref('true')

    return {
      loginForm,
      isShowPassword
    }

  }
}
