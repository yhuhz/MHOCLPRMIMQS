import { ref, watch } from "vue";
import _ from "lodash";
import {
  GetReport,
  PatientData,
  MedicineData,
  SupplyData,
  SelectedDate,
} from "src/composables/Reports";
import { Loading, SessionStorage } from "quasar";

export default {
  setup() {
    //SESSION KEYS
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    const medicineColumns = ref([
      {
        name: "med_classification",
        align: "left",
        field: "med_classification",
      },
      {
        name: "quantity",
        align: "left",
        label: "Qty Received",
        field: "quantity",
      },
      {
        name: "released_filtered",
        align: "left",
        label: "Recent Release",
        field: "released_filtered",
      },
      {
        name: "released",
        align: "left",
        label: "Total Released",
        field: "released",
      },
      {
        name: "in_stock",
        align: "left",
        label: "In Stock",
        field: "in_stock",
      },
    ]);

    const supplyColumns = ref([
      {
        name: "supply_type",
        align: "left",
        field: "supply_type",
      },
      {
        name: "quantity",
        align: "left",
        label: "Qty Received",
        field: "quantity",
      },
      {
        name: "released_filtered",
        align: "left",
        label: "Recent Release",
        field: "released_filtered",
      },
      {
        name: "released",
        align: "left",
        label: "Total Released",
        field: "released",
      },
      {
        name: "in_stock",
        align: "left",
        label: "In Stock",
        field: "in_stock",
      },
    ]);

    const rows = ref([
      {
        name: "Syringe",
        addedRecently: 150,
        released: 10,
        inStock: 140,
      },
      {
        name: "Gloves",
        addedRecently: 100,
        released: 20,
        inStock: 150,
      },
      {
        name: "Disposable Supplies",
        addedRecently: 30,
        released: 5,
        inStock: 67,
      },
      {
        name: "IV",
        addedRecently: 15,
        released: 3,
        inStock: 20,
      },
    ]);

    let options = ["This Week", "This Month", "This Year", "Custom Dates"];
    let selected = ref("This Week");
    let isCustomDate = ref(false);
    let customDate = ref([]);
    let isDisabled = ref(false);
    let dateToShow = ref([]);

    const onChangeDate = () => {
      if (selected.value === "Custom Dates") {
        isCustomDate.value = true;
      } else {
        isCustomDate.value = false;
      }
    };

    watch(
      () => _.cloneDeep(SelectedDate.value),
      () => {
        dateToShow.value = SelectedDate.value;
      }
    );

    /**PATIENT REPORTS**/
    let isPatientReport = ref(false);
    let patientReport = ref({
      date: null,
      household: null,
      pwd: null,
      sc: null,
      patients: null,
      opd: null,
      dental: null,
      prenatal: null,
      prenatal_checkup: null,
      immunization: null,
    });

    const generatePatientReport = () => {
      if (isCustomDate.value === true) {
        if (customDate.value[0] != null && customDate.value[1] != null) {
          Loading.show();
          GetReport(customDate.value, "Patient").then((response) => {
            Loading.hide();

            isPatientReport.value = true;
            isMedicineReport.value = false;
            isSuppliesReport.value = false;
          });
        }
      } else if (isCustomDate.value === false) {
        Loading.show();
        GetReport(selected.value, "Patient").then((response) => {
          Loading.hide();

          isPatientReport.value = true;
          isMedicineReport.value = false;
          isSuppliesReport.value = false;
        });
      }
    };

    watch(
      () => _.cloneDeep(PatientData.value),
      () => {
        patientReport.value = {
          date: PatientData.value.date_filter,
          household: PatientData.value.household_count,
          pwd: PatientData.value.pwd_count,
          sc: PatientData.value.sc_count,
          patients: PatientData.value.patient_count,
          opd: PatientData.value.opd_count,
          dental: PatientData.value.dental_count,
          prenatal: PatientData.value.prenatal_count,
          prenatal_checkup: PatientData.value.prenatal_checkup_count,
          immunization: PatientData.value.immunization_count,
        };
      }
    );

    /**MEDICINE REPORTS**/
    let isMedicineReport = ref(false);

    const generateMedicineReport = () => {
      if (isCustomDate.value === true) {
        if (customDate.value[0] != null && customDate.value[1] != null) {
          Loading.show();
          GetReport(customDate.value, "Medicine").then((response) => {
            Loading.hide();

            isPatientReport.value = false;
            isMedicineReport.value = true;
            isSuppliesReport.value = false;
          });
        }
      } else if (isCustomDate.value === false) {
        Loading.show();
        GetReport(selected.value, "Medicine").then((response) => {
          Loading.hide();

          isPatientReport.value = false;
          isMedicineReport.value = true;
          isSuppliesReport.value = false;
        });
      }
    };

    /**SUPPLIES REPORTS**/
    let isSuppliesReport = ref(false);

    const generateSupplyReport = () => {
      if (isCustomDate.value === true) {
        if (customDate.value[0] != null && customDate.value[1] != null) {
          Loading.show();
          GetReport(customDate.value, "Supply").then((response) => {
            Loading.hide();

            isPatientReport.value = false;
            isMedicineReport.value = false;
            isSuppliesReport.value = true;
          });
        }
      } else if (isCustomDate.value === false) {
        Loading.show();
        GetReport(selected.value, "Supply").then((response) => {
          Loading.hide();

          isPatientReport.value = false;
          isMedicineReport.value = false;
          isSuppliesReport.value = true;
        });
      }
    };

    return {
      medicineColumns,
      rows,
      isPatientReport,
      isMedicineReport,
      isSuppliesReport,
      options,
      selected,
      isCustomDate,
      onChangeDate,
      customDate,
      generatePatientReport,
      generateMedicineReport,
      generateSupplyReport,
      patientReport,
      PatientData,
      MedicineData,
      dateToShow,
      SupplyData,
      supplyColumns,
    };
  },
};
