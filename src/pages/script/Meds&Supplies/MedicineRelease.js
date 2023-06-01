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
  GetPrescription,
  PrescriptionList,
  SetPrescriptionAsDone,
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
import { useRoute, useRouter } from "vue-router";

export default {
  components: { MHCDialog, DeleteMedicineConfirmation },
  setup() {
    const router = useRouter();
    const route = useRoute();
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

    let medicineArray = ref([]);

    const selectPendingRecord = (index) => {
      selectedPrescription.value = pendingArray.value[index];
      selectedIndex.value = index;
      medicineArray.value = selectedPrescription.value.medicines
        ? selectedPrescription.value.medicines
        : [];
    };

    Loading.show();
    GetPrescription({ date: selectedPendingDate.value, mode: "pending" }).then(
      (response) => {
        Loading.hide();
      }
    );

    const changeMode = () => {
      if (selectedView.value === "Pending") {
        Loading.show();
        GetPrescription({
          date:
            selectedPendingDate.value !== "Custom Date"
              ? selectedPendingDate.value
              : dateArray.value,
          mode: "pending",
        }).then((response) => {
          Loading.hide();
        });
      } else {
        Loading.show();
        GetPrescription({
          date:
            selectedPendingDate.value !== "Custom Date"
              ? selectedPendingDate.value
              : dateArray.value,
          mode: "done",
        }).then((response) => {
          Loading.hide();
        });
      }
    };

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
        if (selectedView.value === "Pending") {
          Loading.show();
          GetPrescription({
            date: selectedPendingDate.value,
            mode: "pending",
          }).then((response) => {
            Loading.hide();
          });
        } else {
          Loading.show();
          GetPrescription({
            date: selectedPendingDate.value,
            mode: "done",
          }).then((response) => {
            Loading.hide();
          });
        }
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
      if (selectedView.value === "Pending") {
        Loading.show();
        GetPrescription({
          date: dateArray.value,
          mode: "pending",
        }).then((response) => {
          Loading.hide();
          isCustomDate.value = false;
        });
      } else {
        Loading.show();
        GetPrescription({ date: dateArray.value, mode: "done" }).then(
          (response) => {
            Loading.hide();
            isCustomDate.value = false;
          }
        );
      }
    };

    const addMedicine = () => {
      btnCondition.value = false;
      medicineArray.value.push({
        medicine_details: { medicine_name: null, medicine_id: null },
        quantity: null,
      });
    };

    const removeMedicine = (index) => {
      btnCondition.value = true;
      medicineArray.value.splice(index, 1);
    };

    let medicineList = ref([]);
    const medicineFilterFunction = (val, update, abort) => {
      if (val.length > 3) {
        update(() => {
          const needle = String(val.toLowerCase());
          FindMedicinesForRelease(needle).then((response) => {
            medicineList.value = [];
            if (response.status === "success") {
              let Medicines = ref([]);
              Medicines.value = response.data;
              Medicines.value.forEach((m) => {
                let selectValues = {
                  medicine_name:
                    m.generic_name +
                    " - " +
                    m.brand_name +
                    " (" +
                    m.exp_date +
                    ")" +
                    " (" +
                    (m.quantity - m.quantity_released) +
                    ")",
                  medicine_id: m.medicine_id,
                };
                medicineList.value.push(selectValues);
              });
            }
          });
        });
      } else {
        abort();
      }
    };

    let btnCondition = ref(true);
    const buttonCondition = (index) => {
      try {
        if (
          medicineArray.value[index].medicine_details.medicine_id !== null &&
          medicineArray.value[index].medicine_details.medicine_id !== "" &&
          medicineArray.value[index].quantity !== null &&
          medicineArray.value[index].quantity !== ""
        ) {
          btnCondition.value = true;
        }
      } catch (e) {
        btnCondition.value = false;
      }
    };

    const resetMedicine = () => {
      medicineArray.value = [];
    };

    const addMedicineReleases = () => {
      let payload = {
        patient_id: selectedPrescription.value.patient_id,
        department: selectedPrescription.value.department,
        released_by: keySession && keySession.user_id,
        medicine_array: medicineArray.value,
      };

      Loading.show();
      AddMultipleMedicineRelease(payload).then((response) => {
        if (response.status === "success") {
          SetPrescriptionAsDone(selectedPrescription.value.prescription).then(
            (response) => {
              Loading.hide();
              let status = response.status === "success" ? 0 : 1;
              $q.notify({
                type: status === 0 ? "positive" : "negative",
                classes: "text-white",
                message:
                  status === 0
                    ? "Medicine releases added successfully"
                    : "Failed to add medicine releases",
              });

              if (status === 0) {
                changeDate();
              }
            }
          );
        }

        medicineArray.value = [];
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
      medicineArray,
      addMedicine,
      removeMedicine,
      medicineList,
      medicineFilterFunction,
      resetMedicine,
      buttonCondition,
      btnCondition,
      addMedicineReleases,
      changeMode,
    };
  },
};
