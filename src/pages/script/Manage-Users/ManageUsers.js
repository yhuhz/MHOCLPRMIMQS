import { ref } from "vue";
import { useQuasar, Loading, date, SessionStorage } from "quasar";
import DeleteUserConfirmation from "../../Components/DeleteUserConfirmation.vue";
import { ToggleDialogState } from "../../../composables/Triggers";
import MHCDialog from "../../../components/MHCDialog.vue";
import { SetIDS } from "src/composables/IDS";
import {
  GetUsers,
  UsersList,
  ResetPassword,
  AddUser,
  UpdateUser,
} from "src/composables/Manage_Users";

export default {
  components: { MHCDialog, DeleteUserConfirmation },
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

    /**ADD USER**/
    let sexArray = ["Male", "Female"];
    let newUserInfo = ref({
      last_name: null,
      first_name: null,
      middle_name: null,
      suffix: null,
      birthdate: null,
      phone_number: null,
      sex: null,
      department: null,
      job_title: null,
      permission_level: null,
      status: statusList[0],
    });

    let isAddUserSuccess = ref(false);
    let userSuccess = ref({
      userID: null,
      username: null,
      password: null,
    });

    let isAddUserFail = ref(false);

    const addUser = () => {
      newUserInfo.value.department =
        filtersDepartment.indexOf(newUserInfo.value.department) + 1;

      newUserInfo.value.permission_level =
        filtersPermission.indexOf(newUserInfo.value.permission_level) + 1;

      newUserInfo.value.status = statusList.indexOf(newUserInfo.value.status);

      // console.log(newUserInfo.value);
      Loading.show();

      AddUser(newUserInfo.value).then((response) => {
        Loading.hide();

        if (response.status === "success") {
          userSuccess.value.userID = response.data.user_id;
          userSuccess.value.username = response.data.username;
          userSuccess.value.password = response.data.password;

          isAddUserSuccess.value = true;
        } else {
          isAddUserFail.value = true;
        }

        // $q.notify({
        //   type: status === 0 ? "positive" : "negative",
        //   classes: "text-white",
        //   message:
        //     status === 0
        //       ? "Medicine record added successfully"
        //       : "Failed to add medicine record",
        // });
      });
    };

    const onReset = () => {
      newUserInfo.value = {
        last_name: null,
        first_name: null,
        middle_name: null,
        suffix: null,
        birthdate: null,
        phone_number: null,
        sex: null,
        department: null,
        job_title: null,
        permission_level: null,
        status: null,
      };
    };

    /**RESET PASSWORD**/
    let isResetPassword = ref(false);
    let resetPasswordID = ref(null);
    let isPasswordSuccess = ref(false);
    let isPasswordFail = ref(false);
    let successMessage = ref(null);

    let openResetPassword = (user_id) => {
      isResetPassword.value = true;
      resetPasswordID.value = user_id;
    };

    const resetPassword = () => {
      Loading.show();
      ResetPassword({
        mode: "Reset Password",
        user_id: resetPasswordID.value,
      }).then((response) => {
        Loading.hide();

        if (response.status === "success") {
          isPasswordSuccess.value = true;
          successMessage.value = response.data;
          onReset();
        } else {
          isPasswordFail.value = true;
        }
      });
    };

    /**EDIT MEDICINE RECORD**/
    let isEditUser = ref(false);
    let editUserInfo = ref({});

    const editUserModal = (record) => {
      isEditUser.value = true;

      editUserInfo.value = {
        user_id: record.user_id,
        username: record.username,
        last_name: record.last_name,
        first_name: record.first_name,
        middle_name: record.middle_name,
        suffix: record.suffix,
        birthdate: record.birthdate,
        phone_number: record.phone_number,
        sex: record.sex,
        department: filtersDepartment[record.department - 1],
        job_title: record.job_title,
        permission_level: filtersPermission[record.permission_level - 1],
        status: statusList[record.status],
      };
    };

    const editUser = () => {
      Loading.show();

      editUserInfo.value.department =
        filtersDepartment.indexOf(editUserInfo.value.department) + 1;

      editUserInfo.value.permission_level =
        filtersPermission.indexOf(editUserInfo.value.permission_level) + 1;

      editUserInfo.value.status = statusList.indexOf(editUserInfo.value.status);

      UpdateUser(editUserInfo.value).then((response) => {
        Loading.hide();
        isEditUser.value = false;
        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "User info edited successfully"
              : "Failed to edit user info",
        });
      });
    };

    /**DELETE MEDICINE RECORD**/
    const openDialog = (user_id) => {
      SetIDS(user_id);
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
      addUser,
      onReset,
      openDialog,
      isEditUser,
      editUserModal,
      editUserInfo,
      editUser,
      getUsers,
      UsersList,
      isResetPassword,
      resetPassword,
      openResetPassword,
      isPasswordSuccess,
      successMessage,
      resetPasswordID,
      newUserInfo,
      sexArray,
      isAddUserSuccess,
      userSuccess,
      isAddUserFail,
      isPasswordFail,
    };
  },
};
