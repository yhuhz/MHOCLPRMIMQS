import { ref, watch } from "vue";
import _ from "lodash";
import { useQuasar, Loading, date, SessionStorage } from "quasar";
import {
  GetSuppliesRelease,
  FindSupplyForRelease,
  EditSupplyReleaseMass,
  AddSupplyRelease,
} from "src/composables/Supply";

import {
  FindUsersByName,
  FindUsersByID,
  FindUsersDepartment,
} from "src/composables/Manage_Users";

import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();

    let keySession = SessionStorage.getItem("cred");
    if (keySession === null) {
      router.push({ name: "login" });
    }

    let pendingDateArray = ["Today", "This Week", "This Month", "Custom Date"];
    let selectedPendingDate = ref("Today");
    let selectedRelease = ref([]);
    let pendingArray = ref([]);
    let departments = [
      "Outpatient Department",
      "Dental",
      "Prenatal and Immunization",
      "Pharmacy",
      "Front Desk",
      "Admin Office",
    ];

    let selectedIndex = ref(null);

    const selectPendingRecord = (index) => {
      selectedIndex.value = index;
      selectedRelease.value = pendingArray.value[index];
      btnCondition.value = true;
    };

    Loading.show();
    GetSuppliesRelease(
      selectedPendingDate.value !== "Custom Date"
        ? selectedPendingDate.value
        : dateArray.value
    ).then((response) => {
      Loading.hide();
      pendingArray.value = response.data;
      selectedIndex.value = 0;
      selectedRelease.value = pendingArray.value[0];
    });

    let isCustomDate = ref(false);
    let dateToday = date.formatDate(new Date(), "YYYY-MM-DD");
    let dateArray = ref(["2023-01-01", dateToday]);
    let firstDate = ref(null);

    const changeCustomDate = () => {
      firstDate.value = dateArray.value[0].replaceAll("-", "/");
    };

    const changeDate = () => {
      if (selectedPendingDate.value !== "Custom Date") {
        GetSuppliesRelease(selectedPendingDate.value).then((response) => {
          pendingArray.value = response.data;
          selectedIndex.value = 0;
          selectedRelease.value = pendingArray.value[0];
        });
      } else {
        isCustomDate.value = true;
      }
    };

    const closeCustomDate = () => {
      isCustomDate.value = false;
      selectedPendingDate.value = "Today";
      changeDate();
    };

    const getRecordsFromCustomDate = () => {
      isCustomDate.value = false;
      GetSuppliesRelease(dateArray.value).then((response) => {
        pendingArray.value = response.data;
        selectedIndex.value = 0;
        selectedRelease.value = pendingArray.value[0];
      });
    };

    let supplyList = ref([]);
    const supplyFilterFunction = (val, update, abort) => {
      if (val.length > 3) {
        update(() => {
          const needle = String(val.toLowerCase());
          FindSupplyForRelease(needle).then((response) => {
            supplyList.value = [];
            if (response.status === "success") {
              let Supplies = ref([]);
              Supplies.value = response.data;
              Supplies.value.forEach((m) => {
                let selectValues = {
                  supply_name:
                    m.supply_name +
                    (m.exp_date ? " (" + m.exp_date + ")" : "") +
                    " (" +
                    (m.quantity - m.quantity_released) +
                    ")",
                  supply_id: m.supply_id,
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
      btnCondition.value = false;
      selectedRelease.value.supplies.push({
        supply_details: { supply_name: null, supply_id: null },
        quantity: null,
        release_date: dateToday,
        released_by: keySession && keySession.user_id,
        status: 0,
      });
    };

    const removeSupply = (index) => {
      selectedRelease.value.supplies.splice(index, 1);
    };

    const editSupplyRelease = () => {
      selectedRelease.value.date =
        selectedPendingDate.value !== "Custom Date"
          ? selectedPendingDate.value
          : dateArray.value;
      // console.log(selectedRelease.value);

      Loading.show();
      EditSupplyReleaseMass(selectedRelease.value).then((response) => {
        Loading.hide();
        selectedRelease.value = response.data;

        let status = response.status === "success" ? 0 : 1;
        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Supply releases edited successfully"
              : "Failed to edit supply releases",
        });
      });
    };

    let btnCondition = ref(true);
    const buttonCondition = () => {
      if (
        selectedRelease.value.supplies[
          selectedRelease.value.supplies.length - 1
        ].supply_details.supply_name !== null &&
        selectedRelease.value.supplies[
          selectedRelease.value.supplies.length - 1
        ].quantity !== null
      ) {
        btnCondition.value = true;
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

    const addSupplyMass = () => {
      supplyReleaseDetails.value.supplies_array.push({
        supply_id: null,
        quantity: null,
      });
    };

    const removeSupplyMass = (index) => {
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
        Loading.show();
        GetSuppliesRelease(
          selectedPendingDate.value !== "Custom Date"
            ? selectedPendingDate.value
            : dateArray.value
        ).then((response) => {
          Loading.hide();
          pendingArray.value = response.data;
          selectedIndex.value = 0;
          selectedRelease.value = pendingArray.value[0];
        });
      });
    };

    return {
      keySession,
      pendingDateArray,
      pendingArray,
      selectedIndex,
      selectPendingRecord,
      selectedPendingDate,
      isCustomDate,
      dateArray,
      changeCustomDate,
      changeDate,
      closeCustomDate,
      getRecordsFromCustomDate,
      selectedRelease,
      departments,
      supplyList,
      supplyFilterFunction,
      addSupply,
      removeSupply,
      editSupplyRelease,
      btnCondition,
      buttonCondition,
      isSupplyRelease,
      supplyReleaseDetails,
      userOptions,
      userFilterFunction,
      filtersDepartment,
      findDepartment,
      addSupplyMass,
      removeSupplyMass,
      addSupplyRelease,
    };
  },
};
