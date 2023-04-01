import axios from "axios";
import { ref, readonly } from "vue";
let LoginRecord = ref([]);
let LoginCredential = readonly(LoginRecord);

let pathlink =
  "http://localhost/MHOCLPRMIMQS/src/PHP/Users and Departments/manage_user_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Projects data.
 * @param {*} object
 */
let Login = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          LoginRecord.value = response.data.data;
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Export ProjectsList as readonly (real time copy of Projects)
 */
export { Login, LoginCredential };
