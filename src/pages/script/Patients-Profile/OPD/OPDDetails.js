import { ref, watch } from 'vue'
import _ from 'lodash'
import MHCDialog from '../../../../components/MHCDialog.vue'
import DeletePatientRecordConfirmation from '../../../Components/DeletePatientRecordConfirmation.vue'
import { ToggleDialogState } from '../../../../composables/Triggers.js'
import { SetIDS } from 'src/composables/IDS'
import { useRoute, useRouter } from 'vue-router'
import {
  FindRecordDetails,
  RecordDetails,
  UpdateRecord,
  RecordArrays,
} from 'src/composables/Records'
import { FindUsersByName } from 'src/composables/Manage_Users'
import { Loading, SessionStorage, useQuasar, date } from 'quasar'
import { editForm } from '../PatientDetails.js'
import { FindMedicines } from 'src/composables/Medicine'

export default {
  components: { MHCDialog, DeletePatientRecordConfirmation },
  setup() {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()

    //SESSION KEYS
    let keySession = SessionStorage.getItem('cred')
    if (keySession == NaN || keySession == null) {
      router.push({ name: 'login' })
    }

    let editForm = ref(false)

    Loading.show()

    let patientRecordInfo = ref({})
    let disease = ref([])
    let lab_results = ref([])
    let prescription = ref([])

    FindRecordDetails(route.params.record_id, route.params.department).then((response) => {
      Loading.hide()
    })

    let checkup_date = ref(null)

    watch(
      () => _.cloneDeep(RecordDetails.value),
      () => {
        editForm.value = false
        patientRecordInfo.value = {
          record_id: route.params.record_id,
          preliminary_checkup_done_by: {
            user_id: RecordDetails.value.preliminary_checkup_done_by,
            user_name: RecordDetails.value.preliminary_checkup_done_by_name,
          },
          temperature: RecordDetails.value.temperature,
          blood_pressure_systole: RecordDetails.value.blood_pressure_systole,
          blood_pressure_diastole: RecordDetails.value.blood_pressure_diastole,
          height: RecordDetails.value.height,
          weight: RecordDetails.value.weight,
          pulse_rate: RecordDetails.value.pulse_rate,
          oxygen_sat: RecordDetails.value.oxygen_sat,
          doctor_id: {
            user_id: RecordDetails.value.doctor_id
              ? RecordDetails.value.doctor_id
              : keySession && keySession.user_id,
            user_name: RecordDetails.value.doctor_id
              ? RecordDetails.value.doctor_name
              : keySession &&
                keySession.first_name +
                  ' ' +
                  keySession.last_name +
                  ' ' +
                  (keySession.suffix ? keySession.suffix : ''),
          },
          complaint: RecordDetails.value.complaint,
          checkup_date: RecordDetails.value.checkup_date,
          next_checkup:
            RecordDetails.value.next_checkup === '' ||
            RecordDetails.value.next_checkup === '0000-00-00'
              ? RecordDetails.value.checkup_date
              : RecordDetails.value.next_checkup,
          checkup_results: RecordDetails.value.checkup_results,
          status: 0,
        }

        checkup_date.value = patientRecordInfo.value.checkup_date.replaceAll('-', '/')
      },
    )

    watch(
      () => _.cloneDeep(RecordArrays.value),
      () => {
        disease.value = RecordArrays.value.disease
        lab_results.value = RecordArrays.value.lab_results
        prescription.value = RecordArrays.value.prescription
      },
    )

    let userOptions = ref([])

    const userFilterFunction = (val, update, abort) => {
      if (val.length > -1) {
        update(() => {
          const needle = String(val.toLowerCase())
          FindUsersByName(needle).then((response) => {
            userOptions.value = []
            if (response.status === 'success') {
              let Users = ref([])
              Users.value = response.data
              Users.value.forEach((p) => {
                let selectValues = {
                  user_name: p.user_name,
                  user_id: p.id,
                }
                userOptions.value.push(selectValues)
              })
            }
          })
        })
      } else {
        abort()
      }
    }

    let cancelFunction = () => {
      Loading.show()
      editForm.value = false
      FindRecordDetails(route.params.record_id, route.params.department).then((response) => {
        Loading.hide()
      })
    }

    let findingOptions = [
      'Cough',
      'Common Cold',
      'UTI',
      'Physical Injury',
      'Chickenpox',
      'Measles',
      'Asthma',
      'Conjuncvitis',
      'Influenza',
      'Food Poisoning',
      'Hyperthermia',
      'Mumps',
      'Rabies',
      'Skin Condition',
      'Dengue',
      'Allergies',
      'Migraine',
      'Hypertension',
      'Diarrhea',
      'Pneumonia',
    ]
    findingOptions.sort()

    let findingOptionsFiltered = ref([])
    const findingsFilter = (val, update, abort) => {
      update(() => {
        if (val.length === '') {
          findingOptionsFiltered.value = findingOptions
        } else {
          const needle = val.toLowerCase()
          findingOptionsFiltered.value = findingOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1,
          )
        }
      })
    }

    const addFinding = () => {
      disease.value.push({
        opd_disease: '',
        date_added: patientRecordInfo.value.checkup_date,
      })
    }

    const removeFinding = (index) => {
      disease.value.splice(index, 1)
    }

    const addLabResult = () => {
      lab_results.value.push({
        lab_result: '',
      })
    }

    const removeLabResult = (index) => {
      lab_results.value.splice(index, 1)
    }

    const addPrescription = () => {
      prescription.value.push({
        medicine_name: '',
        quantity: '',
      })
    }

    const removePrescription = (index) => {
      prescription.value.splice(index, 1)
    }

    const closePrescription = () => {
      isPrescription.value = false

      if (
        prescription.value.length !== 0 &&
        (prescription.value[prescription.value.length - 1].medicine_name === '' ||
          prescription.value[prescription.value.length - 1].quantity === '')
      ) {
        removePrescription(prescription.value.length - 1)
      }
    }

    const editFunction = () => {
      if (
        disease.value.length !== 0 &&
        disease.value[disease.value.length - 1].opd_disease === ''
      ) {
        removeFinding(disease.value.length - 1)
      }

      if (
        lab_results.value.length !== 0 &&
        lab_results.value[lab_results.value.length - 1].lab_result === ''
      ) {
        removeLabResult(lab_results.value.length - 1)
      }

      editForm.value = false

      patientRecordInfo.value.disease = disease.value
      patientRecordInfo.value.lab_results = lab_results.value
      patientRecordInfo.value.prescription = prescription.value

      if (typeof patientRecordInfo.value.preliminary_checkup_done_by === 'object') {
        patientRecordInfo.value.preliminary_checkup_done_by =
          patientRecordInfo.value.preliminary_checkup_done_by.user_id
      }

      if (patientRecordInfo.value.doctor_id.user_id != null) {
        patientRecordInfo.value.doctor_id = patientRecordInfo.value.doctor_id.user_id
      }

      Loading.show()

      UpdateRecord(patientRecordInfo.value, route.params.department).then((response) => {
        Loading.hide()

        let status = response.status === 'success' ? 0 : 1

        $q.notify({
          type: status === 0 ? 'positive' : 'negative',
          classes: 'text-white',
          message:
            status === 0 ? 'Patient record edited successfully' : 'Failed to edit patient record',
        })
      })
    }

    const openDialog = () => {
      SetIDS(route.params.record_id, route.params.department)
      ToggleDialogState()
    }

    /**PRESCRIPTIONS**/
    let isPrescription = ref(false)

    let medicineList = ref([])
    const medicineFilterFunction = (val, update, abort) => {
      if (val.length > 3) {
        update(() => {
          const needle = String(val.toLowerCase())
          FindMedicines(needle).then((response) => {
            medicineList.value = []
            if (response.status === 'success') {
              let Medicines = ref([])
              Medicines.value = response.data
              Medicines.value.forEach((m) => {
                let selectValues = {
                  medicine_name: m.generic_name + ' - ' + m.brand_name,
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

    return {
      RecordDetails,
      patientRecordInfo,
      editForm,
      editFunction,
      addFinding,
      addLabResult,
      removeLabResult,
      removeFinding,
      cancelFunction,
      userOptions,
      userFilterFunction,
      openDialog,
      lab_results,
      disease,
      keySession,
      checkup_date,
      isPrescription,
      prescription,
      addPrescription,
      removePrescription,
      medicineList,
      medicineFilterFunction,
      closePrescription,
      findingsFilter,
      findingOptionsFiltered,
    }
  },
}
