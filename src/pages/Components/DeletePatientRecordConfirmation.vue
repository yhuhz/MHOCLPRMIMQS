<template>
  <div class="width-300">
    <q-icon name="eva-trash-2-outline" size="100px" color="negative" />
    <h6 class="text-negative no-margin">Are you sure?</h6>
    <p class="text-dark m-width-250">
      Do you really want to delete this record?
    </p>
    <div class="flex justify-around q-mt-md">
      <q-btn
        @click="closeDialog"
        label="Cancel"
        no-caps
        color="grey-7"
        class="button-100"
      />
      <q-btn
        color="negative"
        label="Yes"
        no-caps
        class="button-100"
        @click="deleteRecord"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { ToggleDialogState } from "../../composables/Triggers";
import {
  DeleteRecord,
  RecordDetails,
  PatientRecords,
} from "src/composables/Records";
import { IDList } from "../../composables/IDS";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const closeDialog = () => {
      ToggleDialogState();
    };

    const deleteRecord = () => {
      // console.log(IDList.value.department);
      DeleteRecord(
        {
          record_id: IDList.value.id,
        },
        IDList.value.department
      ).then((response) => {
        ToggleDialogState();

        if (response.status === "success") {
          router.push({ name: "patient-details", id: route.params.id });
        }
      });
    };
    return {
      closeDialog,
      deleteRecord,
    };
  },
};
</script>
