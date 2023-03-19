import axios from "axios";
import { ref, readonly } from "vue";
let patient_number = ref(0);
let pathlink = "http://localhost/MHOCLPRMIMQS/src/php/api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Projects data.
 * @param {*} object
 */

let SetUsers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink)
      .then((response) => {
        console.log("users", response.data);
        Users.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let LoginUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          username: payload.username,
          password: payload.password,
        },
      })
      .then((response) => {
        // console.log("login", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let SetDepartments = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          dept: 1,
        },
      })
      .then((response) => {
        console.log("dept", response.data);
        Departments.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let AddUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          Users.value.push(response.data.data);
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
 * Export LoginList as readonly (real time copy of Projects)
 */
export { patient_number };
