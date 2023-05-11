import { RecordDetails } from 'src/composables/Patients';

<template>
  <div class="q-pa-md">
    <q-form @submit="addRecord">
      <!-- Title -->
      <div class="flex justify-between">
        <div class="column items-center">
          <label class="text-primary text-weight-bold text-h4"
            >New OPD Record</label
          >
        </div>

        <!-- Action Button -->

        <div>
          <q-btn
            dense
            label="Save"
            icon="save"
            type="submit"
            no-caps
            color="primary"
            class="q-px-lg"
          />
          <q-btn
            @click="cancel"
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

      <div class="flex q-mt-lg">
        <div class="col">
          <!-- Preliminary Checkup -->
          <div class="preliminary-checkup">
            <div>
              <p class="bg-primary text-white text-center pc-heading">
                Preliminary Checkup
              </p>
            </div>
            <div class="flex justify-between items-baseline q-px-md">
              <p class="text-primary text-weight-bold">Done by</p>
              <q-select
                disable
                outlined
                v-model="patientRecordInfo.preliminary_checkup_done_by"
                @filter="userFilterFunction"
                option-label="user_name"
                option-value="user_id"
                :options="userOptions"
                emit-value
                map-options
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                style="width: 150px"
              />
            </div>
            <div class="flex justify-between items-baseline q-px-md">
              <p class="text-primary text-weight-bold">Temperature</p>
              <q-input
                hide-bottom-space
                outlined
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                v-model="patientRecordInfo.temperature"
                :rules="[
                  (val) =>
                    (val && !isNaN(val)) || 'Field must contain numbers only',
                ]"
                placeholder="Celsius"
                style="width: 150px"
              />
            </div>
            <div class="flex justify-between items-baseline q-px-md">
              <p class="text-primary text-weight-bold">Blood Pressure</p>
              <div class="flex items-center justify-end">
                <q-input
                  outlined
                  dense
                  input-class="text-right text-primary"
                  v-model="patientRecordInfo.blood_pressure_systole"
                  style="width: 70px"
                  :rules="[
                    (val) =>
                      (val && !isNaN(val)) || 'Field must contain numbers only',
                  ]"
                />
                <label class="text-primary text-bold q-px-sm">/</label>
                <q-input
                  outlined
                  dense
                  input-class="text-right text-primary"
                  v-model="patientRecordInfo.blood_pressure_diastole"
                  style="width: 70px"
                  :rules="[
                    (val) =>
                      (val && !isNaN(val)) || 'Field must contain numbers only',
                  ]"
                />
              </div>
            </div>
            <div class="flex justify-between items-baseline q-px-md">
              <p class="text-primary text-weight-bold">Height</p>
              <q-input
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.height"
                hide-bottom-space
                :rules="[
                  (val) =>
                    (val && !isNaN(val)) || 'Field must contain numbers only',
                ]"
                placeholder="Centimeters"
                style="width: 150px"
              />
            </div>
            <div class="flex justify-between items-baseline q-px-md">
              <p class="text-primary text-weight-bold">Weight</p>
              <q-input
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.weight"
                hide-bottom-space
                :rules="[
                  (val) =>
                    (val && !isNaN(val)) || 'Field must contain numbers only',
                ]"
                placeholder="Kilograms"
                style="width: 150px"
              />
            </div>
            <div class="flex justify-between items-baseline q-px-md">
              <p class="text-primary text-weight-bold">Pulse Rate</p>
              <q-input
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.pulse_rate"
                hide-bottom-space
                :rules="[
                  (val) => !isNaN(val) || 'Field must contain numbers only',
                ]"
                placeholder="Beats per minute"
                style="width: 150px"
              />
            </div>
            <div class="flex justify-between items-baseline q-px-md">
              <p class="text-primary text-weight-bold">Oxygen Saturation</p>
              <q-input
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.oxygen_sat"
                hide-bottom-space
                :rules="[
                  (val) => !isNaN(val) || 'Field must contain numbers only',
                ]"
                placeholder="%"
                style="width: 150px"
              />
            </div>
          </div>
        </div>

        <!-- Doctors Notes -->
        <div class="col q-ml-md">
          <div class="doctors-notes fit">
            <p class="bg-primary text-white text-center dn-heading">
              Doctors Notes
            </p>
            <div class="q-px-md">
              <!-- <div class="flex justify-between items-baseline q-mb-sm">
                <p class="text-primary text-weight-bold">Doctor:</p>
                <q-select
                  disable
                  style="width: 200px"
                  outlined
                  v-model="patientRecordInfo.doctor_id"
                  @filter="userFilterFunction"
                  option-label="user_name"
                  option-value="user_id"
                  :options="userOptions"
                  emit-value
                  map-options
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                />
              </div> -->

              <div class="flex justify-between items-baseline q-mb-sm">
                <p class="text-primary text-weight-bold">Complaint:</p>
                <q-input
                  autogrow
                  outlined
                  dense
                  style="width: 200px"
                  input-class="text-right text-primary"
                  v-model="patientRecordInfo.complaint"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Required field',
                  ]"
                />
              </div>

              <div class="flex justify-between items-baseline q-mb-sm">
                <p class="text-primary text-weight-bold">Checkup Date:</p>
                <q-input
                  disable
                  autogrow
                  outlined
                  dense
                  style="width: 200px"
                  input-class="text-right text-primary"
                  v-model="patientRecordInfo.checkup_date"
                  placeholder="YYYY-MM-DD"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Required field',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          today-btn
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
            </div>
          </div>
        </div>
      </div>
    </q-form>

    <q-dialog v-model="isDonePatient" persistent>
      <q-card class="q-pa-md" style="width: 380px">
        <div>
          <div class="text-center">
            <q-icon name="add_task" size="100px" color="primary" />
            <h5 class="text-primary text-bold no-margin">Success</h5>
            <p class="text-dark q-mt-xs">
              Patient OPD record added successfully
            </p>
          </div>

          <div
            class="flex q-mt-md"
            style="justify-content: center; align-items: center"
          >
            <q-btn
              v-if="priorityPatients && priorityPatients.length !== 0"
              color="amber-9"
              icon="priority_high"
              label="Call next priority patient"
              no-caps
              class="q-mt-sm"
              style="width: 100%"
              @click="callInNextPriority"
            />
            <q-btn
              v-if="otherPatients && otherPatients.length !== 0"
              color="primary"
              icon="mic"
              label="Call next non-priority patient"
              no-caps
              class="q-mt-sm"
              style="width: 100%"
              @click="callInNextPatient"
            />
            <q-btn
              color="grey-2"
              icon="home"
              text-color="text-dark"
              label="Return to home page"
              no-caps
              class="q-mt-sm"
              style="width: 100%"
              @click="doneCurrentPatient"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script src="../../script/Patients-Profile/OPD/AddOPDRecord"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/opd/pr_opd_details.scss";
.q-field__bottom {
  display: none;
}
</style>
