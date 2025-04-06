import { ref } from "vue";
import { GetPatients, Prenatal } from "src/composables/Patients";
import { Loading, useQuasar, SessionStorage } from "quasar";
import { exportFile } from "quasar";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    let searchBy = ref(["Prenatal ID", "Patient ID", "Name"]);
    let selectedSearchBy = ref("Prenatal ID");
    let searchValue = ref(null);
    let downloadDisable = ref(true);

    let showFilterModal = ref(false);
    let statusList = ["Active", "Deleted"];

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

    let age = ref([0, 40]);

    let dateAdded = ref([]);

    let status_array_model = ref([0]);
    let brgy_array_model = ref(barangayList);

    let brgy_checkbox_disable = ref(false);

    let outsideCamaligCheckbox = ref(true);

    const select_all_brgy = () => {
      brgy_array_model.value = barangayList;
      outsideCamaligCheckbox.value = true;
    };
    const select_none_brgy = () => {
      brgy_array_model.value = [];
      outsideCamaligCheckbox.value = false;
    };

    const columns = ref([
      {
        name: "prenatal_id",
        align: "left",
        label: "Prenatal ID",
        field: "prenatal_id",
        sortable: true,
      },
      {
        name: "patient_id",
        align: "left",
        label: "Patient ID",
        field: "patient_id",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
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
        name: "previous_full_term",
        align: "left",
        label: "Previous Full Term",
        field: "previous_full_term",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "previous_premature",
        align: "left",
        label: "Previous Premature",
        field: "previous_premature",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "date_added",
        align: "left",
        label: "1st Checkup",
        field: "date_added",
        sortable: true,
      },
      {
        name: "midwifes_notes",
        align: "left",
        label: "Midwife's Notes",
        field: "midwifes_notes",
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
        name: "status",
        align: "left",
        label: "Status",
        field: (row) => statusList[row.status],
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "",
        sortable: false,
      },
    ]);

    const getPrenatal = () => {
      let payload = {
        search_category: selectedSearchBy.value,
        search_string: searchValue.value,
        filters: {
          age: age.value,
          status: status_array_model.value,
          date_added: dateAdded.value,
          barangay: brgy_array_model.value,
          outside_camalig: outsideCamaligCheckbox.value,
        },
      };

      Loading.show();
      GetPatients({ search_by: payload, prenatal: true }).then((response) => {
        Loading.hide();
      });
    };

    getPrenatal();

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
          Prenatal.value.map((row) =>
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

      const status = exportFile("Prenatal Records.csv", content, "text/csv");

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
      getPrenatal,
      downloadDisable,
      Prenatal,
      showFilterModal,
      statusList,
      barangayList,
      age,
      status_array_model,
      dateAdded,
      brgy_array_model,
      select_all_brgy,
      select_none_brgy,
      brgy_checkbox_disable,
      exportTable,
      keySession,
      outsideCamaligCheckbox,
    };
  },
};
