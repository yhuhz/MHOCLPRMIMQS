<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="miniState = !miniState"
        />

        <q-toolbar-title>
          MHO Camalig
        </q-toolbar-title>

        <!-- Signout -->
        <q-btn-dropdown
          label="Administrator"
          flat
          no-caps
          unelevated
          :ripple="false"
        >
          <div class="column items-center">
            <q-avatar size="48px" class="q-mt-md">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>

            <div class="text-subtitle-1 q-mt-md q-mb-lg text-weight-bold">
              Cardo "Immortal" Dalisay
            </div>

            <div class="flex justify-between q-mx-md q-mb-md">
              <q-btn
                class="q-mr-md"
                label="Update"
                size="md"
                no-caps
                color="primary"
              />
              <q-btn
                label="Sign Out"
                size="md"
                no-caps
                color="negative"
              />
            </div>

          </div>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <!-- Sidebar/Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
      :mini-width="100"
      :mini="miniState"
      class="bg-dark"
    >
      <q-list>
        <!-- <q-item>
          <q-avatar size="40px" class="q-my-lg">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <q-item-section
            header
            class="text-center text-white text-weight-bold q-mt-md q-mb-xl"
          >
            Administrator
          </q-item-section>
        </q-item> -->

        <q-item class="q-mb-md">
          <div class="flex">
            <q-avatar size="40px" class="q-my-lg cursor-pointer">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-item-section class="text-white q-ml-md">
              Administrator
            </q-item-section>
          </div>
        </q-item>

        <!-- <MainMenu
          v-for="link in mainmenu"
          :key="link.title"
          v-bind="link"
          class="q-mb-md"
        /> -->
        <MainMenu />

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MainMenu from 'components/MainMenu.vue'

// const linksList = [
//   {
//     title: 'Dashboard',
//     icon: 'fa-solid fa-gauge-high',
//   },
//   {
//     title: "Patient's Profile",
//     icon: 'fa-solid fa-users',
//   },
//   {
//     title: 'Medicine/Supplies',
//     icon: 'fas fa-capsules',
//   },
//   {
//     title: 'Users',
//     icon: 'fa-solid fa-user',
//   },
//   {
//     title: 'Reports',
//     icon: 'fa-solid fa-file',
//   }
// ]

export default defineComponent({
  name: 'MainLayout',

  components: {
    MainMenu
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      // mainmenu: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      miniState: ref(false)
    }
  }
})
</script>
