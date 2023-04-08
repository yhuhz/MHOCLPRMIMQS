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
let GetHouseholds = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: { payload: payload },
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

let FindHousehold = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          household_id: payload,
        },
      })
      .then((response) => {
        HouseholdDetails.value = response.data.data[0];
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
let AddUser = (payload) => {
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
let UpdateUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          let objectIndex = Households.value.findIndex(
            (e) => e.id === payload.id
          );
          // if index not found (-1) update nothing !
          objectIndex !== -1 &&
            Object.keys(Households.value[objectIndex]).forEach((key) => {
              response.data.data[key] &&
                (Households.value[objectIndex][key] = response.data.data[key]);
            });
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
let DeleteUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?id=" + payload.id)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = Households.value.findIndex(
            (e) => e.id === payload.id
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
  GetHouseholds,
  HouseholdsList,
  FindHousehold,
  HouseholdDetails,
  FindHouseholdByName,
};
