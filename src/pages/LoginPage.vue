<template>
  <div class="login">
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
            <q-img
              src="../images/MHOLogo.png"
              style="width: 80px; height: 80px"
            />
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
                :rules="[
                  (val) =>
                    (val && val.length > 6) || 'Please enter a valid username',
                ]"
              >
              </q-input>
              <q-input
                class="q-mb-xl"
                v-model="loginDetails.password"
                outlined
                :type="isShowPassword ? 'password' : 'text'"
                label="Password"
                :rules="[
                  (val) =>
                    (val && val.length > 6) || 'Please enter a valid password',
                ]"
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

              <!-- Login Button -->
              <div class="flex justify-center">
                <q-btn
                  type="submit"
                  color="primary"
                  label="Login"
                  no-caps
                  padding="10px 48px"
                />
              </div>
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script src="./script/Login/Login.js"></script>

<style lang="scss">
@import "./styles/login/login.scss";
</style>
