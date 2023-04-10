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
  RecordArrays,
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
    let prenatal_checkup = ref([]);
    let toggleNewCheckup = ref(false);

    FindRecordDetails(route.params.record_id, route.params.department).then(
      (response) => {
        Loading.hide();
      }
    );

    watch(
      () => _.cloneDeep(RecordDetails.value[0]),
      () => {
        patientRecordInfo.value = {
          record_id: route.params.record_id,
          midwife_id: {
            user_id: RecordDetails.value[0].midwife_id,
            user_name: RecordDetails.value[0].midwife_name,
          },
          last_menstruation: RecordDetails.value[0].last_menstruation,
          date_added: RecordDetails.value[0].date_added,
          previous_full_term: RecordDetails.value[0].previous_full_term,
          previous_premature: RecordDetails.value[0].previous_premature,
          midwifes_notes: RecordDetails.value[0].midwifes_notes,
          status: 0,
        };
      }
    );

    watch(
      () => _.cloneDeep(RecordArrays.value),
      () => {
        prenatal_checkup.value = RecordArrays.value[0];
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
      cancelFunction,
      userOptions,
      userFilterFunction,
      openDialog,
      prenatal_checkup,
      toggleNewCheckup,
    };
  },
};
