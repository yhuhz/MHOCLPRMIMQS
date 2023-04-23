<template>
  <div>
    <!-- Home -->
    <q-item
      clickable
      exact
      :class="$route.name === 'home' ? 'bg-primary text-white' : 'text-white'"
      @click="$router.push({ name: 'home' })"
    >
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Home</q-item-label>
      </q-item-section>
    </q-item>

    <!-- Dashboard -->
    <q-item
      clickable
      exact
      :class="
        $route.name === 'dashboard' ? 'bg-primary text-white' : 'text-white'
      "
      @click="$router.push({ name: 'dashboard' })"
      v-if="keySession && keySession.department === 6"
    >
      <q-item-section avatar>
        <q-icon name="bar_chart" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Dashboard</q-item-label>
      </q-item-section>
    </q-item>

    <!-- Patients Profile -->
    <q-expansion-item
      icon="groups"
      label="Patients Profile"
      class="text-white"
      :default-opened="isPatientProfileOpen"
    >
      <q-list dense separator class="dropdown-list bg-grey-8">
        <q-item
          clickable
          exact
          :class="
            $route.name === 'search-patients' ||
            $route.name === 'patient-details' ||
            $route.name === 'OPD/patient_records' ||
            $route.name === 'OPD/patient_records/new' ||
            $route.name === 'Prenatal/patient_records' ||
            $route.name === 'Prenatal/patient_records/new' ||
            $route.name === 'Immunization/patient_records' ||
            $route.name === 'Immunization/patient_records/new' ||
            $route.name === 'Dental/patient_records' ||
            $route.name === 'Dental/patient_records/new'
              ? 'bg-primary list-text text-white'
              : 'list-text text-white'
          "
          @click="$router.push({ name: 'search-patients' })"
        >
          <q-item-section avatar>
            <q-icon size="xs" name="eva-search-outline" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md">Search Patients</q-item-section>
        </q-item>

        <q-item
          v-if="
            keySession &&
            ((keySession.department === 6 &&
              keySession.permission_level !== 3) ||
              (keySession.department === 5 && keySession.permission_level != 3))
          "
          clickable
          class="list-text text-white"
          @click="$router.push({ name: 'add-edit-patient-record' })"
          :class="
            $route.name === 'add-edit-patient-record'
              ? 'bg-primary list-text text-white'
              : 'list-text text-white'
          "
        >
          <q-item-section avatar>
            <q-icon size="xs" name="eva-plus-square-outline" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md"
            >Add New Patient Record</q-item-section
          >
        </q-item>

        <q-item
          clickable
          class="list-text text-white"
          @click="$router.push({ name: 'search-records' })"
          :class="
            $route.name === 'search-records'
              ? 'bg-primary list-text text-white'
              : 'list-text text-white'
          "
        >
          <q-item-section avatar>
            <q-icon size="xs" name="medical_information" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md">Health Records</q-item-section>
        </q-item>

        <q-item
          clickable
          class="list-text text-white"
          @click="$router.push({ name: 'household-records' })"
          :class="
            $route.name === 'household-records'
              ? 'bg-primary list-text text-white'
              : 'list-text text-white'
          "
        >
          <q-item-section avatar>
            <q-icon size="xs" name="eva-home-outline" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md">Households</q-item-section>
        </q-item>

        <q-item
          clickable
          class="list-text text-white"
          @click="$router.push({ name: 'pwd-records' })"
          :class="
            $route.name === 'pwd-records'
              ? 'bg-primary list-text text-white'
              : 'list-text text-white'
          "
        >
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-wheelchair" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md">PWDs</q-item-section>
        </q-item>

        <q-item
          clickable
          class="list-text text-white"
          @click="$router.push({ name: 'senior-citizen-records' })"
          :class="
            $route.name === 'senior-citizen-records'
              ? 'bg-primary list-text text-white'
              : 'list-text text-white'
          "
        >
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-person-cane" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md">Senior Citizens</q-item-section>
        </q-item>

        <q-item
          clickable
          class="list-text text-white"
          @click="$router.push({ name: 'pregnant-women-records' })"
          :class="
            $route.name === 'pregnant-women-records'
              ? 'bg-primary list-text text-white'
              : 'list-text text-white'
          "
        >
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-person-pregnant" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md">Pregnant Women</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <!-- Meds and Supplies -->
    <q-expansion-item
      v-if="
        keySession &&
        (keySession.department === 6 || keySession.department === 4)
      "
      label="Meds & Supplies"
      icon="fa fa-prescription-bottle-medical"
      class="text-white"
      :default-opened="
        $route.name === 'medicine-inventory' ||
        $route.name === 'medicine-inventory-details' ||
        $route.name === 'supply-inventory' ||
        $route.name === 'supply-inventory-details'
          ? true
          : false
      "
    >
      <q-list dense separator class="dropdown-list bg-grey-8">
        <q-item
          clickable
          :class="
            $route.name === 'medicine-inventory' ||
            $route.name === 'medicine-inventory-details'
              ? 'bg-primary list-text text-white'
              : 'list-text text-white'
          "
          @click="$router.push({ name: 'medicine-inventory' })"
        >
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-pills" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md">Medicine Inventory</q-item-section>
        </q-item>

        <q-item
          clickable
          :class="
            $route.name === 'supply-inventory' ||
            $route.name === 'supply-inventory-details'
              ? 'bg-primary list-text text-white'
              : 'list-text text-white'
          "
          @click="$router.push({ name: 'supply-inventory' })"
        >
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-syringe" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md">Supplies Inventory</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <!-- Users -->
    <q-item
      v-if="
        keySession &&
        keySession.department === 6 &&
        keySession.permission_level === 1
      "
      clickable
      :class="
        $route.name === 'manage-users' ? 'bg-primary text-white' : 'text-white'
      "
      @click="$router.push({ name: 'manage-users' })"
    >
      <q-item-section avatar>
        <q-icon name="account_circle" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Administrator</q-item-label>
      </q-item-section>
    </q-item>

    <!-- Reports -->
    <q-item
      v-if="keySession && keySession.department === 6"
      clickable
      class="text-white"
      @click="$router.push({ name: 'reports' })"
    >
      <q-item-section avatar>
        <q-icon name="description" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Reports</q-item-label>
      </q-item-section>
    </q-item>

    <!-- Queueing System -->
    <q-item
      v-if="
        keySession &&
        (keySession.department === 5 || keySession.department === 6)
      "
      clickable
      :class="
        $route.name === 'queueing-system'
          ? 'bg-primary text-white'
          : 'text-white'
      "
      @click="$router.push({ name: 'queueing-system' })"
    >
      <q-item-section avatar>
        <q-icon name="format_list_numbered" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Queue</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { SessionStorage } from "quasar";

export default defineComponent({
  name: "MainMenu",
  setup() {
    const route = useRoute();
    const router = useRouter();

    let keySession = SessionStorage.getItem("cred");
    if (keySession == NaN || keySession == null) {
      router.push({ name: "login" });
    }

    let patient_route_names = [
      "search-patients",
      "search-records",
      "add-edit-patient-record",
      "patient-details",
      "OPD/patient_records",
      "OPD/patient_records/new",
      "Prenatal/patient_records",
      "Prenatal/patient_records/new",
      "Immunization/patient_records",
      "Immunization/patient_records/new",
      "household-records",
      "pwd-records",
      "senior-citizen-records",
      "pregnant-women-records",
    ];

    let isPatientProfileOpen = ref(false);

    patient_route_names.forEach((element, index) => {
      if (route.name === element) {
        isPatientProfileOpen.value = true;
      }
    });

    let patient_details_route_names = [
      "patient-details",
      "OPD/patient_records",
      "Dental/patient_records",
      "Dental/patient_records/new",
      "OPD/patient_records/new",
      "Prenatal/patient_records",
      "Prenatal/patient_records/new",
      "Immunization/patient_records",
      "Immunization/patient_records/new",
    ];

    let isPatientDetails = ref(false);

    patient_details_route_names.forEach((element, index) => {
      if (route.name === element) {
        isPatientDetails.value = "bg-primary list-text text-white";
      } else {
        isPatientDetails.value = "list-text text-white";
      }
    });
    return {
      isPatientProfileOpen,
      isPatientDetails,
      keySession,
    };
  },
});
</script>

<style lang="scss">
@import "../css/Components/MainMenu.scss";
</style>
