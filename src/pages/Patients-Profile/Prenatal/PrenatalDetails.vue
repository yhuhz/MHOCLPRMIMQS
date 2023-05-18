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
    </div>

    <div class="grid q-mt-lg">
      <!-- <div class="col q-ml-md second-col"> -->
      <!-- Midwifes Notes -->
      <div class="card-box midwifes-notes q-mb-md">
        <div class="q-mb-md">
          <p
            class="bg-green-7 text-white text-center mn-heading"
            style="padding: 7px 0px"
          >
            Midwife's Notes
          </p>
        </div>

        <!-- Action Button -->
        <div
          v-if="
            keySession &&
            keySession.department === 3 &&
            keySession.permission_level !== 3
          "
          class="flex q-mb-lg"
          style="justify-content: center"
        >
          <div
            v-if="!editForm && !isEditCheckup"
            class="row"
            style="width: 200px"
          >
            <q-btn
              @click="editForm = !editForm"
              dense
              label="Edit Midwife's Notes"
              icon="eva-edit-outline"
              no-caps
              outline
              color="primary"
              class="col"
            />
            <!-- <q-btn
            dense
            label="Delete"
            icon="eva-trash-2-outline"
            no-caps
            class="q-px-lg q-ml-sm"
            color="negative"
            @click="openDialog"
          /> -->
          </div>

          <div v-if="editForm" class="row q-px-md">
            <q-btn
              dense
              label="Save"
              type="submit"
              icon="save"
              no-caps
              color="primary"
              class="col q-mr-sm"
              style="width: 200px"
            />
            <q-btn
              @click="cancelFunction"
              dense
              label="Cancel"
              icon="close"
              no-caps
              class="col q-ml-sm"
              outline
              color="primary"
              style="width: 200px"
            />
          </div>
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
            readonly
            input-style="padding: 0"
            input-class="text-right text-primary"
            style="width: 200px"
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
            style="width: 200px"
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
            style="width: 200px"
          />
        </div>
        <div class="flex items-baseline justify-between q-px-md q-mb-sm">
          <p class="text-primary text-weight-bold">1st Checkup Date:</p>
          <q-input
            readonly
            outlined
            dense
            input-style="padding: 0"
            input-class="text-right text-primary"
            v-model="patientRecordInfo.date_added"
            style="width: 200px"
          />
        </div>
        <div class="flex items-baseline justify-between q-px-md q-mb-sm">
          <p class="text-primary text-weight-bold">Last Menstruation:</p>
          <q-input
            :readonly="!editForm"
            outlined
            dense
            input-style="padding: 0"
            input-class="text-right text-primary"
            style="width: 200px"
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
            input-style="min-height: 80px; max-height: 80px"
            v-model="patientRecordInfo.midwifes_notes"
          />
        </div>
      </div>
      <!-- </div> -->

      <!-- <div
        class="fit"
        v-for="(checkup, index) in prenatal_checkup"
        :key="index"
      >
        <div class="card-box">
          <div
            :class="
              !editForm
                ? 'bg-primary q-mb-md'
                : 'bg-primary flex items-center justify-between q-px-md q-mb-md'
            "
          >
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
              <template v-slot:prepend v-if="editForm">
                <q-icon name="event" class="cursor-pointer" color="white">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                    :style="$q.screen.width < 1366 && 'width: 150px'"
                  >
                    <q-date mask="YYYY-MM-DD" v-model="checkup.checkup_date">
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
            <q-btn
              dense
              flat
              icon="delete"
              class="text-white"
              borderless
              v-if="editForm && checkup.status === 0"
              @click="removeCheckup(index)"
            />
            <q-btn
              dense
              flat
              label="Undo Delete"
              class="text-white"
              borderless
              v-if="editForm && checkup.status === 1"
              @click="undoRemoveCheckup(index)"
            />
          </div>

          <div style="position: relative">
            <div
              class="bg-grey-4"
              style="
                height: 100%;
                width: 100%;
                position: absolute;
                opacity: 0.7;
              "
              v-if="checkup.status === 1"
            >
              <label class="text-red text-bold absolute-center"
                >TO BE DELETED</label
              >
            </div>
            <div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Temperature</p>
                <q-input
                  :readonly="!editForm"
                  :disable="checkup.status === 1"
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
                <div class="flex items-center justify-end">
                  <q-input
                    :readonly="!editForm"
                    :disable="checkup.status === 1"
                    outlined
                    dense
                    input-style="padding: 0"
                    input-class="text-right text-primary"
                    v-model="checkup.blood_pressure_systole"
                    :style="
                      $q.screen.width < 1366 ? 'width: 50px' : 'width: 80px'
                    "
                  />
                  <label class="text-primary text-bold q-px-sm">/</label>
                  <q-input
                    :readonly="!editForm"
                    :disable="checkup.status === 1"
                    outlined
                    dense
                    input-style="padding: 0"
                    input-class="text-right text-primary"
                    v-model="checkup.blood_pressure_diastole"
                    :style="
                      $q.screen.width < 1366 ? 'width: 50px' : 'width: 80px'
                    "
                  />
                </div>
              </div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Height</p>
                <q-input
                  :readonly="!editForm"
                  :disable="checkup.status === 1"
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
                  :disable="checkup.status === 1"
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
                  :disable="checkup.status === 1"
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
                  :disable="checkup.status === 1"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="%"
                  v-model="checkup.oxygen_sat"
                  :style="$q.screen.width < 1366 && 'width: 150px'"
                />
              </div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Next Checkup</p>
                <q-input
                  :readonly="!editForm"
                  :disable="checkup.status === 1"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="YYYY-MM-DD"
                  v-model="checkup.next_checkup"
                  :style="$q.screen.width < 1366 && 'width: 150px'"
                >
                  <template v-slot:append v-if="editForm">
                    <q-icon name="event" class="cursor-pointer" color="primary">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                        :style="$q.screen.width < 1366 && 'width: 150px'"
                      >
                        <q-date
                          mask="YYYY-MM-DD"
                          v-model="checkup.next_checkup"
                        >
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <q-separator class="separator-2 q-mx-md" color="primary" />

            <div class="q-px-md q-mb-sm">
              <q-input
                :readonly="!editForm"
                :disable="checkup.status === 1"
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
      </div> -->

      <div class="fit">
        <div class="card-box">
          <div
            class="flex justify-between items-center bg-primary q-mb-md"
            style="justify-content: center"
          >
            <label class="mn-heading text-white">Checkup Date:</label>
            <q-select
              v-model="selectedCheckup"
              borderless
              dense
              dark
              color="white"
              :options="RecordArrays"
              option-label="checkup_date"
              option-value="checkup_date"
              emit-value
              map-options
              input-class="text-white text-bold"
              class="col mn-heading q-ml-lg"
              style="max-width: 150px"
              @update:model-value="changeCheckupDate"
            />
          </div>

          <!-- Action Button -->
          <div
            v-if="
              keySession &&
              keySession.department === 3 &&
              keySession.permission_level !== 3
            "
            class="q-mb-lg"
            style="justify-content: center"
          >
            <div v-if="!isEditCheckup && !editForm" class="row q-px-md">
              <q-btn
                @click="isEditCheckup = !isEditCheckup"
                dense
                label="Edit Checkup Details"
                icon="eva-edit-outline"
                no-caps
                outline
                color="primary"
                class="col q-mr-sm"
              />

              <q-btn
                dense
                label="Add Prenatal Checkup"
                icon="add_circle"
                no-caps
                outline
                color="primary"
                class="col q-ml-sm"
              />
              <!-- <q-btn
            dense
            label="Delete"
            icon="eva-trash-2-outline"
            no-caps
            class="q-px-lg q-ml-sm"
            color="negative"
            @click="openDialog"
          /> -->
            </div>

            <div v-if="isEditCheckup" class="row q-px-md">
              <q-btn
                dense
                label="Save"
                type="submit"
                icon="save"
                no-caps
                color="primary"
                class="col q-mr-sm"
              />
              <q-btn
                @click="cancelFunction"
                dense
                label="Cancel"
                icon="close"
                no-caps
                class="col q-ml-sm"
                outline
                color="primary"
              />
            </div>
          </div>

          <div style="position: relative">
            <div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Temperature</p>
                <q-input
                  :readonly="!isEditCheckup"
                  v-model="prenatal_checkup.temperature"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="°C"
                  :style="$q.screen.width < 1366 && 'width: 150px'"
                />
              </div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Blood Pressure</p>
                <div class="flex items-center justify-end">
                  <q-input
                    :readonly="!isEditCheckup"
                    v-model="prenatal_checkup.blood_pressure_systole"
                    outlined
                    dense
                    input-style="padding: 0"
                    input-class="text-right text-primary"
                    :style="
                      $q.screen.width < 1366 ? 'width: 50px' : 'width: 80px'
                    "
                  />
                  <label class="text-primary text-bold q-px-sm">/</label>
                  <q-input
                    :readonly="!isEditCheckup"
                    v-model="prenatal_checkup.blood_pressure_diastole"
                    outlined
                    dense
                    input-style="padding: 0"
                    input-class="text-right text-primary"
                    :style="
                      $q.screen.width < 1366 ? 'width: 50px' : 'width: 80px'
                    "
                  />
                </div>
              </div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Height</p>
                <q-input
                  :readonly="!isEditCheckup"
                  v-model="prenatal_checkup.height"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="cm"
                  :style="$q.screen.width < 1366 && 'width: 150px'"
                />
              </div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Weight</p>
                <q-input
                  :readonly="!isEditCheckup"
                  v-model="prenatal_checkup.weight"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="kg"
                  :style="$q.screen.width < 1366 && 'width: 150px'"
                />
              </div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Pulse Rate</p>
                <q-input
                  :readonly="!isEditCheckup"
                  v-model="prenatal_checkup.pulse_rate"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="bpm"
                  :style="$q.screen.width < 1366 && 'width: 150px'"
                />
              </div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Oxygen Saturation</p>
                <q-input
                  :readonly="!isEditCheckup"
                  v-model="prenatal_checkup.oxygen_sat"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="%"
                  :style="$q.screen.width < 1366 && 'width: 150px'"
                />
              </div>
              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Next Checkup</p>
                <q-input
                  :readonly="!isEditCheckup"
                  v-model="prenatal_checkup.next_checkup"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="YYYY-MM-DD"
                  :style="$q.screen.width < 1366 && 'width: 150px'"
                >
                  <template v-slot:append v-if="isEditCheckup">
                    <q-icon name="event" class="cursor-pointer" color="primary">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                        :style="$q.screen.width < 1366 && 'width: 150px'"
                      >
                        <q-date
                          v-model="prenatal_checkup.next_checkup"
                          mask="YYYY-MM-DD"
                        >
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <q-separator class="separator-2 q-mx-md" color="primary" />

            <div class="q-px-md q-mb-sm">
              <q-input
                :readonly="!isEditCheckup"
                v-model="prenatal_checkup.comments"
                autogrow
                outlined
                dense
                input-class="text-primary"
                placeholder="Enter notes here"
                class="q-mt-md"
                input-style="max-height: 100px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <MHCDialog :content="$options.components.DeletePatientRecordConfirmation" />
  </div>
</template>

<script src="../../script/Patients-Profile/Prenatal/PrenatalDetails"></script>

<style lang="scss" scoped>
// @import "../../styles/patients-profile/prenatal/pr_prenatal.scss";

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

.midwifes-notes {
  border-color: #43a047;
}
</style>
