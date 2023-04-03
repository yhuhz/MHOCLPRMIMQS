import { ref } from "vue";
import { DashboardData, GetDashboardData } from "src/composables/Dashboard";
import { useQuasar, SessionStorage } from "quasar";

export default {
  setup() {
    //Session Storage
    let keySession = SessionStorage.getItem("cred");

    let selected = ref("This Week");
    let options = ["This Week", "This Month", "This Year"];

    let payload = {
      filter: selected.value,
      department: keySession.department,
    };

    GetDashboardData(payload);

    const setDashboard = () => {
      let payload = {
        filter: selected.value,
        department: keySession.department,
      };

      GetDashboardData(payload);
    };

    return {
      selected,
      options,
      DashboardData,
      setDashboard,
    };
  },
};
