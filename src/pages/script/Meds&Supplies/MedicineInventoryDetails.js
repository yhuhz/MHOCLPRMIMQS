import { ref, watch } from "vue";
import _ from "lodash";
import {
  FindMedicineDetails,
  MedicineDetails,
  MedicineRelease,
  FindMedicineRelease,
  AddMedicineRelease,
  EditMedicineRelease,
} from "src/composables/Medicine";

import { FindPatients } from "src/composables/Patients";
import {
  FindUsersByName,
  FindUsersByID,
  FindUsersDepartment,
} from "src/composables/Manage_Users";
import { Loading, useQuasar, SessionStorage, date } from "quasar";
import { useRoute, useRouter } from "vue-router";
import DeleteMedicineConfirmation from "../../Components/DeleteMedicineConfirmation.vue";
import { ToggleDialogState } from "../../../composables/Triggers";
import MHCDialog from "../../../components/MHCDialog.vue";
import { SetIDS } from "src/composables/IDS";
import exportFile from "quasar/src/utils/export-file.js";

export default {
  components: { MHCDialog, DeleteMedicineConfirmation },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    Loading.show();
    FindMedicineDetails(route.params.medicine_id).then((response) => {
      Loading.hide();
    });

    let medicineDetails = ref({});
    watch(
      () => _.cloneDeep(MedicineDetails.value),
      () => {
        medicineDetails.value = {
          medicine_id: route.params.medicine_id,
          generic_name: MedicineDetails.value.generic_name,
          brand_name: MedicineDetails.value.brand_name,
          med_classification: MedicineDetails.value.med_classification,
          dosage_form: MedicineDetails.value.dosage_form,
          dosage_strength: MedicineDetails.value.dosage_strength,
          ptr_number: MedicineDetails.value.ptr_number,
          batch_lot_number: MedicineDetails.value.batch_lot_number,
          mfg_date: MedicineDetails.value.mfg_date,
          exp_date: MedicineDetails.value.exp_date,
          date_added: MedicineDetails.value.date_added,
          quantity: MedicineDetails.value.quantity,
          quantity_released: MedicineDetails.value.quantity_released,
          in_stock:
            MedicineDetails.value.quantity -
            MedicineDetails.value.quantity_released,
          procured_by: MedicineDetails.value.procured_by,
          status: MedicineDetails.value.status,
        };
      }
    );

    let status_list = ["Active", "Deleted"];

    const columns = ref([
      {
        name: "med_release_id",
        align: "left",
        label: "Release ID",
        field: "med_release_id",
        sortable: true,
      },
      {
        name: "medicine_id",
        align: "left",
        label: "Medicine ID",
        field: "medicine_id",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => (row.patient_id ? row.patient_name : row.doctor_name),
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
        name: "quantity",
        align: "left",
        label: "Quantity",
        field: "quantity",
        sortable: true,
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "release_date",
        sortable: true,
      },
      {
        name: "status",
        align: "left",
        label: "Status",
        field: "status",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "action",
        sortable: false,
      },
    ]);

    /**** Filters ****/
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

    let releaseTo = ref(["Patients", "Staff"]);
    let selectedReleaseTo = ref([0, 1]);

    let filterStatus = ref(["Active", "Deleted"]);
    let selectedFilterStatus = ref([0]);
    let quantityReleased = ref([0, 1000]);
    let dateReleased = ref([]);

    let loading = ref(false);

    //Fetch data on load
    let payload = {
      medicine_id: route.params.medicine_id,
      department: selectedFiltersDepartment.value,
      released_to: selectedReleaseTo.value,
      status: selectedFilterStatus.value,
      quantity_released: quantityReleased.value,
      date_release: dateReleased.value,
    };

    FindMedicineRelease(payload);

    const search = () => {
      loading.value = true;
      let payload = {
        medicine_id: route.params.medicine_id,
        department: selectedFiltersDepartment.value,
        released_to: selectedReleaseTo.value,
        status: selectedFilterStatus.value,
        quantity_released: quantityReleased.value,
        date_release: dateReleased.value,
      };
      // console.log("payload", payload);

      FindMedicineRelease(payload).then((response) => {
        loading.value = false;
      });
    };

    /**ADD MEDICINE RELEASE RECORD**/
    let isAddNewMedicineRelease = ref(false);
    let selectedReleaseCategory = ref("patient");
    let patient_doctor_id = ref(null);
    let newMedicineRelease = ref({
      medicine_id: route.params.medicine_id,
      patient_id: null,
      doctor_id: null,
      department: null,
      quantity: null,
      released_by: keySession && keySession.user_id,
      release_date: date.formatDate(new Date(), "YYYY-MM-DD"),
    });

    const findDepartment = () => {
      if (newMedicineRelease.value.doctor_id !== null) {
        FindUsersDepartment(newMedicineRelease.value.doctor_id).then(
          (response) => {
            newMedicineRelease.value.department =
              filtersDepartment[response.data[0].department - 1];
          }
        );
      } else {
        newMedicineRelease.value.department = null;
      }
    };

    const onReset = () => {
      newMedicineRelease.value = {
        medicine_id: route.params.medicine_id,
        patient_id: null,
        doctor_id: null,
        department: null,
        quantity: null,
        released_by: keySession && keySession.user_id,
        release_date: date.formatDate(new Date(), "YYYY-MM-DD"),
      };

      patient_doctor_id.value = null;
    };

    const addReleaseRecord = () => {
      newMedicineRelease.value.department =
        filtersDepartment.indexOf(newMedicineRelease.value.department) + 1;

      console.log(newMedicineRelease.value);

      Loading.show();
      AddMedicineRelease(newMedicineRelease.value).then((response) => {
        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Medicine release record added successfully"
              : "Failed to add medicine release record",
        });

        FindMedicineDetails(route.params.medicine_id).then((response) => {
          Loading.hide();
        });
        status === 0 && onReset();
        isAddNewMedicineRelease.value = false;
      });
    };

    /**EDIT MEDICINE RELEASE RECORD**/
    let isEditMedicineRelease = ref(false);

    const openEditModal = (med_release_info) => {
      isEditMedicineRelease.value = true;

      selectedReleaseCategory.value =
        med_release_info.patient_id !== null &&
        med_release_info.patient_id !== ""
          ? "patient"
          : "others";

      newMedicineRelease.value = {
        med_release_id: med_release_info.med_release_id,
        medicine_id: route.params.medicine_id,
        patient_id: med_release_info.patient_id,
        doctor_id: med_release_info.doctor_id,
        department: filtersDepartment[med_release_info.department - 1],
        quantity: med_release_info.quantity,
        released_by: med_release_info.released_by,
        release_date: med_release_info.release_date,
      };
    };

    const onChangeUserPatient = () => {
      newMedicineRelease.value.department = null;
      newMedicineRelease.value.patient_id = null;
      newMedicineRelease.value.doctor_id = null;
    };

    let patientOptions = ref([]);

    const patientFilterFunction = (val, update, abort) => {
      if (val && (val.length > 5 || !isNaN(val))) {
        update(() => {
          if (isNaN(val)) {
            const needle = String(val.toLowerCase());
            FindPatients({ name_string: needle }).then((response) => {
              patientOptions.value = [];
              if (response.status === "success") {
                let Patients = ref([]);
                Patients.value = response.data;
                Patients.value.forEach((p) => {
                  let selectValues = {
                    patient_name: p.patient_id + " - " + p.name,
                    patient_id: p.patient_id,
                  };
                  patientOptions.value.push(selectValues);
                });
              }
            });
          } else {
            FindPatients({ id_string: val }).then((response) => {
              patientOptions.value = [];
              if (response.status === "success") {
                let Patients = ref([]);
                Patients.value = response.data;
                Patients.value.forEach((p) => {
                  let selectValues = {
                    patient_name: p.patient_id + " - " + p.name,
                    patient_id: p.patient_id,
                  };
                  patientOptions.value.push(selectValues);
                });
              }
            });
          }
        });
      } else {
        abort();
      }
    };

    let userOptions = ref([]);
    const userFilterFunction = (val, update, abort) => {
      if (val.length > 5 || !isNaN(val)) {
        update(() => {
          if (isNaN(val)) {
            const needle = String(val.toLowerCase());
            FindUsersByName(needle).then((response) => {
              userOptions.value = [];
              if (response.status === "success") {
                let Users = ref([]);
                Users.value = response.data;
                Users.value.forEach((p) => {
                  let selectValues = {
                    user_name: p.id + " - " + p.user_name,
                    department: p.department,
                    user_id: p.id,
                  };
                  userOptions.value.push(selectValues);
                });
              }
            });
          } else {
            FindUsersByID(val).then((response) => {
              userOptions.value = [];
              if (response.status === "success") {
                let Users = ref([]);
                Users.value = response.data;
                Users.value.forEach((p) => {
                  let selectValues = {
                    user_name: p.id + " - " + p.user_name,
                    department: p.department,
                    user_id: p.id,
                  };
                  userOptions.value.push(selectValues);
                });
              }
            });
          }
        });
      } else {
        abort();
      }
    };

    const editMedicineRelease = () => {
      newMedicineRelease.value.department =
        filtersDepartment.indexOf(newMedicineRelease.value.department) + 1;

      // console.log(newMedicineRelease.value);
      EditMedicineRelease(newMedicineRelease.value).then((response) => {
        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Medicine release record edited successfully"
              : "Failed to edit medicine release record",
        });

        FindMedicineDetails(route.params.medicine_id).then((response) => {
          Loading.hide();
        });
        isEditMedicineRelease.value = false;
      });
    };

    /**DELETE MEDICINE RELEASE RECORD**/
    const openDialog = (medicine_release_id) => {
      SetIDS({
        med_release_id: medicine_release_id,
        medicine_id: route.params.medicine_id,
      });
      ToggleDialogState();
    };

    /**EXPORT TABLE**/
    const wrapCsvValue = (val, formatFn, row) => {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      formatted = formatted.split('"').join('""');
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`;
    };

    const exportTable = () => {
      // naive encoding to csv format
      const content = [columns.value.map((col) => wrapCsvValue(col.label))]
        .concat(
          MedicineRelease.value.map((row) =>
            columns.value
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile(
        "Medicine Release for Medicine ID " +
          route.params.medicine_id +
          " Records.csv",
        content,
        "text/csv"
      );

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    };

    return {
      columns,
      isAddNewMedicineRelease,
      selectedReleaseCategory,
      filtersDepartment,
      selectedFiltersDepartment,
      releaseTo,
      selectedReleaseTo,
      filterStatus,
      selectedFilterStatus,
      MedicineDetails,
      MedicineRelease,
      medicineDetails,
      status_list,
      select_all_dept_change,
      dept_checkbox_disable,
      select_all_dept,
      loading,
      quantityReleased,
      dateReleased,
      search,
      openDialog,
      exportTable,
      newMedicineRelease,
      patient_doctor_id,
      addReleaseRecord,
      onReset,
      isEditMedicineRelease,
      newMedicineRelease,
      openEditModal,
      editMedicineRelease,
      patientFilterFunction,
      patientOptions,
      userFilterFunction,
      userOptions,
      keySession,
      onChangeUserPatient,
      findDepartment,
    };
  },
};
