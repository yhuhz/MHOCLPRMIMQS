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
  EditMedicineReleaseMass,
} from "src/composables/Medicine";

import {
  GetPrescription,
  Prescription,
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
import { SelectedDate } from "src/composables/Reports";

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
    let departments = [
      "Outpatient Department",
      "Dental",
      "Prenatal and Immunization",
      "Pharmacy",
      "Front Desk",
      "Admin Office",
    ];
    let selectedPendingDate = ref("Today");
    let pendingArray = ref([]);

    let selectedPrescription = ref([]);
    let selectedIndex = ref(null);

    let selectedPerson = ref("All");
    let personOption = ["All", "Patients", "Personnel"];

    const selectPendingRecord = (index) => {
      selectedPrescription.value = pendingArray.value[index];
      selectedIndex.value = index;
    };

    Loading.show();
    GetPrescription({ date: selectedPendingDate.value, mode: "pending" }).then(
      (response) => {
        Loading.hide();

        if (response.data.length > 0) {
          pendingArray.value = response.data;
          selectedPrescription.value = pendingArray.value[0];
          selectedIndex.value = 0;
        }
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
          if (response.data.length > 0) {
            pendingArray.value = response.data;
            selectedPrescription.value = pendingArray.value[0];
            selectedIndex.value = 0;
          } else {
            pendingArray.value = response.data;
          }
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
          if (response.data.length > 0) {
            pendingArray.value = response.data;
            selectedPrescription.value = pendingArray.value[0];
            selectedIndex.value = 0;
          }
        });
      }
    };

    // watch(
    //   () => _.cloneDeep(Prescription.value),
    //   () => {
    //     pendingArray.value = Prescription.value;
    //     selectedPrescription.value = pendingArray.value[0];
    //     selectedIndex.value = 0;
    //   }
    // );

    let isCustomDate = ref(false);
    let dateToday = date.formatDate(new Date(), "YYYY-MM-DD");
    let dateArray = ref(["2023-01-01", dateToday]);
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
            if (response.data.length > 0) {
              pendingArray.value = response.data;
              selectedPrescription.value = pendingArray.value[0];
              selectedIndex.value = 0;
            }
          });
        } else {
          Loading.show();
          GetPrescription({
            date: selectedPendingDate.value,
            mode: "done",
          }).then((response) => {
            Loading.hide();
            if (response.data.length > 0) {
              pendingArray.value = response.data;
              selectedPrescription.value = pendingArray.value[0];
              selectedIndex.value = 0;
            }
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
          if (response.data.length > 0) {
            pendingArray.value = response.data;
            selectedPrescription.value = pendingArray.value[0];
            selectedIndex.value = 0;
          }
        });
      } else {
        Loading.show();
        GetPrescription({ date: dateArray.value, mode: "done" }).then(
          (response) => {
            Loading.hide();
            isCustomDate.value = false;
            if (response.data.length > 0) {
              pendingArray.value = response.data;
              selectedPrescription.value = pendingArray.value[0];
              selectedIndex.value = 0;
            }
          }
        );
      }
    };

    const addMedicine = () => {
      btnCondition.value = false;
      selectedPrescription.value.medicines.push({
        medicine_details: { medicine_name: null, medicine_id: null },
        quantity: null,
        department: {
          department_id: selectedPrescription.value.department
            ? selectedPrescription.value.department
            : null,
          department_label: selectedPrescription.value.department
            ? departments[selectedPrescription.value.department - 1]
            : null,
        },
      });
    };

    const removeMedicine = (index) => {
      btnCondition.value = true;
      selectedPrescription.value.medicines.splice(index, 1);
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
          selectedPrescription.value.medicines[index].medicine_details
            .medicine_id !== null &&
          selectedPrescription.value.medicines[index].medicine_details
            .medicine_id !== "" &&
          selectedPrescription.value.medicines[index].quantity !== null &&
          selectedPrescription.value.medicines[index].quantity !== ""
        ) {
          btnCondition.value = true;
        }
      } catch (e) {
        btnCondition.value = false;
      }
    };

    const resetMedicine = () => {
      selectedPrescription.value.medicines = [];
    };

    const addMedicineReleases = () => {
      let payload = {
        patient_id: selectedPrescription.value.patient_id,
        department: selectedPrescription.value.department,
        released_by: keySession && keySession.user_id,
        medicine_array: selectedPrescription.value.medicines,
        release_date: selectedPrescription.value.checkup_date,
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
                // changeDate();
                if (selectedPendingDate.value !== "Custom Date") {
                  Loading.show();
                  GetPrescription({
                    date: selectedPendingDate.value,
                    mode: "pending",
                  }).then((response) => {
                    Loading.hide();
                    if (response.data.length > 0) {
                      pendingArray.value = response.data;
                      selectedPrescription.value = pendingArray.value[0];
                      selectedIndex.value = 0;
                    }
                  });
                } else {
                  // console.log(dateArray.value);
                  // return;
                  Loading.show();
                  GetPrescription({
                    date: dateArray.value,
                    mode: "pending",
                  }).then((response) => {
                    Loading.hide();
                    isCustomDate.value = false;
                    if (response.data.length > 0) {
                      pendingArray.value = response.data;
                      selectedPrescription.value = pendingArray.value[0];
                      selectedIndex.value = 0;
                    }
                  });
                }
              }
            }
          );
        }

        selectedPrescription.value.medicines = [];
      });
    };

    const editMedicineRelease = () => {
      let payload = {
        patient_id: selectedPrescription.value.patient_id,
        doctor_id: selectedPrescription.value.doctor_id,
        released_by: keySession && keySession.user_id,
        medicine_array: selectedPrescription.value.medicines,
        date:
          selectedPendingDate.value !== "Custom Date"
            ? selectedPendingDate.value
            : dateArray.value,
      };
      // console.log(payload);

      Loading.show();
      EditMedicineReleaseMass(payload).then((response) => {
        // console.log(response.data);

        Loading.hide();
        selectedPrescription.value.medicines = response.data;

        let status = response.status === "success" ? 0 : 1;
        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Medicine releases edited successfully"
              : "Failed to edit medicine releases",
        });
      });
    };

    const submit = () => {
      if (selectedView.value === "Pending") {
        addMedicineReleases();
      } else {
        editMedicineRelease();
      }
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
      addMedicine,
      removeMedicine,
      medicineList,
      medicineFilterFunction,
      resetMedicine,
      buttonCondition,
      btnCondition,
      submit,
      changeMode,
      selectedPerson,
      personOption,
      departments,
    };
  },
};
