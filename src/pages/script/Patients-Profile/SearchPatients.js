import { ref, watch } from "vue";
import MHCDialog from "../../../components/MHCDialog.vue";
import DeletePatientConfirmation from "../../Components/DeletePatientConfirmation";
import { ToggleDialogState } from "../../../composables/Triggers";
import { GetPatients, PatientsList } from "src/composables/Patients";
import {
  FindMedicineReleasePerPatient,
  MedReleasePerPatient,
} from "src/composables/Medicine";
import _ from "lodash";
import { useQuasar, SessionStorage, Loading } from "quasar";
import exportFile from "quasar/src/utils/export-file.js";
import { SetIDS } from "src/composables/IDS";
import { useRouter, useRoute } from "vue-router";
import { LoginCredential, FindUser } from "src/composables/UserAccount";
import { AddToQueue, QueueList } from "src/composables/Queue";

export default {
  components: { MHCDialog, DeletePatientConfirmation },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    FindUser(keySession && keySession.user_id);

    let downloadDisable = ref(
      typeof PatientsList.value === "undefined" ? true : false
    );

    let searchString = ref(null);
    let selectedSearchBy = ref("Name");
    let searchBy = ref(["Name", "Patient ID", "Household ID", "Phone Number"]);

    let showFilterModal = ref(false);

    let genderList = ref(["Male", "Female"]);
    let statusList = ref(["Active", "Deceased", "Deleted"]);
    let barangayList = [
      "Outside Camalig",
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

    let age = ref([0, 100]);

    let dateAdded = ref([]);

    let gender_array_model = ref([0, 1]);
    let status_array_model = ref([0]);
    let brgy_array_model = ref([]);

    let select_all_brgy = ref(true);
    let brgy_checkbox_disable = ref(false);

    let sex = ["Male", "Female"];

    if (select_all_brgy.value === true) {
      brgy_array_model.value = barangayList;
      brgy_checkbox_disable.value = true;
    } else {
      brgy_array_model.value = [];
      brgy_checkbox_disable.value = false;
    }

    const select_all_brgy_change = () => {
      if (select_all_brgy.value === true) {
        brgy_array_model.value = barangayList;
        brgy_checkbox_disable.value = true;
      } else {
        brgy_array_model.value = [];
        brgy_checkbox_disable.value = false;
      }
    };

    let loading = ref(false);

    const searchPatients = () => {
      let payload = {
        search_by: {
          search_category: selectedSearchBy.value,
          search_string:
            searchString.value === null
              ? ""
              : searchString.value.replace(/\s+/g, ""),
        },

        filter: {
          age: age.value,
          sex: gender_array_model.value,
          status: status_array_model.value,
          date_added: dateAdded.value,
          barangay: brgy_array_model.value,
        },
      };

      Loading.show();
      loading.value = true;
      GetPatients(payload).then((response) => {
        Loading.hide();
        loading.value = false;
      });
    };

    /**FOR PATIENTS UNDER HOUSEHOLD ID**/
    if (route.query.household_id) {
      selectedSearchBy.value = "Household ID";
      searchString.value = route.query.household_id;

      let payload = {
        search_by: {
          search_category: "Household ID",
          search_string: route.query.household_id,
        },
      };

      Loading.show();

      loading.value = true;
      GetPatients(payload).then((response) => {
        Loading.hide();
        loading.value = false;
      });
    }

    const columns = [
      {
        name: "patientID",
        align: "left",
        label: "Patient ID",
        field: "patient_id",
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) =>
          row.first_name +
          " " +
          (row.middle_name ? row.middle_name + " " : "") +
          row.last_name +
          (row.suffix ? " " + row.suffix : ""),
        sortable: true,
      },
      {
        name: "household_id",
        align: "left",
        label: "Household ID",
        field: "household_id",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "household",
        align: "left",
        label: "Household",
        field: "household_name",
        sortable: true,
      },
      {
        name: "barangay",
        align: "left",
        label: "Barangay",
        field: "barangay",
        sortable: true,
      },
      {
        name: "address",
        align: "left",
        label: "Address",
        field: "address",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "sex",
        align: "left",
        label: "Sex",
        field: "sex",
        sortable: true,
      },
      {
        name: "birth date",
        align: "left",
        label: "Birth date",
        field: "birthdate",
        sortable: true,
      },
      {
        name: "age",
        align: "left",
        label: "Age",
        field: "age",
        sortable: true,
      },
      {
        name: "phone number",
        align: "left",
        label: "Phone Number",
        field: "phone_number",
        sortable: true,
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "",
        sortable: false,
      },
    ];

    const deletePatientRecord = (patient_id) => {
      SetIDS(patient_id);
      ToggleDialogState();
    };

    /**EXPORT TABLE**/
    const wrapCsvValue = (val, formatFn, row) => {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      formatted = formatted.split('"').join('""');
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`;
    };

    const exportTable = () => {
      // naive encoding to csv format
      const content = [columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          PatientsList.value.map((row) =>
            columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("List of Patients.csv", content, "text/csv");

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    };

    /**VIEW MEDICINE RELEASE PER PATIENT**/
    let isViewMedicineRelease = ref(false);

    const medicineReleaseColumn = [
      {
        name: "med_release_id",
        align: "left",
        label: "Release ID",
        field: "med_release_id",
        sortable: true,
      },
      {
        name: "medicine_id",
        align: "left",
        label: "Medicine ID",
        field: "medicine_id",
        sortable: true,
      },
      {
        name: "generic_name",
        align: "left",
        label: "Generic Name",
        field: "generic_name",
        sortable: true,
      },
      {
        name: "brand_name",
        align: "left",
        label: "Brand Name",
        field: "brand_name",
        sortable: true,
      },
      {
        name: "quantity",
        align: "left",
        label: "Qty",
        field: "quantity",
        sortable: true,
      },
      {
        name: "release_date",
        align: "left",
        label: "Date",
        field: "release_date",
        sortable: true,
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "",
        sortable: false,
      },
    ];

    const viewMedicineRelease = (patient_id) => {
      isViewMedicineRelease.value = true;

      loading.value = true;

      FindMedicineReleasePerPatient(patient_id).then((response) => {
        loading.value = false;
      });
    };

    /**ADD TO QUEUE**/
    let queueOpenModal = ref(false);
    let patientToQueue = ref(null);
    let departmentArrayQueue = ref([]);
    let departmentQueue = ref("OPD");
    const openQueueModal = (patient_info) => {
      queueOpenModal.value = true;
      patientToQueue.value = patient_info.patient_id;

      if (patient_info.sex === 0) {
        departmentArrayQueue.value = ["OPD", "Dental", "Immunization"];
      } else {
        departmentArrayQueue.value = [
          "OPD",
          "Dental",
          "Prenatal",
          "Immunization",
        ];
      }
    };
    const addToQueue = () => {
      if (departmentQueue.value === "OPD") {
        departmentQueue.value = 1;
      } else if (departmentQueue.value === "Dental") {
        departmentQueue.value = 2;
      } else if (departmentQueue.value === "Prenatal") {
        departmentQueue.value = 3;
      } else if (departmentQueue.value === "Immunization") {
        departmentQueue.value = 7;
      }

      Loading.show();
      AddToQueue({
        patient_id: patientToQueue.value,
        department: departmentQueue.value,
      }).then((response) => {
        Loading.hide();

        let status = response.status === "success" ? 0 : 1;
        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Patient added to queue successfully"
              : "Failed to add patient to queue",
        });

        (departmentQueue.value = "OPD"),
          (patientToQueue.value = null),
          (queueOpenModal.value = false);
      });
    };

    return {
      searchBy,
      selectedSearchBy,
      showFilterModal,
      barangayList,
      brgy_array_model,
      statusList,
      status_array_model,
      genderList,
      gender_array_model,
      dateAdded,
      columns,
      select_all_brgy,
      brgy_checkbox_disable,
      select_all_brgy_change,
      age,
      searchPatients,
      searchString,
      PatientsList,
      keySession,
      loading,
      exportTable,
      sex,
      downloadDisable,
      deletePatientRecord,
      isViewMedicineRelease,
      viewMedicineRelease,
      medicineReleaseColumn,
      MedReleasePerPatient,
      queueOpenModal,
      patientToQueue,
      openQueueModal,
      addToQueue,
      departmentArrayQueue,
      departmentQueue,
    };
  },
};
