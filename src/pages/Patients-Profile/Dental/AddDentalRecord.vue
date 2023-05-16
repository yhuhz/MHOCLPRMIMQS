import { RecordDetails } from 'src/composables/Patients';

<template>
  <div class="q-pa-md">
    <q-form @submit="addRecord">
      <!-- Title -->
      <div class="flex justify-between">
        <div class="column items-center">
          <label class="text-primary text-weight-bold text-h4"
            >New Dental Record</label
          >
        </div>

        <!-- Action Button -->
        <div>
          <q-btn
            dense
            label="Save"
            icon="save"
            type="submit"
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

      <div class="preliminary-checkup q-mt-lg" style="width: 400px">
        <div>
          <p class="bg-primary text-white text-center pc-heading">
            Dentist's Notes
          </p>
        </div>
        <div class="q-px-md">
          <div class="flex justify-between items-baseline">
            <p class="text-primary text-weight-bold">Dentist</p>
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
              input-style="padding: 0"
              input-class="text-right text-primary"
              disable
              style="width: 200px"
            />
          </div>
          <div class="flex justify-between items-baseline">
            <p class="text-primary text-weight-bold">Temperature</p>
            <q-input
              hide-bottom-space
              outlined
              dense
              input-style="padding: 0"
              input-class="text-right text-primary"
              v-model="patientRecordInfo.temperature"
              label="°C"
              style="width: 200px"
              :rules="[
                (val) =>
                  (val && !isNaN(val)) || 'Field must contain numbers only',
              ]"
            />
          </div>
          <div class="flex justify-between items-baseline">
            <p class="text-primary text-weight-bold">Blood Pressure</p>
            <div class="flex items-center justify-end">
              <q-input
                hide-bottom-space
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

          <div class="flex justify-between items-baseline">
            <p class="text-primary text-weight-bold">Complaint:</p>
            <q-input
              autogrow
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.complaint"
              hide-bottom-space
              style="width: 200px"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
            />
          </div>

          <div class="flex justify-between items-baseline">
            <p class="text-primary text-weight-bold">Checkup Date:</p>
            <q-input
              hide-bottom-space
              autogrow
              outlined
              dense
              input-class="text-right text-primary"
              v-model="patientRecordInfo.checkup_date"
              label="YYYY-MM-DD"
              style="width: 200px"
              disable
            />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script src="../../script/Patients-Profile/Dental/AddDentalRecord"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/opd/pr_opd_details.scss";
.q-field__bottom {
  display: none;
}

.no-padding .q-field__native {
  padding: 0;
}

.grid {
  display: inline-grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 15px;
}

.grid-dental {
  display: inline-grid;
  width: 100%;
  grid-template-columns: repeat(16, 1fr);
  grid-row-gap: 20px;
}

.grid-item {
  border-bottom: 2px solid #5f8d4e; /* add this line to create a line after each row */
  align-items: center;
  justify-content: center;
}

.card-box {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  position: relative;
}

.create-btn {
  height: 40px;
}

.opd-number {
  position: absolute;
  right: 35%;
  top: 10px;
}

.action-btn {
  position: absolute;
  right: 3%;
  top: 20px;
}

.second-col,
.third-col,
.fourth-col {
  margin-top: 70px;
  margin-bottom: 20px;
}

.preliminary-checkup,
.dentist-notes,
.dental-chart {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
}

.pc-heading,
.dn-heading {
  font-size: 18px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.hint-card {
  width: 250px;
}

.upper,
.lower {
  display: grid;
  grid-template-columns: repeat(16, 30px);
}

select {
  border-radius: 4px;
  color: #525252;
  outline: none;
  background-color: #f5f5f5;
}

ul {
  margin-left: -20px;
  margin-right: 8px;
}

.dental-modal {
  min-width: 650px;
}

.modal-second-col,
.modal-third-col {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  margin: 5px;
}

.q-badge {
  border: 1px solid #525252;
}

.tooth-bg-color {
  position: absolute;
  height: 100%;
  width: 120%;
  top: 0;
  opacity: 0.3;
}
</style>
