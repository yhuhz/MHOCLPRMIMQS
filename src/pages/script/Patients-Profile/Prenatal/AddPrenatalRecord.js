import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AddRecord, RecordArrays } from "src/composables/Records";
import { FindUsersByName } from "src/composables/Manage_Users";
import { Loading, SessionStorage, useQuasar, date } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    let patientRecordInfo = ref({
      patient_id: route.params.id,
      midwife_id: {
        user_id: keySession ? keySession.user_id : null,
        user_name:
          keySession &&
          keySession.first_name +
            " " +
            keySession.last_name +
            " " +
            (keySession.suffix != null ? keySession.suffix : ""),
      },
      previous_full_term: null,
      previous_premature: null,
      date_added: date.formatDate(new Date(), "YYYY-MM-DD"),
      status: 0,
    });

    const currentDate = ref("");
    const daysToSubtract = 14;
    const dateBySubtractingDays = ref("");

    const getCurrentDate = () => {
      const today = new Date(patientRecordInfo.value.date_added);
      currentDate.value = today.toISOString().split("T")[0];
    };

    const getDateBySubtractingDays = () => {
      const today = new Date();
      const dateToSubtract = new Date(
        today.setDate(today.getDate() - daysToSubtract)
      );
      dateBySubtractingDays.value = dateToSubtract
        .toISOString()
        .split("T")[0]
        .replaceAll("-", "/");
    };

    onMounted(() => {
      getCurrentDate();
      getDateBySubtractingDays();
    });

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

    const addFunction = () => {
      if (patientRecordInfo.value.midwife_id.user_id != null) {
        patientRecordInfo.value.midwife_id =
          patientRecordInfo.value.midwife_id.user_id;
      }

      Loading.show();

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
            RecordArrays.value = [];

            if (route.params.queue) {
              router.push({
                name: "Prenatal/patient_records",
                params: {
                  record_id: response.data.record_id,
                  department_queue: route.params.department,
                },
              });
            } else {
              router.push({
                name: "Prenatal/patient_records",
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

    return {
      patientRecordInfo,
      addFunction,
      cancelFunction,
      userOptions,
      userFilterFunction,
      dateBySubtractingDays,
    };
  },
};
