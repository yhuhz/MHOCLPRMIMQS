import { RecordDetails } from 'src/composables/Patients';

<template>
  <div class="q-pa-md">
    <!-- Title -->
    <div class="flex items-baseline justify-between">
      <div class="column items-center">
        <label class="text-primary text-weight-bold text-h4"
          >New Prenatal Record</label
        >
      </div>

      <!-- Action Button -->
      <div>
        <q-btn
          @click="addFunction"
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
            style="padding: 7px 0px"
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
            input-style="padding: 0"
            input-class="text-right text-primary"
            :style="$q.screen.width < 1366 && 'width: 150px'"
          />
        </div>
        <div class="flex items-baseline justify-between q-px-md q-mb-sm">
          <p class="text-primary text-weight-bold">Prev. Full Term:</p>
          <q-input
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
            outlined
            dense
            input-style="padding: 0"
            input-class="text-right text-primary"
            v-model="patientRecordInfo.date_added"
            :style="$q.screen.width < 1366 && 'width: 150px'"
          >
            <template v-slot:append>
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
            outlined
            dense
            input-style="padding: 0"
            input-class="text-right text-primary"
            :style="$q.screen.width < 1366 && 'width: 150px'"
            v-model="patientRecordInfo.last_menstruation"
          >
            <template v-slot:append>
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

        <!-- <q-separator color="primary" class="separator-1 q-mx-md" />

        <div class="q-px-md q-mb-sm">
          <q-input
            autogrow
            outlined
            dense
            input-class="text-primary"
            class="q-mt-md"
            input-style="max-height: 100px"
            v-model="patientRecordInfo.midwifes_notes"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script src="../../script/Patients-Profile/Prenatal/AddPrenatalRecord"></script>

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
