import { ref, watch, onMounted } from "vue";
import _ from "lodash";
import MHCDialog from "../../../../components/MHCDialog.vue";
import DeletePatientRecordConfirmation from "../../../Components/DeletePatientRecordConfirmation";
import { ToggleDialogState } from "../../../../composables/Triggers";
import { SetIDS } from "src/composables/IDS";
import { useRoute, useRouter } from "vue-router";
import {
  FindRecordDetails,
  RecordDetails,
  UpdateRecord,
  AddPrenatalCheckup,
  UpdatePrenatalCheckupRecord,
  RecordArrays,
} from "src/composables/Records";
import { FindMedicines } from "src/composables/Medicine";
import { FindUsersByName } from "src/composables/Manage_Users";
import { Loading, SessionStorage, useQuasar, date } from "quasar";

export default {
  components: { MHCDialog, DeletePatientRecordConfirmation },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    Loading.show();

    let patientRecordInfo = ref({});
    let prenatal_checkup = ref([]);
    let selectedCheckup = ref(null);
    let checkupDateArray = ref([]);
    let prescription = ref([]);

    FindRecordDetails(route.params.record_id, route.params.department).then(
      (response) => {
        Loading.hide();
      }
    );
    let editForm = ref(false);
    let isEditCheckup = ref(false);
    let checkup_date = ref(null);
    let bmi = ref(null);

    watch(
      () => _.cloneDeep(RecordDetails.value),
      () => {
        editForm.value = false;
        isEditCheckup.value = false;
        selectedCheckup.value =
          RecordArrays.value.length !== 0
            ? RecordArrays.value[0].checkup_date
            : null;
        RecordArrays.value.length === 0
          ? (prenatal_checkup.value = [])
          : RecordArrays.value.forEach((r) => {
              if (r.checkup_date === selectedCheckup.value) {
                prenatal_checkup.value = r;
              }
            });

        patientRecordInfo.value = {
          prenatal_id: route.params.record_id,
          midwife_id: {
            user_id: RecordDetails.value.midwife_id,
            user_name: RecordDetails.value.midwife_name,
          },
          last_menstruation: RecordDetails.value.last_menstruation,
          date_added: RecordDetails.value.date_added,
          previous_full_term: RecordDetails.value.previous_full_term,
          previous_premature: RecordDetails.value.previous_premature,
          midwifes_notes: RecordDetails.value.midwifes_notes,
          expected_date_delivery: RecordDetails.value.expected_date_delivery,
          status: 0,
        };

        bmi.value =
          prenatal_checkup.value.weight !== null ||
          prenatal_checkup.value.height !== null
            ? (
                prenatal_checkup.value.weight /
                Math.pow(prenatal_checkup.value.height / 100, 2)
              ).toFixed(2)
            : "";

        checkup_date.value = patientRecordInfo.value.date_added.replaceAll(
          "-",
          "/"
        );
      }
    );

    let checkup_date_prenatal = ref();
    watch(
      () => _.cloneDeep(RecordArrays.value),
      () => {}
    );
    selectedCheckup.value =
      RecordArrays.value.length !== 0
        ? RecordArrays.value[0].checkup_date
        : null;

    RecordArrays.value.forEach((r) => {
      if (r.checkup_date === selectedCheckup.value) {
        prenatal_checkup.value = r;
        checkup_date_prenatal.value =
          prenatal_checkup.value.checkup_date.replaceAll("-", "/");
      }
    });

    const updateBMI = () => {
      bmi.value =
        prenatal_checkup.value.weight !== null ||
        prenatal_checkup.value.height !== null
          ? (
              prenatal_checkup.value.weight /
              Math.pow(prenatal_checkup.value.height / 100, 2)
            ).toFixed(2)
          : "";
    };

    const changeCheckupDate = () => {
      RecordArrays.value.forEach((r) => {
        if (r.checkup_date === selectedCheckup.value) {
          prenatal_checkup.value = r;
          checkup_date_prenatal.value =
            prenatal_checkup.value.checkup_date.replaceAll("-", "/");
        }
      });
    };

    let userOptions = ref([]);

    const userFilterFunction = (val, update, abort) => {
      if (val.length > -1) {
        update(() => {
          const needle = String(val.toLowerCase());
          FindUsersByName(needle).then((response) => {
            userOptions.value = [];
            if (response.status === "success") {
              let Users = ref([]);
              Users.value = response.data;
              Users.value.forEach((p) => {
                let selectValues = {
                  user_name: p.user_name,
                  user_id: p.id,
                };
                userOptions.value.push(selectValues);
              });
            }
          });
        });
      } else {
        abort();
      }
    };

    let cancelFunction = () => {
      Loading.show();

      if (isEditCheckup.value === true) {
        selectedCheckup.value =
          RecordArrays.value.length !== 0
            ? RecordArrays.value[0].checkup_date
            : null;

        RecordArrays.value.forEach((r) => {
          if (r.checkup_date === selectedCheckup.value) {
            prenatal_checkup.value = r;
          }
        });
      }
      editForm.value = false;
      isEditCheckup.value = false;
      FindRecordDetails(route.params.record_id, route.params.department).then(
        (response) => {
          Loading.hide();
        }
      );
    };

    const editPrenatalRecordFunction = () => {
      editForm.value = false;

      if (patientRecordInfo.value.midwife_id.user_id != null) {
        patientRecordInfo.value.midwife_id =
          patientRecordInfo.value.midwife_id.user_id;
      }

      let payload = {
        prenatal: patientRecordInfo.value,
      };

      // console.log(payload);
      // return;

      Loading.show();

      UpdateRecord(payload, route.params.department).then((response) => {
        Loading.hide();

        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Patient record edited successfully"
              : "Failed to edit patient record",
        });
      });
    };

    const editPrenatalCheckupFunction = () => {
      isEditCheckup.value = false;

      if (patientRecordInfo.value.midwife_id.user_id != null) {
        patientRecordInfo.value.midwife_id =
          patientRecordInfo.value.midwife_id.user_id;
      }

      let payload = {
        checkup: prenatal_checkup.value,
      };

      // console.log(payload);
      // return;

      Loading.show();

      UpdatePrenatalCheckupRecord(payload).then((response) => {
        Loading.hide();

        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Patient record edited successfully"
              : "Failed to edit patient record",
        });

        if (response.status === "success") {
          FindRecordDetails(
            route.params.record_id,
            route.params.department
          ).then((response) => {
            Loading.hide();
          });
        }
      });
    };

    const addCheckupRecord = () => {
      isEditCheckup.value = true;

      selectedCheckup.value = date.formatDate(Date.now(), "YYYY-MM-DD");
      prenatal_checkup.value = {
        prenatal_id: route.params.record_id,
        temperature: null,
        blood_pressure_systole: null,
        blood_pressure_diastole: null,
        height: null,
        weight: null,
        pulse_rate: null,
        oxygen_sat: null,
        next_checkup: null,
        checkup_date: selectedCheckup.value,
        comments: null,
        prescription: [],
      };

      checkup_date_prenatal.value =
        prenatal_checkup.value.checkup_date.replaceAll("-", "/");
    };

    const addPrenatalCheckupFunction = () => {
      Loading.show();
      AddPrenatalCheckup(prenatal_checkup.value).then((response) => {
        Loading.hide();
        isEditCheckup.value = false;

        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Prenatal checkup record added successfully"
              : "Failed to add prenatal checkup record",
        });
      });
    };

    const submitFunction = () => {
      // console.log(prenatal_checkup.value.prenatal_checkup_id);

      if (prenatal_checkup.value.prenatal_checkup_id) {
        editPrenatalCheckupFunction();
      } else {
        addPrenatalCheckupFunction();
      }
    };

    const openDialog = () => {
      SetIDS(route.params.record_id, route.params.department);
      ToggleDialogState();
    };

    /**PRESCRIPTIONS**/
    let isPrescription = ref(false);

    let medicineList = ref([]);
    const medicineFilterFunction = (val, update, abort) => {
      if (val.length > 3) {
        update(() => {
          const needle = String(val.toLowerCase());
          FindMedicines(needle).then((response) => {
            medicineList.value = [];
            if (response.status === "success") {
              let Medicines = ref([]);
              Medicines.value = response.data;
              Medicines.value.forEach((m) => {
                let selectValues = {
                  medicine_name: m.generic_name + " - " + m.brand_name,
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

    const addPrescription = () => {
      prenatal_checkup.value.prescription.push({
        medicine_name: "",
        quantity: "",
      });
    };

    const removePrescription = (index) => {
      prenatal_checkup.value.prescription.splice(index, 1);
    };

    const closePrescription = () => {
      isPrescription.value = false;

      if (
        prenatal_checkup.value.prescription.length !== 0 &&
        (prenatal_checkup.value.prescription[
          prenatal_checkup.value.prescription.length - 1
        ].medicine_name === "" ||
          prenatal_checkup.value.prescription[
            prenatal_checkup.value.prescription.length - 1
          ].quantity === "")
      ) {
        removePrescription(prenatal_checkup.value.prescription.length - 1);
      }
    };

    return {
      RecordDetails,
      patientRecordInfo,
      editForm,
      editPrenatalRecordFunction,
      cancelFunction,
      userOptions,
      userFilterFunction,
      openDialog,
      prenatal_checkup,
      keySession,
      selectedCheckup,
      checkupDateArray,
      RecordArrays,
      changeCheckupDate,
      isEditCheckup,
      editPrenatalCheckupFunction,
      addCheckupRecord,
      addPrenatalCheckupFunction,
      submitFunction,
      checkup_date,
      checkup_date_prenatal,
      isPrescription,
      medicineList,
      medicineFilterFunction,
      prescription,
      closePrescription,
      addPrescription,
      removePrescription,
      bmi,
      updateBMI,
    };
  },
};
