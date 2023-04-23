import { RecordDetails } from 'src/composables/Patients';

<template>
  <div class="q-pa-md">
    <q-form @submit="editFunction">
      <!-- Title -->
      <div class="flex justify-between">
        <div class="column items-center">
          <label class="text-primary text-weight-bold text-h4"
            >DNTL{{ $route.params.record_id }}</label
          >
        </div>

        <!-- Action Button -->
        <div
          v-if="
            keySession &&
            (((keySession.department === 2 || keySession.department === 5) &&
              keySession.permission_level !== 3) ||
              (keySession.department === 6 &&
                keySession.permission_level === 1))
          "
        >
          <div v-if="!editForm">
            <q-btn
              @click="editForm = !editForm"
              dense
              label="Edit"
              icon="eva-edit-outline"
              no-caps
              color="primary"
              class="q-px-lg"
            />
            <q-btn
              dense
              label="Delete"
              icon="eva-trash-2-outline"
              no-caps
              class="q-px-lg q-ml-sm"
              color="negative"
              @click="openDialog"
            />
          </div>

          <div v-if="editForm">
            <q-btn
              dense
              label="Save"
              type="submit"
              icon="save"
              no-caps
              color="primary"
              class="q-px-lg"
            />
            <q-btn
              @click="cancelFunction"
              dense
              label="Cancel"
              icon="close"
              no-caps
              class="q-px-lg q-ml-sm"
              outline
              color="primary"
            />
          </div>
        </div>
      </div>

      <div class="grid q-mt-lg">
        <!-- Preliminary Checkup -->
        <div class="preliminary-checkup">
          <div>
            <p class="bg-primary text-white text-center pc-heading">
              Dentist's Notes
            </p>
          </div>
          <div class="q-px-md">
            <div class="flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Dentist</p>
              <q-select
                hide-bottom-space
                outlined
                v-model="patientRecordInfo.doctor_id"
                @filter="userFilterFunction"
                option-label="user_name"
                option-value="user_id"
                :options="userOptions"
                emit-value
                map-options
                dense
                :readonly="!editForm"
                input-style="padding: 0"
                input-class="text-right text-primary"
                style="width: 300px"
              />
            </div>
            <div class="flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Temperature</p>
              <q-input
                hide-bottom-space
                :readonly="!editForm"
                outlined
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                v-model="patientRecordInfo.temperature"
                style="width: 300px"
                label="°C"
              />
            </div>
            <div class="flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Blood Pressure</p>
              <div class="flex items-center justify-end">
                <q-input
                  hide-bottom-space
                  :readonly="!editForm"
                  outlined
                  dense
                  input-class="text-right text-primary"
                  v-model="patientRecordInfo.blood_pressure_systole"
                  style="width: 140px"
                />
                <label class="text-primary text-bold q-px-sm">/</label>
                <q-input
                  hide-bottom-space
                  :readonly="!editForm"
                  outlined
                  dense
                  input-class="text-right text-primary"
                  v-model="patientRecordInfo.blood_pressure_diastole"
                  style="width: 140px"
                />
              </div>
            </div>

            <div class="flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Complaint:</p>
              <q-input
                :readonly="!editForm"
                autogrow
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.complaint"
                style="width: 300px"
                hide-bottom-space
              />
            </div>

            <div class="flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Checkup Date:</p>
              <q-input
                hide-bottom-space
                :readonly="!editForm"
                autogrow
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.checkup_date"
                style="width: 300px"
                label="YYYY-MM-DD"
              >
                <template v-slot:append v-if="editForm">
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        mask="YYYY-MM-DD"
                        v-model="patientRecordInfo.checkup_date"
                      >
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

            <div class="flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Next Checkup:</p>
              <q-input
                hide-bottom-space
                :readonly="!editForm"
                autogrow
                outlined
                dense
                input-class="text-right text-primary"
                style="width: 300px"
                v-model="patientRecordInfo.next_checkup"
                label="YYYY-MM-DD"
              >
                <template v-slot:append v-if="editForm">
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        mask="YYYY-MM-DD"
                        v-model="patientRecordInfo.next_checkup"
                      >
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

            <!-- notes -->
            <div
              class="text-primary q-mb-md"
              style="border-top: 1px solid; overflow: auto"
            >
              <q-input
                :readonly="!editForm"
                autogrow
                outlined
                dense
                input-class="text-primary"
                class="q-mt-md"
                input-style="max-height: 100px"
                placeholder="Enter your notes here"
                v-model="patientRecordInfo.checkup_results"
              />
            </div>
          </div>
        </div>

        <!-- DENTAL CHART -->
        <div class="preliminary-checkup dental-chart">
          <div class="q-mt-md flex justify-center items-center">
            <p class="text-20 text-dark text-weight-bold">Dental Chart</p>
            <q-btn
              round
              dense
              flat
              size="xs"
              icon="eva-question-mark-circle-outline"
              color="primary"
              class="q-ml-md"
              style="margin-top: -15px"
            >
              <q-tooltip
                anchor="bottom start"
                self="top left"
                class="bg-transparent"
              >
                <q-card class="q-pa-md hint-card">
                  <p class="text-dark text-weight-bold" style="font-size: 14px">
                    Instructions
                  </p>
                  <ul style="font-size: 14px">
                    <li class="text-dark">
                      Use the dropdown list to select a tooth score.
                    </li>
                    <li class="text-dark">
                      Click on a tooth to leave a comment.
                    </li>
                  </ul>
                  <div
                    class="flex justify-between items-center text-dark"
                    style="font-size: 14px"
                  >
                    <p class="no-margin text-weight-medium">Code</p>
                    <p class="no-margin text-weight-medium">Tooth Score</p>
                  </div>
                  <div
                    class="flex justify-between items-center text-dark"
                    style="font-size: 14px"
                  >
                    <div class="flex items-center">
                      <p class="no-margin">0</p>
                      <q-badge rounded class="bg-transparent q-ml-xs" />
                    </div>
                    <p class="no-margin">Sound / OK</p>
                  </div>
                  <div
                    class="flex justify-between text-dark"
                    style="font-size: 14px"
                  >
                    <div class="flex items-center">
                      <p class="no-margin">1</p>
                      <q-badge rounded class="bg-grey-6 q-ml-xs" />
                    </div>
                    <p class="no-margin">Decayed</p>
                  </div>
                  <div
                    class="flex justify-between text-dark"
                    style="font-size: 14px"
                  >
                    <div class="flex items-center">
                      <p class="no-margin">2</p>
                      <q-badge rounded class="bg-yellow-6 q-ml-xs" />
                    </div>
                    <p class="no-margin">Missing</p>
                  </div>
                  <div
                    class="flex justify-between text-dark"
                    style="font-size: 14px"
                  >
                    <div class="flex items-center">
                      <p class="no-margin">3</p>
                      <q-badge rounded class="bg-blue-grey-2 q-ml-xs" />
                    </div>
                    <p class="no-margin">Filled</p>
                  </div>
                  <div
                    class="flex justify-between text-dark"
                    style="font-size: 14px"
                  >
                    <div class="flex items-center">
                      <p class="no-margin">4</p>
                      <q-badge rounded class="bg-orange-6 q-ml-xs" />
                    </div>
                    <p class="no-margin">For Extraction</p>
                  </div>
                  <div
                    class="flex justify-between text-dark"
                    style="font-size: 14px"
                  >
                    <div class="flex items-center">
                      <p class="no-margin">5</p>
                      <q-badge rounded class="bg-red-4 q-ml-xs" />
                    </div>
                    <p class="no-margin">Impacted</p>
                  </div>
                  <div
                    class="flex justify-between text-dark"
                    style="font-size: 14px"
                  >
                    <div class="flex items-center">
                      <p class="no-margin">6</p>
                      <q-badge rounded class="bg-light-blue-6 q-ml-xs" />
                    </div>
                    <p class="no-margin">Unerupted</p>
                  </div>
                </q-card>
              </q-tooltip>
            </q-btn>
          </div>

          <!-- Tooth Area -->
          <div class="q-px-md q-my-md grid-dental">
            <div
              class="grid-item"
              v-for="(teeth, index) in dental_chart"
              :key="index"
            >
              <div>
                <!-- Tooth score -->
                <div class="q-mb-xs">
                  <!-- <select
                  :disabled="!editForm"
                  v-model="teeth.tooth_score"
                  style="width: 90%"
                >
                  <option
                    v-for="(score, index) in scoreOptions"
                    :key="index"
                    :value="scoreOptions[index]"
                    :selected="selectedScore === score"
                  >
                    {{ score }}
                  </option>
                </select> -->
                  <q-select
                    dense
                    flat
                    outlined
                    hide-bottom-space
                    :readonly="!editForm"
                    v-model="teeth.tooth_score"
                    :options="scoreOptions"
                    style="width: 40px"
                  />
                </div>

                <!-- Tooth image -->
                <div>
                  <q-img
                    :src="
                      index < 16 ? upperTeeth[index] : lowerTeeth[index - 16]
                    "
                  />
                  <!-- This div is for background of tooth depends on score -->
                </div>

                <p class="no-margin text-center text-primary text-weight-bold">
                  {{ index + 1 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-form>

    <MHCDialog :content="$options.components.DeletePatientRecordConfirmation" />
  </div>
</template>

<script src="../../script/Patients-Profile/Dental/DentalDetails"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/opd/pr_opd_details.scss";
.q-field__bottom {
  display: none;
}

.no-padding .q-field__native {
  padding: 0;
}

.grid {
  display: inline-grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 15px;
}

.grid-dental {
  display: inline-grid;
  width: 100%;
  grid-template-columns: repeat(16, 1fr);
  grid-row-gap: 20px;
}

.grid-item {
  border-bottom: 2px solid #5f8d4e; /* add this line to create a line after each row */
  align-items: center;
  justify-content: center;
}

.card-box {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  position: relative;
}

.create-btn {
  height: 40px;
}

.opd-number {
  position: absolute;
  right: 35%;
  top: 10px;
}

.action-btn {
  position: absolute;
  right: 3%;
  top: 20px;
}

.second-col,
.third-col,
.fourth-col {
  margin-top: 70px;
  margin-bottom: 20px;
}

.preliminary-checkup,
.dentist-notes,
.dental-chart {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
}

.pc-heading,
.dn-heading {
  font-size: 18px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.hint-card {
  width: 250px;
}

.upper,
.lower {
  display: grid;
  grid-template-columns: repeat(16, 30px);
}

select {
  border-radius: 4px;
  color: #525252;
  outline: none;
  background-color: #f5f5f5;
}

ul {
  margin-left: -20px;
  margin-right: 8px;
}

.dental-modal {
  min-width: 650px;
}

.modal-second-col,
.modal-third-col {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  margin: 5px;
}

.q-badge {
  border: 1px solid #525252;
}

.tooth-bg-color {
  position: absolute;
  height: 100%;
  width: 120%;
  top: 0;
  opacity: 0.3;
}
</style>
