import axios from "axios";
import { ref, readonly } from "vue";
let Patients = ref([]);
let PatientsList = readonly(Patients);
let PatientDetails = ref([]);
let pathlink =
  "http://localhost/MHOCLPRMIMQS/src/PHP/Patients and Household/patient_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Patients data.
 * @param {*} object
 */
let GetPatients = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: { payload: payload },
      })
      .then((response) => {
        Patients.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindPatient = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          payload: payload,
        },
      })
      .then((response) => {
        PatientDetails.value = response.data.data[0];
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * This function accepts parameters of an object then
 * add the passed object to Patients data.
 * @param {*} object
 */
let AddUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          Patients.value.push(response.data.data);
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
 * updates the Patients specific data based on the id passed in the object.
 * @param {*} object
 */
let UpdateUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          let objectIndex = Patients.value.findIndex(
            (e) => e.id === payload.id
          );
          // if index not found (-1) update nothing !
          objectIndex !== -1 &&
            Object.keys(Patients.value[objectIndex]).forEach((key) => {
              response.data.data[key] &&
                (Patients.value[objectIndex][key] = response.data.data[key]);
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
 * delete the data in the Patients based on this parameter.
 * @param {*} array
 */
let DeleteUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?id=" + payload.id)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = Patients.value.findIndex(
            (e) => e.id === payload.id
          );
          // if index not found (-1) delete nothing !
          objectIndex !== -1 && Patients.value.splice(objectIndex, 1);
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
 * Export PatientsList as readonly (real time copy of Patients)
 */
export { GetPatients, PatientsList, FindPatient, PatientDetails };
