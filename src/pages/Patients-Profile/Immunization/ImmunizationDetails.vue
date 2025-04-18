import { RecordDetails } from 'src/composables/Patients';

<template>
  <div class="q-pa-md">
    <q-form @submit="editFunction">
      <!-- Title -->
      <div class="flex items-baseline justify-between">
        <div class="column items-center">
          <label class="text-primary text-weight-bold text-h4"
            >IMZN{{ $route.params.record_id }}</label
          >
        </div>

        <!-- Action Button -->
        <div
          v-if="
            keySession &&
            keySession.department === 3 &&
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

      <!-- Midwifes Notes -->
      <div class="card-box q-mt-md">
        <div>
          <p class="bg-primary text-white text-center mn-heading">
            Midwife's Notes
          </p>
        </div>

        <div class="row q-mb-md">
          <div class="col q-px-md">
            <div class="row flex justify-between items-baseline">
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
                readonly
                input-style="padding: 0"
                input-class="text-right text-primary"
                style="width: 280px"
              />
            </div>
            <div class="row flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Vaccine Used:</p>
              <!-- <q-input
                hide-bottom-space
                :readonly="!editForm"
                outlined
                dense
                input-style="padding: 0"
                input-class="text-right text-primary"
                v-model="patientRecordInfo.vaccine_used"
                style="width: 280px"
                :rules="[(val) => (val && val.length > 0) || 'Required field']"
              /> -->

              <q-select
                :readonly="!editForm"
                hide-bottom-space
                outlined
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                input-class="text-right text-primary"
                v-model="patientRecordInfo.vaccine_used"
                :options="vaccineArray"
                style="width: 280px"
                :rules="[(val) => (val && val.length > 0) || 'Required field']"
              />
            </div>
            <div class="row flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Immunization Date:</p>
              <q-input
                hide-bottom-space
                readonly
                autogrow
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.immunization_date"
                style="width: 280px"
              />
            </div>
            <div class="row flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Purpose:</p>
              <q-select
                :readonly="!editForm"
                hide-bottom-space
                outlined
                dense
                use-input
                use-chips
                new-value-mode="add-unique"
                input-class="text-right text-primary"
                v-model="patientRecordInfo.purpose"
                :options="purposeArray"
                style="width: 280px"
                :rules="[(val) => (val && val.length > 0) || 'Required field']"
              />
            </div>
            <div class="row flex justify-between items-baseline">
              <p class="text-primary text-weight-bold">Next Immunization:</p>
              <q-input
                hide-bottom-space
                :readonly="!editForm"
                autogrow
                outlined
                dense
                input-class="text-right text-primary"
                v-model="patientRecordInfo.next_immunization_date"
                style="width: 280px"
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

          <div class="col-4 text-primary q-mr-md" style="overflow: auto">
            <q-input
              :readonly="!editForm"
              autogrow
              outlined
              dense
              input-class="text-primary"
              input-style="min-height: 220px; max-height: 220px"
              placeholder="Enter notes here"
              class="row"
              v-model="patientRecordInfo.comments"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
            />
          </div>
        </div>
      </div>
    </q-form>
    <MHCDialog :content="$options.components.DeletePatientRecordConfirmation" />
  </div>
</template>

<script src="../../script/Patients-Profile/Immunization/ImmunizationDetails"></script>

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
