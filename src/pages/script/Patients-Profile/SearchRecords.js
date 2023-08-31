import { ref, watch } from "vue";
import { GetRecordsForTable, HealthRecords } from "src/composables/Records";
import _ from "lodash";
import { useQuasar, SessionStorage, Loading } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    // HealthRecords.value = [];

    let loading = ref(false);
    let searchString = ref(null);
    let selectedSearchBy = ref("Name");
    let date_added = ref([]);
    let searchBy = ref(["Name", "Patient ID", "Record ID"]);
    let showFilterModal = ref(true);

    let departmentOptions = ref();

    switch (keySession && keySession.department) {
      case 1:
        departmentOptions.value = ["OPD"];
        break;
      case 2:
        departmentOptions.value = ["Dental"];
        break;

      case 3:
        departmentOptions.value = ["Prenatal", "Immunization"];
        break;
      default:
        departmentOptions.value = ["OPD", "Dental", "Prenatal", "Immunization"];
    }

    let selectedDepartment = ref(departmentOptions.value[0]);

    let statusArray = ["Active", "Deleted"];

    loading.value = true;
    let payload = {
      search_by: selectedSearchBy.value,
      search_string: searchString.value,
      department: selectedDepartment.value,
    };

    GetRecordsForTable(payload).then((response) => {
      loading.value = false;
    });

    const searchRecords = () => {
      loading.value = true;
      let payload = {
        search_by: selectedSearchBy.value,
        search_string: searchString.value,
        department: selectedDepartment.value,
        date_added: date_added.value,
      };
      console.log(payload);
      GetRecordsForTable(payload).then((response) => {
        loading.value = false;
      });
    };

    const columns = [
      {
        name: "record_id",
        align: "left",
        label: "Record ID",
        field: (row) => row.record_id,
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
        name: "patient_id",
        align: "left",
        label: "Patient ID",
        field: (row) => row.patient_id,
        sortable: true,
      },

      {
        name: "department",
        align: "left",
        label: "Department",
        field: (row) => selectedDepartment.value,
        sortable: true,
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
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

    const rowClick = (patient_info) => {
      let routeData = router.resolve({
        name: selectedDepartment.value + "/patient_records",
        params: {
          id: patient_info.patient_id,
          record_id: patient_info.record_id,
          department: selectedDepartment.value,
        },
      });
      window.open(routeData.href, "_blank");
    };

    return {
      columns,
      searchBy,
      selectedSearchBy,
      HealthRecords,
      keySession,
      loading,
      departmentOptions,
      selectedDepartment,
      searchRecords,
      searchString,
      rowClick,
      showFilterModal,
      date_added,
    };
  },
};
