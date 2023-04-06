import { RecordDetails } from 'src/composables/Patients';

<template>
  <div class="q-pa-md">
    <!-- Title -->
    <div class="flex justify-between">
      <div class="column items-center">
        <label class="text-primary text-weight-bold text-h4"
          >OPD{{ $route.params.record_id }}</label
        >
      </div>

      <!-- Action Button -->

      <div>
        <q-btn
          @click="addRecord"
          dense
          label="Save"
          icon="save"
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
          <div class="flex justify-between items-baseline q-px-md q-mb-sm">
            <p class="text-primary text-weight-bold">Done by</p>
            <q-select
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
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
              label="Celsius"
            />
          </div>
          <div class="flex justify-between items-baseline q-px-md">
            <p class="text-primary text-weight-bold">Blood Pressure</p>
            <q-input
              hide-bottom-space
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.blood_pressure"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
              label="e.g. 120/60"
            />
          </div>
          <div class="flex justify-between items-baseline q-px-md">
            <p class="text-primary text-weight-bold">Height</p>
            <q-input
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.height"
              hide-bottom-space
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
              label="Centimeters"
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
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
              label="Kilograms"
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
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
              label="Beats per minute"
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
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
              label="%"
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
            <div class="flex justify-between items-baseline q-mb-sm">
              <p class="text-primary text-weight-bold">Doctor:</p>
              <q-select
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
            </div>

            <div class="flex justify-between items-baseline q-mb-sm">
              <p class="text-primary text-weight-bold">Complaint:</p>
              <q-input
                autogrow
                outlined
                dense
                style="width: 200px"
                input-class="text-right text-primary"
                v-model="patientRecordInfo.complaint"
              />
            </div>

            <div class="flex justify-between items-baseline q-mb-sm">
              <p class="text-primary text-weight-bold">Checkup Date:</p>
              <q-input
                autogrow
                outlined
                dense
                style="width: 200px"
                input-class="text-right text-primary"
                v-model="patientRecordInfo.checkup_date"
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
  </div>
</template>

<script src="../../script/Patients-Profile/OPD/AddOPDRecord"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/opd/pr_opd_details.scss";
.q-field__bottom {
  display: none;
}
</style>
