import axios from "axios";
import { ref, readonly } from "vue";
let Medicines = ref([]);
let MedicinesList = readonly(Medicines);
let MedicineDetails = ref([]);
let MedicineRelease = ref([]);
let MedReleasePerPatient = ref([]);
let pathlink =
  "http://localhost/MHOCLPRMIMQS PHP/Medicine and Supplies/medicine_inventory_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Medicines data.
 * @param {*} object
 */
let GetMedicines = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: { payload: payload },
      })
      .then((response) => {
        // console.log(response.data);

        if (response.data.status === "success") {
          Medicines.value = response.data.data;
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

let FindMedicineDetails = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          medicine_id: payload,
        },
      })
      .then((response) => {
        // console.log(response.data);
        MedicineDetails.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindMedicines = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          medicine_name: payload,
        },
      })
      .then((response) => {
        // console.log(response.data);
        MedicineDetails.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindMedicineRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          release_filter: payload,
        },
      })
      .then((response) => {
        // console.log(response.data);
        MedicineRelease.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindMedicineReleasePerPatient = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          patient_id: payload,
        },
      })
      .then((response) => {
        // console.log(response.data);
        MedReleasePerPatient.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * This function accepts parameters of an object then
 * add the passed object to Medicines data.
 * @param {*} object
 */
let AddMedicine = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          try {
            Medicines.value.push(response.data.data);
          } catch (e) {
            Medicines.value = [];
            Medicines.value.push(response.data.data);
          }
        } else {
          // console.log(response.data);
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let AddMedicineRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "success") {
          try {
            MedicineRelease.value.push(response.data.data);
          } catch (e) {
            MedicineRelease.value = [];
            MedicineRelease.value.push(response.data.data);
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
 * updates the Medicines specific data based on the id passed in the object.
 * @param {*} object
 */
let EditMedicine = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.status === "success") {
          let objectIndex = Medicines.value.findIndex(
            (e) => e.medicine_id === payload.medicine_id
          );
          // if index not found (-1) update nothing !
          // objectIndex !== -1 &&
          // Object.keys(Medicines.value[objectIndex]).forEach((key) => {
          //   response.data.data.personal_info[key] &&
          //     (Medicines.value[objectIndex][key] =
          //       response.data.data.personal_info[key]);
          // });

          Medicines.value[objectIndex] = response.data.data;
        } else [console.log(response.data)];
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let EditMedicineRelease = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.status === "success") {
          let objectIndex = MedicineRelease.value.findIndex(
            (e) => e.med_release_id === payload.med_release_id
          );
          // if index not found (-1) update nothing !
          // objectIndex !== -1 &&
          // Object.keys(Medicines.value[objectIndex]).forEach((key) => {
          //   response.data.data.personal_info[key] &&
          //     (Medicines.value[objectIndex][key] =
          //       response.data.data.personal_info[key]);
          // });

          MedicineRelease.value[objectIndex] = response.data.data;
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
 * delete the data in the Medicines based on this parameter.
 * @param {*} array
 */
let DeleteMedicine = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?medicine_id=" + payload.medicine_id)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = Medicines.value.findIndex(
            (e) => e.medicine_id === payload.medicine_id
          );
          // if index not found (-1) delete nothing !
          objectIndex !== -1 && Medicines.value.splice(objectIndex, 1);
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
 * Export MedicinesList as readonly (real time copy of Medicines)
 */
export {
  GetMedicines,
  Medicines,
  MedicinesList,
  FindMedicineDetails,
  MedicineDetails,
  AddMedicine,
  EditMedicine,
  DeleteMedicine,
  MedicineRelease,
  FindMedicineRelease,
  DeleteMedicineRelease,
  AddMedicineRelease,
  EditMedicineRelease,
  FindMedicineReleasePerPatient,
  MedReleasePerPatient,
  FindMedicines,
};
