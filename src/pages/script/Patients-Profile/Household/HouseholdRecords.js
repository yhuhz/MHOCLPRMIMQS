import { ref } from 'vue'
import MHCDialog from '../../../../components/MHCDialog.vue'
import DeleteConfirmation from '../../../Components/DeleteConfirmation.vue'
import { ToggleDialogState } from '../../../../composables/Triggers'

export default {
  components: { MHCDialog, DeleteConfirmation },
  setup() {

    let searchBy = ref(['Household Name', 'Household ID'])
    let selectedSearchBy = ref('')

    let isAddHousehold = ref(false)

    const columns = [
      {
        name: "id",
        align: "left",
        label: "ID",
        field: "id",
        sortable: true,
      },
      {
        name: "householdName",
        align: "left",
        label: "Household Name",
        field: "householdName",
        sortable: true,
      },
      {
        name: "numberOfPatients",
        align: "left",
        label: "Number of Registered Patients",
        field: "numberOfPatients",
        sortable: true,
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "",
        sortable: false,
      },
    ];

    const rows = [
      {
        id: 12,
        householdName: 'Perez',
        numberOfPatients: 5
      },
      {
        id: 48,
        householdName: 'Gonzales',
        numberOfPatients: 3
      },
      {
        id: 52,
        householdName: 'Reyes',
        numberOfPatients: 8
      }
    ]

    const openDialog = () => {
      ToggleDialogState()
    }

    return {
      searchBy,
      selectedSearchBy,
      isAddHousehold,
      columns,
      rows,
      openDialog
    }
  }
}
