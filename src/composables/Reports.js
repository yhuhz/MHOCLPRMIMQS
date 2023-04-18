import axios from "axios";
import { ref, readonly } from "vue";
let PatientData = ref([]);
let MedicineData = ref([]);
let SupplyData = ref([]);
let SelectedDate = ref([]);

let pathlink = "http://localhost/MHOCLPRMIMQS/src/PHP/Reports/reports_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Login data.
 * @param {*} object
 */

let GetReport = (payload, toFetch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, { params: { date_filter: payload, mode: toFetch } })
      .then((response) => {
        console.log(response.data);
        if (toFetch === "Patient") {
          PatientData.value = response.data.data;
          SelectedDate.value = response.data.date;
        } else if (toFetch === "Medicine") {
          MedicineData.value = response.data.data;
          SelectedDate.value = response.data.date;
        } else if (toFetch === "Supply") {
          SupplyData.value = response.data.data;
          SelectedDate.value = response.data.date;
        }

        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Export LoginList as readonly (real time copy of Login)
 */
export { GetReport, PatientData, MedicineData, SupplyData, SelectedDate };
