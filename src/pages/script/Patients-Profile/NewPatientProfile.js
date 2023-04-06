import { ref } from "vue";

export default {
  setup() {
    // Patient ID and household
    let statusList = ref(["Active", "Deceased", "Archived"]);

    // Address
    let barangayList = [
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
    let selectedBarangay = ref("");
    let municipality = ref("Camalig");
    let completeAddress = ref("");

    // Personl Information
    let personalInformation = ref({
      householdID: "",
      status: "",
      lastName: null,
      firstName: null,
      middleName: null,
      suffix: null,
      dateOfBirth: "",
      phoneNumber: "",
      sex: "Male",
    });

    // PWD and Senior Citizens
    let isPWD = ref(false);
    let isSeniorCitizen = ref(false);
    let pwd = ref({
      pwdID: "",
      typeOfDisability: "",
    });
    let seniorCitizenID = ref("");

    return {
      statusList,
      barangayList,
      selectedBarangay,
      municipality,
      completeAddress,
      personalInformation,
      isPWD,
      isSeniorCitizen,
      pwd,
      seniorCitizenID,
    };
  },
};
