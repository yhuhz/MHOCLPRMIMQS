import { ref } from "vue";
import { useQuasar, Loading, date, SessionStorage } from "quasar";
import {
  GetSupplies,
  Supplies,
  SuppliesList,
  AddSupply,
  EditSupply,
  FindSupplyForRelease,
  AddSupplyRelease,
} from "src/composables/Supply";
import {
  FindUsersDepartment,
  FindUsersByID,
  FindUsersByName,
} from "src/composables/Manage_Users";
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
        name: "in_stock",
        align: "left",
        label: "In Stock",
        field: (row) => row.quantity - row.quantity_released,
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

    //Get Date Diff for exp_date
    let dateToday = date.formatDate(Date.now(), "YYYY-MM-DD");
    const getExpDateClass = (row) => {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const diffDays = Math.round(
        (new Date(row.exp_date) - new Date(dateToday)) / oneDay
      );
      return diffDays <= 100 ? "text-red" : "";
    };

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

    getRecords();

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
              ? "Supply record edited successfully"
              : "Failed to edit supply record",
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

    /** SUPPLY RELEASE **/
    let isSupplyRelease = ref(false);
    let supplyReleaseDetails = ref({
      user_id: null,
      department: null,
      supplies_array: [
        {
          supply_id: null,
          quantity: null,
        },
      ],
      released_by: keySession && keySession.user_id,
    });

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

    let filtersDepartment = [
      "Outpatient Department",
      "Dental",
      "Prenatal and Immunization",
      "Pharmacy",
      "Front Desk",
      "Admin Office",
    ];

    const findDepartment = () => {
      if (supplyReleaseDetails.value.user_id !== null) {
        FindUsersDepartment(supplyReleaseDetails.value.user_id).then(
          (response) => {
            supplyReleaseDetails.value.department =
              filtersDepartment[response.data[0].department - 1];
          }
        );
      } else {
        supplyReleaseDetails.value.department = null;
      }
    };

    let supplyList = ref([]);
    const supplyFilterFunction = (val, update, abort) => {
      if (val.length > 3) {
        update(() => {
          const needle = String(val.toLowerCase());
          FindSupplyForRelease(needle).then((response) => {
            supplyList.value = [];
            if (response.status === "success") {
              let Supply = ref([]);
              Supply.value = response.data;
              Supply.value.forEach((s) => {
                let selectValues = {
                  supply_name:
                    s.supply_type +
                    " - " +
                    s.supply_name +
                    " (" +
                    (s.quantity - s.quantity_released) +
                    ")",
                  supply_id: s.supply_id,
                };
                supplyList.value.push(selectValues);
              });
            }
          });
        });
      } else {
        abort();
      }
    };

    const addSupply = () => {
      supplyReleaseDetails.value.supplies_array.push({
        supply_id: null,
        quantity: null,
      });
    };

    const removeSupply = (index) => {
      supplyReleaseDetails.value.supplies_array.splice(index, 1);
    };

    const addSupplyRelease = () => {
      supplyReleaseDetails.value.department =
        filtersDepartment.indexOf(supplyReleaseDetails.value.department) + 1;
      // console.log("payload", supplyReleaseDetails.value);

      Loading.show();
      AddSupplyRelease(supplyReleaseDetails.value).then((response) => {
        Loading.hide();

        let status = response.status === "success" ? 0 : 1;
        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Supply releases added successfully"
              : "Failed to add supply releases",
        });

        isSupplyRelease.value = false;
      });
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
      keySession,
      getExpDateClass,
      isSupplyRelease,
      supplyReleaseDetails,
      filtersDepartment,
      findDepartment,
      userFilterFunction,
      addSupply,
      removeSupply,
      supplyList,
      supplyFilterFunction,
      userOptions,
      userFilterFunction,
      addSupplyRelease,
    };
  },
};
