import { ref } from "vue"

export default {
  setup() {

    let departmentList = ref(["OPD", "Dental", "Prenatal", "Immunization"])
    let selectedDepartment = ref("OPD")


    // Doctors Notes
    let checkupDate = ref("")
    let nextCheckupDate = ref("")

    return {
      departmentList,
      selectedDepartment,
      checkupDate,
      nextCheckupDate
    }
  }
}
