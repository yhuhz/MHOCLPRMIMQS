import { ref } from "vue";
import { GetPatients, PWD } from "src/composables/Patients";
import { Loading, useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();

    let searchBy = ref(["PWD ID", "Patient ID", "Name"]);
    let selectedSearchBy = ref("PWD ID");
    let searchValue = ref(null);
    let downloadDisable = ref(true);
    let sexArray = ["Male", "Female"];

    const columns = ref([
      {
        name: "pwd_id",
        align: "left",
        label: "PWD ID",
        field: "pwd_id",
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
        name: "disability",
        align: "left",
        label: "Disability",
        field: "disability",
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

    const getPWD = () => {
      let payload = {
        search_category: selectedSearchBy.value,
        search_string: searchValue.value,
      };

      Loading.show();
      GetPatients({ search_by: payload, pwd: true }).then((response) => {
        Loading.hide();
      });
    };

    return {
      searchBy,
      selectedSearchBy,
      columns,
      searchValue,
      getPWD,
      downloadDisable,
      PWD,
    };
  },
};
