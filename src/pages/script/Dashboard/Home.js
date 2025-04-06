import { ref } from 'vue'
import { useQuasar, SessionStorage, Loading } from 'quasar'
import MHCDialog from '../../../components/MHCDialog.vue'
import RemoveFromQueue from '../../Components/RemoveFromQueue.vue'
import { ToggleDialogState } from '../../../composables/Triggers.js'
import { useRouter, useRoute } from 'vue-router'

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

    /**QUEUE**/
    let payload = {
      department: keySession && keySession.department,
    }
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

    /* Loading.show();
    GetQueueSpecific(dept.value).then((response) => {
      Loading.hide();
    }); */

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
          if (patient.is_priority === 1) {
            priorityPatients.value.push(patient)
          } else {
            otherPatients.value.push(patient)
          }
        }
      })
      Loading.hide()
    }

    const removeFromQueue = (queue_id) => {
      ToggleDialogState()
    }

    let isRemoveFromCurrentQueue = ref(false)
    const removeCurrentPatient = () => {
      currentPatient.value = null
    }

    let currentPatient = ref({
      patient_id: 'DF1345',
      queue_id: 1,
      first_name: 'Juan',
      last_name: 'Bautista',
      middle_name: 'Dela Cruz',
      suffix: '',
      is_current: 1,
      is_priority: 0,
      department: 1,
    })

    let patientList = [
      {
        patient_id: 'DF1351',
        queue_id: 7,
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
        queue_id: 8,
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
        queue_id: 9,
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
        queue_id: 10,
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
        queue_id: 11,
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
        queue_id: 12,
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
        queue_id: 2,
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
        queue_id: 3,
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
        queue_id: 4,
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
        queue_id: 5,
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
        queue_id: 6,
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

    const callInNextPriority = () => {
      Loading.show()
      currentPatient.value = priorityPatients.value[0]
      priorityPatients.value.shift()
      Loading.hide()
    }

    const callInNextPatient = () => {
      Loading.show()
      currentPatient.value = priorityPatients.value[0]
      priorityPatients.value.shift()
      Loading.hide()
    }

    const doneCurrentPatient = () => {
      /* Loading.show();
      DonePatient({
        current_patient: currentPatient.value.queue_id,
        department: dept.value,
        priority: currentPatient.value.is_priority,
        done: true,
      }).then((response) => {
        Loading.hide();
        currentPatient.value = null;
        priorityPatients.value = [];
        otherPatients.value = [];
        GetQueueSpecific(dept.value);
      }); */
    }

    let showPriority = ref(false)
    let showOthers = ref(false)

    /** DATABASE **/
    let isRestoreDB = ref(false)
    let selectedDB = ref(null)
    let DBList = ['DB1', 'DB2', 'DB3']

    const backupDB = () => {
      $q.notify({
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
      doneCurrentPatient,
      openRestoreDBModal,
      DBList,
      selectedDB,
      isRemoveFromCurrentQueue,
      removeCurrentPatient,
      dept,
    }
  },
}
