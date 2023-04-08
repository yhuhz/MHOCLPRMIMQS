<template>
  <div class="width-450">
    <q-icon name="eva-trash-2-outline" size="100px" color="primary" />
    <h6 class="text-primary no-margin">Are you sure?</h6>
    <p class="text-dark m-width-250">
      Patient Added Successfully! Patient ID: {{ IDList.id }}
      Would you like to add more records or go to patient details?
    </p>
    <div class="flex justify-around q-mt-md">
      <q-btn
        @click="closeDialog"
        label="Add More Records"
        no-caps
        color="grey-7"
        class="button-200"
      />
      <q-btn
        color="primary"
        label="Go to Patient Details"
        no-caps
        class="button-200"
        @click="goToPatientDetails"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { ToggleDialogState } from "../../composables/Triggers";
import { IDList } from "../../composables/IDS";
import { DeletePatient } from "../../composables/Patients";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    const closeDialog = () => {
      ToggleDialogState();
    };

    let patient_id = IDList.value.id;

    const goToPatientDetails = () => {
      router.push({
        name: "patient-details",
        params: {
          id: IDList.value.id,
        },
      });
      ToggleDialogState();
    };
    return {
      closeDialog,
      patient_id,
      goToPatientDetails,
      IDList,
    };
  },
};
</script>
