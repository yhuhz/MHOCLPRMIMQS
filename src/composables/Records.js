import axios from "axios";
import { ref, readonly } from "vue";
let RecordDetails = ref([]);
let PatientRecords = ref([]);
let RecordArrays = ref([]);
let HealthRecords = ref([]);
// let pathlink =
//   "http://localhost/MHOCLPRMIMQS/src/PHP/RecordDetails and Household/patient_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to RecordDetails data.
 * @param {*} object
 */

let GetRecords = (payload) => {
  let pathlink =
    "http://localhost/MHOCLPRMIMQS/src/PHP/Patients and Household/records_api.php";
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          payload: payload,
        },
      })
      .then((response) => {
        // console.log(response.data);
        PatientRecords.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let GetRecordsForTable = (payload) => {
  let pathlink =
    "http://localhost/MHOCLPRMIMQS/src/PHP/Patients and Household/records_api.php";
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          payload: payload,
        },
      })
      .then((response) => {
        // console.log(response.data);
        HealthRecords.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindRecordDetails = (payload, department) => {
  let pathlink =
    "http://localhost/MHOCLPRMIMQS/src/PHP/Patient Records/" +
    department.toLowerCase() +
    "_api.php";
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          payload: { record_id: payload },
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (
          department === "OPD" ||
          department === "Prenatal" ||
          department === "Dental"
        ) {
          RecordDetails.value = response.data.record;
          RecordArrays.value = response.data.array;
        } else {
          RecordDetails.value = response.data.data;
          RecordArrays.value = [];
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
 * add the passed object to RecordDetails data.
 * @param {*} object
 */
let AddRecord = (payload, department) => {
  let pathlink =
    "http://localhost/MHOCLPRMIMQS/src/PHP/Patient Records/" +
    department.toLowerCase() +
    "_api.php";
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          // console.log(response.data);
          try {
            PatientRecords.value.push(response.data.data);
          } catch (e) {
            PatientRecords.value = [];
            PatientRecords.value.push(response.data.data);
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
 * updates the RecordDetails specific data based on the id passed in the object.
 * @param {*} object
 */
let UpdateRecord = (payload, department) => {
  let pathlink =
    "http://localhost/MHOCLPRMIMQS/src/PHP/Patient Records/" +
    department.toLowerCase() +
    "_api.php";

  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          // console.log(response.data);
          if (
            department === "OPD" ||
            department === "Prenatal" ||
            department === "Dental"
          ) {
            RecordDetails.value = response.data.record;
            RecordArrays.value = response.data.array;
          } else {
            RecordDetails.value = response.data.data;
          }
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
 * delete the data in the RecordDetails based on this parameter.
 * @param {*} array
 */
let DeleteRecord = (payload, department) => {
  // console.log(payload);
  let pathlink =
    "http://localhost/MHOCLPRMIMQS/src/PHP/Patient Records/" +
    department.toLowerCase() +
    "_api.php";
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?record_id=" + payload.record_id)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "success") {
          let objectIndex = PatientRecords.value.findIndex(
            (e) => e.record_id === Number(payload.record_id)
          );
          // if index not found (-1) delete nothing !
          objectIndex !== -1 && PatientRecords.value.splice(objectIndex, 1);
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
 * Export RecordDetailsList as readonly (real time copy of RecordDetails)
 */
export {
  FindRecordDetails,
  RecordDetails,
  UpdateRecord,
  GetRecords,
  PatientRecords,
  DeleteRecord,
  AddRecord,
  RecordArrays,
  HealthRecords,
  GetRecordsForTable,
};
