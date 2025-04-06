import { ref, readonly } from "vue";
/**
 * Container of list ID | Use this when deleting a record(s)
 */
let IDList = ref(null);
// let IDList = readonly(ID.value);
const SetIDS = (payload, department) => {
  IDList.value = { id: payload, department: department };
  // console.log("IDList ", IDList.value);
};

export { IDList, SetIDS };
