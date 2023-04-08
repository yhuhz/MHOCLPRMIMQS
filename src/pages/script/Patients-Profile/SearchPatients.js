import { ref, watch } from "vue";
import MHCDialog from "../../../components/MHCDialog.vue";
import DeletePatientConfirmation from "../../Components/DeletePatientConfirmation";
import { ToggleDialogState } from "../../../composables/Triggers";
import { GetPatients, PatientsList, Patients } from "src/composables/Patients";
import _ from "lodash";
import { useQuasar, SessionStorage } from "quasar";
import exportFile from "quasar/src/utils/export-file.js";
import { SetIDS } from "src/composables/IDS";

export default {
  components: { MHCDialog, DeletePatientConfirmation },
  setup() {
    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    Patients.value = [];

    let downloadDisable = ref(true);
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

    let age = ref([]);

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

      loading.value = true;
      GetPatients(payload).then((response) => {
        loading.value = false;
        downloadDisable.value = false;
      });
    };

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
        field: "name",
        sortable: true,
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
    };
  },
};
