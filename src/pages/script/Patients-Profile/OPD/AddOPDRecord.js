import { ref, watch } from "vue";
import _ from "lodash";
import { useRoute, useRouter } from "vue-router";
import {} from "src/composables/Records";
import { FindUsersByName } from "src/composables/Manage_Users";
import { AddRecord, PatientRecords } from "src/composables/Records";
import { SessionStorage, date, useQuasar, Loading } from "quasar";
import {
  GetQueueSpecific,
  QueueSpecific,
  DonePatient,
} from "src/composables/Queue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    let patientRecordInfo = ref({
      patient_id: route.params.id,
      preliminary_checkup_done_by: {
        user_id: keySession ? keySession.user_id : null,
        user_name:
          keySession &&
          keySession.first_name +
            " " +
            keySession.last_name +
            " " +
            (keySession.suffix != null ? keySession.suffix : ""),
      },
      temperature: null,
      blood_pressure_systole: null,
      blood_pressure_diastole: null,
      height: null,
      weight: null,
      pulse_rate: null,
      oxygen_sat: null,

      doctor_id: null,
      complaint: null,
      checkup_date: date.formatDate(new Date(), "YYYY-MM-DD"),
      status: 0,
    });

    const addFinding = () => {
      patientRecordInfo.value.disease.push({ opd_disease: "" });
    };

    const removeFinding = (index) => {
      patientRecordInfo.value.disease.splice(index, 1);
    };

    const addLabResult = () => {
      patientRecordInfo.value.lab_results.push({ lab_result: "" });
    };

    const removeLabResult = (index) => {
      patientRecordInfo.value.lab_results.splice(index, 1);
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

    const addRecord = () => {
      Loading.show();
      if (patientRecordInfo.value.preliminary_checkup_done_by.user_id != null) {
        patientRecordInfo.value.preliminary_checkup_done_by =
          patientRecordInfo.value.preliminary_checkup_done_by.user_id;
      }
      AddRecord(patientRecordInfo.value, route.params.department).then(
        (response) => {
          Loading.hide();

          let status = response.status === "success" ? 0 : 1;

          $q.notify({
            type: status === 0 ? "positive" : "negative",
            classes: "text-white",
            message:
              status === 0
                ? "Patient record added successfully"
                : "Failed to add patient record",
          });
          if (status === 0) {
            router.push({
              name: "home",
            });

            if (route.params.queue) {
              DonePatient({
                current_patient: route.params.queue,
                department: dept.value,
                priority: route.params.priority,
                done: true,
              });
            }
          }
        }
      );
    };

    const cancel = () => {
      route.params.queue
        ? router.push({
            name: "patient-details",
            params: {
              id: route.params.id,
              queue: route.params.queue,
            },
          })
        : router.push({
            name: "patient-details",
            params: {
              id: route.params.id,
            },
          });
    };

    let dept = ref(null);

    if (route.params.queue) {
      if (route.params.department === "Front Desk") {
        dept.value = 5;
      } else if (route.params.department === "OPD") {
        dept.value = 1;
      } else if (route.params.department === "Dental") {
        dept.value = 2;
      } else if (route.params.department === "Prenatal") {
        dept.value = 3;
      } else if (route.params.department === "Immunization") {
        dept.value = 7;
      }
    }

    return {
      keySession,
      addRecord,
      cancel,
      patientRecordInfo,
      addFinding,
      removeFinding,
      addLabResult,
      removeLabResult,
      userOptions,
      userFilterFunction,
    };
  },
};
