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
                :readonly="
                  !editForm || (keySession && keySession.department !== 1)
                "
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
                :rules="[(val) => (val && val.length > 0) || '']"
                style="width: 180px"
              >
                <template
                  v-slot:append
                  v-if="editForm && keySession && keySession.department === 1"
                >
                  <q-icon name="event" class="cursor-pointer" color="primary">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        mask="YYYY-MM-DD"
                        v-model="patientRecordInfo.next_checkup"
                        :options="(date) => date >= checkup_date"
                        :rules="[(val) => (val && val.length > 0) || '']"
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
                :readonly="
                  !editForm || (keySession && keySession.department !== 1)
                "
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
                :label="
                  editForm && keySession && keySession.department === 1
                    ? 'Edit Prescription'
                    : 'View Prescription'
                "
                class="q-mt-sm q-px-md"
                @click="isPrescription = !isPrescription"
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
                  keySession &&
                  keySession.department === 1 &&
                  (disease.length === 0 ||
                    disease[disease.length - 1].opd_disease !== '')
                "
                @click="addFinding"
              />
            </p>
          </div>
          <div>
            <p class="text-center text-grey-7 q-my-none">
              Please input your findings here
            </p>
            <p class="text-center text-caption text-grey-6 q-my-none">
              If the finding is not on the list, please type the finding and
              press 'Enter'
            </p>
          </div>

          <div
            class="q-ma-md"
            v-for="(findings, index) in disease"
            :key="index"
          >
            <!-- <q-input
              :readonly="
                !editForm || (keySession && keySession.department !== 1)
              "
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
                v-if="editForm && keySession && keySession.department === 1"
                @click="removeFinding(index)"
              />
            </q-input> -->

            <q-select
              :readonly="
                !editForm || (keySession && keySession.department !== 1)
              "
              :options="findingOptionsFiltered"
              @filter="findingsFilter"
              use-input
              new-value-mode="add-unique"
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
                v-if="editForm && keySession && keySession.department === 1"
                @click="removeFinding(index)"
              />
            </q-select>
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
                  keySession &&
                  keySession.department === 1 &&
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
              :readonly="
                !editForm || (keySession && keySession.department !== 1)
              "
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
                v-if="editForm && keySession && keySession.department === 1"
                @click="removeLabResult(index)"
              />
            </q-input>
          </div>
        </div>
      </div>
    </q-form>

    <!-- Prescription -->
    <q-dialog v-model="isPrescription" persistent>
      <q-card class="q-pa-lg" style="overflow: hidden; width: 500px">
        <!-- <div class="text-center">
          <q-icon name="assignment" color="primary" size="100px" />
        </div> -->

        <div class="flex justify-between items-center q-mt-md">
          <h5 class="text-bold text-dark q-my-none">
            <q-icon name="assignment" color="primary" /> Prescription
          </h5>
          <q-btn
            v-if="
              editForm &&
              keySession &&
              keySession.department === 1 &&
              (prescription.length === 0 ||
                (prescription[prescription.length - 1].medicine_name !== '' &&
                  prescription[prescription.length - 1].quantity !== ''))
            "
            outline
            color="primary"
            icon="add_circle"
            label="Add"
            no-caps
            style="border-radius: 5px"
            @click="addPrescription"
          />
        </div>

        <q-separator color="primary" class="q-my-md" />

        <div class="q-mb-md">
          <div
            v-if="editForm && keySession && keySession.department === 1"
            class="text-center"
          >
            <p class="text-grey-7 text-caption">
              If the medicine is not on the list, please input the medicine name
              and press enter
            </p>
          </div>
          <div class="row">
            <label class="col text-dark text-bold q-mr-md">Medicine Name</label>
            <label class="col-2 text-dark text-bold q-mr-md">Quantity</label>
            <label
              v-if="editForm && keySession && keySession.department === 1"
              class="col-2 text-dark"
              style="visibility: hidden"
              >Quantity</label
            >
          </div>
          <div v-for="(prescriptions, index) in prescription" :key="index">
            <div class="row q-mb-md">
              <!-- <q-input
                :readonly="!editForm"
                autogrow
                dense
                outlined
                input-class="text-primary"
                class="col q-mr-md"
                v-model="prescriptions.medicine_name"
                hide-bottom-space
              /> -->

              <q-select
                v-model="prescriptions.medicine_name"
                dense
                outlined
                :readonly="
                  !editForm || (keySession && keySession.department !== 1)
                "
                :options="medicineList"
                @filter="medicineFilterFunction"
                option-label="medicine_name"
                option-value="medicine_name"
                use-chips
                use-input
                emit-value
                map-options
                new-value-mode="add-unique"
                class="col q-mr-md"
              />
              <q-input
                :readonly="
                  !editForm || (keySession && keySession.department !== 1)
                "
                autogrow
                dense
                outlined
                class="col-2 q-mr-md"
                input-class="text-dark"
                v-model="prescriptions.quantity"
                hide-bottom-space
                :rules="[(val) => !isNaN(val) || 'Numbers only']"
              />
              <!-- <q-btn
                icon="delete"
                dense
                outline
                color="negative"
                class="col-2"
                size="md"
                @click="removePrescription"
              /> -->
              <q-icon
                v-if="editForm && keySession && keySession.department === 1"
                name="delete"
                color="negative"
                class="col-2"
                style="cursor: pointer"
                size="md"
                @click="removePrescription(index)"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <q-btn
            v-if="
              !editForm ||
              prescription.length === 0 ||
              (prescription[prescription.length - 1].medicine_name !== '' &&
                prescription[prescription.length - 1].quantity !== '')
            "
            class="col"
            icon="check"
            label="Done"
            color="primary"
            no-caps
            @click="closePrescription"
          />
        </div>
      </q-card>
    </q-dialog>

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
