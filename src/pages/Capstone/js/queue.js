import { ref, watch } from "vue";
import _ from "lodash";
import { patient_number } from "src/composables/Queue";

export default {
  /* eslint-disable */
  name: "Queue",
  setup() {
    const click_btn = () => {
      patient_number.value = patient_number.value + 1;
    };

    watch(
      () => _.cloneDeep(patient_number),
      () => {}
    );

    return {
      patient_number,
      click_btn,
    };
  },
};
