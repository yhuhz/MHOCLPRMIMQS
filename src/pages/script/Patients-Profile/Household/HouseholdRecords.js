import { ref } from "vue";
import MHCDialog from "../../../../components/MHCDialog.vue";
import DeleteHouseholdConfirmation from "../../../Components/DeleteHouseholdConfirmation.vue";
import { ToggleDialogState } from "../../../../composables/Triggers";
import {
  FindHouseholdByID,
  FindHouseholdByName,
  HouseholdsList,
  AddHousehold,
  UpdateHousehold,
} from "src/composables/Household";
import { SetIDS } from "src/composables/IDS";
import { Loading, useQuasar, SessionStorage } from "quasar";
import exportFile from "quasar/src/utils/export-file.js";
import { useRouter } from "vue-router";

export default {
  components: { MHCDialog, DeleteHouseholdConfirmation },
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    let searchBy = ref(["Household Name", "Household ID"]);
    let selectedSearchBy = ref("Household Name");

    //Filter
    let showFilterModal = ref(false);
    let statusList = ref(["Active", "Deleted"]);
    let dateAdded = ref([]);
    let status_array_model = ref([0]);

    let searchValue = ref(null);
    let downloadDisable = ref(
      typeof HouseholdsList.value === "undefined" ? true : false
    );

    let isAddHousehold = ref(false);

    const columns = ref([
      {
        name: "household_id",
        align: "left",
        label: "Household ID",
        field: "household_id",
        sortable: true,
      },
      {
        name: "household_name",
        align: "left",
        label: "Household Name",
        field: "household_name",
        sortable: true,
      },
      {
        name: "patient_count",
        align: "left",
        label: "Number of Registered Patients",
        field: "patient_count",
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

    const rows = ref([
      {
        id: 12,
        householdName: "Perez",
        numberOfPatients: 5,
      },
      {
        id: 48,
        householdName: "Gonzales",
        numberOfPatients: 3,
      },
      {
        id: 52,
        householdName: "Reyes",
        numberOfPatients: 8,
      },
    ]);

    const getHouseholds = () => {
      let payload = {
        status: status_array_model.value,
        search_string: searchValue.value,
      };
      if (selectedSearchBy.value === "Household ID") {
        FindHouseholdByID(payload).then((response) => {
          downloadDisable.value =
            typeof HouseholdsList.value === "undefined" ? true : false;
        });
      } else {
        FindHouseholdByName(payload).then((response) => {
          downloadDisable.value =
            typeof HouseholdsList.value === "undefined" ? true : false;
        });
      }
    };

    let addHouseholdName = ref(null);

    const addHousehold = () => {
      Loading.show();
      AddHousehold({ household_name: addHouseholdName.value }).then(
        (response) => {
          Loading.hide();

          let status = response.status === "success" ? 0 : 1;

          $q.notify({
            type: status === 0 ? "positive" : "negative",
            classes: "text-white",
            message:
              status === 0
                ? "Household record added successfully"
                : "Failed to add household record",
          });
        }
      );
    };

    let isEditHousehold = ref(false);
    let editHouseholdName = ref(null);
    let editHouseholdID = ref(null);

    const openDialogEdit = (household_name, household_id) => {
      isEditHousehold.value = true;
      editHouseholdName.value = household_name;
      editHouseholdID.value = household_id;
    };

    const editHousehold = () => {
      Loading.show();
      let payload = {
        household_id: editHouseholdID.value,
        household_name: editHouseholdName.value,
      };
      UpdateHousehold(payload).then((response) => {
        Loading.hide();

        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Household record edited successfully"
              : "Failed to edit household record",
        });

        isEditHousehold.value = false;
      });
    };

    const deleteRecord = (household_id) => {
      SetIDS(household_id);
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
      const content = [columns.value.map((col) => wrapCsvValue(col.label))]
        .concat(
          HouseholdsList.value.map((row) =>
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

      const status = exportFile("Household Records.csv", content, "text/csv");

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
      isAddHousehold,
      columns,
      rows,
      deleteRecord,
      HouseholdsList,
      searchValue,
      getHouseholds,
      downloadDisable,
      addHouseholdName,
      addHousehold,
      editHouseholdName,
      isEditHousehold,
      editHousehold,
      openDialogEdit,
      showFilterModal,
      statusList,
      dateAdded,
      status_array_model,
      exportTable,
      keySession,
    };
  },
};
