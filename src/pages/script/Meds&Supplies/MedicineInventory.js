import { ref } from 'vue'

export default {
  setup() {

    let selectedSearchBy = ref("")
    let searchBy = ref([
      "Brand Name",
      "Generic Name",
      "Medicine ID",
      "Classification",
      "Batch/Lot Number",
      "Procured By"
    ])

    /*** Table ***/
    const columns = ref([
      {
        name: "id",
        align: "left",
        label: "ID",
        field: 'id',
        sortable: true
      },
      {
        name: "genericName",
        align: "left",
        label: "Generic Name",
        field: 'genericName',
        sortable: true
      },
      {
        name: "brandName",
        align: "left",
        label: "Brand Name",
        field: 'brandName',
        sortable: true
      },
      {
        name: "classification",
        align: "left",
        label: "Classification",
        field: 'classification',
        sortable: true
      },
      {
        name: "expirationDate",
        align: "left",
        label: "Exp Date",
        field: 'expirationDate',
        sortable: true
      },
      {
        name: "received",
        align: "left",
        label: "Received",
        field: 'received',
        sortable: true
      },
      {
        name: "inStock",
        align: "left",
        label: "In Stock",
        field: 'inStock',
        sortable: true
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: 'action'
      }
    ])

    const rows = ref([
      {
        id: "1",
        genericName: "Paracetamol",
        brandName: "Biogesic",
        classification: "Analgesic",
        expirationDate: "02/25/2026",
        received: "500",
        inStock: "300"
      },
      {
        id: "2",
        genericName: "Paracetamol",
        brandName: "Biogesic",
        classification: "Analgesic",
        expirationDate: "01/16/2026",
        received: "400",
        inStock: "200"
      },
    ])

    let showFilterModal = ref(false)
    let isAddNewMedicineStock = ref(false)

    return {
      selectedSearchBy,
      searchBy,
      columns,
      rows,
      showFilterModal,
      isAddNewMedicineStock
    }
  }
}
