import { ref } from 'vue'

export default {
  setup() {

    const columns = ref([
      {
        name: "id",
        align: "left",
        label: "ID",
        field: "id",
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
        sortable: true,
      },
      {
        name: "department",
        align: "left",
        label: "Department",
        field: "department",
        sortable: true,
      },
      {
        name: "quantity",
        align: "left",
        label: "Quantity",
        field: "quantity",
        sortable: true,
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
        sortable: true,
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "action",
        sortable: false,
      },
    ]);

    const rows = ref([
      {
        id: "12A",
        name: "Jose Francisco Sinta Perez Sr.",
        department: 'OPD',
        quantity: '2',
        date: '03/22/2023'
      },
      {
        id: "12C",
        name: "Jose Francisco Muncia Perez Jr.",
        department: 'Dental',
        quantity: '1',
        date: '03/22/2023'
      },
      {
        id: "6",
        name: "Aileen Montes Logronio",
        department: 'Prenatal',
        quantity: '50',
        date: '03/22/2023'
      },
      {
        id: "25B",
        name: "Frances Josefa Merlin Santos",
        department: 'Immunization',
        quantity: '3',
        date: '03/22/2023'
      },
      {
        id: "12A",
        name: "Jose Francisco Sinta Perez Sr.",
        department: 'OPD',
        quantity: '2',
        date: '03/22/2023'
      },
      {
        id: "12A",
        name: "Jose Francisco Sinta Perez Sr.",
        department: 'OPD',
        quantity: '2',
        date: '03/22/2023'
      },
      {
        id: "12A",
        name: "Jose Francisco Sinta Perez Sr.",
        department: 'OPD',
        quantity: '2',
        date: '03/22/2023'
      },
      {
        id: "12A",
        name: "Jose Francisco Sinta Perez Sr.",
        department: 'OPD',
        quantity: '2',
        date: '03/22/2023'
      },
      {
        id: "12A",
        name: "Jose Francisco Sinta Perez Sr.",
        department: 'OPD',
        quantity: '2',
        date: '03/22/2023'
      },
      {
        id: "12A",
        name: "Jose Francisco Sinta Perez Sr.",
        department: 'OPD',
        quantity: '2',
        date: '03/22/2023'
      },
      {
        id: "12A",
        name: "Jose Francisco Sinta Perez Sr.",
        department: 'OPD',
        quantity: '2',
        date: '03/22/2023'
      },
    ])

    let isAddNewMedicineRelease = ref(false)
    let selectedReleaseCategory = ref('patient')
    let department = ref(['OPD', 'Dental', 'Prenatal', 'Immunization'])

    /**** Filters ****/
    let filtersDepartment = ref(['All', 'Admin', 'OPD', 'Dental', 'Prenatal & Immunization', 'Pharmacy'])
    let selectedFiltersDepartment = ref(['All'])

    let releaseTo = ref(['Patients', 'Staff'])
    let selectedReleaseTo = ref(['Patients']);

    let filterStatus = ref(['Active', 'Deleted'])
    let selectedFilterStatus = ref(['Active'])

    return {
      columns,
      rows,
      isAddNewMedicineRelease,
      selectedReleaseCategory,
      department,
      filtersDepartment,
      selectedFiltersDepartment,
      releaseTo,
      selectedReleaseTo,
      filterStatus,
      selectedFilterStatus
    };
  }
}
