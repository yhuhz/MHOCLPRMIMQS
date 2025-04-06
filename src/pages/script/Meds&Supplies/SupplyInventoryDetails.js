import { ref, watch } from 'vue'
import _ from 'lodash'
import {
  FindSupplyDetails,
  SupplyDetails,
  SupplyRelease,
  FindSupplyRelease,
  AddSupplyRelease,
  EditSupplyRelease,
} from 'src/composables/Supply'
import { FindUsersByID, FindUsersByName } from 'src/composables/Manage_Users'
import { Loading, useQuasar, SessionStorage, date } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import DeleteSupplyConfirmation from '../../Components/DeleteSupplyConfirmation.vue'
import { ToggleDialogState } from '../../../composables/Triggers.js'
import MHCDialog from '../../../components/MHCDialog.vue'
import { SetIDS } from 'src/composables/IDS'
import { exportFile } from 'quasar'

export default {
  components: { MHCDialog, DeleteSupplyConfirmation },
  setup() {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()

    //SESSION KEYS
    let keySession = SessionStorage.getItem('cred')
    if (keySession == NaN || keySession == null) {
      router.push({ name: 'login' })
    }

    Loading.show()
    FindSupplyDetails(route.params.supply_id).then((response) => {
      Loading.hide()
    })
    SupplyRelease.value = []

    let supplyDetails = ref({})
    watch(
      () => _.cloneDeep(SupplyDetails.value),
      () => {
        supplyDetails.value = {
          supply_id: route.params.supply_id,
          supply_name: SupplyDetails.value.supply_name,
          supply_type: SupplyDetails.value.supply_type,
          mfg_date: SupplyDetails.value.mfg_date,
          exp_date: SupplyDetails.value.exp_date,
          date_added: SupplyDetails.value.date_added,
          quantity: SupplyDetails.value.quantity,
          quantity_released: SupplyDetails.value.quantity_released,
          in_stock: SupplyDetails.value.quantity - SupplyDetails.value.quantity_released,
          quantity_type: SupplyDetails.value.quantity_type,
          procured_by: SupplyDetails.value.procured_by,
          added_by: SupplyDetails.value.added_by,
          status: SupplyDetails.value.status,
        }
      },
    )

    let status_list = ['Active', 'Deleted']

    const columns = ref([
      {
        name: 'supply_release_id',
        align: 'left',
        label: 'ID',
        field: 'supply_release_id',
        sortable: true,
      },
      {
        name: 'supply_id',
        align: 'left',
        label: 'Supply ID',
        field: 'supply_id',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
      },
      {
        name: 'user_name',
        align: 'left',
        label: 'Name',
        field: 'user_name',
        sortable: true,
      },
      {
        name: 'department',
        align: 'left',
        label: 'Department',
        field: (row) => filtersDepartment[row.department - 1],
        sortable: true,
      },
      {
        name: 'quantity',
        align: 'left',
        label: 'Quantity',
        field: 'quantity',
        sortable: true,
      },
      {
        name: 'date',
        align: 'left',
        label: 'Date',
        field: 'release_date',
        sortable: true,
      },
      {
        name: 'status',
        align: 'left',
        label: 'Status',
        field: 'status',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
      },
      {
        name: 'action',
        align: 'left',
        label: '',
        field: 'action',
        sortable: false,
      },
    ])

    /**** Filters ****/
    let filtersDepartment = [
      'Outpatient Department',
      'Dental',
      'Prenatal and Immunization',
      'Pharmacy',
      'Front Desk',
      'Admin Office',
    ]
    let selectedFiltersDepartment = ref([])
    let select_all_dept = ref(true)
    let dept_checkbox_disable = ref(false)

    if (select_all_dept.value === true) {
      filtersDepartment.forEach((element, index) => {
        selectedFiltersDepartment.value.push(index + 1)
      })
      dept_checkbox_disable.value = true
    } else {
      selectedFiltersDepartment.value = []
      dept_checkbox_disable.value = false
    }

    const select_all_dept_change = () => {
      if (select_all_dept.value === true) {
        filtersDepartment.forEach((element, index) => {
          selectedFiltersDepartment.value.push(index + 1)
        })
      } else {
        selectedFiltersDepartment.value = []
        dept_checkbox_disable.value = false
      }
    }

    let releaseTo = ref(['Patients', 'Staff'])
    let selectedReleaseTo = ref([0, 1])

    let filterStatus = ref(['Active', 'Deleted'])
    let selectedFilterStatus = ref([0])
    let quantityReleased = ref([0, 1000])
    let dateReleased = ref([])

    let loading = ref(false)

    const search = () => {
      loading.value = true
      let payload = {
        supply_id: route.params.supply_id,
        department: selectedFiltersDepartment.value,
        released_to: selectedReleaseTo.value,
        status: selectedFilterStatus.value,
        quantity_released: quantityReleased.value,
        date_release: dateReleased.value,
      }
      // console.log("payload", payload);

      FindSupplyRelease(payload).then((response) => {
        loading.value = false
      })
    }

    loading.value = true
    let payload = {
      supply_id: route.params.supply_id,
      department: selectedFiltersDepartment.value,
      released_to: selectedReleaseTo.value,
      status: selectedFilterStatus.value,
      quantity_released: quantityReleased.value,
      date_release: dateReleased.value,
    }
    FindSupplyRelease(payload).then((response) => {
      loading.value = false
    })

    let userOptions = ref([])
    const userFilterFunction = (val, update, abort) => {
      if (val.length > 5 || !isNaN(val)) {
        update(() => {
          if (isNaN(val)) {
            const needle = String(val.toLowerCase())
            FindUsersByName(needle).then((response) => {
              userOptions.value = []
              if (response.status === 'success') {
                let Users = ref([])
                Users.value = response.data
                Users.value.forEach((p) => {
                  let selectValues = {
                    user_name: p.id + ' - ' + p.user_name,
                    user_id: p.id,
                  }
                  userOptions.value.push(selectValues)
                })
              }
            })
          } else {
            FindUsersByID(val).then((response) => {
              userOptions.value = []
              if (response.status === 'success') {
                let Users = ref([])
                Users.value = response.data
                Users.value.forEach((p) => {
                  let selectValues = {
                    user_name: p.id + ' - ' + p.user_name,
                    user_id: p.id,
                  }
                  userOptions.value.push(selectValues)
                })
              }
            })
          }
        })
      } else {
        abort()
      }
    }

    /**ADD MEDICINE RELEASE RECORD**/
    let isAddNewSupplyRelease = ref(false)
    let newSupplyRelease = ref({
      supply_id: route.params.supply_id,
      user_id: null,
      department: null,
      quantity: null,
      released_by: keySession && keySession.user_id,
      release_date: date.formatDate(new Date(), 'YYYY-MM-DD'),
    })

    const onReset = () => {
      newSupplyRelease.value = {
        supply_id: route.params.supply_id,
        user_id: null,
        department: null,
        quantity: null,
        released_by: keySession && keySession.user_id,
        release_date: date.formatDate(new Date(), 'YYYY-MM-DD'),
      }
    }

    const addReleaseRecord = () => {
      newSupplyRelease.value.department =
        filtersDepartment.indexOf(newSupplyRelease.value.department) + 1

      // console.log(newSupplyRelease.value);

      Loading.show()
      AddSupplyRelease(newSupplyRelease.value).then((response) => {
        let status = response.status === 'success' ? 0 : 1

        $q.notify({
          type: status === 0 ? 'positive' : 'negative',
          classes: 'text-white',
          message:
            status === 0
              ? 'Supply release record added successfully'
              : 'Failed to add supply release record',
        })

        FindSupplyDetails(route.params.supply_id).then((response) => {
          Loading.hide()
        })
        status === 0 && onReset()
        isAddNewSupplyRelease.value = false
      })
    }

    /**EDIT MEDICINE RELEASE RECORD**/
    let isEditSupplyRelease = ref(false)
    let editMedReleaseInfo = ref({})

    const openEditModal = (supply_release_info) => {
      isEditSupplyRelease.value = true

      editMedReleaseInfo.value = {
        supply_release_id: supply_release_info.supply_release_id,
        supply_id: route.params.supply_id,
        user_id: supply_release_info.user_id,
        department: filtersDepartment[supply_release_info.department - 1],
        quantity: supply_release_info.quantity,
        released_by: supply_release_info.released_by,
        release_date: supply_release_info.release_date,
      }
    }

    const editSupplyRelease = () => {
      editMedReleaseInfo.value.department =
        filtersDepartment.indexOf(editMedReleaseInfo.value.department) + 1

      // console.log(editMedReleaseInfo.value);
      EditSupplyRelease(editMedReleaseInfo.value).then((response) => {
        let status = response.status === 'success' ? 0 : 1

        $q.notify({
          type: status === 0 ? 'positive' : 'negative',
          classes: 'text-white',
          message:
            status === 0
              ? 'Supply release record edited successfully'
              : 'Failed to edit supply release record',
        })

        FindSupplyDetails(route.params.supply_id).then((response) => {
          Loading.hide()
        })
        isEditSupplyRelease.value = false
      })
    }

    /**DELETE MEDICINE RELEASE RECORD**/
    const openDialog = (supply_release_id) => {
      SetIDS({
        supply_release_id: supply_release_id,
        supply_id: route.params.supply_id,
      })
      ToggleDialogState()
    }

    /**EXPORT TABLE**/
    const wrapCsvValue = (val, formatFn, row) => {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val

      formatted = formatted === void 0 || formatted === null ? '' : String(formatted)

      formatted = formatted.split('"').join('""')
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`
    }

    const exportTable = () => {
      // naive encoding to csv format
      const content = [columns.value.map((col) => wrapCsvValue(col.label))]
        .concat(
          SupplyRelease.value.map((row) =>
            columns.value
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row,
                ),
              )
              .join(','),
          ),
        )
        .join('\r\n')

      const status = exportFile(
        'Supply Release for Supply ID ' + route.params.supply_id + ' Records.csv',
        content,
        'text/csv',
      )

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        })
      }
    }

    return {
      columns,
      isAddNewSupplyRelease,
      filtersDepartment,
      selectedFiltersDepartment,
      releaseTo,
      selectedReleaseTo,
      filterStatus,
      selectedFilterStatus,
      SupplyDetails,
      SupplyRelease,
      supplyDetails,
      status_list,
      select_all_dept_change,
      dept_checkbox_disable,
      select_all_dept,
      loading,
      quantityReleased,
      dateReleased,
      search,
      openDialog,
      exportTable,
      newSupplyRelease,
      addReleaseRecord,
      onReset,
      isEditSupplyRelease,
      editMedReleaseInfo,
      openEditModal,
      editSupplyRelease,
      userFilterFunction,
      userOptions,
      keySession,
    }
  },
}
