<template>
  <!-- <q-item
    clickable
    v-ripple
    class="text-white"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item> -->

  <div>
    <!-- Dashboard -->
    <q-item
      clickable
      exact
      class="text-white"
      :active="link === 'dashboard'"
      active-class="active-style"
      @click="link = 'dashboard'"
      to="dashboard"
    >
    <q-item-section avatar>
      <q-icon name="dashboard" />
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
    >

   <q-list dense separator class="dropdown-list">

    <q-item
      clickable
      exact
      class="list-text text-white"
      to="search-patients"
      :active="link === 'search-patients'"
      active-class="active-style"
      @click="link = 'search-patients'"
    >
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-magnifying-glass"/>
      </q-item-section>
      <q-item-section>Search Patients</q-item-section>
    </q-item>

    <q-item
      clickable
      class="list-text text-white"
      to="add-new-patient-record"
      :active="link === 'add-new-patient-record'"
      active-class="active-style"
      @click="link = 'add-new-patient-record'"
    >
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-square-plus"/>
      </q-item-section>
      <q-item-section>Add New Patient Record</q-item-section>
    </q-item>

    <q-item clickable class="list-text">
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-house"/>
      </q-item-section>
      <q-item-section>View Household</q-item-section>
    </q-item>

    <q-item clickable class="list-text">
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-wheelchair"/>
      </q-item-section>
      <q-item-section>PWDs</q-item-section>
    </q-item>

    <q-item clickable class="list-text">
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-person-cane"/>
      </q-item-section>
      <q-item-section>Senior Citizens</q-item-section>
    </q-item>

    <q-item clickable class="list-text">
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-person-pregnant"/>
      </q-item-section>
      <q-item-section>Pregnant Women</q-item-section>
    </q-item>

   </q-list>

    </q-expansion-item>

    <!-- Medicine/Supplies -->
    <!-- <q-item
      clickable
      class="text-white"
    >
    <q-item-section avatar>
      <q-icon name="mdi-pill" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Meds & Supplies</q-item-label>
    </q-item-section>
    </q-item> -->
    <q-expansion-item
    label="Meds & Supplies"
    icon="fa fa-prescription-bottle-medical"
    class="text-white"
    >

    <q-list dense separator class="dropdown-list">

    <q-item clickable class="list-text">
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-pills"/>
      </q-item-section>
      <q-item-section>Medicine Inventory</q-item-section>
    </q-item>

    <q-item clickable class="list-text">
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-hand-holding-medical"/>
      </q-item-section>
      <q-item-section>Medicine Release</q-item-section>
    </q-item>

    <q-item clickable class="list-text">
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-syringe"/>
      </q-item-section>
      <q-item-section>Supplies Inventory</q-item-section>
    </q-item>

    <q-item clickable class="list-text">
      <q-item-section avatar>
        <q-icon size="xs" name="fa fa-hand-holding-medical"/>
      </q-item-section>
      <q-item-section>Supplies Release</q-item-section>
    </q-item>

    </q-list>

    </q-expansion-item>

    <!-- Users -->
    <q-item
      clickable
      class="text-white"
    >
    <q-item-section avatar>
      <q-icon name="account_circle" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Users</q-item-label>
    </q-item-section>
    </q-item>

    <!-- Reports -->
    <q-item
      clickable
      class="text-white"
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
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainMenu',
  // props: {
  //   title: {
  //     type: String,
  //     required: true
  //   },

  //   caption: {
  //     type: String,
  //     default: ''
  //   },

  //   link: {
  //     type: String,
  //     default: '#'
  //   },

  //   icon: {
  //     type: String,
  //     default: ''
  //   }
  // }

  setup() {

    const route = useRoute();
    const router = useRouter();

    let link = ref(route.name)
    console.log(link)

    return {
      link,
      route,
      router
    }
  }
})
</script>

<style lang="scss">
  @import '../css/Components/MainMenu.scss'
</style>
