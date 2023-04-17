<template>
  <div class="width-300">
    <q-icon name="playlist_remove" size="100px" color="negative" />
    <h6 class="text-negative no-margin">Are you sure?</h6>
    <p class="text-dark m-width-250">
      Do you want to clear {{ departmentName }} department's queue?
    </p>
    <div class="flex justify-around q-mt-md">
      <q-btn
        @click="closeDialog"
        label="Cancel"
        no-caps
        color="grey-7"
        class="button-100"
      />
      <q-btn
        color="negative"
        label="Yes"
        no-caps
        class="button-100"
        @click="clearQueue"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { ToggleDialogState } from "../../composables/Triggers";
import { ClearDepartmentQueue } from "src/composables/Queue";
import { IDList } from "../../composables/IDS";
import { useQuasar, Loading } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    let departmentName = ref(null);

    if (IDList.value === 1) {
      departmentName.value === "OPD";
    } else if (IDList.value === 2) {
      departmentName.value === "Dental";
    } else if (IDList.value === 3) {
      departmentName.value === "Prenatal";
    } else if (IDList.value === 4) {
      departmentName.value === "Immunization";
    }

    const closeDialog = () => {
      ToggleDialogState();
    };

    const clearQueue = () => {
      Loading.show();

      ClearDepartmentQueue({ department: IDList.value.id }).then((response) => {
        Loading.hide();
        let status = response.status === "success" ? 0 : 1;

        $q.notify({
          type: status === 0 ? "positive" : "negative",
          classes: "text-white",
          message:
            status === 0
              ? "Department's queue cleared successfully successfully"
              : "Failed to clear department's queue",
        });

        ToggleDialogState();
      });
    };
    return {
      closeDialog,
      clearQueue,
      departmentName,
    };
  },
};
</script>
