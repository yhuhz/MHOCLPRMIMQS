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

    <div class="q-mt-lg">
      <!-- <div class="col q-ml-md second-col"> -->

      <!-- Midwifes Notes -->
      <div class="card-box midwifes-notes">
        <q-form @submit="editPrenatalRecordFunction">
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
            class="q-mb-lg"
            style="justify-content: center; height: 30px"
          >
            <div v-if="!editForm && !isEditCheckup" class="row q-px-md">
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
            />
          </div>
          <div class="flex items-baseline justify-between q-px-md q-mb-sm">
            <p class="text-primary text-weight-bold">Prev. Full Term:</p>
            <q-input
              :readonly="!editForm"
              hide-bottom-space
              outlined
              dense
              input-style="padding: 0"
              input-class="text-right text-primary"
              v-model="patientRecordInfo.previous_full_term"
              :rules="[
                (val) => val === 0 || (val && !isNaN(val)) || 'Numbers only',
              ]"
            />
          </div>
          <div class="flex items-baseline justify-between q-px-md q-mb-sm">
            <p class="text-primary text-weight-bold">Prev. Premature:</p>
            <q-input
              :readonly="!editForm"
              hide-bottom-space
              outlined
              dense
              input-style="padding: 0"
              input-class="text-right text-primary"
              v-model="patientRecordInfo.previous_premature"
              :rules="[
                (val) => val === 0 || (val && !isNaN(val)) || 'Numbers only',
              ]"
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
            />
          </div>
          <div class="flex items-baseline justify-between q-px-md">
            <p class="text-primary text-weight-bold">Last Menstruation:</p>
            <q-input
              readonly
              outlined
              dense
              input-style="padding: 0"
              input-class="text-right text-primary"
              v-model="patientRecordInfo.last_menstruation"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
            >
              <template v-slot:append v-if="editForm">
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      mask="YYYY-MM-DD"
                      v-model="patientRecordInfo.last_menstruation"
                      :options="(date) => date <= checkup_date"
                      :rules="[
                        (val) => (val && val.length > 0) || 'Required field',
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

          <div class="flex items-baseline justify-between q-px-md q-mb-md">
            <p class="text-primary text-weight-bold">
              Expected Date of Delivery:
            </p>
            <q-input
              readonly
              outlined
              dense
              input-style="padding: 0"
              input-class="text-right text-primary"
              v-model="patientRecordInfo.expected_date_delivery"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
            >
              <template v-slot:append v-if="editForm">
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      mask="YYYY-MM-DD"
                      v-model="patientRecordInfo.expected_date_delivery"
                      :options="(date) => date >= checkup_date"
                      :rules="[
                        (val) => (val && val.length > 0) || 'Required field',
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

          <q-separator color="primary" class="separator-1 q-mx-md" />

          <div class="q-px-md q-mb-sm">
            <q-input
              :readonly="!editForm"
              autogrow
              outlined
              dense
              input-class="text-primary"
              class="q-mt-md"
              placeholder="Enter general notes here"
              input-style="min-height: 80px; max-height: 80px"
              v-model="patientRecordInfo.midwifes_notes"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
            />
          </div>
        </q-form>
      </div>

      <!-- </div> -->

      <!-- Prenatal Checkup -->

      <div class="card-box q-mt-md">
        <q-form @submit="submitFunction">
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
              :readonly="isEditCheckup"
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
            style="justify-content: center; height: 30px"
          >
            <div v-if="!isEditCheckup && !editForm" class="row q-px-md">
              <q-btn
                v-if="selectedCheckup !== null"
                @click="isEditCheckup = !isEditCheckup"
                dense
                label="Edit Checkup"
                icon="eva-edit-outline"
                no-caps
                outline
                color="primary"
                class="col q-mr-sm"
              />

              <q-btn
                dense
                label="Add Checkup"
                icon="add_circle"
                no-caps
                outline
                color="primary"
                class="col q-ml-sm"
                @click="addCheckupRecord"
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

          <div v-if="selectedCheckup" style="position: relative">
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
                  :rules="[
                    (val) =>
                      val === 0 || (val && !isNaN(val)) || 'Numbers only',
                  ]"
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
                    style="width: 70px"
                    :rules="[
                      (val) =>
                        val === 0 || (val && !isNaN(val)) || 'Numbers only',
                    ]"
                  />
                  <label class="text-primary text-bold q-px-sm">/</label>
                  <q-input
                    :readonly="!isEditCheckup"
                    v-model="prenatal_checkup.blood_pressure_diastole"
                    outlined
                    dense
                    input-style="padding: 0"
                    input-class="text-right text-primary"
                    style="width: 70px"
                    :rules="[
                      (val) =>
                        val === 0 || (val && !isNaN(val)) || 'Numbers only',
                    ]"
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
                  :rules="[
                    (val) =>
                      val === 0 || (val && !isNaN(val)) || 'Numbers only',
                  ]"
                  @update:model-value="updateBMI"
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
                  :rules="[
                    (val) =>
                      val === 0 || (val && !isNaN(val)) || 'Numbers only',
                  ]"
                  @update:model-value="updateBMI"
                />
              </div>
              <div class="flex items-baseline justify-between q-px-md q-mb-sm">
                <p class="text-weight-bold text-primary">BMI</p>
                <q-input
                  readonly
                  v-model="bmi"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
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
                  :rules="[
                    (val) =>
                      val === 0 || (val && !isNaN(val)) || 'Numbers only',
                  ]"
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
                  :rules="[
                    (val) =>
                      val === 0 || (val && !isNaN(val)) || 'Numbers only',
                  ]"
                />
              </div>

              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Age of Gestation</p>
                <q-input
                  :readonly="!isEditCheckup"
                  v-model="prenatal_checkup.aog"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="Weeks"
                  :rules="[
                    (val) =>
                      val === 0 || (val && val.length > 0) || 'Required field',
                  ]"
                />
              </div>

              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Fundal Height</p>
                <q-input
                  :readonly="!isEditCheckup"
                  v-model="prenatal_checkup.fundal_height"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  label="cm"
                  :rules="[(val) => val === 0 || !isNaN(val) || 'Numbers only']"
                />
              </div>

              <div class="flex items-baseline justify-between q-px-md q-mb-sm">
                <p class="text-weight-bold text-primary">
                  Tetanus Toxoid Vaccination Date Given
                </p>
                <q-input
                  readonly
                  v-model="prenatal_checkup.tetanus_vaccination"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                >
                  <template v-slot:append v-if="isEditCheckup">
                    <q-icon name="event" class="cursor-pointer" color="primary">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="prenatal_checkup.tetanus_vaccination"
                          mask="YYYY-MM-DD"
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

              <div class="flex items-baseline justify-between q-px-md">
                <p class="text-weight-bold text-primary">Next Checkup</p>
                <q-input
                  readonly
                  v-model="prenatal_checkup.next_checkup"
                  outlined
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  :rules="[
                    (val) =>
                      val === 0 || (val && val.length > 0) || 'Required field',
                  ]"
                >
                  <template v-slot:append v-if="isEditCheckup">
                    <q-icon name="event" class="cursor-pointer" color="primary">
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="prenatal_checkup.next_checkup"
                          :options="(date) => date >= checkup_date_prenatal"
                          mask="YYYY-MM-DD"
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
            <q-separator class="separator-2 q-mx-md" color="primary" />

            <div class="q-px-md q-mb-md">
              <q-input
                :readonly="!isEditCheckup"
                v-model="prenatal_checkup.comments"
                autogrow
                hide-bottom-space
                outlined
                dense
                input-class="text-primary"
                placeholder="Enter notes here"
                class="q-mt-md q-mb-sm"
                input-style="min-height:100px; max-height: 100px"
                :rules="[
                  (val) =>
                    val === 0 || (val && val.length > 0) || 'Required field',
                ]"
              />
              <q-btn
                icon="medication"
                dense
                outline
                no-caps
                color="primary"
                :label="
                  isEditCheckup && keySession && keySession.department === 3
                    ? 'Edit Prescription'
                    : 'View Prescription'
                "
                class="q-px-md"
                @click="isPrescription = !isPrescription"
              />
            </div>
          </div>
        </q-form>
      </div>
    </div>

    <!-- Prescription -->
    <q-dialog v-model="isPrescription" persistent>
      <q-card
        class="q-pa-lg"
        style="overflow: hidden; min-width: 500px; max-width: 750px"
      >
        <!-- <div class="text-center">
          <q-icon name="assignment" color="primary" size="100px" />
        </div> -->

        <div class="flex justify-between items-center q-mt-md">
          <h5 class="text-bold text-dark q-my-none">
            <q-icon name="assignment" color="primary" /> Prescription
          </h5>
          <q-btn
            v-if="
              isEditCheckup &&
              keySession &&
              keySession.department === 3 &&
              (prenatal_checkup.prescription.length === 0 ||
                (prenatal_checkup.prescription[
                  prenatal_checkup.prescription.length - 1
                ].medicine_name !== '' &&
                  prenatal_checkup.prescription[
                    prenatal_checkup.prescription.length - 1
                  ].quantity !== ''))
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
            v-if="isEditCheckup && keySession && keySession.department === 3"
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
              v-if="isEditCheckup && keySession && keySession.department === 3"
              class="col-2 text-dark"
              style="visibility: hidden"
              >Quantity</label
            >
          </div>
          <div
            v-for="(prescriptions, index) in prenatal_checkup.prescription"
            :key="index"
          >
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
                  !isEditCheckup || (keySession && keySession.department !== 3)
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
                  !isEditCheckup || (keySession && keySession.department !== 3)
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
                v-if="
                  isEditCheckup && keySession && keySession.department === 3
                "
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
              !isEditCheckup ||
              prenatal_checkup.prescription.length === 0 ||
              (prenatal_checkup.prescription[
                prenatal_checkup.prescription.length - 1
              ].medicine_name !== '' &&
                prenatal_checkup.prescription[
                  prenatal_checkup.prescription.length - 1
                ].quantity !== '')
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

  .mn-heading {
    font-size: 18px;
  }
}

.midwifes-notes {
  border-color: #43a047;
}
</style>
