import { ref } from 'vue'

export default {
  setup() {

    let selected = ref('Today')
    let options = ref(['Today', 'This Week', 'This Month', 'This Year'])

    // let cardInfo = ref([
    //   {
    //     name: "New Patients",
    //     cardNumber: "67",
    //     cardColor: "#F1D356",
    //     cardIcon: "group",
    //     cardIconColor: "#DEBB2A",
    //   },
    //   {
    //     name: "Medicines",
    //     cardNumber: "496",
    //     cardColor: "#4D96FF",
    //     cardIcon: "mdi-pill",
    //     cardIconColor: "#2977E8",
    //   },
    //   {
    //     name: "Supplies",
    //     cardNumber: "496",
    //     cardColor: "#6BCB77",
    //     cardIcon: "mdi-needle",
    //     cardIconColor: "#55A15E",
    //   },
    //   {
    //     name: "Disease",
    //     cardNumber: "0",
    //     cardColor: "#FF6B6B",
    //     cardIcon: "monitor_heart",
    //     cardIconColor: "#D75555",
    //   },
    // ]);

    // let cardIconColor = ref[("#DEBB2A", "#2977E8", "#55A15E", "#D75555")];

    return {
      options,
      selected,
      // cardInfo
    }
  }
}
