import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { SessionStorage } from 'quasar'

export default {
  data() {
    const router = useRouter()

    //Session Storage
    let keySession = SessionStorage.getItem('cred')
    if (keySession) {
      router.push({ name: 'home' })
    }

    let loginDetails = ref({
      username: 'Guest Offline',
      password: 'offlineV3rs!on',
      deptValue: null,
    })

    const loginFunction = () => {
      const userDetailsSpecial = {
        username: 'Guest',
        last_name: 'Guest',
        first_name: '',
        birthdate: '1989-06-04',
        sex: 0,
        department: Number(loginDetails.value.deptValue),
        job_title: 'Guest',
        permission_level: Number(loginDetails.value.deptValue) == 6 ? 1 : 2,
        status: 0,
      }

      SessionStorage.set('cred', userDetailsSpecial)
      router.push({
        name: 'home',
      })
    }

    let isShowPassword = ref(true)

    return {
      loginDetails,
      isShowPassword,
      loginFunction,
    }
  },
}
