import { ref } from 'vue'

export default {
  setup() {

    let toggleNewCheckup = ref(false)

    return {
      toggleNewCheckup
    }
  }
}
