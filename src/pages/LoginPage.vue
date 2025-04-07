<template>
  <div class="login" :style="$q.screen.height > 768 ? 'height: 80vh' : 'height: 100vh'">
    <div>
      <div class="text-center">
        <h5 class="system-name primary-text-color text-weight-bold q-my-md">
          LAN-BASED PATIENT RECORD AND MEDICINE INVENTORY <br />
          MANAGEMENT WITH QUEUEING SYSTEM
        </h5>
      </div>

      <div class="login-card q-mx-auto q-mt-lg q-pt-lg">
        <q-card>
          <!--  Text  -->
          <div class="text-center q-pt-lg">
            <q-img src="../images/MHOLogo.png" style="width: 80px; height: 80px" />
            <h5 class="primary-text-color text-bold q-my-md">Welcome!</h5>
          </div>
          <!-- Input Field -->
          <q-form @submit="loginFunction()">
            <div class="q-px-xl q-pb-xl">
              <q-input
                class="q-mb-md"
                v-model="loginDetails.username"
                outlined
                label="Username"
                :rules="[(val) => (val && val.length > 6) || 'Please enter a valid username']"
              >
              </q-input>
              <q-input
                class="q-mb-md"
                v-model="loginDetails.password"
                outlined
                :type="isShowPassword ? 'password' : 'text'"
                label="Password"
                :rules="[(val) => (val && val.length > 6) || 'Please enter a valid password']"
              >
                <template v-slot:append>
                  <q-icon
                    v-if="loginDetails.password"
                    :name="isShowPassword ? 'visibility_off' : 'visibility'"
                    @click="isShowPassword = !isShowPassword"
                    class="cursor-pointer"
                  >
                  </q-icon>
                </template>
              </q-input>

              <div class="q-mb-lg text-center">
                <p class="text-bold text-grey-14">Which department would you like to view?</p>

                <div class="q-gutter-sm text-center">
                  <q-radio
                    dense
                    v-model="loginDetails.deptValue"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="1"
                    label="OPD"
                  />
                  <q-radio
                    dense
                    v-model="loginDetails.deptValue"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="2"
                    label="Dental"
                  />
                  <q-radio
                    dense
                    v-model="loginDetails.deptValue"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="3"
                    label="Prenatal"
                  />
                  <q-radio
                    dense
                    v-model="loginDetails.deptValue"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="4"
                    label="Pharmacy"
                  />
                  <q-radio
                    dense
                    v-model="loginDetails.deptValue"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="5"
                    label="Front Desk"
                  />
                  <q-radio
                    dense
                    v-model="loginDetails.deptValue"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="6"
                    label="Office Staff"
                  />
                </div>
              </div>

              <!-- Login Button -->
              <div class="flex justify-center">
                <q-btn
                  type="submit"
                  color="primary"
                  label="Login"
                  no-caps
                  padding="10px 48px"
                  :disabled="
                    !loginDetails.username || !loginDetails.password || !loginDetails.deptValue
                  "
                />
              </div>

              <div class="text-center text-caption text-red-4 q-mt-md">Offline v.1.2</div>
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script src="./script/Login/Login.js"></script>

<style lang="scss">
@import './styles/login/login.scss';
</style>
