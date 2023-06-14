import axios from "axios";
import { ref, readonly } from "vue";
let Supplies = ref([]);
let SuppliesList = readonly(Supplies);
let SupplyDetails = ref([]);
let SupplyRelease = ref([]);
let pathlink =
  "http://localhost/MHOCLPRMIMQS PHP/Medicine and Supplies/supply_inventory_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Supplies data.
 * @param {*} object
 */
let GetSupplies = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: { payload: payload },
      })
      .then((response) => {
        // console.log(response.data);

        if (response.data.status === "success") {
          Supplies.value = response.data.data;
        } else {
          console.log(response.data.data);
        }

        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let GetSuppliesRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: { date: payload },
      })
      .then((response) => {
        console.log(response.data);

        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindSupplyDetails = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          supply_id: payload,
        },
      })
      .then((response) => {
        // console.log(response.data);
        SupplyDetails.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindSupplyRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          release_filter: payload,
        },
      })
      .then((response) => {
        console.log(response.data);
        SupplyRelease.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindSupplyForRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          supply_name: payload,
          for_release: true,
        },
      })
      .then((response) => {
        console.log(response.data);
        SupplyRelease.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * This function accepts parameters of an object then
 * add the passed object to Supplies data.
 * @param {*} object
 */
let AddSupply = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "success") {
          try {
            Supplies.value.push(response.data.data);
          } catch (e) {
            Supplies.value = [];
            Supplies.value.push(response.data.data);
          }
        } else {
          console.log(response.data);
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let AddSupplyRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "success") {
          try {
            SupplyRelease.value.push(response.data.data);
          } catch (e) {
            SupplyRelease.value = [];
            SupplyRelease.value.push(response.data.data);
          }
        } else {
          console.log(response.data);
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 * This function accepts parameters of an object then
 * updates the Supplies specific data based on the id passed in the object.
 * @param {*} object
 */
let EditSupply = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.status === "success") {
          let objectIndex = Supplies.value.findIndex(
            (e) => e.supply_id === payload.supply_id
          );
          // if index not found (-1) update nothing !
          // objectIndex !== -1 &&
          // Object.keys(Supplies.value[objectIndex]).forEach((key) => {
          //   response.data.data.personal_info[key] &&
          //     (Supplies.value[objectIndex][key] =
          //       response.data.data.personal_info[key]);
          // });

          Supplies.value[objectIndex] = response.data.data;
        } else [console.log(response.data)];
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let EditSupplyRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.status === "success") {
          let objectIndex = SupplyRelease.value.findIndex(
            (e) => e.supply_release_id === payload.supply_release_id
          );
          // if index not found (-1) update nothing !
          // objectIndex !== -1 &&
          // Object.keys(Supplies.value[objectIndex]).forEach((key) => {
          //   response.data.data.personal_info[key] &&
          //     (Supplies.value[objectIndex][key] =
          //       response.data.data.personal_info[key]);
          // });

          SupplyRelease.value[objectIndex] = response.data.data;
        } else [console.log(response.data)];
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * This function accepts parameters of an array like this [1,2,3,4] then
 * delete the data in the Supplies based on this parameter.
 * @param {*} array
 */
let DeleteSupply = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?supply_id=" + payload.supply_id)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = Supplies.value.findIndex(
            (e) => e.supply_id === payload.supply_id
          );
          // if index not found (-1) delete nothing !
          objectIndex !== -1 && Supplies.value.splice(objectIndex, 1);
        } else {
          console.log(response.data);
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let DeleteSupplyRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?supply_release_id=" + payload.supply_release_id)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "success") {
          let objectIndex = SupplyRelease.value.findIndex(
            (e) => e.supply_release_id === payload.supply_release_id
          );
          // if index not found (-1) delete nothing !
          objectIndex !== -1 && SupplyRelease.value.splice(objectIndex, 1);
        } else {
          console.log(response.data);
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 * Export SuppliesList as readonly (real time copy of Supplies)
 */
export {
  GetSupplies,
  Supplies,
  SuppliesList,
  FindSupplyDetails,
  SupplyDetails,
  AddSupply,
  EditSupply,
  DeleteSupply,
  SupplyRelease,
  FindSupplyRelease,
  DeleteSupplyRelease,
  AddSupplyRelease,
  EditSupplyRelease,
  FindSupplyForRelease,
  GetSuppliesRelease,
};
