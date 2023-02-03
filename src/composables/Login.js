import axios from "axios";
import { ref, readonly } from "vue";
// let Login = ref([]);
// let LoginList = readonly();
let pathlink = "http://localhost/MHOCLPRMIMQS/src/php/api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Projects data.
 * @param {*} object
 */
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
        console.log(response.data);
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
export { LoginUser };
