import axios from "axios";
import { ref, readonly } from "vue";
let DashboardData = ref([]);

let pathlink =
  "http://localhost/MHOCLPRMIMQS/src/PHP/Dashboard/dashboard_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Login data.
 * @param {*} object
 */

let GetDashboardData = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, { params: { dashboard_filter: payload } })
      .then((response) => {
        // console.log(response.data);
        DashboardData.value = response.data.data;
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
export { DashboardData, GetDashboardData };
