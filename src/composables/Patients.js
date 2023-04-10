import axios from "axios";
import { ref, readonly } from "vue";
let Patients = ref([]);
let PatientsList = readonly(Patients);
let PatientDetails = ref([]);
let PWD = ref([]);
let SC = ref([]);
let Pregnant = ref([]);
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
        console.log(response.data);

        if (typeof payload.pwd != "undefined") {
          PWD.value = response.data.data;
        } else if (typeof payload.sc != "undefined") {
          SC.value = response.data.data;
        } else if (typeof payload.pregnant != "undefined") {
          Pregnant.value = response.data.data;
        } else {
          Patients.value = response.data.data;
        }

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
        // console.log(response.data);
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
let AddPatient = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          // Patients.value.push(response.data.data);
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
let EditPatient = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.status === "success") {
          let objectIndex = Patients.value.findIndex(
            (e) => e.patient_id === payload.personal_info.patient_id
          );
          // if index not found (-1) update nothing !
          // objectIndex !== -1 &&
          // Object.keys(Patients.value[objectIndex]).forEach((key) => {
          //   response.data.data.personal_info[key] &&
          //     (Patients.value[objectIndex][key] =
          //       response.data.data.personal_info[key]);
          // });

          Patients.value[objectIndex] = response.data.data;
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
let DeletePatient = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?patient_id=" + payload.patient_id)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = Patients.value.findIndex(
            (e) => e.patient_id === payload.patient_id
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
export {
  GetPatients,
  Patients,
  PatientsList,
  FindPatient,
  PatientDetails,
  AddPatient,
  EditPatient,
  DeletePatient,
  PWD,
  SC,
  Pregnant,
};
