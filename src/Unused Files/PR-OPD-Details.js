import { ref } from "vue"

export default {
  setup() {

    let departmentList = ref(["OPD", "Dental", "Prenatal", "Immunization"])
    let selectedDepartment = ref("OPD")

    // Table
    const columns = ref([
      {
        name: "recordID",
        align: "left",
        label: "Record ID",
        field: "recordID",
        sortable: true
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
        sortable: true
      }
    ])

    const rows = ref([
      {
        recordID: "OPD147",
        date: "01/03/2023"
      },
      {
        recordID: "OPD148",
        date: "01/03/2023"
      },
      {
        recordID: "OPD149",
        date: "01/03/2023"
      }
    ])


    return {
      departmentList,
      selectedDepartment,
      columns,
      rows
    }
  }
}
