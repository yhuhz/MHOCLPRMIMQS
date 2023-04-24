import { ref, watch } from "vue";
import MHCDialog from "../../../components/MHCDialog.vue";
import DeletePatientConfirmation from "../../Components/DeletePatientConfirmation";
import { ToggleDialogState } from "../../../composables/Triggers";
import { FindPatient, PatientDetails } from "src/composables/Patients";

import { GetRecords, PatientRecords } from "src/composables/Records";

import { FindRecordDetails } from "src/composables/Records";
import _ from "lodash";
import { useQuasar, SessionStorage, Loading } from "quasar";
import exportFile from "quasar/src/utils/export-file.js";
import { useRoute, useRouter } from "vue-router";

export default {
  components: { MHCDialog, DeletePatientConfirmation },
  setup() {
    const route = useRoute();
    const router = useRouter();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    Loading.show();

    FindPatient({ patient_id: route.params.id }).then((response) => {
      Loading.hide();
    });

    let name = ref(null);
    let status = ["Active", "Deceased", "Deleted"];
    let sex = ["Male", "Female"];
    let departmentList = ref([]);

    let selectedDepartment = ref(
      route.params.department != null ? route.params.department : null
    );
    watch(
      () => _.cloneDeep(PatientDetails.value),
      () => {
        name.value =
          PatientDetails.value.first_name +
          (PatientDetails.value.middle_name === null
            ? ""
            : " " + PatientDetails.value.middle_name) +
          " " +
          PatientDetails.value.last_name +
          (PatientDetails.value.suffix === null
            ? ""
            : " " + PatientDetails.value.suffix);

        if (keySession && keySession.department === 1) {
          departmentList.value = ["OPD"];
        } else if (keySession && keySession.department === 2) {
          departmentList.value = ["Dental"];
        } else if (keySession && keySession.department === 3) {
          if (PatientDetails.value.sex === 1) {
            departmentList.value = ["Prenatal", "Immunization"];
          } else {
            departmentList.value = ["Immunization"];
          }
        } else {
          if (PatientDetails.value.sex != 1) {
            departmentList.value = ["OPD", "Dental", "Immunization"];
          } else {
            departmentList.value = [
              "OPD",
              "Dental",
              "Prenatal",
              "Immunization",
            ];
          }
        }

        selectedDepartment.value =
          route.params.department != null
            ? route.params.department
            : departmentList.value[0];

        GetRecords({
          patient_id: route.params.id,
          record_type: selectedDepartment.value,
        });
      }
    );

    if (selectedDepartment.value != null) {
      GetRecords({
        patient_id: route.params.id,
        record_type: selectedDepartment.value,
      });
    }

    let columns = [
      {
        name: "record",
        align: "left",
        label: "Record",
        field: (row) =>
          selectedDepartment.value === "OPD"
            ? "OPD" + row.record_id
            : selectedDepartment.value === "Dental"
            ? "DNTL" + row.record_id
            : selectedDepartment.value === "Prenatal"
            ? "PNL" + row.record_id
            : "IMZN" + row.record_id,
        sortable: true,
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
        sortable: true,
      },
    ];

    let isbtnDisabled = ref(true);
    let departments = ["OPD", "Dental", "Prenatal", "Immunization"];

    if (selectedDepartment.value === "Immunization") {
      if (keySession.department === 3 || keySession.department === 5) {
        isbtnDisabled.value = false;
      } else {
        isbtnDisabled.value = true;
      }
    } else {
      if (
        keySession &&
        (keySession.department ===
          departments.indexOf(selectedDepartment.value) + 1 ||
          keySession.department === 5)
      ) {
        isbtnDisabled.value = false;
      } else {
        isbtnDisabled.value = true;
      }
    }

    const getRecords = () => {
      GetRecords({
        patient_id: route.params.id,
        record_type: selectedDepartment.value,
      });

      if (selectedDepartment.value === "Immunization") {
        if (keySession.department === 3 || keySession.department === 5) {
          isbtnDisabled.value = false;
        } else {
          isbtnDisabled.value = true;
        }
      } else {
        if (
          keySession &&
          (keySession.department ===
            departments.indexOf(selectedDepartment.value) + 1 ||
            keySession.department === 5)
        ) {
          isbtnDisabled.value = false;
        } else {
          isbtnDisabled.value = true;
        }
      }
    };

    const onRowClick = (evt, row) => {
      Loading.show();
      FindRecordDetails(row.record_id, selectedDepartment.value).then(
        (response) => {
          Loading.hide();
        }
      );

      router.push({
        name: selectedDepartment.value + "/patient_records",
        params: {
          record_id: row.record_id,
          department: selectedDepartment.value,
        },
      });
    };

    const openDialog = () => {
      ToggleDialogState();
    };

    return {
      openDialog,
      keySession,
      PatientDetails,
      name,
      status,
      sex,
      columns,
      departmentList,
      selectedDepartment,
      getRecords,
      PatientRecords,
      onRowClick,
      isbtnDisabled,
    };
  },
};
