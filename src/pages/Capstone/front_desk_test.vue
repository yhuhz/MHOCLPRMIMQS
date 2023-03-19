<template>
  <div>Patient {{ patient_number }}</div>
</template>

<script>
import { ref, watch } from "vue";
import _ from "lodash";
import { patient_number } from "src/composables/Queue";

export default {
  /* eslint-disable */
  name: "Test",
  setup() {
    watch(
      () => _.cloneDeep(patient_number.value),
      () => {}
    );

    return {
      patient_number,
    };
  },
};
</script>

<style lang="scss" scoped></style>
