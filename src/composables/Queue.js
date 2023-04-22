import axios from "axios";
import { ref, readonly } from "vue";
let Queue = ref([]);
let QueueList = readonly(Queue);
let QueueSpecific = ref([]);
let LastQueueNumber = ref([]);
let pathlink = "http://localhost/MHOCLPRMIMQS/src/PHP/Queue/queue_api.php";
/**
 * This function accepts parameters of an array then
 * set the passed array to Queue data.
 * @param {*} object
 */

let GetQueue = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink)
      .then((response) => {
        console.log("Get data from DB to queue");
        // console.log(response.data.data);
        Queue.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let GetQueueSpecific = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          department: payload,
        },
      })
      .then((response) => {
        // console.log("Get data from DB to queue");
        // console.log("Queue Specific", response.data);
        QueueSpecific.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let GetLastQueueNumber = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .get(pathlink, {
        params: {
          department_specific: payload.department,
          priority: payload.priority,
        },
      })
      .then((response) => {
        // console.log(response.data);
        LastQueueNumber.value = response.data.data;
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * This function accepts parameters of an object then
 * add the passed object to Queue data.
 * @param {*} object
 */
let AddToQueue = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(pathlink, payload)
      .then((response) => {
        if (response.data.status === "success") {
          // console.log(response.data);
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
 * updates the Queue specific data based on the id passed in the object.
 * @param {*} object
 */
/**CALL IN NEXT PATIENT**/
let CallNextPatient = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .put(pathlink, payload)
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "success") {
          let objectIndex = QueueSpecific.value.findIndex(
            (e) => e.queue_id === payload.next_patient
          );
          // if index not found (-1) update nothing !
          QueueSpecific.value[objectIndex].is_current = 1;

          let objectIndexDelete = QueueSpecific.value.findIndex(
            (e) => e.queue_id === payload.current_patient
          );
          // if index not found (-1) update nothing !
          objectIndexDelete !== -1 &&
            QueueSpecific.value.splice(objectIndexDelete, 1);
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
 * delete the data in the Queue based on this parameter.
 * @param {*} array
 */
let RemovePatientFromQueue = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?queue_id=" + payload.queue_id)
      .then((response) => {
        if (response.data.status === "success") {
          let objectIndex = QueueSpecific.value.findIndex(
            (e) => e.queue_id === payload.queue_id
          );
          // if index not found (-1) delete nothing !
          objectIndex !== -1 && QueueSpecific.value.splice(objectIndex, 1);
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

let ClearDepartmentQueue = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(pathlink + "?department=" + payload.department)
      .then((response) => {
        if (response.data.status === "success") {
          if (payload.department === 1) {
            Queue.value.OPD = [];
          } else if (payload.department === 2) {
            Queue.value.Dental = [];
          } else if (payload.department === 3) {
            Queue.value.Prenatal = [];
          } else if (payload.department === 7) {
            Queue.value.Immunization = [];
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
 * Export QueueList as readonly (real time copy of Queue)
 */
export {
  Queue,
  QueueList,
  GetQueue,
  QueueSpecific,
  GetQueueSpecific,
  AddToQueue,
  CallNextPatient,
  RemovePatientFromQueue,
  ClearDepartmentQueue,
  LastQueueNumber,
  GetLastQueueNumber,
};
