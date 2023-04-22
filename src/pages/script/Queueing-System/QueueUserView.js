import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import _ from "lodash";
import { GetQueue, QueueList, Queue } from "src/composables/Queue";
import { Loading, SessionStorage } from "quasar";
import MHCDialog from "../../../components/MHCDialog.vue";
import ClearDepartmentQueueConfirm from "../../Components/ClearDepartmentQueueConfirm.vue";
import { ToggleDialogState } from "../../../composables/Triggers";
import { SetIDS } from "src/composables/IDS";

export default {
  components: { MHCDialog, ClearDepartmentQueueConfirm },
  setup() {
    const router = useRouter();
    const route = useRoute();

    //Session Storage
    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    Loading.show();
    GetQueue().then((response) => {
      Loading.hide();
    });

    let currentRouteName = ref(null);

    setInterval(() => {
      currentRouteName.value = route.name;
      if (currentRouteName.value === "queueing-system") {
        GetQueue();
      }
    }, 1000); // interval in milliseconds

    let currentQueue = ref({
      OPD: null,
      Dental: null,
      Prenatal: null,
      Immunization: null,
    });

    let waitingQueue = ref({
      OPD: null,
      Dental: null,
      Prenatal: null,
      Immunization: null,
    });

    watch(
      () => _.cloneDeep(QueueList.value),
      () => {
        if (QueueList.value.OPD.length != 0) {
          QueueList.value.OPD.forEach((q) => {
            if (q.is_current === 1) {
              currentQueue.value.OPD = q.queue_number;
            }
          });
        } else {
          currentQueue.value.OPD = null;
        }

        if (QueueList.value.Dental.length != 0) {
          QueueList.value.Dental.forEach((q) => {
            if (q.is_current === 1) {
              currentQueue.value.Dental = q.queue_number;
            }
          });
        } else {
          currentQueue.value.Dental = null;
        }

        if (QueueList.value.Prenatal.length != 0) {
          QueueList.value.Prenatal.forEach((q) => {
            if (q.is_current === 1) {
              currentQueue.value.Prenatal = q.queue_number;
            }
          });
        } else {
          currentQueue.value.Prenatal = null;
        }

        if (QueueList.value.Immunization.length != 0) {
          QueueList.value.Immunization.forEach((q) => {
            if (q.is_current === 1) {
              currentQueue.value.Immunization = q.queue_number;
            }
          });
        } else {
          currentQueue.value.Immunization = null;
        }

        waitingQueue.value = {
          OPD: QueueList.value.OPD.length - 1,
          Dental: QueueList.value.Dental.length - 1,
          Prenatal: QueueList.value.Prenatal.length - 1,
          Immunization: QueueList.value.Immunization.length - 1,
        };
      }
    );

    const clearQueue = (department) => {
      SetIDS(department);
      ToggleDialogState();
    };

    let isHideButton = ref(true);

    return {
      QueueList,
      currentQueue,
      waitingQueue,
      currentRouteName,
      clearQueue,
      keySession,
      isHideButton,
    };
  },
};
