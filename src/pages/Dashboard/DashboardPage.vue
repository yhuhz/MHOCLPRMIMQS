<template>
  <div class="dashboard">
    <div class="q-mx-md q-my-lg">

      <div class="flex justify-end">
        <q-select
          class="q-mb-md q-mr-sm"
          outlined
          dense
          v-model="selected"
          :options="options"
          style="width: 150px"
        />
      </div>

      <div class="flex justify-between wrap">
        <!-- New Patient Card -->
        <q-card square class="q-pt-md dashboard-card" style="background-color: #F1D356">
          <div class="flex justify-around items-center">
            <div>
              <p class="q-mb-none text-weight-bold text-white" style="font-size: 24px">
                67
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px;">
                New Patients
              </p>
            </div>
            <q-icon size="100px" name="group" class="new-patients-card-icon" />
          </div>
          <div class="cursor-pointer text-white text-center view-graph" style="background-color: #DEBB2A;">
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>

        <!-- Medicines Card -->
        <q-card square class="q-pt-md dashboard-card" style="background-color: #4D96FF;">
          <div class="flex justify-around items-center">
            <div>
              <p class="q-mb-none text-weight-bold text-white" style="font-size: 24px"> 10, 999 </p>
              <p class="text-weight-bold text-white" style="font-size: 16px;">Medicines</p>
            </div>
            <q-icon size="100px" name="mdi-pill" class="medicines-card-icon" />
          </div>
          <div class="cursor-pointer text-white text-center view-graph" style="background-color: #2977E8;">
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>

        <!-- Supplies Card -->
        <q-card square class="q-pt-md dashboard-card" style="background-color: #6BCB77;">
          <div class="flex justify-around items-center">
            <div>
              <p class="q-mb-none text-weight-bold text-white" style="font-size: 24px"> 11, 999 </p>
              <p class="text-weight-bold text-white" style="font-size: 16px;">Supplies</p>
            </div>
            <q-icon size="100px" name="mdi-needle" class="supplies-card-icon" />
          </div>
          <div class="cursor-pointer text-white text-center view-graph" style="background-color: #55A15E;">
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>

        <!-- Disease Card -->
        <q-card square class="q-pt-md dashboard-card" style="background-color: #FF6B6B;">
          <div class="flex justify-around items-center">
            <div>
              <p class="q-mb-none text-weight-bold text-white" style="font-size: 24px"> 0 </p>
              <p class="text-weight-bold text-white" style="font-size: 16px;">Disease</p>
            </div>
            <q-icon size="100px" name="monitor_heart" class="disease-card-icon" />
          </div>
          <div class="cursor-pointer text-white text-center view-graph" style="background-color: #D75555;">
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>

      </div>
    </div>
  </div>
</template>

<script src="../script/Dashboard/Dashboard.js">
</script>

<style lang="scss">
  @import '../styles/dashboard/dashboard.scss'
</style>
