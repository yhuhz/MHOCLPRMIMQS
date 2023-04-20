import { DashboardData } from 'src/composables/Dashboard';

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
            chartToRender = 1;
            renderChart();
          "
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
          clickable
          square
          class="q-pt-md dashboard-card"
          style="background-color: #4d96ff"
          @click="
            chartToRender = 2;
            renderChart();
          "
        >
          <div class="flex justify-around items-center">
            <div>
              <p
                class="q-mb-none text-weight-bold text-white"
                style="font-size: 24px"
              >
                {{ totalinStockMedicine }}
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
          clickable
          square
          class="q-pt-md dashboard-card"
          style="background-color: #ff6b6b"
          @click="
            chartToRender = 3;
            renderChart();
          "
        >
          <div class="flex justify-around items-center">
            <div>
              <p
                class="q-mb-none text-weight-bold text-white"
                style="font-size: 24px"
              >
                {{ totalinStockSupply }}
              </p>
              <p class="text-weight-bold text-white" style="font-size: 16px">
                Supplies
              </p>
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
            chartToRender = 4;
            renderChart();
          "
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
            style="background-color: #55a15e"
          >
            View Graph
            <q-icon name="east" />
          </div>
        </q-card>
      </div>

      <div class="grid-container q-pt-lg">
        <fieldset
          class="grid-item1"
          v-if="keySession && keySession.department !== 4"
        >
          <legend class="text-primary text-bold q-px-sm">QUEUE</legend>
          <q-scroll-area :style="{ height: chartHeight + 'px' }">
            <q-select
              flat
              dense
              outlined
              label="Select Department"
              :options="departmentList"
              v-model="selectedDepartment"
              @update:model-value="getDepartments"
              class="q-mt-md"
            />

            <div class="q-mt-lg">
              <div>
                <fieldset class="inside-container current">
                  <legend class="text-bold q-px-sm" style="color: #55a15e">
                    Current
                  </legend>

                  <div class="text-center text-bold" style="color: #55a15e">
                    <label
                      style="font-size: x-large; cursor: pointer"
                      clickable
                      @click="
                        $router.push({
                          name: 'patient-details',
                          params: {
                            id: currentPatient.patient_id,
                          },
                        })
                      "
                      >{{ currentPatient && currentPatient.patient_id }}</label
                    >
                  </div>
                </fieldset>
              </div>
              <div>
                <fieldset class="inside-container priority q-mt-lg">
                  <legend class="text-amber-8 text-bold q-px-sm">
                    Priority
                  </legend>

                  <ol>
                    <li
                      v-for="(queue, index) in priorityPatients"
                      :key="index"
                      class="q-px-sm text-amber-9 text-bold"
                    >
                      <div class="flex justify-between items-baseline">
                        <label
                          class="text-amber-9 text-bold"
                          style="cursor: pointer; font-size: 16px"
                          clickable
                          @click="
                            $router.push({
                              name: 'patient-details',
                              params: {
                                id: currentPatient.patient_id,
                              },
                            })
                          "
                        >
                          {{ queue.patient_id }}
                        </label>
                        <q-btn
                          v-if="keySession && keySession.department === 5"
                          class="q-px-sm"
                          dense
                          flat
                          icon="delete"
                          @click="removeFromQueue(queue.queue_id)"
                        />
                      </div>
                    </li>
                  </ol>

                  <q-btn
                    v-if="
                      priorityPatients &&
                      priorityPatients[0] &&
                      keySession &&
                      (keySession.department === 5 ||
                        keySession.department === 1 ||
                        keySession.department === 2 ||
                        keySession.department === 3)
                    "
                    color="amber-8"
                    label="Call in next patient"
                    class="q-mt-md"
                    icon="mic"
                    style="width: 100%; font-size: 12px"
                    @click="callInNextPriority"
                  />
                </fieldset>
              </div>

              <div>
                <fieldset class="inside-container in-queue q-mt-lg">
                  <legend class="text-primary text-bold q-px-sm">
                    Patients in Queue
                  </legend>

                  <ol>
                    <li
                      v-for="(queue, index) in otherPatients"
                      :key="index"
                      class="q-px-sm text-primary text-bold"
                    >
                      <div class="flex justify-between items-baseline">
                        <label
                          class="text-primary text-bold"
                          style="cursor: pointer; font-size: 16px"
                          clickable
                          @click="
                            $router.push({
                              name: 'patient-details',
                              params: {
                                id: currentPatient.patient_id,
                              },
                            })
                          "
                        >
                          {{ queue.patient_id }}
                        </label>
                        <q-btn
                          v-if="keySession && keySession.department === 5"
                          class="q-pa-none"
                          dense
                          flat
                          icon="delete"
                          @click="removeFromQueue(queue.queue_id)"
                        />
                      </div>
                    </li>
                  </ol>

                  <q-btn
                    v-if="
                      otherPatients &&
                      otherPatients[0] &&
                      keySession &&
                      (keySession.department === 5 ||
                        keySession.department === 1 ||
                        keySession.department === 2 ||
                        keySession.department === 3)
                    "
                    color="primary"
                    label="Call in next patient"
                    class="q-mt-md"
                    icon="mic"
                    style="width: 100%; font-size: 12px"
                    @click="callInNextPatient"
                  />
                </fieldset>
              </div>
            </div>
          </q-scroll-area>
        </fieldset>

        <fieldset class="grid-item2 q-ml-sm">
          <legend class="text-primary text-bold q-px-sm">CHARTS</legend>
          <!-- <canvas ref="chartCanvas" /> -->
          <div
            ref="chartDiv"
            style="display: inline-block; height: 100%; width: 100%"
          >
            <canvas id="myChart" ref="canvas"></canvas>
          </div>
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
