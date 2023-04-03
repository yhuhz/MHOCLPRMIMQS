import axios from "axios";
import { ref, readonly } from "vue";
let LoginRecord = ref([]);
let LoginCredential = readonly(LoginRecord);

let pathlink =
  "http://localhost/MHOCLPRMIMQS/src/PHP/Users and Departments/manage_user_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Login data.
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

let FindUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          user_id: payload,
        },
      })
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

let UpdateUserAccount = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = LoginRecord.value.findIndex(
            (e) => e.user_id === Number(payload.user_id)
          );
          // if index not found (-1) update nothing !
          objectIndex !== -1 &&
            Object.keys(LoginRecord.value[objectIndex]).forEach((key) => {
              response.data.data[key] &&
                (LoginRecord.value[objectIndex][key] = response.data.data[key]);
            });
        } else [console.log(response.data)];
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let ChangePassword = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
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
export { Login, LoginCredential, FindUser, UpdateUserAccount, ChangePassword };
