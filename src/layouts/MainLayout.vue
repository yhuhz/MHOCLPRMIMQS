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
            <q-img :src="avatarLink" />
            <!-- <img src="../images/outpatient.png" /> -->
            <!-- <q-icon name="person" /> -->
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
                          v-model="editUserDetails.username"
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
                          v-model="editUserDetails.last_name"
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
                          v-model="editUserDetails.first_name"
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
                          v-model="editUserDetails.middle_name"
                          outlined
                          dense
                          class="q-mt-xs"
                        />
                      </div>
                      <div class="col-2 q-mt-md q-mx-md">
                        <label>Suffix</label>
                        <q-input
                          v-model="editUserDetails.suffix"
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
                          v-model="editUserDetails.birthdate"
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
                                <q-date v-model="editUserDetails.birthdate">
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
                          v-model="editUserDetails.phone_number"
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
                            v-model="editUserDetails.sex"
                            checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye"
                            val="Male"
                            label="Male"
                          />
                          <q-radio
                            v-model="editUserDetails.sex"
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

              <q-item clickable class="drop-list" @click="changePass = true">
                <q-item-section> Change Password </q-item-section>
                <q-item-section avatar>
                  <q-icon name="key" />
                </q-item-section>
              </q-item>

              <!-- Change Password Dialog Box -->
              <q-dialog persistent v-model="changePass">
                <q-card class="q-px-md q-py-lg" style="min-width: 350px">
                  <q-form @submit="changePassword">
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
                          :rules="[
                            (val) =>
                              (val && val.length > 6) ||
                              'Password must contain at least 7 characters',
                          ]"
                        >
                          <template v-slot:append>
                            <q-icon
                              v-if="newPassword"
                              :name="
                                showNewPassword
                                  ? 'visibility_off'
                                  : 'visibility'
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
                          :rules="[
                            (val) =>
                              val === newPassword || 'Password does not match',
                          ]"
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
                              @click="
                                showConfirmPassword = !showConfirmPassword
                              "
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>

                    <div class="row justify-between items-center q-mt-lg">
                      <q-btn
                        type="submit"
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
                  </q-form>
                </q-card>
              </q-dialog>

              <q-item clickable class="drop-list" @click="logout">
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
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
              <img src="../images/MHOLogo.png" />
            </q-avatar>
          </div>
          <div class="text-center" v-show="!miniState">
            <p class="text-white text-weight-bold" style="font-size: 1.2rem">
              {{ keySession && keySession.job_title.toUpperCase() }}
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
import { useRoute, useRouter } from "vue-router";
import MainMenu from "components/MainMenu.vue";
import {
  LoginCredential,
  FindUser,
  UpdateUserAccount,
  ChangePassword,
} from "src/composables/UserAccount.js";
import _ from "lodash";
import { useQuasar, SessionStorage } from "quasar";
import outpatientImage from "../images/outpatient.png";
import dentalImage from "../images/dental.png";
import prenatalImage from "../images/prenatal.png";
import pharmacyImage from "../images/pharmacy.png";
import frontdeskImage from "../images/frontdesk.png";
import adminImage from "../images/admin.png";
import defaultImage from "../images/default.png";

export default defineComponent({
  name: "MainLayout",

  components: {
    MainMenu,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    let keySession = SessionStorage.getItem("cred");
    if (keySession === null) {
      router.push({ name: "login" });
    }

    //USER AVATAR
    let avatarLink = null;

    if (keySession && keySession.department === 1) {
      avatarLink = outpatientImage;
    } else if (keySession && keySession.department === 2) {
      avatarLink = dentalImage;
    } else if (keySession && keySession.department === 3) {
      avatarLink = prenatalImage;
    } else if (keySession && keySession.department === 4) {
      avatarLink = pharmacyImage;
    } else if (keySession && keySession.department === 5) {
      avatarLink = frontdeskImage;
    } else if (keySession && keySession.department === 6) {
      avatarLink = adminImage;
    } else {
      avatarLink = defaultImage;
    }

    //RETRIEVE USER ACCOUNT FROM DB
    FindUser(keySession ? keySession.user_id : "");

    const leftDrawerOpen = ref(false);
    let editUser = ref(false);
    let changePass = ref(false);
    let newPassword = ref(null);
    let showNewPassword = ref(true);
    let confirmPassword = ref(null);
    let showConfirmPassword = ref(true);

    let sexArray = ["Male", "Female"];
    let editUserDetails = ref({});

    let name = ref(null);
    watch(
      () => _.cloneDeep(LoginCredential.value[0]),
      () => {
        let userInfo = ref(LoginCredential.value[0]);
        name.value = [
          userInfo.value.first_name,
          userInfo.value.middle_name,
          userInfo.value.last_name,
          userInfo.value.suffix,
        ]
          .filter(Boolean)
          .join(" ");

        editUserDetails.value = {
          user_id: keySession.user_id,
          username: userInfo.value.username,
          last_name: userInfo.value.last_name,
          first_name: userInfo.value.first_name,
          middle_name: userInfo.value.middle_name,
          suffix: userInfo.value.suffix,
          birthdate: userInfo.value.birthdate,
          phone_number: userInfo.value.phone_number,
          sex: sexArray[userInfo.value.sex],
        };
      }
    );

    const updateUser = () => {
      editUserDetails.value.sex = sexArray.indexOf(editUserDetails.value.sex);
      UpdateUserAccount(editUserDetails.value).then((response) => {
        if (response.status === "success") {
          $q.notify({
            type: "positive",
            classes: "text-white",
            message: "Account edited successfully",
          });

          editUser.value = false;
        } else {
          $q.notify({
            type: "negative",
            classes: "text-white",
            message: "Failed to edit account",
          });
        }
      });
    };

    const onReset = () => {
      FindUser(keySession.user_id);
    };

    const changePassword = () => {
      let payload = {
        user_id: keySession.user_id,
        new_password: newPassword.value,
      };
      // console.log(payload);
      ChangePassword(payload).then((response) => {
        if (response.status === "success") {
          $q.notify({
            type: "positive",
            classes: "text-white",
            message: "Password changed successfully",
          });
          changePass.value = false;
        } else {
          $q.notify({
            type: "negative",
            classes: "text-white",
            message: "Failed to change password",
          });
        }
      });
    };

    const logout = () => {
      SessionStorage.clear("cred");
      router.push({ name: "login" });
    };

    return {
      // mainmenu: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      miniState: ref(false),
      editUser,
      changePass,
      changePassword,
      newPassword,
      showNewPassword,
      confirmPassword,
      showConfirmPassword,
      LoginCredential,
      name,
      editUserDetails,
      updateUser,
      onReset,
      logout,
      keySession,
      avatarLink,
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
