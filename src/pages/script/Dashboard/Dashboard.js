import { ref } from 'vue'

export default {
  setup() {

    let selected = ref(null)
    let options = ref(['Today', 'This Week', 'This Month', 'This Year'])

    return {
      options,
      selected
    }
  }
}
