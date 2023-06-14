import { ref, watch } from "vue";
import _ from "lodash";
import { useQuasar, Loading, date, SessionStorage } from "quasar";
import {
  GetSuppliesRelease,
  FindSupplyForRelease,
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
      "Prenatal",
      "Immunization",
      "Pharmacy",
      "Front Desk",
      "Admin Office",
    ];

    let selectedIndex = ref(null);

    const selectPendingRecord = (index) => {
      selectedIndex.value = index;
      selectedRelease.value = pendingArray.value[index];
    };

    Loading.show();
    GetSuppliesRelease(["2023-01-01", "2023-06-30"]).then((response) => {
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
        GetSuppliesRelease(["2023-01-01", "2023-06-30"]).then((response) => {
          pendingArray.value = response.data;
          selectedIndex.value = 0;
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
      GetSuppliesRelease(["2023-01-01", "2023-06-30"]).then((response) => {
        pendingArray.value = response.data;
        selectedIndex.value = 0;
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

    const addSupplies = () => {
      console.log(selectedRelease.value);
    };

    let btnCondition = ref(true);
    // const buttonCondition = () => {
    //   if (selectedRelease.value.supplies[selectedRelease.value.supplies.length - 1].supply_details.supply_id)
    // }

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
      addSupplies,
      btnCondition,
    };
  },
};
