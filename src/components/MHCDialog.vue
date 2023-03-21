<template>
  <div>
    <q-dialog v-model="DialogState">
      <q-card flat class="text-center q-pa-md dialog-card">
        <div>
          <component :is="component" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, toRef } from 'vue'
import { DialogState } from '../composables/Triggers'

  export default {
    props: {
      params: Object,
      content: Object
    },
    setup(props) {
      let parameter = toRef(props, 'params')
      let component = toRef(props, 'content')


      return {
        parameter,
        component,
        DialogState
      }
    }

  }
</script>
