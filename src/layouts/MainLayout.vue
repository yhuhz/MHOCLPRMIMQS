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

        <q-toolbar-title> MHO Camalig </q-toolbar-title>

        <div class="flex items-center cursor-pointer">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <q-toolbar-title class="account-name">
            {{ name }}
          </q-toolbar-title>

          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
            style="width: 230px"
          >
            <q-list separator dense>
              <q-item clickable class="drop-list" @click="editUser = true">
                <q-item-section> Account </q-item-section>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
              </q-item>

              <!-- Edit User Account Dialog Box -->
              <q-dialog persistent v-model="editUser">
                <q-card class="q-pa-lg" style="min-width: 600px">
                  <div class="row justify-end items-center">
                    <q-btn
                      v-close-popup
                      icon="close"
                      color="negative"
                      dense
                      size="sm"
                    />
                  </div>
                  <div class="flex justify-center items-center">
                    <p class="text-primary q-mr-md">
                      <q-icon name="person" size="lg" class="q-py-none" />
                    </p>
                    <p class="text-primary text-weight-bold edit-text">
                      EDIT USER ACCOUNT
                    </p>
                  </div>
                  <q-form @submit="updateUser" @reset="onReset">
                    <label>Username</label>
                    <div class="row">
                      <div class="col">
                        <q-input
                          v-model="editUser_details.username"
                          outlined
                          dense
                          class="q-mt-xs"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-5 q-mt-md">
                        <label
                          >Last Name <span class="text-negative">*</span></label
                        >
                        <q-input
                          v-model="editUser_details.last_name"
                          outlined
                          dense
                          class="q-mt-xs"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
                        />
                      </div>
                      <div class="col q-mt-md q-ml-md">
                        <label
                          >First Name
                          <span class="text-negative">*</span></label
                        >
                        <q-input
                          v-model="editUser_details.first_name"
                          outlined
                          dense
                          class="q-mt-xs"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-5 q-mt-md">
                        <label>Middle Name</label>
                        <q-input
                          v-model="editUser_details.middle_name"
                          outlined
                          dense
                          class="q-mt-xs"
                        />
                      </div>
                      <div class="col-2 q-mt-md q-mx-md">
                        <label>Suffix</label>
                        <q-input
                          v-model="editUser_details.suffix"
                          outlined
                          dense
                          class="q-mt-xs"
                        />
                      </div>
                      <div class="col q-mt-md">
                        <label
                          >Date of Birth
                          <span class="text-negative">*</span></label
                        >
                        <q-input
                          v-model="editUser_details.birthdate"
                          outlined
                          dense
                          class="q-mt-xs"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date v-model="editUser_details.birthdate">
                                  <div class="row justify-end items-center">
                                    <q-btn
                                      v-close-popup
                                      color="primary"
                                      label="Close"
                                      dense
                                      flat
                                    />
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
                        <label
                          >Phone Number
                          <span class="text-negative">*</span></label
                        >
                        <q-input
                          v-model="editUser_details.phone_number"
                          outlined
                          dense
                          class="q-mt-xs"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
                        />
                      </div>
                      <div class="col q-mt-md q-ml-md">
                        <label>Sex <span class="text-negative">*</span></label>
                        <div>
                          <q-radio
                            v-model="editUser_details.sex"
                            checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye"
                            val="Male"
                            label="Male"
                          />
                          <q-radio
                            v-model="editUser_details.sex"
                            checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye"
                            val="Female"
                            label="Female"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row q-my-lg justify-center items-center">
                      <q-btn
                        v-close-popup
                        type="submit"
                        color="primary"
                        label="Submit"
                        no-caps
                        style="min-width: 150px"
                      />
                      <q-btn
                        type="reset"
                        outline
                        color="primary"
                        label="Reset"
                        no-caps
                        style="min-width: 150px"
                        class="q-ml-xl"
                      />
                    </div>
                  </q-form>
                </q-card>
              </q-dialog>

              <q-item
                clickable
                class="drop-list"
                @click="changePassword = true"
              >
                <q-item-section> Change Password </q-item-section>
                <q-item-section avatar>
                  <q-icon name="key" />
                </q-item-section>
              </q-item>

              <!-- Change Password Dialog Box -->
              <q-dialog persistent v-model="changePassword">
                <q-card class="q-px-md q-py-lg" style="min-width: 350px">
                  <div class="flex justify-center items-center">
                    <p class="text-primary q-mr-md">
                      <q-icon name="key" size="md" />
                    </p>
                    <p
                      class="text-primary text-weight-bold"
                      style="font-size: 1rem"
                    >
                      Change Password
                    </p>
                  </div>

                  <div class="row">
                    <div class="col">
                      <label>New Password</label>
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
                            :name="
                              showNewPassword ? 'visibility_off' : 'visibility'
                            "
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
                      <label>Confirm Password</label>
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
                            :name="
                              showConfirmPassword
                                ? 'visibility_off'
                                : 'visibility'
                            "
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

              <q-item
                clickable
                class="drop-list"
                @click="$router.push({ name: 'login' })"
              >
                <q-item-section> Logout </q-item-section>
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
            <p class="text-white text-weight-bold" style="font-size: 1.2rem">
              MHO HEAD
            </p>
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
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import MainMenu from "components/MainMenu.vue";
import {
  LoginCredential,
  FindUser,
  UpdateUserAccount,
} from "src/composables/Login";
import _ from "lodash";

export default defineComponent({
  name: "MainLayout",

  components: {
    MainMenu,
  },

  setup() {
    const route = useRoute();
    FindUser(route.params.id);

    const leftDrawerOpen = ref(false);
    let editUser = ref(false);
    let changePassword = ref(false);
    let newPassword = ref("");
    let showNewPassword = ref(true);
    let confirmPassword = ref("");
    let showConfirmPassword = ref(true);

    let userSex = ["Male", "Female"];
    let editUser_details = ref({});

    let name = ref(null);
    watch(
      () => _.cloneDeep(LoginCredential.value),
      () => {
        name.value = [
          LoginCredential.value[0].first_name,
          LoginCredential.value[0].middle_name,
          LoginCredential.value[0].last_name,
          LoginCredential.value[0].suffix,
        ]
          .filter(Boolean)
          .join(" ");

        editUser_details.value = {
          user_id: Number(route.params.id),
          username: LoginCredential.value[0].username,
          last_name: LoginCredential.value[0].last_name,
          first_name: LoginCredential.value[0].first_name,
          middle_name: LoginCredential.value[0].middle_name,
          suffix: LoginCredential.value[0].suffix,
          birthdate: LoginCredential.value[0].birthdate,
          phone_number: LoginCredential.value[0].phone_number,
          sex: userSex[LoginCredential.value[0].sex],
        };
      }
    );

    const updateUser = () => {
      UpdateUserAccount(editUser_details.value).then((response) => {});
    };

    const onReset = () => {
      FindUser(route.params.id);
    };

    return {
      // mainmenu: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      miniState: ref(false),
      editUser,
      changePassword,
      newPassword,
      showNewPassword,
      confirmPassword,
      showConfirmPassword,
      LoginCredential,
      name,
      editUser_details,
      updateUser,
      onReset,
    };
  },
});
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
  font-size: 1.5rem;
}
</style>
