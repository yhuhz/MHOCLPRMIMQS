import { ref } from "vue";
import { DashboardData, GetDashboardData } from "src/composables/Dashboard";
import { useQuasar, SessionStorage, Loading } from "quasar";

export default {
  setup() {
    //Session Storage
    let keySession = SessionStorage.getItem("cred");

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

    return {
      selected,
      options,
      DashboardData,
      setDashboard,
    };
  },
};
