import { ref } from "vue";
import { useQuasar, Loading, date, SessionStorage } from "quasar";
import {
  GetSupplies,
  SuppliesList,
  AddSupply,
  EditSupply,
} from "src/composables/Supply";
import DeleteSupplyConfirmation from "../../Components/DeleteSupplyConfirmation.vue";
import { ToggleDialogState } from "../../../composables/Triggers";
import MHCDialog from "../../../components/MHCDialog.vue";
import { SetIDS } from "src/composables/IDS";
import exportFile from "quasar/src/utils/export-file.js";

export default {
  components: { MHCDialog, DeleteSupplyConfirmation },
  setup() {
    const $q = useQuasar();

    let keySession = SessionStorage.getItem("cred");
    if (keySession === null) {
      router.push({ name: "login" });
    }

    /*** Table ***/
    const columns = ref([
      {
        name: "supply_id",
        align: "left",
        label: "ID",
        field: "supply_id",
        sortable: true,
      },
      {
        name: "supply_name",
        align: "left",
        label: "Supply Name",
        field: "supply_name",
        sortable: true,
      },
      {
        name: "supply_type",
        align: "left",
        label: "Supply Type",
        field: "supply_type",
        sortable: true,
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
        name: "quantity_type",
        align: "left",
        label: "Qty Type",
        field: "quantity_type",
        sortable: true,
      },
      {
        name: "in_stock",
        align: "left",
        label: "In Stock",
        field: "in_stock",
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
        field: (row) => statusList[row.status],
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

    let showFilterModal = ref(false);
    let isAddNewSupplyStock = ref(false);

    /**SEARCH FILTER**/
    let selectedSearchBy = ref("Supply ID");
    let searchBy = ref([
      "Supply ID",
      "Supply Name",
      "Supply Type",
      "Quantity Type",
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
      GetSupplies(payload).then((response) => {
        Loading.hide();
      });
    };

    /**ADD SUPPLY RECORD**/
    let newSupplyRecord = ref({
      supply_name: null,
      supply_type: null,
      mfg_date: null,
      exp_date: null,
      quantity: null,
      quantity_type: null,
      procured_by: null,
      date_added: date.formatDate(new Date(), "YYYY-MM-DD"),
      added_by: keySession && keySession.user_id,
      status: 0,
    });

    const addSupplyRecord = () => {
      // console.log(newSupplyRecord.value);
      Loading.show();

      AddSupply(newSupplyRecord.value).then((response) => {
        Loading.hide();
        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Supply record added successfully"
              : "Failed to add supply record",
        });

        if (!status) {
          isAddNewSupplyStock.value = false;
          onReset();
        }
      });
    };

    const onReset = () => {
      newSupplyRecord.value = {
        supply_name: null,
        supply_type: null,
        mfg_date: null,
        exp_date: null,
        quantity: null,
        quantity_type: null,
        procured_by: null,
        date_added: date.formatDate(new Date(), "YYYY-MM-DD"),
        added_by: keySession && keySession.user_id,
        status: 0,
      };
    };

    /**EDIT MEDICINE RECORD**/
    let isEditSupplyStock = ref(false);
    let editSupplyRecord = ref({});

    const editRecordModal = (record) => {
      isEditSupplyStock.value = true;

      editSupplyRecord.value = {
        supply_id: record.supply_id,
        supply_name: record.supply_name,
        supply_type: record.supply_type,
        mfg_date: record.mfg_date,
        exp_date: record.exp_date,
        quantity: record.quantity,
        quantity_type: record.quantity_type,
        procured_by: record.procured_by,
        date_added: record.date_added,
        added_by: record.added_by,
        status: record.status,
      };
    };

    const editSupply = () => {
      console.log(editSupplyRecord.value);
      return;
      Loading.show();

      EditSupply(editSupplyRecord.value).then((response) => {
        Loading.hide();
        isEditSupplyStock.value = false;
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
    const openDialog = (supply_id) => {
      SetIDS(supply_id);
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
          SuppliesList.value.map((row) =>
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

      const status = exportFile("Supply Records.csv", content, "text/csv");

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
      showFilterModal,
      isAddNewSupplyStock,
      statusList,
      status_array_model,
      mfgDate,
      expDate,
      dateAdded,
      inStock,
      getRecords,
      SuppliesList,
      newSupplyRecord,
      addSupplyRecord,
      onReset,
      openDialog,
      isEditSupplyStock,
      editRecordModal,
      editSupplyRecord,
      editSupply,
      exportTable,
    };
  },
};
