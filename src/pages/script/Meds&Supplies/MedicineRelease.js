import { ref } from "vue";
import { useQuasar, Loading, date, SessionStorage } from "quasar";
import {
  GetMedicines,
  Medicines,
  MedicinesList,
  AddMedicine,
  EditMedicine,
  FindMedicinesForRelease,
  AddMultipleMedicineRelease,
} from "src/composables/Medicine";
import {
  FindUsersByName,
  FindUsersByID,
  FindUsersDepartment,
} from "src/composables/Manage_Users";
import { FindPatients } from "src/composables/Patients";
import DeleteMedicineConfirmation from "../../Components/DeleteMedicineConfirmation.vue";
import { ToggleDialogState } from "../../../composables/Triggers";
import MHCDialog from "../../../components/MHCDialog.vue";
import { SetIDS } from "src/composables/IDS";

export default {
  components: { MHCDialog, DeleteMedicineConfirmation },
  setup() {
    const $q = useQuasar();

    let keySession = SessionStorage.getItem("cred");
    if (keySession === null) {
      router.push({ name: "login" });
    }

    let pendingDateArray = ["Today", "This Week", "This Month", "Custom Date"];
    let selectedPendingDate = ref("Today");
    let pendingArray = ref([]);
    pendingArray.value = [
      {
        name: "Julius Grajo",
        patient_id: 1,
        doctor_id: null,
      },
    ];

    return {
      keySession,
      pendingDateArray,
      selectedPendingDate,
    };
  },
};
