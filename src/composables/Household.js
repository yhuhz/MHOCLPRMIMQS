import axios from "axios";
import { ref, readonly } from "vue";
let Households = ref([]);
let HouseholdsList = readonly(Households);
let HouseholdDetails = ref([]);
let pathlink =
  "http://localhost/MHOCLPRMIMQS/src/PHP/Patients and Household/household_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Households data.
 * @param {*} object
 */
let FindHouseholdByID = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: { household_id: payload },
      })
      .then((response) => {
        console.log(response.data);
        Households.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindHouseholdByName = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          household_name: payload,
        },
      })
      .then((response) => {
        Households.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * This function accepts parameters of an object then
 * add the passed object to Households data.
 * @param {*} object
 */
let AddHousehold = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          Households.value.push(response.data.data);
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
 * updates the Households specific data based on the id passed in the object.
 * @param {*} object
 */
let UpdateHousehold = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = Households.value.findIndex(
            (e) => e.household_id === payload.household_id
          );
          // if index not found (-1) update nothing !
          Households.value[objectIndex] = response.data.data;
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
 * delete the data in the Households based on this parameter.
 * @param {*} array
 */
let DeleteHousehold = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?household_id=" + payload.household_id)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = Households.value.findIndex(
            (e) => e.household_id === payload.household_id
          );
          // if index not found (-1) delete nothing !
          objectIndex !== -1 && Households.value.splice(objectIndex, 1);
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
 * Export HouseholdsList as readonly (real time copy of Households)
 */
export {
  FindHouseholdByID,
  HouseholdsList,
  FindHouseholdByName,
  HouseholdDetails,
  AddHousehold,
  UpdateHousehold,
  DeleteHousehold,
};
