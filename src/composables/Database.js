import axios from "axios";
import { ref, readonly } from "vue";

let pathlink = "http://localhost/MHOCLPRMIMQS PHP/Dashboard/backup_db_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Login data.
 * @param {*} object
 */

let BackupDatabase = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let RestoreDatabase = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink)
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
 * Export LoginList as readonly (real time copy of Login)
 */
export { BackupDatabase, RestoreDatabase };
