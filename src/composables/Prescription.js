import axios from "axios";
import { ref, readonly } from "vue";
let Prescription = ref([]);
let PrescriptionList = readonly(Prescription);
let MedicineRelease = ref([]);
let pathlink =
  "http://localhost/MHOCLPRMIMQS PHP/Medicine and Supplies/prescription_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Prescription data.
 * @param {*} object
 */
let GetPrescription = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: { payload: payload },
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.status === "success") {
          Prescription.value = response.data.data;
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

/**
 * This function accepts parameters of an object then
 * add the passed object to Prescription data.
 * @param {*} object
 */

/**
 * This function accepts parameters of an object then
 * updates the Prescription specific data based on the id passed in the object.
 * @param {*} object
 */
let SetPrescriptionAsDone = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.status === "success") {
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
 * delete the data in the Prescription based on this parameter.
 * @param {*} array
 */

let DeleteMedicineRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?med_release_id=" + payload.med_release_id)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "success") {
          let objectIndex = MedicineRelease.value.findIndex(
            (e) => e.med_release_id === payload.med_release_id
          );
          // if index not found (-1) delete nothing !
          objectIndex !== -1 && MedicineRelease.value.splice(objectIndex, 1);
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
 * Export PrescriptionList as readonly (real time copy of Prescription)
 */
export {
  GetPrescription,
  Prescription,
  PrescriptionList,
  SetPrescriptionAsDone,
  DeleteMedicineRelease,
};
