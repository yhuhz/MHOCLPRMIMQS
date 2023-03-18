import { ref } from "vue";

export default {
  components: {
  },
  setup() {
    let selectedSearchBy = ref(null);
    let searchBy = ref(['Name', "Patient ID", "Household ID", "Phone Number"]);

    let showFilterModal = ref(false);

    let genderList = ref(["Male", "Female"])
    let statusList = ref(["Active", "Deceased", "Deleted"])
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

    let dateAdded = ref(
      {
        from: "",
        to: ""
      }
    );

    let gender_array_model = ref(["Male"])
    let status_array_model = ref(["Active"])
    let brgy_array_model = ref(["All"]);

    const columns = [
      {
        name: "patientID",
        align: "left",
        label: "Patient ID",
        field: "patientID",
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: "name",
        sortable: true,
      },
      {
        name: "household",
        align: "left",
        label: "Household",
        field: "household",
        sortable: true,
      },
      {
        name: "barangay",
        align: "left",
        label: "Barangay",
        field: "barangay",
        sortable: true,
      },
      {
        name: "sex",
        align: "left",
        label: "Sex",
        field: "sex",
        sortable: true,
      },
      {
        name: "birth date",
        align: "left",
        label: "Birth date",
        field: "birthDate",
        sortable: true,
      },
      {
        name: "age",
        align: "left",
        label: "Age",
        field: "age",
        sortable: true,
      },
      {
        name: "phone number",
        align: "left",
        label: "Phone Number",
        field: "phoneNumber",
        sortable: true,
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "",
        sortable: false,
      },
    ];

    const rows = [
      {
        patientID: "12A",
        name: "John Doe",
        household: "Doe",
        sex: "M",
        birthDate: "02/31/2000",
        age: 23,
        barangay: "Baligang",
        phoneNumber: "+639123456789"
      },
      {
        patientID: "12B",
        name: "Jane Doe",
        household: "Doe",
        sex: "F",
        birthDate: "02/30/2000",
        age: 23,
        barangay: "Baligang",
        phoneNumber: "+639987654321"
      },
    ];

    const openDialog = () => {
    }

    return {
      searchBy,
      selectedSearchBy,
      showFilterModal,
      barangayList,
      brgy_array_model,
      statusList,
      status_array_model,
      genderList,
      gender_array_model,
      dateAdded,
      columns,
      rows,
      openDialog
    };
  },
};
