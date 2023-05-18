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
    let editForm = ref(false);
    let checkup_date = ref(null);
    let purposeArray = ["Pediatric Vaccination", "Family Planning"];

    FindRecordDetails(route.params.record_id, route.params.department).then(
      (response) => {
        Loading.hide();
      }
    );

    watch(
      () => _.cloneDeep(RecordDetails.value),
      () => {
        editForm.value = false;
        patientRecordInfo.value = {
          immunization_id: route.params.record_id,
          patient_id: route.params.id,
          immunizer_id: {
            user_id: RecordDetails.value.immunizer_id,
            user_name: RecordDetails.value.immunizer_name,
          },
          immunization_date: RecordDetails.value.immunization_date,
          next_immunization_date: RecordDetails.value.next_immunization_date,
          purpose: RecordDetails.value.purpose,
          vaccine_used: RecordDetails.value.vaccine_used,
          comments: RecordDetails.value.comments,
          status: RecordDetails.value.status,
        };

        checkup_date.value =
          patientRecordInfo.value.immunization_date.replaceAll("-", "/");
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

    const editFunction = () => {
      editForm.value = false;

      if (patientRecordInfo.value.immunizer_id.user_id != null) {
        patientRecordInfo.value.immunizer_id =
          patientRecordInfo.value.immunizer_id.user_id;
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
      keySession,
      checkup_date,
      purposeArray,
    };
  },
};
