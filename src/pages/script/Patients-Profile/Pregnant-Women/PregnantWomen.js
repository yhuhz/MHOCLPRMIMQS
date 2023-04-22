import { ref } from "vue";
import { GetPatients, Prenatal } from "src/composables/Patients";
import { Loading, useQuasar, SessionStorage } from "quasar";
import exportFile from "quasar/src/utils/export-file.js";
import { useRouter } from "vue-router";
import {
  AddToQueue,
  GetLastQueueNumber,
  LastQueueNumber,
} from "src/composables/Queue";

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

    let age = ref([0, 40]);

    let dateAdded = ref([]);

    let status_array_model = ref([0]);
    let brgy_array_model = ref([]);

    let select_all_brgy = ref(true);
    let brgy_checkbox_disable = ref(false);

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
        },
      };

      Loading.show();
      GetPatients({ search_by: payload, prenatal: true }).then((response) => {
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

    /**ADD TO QUEUE**/
    let queueOpenModal = ref(false);
    let patientToQueue = ref(null);
    let queueNumber = ref(null);
    let departmentArrayQueue = ref([]);
    let departmentQueue = ref("OPD");

    const openQueueModal = (patient_info) => {
      departmentQueue.value = "OPD";
      GetLastQueueNumber({
        department: null,
        priority: 1,
      }).then((response) => {
        queueNumber.value = LastQueueNumber.value;
      });

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

    const departmentChange = () => {
      GetLastQueueNumber({
        department: null,
        priority: 1,
      }).then((response) => {
        queueNumber.value = LastQueueNumber.value;
      });
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
        queue_number: queueNumber.value,
        is_priority: 1,
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
          (queueNumber.value = null),
          (queueOpenModal.value = false);
      });
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
      brgy_checkbox_disable,
      select_all_brgy_change,
      exportTable,
      keySession,
      queueOpenModal,
      patientToQueue,
      queueNumber,
      departmentArrayQueue,
      departmentQueue,
      openQueueModal,
      addToQueue,
      departmentChange,
    };
  },
};
