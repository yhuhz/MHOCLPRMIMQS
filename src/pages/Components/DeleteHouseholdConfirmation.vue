<template>
  <div class="width-300">
    <q-icon name="eva-trash-2-outline" size="100px" color="negative" />
    <h6 class="text-negative no-margin">Are you sure?</h6>
    <p class="text-dark m-width-250">Do you really want to delete this household record?</p>
    <p class="text-negative m-width-250" style="font-size: 11px">
      You still need to change the household ID of each patient records under this household
    </p>
    <div class="flex justify-around q-mt-md">
      <q-btn @click="closeDialog" label="Cancel" no-caps color="grey-7" class="button-100" />
      <q-btn color="negative" label="Yes" no-caps class="button-100" @click="deleteRecord" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ToggleDialogState } from '../../composables/Triggers.js'
import { IDList } from 'src/composables/IDS'
import { DeleteHousehold } from '../../composables/Household'
import { useQuasar, Loading } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()

    const closeDialog = () => {
      ToggleDialogState()
    }

    const deleteRecord = () => {
      Loading.show()
      DeleteHousehold({ household_id: IDList.value.id }).then((response) => {
        Loading.hide()

        let status = response.status === 'success' ? 0 : 1

        $q.notify({
          type: status === 0 ? 'positive' : 'negative',
          classes: 'text-white',
          message:
            status === 0
              ? 'Household record deleted successfully'
              : 'Failed to delete household record',
        })

        ToggleDialogState()
      })
    }
    return {
      closeDialog,
      deleteRecord,
    }
  },
}
</script>
