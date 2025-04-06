<template>
  <div class="width-300">
    <q-icon name="playlist_remove" size="100px" color="negative" />
    <h6 class="text-negative no-margin">Are you sure?</h6>
    <p class="text-dark m-width-250">Do you want to remove this patient from queue?</p>
    <div class="flex justify-around q-mt-md">
      <q-btn @click="closeDialog" label="Cancel" no-caps color="grey-7" class="button-100" />
      <q-btn color="negative" label="Yes" no-caps class="button-100" @click="removeFromQueue" />
    </div>
  </div>
</template>

<script>
import { ToggleDialogState } from '../../composables/Triggers.js'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()

    const closeDialog = () => {
      ToggleDialogState()
    }

    const removeFromQueue = () => {
      $q.notify({
        type: status === 0 ? 'positive' : 'negative',
        classes: 'text-white',
        message:
          status === 0
            ? 'Patient removed from queue successfully'
            : 'Failed to remove patient from queue',
      })
    }
    return {
      closeDialog,
      removeFromQueue,
    }
  },
}
</script>
