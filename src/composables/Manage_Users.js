import axios from "axios";
import { ref, readonly } from "vue";
let Users = ref([]);
let UsersList = readonly(Users);
let pathlink =
  "http://localhost/MHOCLPRMIMQS/src/PHP/Users and Departments/manage_user_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Users data.
 * @param {*} object
 */
let GetUsers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink)
      .then((response) => {
        Users.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let FindUsersByName = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          name: payload,
        },
      })
      .then((response) => {
        // Users.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 * This function accepts parameters of an object then
 * add the passed object to Users data.
 * @param {*} object
 */
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
 * This function accepts parameters of an object then
 * updates the Users specific data based on the id passed in the object.
 * @param {*} object
 */
let UpdateUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          let objectIndex = Users.value.findIndex((e) => e.id === payload.id);
          // if index not found (-1) update nothing !
          objectIndex !== -1 &&
            Object.keys(Users.value[objectIndex]).forEach((key) => {
              response.data.data[key] &&
                (Users.value[objectIndex][key] = response.data.data[key]);
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
 * delete the data in the Users based on this parameter.
 * @param {*} array
 */
let DeleteUser = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?id=" + payload.id)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = Users.value.findIndex((e) => e.id === payload.id);
          // if index not found (-1) delete nothing !
          objectIndex !== -1 && Users.value.splice(objectIndex, 1);
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
 * Export UsersList as readonly (real time copy of Users)
 */
export { FindUsersByName };
