import { DashboardData } from 'src/composables/Dashboard';

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
          @update:model-value="setDashboard()"
        />
      </div>

      <div class="flex justify-between wrap">
        <!-- New Patient Card -->
        <q-card
          square
          class="q-pt-md dashboard-card"
          style="background-color: #f1d356"
          @click="renderChart"
        >
          <div class="flex justify-around items-center">
            <div>
              <p
                class="q-mb-none text-weight-bold text-white"
                style="font-size: 24px"
              >
                {{ DashboardData.patient_count }}
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px">
                New Patients
              </p>
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
          square
          class="q-pt-md dashboard-card"
          style="background-color: #4d96ff"
        >
          <div class="flex justify-around items-center">
            <div>
              <p
                class="q-mb-none text-weight-bold text-white"
                style="font-size: 24px"
              >
                {{
                  Number(DashboardData.medicine_count) -
                    Number(DashboardData.medicine_release_count) ===
                  NaN
                    ? 0
                    : Number(DashboardData.medicine_count) -
                      Number(DashboardData.medicine_release_count)
                }}
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px">
                Medicines
              </p>
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
          square
          class="q-pt-md dashboard-card"
          style="background-color: #6bcb77"
        >
          <div class="flex justify-around items-center">
            <div>
              <p
                class="q-mb-none text-weight-bold text-white"
                style="font-size: 24px"
              >
                {{
                  Number(DashboardData.supply_count) -
                    Number(DashboardData.supply_release_count) ===
                  NaN
                    ? 0
                    : Number(DashboardData.supply_count) -
                      Number(DashboardData.supply_release_count)
                }}
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px">
                Supplies
              </p>
            </div>
            <q-icon size="100px" name="mdi-needle" class="supplies-card-icon" />
          </div>
          <div
            class="cursor-pointer text-white text-center view-graph"
            style="background-color: #55a15e"
          >
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>

        <!-- Disease Card -->
        <q-card
          square
          class="q-pt-md dashboard-card"
          style="background-color: #ff6b6b"
        >
          <div class="flex justify-around items-center">
            <div>
              <p
                class="q-mb-none text-weight-bold text-white"
                style="font-size: 24px"
              >
                {{ DashboardData.disease_count }}
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px">
                Disease
              </p>
            </div>
            <q-icon
              size="100px"
              name="monitor_heart"
              class="disease-card-icon"
            />
          </div>
          <div
            class="cursor-pointer text-white text-center view-graph"
            style="background-color: #d75555"
          >
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>
      </div>

      <div class="grid-container q-pt-lg">
        <fieldset class="grid-item1">
          <legend class="text-primary text-bold q-px-sm">
            Patients On Queue
          </legend>
          <q-select
            flat
            dense
            outlined
            label="Select Department"
            :options="departmentList"
            v-model="selectedDepartment"
            @update:model-value="getDepartments"
          />

          <div class="q-mt-lg">
            <ol>
              <li
                v-for="(queue, index) in QueueSpecific"
                :key="index"
                class="q-px-sm text-primary text-bold"
              >
                <p
                  class="text-primary text-bold flex items-center justify-between"
                >
                  {{ queue.patient_id }}
                  <span class="text-negative"
                    ><q-btn
                      class="q-px-sm"
                      dense
                      no-caps
                      label="Remove"
                      color="negative"
                      @click="removeFromQueue(queue.queue_id)"
                  /></span>
                </p>
              </li>
            </ol>
          </div>
        </fieldset>

        <fieldset class="grid-item2 q-ml-sm">
          <legend class="text-primary text-bold q-px-sm">Charts</legend>
          <!-- <canvas ref="chartCanvas" /> -->
          <canvas id="myChart"></canvas>
        </fieldset>
      </div>
    </div>
    <MHCDialog :content="$options.components.RemovePatientFromQueue" />
  </div>
</template>

<script src="../script/Dashboard/Dashboard.js"></script>

<style lang="scss">
@import "../styles/dashboard/dashboard.scss";

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.grid-item1 {
  grid-column: 1;
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.grid-item2 {
  grid-column: 2 / span 3;
  border: 2px solid #5f8d4e;
  border-radius: 5px;
}

.q-input {
  border-color: #5f8d4e;
}
</style>
