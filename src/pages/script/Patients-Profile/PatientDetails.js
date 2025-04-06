import { ref, watch, onMounted } from "vue";
import MHCDialog from "../../../components/MHCDialog.vue";
import DeletePatientConfirmation from "../../Components/DeletePatientConfirmation";
import { ToggleDialogState } from "../../../composables/Triggers";
import { FindPatient, PatientDetails } from "src/composables/Patients";

import { GetRecords, PatientRecords } from "src/composables/Records";

import { FindRecordDetails } from "src/composables/Records";
import _ from "lodash";
import { useQuasar, SessionStorage, Loading } from "quasar";
import { exportFile } from "quasar";
import { useRoute, useRouter } from "vue-router";
import {
  RemovePatientFromQueue,
  GetQueueSpecific,
  QueueSpecific,
  DonePatient,
  CallNextPatient,
} from "src/composables/Queue";

export default {
  components: { MHCDialog, DeletePatientConfirmation },
  setup() {
    const route = useRoute();
    const router = useRouter();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    let date_today = new Date().toLocaleDateString("en-CA");

    Loading.show();

    FindPatient({ patient_id: route.params.id }).then((response) => {
      Loading.hide();
    });

    let name = ref(null);
    let status = ["Active", "Deceased", "Deleted"];
    let sex = ["Male", "Female"];
    let departmentList = ref([]);
    let selectedDepartment = ref(null);

    if (
      keySession &&
      (keySession.department === 1 || keySession.department === 5)
    ) {
      departmentList.value = ["OPD"];
      selectedDepartment.value = route.params.department
        ? route.params.department
        : route.params.department_queue
        ? route.params.department_queue
        : "OPD";
    } else if (keySession && keySession.department === 2) {
      departmentList.value = ["Dental"];
      selectedDepartment.value = route.params.department
        ? route.params.department
        : route.params.department_queue
        ? route.params.department_queue
        : "Dental";
    } else if (keySession && keySession.department === 3) {
      if (PatientDetails.value.sex === 1) {
        departmentList.value = ["Prenatal", "Immunization"];
        selectedDepartment.value = route.params.department
          ? route.params.department
          : route.params.department_queue
          ? route.params.department_queue
          : "Prenatal";
      } else {
        departmentList.value = ["Immunization"];
        selectedDepartment.value = route.params.department
          ? route.params.department
          : route.params.department_queue
          ? route.params.department_queue
          : "Immunization";
      }
    } else {
      if (PatientDetails.value.sex != 1) {
        departmentList.value = ["OPD", "Dental", "Immunization"];
        selectedDepartment.value = route.params.department
          ? route.params.department
          : route.params.department_queue
          ? route.params.department_queue
          : "OPD";
      } else {
        departmentList.value = ["OPD", "Dental", "Prenatal", "Immunization"];
        selectedDepartment.value = route.params.department
          ? route.params.department
          : route.params.department_queue
          ? route.params.department_queue
          : "OPD";
      }
    }

    watch(
      () => _.cloneDeep(PatientDetails.value),
      () => {
        FindPatient({ patient_id: route.params.id });
        name.value =
          PatientDetails.value.first_name +
          (PatientDetails.value.middle_name === null
            ? ""
            : " " + PatientDetails.value.middle_name) +
          " " +
          PatientDetails.value.last_name +
          (PatientDetails.value.suffix === null
            ? ""
            : " " + PatientDetails.value.suffix);

        if (
          keySession &&
          keySession.department === 5 &&
          selectedDepartment.value === "OPD"
        ) {
          isbtnDisabled.value = false;
        } else if (
          keySession &&
          keySession.department === 2 &&
          selectedDepartment.value === "Dental"
        ) {
          isbtnDisabled.value = false;
        } else if (
          keySession &&
          keySession.department === 3 &&
          (selectedDepartment.value === "Prenatal" ||
            selectedDepartment.value === "Immunization")
        ) {
          isbtnDisabled.value = false;
        }
      }
    );

    if (selectedDepartment.value != null) {
      GetRecords({
        patient_id: route.params.id,
        record_type: selectedDepartment.value,
      }).then((response) => {});
    }

    let columns = [
      {
        name: "record",
        align: "left",
        label: "Record",
        field: (row) =>
          selectedDepartment.value === "OPD"
            ? "OPD" + row.record_id
            : selectedDepartment.value === "Dental"
            ? "DNTL" + row.record_id
            : selectedDepartment.value === "Prenatal"
            ? "PNL" + row.record_id
            : "IMZN" + row.record_id,
        sortable: true,
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
        sortable: true,
      },
    ];

    let isbtnDisabled = ref(true);

    let departments = ["OPD", "Dental", "Prenatal", "Immunization"];

    if (selectedDepartment.value === "Immunization") {
      if (keySession.department === 3 || keySession.department === 5) {
        isbtnDisabled.value = false;
      } else {
        isbtnDisabled.value = true;
      }
    } else {
      if (
        keySession &&
        (keySession.department ===
          departments.indexOf(selectedDepartment.value) + 1 ||
          keySession.department === 5)
      ) {
        isbtnDisabled.value = false;
      } else {
        isbtnDisabled.value = true;
      }
    }

    const getRecords = () => {
      // changeDept();
      GetRecords({
        patient_id: route.params.id,
        record_type: selectedDepartment.value,
      }).then((response) => {});

      if (selectedDepartment.value === "Immunization") {
        if (keySession.department === 3) {
          isbtnDisabled.value = false;
        } else {
          isbtnDisabled.value = true;
        }
      } else {
        if (
          keySession &&
          (keySession.department ===
            departments.indexOf(selectedDepartment.value) + 1 ||
            keySession.department === 5)
        ) {
          isbtnDisabled.value = false;
        } else {
          isbtnDisabled.value = true;
        }
      }
    };

    const onRowClick = (evt, row) => {
      Loading.show();
      FindRecordDetails(row.record_id, selectedDepartment.value).then(
        (response) => {
          Loading.hide();
        }
      );
      if (route.params.queue) {
        router.push({
          name: selectedDepartment.value + "/patient_records",
          params: {
            record_id: row.record_id,
            department: selectedDepartment.value,
            queue: route.params.queue,
          },
        });
      } else {
        router.push({
          name: selectedDepartment.value + "/patient_records",
          params: {
            record_id: row.record_id,
            department: selectedDepartment.value,
          },
        });
      }
    };

    const openDialog = () => {
      ToggleDialogState();
    };

    let isRemoveFromCurrentQueue = ref(false);
    const removeCurrentPatient = () => {
      Loading.show();
      RemovePatientFromQueue({ queue_id: route.params.queue }).then(
        (response) => {
          isRemoveFromCurrentQueue.value = false;
          Loading.hide();

          if (response.status === "success") {
            router.push({ name: "home" });
          } else {
            $q.notify({
              type: "negative",
              classes: "text-white",
              message: "Failed to remove patient from queue",
            });
          }
        }
      );
    };

    let dept = ref(null);
    let currentPatient = ref(null);
    let priorityPatients = ref([]);
    let otherPatients = ref([]);

    if (route.params.queue) {
      dept.value = keySession && keySession.department;

      GetRecords({
        patient_id: route.params.id,
        record_type: selectedDepartment.value,
      }).then((response) => {
        if (
          keySession &&
          keySession.department === 1 &&
          response.data.length !== 0
        ) {
          let record = response.data[0];
          console.log("res", record);
          FindRecordDetails(record.record_id, "OPD").then((response) => {
            console.log(response);
            Loading.hide();

            if (response.status === "success") {
              router.push({
                name: "OPD/patient_records",
                params: {
                  record_id: record.record_id,
                  department: selectedDepartment.value,
                  queue: route.params.queue,
                },
              });
            }
          });
        }
      });

      GetQueueSpecific(dept.value).then((response) => {});

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
    }

    const callInNextPriority = () => {
      Loading.show();
      RemovePatientFromQueue({ queue_id: route.params.queue }).then(
        (response) => {
          CallNextPatient({
            current_patient: null,
            next_patient: priorityPatients.value[0].queue_id,
            department: dept.value,
            priority: 1,
          }).then((response) => {
            Loading.hide();
            priorityPatients.value = [];
            otherPatients.value = [];
            GetQueueSpecific(dept.value).then((response) => {
              router.push({
                name: "patient-details",
                params: {
                  id: currentPatient.value.patient_id,
                  queue: currentPatient.value.queue_id,
                },
              });
              isRemoveFromCurrentQueue.value = false;
              isDonePatient.value = false;
            });
          });
        }
      );
    };

    const callInNextPatient = () => {
      Loading.show();
      RemovePatientFromQueue({ queue_id: route.params.queue }).then(
        (response) => {
          CallNextPatient({
            current_patient: null,
            next_patient: otherPatients.value[0].queue_id,
            department: dept.value,
            priority: 0,
          }).then((response) => {
            Loading.hide();
            priorityPatients.value = [];
            otherPatients.value = [];
            GetQueueSpecific(dept.value).then((response) => {
              router.push({
                name: "patient-details",
                params: {
                  id: currentPatient.value.patient_id,
                  queue: currentPatient.value.queue_id,
                },
              });
              isRemoveFromCurrentQueue.value = false;
              isDonePatient.value = false;
            });
          });
        }
      );
    };

    const doneCurrentPatient = () => {
      Loading.show();
      RemovePatientFromQueue({ queue_id: route.params.queue }).then(
        (response) => {
          Loading.hide();
          currentPatient.value = null;
          priorityPatients.value = [];
          otherPatients.value = [];
          router.push({ name: "home" });
        }
      );
    };

    let isDonePatient = ref(false);

    if (
      route.params.queue &&
      keySession &&
      keySession.department !== 2 &&
      keySession.department !== 3 &&
      keySession.permission_level !== 3
    ) {
      router.push({
        name: route.params.department_queue + "/patient_records/new",
        params: {
          department: route.params.department_queue,
          queue: route.params.queue,
        },
      });
    } else if (
      route.params.queue &&
      keySession &&
      keySession.department === 3 &&
      keySession.permission_level !== 3
    ) {
      GetRecords({
        patient_id: route.params.id,
        record_type: selectedDepartment.value,
      }).then((response) => {
        if (
          response.data.length > 0 &&
          selectedDepartment.value === "Prenatal"
        ) {
          let record = response.data[0];
          console.log("res", record);
          FindRecordDetails(record.record_id, selectedDepartment.value).then(
            (response) => {
              console.log(response);
              Loading.hide();

              if (response.status === "success") {
                router.push({
                  name: selectedDepartment.value + "/patient_records",
                  params: {
                    record_id: record.record_id,
                    department: selectedDepartment.value,
                    queue: route.params.queue,
                  },
                });
              }
            }
          );
        } else {
          router.push({
            name: route.params.department_queue + "/patient_records/new",
            params: {
              department: route.params.department_queue,
              queue: route.params.queue,
            },
          });
        }
      });
    }

    return {
      openDialog,
      keySession,
      PatientDetails,
      name,
      status,
      sex,
      columns,
      departmentList,
      selectedDepartment,
      getRecords,
      PatientRecords,
      onRowClick,
      isbtnDisabled,
      isRemoveFromCurrentQueue,
      removeCurrentPatient,
      currentPatient,
      priorityPatients,
      otherPatients,
      callInNextPriority,
      callInNextPatient,
      doneCurrentPatient,
      isDonePatient,
      date_today,
    };
  },
};
