import { ref } from 'vue'
import MHCDialog from '../../../../components/MHCDialog.vue'
import DeleteHouseholdConfirmation from '../../../Components/DeleteHouseholdConfirmation.vue'
import { ToggleDialogState } from '../../../../composables/Triggers.js'
import {
  FindHouseholdByID,
  FindHouseholdByName,
  HouseholdsList,
  AddHousehold,
  UpdateHousehold,
} from 'src/composables/Household'
import { SetIDS } from 'src/composables/IDS'
import { Loading, useQuasar, SessionStorage } from 'quasar'
import { exportFile } from 'quasar'
import { useRouter } from 'vue-router'

export default {
  components: { MHCDialog, DeleteHouseholdConfirmation },
  setup() {
    const $q = useQuasar()
    const router = useRouter()

    //SESSION KEYS
    let keySession = SessionStorage.getItem('cred')
    if (keySession == NaN || keySession == null) {
      router.push({ name: 'login' })
    }

    let searchBy = ref(['Household Name', 'Household ID'])
    let selectedSearchBy = ref('Household Name')

    //Filter
    let showFilterModal = ref(false)
    let statusList = ref(['Active', 'Deleted'])
    let dateAdded = ref([])
    let status_array_model = ref([0])

    let searchValue = ref(null)
    let downloadDisable = ref(typeof HouseholdsList.value === 'undefined' ? true : false)

    let isAddHousehold = ref(false)

    const columns = ref([
      {
        name: 'household_id',
        align: 'left',
        label: 'Household ID',
        field: 'household_id',
        sortable: true,
      },
      {
        name: 'household_name',
        align: 'left',
        label: 'Household Name',
        field: 'household_name',
        sortable: true,
      },
      {
        name: 'household_head',
        align: 'left',
        label: 'Head of Household',
        field: 'household_head',
        sortable: true,
      },
      {
        name: 'address',
        align: 'left',
        label: 'Address',
        field: (row) =>
          (row.address_line ? row.address_line + ', ' : '') +
          row.barangay +
          ', ' +
          row.municipality +
          ', ' +
          row.province,
        sortable: true,
      },
      {
        name: 'patient_count',
        align: 'left',
        label: 'No. of Patients',
        field: 'patient_count',
        sortable: true,
      },
      {
        name: 'action',
        align: 'left',
        label: '',
        field: '',
        sortable: false,
      },
    ])

    const getHouseholds = () => {
      let payload = {
        status: status_array_model.value,
        search_string: searchValue.value,
      }
      if (selectedSearchBy.value === 'Household ID') {
        FindHouseholdByID(payload).then((response) => {
          downloadDisable.value = typeof HouseholdsList.value === 'undefined' ? true : false
        })
      } else {
        FindHouseholdByName(payload).then((response) => {
          downloadDisable.value = typeof HouseholdsList.value === 'undefined' ? true : false
        })
      }
    }

    getHouseholds()

    FindHouseholdByID({
      status: status_array_model.value,
      search_string: searchValue.value,
    })

    let provinceList = [
      'Albay',
      'Sorsogon',
      'Masbate',
      'Camarines Sur',
      'Camarines Norte',
      'Catanduanes',
    ]

    let municipalityList = [
      'Legazpi City',
      'Ligao City',
      'Tabaco City',
      'Bacacay',
      'Camalig',
      'Daraga',
      'Guinobatan',
      'Jovellar',
      'Libon',
      'Malilipot',
      'Malinao',
      'Manito',
      'Oas',
      'Pio Duran',
      'Polangui',
      'Rapu-Rapu',
      'Santo Domingo',
      'Tiwi',
    ]

    let barangayList = [
      'Anoling',
      'Baligang',
      'Bantonan',
      'Brgy. 1 (Pob)',
      'Brgy.2 (Pob)',
      'Brgy.3 (Pob)',
      'Brgy.4 (Pob)',
      'Brgy.5 (Pob)',
      'Brgy.6 (Pob)',
      'Brgy.7 (Pob)',
      'Bariw',
      'Binanderahan',
      'Binitayan',
      'Bongabong',
      'Cabagñan',
      'Cabraran Pequeño',
      'Caguiba',
      'Calabidongan',
      'Comun',
      'Cotmon',
      'Del Rosario',
      'Gapo',
      'Gotob',
      'Ilawod',
      'Iluluan',
      'Libod',
      'Ligban',
      'Mabunga',
      'Magogon',
      'Manawan',
      'Maninila',
      'Mina',
      'Miti',
      'Palanog',
      'Panoypoy',
      'Pariaan',
      'Quinartilan',
      'Quirangay',
      'Quitinday',
      'Salugan',
      'Solong',
      'Sua',
      'Sumlang',
      'Tagaytay',
      'Tagoytoy',
      'Taladong',
      'Taloto',
      'Taplacon',
      'Tinago',
      'Tumpa',
    ]

    let householdInfo = ref({
      household_name: null,
      household_head: null,
      address_line: null,
      barangay: null,
      municipality: 'Camalig',
      province: 'Albay',
      status: 0,
    })

    const changeProvince = () => {
      if (householdInfo.value.province !== 'Albay') {
        householdInfo.value.municipality = null
        householdInfo.value.barangay = null
      }
    }

    const changeMunicipality = () => {
      if (householdInfo.value.municipality !== 'Camalig') {
        householdInfo.value.barangay = null
      }
    }

    let brgyOptions = ref([])
    const brgyFilter = (val, update, abort) => {
      update(() => {
        if (val.length === '') {
          brgyOptions.value = barangayList
        } else {
          const needle = val.toLowerCase()
          brgyOptions.value = barangayList.filter((v) => v.toLowerCase().indexOf(needle) > -1)
        }
      })
    }

    const addHousehold = () => {
      Loading.show()
      AddHousehold(householdInfo.value).then((response) => {
        Loading.hide()

        let status = response.status === 'success' ? 0 : 1

        $q.notify({
          type: status === 0 ? 'positive' : 'negative',
          classes: 'text-white',
          message:
            status === 0 ? 'Household record added successfully' : 'Failed to add household record',
        })
      })
    }

    let isEditHousehold = ref(false)

    const openDialogEdit = (row) => {
      isEditHousehold.value = true
      householdInfo.value = {
        household_id: row.household_id,
        household_name: row.household_name,
        household_head: row.household_head,
        province: row.province,
        municipality: row.municipality,
        barangay: row.barangay,
        address_line: row.address_line,
      }
    }

    const editHousehold = () => {
      Loading.show()
      UpdateHousehold(householdInfo.value).then((response) => {
        Loading.hide()

        let status = response.status === 'success' ? 0 : 1

        $q.notify({
          type: status === 0 ? 'positive' : 'negative',
          classes: 'text-white',
          message:
            status === 0
              ? 'Household record edited successfully'
              : 'Failed to edit household record',
        })

        isEditHousehold.value = false
      })
    }

    const deleteRecord = (household_id) => {
      SetIDS(household_id)
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
          HouseholdsList.value.map((row) =>
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

      const status = exportFile('Household Records.csv', content, 'text/csv')

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        })
      }
    }

    return {
      searchBy,
      selectedSearchBy,
      isAddHousehold,
      columns,
      deleteRecord,
      HouseholdsList,
      searchValue,
      getHouseholds,
      downloadDisable,
      householdInfo,
      addHousehold,
      isEditHousehold,
      editHousehold,
      openDialogEdit,
      showFilterModal,
      statusList,
      dateAdded,
      status_array_model,
      exportTable,
      keySession,
      provinceList,
      municipalityList,
      changeProvince,
      brgyOptions,
      brgyFilter,
      changeMunicipality,
    }
  },
}
