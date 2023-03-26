import {useRouter} from "vue-router"
import { ref } from "vue"

export default {
  data() {

    const router = useRouter()

    let loginForm = ref({
      userID: '',
      password: '',
    })

    const usersList = [
      {
        userID: 'Admin',
        password: 'admin123'
      },
      {
        userID: 'Staff',
        password: 'staff123'
      }
    ]

    const loginFunction = () => {
      const user = usersList.find((u) => u.userID.toLocaleLowerCase() === loginForm.value.userID.toLowerCase() && u.password.toLocaleLowerCase() === loginForm.value.password.toLowerCase())
      if(user) {
        router.push('dashboard')
      }
    }

    let isShowPassword= ref(true)

    return {
      loginForm,
      isShowPassword,
      loginFunction
    }

  }
}
