<template>
  <div>
    <!-- Dashboard -->
    <q-item clickable exact class="text-white" to="dashboard">
      <q-item-section avatar>
        <q-icon name="dashboard" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Dashboard</q-item-label>
      </q-item-section>
    </q-item>

    <!-- Patients Profile -->
    <q-expansion-item icon="groups" label="Patients Profile" class="text-white">
      <q-list dense separator class="dropdown-list bg-grey-8">
        <q-item
          clickable
          exact
          class="list-text text-white q-ml-md"
          to="search-patients"
        >
          <q-item-section avatar>
            <q-icon size="xs" name="eva-search-outline" />
          </q-item-section>
          <q-item-section>Search Patients</q-item-section>
        </q-item>

        <q-item
          clickable
          class="list-text text-white q-ml-md"
          to="add-new-patient-record"
        >
          <q-item-section avatar>
            <q-icon size="xs" name="eva-plus-square-outline" />
          </q-item-section>
          <q-item-section>Add New Patient Record</q-item-section>
        </q-item>

        <q-item
          clickable
          class="list-text text-white q-ml-md"
          to="household-records"
        >
          <q-item-section avatar>
            <q-icon size="xs" name="eva-home-outline" />
          </q-item-section>
          <q-item-section>View Household</q-item-section>
        </q-item>

        <q-item clickable class="list-text text-white q-ml-md">
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-wheelchair" />
          </q-item-section>
          <q-item-section>PWDs</q-item-section>
        </q-item>

        <q-item clickable class="list-text text-white q-ml-md">
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-person-cane" />
          </q-item-section>
          <q-item-section>Senior Citizens</q-item-section>
        </q-item>

        <q-item clickable class="list-text text-white q-ml-md">
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-person-pregnant" />
          </q-item-section>
          <q-item-section>Pregnant Women</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <!-- Meds and Supplies -->
    <q-expansion-item
      label="Meds & Supplies"
      icon="fa fa-prescription-bottle-medical"
      class="text-white"
    >
      <q-list dense separator class="dropdown-list bg-grey-8">
        <q-item
          clickable
          class="list-text text-white q-ml-md"
          to="medicine-inventory"
        >
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-pills" />
          </q-item-section>
          <q-item-section>Medicine Inventory</q-item-section>
        </q-item>

        <q-item clickable class="list-text text-white q-ml-md">
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-syringe" />
          </q-item-section>
          <q-item-section>Supplies Inventory</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>

    <!-- Users -->
    <q-item clickable class="text-white">
      <q-item-section avatar>
        <q-icon name="account_circle" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Administrator</q-item-label>
      </q-item-section>
    </q-item>

    <!-- Reports -->
    <q-item clickable class="text-white">
      <q-item-section avatar>
        <q-icon name="description" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Reports</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "MainMenu",

  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import "../css/Components/MainMenu.scss";
</style>
