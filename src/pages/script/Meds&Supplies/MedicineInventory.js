import { ref } from 'vue'
import { useQuasar, Loading, date, SessionStorage } from 'quasar'
import {
  GetMedicines,
  Medicines,
  MedicinesList,
  AddMedicine,
  EditMedicine,
  FindMedicinesForRelease,
  AddMultipleMedicineRelease,
} from 'src/composables/Medicine'
import { FindUsersByName, FindUsersByID, FindUsersDepartment } from 'src/composables/Manage_Users'
import { FindPatients } from 'src/composables/Patients'
import DeleteMedicineConfirmation from '../../Components/DeleteMedicineConfirmation.vue'
import { ToggleDialogState } from '../../../composables/Triggers.js'
import MHCDialog from '../../../components/MHCDialog.vue'
import { SetIDS } from 'src/composables/IDS'
import { exportFile } from 'quasar'

export default {
  components: { MHCDialog, DeleteMedicineConfirmation },
  setup() {
    const $q = useQuasar()

    let keySession = SessionStorage.getItem('cred')
    if (keySession === null) {
      router.push({ name: 'login' })
    }
    Medicines.value = []

    /*** Table ***/
    const columns = ref([
      {
        name: 'id',
        align: 'left',
        label: 'ID',
        field: 'medicine_id',
        sortable: true,
      },
      {
        name: 'generic_name',
        align: 'left',
        label: 'Generic Name',
        field: 'generic_name',
        sortable: true,
      },
      {
        name: 'brand_name',
        align: 'left',
        label: 'Brand Name',
        field: 'brand_name',
        sortable: true,
      },
      {
        name: 'med_classification',
        align: 'left',
        label: 'Classification',
        field: 'med_classification',
        sortable: true,
      },
      {
        name: 'dosage_strength',
        align: 'left',
        label: 'Dosage Strength',
        field: 'dosage_strength',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
      },
      {
        name: 'dosage_form',
        align: 'left',
        label: 'Dosage Form',
        field: 'dosage_form',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
      },
      {
        name: 'ptr_number',
        align: 'left',
        label: 'PTR Number',
        field: 'ptr_number',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
      },
      {
        name: 'batch_lot_number',
        align: 'left',
        label: 'Batch/Lot Number',
        field: 'batch_lot_number',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
      },
      {
        name: 'mfg_date',
        align: 'left',
        label: 'Mfg Date',
        field: 'mfg_date',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
      },
      {
        name: 'exp_date',
        align: 'left',
        label: 'Exp Date',
        field: 'exp_date',
        sortable: true,
      },
      {
        name: 'quantity',
        align: 'left',
        label: 'Received',
        field: 'quantity',
        sortable: true,
      },
      {
        name: 'in_stock',
        align: 'left',
        label: 'In Stock',
        field: (row) => row.quantity - row.quantity_released,
        sortable: true,
      },
      {
        name: 'procured_by',
        align: 'left',
        label: 'Procured By',
        field: 'procured_by',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
      },
      {
        name: 'date_added',
        align: 'left',
        label: 'Date Added',
        field: 'date_added',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
      },
      {
        name: 'added_by',
        align: 'left',
        label: 'Added By',
        field: 'added_by',
        sortable: true,
        classes: 'hidden',
        headerClasses: 'hidden',
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
      },
    ])

    //Get Date Diff for exp_date
    let dateToday = date.formatDate(Date.now(), 'YYYY-MM-DD')
    const getExpDateClass = (row) => {
      const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
      const diffDays = Math.round((new Date(row.exp_date) - new Date(dateToday)) / oneDay)
      return diffDays <= 100 ? 'text-red' : ''
    }

    let showFilterModal = ref(false)
    let isAddNewMedicineStock = ref(false)

    /**SEARCH FILTER**/
    let selectedSearchBy = ref('Medicine ID')
    let searchBy = ref([
      'Medicine ID',
      'Generic Name',
      'Brand Name',
      'Classification',
      'Dosage Strength',
      'Dosage Form',
      'PTR Number',
      'Batch/Lot Number',
      'Procured By',
    ])
    let searchString = ref(null)

    /**FILTERS**/
    //In Stock
    let inStock = ref([0, 1000])

    //Status
    let statusList = ['Active', 'Deleted']
    let status_array_model = ref([0])

    //Manufacturing Date
    let mfgDate = ref([])

    //Expiry Date
    let expDate = ref([])

    //Expiry Date
    let dateAdded = ref([])

    const resetFilter = () => {
      status_array_model.value = [0]
      mfgDate.value = []
      expDate.value = []
      dateAdded.value = []
      inStock.value = [0, 1000]
    }

    /**SEARCH FUNCTION**/
    const getRecords = () => {
      let payload = {
        search_by: {
          search_category: selectedSearchBy.value,
          search_string: searchString.value,
        },
        filter: {
          in_stock: inStock.value,
          status: status_array_model.value,
          mfg_date: mfgDate.value,
          exp_date: expDate.value,
          date_added: dateAdded.value,
        },
      }

      // console.log("paylaod", payload);
      Loading.show()
      GetMedicines(payload).then((response) => {
        Loading.hide()
      })
    }

    getRecords()

    /**ADD MEDICINE RECORD**/
    let newMedicineRecord = ref({
      generic_name: null,
      brand_name: null,
      med_classification: null,
      mfg_date: null,
      exp_date: null,
      quantity: null,
      dosage_form: null,
      dosage_strength: null,
      batch_lot_number: null,
      ptr_number: null,
      procured_by: null,
      date_added: date.formatDate(new Date(), 'YYYY-MM-DD'),
      added_by: keySession && keySession.user_id,
      status: 0,
    })

    const addMedicineRecord = () => {
      // console.log(newMedicineRecord.value);
      Loading.show()

      AddMedicine(newMedicineRecord.value).then((response) => {
        Loading.hide()
        isAddNewMedicineStock.value = false
        let status = response.status === 'success' ? 0 : 1

        $q.notify({
          type: status === 0 ? 'positive' : 'negative',
          classes: 'text-white',
          message:
            status === 0 ? 'Medicine record added successfully' : 'Failed to add medicine record',
        })

        onReset()
      })
    }

    const onReset = () => {
      newMedicineRecord.value = {
        generic_name: null,
        brand_name: null,
        med_classification: null,
        mfg_date: null,
        exp_date: null,
        quantity: null,
        dosage_form: null,
        dosage_strength: null,
        batch_lot_number: null,
        ptr_number: null,
        procured_by: null,
        date_added: date.formatDate(new Date(), 'YYYY-MM-DD'),
        added_by: keySession && keySession.user_id,
        status: 0,
      }
    }

    /**EDIT MEDICINE RECORD**/
    let isEditMedicineStock = ref(false)
    let editMedicineRecord = ref({
      generic_name: null,
      brand_name: null,
      med_classification: null,
      mfg_date: null,
      exp_date: null,
      quantity: null,
      dosage_form: null,
      dosage_strength: null,
      batch_lot_number: null,
      ptr_number: null,
      procured_by: null,
      date_added: date.formatDate(new Date(), 'YYYY-MM-DD'),
      added_by: keySession && keySession.user_id,
      status: 0,
    })

    const editRecordModal = (record) => {
      isEditMedicineStock.value = true

      editMedicineRecord.value = {
        medicine_id: record.medicine_id,
        generic_name: record.generic_name,
        brand_name: record.brand_name,
        med_classification: record.med_classification,
        mfg_date: record.mfg_date,
        exp_date: record.exp_date,
        quantity: record.quantity,
        dosage_form: record.dosage_form,
        dosage_strength: record.dosage_strength,
        batch_lot_number: record.batch_lot_number,
        ptr_number: record.ptr_number,
        procured_by: record.procured_by,
        date_added: record.date_added,
        added_by: record.added_by,
        status: 0,
      }
    }

    const editMedicine = () => {
      Loading.show()

      EditMedicine(editMedicineRecord.value).then((response) => {
        Loading.hide()
        isEditMedicineStock.value = false
        let status = response.status === 'success' ? 0 : 1

        $q.notify({
          type: status === 0 ? 'positive' : 'negative',
          classes: 'text-white',
          message:
            status === 0 ? 'Medicine record edited successfully' : 'Failed to edit medicine record',
        })
      })
    }

    /**DELETE MEDICINE RECORD**/
    const openDialog = (medicine_id) => {
      SetIDS(medicine_id)
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
          MedicinesList.value.map((row) =>
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

      const status = exportFile('Medicine Records.csv', content, 'text/csv')

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        })
      }
    }

    /** MEDICINE RELEASE **/
    let isMedicineRelease = ref(false)
    let patientDoctor = ref('Patient')
    let patient_id = ref(null)
    let doctor_id = ref(null)
    let selectedDepartment = ref(null)
    let filtersDepartment = ref([])

    if (patientDoctor.value === 'Patient') {
      filtersDepartment.value = ['Outpatient Department', 'Dental', 'Prenatal and Immunization']
    } else {
      filtersDepartment.value = [
        'Outpatient Department',
        'Dental',
        'Prenatal and Immunization',
        'Pharmacy',
        'Front Desk',
        'Admin Office',
      ]
    }

    const changePatientDoctor = () => {
      patient_id.value = null
      doctor_id.value = null
      selectedDepartment.value = null

      if (patientDoctor.value === 'Patient') {
        filtersDepartment.value = ['Outpatient Department', 'Dental', 'Prenatal', 'Immunization']
      } else {
        filtersDepartment.value = [
          'Outpatient Department',
          'Dental',
          'Prenatal and Immunization',
          'Pharmacy',
          'Front Desk',
          'Admin Office',
        ]
      }
    }

    // let medicineArray = ref([
    //   {
    //     medicine_details: { medicine_name: null, medicine_id: null },
    //     quantity: null,
    //   },
    // ]);

    let btnCondition = ref(true)
    const buttonCondition = (index) => {
      try {
        if (
          medicineArray.value[index].medicine_details.medicine_id !== null &&
          medicineArray.value[index].medicine_details.medicine_id !== '' &&
          medicineArray.value[index].quantity !== null &&
          medicineArray.value[index].quantity !== ''
        ) {
          btnCondition.value = true
        }
      } catch (e) {
        btnCondition.value = false
      }
    }

    let medicineArray = ref([])

    const addMedicine = () => {
      medicineArray.value.push({
        medicine_details: { medicine_name: null, medicine_id: null },
        quantity: null,
      })
    }

    const removeMedicine = (index) => {
      medicineArray.value.splice(index, 1)
    }

    let medicineList = ref([])
    const medicineFilterFunction = (val, update, abort) => {
      if (val.length > 3) {
        update(() => {
          const needle = String(val.toLowerCase())
          FindMedicinesForRelease(needle).then((response) => {
            medicineList.value = []
            if (response.status === 'success') {
              let Medicines = ref([])
              Medicines.value = response.data
              Medicines.value.forEach((m) => {
                let selectValues = {
                  medicine_name:
                    m.generic_name +
                    ' - ' +
                    m.brand_name +
                    ' (' +
                    m.exp_date +
                    ')' +
                    ' (' +
                    (m.quantity - m.quantity_released) +
                    ')',
                  medicine_id: m.medicine_id,
                }
                medicineList.value.push(selectValues)
              })
            }
          })
        })
      } else {
        abort()
      }
    }

    let patientOptions = ref([])

    const patientFilterFunction = (val, update, abort) => {
      if (val && (val.length > 5 || !isNaN(val))) {
        update(() => {
          if (isNaN(val)) {
            const needle = String(val.toLowerCase())
            FindPatients({ name_string: needle }).then((response) => {
              patientOptions.value = []
              if (response.status === 'success') {
                let Patients = ref([])
                Patients.value = response.data
                Patients.value.forEach((p) => {
                  let selectValues = {
                    patient_name: p.patient_id + ' - ' + p.name,
                    patient_id: p.patient_id,
                  }
                  patientOptions.value.push(selectValues)
                })
              }
            })
          } else {
            FindPatients({ id_string: val }).then((response) => {
              patientOptions.value = []
              if (response.status === 'success') {
                let Patients = ref([])
                Patients.value = response.data
                Patients.value.forEach((p) => {
                  let selectValues = {
                    patient_name: p.patient_id + ' - ' + p.name,
                    patient_id: p.patient_id,
                  }
                  patientOptions.value.push(selectValues)
                })
              }
            })
          }
        })
      } else {
        abort()
      }
    }

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
                    department: p.department,
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
                    department: p.department,
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

    const findDepartment = () => {
      if (doctor_id.value !== null) {
        FindUsersDepartment(doctor_id.value).then((response) => {
          selectedDepartment.value = filtersDepartment.value[response.data[0].department - 1]
        })
      } else {
        selectedDepartment.value = null
      }
    }

    const addMedicineReleases = () => {
      let payload = {
        patient_id: patient_id.value,
        doctor_id: doctor_id.value,
        department: filtersDepartment.value.indexOf(selectedDepartment.value) + 1,
        released_by: keySession && keySession.user_id,
        medicine_array: medicineArray.value,
      }

      Loading.show()
      AddMultipleMedicineRelease(payload).then((response) => {
        Loading.hide()
        isMedicineRelease.value = false
        let status = response.status === 'success' ? 0 : 1

        $q.notify({
          type: status === 0 ? 'positive' : 'negative',
          classes: 'text-white',
          message:
            status === 0
              ? 'Medicine releases added successfully'
              : 'Failed to add medicine releases',
        })

        patient_id.value = null
        doctor_id.value = null
        selectedDepartment.value = null
        medicineArray.value = []

        getRecords()
      })
    }

    return {
      selectedSearchBy,
      searchBy,
      searchString,
      columns,
      showFilterModal,
      isAddNewMedicineStock,
      statusList,
      status_array_model,
      mfgDate,
      expDate,
      dateAdded,
      inStock,
      getRecords,
      MedicinesList,
      newMedicineRecord,
      addMedicineRecord,
      onReset,
      openDialog,
      isEditMedicineStock,
      editRecordModal,
      editMedicineRecord,
      editMedicine,
      exportTable,
      keySession,
      dateToday,
      getExpDateClass,
      isMedicineRelease,
      medicineArray,
      medicineList,
      medicineFilterFunction,
      addMedicine,
      removeMedicine,
      patientDoctor,
      patient_id,
      doctor_id,
      changePatientDoctor,
      patientFilterFunction,
      patientOptions,
      userFilterFunction,
      userOptions,
      findDepartment,
      selectedDepartment,
      filtersDepartment,
      addMedicineReleases,
      btnCondition,
      buttonCondition,
      resetFilter,
    }
  },
}
