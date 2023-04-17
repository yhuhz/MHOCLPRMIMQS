import { ref } from "vue";
import { DashboardData, GetDashboardData } from "src/composables/Dashboard";
import { useQuasar, SessionStorage, Loading } from "quasar";
import { GetQueueSpecific, QueueSpecific } from "src/composables/Queue";
import MHCDialog from "../../../components/MHCDialog.vue";
import RemovePatientFromQueue from "../../Components/RemovePatientFromQueue";
import { ToggleDialogState } from "../../../composables/Triggers";
import { SetIDS } from "src/composables/IDS";

export default {
  components: { MHCDialog, RemovePatientFromQueue },
  setup() {
    //Session Storage
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    let selected = ref("This Week");
    let options = ["This Week", "This Month", "This Year"];

    let payload = {
      filter: selected.value,
      department: keySession && keySession.department,
    };

    Loading.show();
    GetDashboardData(payload).then((response) => {
      Loading.hide();
    });

    const setDashboard = () => {
      let payload = {
        filter: selected.value,
        department: keySession.department,
      };
      Loading.show();
      GetDashboardData(payload).then((response) => {
        Loading.hide();
      });
    };

    /**QUEUE**/
    let departmentList = ref([]);

    if (keySession != NaN || keySession != null) {
      if (keySession.department === 1) {
        departmentList.value = ["OPD"];
      } else if (keySession.department === 2) {
        departmentList.value = ["Dental"];
      } else if (keySession.department === 3) {
        departmentList.value = ["Prenatal"];
      } else {
        departmentList.value = ["OPD", "Dental", "Prenatal", "Immunization"];
      }
    }
    let selectedDepartment = ref(departmentList.value[0]);

    let dept = ref(null);
    if (selectedDepartment.value === "OPD") {
      dept.value = 1;
    } else if (selectedDepartment.value === "Dental") {
      dept.value = 2;
    } else if (selectedDepartment.value === "Prenatal") {
      dept.value = 3;
    } else if (selectedDepartment.value === "Immunization") {
      dept.value = 7;
    }
    // console.log(payload.value);
    GetQueueSpecific(dept.value);

    const getDepartments = () => {
      if (selectedDepartment.value === "OPD") {
        dept.value = 1;
      } else if (selectedDepartment.value === "Dental") {
        dept.value = 2;
      } else if (selectedDepartment.value === "Prenatal") {
        dept.value = 3;
      } else if (selectedDepartment.value === "Immunization") {
        dept.value = 7;
      }
      // console.log(payload.value);
      GetQueueSpecific(dept.value);
    };

    const removeFromQueue = (queue_id) => {
      SetIDS(queue_id);
      ToggleDialogState();
    };

    /**CHARTS**/

    return {
      selected,
      options,
      DashboardData,
      setDashboard,
      departmentList,
      selectedDepartment,
      getDepartments,
      QueueSpecific,
      keySession,
      removeFromQueue,
    };
  },
};
