import { RecordDetails } from 'src/composables/Patients';

<template>
  <div class="q-pa-md">
    <!-- Title -->
    <div class="flex items-baseline justify-between">
      <div class="column items-center">
        <label class="text-primary text-weight-bold text-h4"
          >IMZN{{ $route.params.record_id }}</label
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

    <!-- Midwifes Notes -->
    <div class="card-box q-mt-md">
      <div>
        <p class="bg-primary text-white text-center mn-heading">
          Midwife's Notes
        </p>
      </div>

      <div class="grid q-mb-md">
        <div class="q-px-md">
          <div class="flex justify-between items-baseline">
            <p class="text-primary text-weight-bold">Midwife:</p>
            <q-select
              hide-bottom-space
              outlined
              v-model="patientRecordInfo.immunizer_id"
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
          </div>
          <div class="flex justify-between items-baseline">
            <p class="text-primary text-weight-bold">Vaccine Used:</p>
            <q-input
              hide-bottom-space
              outlined
              dense
              input-style="padding: 0"
              input-class="text-right text-primary"
              v-model="patientRecordInfo.vaccine_used"
            />
          </div>
          <div class="flex justify-between items-baseline">
            <p class="text-primary text-weight-bold">Immunization Date:</p>
            <q-input
              hide-bottom-space
              autogrow
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.immunization_date"
              label="YYYY-MM-DD"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      mask="YYYY-MM-DD"
                      v-model="patientRecordInfo.immunization_date"
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
            <p class="text-primary text-weight-bold">Next Immunization:</p>
            <q-input
              hide-bottom-space
              autogrow
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.next_immunization_date"
              label="YYYY-MM-DD"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      mask="YYYY-MM-DD"
                      v-model="patientRecordInfo.next_immunization_date"
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

        <div class="text-primary q-mr-md" style="overflow: auto">
          <q-input
            autogrow
            outlined
            dense
            input-class="text-primary"
            input-style="min-height: 170px; max-height: 175px"
            label="Comments"
            v-model="patientRecordInfo.comments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../script/Patients-Profile/Immunization/AddImmunizationRecord"></script>

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
