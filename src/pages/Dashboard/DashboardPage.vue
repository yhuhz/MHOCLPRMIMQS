import { DashboardData } from 'src/composables/Dashboard.js';

<template>
  <div class="dashboard">
    <div class="q-mx-md q-my-lg">
      <div class="flex items-center justify-between q-mb-md">
        <h5 class="text-weight-bold text-dark q-my-none">DASHBOARD</h5>
        <q-select
          class="q-mb-md q-mr-sm"
          outlined
          dense
          v-model="selected"
          :options="options"
          style="width: 150px"
          @update:model-value="setDashboard()"
        />
      </div>

      <div class="flex justify-between wrap">
        <!-- New Patient Card -->
        <q-card
          clickable
          square
          class="q-pt-md dashboard-card"
          style="background-color: #f1d356"
          @click="
            () => {
              chartToRender = 1
              renderChart()
            }
          "
        >
          <div class="flex justify-around items-center">
            <div>
              <p class="q-mb-none text-weight-bold text-white" style="font-size: 24px">
                {{ DashboardData.patient_count }}
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px">New Patients</p>
            </div>
            <q-icon size="100px" name="group" class="new-patients-card-icon" />
          </div>
          <div
            class="cursor-pointer text-white text-center view-graph"
            style="background-color: #debb2a"
          >
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>

        <!-- Medicines Card -->
        <q-card
          clickable
          square
          class="q-pt-md dashboard-card"
          style="background-color: #4d96ff"
          @click="
            () => {
              chartToRender = 2
              renderChart()
            }
          "
        >
          <div class="flex justify-around items-center">
            <div>
              <p class="q-mb-none text-weight-bold text-white" style="font-size: 24px">
                {{ totalinStockMedicine }}
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px">Medicines</p>
            </div>
            <q-icon size="100px" name="mdi-pill" class="medicines-card-icon" />
          </div>
          <div
            class="cursor-pointer text-white text-center view-graph"
            style="background-color: #2977e8"
          >
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>

        <!-- Supplies Card -->
        <q-card
          clickable
          square
          class="q-pt-md dashboard-card"
          style="background-color: #ff6b6b"
          @click="
            () => {
              chartToRender = 3
              renderChart()
            }
          "
        >
          <div class="flex justify-around items-center">
            <div>
              <p class="q-mb-none text-weight-bold text-white" style="font-size: 24px">
                {{ totalinStockSupply }}
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px">Supplies</p>
            </div>
            <q-icon size="100px" name="mdi-needle" class="supplies-card-icon" />
          </div>
          <div
            class="cursor-pointer text-white text-center view-graph"
            style="background-color: #d75555"
          >
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>

        <!-- Disease Card -->
        <q-card
          clickable
          square
          class="q-pt-md dashboard-card"
          style="background-color: #6bcb77"
          @click="
            () => {
              chartToRender = 4
              renderChart()
            }
          "
        >
          <div class="flex justify-around items-center">
            <div>
              <p class="q-mb-none text-weight-bold text-white" style="font-size: 24px">
                {{ DashboardData.disease_count }}
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px">Disease</p>
            </div>
            <q-icon size="100px" name="monitor_heart" class="disease-card-icon" />
          </div>
          <div
            class="cursor-pointer text-white text-center view-graph"
            style="background-color: #55a15e"
          >
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>
      </div>

      <!-- <canvas ref="chartCanvas" /> -->
      <div
        class="flex items-center q-mt-md chartDiv"
        :style="{ height: $q.screen.height - 350 + 'px' }"
      >
        <canvas class="q-px-md" id="myChart" ref="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script src="../script/Dashboard/Dashboard.js"></script>

<style lang="scss">
@import '../styles/dashboard/dashboard.scss';

.chartDiv,
#myChart {
  width: 100%;
  justify-content: center;
}

.grid-item2 {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
}

.q-input {
  border-color: #5f8d4e;
}

.inside-container {
  border-radius: 5px;
}

.current {
  border: 2px solid #6bcb77;
}

.priority {
  border: 2px solid #ffa000;
}

.in-queue {
  border: 2px solid #5f8d4e;
}
</style>
