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
      class="text-white"
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

   <q-list dense class="dropdown-list">
      <q-item clickable>
        <q-item-section class="list-text">View Patient Profiles</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section class="list-text">Add New Patient Record</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section class="list-text">View PWD</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section class="list-text">View Senior Citizens</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section class="list-text">View Pregnant</q-item-section>
      </q-item>
   </q-list>

    </q-expansion-item>

    <!-- Medicine/Supplies -->
    <q-item
      clickable
      class="text-white"
    >
    <q-item-section avatar>
      <q-icon name="mdi-pill" />
    </q-item-section>
    <q-item-section>
      <q-item-label>Medicine/Supplies</q-item-label>
    </q-item-section>
    </q-item>

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

export default defineComponent({
  name: 'MainMenu',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss">
  @import '../css/Components/MainMenu.scss'
</style>
