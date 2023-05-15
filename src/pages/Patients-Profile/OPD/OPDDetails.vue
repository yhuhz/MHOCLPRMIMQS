import { RecordDetails } from 'src/composables/Patients';

<template>
  <div class="q-pa-md">
    <q-form @submit="editFunction">
      <!-- Title -->
      <div class="flex justify-between">
        <div class="column items-center">
          <label class="text-primary text-weight-bold text-h4"
            >OPD{{ $route.params.record_id }}</label
          >
        </div>

        <!-- Action Button -->
        <div
          v-if="
            keySession &&
            (keySession.department === 1 || keySession.department === 5) &&
            keySession.permission_level !== 3
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
        <div class="preliminary-checkup q-mr-sm">
          <div>
            <p class="bg-primary text-white text-center pc-heading">
              Preliminary Checkup
            </p>
          </div>
          <div class="flex justify-between items-baseline q-px-md">
            <p class="text-primary text-weight-bold">Done by</p>
            <q-select
              hide-bottom-space
              outlined
              v-model="patientRecordInfo.preliminary_checkup_done_by"
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
            />
          </div>
          <div class="flex justify-between items-baseline q-px-md">
            <p class="text-primary text-weight-bold">Temperature</p>
            <q-input
              hide-bottom-space
              :readonly="!editForm"
              outlined
              dense
              input-style="padding: 0"
              input-class="text-right text-primary"
              v-model="patientRecordInfo.temperature"
              label="°C"
              :rules="[
                (val) =>
                  (val && !isNaN(val)) || 'Field must contain numbers only',
              ]"
            />
          </div>
          <div class="flex justify-between items-baseline q-px-md">
            <p class="text-primary text-weight-bold">Blood Pressure</p>
            <div class="flex items-center justify-end">
              <q-input
                hide-bottom-space
                :readonly="!editForm"
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.blood_pressure_systole"
                style="width: 80px"
                :rules="[
                  (val) =>
                    (val && !isNaN(val)) || 'Field must contain numbers only',
                ]"
              />
              <label class="text-primary text-bold q-px-sm">/</label>
              <q-input
                hide-bottom-space
                :readonly="!editForm"
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.blood_pressure_diastole"
                style="width: 80px"
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
              hide-bottom-space
              :readonly="!editForm"
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.height"
              label="cm"
              :rules="[
                (val) =>
                  (val && !isNaN(val)) || 'Field must contain numbers only',
              ]"
            />
          </div>
          <div class="flex justify-between items-baseline q-px-md">
            <p class="text-primary text-weight-bold">Weight</p>
            <q-input
              hide-bottom-space
              :readonly="!editForm"
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.weight"
              label="kg"
              :rules="[
                (val) =>
                  (val && !isNaN(val)) || 'Field must contain numbers only',
              ]"
            />
          </div>
          <div class="flex justify-between items-baseline q-px-md">
            <p class="text-primary text-weight-bold">Pulse Rate</p>
            <q-input
              hide-bottom-space
              :readonly="!editForm"
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.pulse_rate"
              label="BPM"
              :rules="[
                (val) => !isNaN(val) || 'Field must contain numbers only',
              ]"
            />
          </div>
          <div class="flex justify-between items-baseline q-px-md">
            <p class="text-primary text-weight-bold">Oxygen Saturation</p>
            <q-input
              hide-bottom-space
              :readonly="!editForm"
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.oxygen_sat"
              label="%"
              :rules="[
                (val) => !isNaN(val) || 'Field must contain numbers only',
              ]"
            />
          </div>
        </div>

        <!-- Doctors Notes -->
        <div class="doctors-notes q-ml-sm">
          <p class="bg-primary text-white text-center dn-heading">
            Doctors Notes
          </p>
          <div class="q-px-md">
            <div class="flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Doctor:</p>
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
                readonly
                input-style="padding: 0"
                input-class="text-right text-primary"
              />
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
                hide-bottom-space
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Field must contain numbers only',
                ]"
              />
            </div>

            <div class="flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Checkup Date:</p>
              <q-input
                hide-bottom-space
                readonly
                autogrow
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.checkup_date"
              />
            </div>

            <div class="flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Next Checkup:</p>
              <q-input
                hide-bottom-space
                readonly
                autogrow
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.next_checkup"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Field must contain numbers only',
                ]"
              >
                <template v-slot:append v-if="editForm">
                  <q-icon name="event" class="cursor-pointer" color="primary">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        mask="YYYY-MM-DD"
                        v-model="patientRecordInfo.next_checkup"
                        :options="(date) => date >= checkup_date"
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Field must contain numbers only',
                        ]"
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

            <!-- Notes -->
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
                input-style="min-height: 100px; max-height: 100px"
                v-model="patientRecordInfo.checkup_results"
                placeholder="Write your notes here"
              />
              <q-btn
                icon="medication"
                dense
                outline
                no-caps
                color="primary"
                :label="!editForm ? 'View Prescription' : 'Edit Prescription'"
                class="q-mt-sm q-px-md"
              />
            </div>
          </div>
        </div>

        <!-- Findings -->
        <div class="findings bottom-boxes q-mt-md q-mr-sm">
          <div>
            <p class="bg-primary text-white text-center findings-heading">
              Findings
              <q-btn
                dense
                flat
                borderless
                icon="add_circle"
                v-if="
                  editForm &&
                  (disease.length === 0 ||
                    disease[disease.length - 1].opd_disease !== '')
                "
                @click="addFinding"
              />
            </p>
          </div>
          <div>
            <p class="text-center text-grey-7">
              Please input your findings here
            </p>
          </div>

          <div
            class="q-ma-md"
            v-for="(findings, index) in disease"
            :key="index"
          >
            <q-input
              :readonly="!editForm"
              autogrow
              dense
              outlined
              input-class="text-primary"
              v-model="findings.opd_disease"
              hide-bottom-space
            >
              <q-btn
                dense
                flat
                icon="delete"
                borderless
                v-if="editForm"
                @click="removeFinding(index)"
              />
            </q-input>
          </div>
        </div>

        <!-- Laboratory Results -->
        <div class="laboratory-results q-mt-md q-ml-sm">
          <div>
            <p class="bg-primary text-center text-white lr-heading">
              Laboratory Results
              <q-btn
                dense
                flat
                borderless
                icon="add_circle"
                v-if="
                  editForm &&
                  (lab_results.length === 0 ||
                    lab_results[lab_results.length - 1].lab_result !== '')
                "
                @click="addLabResult"
              />
            </p>
          </div>

          <div>
            <p class="text-center text-grey-7">
              Please input the lab results here
            </p>
          </div>

          <div
            class="q-px-md q-mb-md"
            v-for="(result, index) in lab_results"
            :key="index"
          >
            <q-input
              :readonly="!editForm"
              autogrow
              dense
              outlined
              input-class="text-primary"
              v-model="result.lab_result"
              hide-bottom-space
            >
              <q-btn
                dense
                flat
                icon="delete"
                borderless
                v-if="editForm"
                @click="removeLabResult(index)"
              />
            </q-input>
          </div>
        </div>
      </div>
    </q-form>

    <MHCDialog :content="$options.components.DeletePatientRecordConfirmation" />
  </div>
</template>

<script src="../../script/Patients-Profile/OPD/OPDDetails"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/opd/pr_opd_details.scss";
.q-field__bottom {
  display: none;
}

.grid {
  display: inline-grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
}
</style>
