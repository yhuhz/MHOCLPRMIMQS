<template>
  <div class="width-450">
    <q-icon name="check_circle" size="100px" color="primary" />
    <h6 class="text-primary no-margin">Patient Record Added Successfully!</h6>
    <p class="text-dark m-width-250">
      <span class="text-bold" style="font-size: large"
        >Patient ID:
        <span class="text-primary text-bold" style="font-size: large">{{
          patient_info.patient_id
        }}</span></span
      ><br /><br />
      Would you like to add more records or go to patient details?
    </p>
    <div class="col">
      <div class="row">
        <q-btn
          @click="closeDialog"
          label="Add More Records"
          no-caps
          color="grey-7"
          style="width: 100%"
        />
      </div>

      <div class="row q-mt-sm">
        <q-input
          outlined
          v-model="queueNumber"
          dense
          class="col-2 q-mr-sm"
          label="Number"
          hide-bottom-space
          :rules="[(val) => (!isNaN(val) && val > 0) || '']"
        />
        <q-select
          flat
          outlined
          v-model="departmentQueue"
          :options="departmentArrayQueue"
          dense
          class="col-4 q-mr-sm"
          @update:model-value="departmentChange"
        />
        <q-btn
          :color="
            patient_info.senior_citizen_id || patient_info.pwd_id
              ? 'amber-9'
              : 'primary'
          "
          :label="
            patient_info.senior_citizen_id || patient_info.pwd_id
              ? 'Add to Priority Queue'
              : 'Add to Queue'
          "
          class="col"
          no-caps
          @click="addToQueue"
        />
      </div>
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
import {
  GetLastQueueNumber,
  LastQueueNumber,
  AddToQueue,
} from "src/composables/Queue";
import { Loading } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    const closeDialog = () => {
      ToggleDialogState();
    };

    // let patient_info = {
    //   patient_id: "05132301",
    //   senior_citizen_id: "N/A",
    //   pwd_id: "N/A",
    //   sex: 0,
    // };

    let patient_info = IDList.value.id;

    let queueNumber = ref(null);
    let departmentArrayQueue = ref([]);
    let departmentQueue = ref("Front Desk");

    if (patient_info.sex === 0) {
      departmentArrayQueue.value = ["Front Desk", "Dental", "Immunization"];
    } else {
      departmentArrayQueue.value = [
        "Front Desk",
        "Dental",
        "Prenatal",
        "Immunization",
      ];
    }

    GetLastQueueNumber({
      department:
        patient_info.pwd_id || patient_info.senior_citizen_id
          ? null
          : departmentQueue.value,
      priority: patient_info.pwd_id || patient_info.senior_citizen_id ? 1 : 0,
    }).then((response) => {
      queueNumber.value = LastQueueNumber.value;
    });

    const departmentChange = () => {
      if (departmentQueue.value === "Front Desk") {
        departmentQueue.value = 5;
      } else if (departmentQueue.value === "Dental") {
        departmentQueue.value = 2;
      } else if (departmentQueue.value === "Prenatal") {
        departmentQueue.value = 3;
      } else if (departmentQueue.value === "Immunization") {
        departmentQueue.value = 7;
      }

      let dept = [
        "",
        "OPD",
        "Dental",
        "Prenatal",
        "",
        "Front Desk",
        "",
        "Immunization",
      ];

      GetLastQueueNumber({
        department:
          patient_info.pwd_id || patient_info.senior_citizen_id
            ? null
            : departmentQueue.value,
        priority: patient_info.pwd_id || patient_info.senior_citizen_id ? 1 : 0,
      }).then((response) => {
        queueNumber.value = LastQueueNumber.value;
        departmentQueue.value = dept[departmentQueue.value];
      });
    };

    const addToQueue = () => {
      if (departmentQueue.value === "Front Desk") {
        departmentQueue.value = 5;
      } else if (departmentQueue.value === "Dental") {
        departmentQueue.value = 2;
      } else if (departmentQueue.value === "Prenatal") {
        departmentQueue.value = 3;
      } else if (departmentQueue.value === "Immunization") {
        departmentQueue.value = 7;
      }

      Loading.show();
      AddToQueue({
        patient_id: patient_info.patient_id,
        department: departmentQueue.value,
        queue_number: queueNumber.value,
        is_priority:
          patient_info.pwd_id || patient_info.senior_citizen_id ? 1 : 0,
      }).then((response) => {
        Loading.hide();

        let status = response.status === "success" ? 0 : 1;
        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Patient added to queue successfully"
              : "Failed to add patient to queue",
        });

        (departmentQueue.value = "Front Desk"), (queueNumber.value = null);
        closeDialog();
      });
    };

    return {
      patient_info,
      closeDialog,
      queueNumber,
      departmentArrayQueue,
      departmentQueue,
      departmentChange,
      addToQueue,
    };
  },
};
</script>
