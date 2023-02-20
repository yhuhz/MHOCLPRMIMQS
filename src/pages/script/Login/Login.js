import {useRouter} from "vue-router"
import { ref } from "vue"

export default {
  data() {

    const router = useRouter()

    let loginForm = ref({
      userID: null,
      password: null,
    })


    const loginFunction = () => {
      if(loginForm.value.userID === 'admin' && loginForm.value.password === 'admin123') {
        router.push('dashboard')
      }
    }

    let isShowPassword= ref('true')

    return {
      loginForm,
      isShowPassword,
      loginFunction
    }

  }
}
