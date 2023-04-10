<template>
  <div>
    <!-- Dashboard -->
    <q-item
      clickable
      exact
      :class="
        $route.name === 'dashboard' ? 'bg-primary text-white' : 'text-white'
      "
      @click="$router.push({ name: 'dashboard' })"
    >
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
          :class="
            $route.name === 'search-patients'
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
      label="Meds & Supplies"
      icon="fa fa-prescription-bottle-medical"
      class="text-white"
    >
      <q-list dense separator class="dropdown-list bg-grey-8">
        <q-item
          clickable
          class="list-text text-white"
          @click="$router.push({ name: 'medicine-inventory' })"
        >
          <q-item-section avatar>
            <q-icon size="xs" name="fa fa-pills" class="q-ml-md" />
          </q-item-section>
          <q-item-section class="q-ml-md">Medicine Inventory</q-item-section>
        </q-item>

        <q-item
          clickable
          class="list-text text-white"
          @click="$router.push({ name: 'supplies-inventory' })"
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
      clickable
      class="text-white"
      @click="$router.push({ name: 'administrator' })"
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
