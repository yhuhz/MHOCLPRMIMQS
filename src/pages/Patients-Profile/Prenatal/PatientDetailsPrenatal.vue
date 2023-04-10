import { RecordDetails } from 'src/composables/Patients';

<template>
  <div class="q-pa-md">
    <!-- Title -->
    <div class="flex items-baseline justify-between">
      <div class="column items-center">
        <label class="text-primary text-weight-bold text-h4"
          >PNL{{ $route.params.record_id }}</label
        >
      </div>

      <!-- Action Button -->
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
          @click="editFunction"
          dense
          label="Save"
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

    <div class="grid q-mt-lg">
      <!-- <div class="col q-ml-md second-col"> -->
      <!-- Midwifes Notes -->
      <div class="card-box midwifes-notes q-mb-md">
        <div class="q-mb-md">
          <p
            class="bg-green-7 text-white text-center mn-heading"
            style="padding: 7px 0px; bordercolor: #43a047"
          >
            Midwife's Notes
          </p>
        </div>
        <div class="flex items-baseline justify-between q-px-md q-mb-sm">
          <p class="text-primary text-weight-bold">Midwife:</p>
          <q-select
            outlined
            v-model="patientRecordInfo.midwife_id"
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
            :style="$q.screen.width < 1366 && 'width: 150px'"
          />
        </div>
        <div class="flex items-baseline justify-between q-px-md q-mb-sm">
          <p class="text-primary text-weight-bold">Prev. Full Term:</p>
          <q-input
            :readonly="!editForm"
            outlined
            dense
            input-style="padding: 0"
            input-class="text-right text-primary"
            v-model="patientRecordInfo.previous_full_term"
            :style="$q.screen.width < 1366 && 'width: 150px'"
          />
        </div>
        <div class="flex items-baseline justify-between q-px-md q-mb-sm">
          <p class="text-primary text-weight-bold">Prev. Premature:</p>
          <q-input
            :readonly="!editForm"
            outlined
            dense
            input-style="padding: 0"
            input-class="text-right text-primary"
            v-model="patientRecordInfo.previous_premature"
            :style="$q.screen.width < 1366 && 'width: 150px'"
          />
        </div>
        <div class="flex items-baseline justify-between q-px-md q-mb-sm">
          <p class="text-primary text-weight-bold">1st Checkup Date:</p>
          <q-input
            :readonly="!editForm"
            outlined
            dense
            input-style="padding: 0"
            input-class="text-right text-primary"
            v-model="patientRecordInfo.date_added"
            :style="$q.screen.width < 1366 && 'width: 150px'"
          >
            <template v-slot:append v-if="editForm">
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                  :style="$q.screen.width < 1366 && 'width: 150px'"
                >
                  <q-date
                    mask="YYYY-MM-DD"
                    v-model="patientRecordInfo.date_added"
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
        <div class="flex items-baseline justify-between q-px-md q-mb-sm">
          <p class="text-primary text-weight-bold">Last Menstruation:</p>
          <q-input
            :readonly="!editForm"
            outlined
            dense
            input-style="padding: 0"
            input-class="text-right text-primary"
            :style="$q.screen.width < 1366 && 'width: 150px'"
            v-model="patientRecordInfo.last_menstruation"
          >
            <template v-slot:append v-if="editForm">
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date
                    mask="YYYY-MM-DD"
                    v-model="patientRecordInfo.last_menstruation"
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

        <q-separator color="primary" class="separator-1 q-mx-md" />

        <div class="q-px-md q-mb-sm">
          <q-input
            :readonly="!editForm"
            autogrow
            outlined
            dense
            input-class="text-primary"
            class="q-mt-md"
            input-style="max-height: 100px"
            v-model="patientRecordInfo.midwifes_notes"
          />
        </div>
      </div>
      <!-- </div> -->

      <!-- <div class="col q-mx-md third-col"> -->
      <div
        class="fit"
        v-for="(checkup, index) in prenatal_checkup"
        :key="index"
      >
        <div class="card-box">
          <div class="bg-primary">
            <q-input
              :readonly="!editForm"
              dense
              borderless
              input-style="padding: 0"
              input-class="text-center text-white"
              class="mn-heading"
              v-model="checkup.checkup_date"
              :style="$q.screen.width < 1366 && 'width: 150px'"
            >
              <template v-slot:append v-if="editForm">
                <q-icon name="event" class="cursor-pointer" color="white">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                    :style="$q.screen.width < 1366 && 'width: 150px'"
                  >
                    <q-date
                      mask="YYYY-MM-DD"
                      v-model="patientRecordInfo.date_added"
                    >
                      <div class="row justify-end items-center">
                        <q-btn
                          v-close-popup
                          color="white"
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
          <div class="q-mt-md">
            <div class="flex items-baseline justify-between q-px-md">
              <p class="text-weight-bold text-primary">Temperature</p>
              <q-input
                :readonly="!editForm"
                outlined
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                label="°C"
                v-model="checkup.temperature"
                :style="$q.screen.width < 1366 && 'width: 150px'"
              />
            </div>
            <div class="flex items-baseline justify-between q-px-md">
              <p class="text-weight-bold text-primary">Blood Pressure</p>
              <q-input
                :readonly="!editForm"
                outlined
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                v-model="checkup.blood_pressure"
                :style="$q.screen.width < 1366 && 'width: 150px'"
              />
            </div>
            <div class="flex items-baseline justify-between q-px-md">
              <p class="text-weight-bold text-primary">Height</p>
              <q-input
                :readonly="!editForm"
                outlined
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                label="cm"
                v-model="checkup.height"
                :style="$q.screen.width < 1366 && 'width: 150px'"
              />
            </div>
            <div class="flex items-baseline justify-between q-px-md">
              <p class="text-weight-bold text-primary">Weight</p>
              <q-input
                :readonly="!editForm"
                outlined
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                label="kg"
                v-model="checkup.weight"
                :style="$q.screen.width < 1366 && 'width: 150px'"
              />
            </div>
            <div class="flex items-baseline justify-between q-px-md">
              <p class="text-weight-bold text-primary">Pulse Rate</p>
              <q-input
                :readonly="!editForm"
                outlined
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                label="bpm"
                v-model="checkup.pulse_rate"
                :style="$q.screen.width < 1366 && 'width: 150px'"
              />
            </div>
            <div class="flex items-baseline justify-between q-px-md">
              <p class="text-weight-bold text-primary">Oxygen Saturation</p>
              <q-input
                :readonly="!editForm"
                outlined
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                label="%"
                v-model="checkup.oxygen_sat"
                :style="$q.screen.width < 1366 && 'width: 150px'"
              />
            </div>
          </div>

          <q-separator class="separator-2 q-mx-md" color="primary" />

          <div class="q-px-md q-mb-sm">
            <q-input
              :readonly="!editForm"
              autogrow
              outlined
              dense
              input-class="text-primary"
              class="q-mt-md"
              input-style="max-height: 100px"
              v-model="checkup.comments"
            />
          </div>
        </div>
      </div>
      <!-- </div> -->

      <!-- New Checkup -->
      <!-- <div class="col q-mr-md fourth-col"> -->
      <div
        class="new-checkup fit card-box q-mb-md"
        :style="{ backgroundColor: toggleNewCheckup ? '#fff' : '#ccc' }"
      >
        <p class="bg-primary text-white text-weight-bol text-center nc-heading">
          New Checkup
        </p>
        <div class="new-checkup-field fit" v-if="!toggleNewCheckup">
          <div class="text-center">
            <q-btn
              @click="toggleNewCheckup = true"
              icon="add"
              color="primary"
              padding="25px"
              class="new-checkup-btn"
            />
            <p class="text-primary text-weight-bold q-mt-sm">Add new checkup</p>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>

    <MHCDialog :content="$options.components.DeletePatientRecordConfirmation" />
  </div>
</template>

<script src="../../script/Patients-Profile/Prenatal/PatientDetailsPrenatal"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/prenatal/pr_prenatal.scss";
.q-field__bottom {
  display: none;
}

.grid {
  display: inline-grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px; /* sets a 15px gap between items */
  align-items: start;
}

.card-box {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  height: 100%;

  .mn-heading {
    font-size: 18px;
  }
}
</style>
