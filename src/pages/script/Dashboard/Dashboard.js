import { ref, watch, onMounted } from "vue";
import _ from "lodash";
import { DashboardData, GetDashboardData } from "src/composables/Dashboard";
import { useQuasar, SessionStorage, Loading } from "quasar";
import { GetQueueSpecific, QueueSpecific } from "src/composables/Queue";
import MHCDialog from "../../../components/MHCDialog.vue";
import RemovePatientFromQueue from "../../Components/RemovePatientFromQueue";
import { ToggleDialogState } from "../../../composables/Triggers";
import { SetIDS } from "src/composables/IDS";
import Chart from "chart.js/auto";

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
        renderChart();
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

    let chartToRender = ref(0);
    let patientData = ref({});
    let medicineData = ref({});
    let supplyData = ref({});
    let diseaseData = ref({});

    watch(
      () => _.cloneDeep(DashboardData.value),
      () => {
        // patientData.value = {
        //   type: "bar",
        //   labels: ["OPD", "Dental", "Prenatal", "Immunization"],
        //   datasets: [
        //     {
        //       label: "Number of Patients",
        //       data: [
        //         DashboardData.value.opd_count,
        //         DashboardData.value.dental_count,
        //         DashboardData.value.prenatal_count,
        //         DashboardData.value.immunization_count,
        //       ],
        //       borderWidth: 1,
        //     },
        //   ],
        // };

        patientData.value = {
          type: "bar",
          labels: ["OPD", "Dental", "Prenatal", "Immunization"],
          label: "Number of New Records",
          data: [
            DashboardData.value.opd_count,
            DashboardData.value.dental_count,
            DashboardData.value.prenatal_count,
            DashboardData.value.immunization_count,
          ],
        };

        medicineData.value = {
          type: "bar",
          labels: ["OPD", "Dental", "Prenatal", "Immunization"],
          label: "Number of New Records",
          data: [
            DashboardData.value.opd_count,
            DashboardData.value.dental_count,
            DashboardData.value.prenatal_count,
            DashboardData.value.immunization_count,
          ],
        };
      }
    );
    const chart = ref(null);

    const renderChart = () => {
      if (chart.value) {
        chart.value.destroy();
      }

      const ctx = document.getElementById("myChart");

      //   chart.value = new Chart(ctx, {
      //     type: "bar",
      //     data: {
      //       labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      //       datasets: [
      //         {
      //           label: "# of Votes",
      //           data: [12, 19, 3, 5, 2, 3],
      //           borderWidth: 1,
      //         },
      //       ],
      //     },
      //     options: {
      //       scales: {
      //         y: {
      //           beginAtZero: true,
      //         },
      //       },
      //     },
      //   });
      // };

      chart.value = new Chart(ctx, {
        type: patientData.value.type,
        data: {
          labels: patientData.value.labels,
          datasets: [
            {
              label: patientData.value.label,
              data: patientData.value.data,
              backgroundColor: [
                "rgba(222, 187, 42, 0.5)",
                "rgba(41, 119, 232, 0.5)",
                "rgba(85, 161, 94, 0.5)",
                "rgba(215, 85, 85, 0.5)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    // onMounted(() => {
    //   renderChart();
    // });

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
      chart,
      renderChart,
    };
  },
};
