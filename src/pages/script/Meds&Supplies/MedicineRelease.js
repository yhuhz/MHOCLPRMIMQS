import { ref, watch } from "vue";
import _ from "lodash";
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
  GetPrescriptionPending,
  PrescriptionList,
} from "src/composables/Prescription";
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

    let viewOptions = ["Pending", "Done"];
    let selectedView = ref("Pending");

    let pendingDateArray = ["Today", "This Week", "This Month", "Custom Date"];
    let selectedPendingDate = ref("Today");
    let pendingArray = ref([]);

    let selectedPrescription = ref([]);
    let selectedIndex = ref(null);

    const selectPendingRecord = (index) => {
      selectedPrescription.value = pendingArray.value[index];
      selectedIndex.value = index;
    };

    Loading.show();
    GetPrescriptionPending({ date: selectedPendingDate.value }).then(
      (response) => {
        Loading.hide();
      }
    );

    watch(
      () => _.cloneDeep(PrescriptionList.value),
      () => {
        pendingArray.value = PrescriptionList.value;
        selectedPrescription.value = pendingArray.value[0];
        selectedIndex.value = 0;
      }
    );

    let isCustomDate = ref(false);
    let dateArray = ref([]);
    let dateToday = date.formatDate(new Date(), "YYYY/MM/DD");
    let firstDate = ref(null);

    const changeCustomDate = () => {
      firstDate.value = dateArray.value[0].replaceAll("-", "/");
    };

    const changeDate = () => {
      if (selectedPendingDate.value !== "Custom Date") {
        Loading.show();
        GetPrescriptionPending({ date: selectedPendingDate.value }).then(
          (response) => {
            Loading.hide();
          }
        );
      } else {
        isCustomDate.value = true;
      }
    };

    const closeCustomDate = () => {
      isCustomDate.value = false;
      selectedPendingDate.value = "Today";
      changeDate();
    };

    const getRecordsFromCustomDate = () => {
      Loading.show();
      GetPrescriptionPending({ date: dateArray.value }).then((response) => {
        Loading.hide();
        isCustomDate.value = false;
      });
    };

    return {
      keySession,
      pendingDateArray,
      selectedPendingDate,
      viewOptions,
      selectedView,
      pendingArray,
      selectedPrescription,
      selectPendingRecord,
      selectedIndex,
      changeDate,
      isCustomDate,
      closeCustomDate,
      dateArray,
      dateToday,
      changeCustomDate,
      firstDate,
      getRecordsFromCustomDate,
    };
  },
};
