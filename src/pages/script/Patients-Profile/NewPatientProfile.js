import { ref, watch } from "vue";
import {
  FindHouseholdByName,
  FindHouseholdByID,
} from "src/composables/Household";
import {
  AddPatient,
  FindPatient,
  EditPatient,
  PatientDetails,
} from "src/composables/Patients";
import { useRoute } from "vue-router";
import { useQuasar, SessionStorage, Loading, date } from "quasar";
import _ from "lodash";
import MHCDialog from "../../../components/MHCDialog.vue";
import AddPatientSuccess from "../../Components/AddPatientSuccess";
import { ToggleDialogState } from "../../../composables/Triggers";
import { SetIDS } from "src/composables/IDS";

export default {
  components: { MHCDialog, AddPatientSuccess },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    let keySession = SessionStorage.getItem("cred");

    PatientDetails.value = [];

    // Patient ID and household
    let statusList = ["Active", "Deceased", "Archived"];

    // Address
    let barangayList = [
      "Anoling",
      "Baligang",
      "Bantonan",
      "Brgy. 1 (Pob)",
      "Brgy.2 (Pob)",
      "Brgy.3 (Pob)",
      "Brgy.4 (Pob)",
      "Brgy.5 (Pob)",
      "Brgy.6 (Pob)",
      "Brgy.7 (Pob)",
      "Bariw",
      "Binanderahan",
      "Binitayan",
      "Bongabong",
      "Cabagñan",
      "Cabraran Pequeño",
      "Caguiba",
      "Calabidongan",
      "Comun",
      "Cotmon",
      "Del Rosario",
      "Gapo",
      "Gotob",
      "Ilawod",
      "Iluluan",
      "Libod",
      "Ligban",
      "Mabunga",
      "Magogon",
      "Manawan",
      "Maninila",
      "Mina",
      "Miti",
      "Palanog",
      "Panoypoy",
      "Pariaan",
      "Quinartilan",
      "Quirangay",
      "Quitinday",
      "Salugan",
      "Solong",
      "Sua",
      "Sumlang",
      "Tagaytay",
      "Tagoytoy",
      "Taladong",
      "Taloto",
      "Taplacon",
      "Tinago",
      "Tumpa",
    ];

    let sexArray = ["Male", "Female"];

    //Address
    let municipality = ref(null);
    let barangay = ref(null);
    let brgyDisable = ref(true);

    const municipalityFunction = () => {
      brgyDisable.value = false;
      if (municipality.value === "Outside Camalig") {
        barangay.value = "Outside Camalig";
        brgyDisable.value = true;
      }
    };
    let address = ref(null);

    // Personl Information
    let personalInformation = ref({
      patient_id: null,
      household_id: null,
      status: "Active",
      last_name: null,
      first_name: null,
      middle_name: null,
      suffix: null,
      birthdate: null,
      phone_number: null,
      sex: null,
    });

    // PWD and Senior Citizens
    let isPWD = ref(false);
    let isSeniorCitizen = ref(false);
    let pwd = ref({
      pwd_id: null,
      disability: null,
    });
    let senior_citizen_id = ref(null);
    let scDisable = ref(true);

    const onReset = () => {
      // console.log("mun", municipality.value);
      //Address
      barangay.value = null;
      municipality.value = null;
      address.value = null;

      // Personl Information
      personalInformation.value = {
        household_id: null,
        status: "Active",
        last_name: null,
        first_name: null,
        middle_name: null,
        suffix: null,
        birthdate: null,
        phone_number: null,
        sex: null,
      };

      // PWD and Senior Citizens
      isPWD.value = false;
      isSeniorCitizen.value = false;
      pwd.value = {
        pwd_id: null,
        disability: null,
      };
      senior_citizen_id.value = null;
    };

    /**FOR EDIT**/
    if (route.query.id) {
      Loading.show();
      FindPatient({ patient_id: route.query.id }).then((response) => {
        Loading.hide();
      });

      watch(
        () => _.cloneDeep(PatientDetails.value),
        () => {
          let info = PatientDetails.value;

          //Address
          if (info.barangay != "Outside Camalig") {
            municipality.value = "Camalig";
            brgyDisable.value = false;
          } else {
            municipality.value = "Outside Camalig";
          }
          barangay.value = info.barangay;
          address.value = info.address;

          //Personal Info
          personalInformation.value = {
            patient_id: info.patient_id,
            household_id: info.household_id,
            status: statusList[info.status],
            last_name: info.last_name,
            first_name: info.first_name,
            middle_name: info.middle_name,
            suffix: info.suffix,
            birthdate: info.birthdate,
            phone_number: info.phone_number,
            sex: sexArray[info.sex],
          };

          // PWD and Senior Citizens
          isPWD.value = info.pwd_id != null ? true : false;
          isSeniorCitizen.value = info.senior_citizen_id != null ? true : false;
          pwd.value = {
            pwd_id: info.pwd_id,
            disability: info.disability,
          };
          senior_citizen_id.value = info.senior_citizen_id;

          let age_now = Math.floor(
            date.getDateDiff(
              new Date(),
              personalInformation.value.birthdate,
              "days"
            ) / 365
          );
          scDisable.value = age_now <= 60 ? true : false;
        }
      );
    }

    let updateBirthdate = () => {
      let age_now = Math.floor(
        date.getDateDiff(
          new Date(),
          personalInformation.value.birthdate,
          "days"
        ) / 365
      );
      scDisable.value = age_now <= 60 ? true : false;
    };

    let householdOptions = ref([]);

    const householdFilterFunction = (val, update, abort) => {
      if (val.length > 0) {
        update(() => {
          if (!isNaN(val)) {
            FindHouseholdByID(val).then((response) => {
              householdOptions.value = [];
              if (response.status === "success") {
                let Household = ref([]);
                Household.value = response.data;
                Household.value.forEach((h) => {
                  let selectValues = {
                    household_name:
                      (h.household_id < 10 ? "0" : "") +
                      h.household_id +
                      " - " +
                      h.household_name,
                    household_id: h.household_id,
                  };
                  householdOptions.value.push(selectValues);
                });
              }
            });
          } else {
            const needle = String(val.toLowerCase());
            FindHouseholdByName(needle).then((response) => {
              householdOptions.value = [];
              if (response.status === "success") {
                let Household = ref([]);
                Household.value = response.data;
                Household.value.forEach((h) => {
                  let selectValues = {
                    household_name:
                      (h.household_id < 10 ? "0" : "") +
                      h.household_id +
                      " - " +
                      h.household_name,
                    household_id: h.household_id,
                  };
                  householdOptions.value.push(selectValues);
                });
              }
            });
          }
        });
      } else {
        abort();
      }
    };

    const onChangePWD = () => {
      if (isPWD.value === false) {
        pwd.value = {
          pwd_id: null,
          disability: null,
        };
      }
    };

    const onChangeSC = () => {
      if (isSeniorCitizen.value === false) {
        senior_citizen_id.value = null;
      }
    };

    const addPatient = () => {
      if (
        personalInformation.value.household_id &&
        personalInformation.value.sex &&
        barangay.value
      ) {
        personalInformation.value.barangay = barangay.value;
        personalInformation.value.address = personalInformation.value.address;
        personalInformation.value.added_by = keySession.user_id;
        personalInformation.value.sex = sexArray.indexOf(
          personalInformation.value.sex
        );
        personalInformation.value.status = statusList.indexOf(
          personalInformation.value.status
        );

        let payload = {
          personal_info: personalInformation.value,
          pwd: pwd.value,
          senior_citizen: senior_citizen_id.value,
        };

        Loading.show();
        AddPatient(payload).then((response) => {
          personalInformation.value.sex = "Male";
          personalInformation.value.status = statusList[0];
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

          status = 0 ? onReset() : "";

          SetIDS(response.data.patient_id);
          ToggleDialogState();
        });
      }
    };

    const editPatientRecord = () => {
      if (
        personalInformation.value.household_id &&
        personalInformation.value.sex &&
        barangay.value
      ) {
        personalInformation.value.barangay = barangay.value;
        personalInformation.value.address = personalInformation.value.address;
        personalInformation.value.added_by = keySession.user_id;
        personalInformation.value.sex = sexArray.indexOf(
          personalInformation.value.sex
        );
        personalInformation.value.status = statusList.indexOf(
          personalInformation.value.status
        );

        let payload = {
          personal_info: personalInformation.value,
          pwd: pwd.value,
          senior_citizen: senior_citizen_id.value,
        };

        Loading.show();
        EditPatient(payload).then((response) => {
          personalInformation.value.sex =
            sexArray[personalInformation.value.sex];
          personalInformation.value.status =
            statusList[personalInformation.value.status];
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
      }
    };

    const onSubmit = () => {
      if (route.query.id) {
        editPatientRecord();
      } else {
        addPatient();
      }
    };

    return {
      route,
      statusList,
      barangayList,
      barangay,
      municipality,
      address,
      personalInformation,
      isPWD,
      isSeniorCitizen,
      pwd,
      senior_citizen_id,
      householdFilterFunction,
      householdOptions,
      onReset,
      brgyDisable,
      municipalityFunction,
      onSubmit,
      onChangePWD,
      onChangeSC,
      scDisable,
      updateBirthdate,
    };
  },
};
