import { ref } from "vue";
import Table from "../../../components/TableComponents.vue";

export default {
  components: {
    Table,
  },
  setup() {
    let selectedSearchBy = ref(null);
    let searchBy = ref(["Patient ID", "Household ID", "Household Name"]);

    let showFilterModal = ref(false);

    let barangayList = [
      "All",
      "Outside Camalig",
      "Anoling",
      "Baligang",
      "Bantonan",
      "Brgy. 1 (Pob)",
      "Brgy.2 (Pob)",
      "Brgy.3 (Pob)",
      "Brgy.4 (Pob)",
      "Brgy.5 (Pob)",
      "Brgy.6 (Pob)",
      "Brgy.7 (Pob)",
      "Bariw",
      "Binanderahan",
      "Binitayan",
      "Bongabong",
      "Cabagñan",
      "Cabraran Pequeño",
      "Caguiba",
      "Calabidongan",
      "Comun",
      "Cotmon",
      "Del Rosario",
      "Gapo",
      "Gotob",
      "Ilawod",
      "Iluluan",
      "Libod",
      "Ligban",
      "Mabunga",
      "Magogon",
      "Manawan",
      "Maninila",
      "Mina",
      "Miti",
      "Palanog",
      "Panoypoy",
      "Pariaan",
      "Quinartilan",
      "Quirangay",
      "Quitinday",
      "Salugan",
      "Solong",
      "Sua",
      "Sumlang",
      "Tagaytay",
      "Tagoytoy",
      "Taladong",
      "Taloto",
      "Taplacon",
      "Tinago",
      "Tumpa",
    ];

    let brgy_array_model = ref(["All"]);

    return {
      searchBy,
      selectedSearchBy,
      showFilterModal,
      barangayList,
      brgy_array_model,
    };
  },
};
