import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {} from "src/composables/Records";
import { FindUsersByName } from "src/composables/Manage_Users";
import { AddRecord, PatientRecords } from "src/composables/Records";
import { SessionStorage, date, useQuasar, Loading } from "quasar";

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
      doctor_id: {
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
      complaint: null,
      checkup_date: date.formatDate(new Date(), "YYYY-MM-DD"),
      status: 0,
    });

    let checkup_date = date
      .formatDate(new Date(), "YYYY-MM-DD")
      .replaceAll("-", "/");

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
      if (patientRecordInfo.value.doctor_id.user_id != null) {
        patientRecordInfo.value.doctor_id =
          patientRecordInfo.value.doctor_id.user_id;
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
            if (route.params.queue) {
              router.push({
                name: "Dental/patient_records",
                params: {
                  record_id: response.data.record_id,
                  department_queue: route.params.department,
                  queue: route.params.queue,
                },
              });
            } else {
              router.push({
                name: "Dental/patient_records",
                params: {
                  record_id: response.data.record_id,
                  department: route.params.department,
                },
              });
            }
          }
        }
      );
    };

    const cancel = () => {
      if (route.params.queue) {
        router.push({
          name: "home",
        });
      } else {
        router.push({
          name: "patient-details",
          params: {
            id: route.params.id,
          },
        });
      }
    };
    return {
      keySession,
      addRecord,
      cancel,
      patientRecordInfo,
      userOptions,
      userFilterFunction,
      checkup_date,
    };
  },
};
