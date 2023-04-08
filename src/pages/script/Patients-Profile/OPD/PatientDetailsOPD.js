import { ref, watch } from "vue";
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
  OPDDiseaseLab,
} from "src/composables/Records";
import { FindUsersByName } from "src/composables/Manage_Users";
import { Loading, SessionStorage, useQuasar } from "quasar";

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
    let disease = ref([]);
    let lab_results = ref([]);

    FindRecordDetails(route.params.record_id, route.params.department).then(
      (response) => {
        Loading.hide();
      }
    );

    watch(
      () => _.cloneDeep(RecordDetails.value),
      () => {
        patientRecordInfo.value = {
          record_id: route.params.record_id,
          preliminary_checkup_done_by: {
            user_id: RecordDetails.value.preliminary_checkup_done_by,
            user_name: RecordDetails.value.preliminary_checkup_done_by_name,
          },
          temperature: RecordDetails.value.temperature,
          blood_pressure: RecordDetails.value.blood_pressure,
          height: RecordDetails.value.height,
          weight: RecordDetails.value.weight,
          pulse_rate: RecordDetails.value.pulse_rate,
          oxygen_sat: RecordDetails.value.oxygen_sat,
          doctor_id: {
            user_id: RecordDetails.value.doctor_id,
            user_name: RecordDetails.value.doctor_name,
          },
          complaint: RecordDetails.value.complaint,
          checkup_date: RecordDetails.value.checkup_date,
          next_checkup: RecordDetails.value.next_checkup,
          checkup_results: RecordDetails.value.checkup_results,
          status: 0,
        };
      }
    );

    watch(
      () => _.cloneDeep(OPDDiseaseLab.value),
      () => {
        disease.value = OPDDiseaseLab.value.disease;
        lab_results.value = OPDDiseaseLab.value.lab_results;
      }
    );

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
      editForm.value = false;
      FindRecordDetails(route.params.record_id, route.params.department).then(
        (response) => {
          Loading.hide();
        }
      );
    };

    let editForm = ref(false);

    const addFinding = () => {
      disease.value.push({ opd_disease: "" });
    };

    const removeFinding = (index) => {
      disease.value.splice(index, 1);
    };

    const addLabResult = () => {
      lab_results.value.push({ lab_result: "" });
    };

    const removeLabResult = (index) => {
      lab_results.value.splice(index, 1);
    };

    const editFunction = () => {
      editForm.value = false;

      patientRecordInfo.value.disease = disease.value;
      patientRecordInfo.value.lab_results = lab_results.value;

      if (
        typeof patientRecordInfo.value.preliminary_checkup_done_by === "object"
      ) {
        patientRecordInfo.value.preliminary_checkup_done_by =
          patientRecordInfo.value.preliminary_checkup_done_by.user_id;
      }

      if (patientRecordInfo.value.doctor_id.user_id != null) {
        patientRecordInfo.value.doctor_id =
          patientRecordInfo.value.doctor_id.user_id;
      }

      Loading.show();

      UpdateRecord(patientRecordInfo.value, route.params.department).then(
        (response) => {
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
        }
      );
    };

    const openDialog = () => {
      SetIDS(route.params.record_id, route.params.department);
      ToggleDialogState();
    };

    return {
      RecordDetails,
      patientRecordInfo,
      editForm,
      editFunction,
      addFinding,
      addLabResult,
      removeLabResult,
      removeFinding,
      cancelFunction,
      userOptions,
      userFilterFunction,
      openDialog,
      lab_results,
      disease,
    };
  },
};
