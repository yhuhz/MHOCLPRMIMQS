import axios from "axios";
import { ref, readonly } from "vue";

let DBList = ref([]);

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
        // console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let RestoreDatabase = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        // console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let GetDBList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          dbList: true,
        },
      })
      .then((response) => {
        // console.log(response.data);

        DBList.value = response.data.data;
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
export { BackupDatabase, RestoreDatabase, GetDBList, DBList };
