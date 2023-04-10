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
          <p class="bg-primary text-white text-center mn-heading">
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
            style="width: 150px"
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
            style="width: 150px"
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
            v-model="patientRecordInfo.previous_permature"
            style="width: 150px"
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
            style="width: 150px"
          >
            <template v-slot:append v-if="editForm">
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                  style="width: 150px"
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
            style="width: 150px"
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

      <!--  -->
      <!-- <div class="col q-mx-md third-col"> -->
      <div
        class="fit"
        v-for="(checkup, index) in prenatal_checkup"
        :key="index"
      >
        <div class="card-box">
          <div class="bg-primary text-center text-white mn-heading">
            02/02/2023
          </div>
          <div class="flex items-baseline justify-between q-px-md">
            <p class="text-weight-bold text-primary">Done by</p>
            <p class="text-primary">John Doe</p>
          </div>
          <div class="flex items-baseline justify-between q-px-md">
            <p class="text-weight-bold text-primary">Temperature</p>
            <p class="text-primary">27C</p>
          </div>
          <div class="flex items-baseline justify-between q-px-md">
            <p class="text-weight-bold text-primary">Blood Pressure</p>
            <p class="text-primary">120/80</p>
          </div>
          <div class="flex items-baseline justify-between q-px-md">
            <p class="text-weight-bold text-primary">Height</p>
            <p class="text-primary">172 cm</p>
          </div>
          <div class="flex items-baseline justify-between q-px-md">
            <p class="text-weight-bold text-primary">Weight</p>
            <p class="text-primary">78 kgs</p>
          </div>
          <div class="flex items-baseline justify-between q-px-md">
            <p class="text-weight-bold text-primary">Pulse Rate</p>
            <p class="text-primary">60bpm</p>
          </div>
          <div class="flex items-baseline justify-between q-px-md">
            <p class="text-weight-bold text-primary">Oxygen Saturation</p>
            <p class="text-primary">88%</p>
          </div>

          <q-separator class="separator-2" color="primary" />

          <div>
            <ul>
              <li class="text-primary q-mb-sm">Pregnancy Normal</li>
              <li class="text-primary q-mb-sm">Patient is okay</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- </div> -->

      <!-- New Checkup -->
      <div class="col q-mr-md fourth-col">
        <div
          class="new-checkup fit"
          :style="{ backgroundColor: toggleNewCheckup ? '#fff' : '#ccc' }"
        >
          <p
            class="bg-primary text-white text-weight-bol text-center nc-heading"
          >
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
              <p class="text-primary text-weight-bold q-mt-sm">
                Add new checkup
              </p>
            </div>
          </div>

          <!-- Field -->
          <div class="field fit" v-else>
            <div class="flex items-baseline justify-between q-mx-md">
              <p class="text-primary text-weight-bold">Done by</p>
              <q-input dense outlined class="mhc-input-field" />
            </div>
            <div class="flex items-baseline justify-between q-mx-md">
              <p class="text-primary text-weight-bold">Temperature</p>
              <q-input dense outlined class="mhc-input-field" />
            </div>
            <div class="flex items-baseline justify-between q-mx-md">
              <p class="text-primary text-weight-bold">Blood Pressure</p>
              <q-input dense outlined class="mhc-input-field" />
            </div>
            <div class="flex items-baseline justify-between q-mx-md">
              <p class="text-primary text-weight-bold">Height</p>
              <q-input dense outlined class="mhc-input-field" />
            </div>
            <div class="flex items-baseline justify-between q-mx-md">
              <p class="text-primary text-weight-bold">Weight</p>
              <q-input dense outlined class="mhc-input-field" />
            </div>
            <div class="flex items-baseline justify-between q-mx-md">
              <p class="text-primary text-weight-bold">Pulse Rate</p>
              <q-input dense outlined class="mhc-input-field" />
            </div>
            <div class="flex items-baseline justify-between q-mx-md">
              <p class="text-primary text-weight-bold">Oxygen Saturation</p>
              <q-input dense outlined class="mhc-input-field" />
            </div>

            <q-separator class="separator-3" color="primary" />

            <!-- Save-btn -->
            <div class="bg-primary text-white text-center save-field">
              <q-btn flat label="Save" no-caps style="width: 100%" />
            </div>
          </div>
        </div>
      </div>
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
  align-items: stretch;
}

.card-box {
  border: 2px solid #5f8d4e;
  border-radius: 5px;

  .mn-heading {
    font-size: 18px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
}
</style>
