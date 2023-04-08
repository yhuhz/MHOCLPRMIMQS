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
import { Loading, useQuasar } from "quasar";

export default {
  components: { MHCDialog, DeleteHouseholdConfirmation },
  setup() {
    const $q = useQuasar();

    let searchBy = ref(["Household Name", "Household ID"]);
    let selectedSearchBy = ref("Household Name");
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
      if (selectedSearchBy.value === "Household ID") {
        FindHouseholdByID(searchValue.value).then((response) => {
          downloadDisable.value =
            typeof HouseholdsList.value === "undefined" ? true : false;
        });
      } else {
        FindHouseholdByName(searchValue.value).then((response) => {
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
    };
  },
};
