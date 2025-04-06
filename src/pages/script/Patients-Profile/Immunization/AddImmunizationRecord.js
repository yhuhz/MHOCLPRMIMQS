import { ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import { AddRecord } from "src/composables/Records";
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

    let purposeArray = ["Pediatric Vaccination", "Family Planning"];
    let vaccineArray = ["BCG", "HBV", "DPT", "OPV", "Measles Vaccine"];
    let checkup_date = ref(null);

    let patientRecordInfo = ref({
      patient_id: route.params.id,
      immunizer_id: {
        user_id: keySession ? keySession.user_id : null,
        user_name:
          keySession &&
          keySession.first_name +
            " " +
            keySession.last_name +
            " " +
            (keySession.suffix != null ? keySession.suffix : ""),
      },
      immunization_date: date.formatDate(new Date(), "YYYY-MM-DD"),
      purpose: null,
      next_immunization_date: null,
      vaccine_used: null,
      comments: null,
      status: 0,
    });

    checkup_date.value = patientRecordInfo.value.immunization_date.replaceAll(
      "-",
      "/"
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
      router.push({
        name: "patient-details",
        params: {
          id: route.params.id,
        },
      });
    };

    const addFunction = () => {
      Loading.show();

      if (patientRecordInfo.value.immunizer_id.user_id != null) {
        patientRecordInfo.value.immunizer_id =
          patientRecordInfo.value.immunizer_id.user_id;
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
              name: "Immunization/patient_records",
              params: {
                record_id: response.data.record_id,
                department: route.params.department,
              },
            });
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
      purposeArray,
      checkup_date,
      vaccineArray,
    };
  },
};
