import { ref } from "vue";
import { useQuasar, Loading, date, SessionStorage } from "quasar";
import DeleteMedicineConfirmation from "../../Components/DeleteMedicineConfirmation.vue";
import { ToggleDialogState } from "../../../composables/Triggers";
import MHCDialog from "../../../components/MHCDialog.vue";
import { SetIDS } from "src/composables/IDS";
import { GetUsers, UsersList } from "src/composables/Manage_Users";

export default {
  components: { MHCDialog, DeleteMedicineConfirmation },
  setup() {
    const $q = useQuasar();

    let keySession = SessionStorage.getItem("cred");
    if (keySession === null) {
      router.push({ name: "login" });
    }

    /*** Table ***/
    const columns = ref([
      {
        name: "user_id",
        align: "left",
        label: "ID",
        field: "user_id",
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) =>
          row.first_name +
          " " +
          (row.middle_name ? row.middle_name + " " : " ") +
          row.last_name +
          (row.suffix ? row.suffix + " " : ""),
        sortable: true,
      },
      {
        name: "username",
        align: "left",
        label: "Username",
        field: "username",
        sortable: true,
      },
      {
        name: "department",
        align: "left",
        label: "Department",
        field: (row) => filtersDepartment[row.department - 1],
        sortable: true,
      },
      {
        name: "job_title",
        align: "left",
        label: "Job Title",
        field: "job_title",
        sortable: true,
      },
      {
        name: "permission_level",
        align: "left",
        label: "Permission",
        field: (row) => filtersPermission[row.permission_level - 1],
        sortable: true,
      },
      {
        name: "phone_number",
        align: "left",
        label: "Phone Number",
        field: "phone_number",
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
        field: "action",
      },
    ]);

    let showFilterModal = ref(false);
    let isAddNewUser = ref(false);

    /**SEARCH FILTER**/
    let selectedSearchBy = ref("Name");
    let searchBy = ref(["Name", "Username", "User ID", "Phone Number"]);
    let searchString = ref(null);

    /**FILTERS**/

    //Status
    let statusList = ["Active", "Suspended", "Deleted"];
    let selectedFilterStatus = ref([0]);

    //Department
    let filtersDepartment = [
      "Outpatient Department",
      "Dental",
      "Prenatal and Immunization",
      "Pharmacy",
      "Front Desk",
      "Admin Office",
    ];
    let selectedFiltersDepartment = ref([]);
    let select_all_dept = ref(true);
    let dept_checkbox_disable = ref(false);

    if (select_all_dept.value === true) {
      filtersDepartment.forEach((element, index) => {
        selectedFiltersDepartment.value.push(index + 1);
      });
      dept_checkbox_disable.value = true;
    } else {
      selectedFiltersDepartment.value = [];
      dept_checkbox_disable.value = false;
    }

    const select_all_dept_change = () => {
      if (select_all_dept.value === true) {
        filtersDepartment.forEach((element, index) => {
          selectedFiltersDepartment.value.push(index + 1);
        });
      } else {
        selectedFiltersDepartment.value = [];
        dept_checkbox_disable.value = false;
      }
    };

    //Permission Level
    let filtersPermission = ["Administrator", "Edit and View", "View Only"];

    let selectedFiltersPermission = ref([1, 2, 3]);

    //Date Added
    let dateAdded = ref([]);

    //Search
    const getUsers = () => {
      let payload = {
        search_by: {
          search_category: selectedSearchBy.value,
          search_string: searchString.value,
        },
        filters: {
          department: selectedFiltersDepartment.value,
          permission_level: selectedFiltersPermission.value,
          date_added: dateAdded.value,
          status: selectedFilterStatus.value,
        },
      };
      Loading.show();
      GetUsers(payload).then((response) => {
        Loading.hide();
      });
    };

    /**ADD MEDICINE RECORD**/
    let newMedicineRecord = ref({
      generic_name: null,
      brand_name: null,
      med_classification: null,
      mfg_date: null,
      exp_date: null,
      quantity: null,
      dosage_form: null,
      dosage_strength: null,
      batch_lot_number: null,
      ptr_number: null,
      procured_by: null,
      date_added: date.formatDate(new Date(), "YYYY-MM-DD"),
      added_by: keySession && keySession.user_id,
      status: 0,
    });

    const addMedicineRecord = () => {
      // console.log(newMedicineRecord.value);
      Loading.show();

      AddMedicine(newMedicineRecord.value).then((response) => {
        Loading.hide();
        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Medicine record added successfully"
              : "Failed to add medicine record",
        });
      });
    };

    const onReset = () => {
      newMedicineRecord.value = {
        generic_name: null,
        brand_name: null,
        med_classification: null,
        mfg_date: null,
        exp_date: null,
        quantity: null,
        dosage_form: null,
        dosage_strength: null,
        batch_lot_number: null,
        ptr_number: null,
        procured_by: null,
        date_added: date.formatDate(new Date(), "YYYY-MM-DD"),
        added_by: keySession && keySession.user_id,
        status: 0,
      };
    };

    /**EDIT MEDICINE RECORD**/
    let isEditMedicineStock = ref(false);
    let editMedicineRecord = ref({
      generic_name: null,
      brand_name: null,
      med_classification: null,
      mfg_date: null,
      exp_date: null,
      quantity: null,
      dosage_form: null,
      dosage_strength: null,
      batch_lot_number: null,
      ptr_number: null,
      procured_by: null,
      date_added: date.formatDate(new Date(), "YYYY-MM-DD"),
      added_by: keySession && keySession.user_id,
      status: 0,
    });

    const editRecordModal = (record) => {
      isEditMedicineStock.value = true;

      editMedicineRecord.value = {
        medicine_id: record.medicine_id,
        generic_name: record.generic_name,
        brand_name: record.brand_name,
        med_classification: record.med_classification,
        mfg_date: record.mfg_date,
        exp_date: record.exp_date,
        quantity: record.quantity,
        dosage_form: record.dosage_form,
        dosage_strength: record.dosage_strength,
        batch_lot_number: record.batch_lot_number,
        ptr_number: record.ptr_number,
        procured_by: record.procured_by,
        date_added: record.date_added,
        added_by: record.added_by,
        status: 0,
      };
    };

    const editMedicine = () => {
      Loading.show();

      EditMedicine(editMedicineRecord.value).then((response) => {
        Loading.hide();
        isEditMedicineStock.value = false;
        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Medicine record edited successfully"
              : "Failed to edit medicine record",
        });
      });
    };

    /**DELETE MEDICINE RECORD**/
    const openDialog = (medicine_id) => {
      SetIDS(medicine_id);
      ToggleDialogState();
    };

    return {
      selectedSearchBy,
      searchBy,
      searchString,
      columns,
      showFilterModal,
      isAddNewUser,
      statusList,
      filtersDepartment,
      select_all_dept,
      dept_checkbox_disable,
      selectedFiltersDepartment,
      select_all_dept_change,
      selectedFiltersPermission,
      filtersPermission,
      selectedFilterStatus,
      dateAdded,
      addMedicineRecord,
      onReset,
      openDialog,
      isEditMedicineStock,
      editRecordModal,
      editMedicineRecord,
      editMedicine,
      getUsers,
      UsersList,
    };
  },
};
