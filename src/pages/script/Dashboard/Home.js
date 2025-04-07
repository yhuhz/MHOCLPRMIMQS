/* eslint-disable use-isnan */
import { ref } from 'vue'
import { useQuasar, SessionStorage, Loading } from 'quasar'
import MHCDialog from '../../../components/MHCDialog.vue'
import RemoveFromQueue from '../../Components/RemoveFromQueue.vue'
import { ToggleDialogState } from '../../../composables/Triggers.js'
import { useRouter } from 'vue-router'

export default {
  components: { MHCDialog, RemoveFromQueue },
  setup() {
    const router = useRouter()
    const $q = useQuasar()

    //Session Storage
    let keySession = SessionStorage.getItem('cred')
    if (!keySession) {
      router.push({ name: 'login' })
    }

    let currentPatient = ref()

    let patientList = [
      {
        patient_id: 'DF1345',
        queue_number: 1,
        first_name: 'Juan',
        last_name: 'Bautista',
        middle_name: 'Dela Cruz',
        suffix: '',
        is_current: 1,
        is_priority: 0,
        department: 1,
      },
      {
        patient_id: 'DF1351',
        queue_number: 7,
        first_name: 'Emilio',
        last_name: 'Aguinaldo',
        middle_name: 'Garcia',
        suffix: '',
        is_current: 0,
        is_priority: 1,
        department: 2,
      },
      {
        patient_id: 'DF1352',
        queue_number: 8,
        first_name: 'Andres',
        last_name: 'Bonifacio',
        middle_name: 'Cruz',
        suffix: '',
        is_current: 0,
        is_priority: 1,
        department: 3,
      },
      {
        patient_id: 'DF1353',
        queue_number: 9,
        first_name: 'Gregoria',
        last_name: 'Silang',
        middle_name: 'Lopez',
        suffix: '',
        is_current: 0,
        is_priority: 1,
        department: 5,
      },
      {
        patient_id: 'DF1354',
        queue_number: 10,
        first_name: 'Apolinario',
        last_name: 'Mabini',
        middle_name: 'Santos',
        suffix: '',
        is_current: 0,
        is_priority: 1,
        department: 1,
      },
      {
        patient_id: 'DF1355',
        queue_number: 11,
        first_name: 'Melchora',
        last_name: 'Aquino',
        middle_name: 'Torres',
        suffix: '',
        is_current: 0,
        is_priority: 1,
        department: 2,
      },
      {
        patient_id: 'DF1356',
        queue_number: 12,
        first_name: 'Francisco',
        last_name: 'Balagtas',
        middle_name: 'Reyes',
        suffix: '',
        is_current: 0,
        is_priority: 1,
        department: 1,
      },
      {
        patient_id: 'DF1346',
        queue_number: 2,
        first_name: 'Maria',
        last_name: 'Reyes',
        middle_name: 'Santos',
        suffix: '',
        is_current: 0,
        is_priority: 1,
        department: 1,
      },
      {
        patient_id: 'DF1347',
        queue_number: 3,
        first_name: 'Jose',
        last_name: 'Luna',
        middle_name: 'Garcia',
        suffix: '',
        is_current: 0,
        is_priority: 1,
        department: 2,
      },
      {
        patient_id: 'DF1348',
        queue_number: 4,
        first_name: 'Ana',
        last_name: 'Rivera',
        middle_name: 'Mendoza',
        suffix: '',
        is_current: 0,
        is_priority: 1,
        department: 2,
      },
      {
        patient_id: 'DF1349',
        queue_number: 5,
        first_name: 'Carlos',
        last_name: 'Ramos',
        middle_name: 'Fernandez',
        suffix: 'Jr.',
        is_current: 0,
        is_priority: 1,
        department: 3,
      },
      {
        patient_id: 'DF1350',
        queue_number: 6,
        first_name: 'Luisa',
        last_name: 'Valdez',
        middle_name: 'Torres',
        suffix: '',
        is_current: 0,
        is_priority: 0,
        department: 5,
      },
    ]
    let priorityPatients = ref([])
    let otherPatients = ref([])

    /**QUEUE**/
    let departmentList = ref([])

    if (keySession != NaN || keySession != null) {
      if (keySession && keySession.department === 1) {
        departmentList.value = ['OPD']
      } else if (keySession && keySession.department === 2) {
        departmentList.value = ['Dental']
      } else if (keySession && keySession.department === 3) {
        departmentList.value = ['Prenatal', 'Immunization']
      } else {
        departmentList.value = ['Front Desk', 'OPD', 'Dental', 'Prenatal', 'Immunization']
      }
    }
    let selectedDepartment = ref(departmentList.value[0])

    let dept = ref(null)
    if (selectedDepartment.value === 'Front Desk') {
      dept.value = 5
    } else if (selectedDepartment.value === 'OPD') {
      dept.value = 1
    } else if (selectedDepartment.value === 'Dental') {
      dept.value = 2
    } else if (selectedDepartment.value === 'Prenatal') {
      dept.value = 3
    } else if (selectedDepartment.value === 'Immunization') {
      dept.value = 7
    }

    const getDepartments = () => {
      currentPatient.value = null
      priorityPatients.value = []
      otherPatients.value = []

      if (selectedDepartment.value === 'Front Desk') {
        dept.value = 5
      } else if (selectedDepartment.value === 'OPD') {
        dept.value = 1
      } else if (selectedDepartment.value === 'Dental') {
        dept.value = 2
      } else if (selectedDepartment.value === 'Prenatal') {
        dept.value = 3
      } else if (selectedDepartment.value === 'Immunization') {
        dept.value = 7
      }

      Loading.show()
      patientList.forEach((patient) => {
        if (patient.department === dept.value) {
          if (patient.is_current === 1) {
            currentPatient.value = patient
            const index = patientList.findIndex((p) => p.patient_id === patient.patient_id)
            if (index !== -1) {
              patientList.splice(index, 1)
            }
          }

          if (patient.is_priority === 1) {
            priorityPatients.value.push(patient)
          } else {
            otherPatients.value.push(patient)
          }
        }
      })
      Loading.hide()
    }

    getDepartments()

    const removeFromQueue = () => {
      ToggleDialogState()
    }

    let isRemoveFromCurrentQueue = ref(false)
    const removeCurrentPatient = () => {
      currentPatient.value = null
    }

    const callInNextPriority = () => {
      Loading.show()
      currentPatient.value = priorityPatients.value[0]
      priorityPatients.value.shift()
      Loading.hide()
    }

    const callInNextPatient = () => {
      Loading.show()
      currentPatient.value = otherPatients.value[0]
      otherPatients.value.shift()
      Loading.hide()
    }

    let showPriority = ref(false)
    let showOthers = ref(false)

    /** DATABASE **/
    let isRestoreDB = ref(false)
    let selectedDB = ref(null)
    let DBList = ['DB1', 'DB2', 'DB3']

    const backupDB = () => {
      $q().notify({
        type: 'positive',
        classes: 'text-white',
        message: 'Database backed up successfully',
      })
    }

    const openRestoreDBModal = () => {
      isRestoreDB.value = true
    }

    const restoreDB = () => {
      $q.notify({
        type: 'positive',
        classes: 'text-white',
        message: 'Database restored successfully',
      })
      isRestoreDB.value = false
    }

    return {
      departmentList,
      selectedDepartment,
      getDepartments,
      keySession,
      removeFromQueue,
      currentPatient,
      priorityPatients,
      otherPatients,
      callInNextPriority,
      callInNextPatient,
      showPriority,
      showOthers,
      backupDB,
      restoreDB,
      isRestoreDB,
      openRestoreDBModal,
      DBList,
      selectedDB,
      isRemoveFromCurrentQueue,
      removeCurrentPatient,
      dept,
    }
  },
}
