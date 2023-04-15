import { ref } from "vue";
import { useQuasar, Loading, date, SessionStorage } from "quasar";
import {
  GetMedicines,
  Medicines,
  MedicinesList,
  AddMedicine,
  EditMedicine,
} from "src/composables/Medicine";
import DeleteMedicineConfirmation from "../../Components/DeleteMedicineConfirmation.vue";
import { ToggleDialogState } from "../../../composables/Triggers";
import MHCDialog from "../../../components/MHCDialog.vue";
import { SetIDS } from "src/composables/IDS";
import exportFile from "quasar/src/utils/export-file.js";

export default {
  components: { MHCDialog, DeleteMedicineConfirmation },
  setup() {
    const $q = useQuasar();

    let keySession = SessionStorage.getItem("cred");
    if (keySession === null) {
      router.push({ name: "login" });
    }
    Medicines.value = [];

    /*** Table ***/
    const columns = ref([
      {
        name: "id",
        align: "left",
        label: "ID",
        field: "medicine_id",
        sortable: true,
      },
      {
        name: "generic_name",
        align: "left",
        label: "Generic Name",
        field: "generic_name",
        sortable: true,
      },
      {
        name: "brand_name",
        align: "left",
        label: "Brand Name",
        field: "brand_name",
        sortable: true,
      },
      {
        name: "med_classification",
        align: "left",
        label: "Classification",
        field: "med_classification",
        sortable: true,
      },
      {
        name: "dosage_strength",
        align: "left",
        label: "Dosage Strength",
        field: "dosage_strength",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "dosage_form",
        align: "left",
        label: "Dosage Form",
        field: "dosage_form",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "ptr_number",
        align: "left",
        label: "PTR Number",
        field: "ptr_number",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "batch_lot_number",
        align: "left",
        label: "Batch/Lot Number",
        field: "batch_lot_number",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "mfg_date",
        align: "left",
        label: "Mfg Date",
        field: "mfg_date",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "exp_date",
        align: "left",
        label: "Exp Date",
        field: "exp_date",
        sortable: true,
      },
      {
        name: "quantity",
        align: "left",
        label: "Received",
        field: "quantity",
        sortable: true,
      },
      {
        name: "in_stock",
        align: "left",
        label: "In Stock",
        field: (row) => row.quantity - row.quantity_released,
        sortable: true,
      },
      {
        name: "procured_by",
        align: "left",
        label: "Procured By",
        field: "procured_by",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "date_added",
        align: "left",
        label: "Date Added",
        field: "date_added",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
      },
      {
        name: "added_by",
        align: "left",
        label: "Added By",
        field: "added_by",
        sortable: true,
        classes: "hidden",
        headerClasses: "hidden",
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
      },
    ]);

    const rows = ref([
      // {
      //   id: "1",
      //   genericName: "Paracetamol",
      //   brandName: "Biogesic",
      //   classification: "Analgesic",
      //   expirationDate: "02/25/2026",
      //   received: "500",
      //   inStock: "300",
      // },
      // {
      //   id: "2",
      //   genericName: "Paracetamol",
      //   brandName: "Biogesic",
      //   classification: "Analgesic",
      //   expirationDate: "01/16/2026",
      //   received: "400",
      //   inStock: "200",
      // },
    ]);

    let showFilterModal = ref(false);
    let isAddNewMedicineStock = ref(false);

    /**SEARCH FILTER**/
    let selectedSearchBy = ref("Medicine ID");
    let searchBy = ref([
      "Medicine ID",
      "Generic Name",
      "Brand Name",
      "Classification",
      "Dosage Strength",
      "Dosage Form",
      "PTR Number",
      "Batch/Lot Number",
      "Procured By",
    ]);
    let searchString = ref(null);

    /**FILTERS**/
    //In Stock
    let inStock = ref([0, 1000]);

    //Status
    let statusList = ["Active", "Deleted"];
    let status_array_model = ref([0]);

    //Manufacturing Date
    let mfgDate = ref([]);

    //Expiry Date
    let expDate = ref([]);

    //Expiry Date
    let dateAdded = ref([]);

    /**SEARCH FUNCTION**/
    const getRecords = () => {
      let payload = {
        search_by: {
          search_category: selectedSearchBy.value,
          search_string: searchString.value,
        },
        filter: {
          in_stock: inStock.value,
          status: status_array_model.value,
          mfg_date: mfgDate.value,
          exp_date: expDate.value,
          date_added: dateAdded.value,
        },
      };

      // console.log("paylaod", payload);
      Loading.show();
      GetMedicines(payload).then((response) => {
        Loading.hide();
      });
    };

    /**ADD MEDICINE RECORD**/
    let newMedicineRecord = ref({
      generic_name: null,
      brand_name: null,
      med_classification: null,
      mfg_date: null,
      exp_date: null,
      quantity: null,
      dosage_form: null,
      dosage_strength: null,
      batch_lot_number: null,
      ptr_number: null,
      procured_by: null,
      date_added: date.formatDate(new Date(), "YYYY-MM-DD"),
      added_by: keySession && keySession.user_id,
      status: 0,
    });

    const addMedicineRecord = () => {
      // console.log(newMedicineRecord.value);
      Loading.show();

      AddMedicine(newMedicineRecord.value).then((response) => {
        Loading.hide();
        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Medicine record added successfully"
              : "Failed to add medicine record",
        });
      });
    };

    const onReset = () => {
      newMedicineRecord.value = {
        generic_name: null,
        brand_name: null,
        med_classification: null,
        mfg_date: null,
        exp_date: null,
        quantity: null,
        dosage_form: null,
        dosage_strength: null,
        batch_lot_number: null,
        ptr_number: null,
        procured_by: null,
        date_added: date.formatDate(new Date(), "YYYY-MM-DD"),
        added_by: keySession && keySession.user_id,
        status: 0,
      };
    };

    /**EDIT MEDICINE RECORD**/
    let isEditMedicineStock = ref(false);
    let editMedicineRecord = ref({
      generic_name: null,
      brand_name: null,
      med_classification: null,
      mfg_date: null,
      exp_date: null,
      quantity: null,
      dosage_form: null,
      dosage_strength: null,
      batch_lot_number: null,
      ptr_number: null,
      procured_by: null,
      date_added: date.formatDate(new Date(), "YYYY-MM-DD"),
      added_by: keySession && keySession.user_id,
      status: 0,
    });

    const editRecordModal = (record) => {
      isEditMedicineStock.value = true;

      editMedicineRecord.value = {
        medicine_id: record.medicine_id,
        generic_name: record.generic_name,
        brand_name: record.brand_name,
        med_classification: record.med_classification,
        mfg_date: record.mfg_date,
        exp_date: record.exp_date,
        quantity: record.quantity,
        dosage_form: record.dosage_form,
        dosage_strength: record.dosage_strength,
        batch_lot_number: record.batch_lot_number,
        ptr_number: record.ptr_number,
        procured_by: record.procured_by,
        date_added: record.date_added,
        added_by: record.added_by,
        status: 0,
      };
    };

    const editMedicine = () => {
      Loading.show();

      EditMedicine(editMedicineRecord.value).then((response) => {
        Loading.hide();
        isEditMedicineStock.value = false;
        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Medicine record edited successfully"
              : "Failed to edit medicine record",
        });
      });
    };

    /**DELETE MEDICINE RECORD**/
    const openDialog = (medicine_id) => {
      SetIDS(medicine_id);
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
          MedicinesList.value.map((row) =>
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

      const status = exportFile("Medicine Records.csv", content, "text/csv");

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    };

    return {
      selectedSearchBy,
      searchBy,
      searchString,
      columns,
      rows,
      showFilterModal,
      isAddNewMedicineStock,
      statusList,
      status_array_model,
      mfgDate,
      expDate,
      dateAdded,
      inStock,
      getRecords,
      MedicinesList,
      newMedicineRecord,
      addMedicineRecord,
      onReset,
      openDialog,
      isEditMedicineStock,
      editRecordModal,
      editMedicineRecord,
      editMedicine,
      exportTable,
    };
  },
};
