// Upper Teeth
import upper1 from "../../../../assets/UpperTeeth/row-1-column-1.jpg";
import upper2 from "../../../../assets/UpperTeeth/row-1-column-2.jpg";
import upper3 from "../../../../assets/UpperTeeth/row-1-column-3.jpg";
import upper4 from "../../../../assets/UpperTeeth/row-1-column-4.jpg";
import upper5 from "../../../../assets/UpperTeeth/row-1-column-5.jpg";
import upper6 from "../../../../assets/UpperTeeth/row-1-column-6.jpg";
import upper7 from "../../../../assets/UpperTeeth/row-1-column-7.jpg";
import upper8 from "../../../../assets/UpperTeeth/row-1-column-8.jpg";
import upper9 from "../../../../assets/UpperTeeth/row-1-column-9.jpg";
import upper10 from "../../../../assets/UpperTeeth/row-1-column-10.jpg";
import upper11 from "../../../../assets/UpperTeeth/row-1-column-11.jpg";
import upper12 from "../../../../assets/UpperTeeth/row-1-column-12.jpg";
import upper13 from "../../../../assets/UpperTeeth/row-1-column-13.jpg";
import upper14 from "../../../../assets/UpperTeeth/row-1-column-14.jpg";
import upper15 from "../../../../assets/UpperTeeth/row-1-column-15.jpg";
import upper16 from "../../../../assets/UpperTeeth/row-1-column-16.jpg";

// Lower Teeth
import lower1 from "../../../../assets/LowerTeeth/row-1-column-1.jpg";
import lower2 from "../../../../assets/LowerTeeth/row-1-column-2.jpg";
import lower3 from "../../../../assets/LowerTeeth/row-1-column-3.jpg";
import lower4 from "../../../../assets/LowerTeeth/row-1-column-4.jpg";
import lower5 from "../../../../assets/LowerTeeth/row-1-column-5.jpg";
import lower6 from "../../../../assets/LowerTeeth/row-1-column-6.jpg";
import lower7 from "../../../../assets/LowerTeeth/row-1-column-7.jpg";
import lower8 from "../../../../assets/LowerTeeth/row-1-column-8.jpg";
import lower9 from "../../../../assets/LowerTeeth/row-1-column-9.jpg";
import lower10 from "../../../../assets/LowerTeeth/row-1-column-10.jpg";
import lower11 from "../../../../assets/LowerTeeth/row-1-column-11.jpg";
import lower12 from "../../../../assets/LowerTeeth/row-1-column-12.jpg";
import lower13 from "../../../../assets/LowerTeeth/row-1-column-13.jpg";
import lower14 from "../../../../assets/LowerTeeth/row-1-column-14.jpg";
import lower15 from "../../../../assets/LowerTeeth/row-1-column-15.jpg";
import lower16 from "../../../../assets/LowerTeeth/row-1-column-16.jpg";
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

    let editForm = ref(false);

    const upperTeeth = ref([
      upper1,
      upper2,
      upper3,
      upper4,
      upper5,
      upper6,
      upper7,
      upper8,
      upper9,
      upper10,
      upper11,
      upper12,
      upper13,
      upper14,
      upper15,
      upper16,
    ]);

    const lowerTeeth = ref([
      lower1,
      lower2,
      lower3,
      lower4,
      lower5,
      lower6,
      lower7,
      lower8,
      lower9,
      lower10,
      lower11,
      lower12,
      lower13,
      lower14,
      lower15,
      lower16,
    ]);

    const scoreOptions = ref([0, 1, 2, 3, 4, 5, 6]);

    let showDentalModal = ref(false);
    let isEdit = ref(false);

    const openModal = () => {
      showDentalModal.value = true;
    };

    const selectedScore = ref(0);

    const bgColor = [
      "#FFFFFF",
      "#9E9E9E",
      "#FFEB3B",
      "#B0BEC5",
      "#FB8C00",
      "#EF9A9A",
      "#03A9F4",
    ];

    const getOverlayColor = (score) => {
      // return a color value from the bgColor array based on the index value
      const colorIndex = score % bgColor.length;
      return bgColor[colorIndex];
    };

    Loading.show();

    let patientRecordInfo = ref({});
    let dental_chart = ref([]);

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
          temperature: RecordDetails.value.temperature,
          blood_pressure_systole: RecordDetails.value.blood_pressure_systole,
          blood_pressure_diastole: RecordDetails.value.blood_pressure_diastole,
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
      () => _.cloneDeep(RecordArrays.value),
      () => {
        dental_chart.value = RecordArrays.value;
        // console.log("dc", dental_chart.value);
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

      if (patientRecordInfo.value.doctor_id.user_id != null) {
        patientRecordInfo.value.doctor_id =
          patientRecordInfo.value.doctor_id.user_id;
      }

      // console.log("dc", dental_chart.value);
      let payload = {
        dental_record: patientRecordInfo.value,
        dental_chart: dental_chart.value,
      };

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
      upperTeeth,
      lowerTeeth,
      showDentalModal,
      isEdit,
      selectedScore,
      scoreOptions,
      dental_chart,
      bgColor,
      getOverlayColor,
    };
  },
};
