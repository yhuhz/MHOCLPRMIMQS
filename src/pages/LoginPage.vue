<template>
  <div class="login">
    <div class="text-center">
      <h5 class="system-name primary-text-color text-weight-bold">
        LAN-BASED PATIENT RECORD AND MEDICINE INVENTORY <br/> MANAGEMENT WITH QUEUEING SYSTEM
      </h5>
    </div>

    <div class="login-card q-mx-auto q-pt-lg">
      <q-card>

      <!--  Text  -->
      <div class="text-center q-pt-lg">
        <h5 class="primary-text-color text-bold">Welcome!</h5>
      </div>
      <!-- Input Field -->
        <div class="q-px-xl q-pb-xl">
          <q-input
            class="q-mb-md"
            outlined
            label="User ID"
          >
          </q-input>
          <q-input
            class="q-mb-xl"
            outlined
            label="Password"
          >
          </q-input>

          <!-- Login Button -->
          <div class="flex justify-center">
            <q-btn
              class="login-btn"
              label="Login"
              no-caps
              padding="10px 48px"
            >
            </q-btn>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @import "./styles/scss/login/login.scss"
</style>
