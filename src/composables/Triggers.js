import { ref, readonly } from 'vue'
const Dialog = ref(false);
let DialogState = readonly(Dialog)

const ToggleDialogState = () => {
  Dialog.value = !Dialog.value
}

export { DialogState, ToggleDialogState }
