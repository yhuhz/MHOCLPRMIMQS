import { ref } from "vue";
import { GetPatients, SC } from "src/composables/Patients";
import { Loading, useQuasar } from "quasar";
import exportFile from "quasar/src/utils/export-file.js";

export default {
  setup() {
    const $q = useQuasar();

    let searchBy = ref(["Senior Citizen ID", "Patient ID", "Name"]);
    let selectedSearchBy = ref("Senior Citizen ID");
    let searchValue = ref(null);
    let downloadDisable = ref(true);
    let sexArray = ["Male", "Female"];

    let showFilterModal = ref(false);
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

    let age = ref([60, 100]);

    let dateAdded = ref([]);

    let gender_array_model = ref([0, 1]);
    let status_array_model = ref([0]);
    let brgy_array_model = ref([]);

    let select_all_brgy = ref(true);
    let brgy_checkbox_disable = ref(false);
    let genderList = ["Male", "Female"];

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

    const columns = ref([
      {
        name: "senior_citizen_id",
        align: "left",
        label: "Senior Citizen ID",
        field: "senior_citizen_id",
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) =>
          row.first_name +
          " " +
          row.last_name +
          (row.suffix ? " " + row.suffix : ""),
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
        field: (row) => sexArray[row.sex],
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
        name: "action",
        align: "left",
        label: "",
        field: "",
        sortable: false,
      },
    ]);

    const getSC = () => {
      let payload = {
        search_category: selectedSearchBy.value,
        search_string: searchValue.value,
        filters: {
          age: age.value,
          sex: gender_array_model.value,
          status: status_array_model.value,
          date_added: dateAdded.value,
          barangay: brgy_array_model.value,
        },
      };

      Loading.show();
      GetPatients({ search_by: payload, sc: true }).then((response) => {
        Loading.hide();
      });
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
      const content = [columns.value.map((col) => wrapCsvValue(col.label))]
        .concat(
          SC.value.map((row) =>
            columns.value
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

      const status = exportFile(
        "Senior Citizens Records.csv",
        content,
        "text/csv"
      );

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
      columns,
      searchValue,
      getSC,
      downloadDisable,
      SC,
      showFilterModal,
      statusList,
      barangayList,
      age,
      status_array_model,
      gender_array_model,
      dateAdded,
      brgy_array_model,
      select_all_brgy,
      brgy_checkbox_disable,
      genderList,
      select_all_brgy_change,
      exportTable,
    };
  },
};
