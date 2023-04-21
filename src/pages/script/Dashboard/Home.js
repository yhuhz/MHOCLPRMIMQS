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

    //Session Storage
    let keySession = SessionStorage.getItem("cred");
    if (!keySession) {
      router.push({ name: "login" });
    }

    let selected = ref("This Week");
    let options = ["This Week", "This Month", "This Year"];

    let payload = {
      filter: selected.value,
      department: keySession && keySession.department,
    };

    const renderChartFunc = throttle(() => {
      // code to render chart
    }, 500);

    Loading.show();
    GetDashboardData(payload).then((response) => {
      renderChart();
      Loading.hide();
    });

    const setDashboard = () => {
      totalinStockMedicine.value = 0;
      totalinStockSupply.value = 0;
      let payload = {
        filter: selected.value,
        department: keySession && keySession.department,
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
      if (keySession && keySession.department === 1) {
        departmentList.value = ["OPD"];
      } else if (keySession && keySession.department === 2) {
        departmentList.value = ["Dental"];
      } else if (keySession && keySession.department === 3) {
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

    /**CHARTS**/

    let chartToRender = ref(1);
    let patientData = ref({});
    let medicineData = ref({});
    let supplyData = ref({});
    let diseaseData = ref({});

    //Med Count Total
    let totalinStockMedicine = ref(0);
    let totalinStockSupply = ref(0);

    watch(
      () => _.cloneDeep(DashboardData.value),
      () => {
        //Patients
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

        //Medicine
        DashboardData.value.medicine_count.forEach((m) => {
          totalinStockMedicine.value = totalinStockMedicine.value + m.in_stock;
        });

        let medicineLabel = [];
        DashboardData.value.medicine_count.forEach((e) => {
          medicineLabel.push(e.med_classification);
        });

        let medicineDataArray = [];
        DashboardData.value.medicine_count.forEach((e) => {
          medicineDataArray.push(e.in_stock);
        });

        medicineData.value = {
          type: "bar",
          labels: medicineLabel,
          label: "Number of Medicines in stock",
          data: medicineDataArray,
        };

        //Supply
        DashboardData.value.supply_count.forEach((s) => {
          totalinStockSupply.value = totalinStockSupply.value + s.in_stock;
        });

        let supplyLabel = [];
        DashboardData.value.supply_count.forEach((e) => {
          supplyLabel.push(e.supply_type);
        });

        let supplyDataArray = [];
        DashboardData.value.supply_count.forEach((e) => {
          supplyDataArray.push(e.in_stock);
        });

        supplyData.value = {
          type: "bar",
          labels: supplyLabel,
          label: "Number of Supplies in stock",
          data: supplyDataArray,
        };

        //Diseases
        let diseaseLabel = [];
        DashboardData.value.diseases.forEach((e) => {
          diseaseLabel.push(e.opd_disease);
        });

        let diseaseDataArray = [];
        DashboardData.value.diseases.forEach((e) => {
          diseaseDataArray.push(e.count);
        });

        diseaseData.value = {
          type: "bar",
          labels: diseaseLabel,
          label: "Number of Patients afflicted",
          data: diseaseDataArray,
        };
      }
    );
    const chart = ref(null);

    const renderChart = throttle(() => {
      if (chart.value) {
        chart.value.destroy();
      }

      const ctx = document.getElementById("myChart");

      if (chartToRender.value === 1) {
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
                  "rgba(215, 85, 85, 0.5)",
                  "rgba(85, 161, 94, 0.5)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            animation: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else if (chartToRender.value === 2) {
        chart.value = new Chart(ctx, {
          type: medicineData.value.type,
          data: {
            labels: medicineData.value.labels,
            datasets: [
              {
                label: medicineData.value.label,
                data: medicineData.value.data,
                backgroundColor: [
                  "rgba(222, 187, 42, 0.5)",
                  "rgba(41, 119, 232, 0.5)",
                  "rgba(215, 85, 85, 0.5)",
                  "rgba(85, 161, 94, 0.5)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            animation: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else if (chartToRender.value === 3) {
        chart.value = new Chart(ctx, {
          type: supplyData.value.type,
          data: {
            labels: supplyData.value.labels,
            datasets: [
              {
                label: supplyData.value.label,
                data: supplyData.value.data,
                backgroundColor: [
                  "rgba(222, 187, 42, 0.5)",
                  "rgba(41, 119, 232, 0.5)",
                  "rgba(215, 85, 85, 0.5)",
                  "rgba(85, 161, 94, 0.5)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            animation: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else if (chartToRender.value === 4) {
        chart.value = new Chart(ctx, {
          type: diseaseData.value.type,
          data: {
            labels: diseaseData.value.labels,
            datasets: [
              {
                label: diseaseData.value.label,
                data: diseaseData.value.data,
                backgroundColor: [
                  "rgba(222, 187, 42, 0.5)",
                  "rgba(41, 119, 232, 0.5)",
                  "rgba(215, 85, 85, 0.5)",
                  "rgba(85, 161, 94, 0.5)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            animation: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        chart.value = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1,
              },
            ],
          },
          options: {
            animation: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }, 0);

    const chartDiv = ref(null);
    const chartHeight = ref(null);

    onMounted(() => {
      setTimeout(() => {
        const rect = chartDiv.value.getBoundingClientRect();
        chartHeight.value = rect.height;
        // console.log("myDivHeight:", chartHeight.value);
      }, 1000);
    });

    watch(chartHeight, () => {
      if (chart.value) {
        chart.value.resize();
      }
    });

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
      chartToRender,
      totalinStockMedicine,
      totalinStockSupply,
      currentPatient,
      priorityPatients,
      otherPatients,
      callInNextPriority,
      callInNextPatient,
      chartDiv,
      chartHeight,
    };
  },
};
