import { onMounted, ref, watch } from "vue";
import _ from "lodash";
import { throttle } from "lodash";
import { DashboardData, GetDashboardData } from "src/composables/Dashboard";
import { useQuasar, SessionStorage, Loading } from "quasar";
import {
  GetQueueSpecific,
  QueueSpecific,
  CallNextPatient,
} from "src/composables/Queue";
import { BackupDatabase, RestoreDatabase } from "src/composables/Database";
import MHCDialog from "../../../components/MHCDialog.vue";
import RemovePatientFromQueue from "../../Components/RemovePatientFromQueue";
import { ToggleDialogState } from "../../../composables/Triggers";
import { SetIDS } from "src/composables/IDS";
import Chart from "chart.js/auto";
import { useRouter } from "vue-router";

export default {
  components: { MHCDialog, RemovePatientFromQueue },
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    //Session Storage
    let keySession = SessionStorage.getItem("cred");
    if (!keySession) {
      router.push({ name: "login" });
    }

    let selected = ref("This Week");
    let options = ["This Week", "This Month", "This Year"];

    /**QUEUE**/
    let payload = {
      filter: selected.value,
      department: keySession && keySession.department,
    };
    let departmentList = ref([]);

    if (keySession != NaN || keySession != null) {
      if (keySession && keySession.department === 1) {
        departmentList.value = ["OPD"];
      } else if (keySession && keySession.department === 2) {
        departmentList.value = ["Dental"];
      } else if (keySession && keySession.department === 3) {
        departmentList.value = ["Prenatal", "Immunization"];
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
      currentPatient.value = null;
      priorityPatients.value = [];
      otherPatients.value = [];

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

    let currentPatient = ref(null);
    let priorityPatients = ref([]);
    let otherPatients = ref([]);

    watch(
      () => _.cloneDeep(QueueSpecific.value),
      () => {
        priorityPatients.value = [];
        otherPatients.value = [];
        QueueSpecific.value.forEach((q) => {
          if (q.is_current === 1) {
            currentPatient.value = q;
          } else if (q.is_current === 0 && q.is_priority === 1) {
            priorityPatients.value.push(q);
          } else if (q.is_current === 0 && q.is_priority === 0) {
            otherPatients.value.push(q);
          }
        });
      }
    );

    const callInNextPriority = () => {
      Loading.show();
      CallNextPatient({
        current_patient:
          currentPatient.value !== null ? currentPatient.value.queue_id : null,
        next_patient: priorityPatients.value[0].queue_id,
      }).then((response) => {
        Loading.hide();
        priorityPatients.value = [];
        otherPatients.value = [];
        GetQueueSpecific(dept.value);
      });
    };

    const callInNextPatient = () => {
      Loading.show();
      CallNextPatient({
        current_patient:
          currentPatient.value !== null ? currentPatient.value.queue_id : null,
        next_patient: otherPatients.value[0].queue_id,
      }).then((response) => {
        Loading.hide();
        priorityPatients.value = [];
        otherPatients.value = [];
        GetQueueSpecific(dept.value);
      });
    };

    let showPriority = ref(false);
    let showOthers = ref(false);

    let isRestoreDB = ref(false);

    const backupDB = () => {
      BackupDatabase().then((response) => {
        if (response.status === "success") {
          $q.notify({
            type: "positive",
            classes: "text-white",
            message: "Database backed up successfully",
          });
        } else {
          $q.notify({
            type: "negative",
            classes: "text-white",
            message: "Failed to back up database",
          });
        }
      });
    };

    const restoreDB = () => {
      RestoreDatabase().then((response) => {
        if (response.status === "success") {
          $q.notify({
            type: "positive",
            classes: "text-white",
            message: "Database restored successfully",
          });
        } else {
          $q.notify({
            type: "negative",
            classes: "text-white",
            message: "Failed to restore database",
          });
        }

        isRestoreDB.value = false;
      });
    };

    return {
      selected,
      options,
      departmentList,
      selectedDepartment,
      getDepartments,
      QueueSpecific,
      keySession,
      removeFromQueue,
      currentPatient,
      priorityPatients,
      otherPatients,
      callInNextPriority,
      callInNextPatient,
      showPriority,
      showOthers,
      backupDB,
      restoreDB,
      isRestoreDB,
    };
  },
};
