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

        <div class="flex items-center cursor-pointer">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <q-toolbar-title class="account-name">
            Juan Dela Cruz
          </q-toolbar-title>

          <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
          style="width: 230px"
          >
            <q-list separator dense>
              <q-item clickable class="drop-list" @click="editUser = true">
                <q-item-section>
                  Account
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
              </q-item>

              <!-- Edit User Account Dialog Box -->
              <q-dialog persistent v-model="editUser">
                <q-card class="q-pa-lg" style="min-width: 600px">
                  <div class="row justify-end items-center">
                    <q-btn v-close-popup icon="close" color="negative" dense size="sm" />
                  </div>
                  <div class="flex justify-center items-center">
                    <p class="text-primary q-mr-md"><q-icon name="person" size="lg" class="q-py-none" /></p>
                    <p class="text-primary text-weight-bold edit-text">
                      EDIT USER ACCOUNT
                    </p>
                  </div>

                  <q-label>Username</q-label>
                  <div class="row">
                    <div class="col">
                      <q-input outlined dense class="q-mt-xs" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-5 q-mt-md">
                      <q-label>Last Name</q-label>
                    <q-input outlined dense class="q-mt-xs" />
                    </div>
                    <div class="col q-mt-md q-ml-md">
                    <q-label>First Name <span class="text-negative">*</span></q-label>
                    <q-input outlined dense class="q-mt-xs" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-5 q-mt-md">
                      <q-label>Middle Name</q-label>
                    <q-input outlined dense class="q-mt-xs" />
                    </div>
                    <div class="col-2 q-mt-md q-mx-md">
                    <q-label>Suffix</q-label>
                    <q-input outlined dense class="q-mt-xs" />
                    </div>
                    <div class="col q-mt-md">
                    <q-label>Date of Birth <span class="text-negative">*</span></q-label>
                    <q-input v-model="dateOfBirth" outlined dense class="q-mt-xs">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-date v-model="dateOfBirth">
                              <div class="row justify-end items-center">
                                <q-btn v-close-popup color="primary" label="Close" dense flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-5 q-mt-md">
                      <q-label>Phone Number <span class="text-negative">*</span></q-label>
                    <q-input outlined dense class="q-mt-xs" />
                    </div>
                    <div class="col q-mt-md q-ml-md">
                    <q-label>Sex <span class="text-negative">*</span></q-label>
                    <div>
                      <q-radio v-model="sex" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="Male" label="Male" />
                      <q-radio v-model="sex" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="Female" label="Female" />
                    </div>
                    </div>
                  </div>

                  <div class="row q-my-lg justify-center items-center">
                    <q-btn
                    color="primary"
                    label="Submit"
                    no-caps
                    style="min-width: 150px"
                    />
                    <q-btn
                    outline
                    color="primary"
                    label="Reset"
                    no-caps
                    style="min-width: 150px"
                    class="q-ml-xl"
                    />
                  </div>

                </q-card>
              </q-dialog>


              <q-item clickable class="drop-list" @click="changePassword = true">
                <q-item-section>
                  Change Password
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="key" />
                </q-item-section>
              </q-item>

            <!-- Change Password Dialog Box -->
            <q-dialog persistent v-model="changePassword">
              <q-card class="q-px-md q-py-lg" style="min-width: 350px">
                <div class="flex justify-center items-center">
                  <p class="text-primary q-mr-md"><q-icon name="key" size="md" /></p>
                  <p class="text-primary text-weight-bold" style="font-size: 1rem;">Change Password</p>
                </div>

                <div class="row">
                  <div class="col">
                    <q-label>New Password</q-label>
                    <q-input
                    v-model="newPassword"
                    dense
                    outlined
                    :type="showNewPassword ? 'password' : 'text'"
                    class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon
                        v-if="newPassword"
                        :name="showNewPassword ? 'visibility_off' : 'visibility'"
                        size="xs"
                        class="cursor-pointer"
                        @click="showNewPassword = !showNewPassword"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>

                <div class="row q-mt-md">
                  <div class="col">
                    <q-label>Confirm Password</q-label>
                    <q-input
                    v-model="confirmPassword"
                    dense
                    outlined
                    :type="showConfirmPassword ? 'password' : 'text'"
                    class="q-mt-sm"
                    >
                      <template v-slot:append>
                        <q-icon
                        v-if="confirmPassword"
                        :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                        size="xs"
                        class="cursor-pointer"
                        @click="showConfirmPassword = !showConfirmPassword"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>

                <div class="row justify-between items-center q-mt-lg">
                  <q-btn
                    dense
                    color="primary"
                    label="Submit"
                    no-caps
                    style="width: 150px"
                  />
                  <q-btn
                    v-close-popup
                    dense
                    outline
                    color="primary"
                    label="Cancel"
                    no-caps
                    style="width: 150px"
                  />
                </div>
              </q-card>
            </q-dialog>


              <q-item clickable class="drop-list">
                <q-item-section>
                  Logout
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

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
      <q-list separator>

    <div class="q-my-lg">
      <div class="flex justify-center items-center">
        <q-avatar class="q-mb-md">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>
      <div class="text-center" v-show="!miniState">
        <p class="text-white text-weight-bold" style="font-size: 1.2rem;">MHO HEAD</p>
      </div>
    </div>

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


export default defineComponent({
  name: 'MainLayout',

  components: {
    MainMenu
  },

  setup () {
    const leftDrawerOpen = ref(false)
    let editUser = ref(false)
    let changePassword = ref(false)
    let sex = ref("Male")
    let dateOfBirth = ref("")
    let newPassword = ref("")
    let showNewPassword = ref(true)
    let confirmPassword = ref("")
    let showConfirmPassword = ref(true)

    return {
      // mainmenu: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      miniState: ref(false),
      editUser,
      changePassword,
      sex,
      dateOfBirth,
      newPassword,
      showNewPassword,
      confirmPassword,
      showConfirmPassword,
    }
  }
})
</script>

<style scoped lang="scss">
  .drop-list {
    color: #5f8d4e;
  }
  .drop-list:hover {
    background: #5f8d4e;
    color: #fff;
  }
  .account-name {
    font-size: 1rem;
    font-weight: 500;
  }

  .edit-text {
    font-size: 1.5rem
  }

</style>
