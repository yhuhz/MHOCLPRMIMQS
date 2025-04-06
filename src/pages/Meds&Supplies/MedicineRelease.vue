<template>
  <div class="medicine-inventory">
    <div class="flex justify-between items-center q-px-md q-pt-none">
      <div class="flex justify-start items-center">
        <q-btn
          round
          outline
          dense
          icon="eva-arrow-back-outline"
          color="dark"
          class="q-mr-md"
          @click="$router.go(-1)"
        />
        <h5 class="text-dark text-weight-bold">MEDICINE RELEASE</h5>
      </div>
      <!-- Medicine Release -->
      <q-btn
        v-if="
          keySession &&
          keySession.department === 4 &&
          keySession.permission_level !== 3
        "
        @click="isMedicineRelease = true"
        outline
        label="Release Medicines"
        icon-right="volunteer_activism"
        no-caps
        color="primary"
        class="q-ml-xs"
      />
    </div>

    <div>
      <!-- Pending -->
      <div class="row q-px-lg">
        <!-- Left panel -->
        <div
          class="col-4 q-pa-md q-mr-sm left-panel"
          :style="{ height: $q.screen.height - 180 + 'px' }"
        >
          <div class="flex items-baseline justify-between q-mb-sm">
            <q-select
              dense
              outlined
              v-model="selectedView"
              :options="viewOptions"
              style="width: 100px"
              @update:model-value="changeMode"
            />

            <q-select
              dense
              outlined
              input-class="text-primary text-bold"
              :options="pendingDateArray"
              v-model="selectedPendingDate"
              style="min-width: 100px"
              @update:model-value="changeDate"
            />
          </div>

          <div>
            <q-select
              v-if="selectedView === 'Done'"
              dense
              outlined
              v-model="selectedPerson"
              :options="personOption"
            />
          </div>

          <!-- <div>
            <q-input label="Search Name" outlined dense class="q-mb-sm">
              <template v-slot:prepend>
                <q-icon name="search" color="primary" />
              </template>
            </q-input>
          </div> -->

          <!-- <div>
            <q-select
              v-model="selectedPerson"
              :options="personOption"
              outlined
              dense
            />
          </div> -->

          <q-separator color="primary" class="q-my-md" />

          <q-scroll-area
            v-if="pendingArray.length > 0"
            :style="{ height: $q.screen.height - 330 + 'px' }"
          >
            <div
              v-for="(prescription, index) in pendingArray"
              :key="index"
              class="row"
            >
              <div
                v-if="
                  selectedPerson === 'All' ||
                  (selectedPerson === 'Patients' &&
                    prescription.patient_id !== undefined) ||
                  (selectedPerson === 'Personnel' &&
                    prescription.doctor_id !== undefined)
                "
                class="q-px-md q-py-sm q-mb-sm row cursor-pointer record-card"
                :style="
                  selectedIndex !== null && selectedIndex === index
                    ? 'background-color: #5f8d4e; color: white'
                    : 'background-color: white; color: #5f8d4e'
                "
                @click="selectPendingRecord(index)"
              >
                <div>
                  {{
                    prescription.first_name +
                    " " +
                    (prescription.middle_name
                      ? prescription.middle_name + " "
                      : " ") +
                    prescription.last_name +
                    " " +
                    (prescription.suffix ? prescription.suffix : "")
                  }}
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>

        <!-- Right Panel -->
        <div class="right-panel col q-ml-sm q-px-md q-pt-lg">
          <div
            v-if="pendingArray.length > 0"
            style="justify-content: center; align-items: center"
          >
            <div class="text-center">
              <h3 class="q-my-none text-primary text-bold">
                {{
                  selectedPrescription.opd_id
                    ? "OPD" + selectedPrescription.opd_id
                    : selectedPrescription.dental_id
                    ? "DNTL" + selectedPrescription.dental_id
                    : selectedPrescription.prenatal_checkup_id
                    ? "PNL Checkup " + selectedPrescription.prenatal_checkup_id
                    : selectedPrescription.first_name +
                      " " +
                      (selectedPrescription.middle_name
                        ? selectedPrescription.middle_name + " "
                        : " ") +
                      selectedPrescription.last_name +
                      " " +
                      (selectedPrescription.suffix
                        ? selectedPrescription.suffix
                        : "")
                }}
              </h3>
              <h5
                class="q-my-none text-bold text-grey-7"
                v-if="selectedView === 'Pending'"
              >
                {{
                  selectedPrescription.medicines.length > 0
                    ? selectedPrescription.medicines[0].release_date
                    : selectedPrescription.checkup_date
                }}
              </h5>
            </div>

            <q-scroll-area
              :style="{ height: $q.screen.height - 310 + 'px' }"
              class="q-mt-md"
            >
              <!-- Prescriptions -->
              <div v-if="selectedPrescription.prescription.length > 0">
                <h6 class="text-center q-my-none text-primary text-bold">
                  Prescription
                </h6>
                <div class="row">
                  <h6 class="col q-my-none text-primary text-bold">
                    Medicine Name
                  </h6>
                  <h6 class="col-2 q-my-none text-primary text-bold">
                    Quantity
                  </h6>
                </div>

                <div class="q-mt-sm">
                  <div
                    v-for="prescription in selectedPrescription.prescription"
                    :key="prescription"
                    class="row"
                  >
                    <q-input
                      dense
                      borderless
                      readonly
                      v-model="prescription.medicine_name"
                      class="col"
                      style="border-bottom: 1px solid #525252"
                    />
                    <q-input
                      dense
                      borderless
                      readonly
                      v-model="prescription.quantity"
                      class="col-2"
                      style="border-bottom: 1px solid #525252"
                    />
                  </div>
                </div>
              </div>

              <!-- Medicine Release -->
              <div
                class="q-mt-md"
                v-if="
                  selectedView === 'Done' ||
                  (selectedView === 'Pending' &&
                    keySession &&
                    keySession.department === 4)
                "
              >
                <h6
                  class="q-mt-md text-center q-my-none text-primary text-bold"
                >
                  Medicine Release
                  <q-btn
                    v-if="
                      keySession &&
                      keySession.department === 4 &&
                      keySession.permission_level !== 3 &&
                      (selectedPrescription.medicines.length === 0 ||
                        btnCondition)
                    "
                    outline
                    dense
                    no-caps
                    label="Add"
                    icon="add_circle"
                    color="primary"
                    class="q-px-md q-ml-md"
                    @click="addMedicine"
                  />
                </h6>
                <div class="row q-mt-md">
                  <label class="col text-dark text-bold q-mr-md"
                    >Medicine Name</label
                  >
                  <label class="col-1 text-dark text-bold q-mr-md"
                    >Quantity</label
                  >
                  <label class="col-4 text-dark text-bold q-mr-md"
                    >Department</label
                  >
                  <label
                    v-if="
                      keySession &&
                      keySession.department === 4 &&
                      keySession.permission_level !== 3 &&
                      selectedPrescription.medicines.length > 1
                    "
                    class="col-1 text-dark"
                    style="visibility: hidden"
                    >Quantity</label
                  >
                </div>

                <q-form @submit="submit" @reset="resetMedicine">
                  <div
                    v-for="(medicine, index) in selectedPrescription.medicines"
                    :key="index"
                    class="q-mt-md"
                  >
                    <div class="row q-mb-sm">
                      <q-select
                        v-model="medicine.medicine_details"
                        :readonly="
                          keySession &&
                          (keySession.department !== 4 ||
                            keySession.permission_level === 3)
                        "
                        dense
                        outlined
                        :options="medicineList"
                        @filter="medicineFilterFunction"
                        option-label="medicine_name"
                        option-value="medicine_id"
                        use-input
                        emit-value
                        map-options
                        class="col q-mr-md"
                        hide-bottom-space
                        @update:model-value="buttonCondition(index)"
                        :rules="[(val) => val || '']"
                        :label="
                          medicine.release_date ? medicine.release_date : ''
                        "
                      />

                      <q-input
                        dense
                        outlined
                        :readonly="
                          keySession &&
                          (keySession.department !== 4 ||
                            keySession.permission_level === 3)
                        "
                        class="col-1 q-mr-md"
                        input-class="text-dark"
                        v-model="medicine.quantity"
                        hide-bottom-space
                        @update:model-value="buttonCondition(index)"
                        :rules="[(val) => (val && !isNaN(val)) || '']"
                      />

                      <q-select
                        v-model="medicine.department"
                        :readonly="
                          keySession &&
                          (keySession.department !== 4 ||
                          keySession.permission_level === 3 ||
                          selectedPrescription.department
                            ? true
                            : false)
                        "
                        dense
                        outlined
                        :options="departments"
                        option-label="department_label"
                        option-value="department_id"
                        class="col-4 q-mr-md"
                        hide-bottom-space
                        @update:model-value="buttonCondition(index)"
                      />

                      <q-icon
                        v-if="
                          keySession &&
                          keySession.department === 4 &&
                          keySession.permission_level !== 3 &&
                          selectedPrescription.medicines.length > 1
                        "
                        name="delete"
                        color="negative"
                        class="col-1 cursor-pointer"
                        size="30px"
                        @click="removeMedicine(index)"
                      />
                    </div>
                  </div>

                  <div class="flex q-mt-md" style="justify-content: center">
                    <q-btn
                      v-if="
                        keySession &&
                        keySession.department === 4 &&
                        keySession.permission_level !== 3 &&
                        selectedPrescription.medicines.length > 0 &&
                        btnCondition
                      "
                      no-caps
                      color="primary"
                      type="submit"
                      label="Submit"
                      class="q-mr-xs"
                      style="width: 100px"
                    />
                    <q-btn
                      v-if="
                        keySession &&
                        keySession.department === 4 &&
                        keySession.permission_level !== 3 &&
                        selectedPrescription.medicines.length > 0 &&
                        selectedView !== 'Done'
                      "
                      no-caps
                      outline
                      type="reset"
                      color="primary"
                      label="Reset"
                      class="q-ml-xs"
                      style="width: 100px"
                    />
                  </div>
                </q-form>
              </div>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="isCustomDate" persistent>
      <q-card style="width: 500px">
        <div class="q-pa-lg">
          <div class="flex justify-end">
            <q-btn
              @click="closeCustomDate"
              dense
              color="negative"
              size="0.375rem"
              icon="eva-close-outline"
            />
          </div>
          <p class="text-primary text-weight-bold text-24 text-center q-mb-xl">
            <q-icon name="calendar_month" class="q-mr-xs q-gutter-xs" />
            SELECT CUSTOM DATES
          </p>

          <div class="flex justify-between items-center q-mt-sm">
            <!-- From -->
            <q-input
              dense
              outlined
              hint="From"
              class="width-150"
              v-model="dateArray[0]"
              readonly
            >
              <template v-slot:append>
                <q-icon name="eva-calendar-outline" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dateArray[0]"
                      mask="YYYY-MM-DD"
                      :options="(date) => date <= dateToday"
                      @update:model-value="changeCustomDate"
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

            <div class="line"></div>

            <!-- TO -->
            <q-input
              dense
              outlined
              hint="To"
              class="width-150"
              v-model="dateArray[1]"
              readonly
            >
              <template
                v-slot:append
                v-if="
                  dateArray[0] && dateArray[0] !== null && dateArray[0] !== ''
                "
              >
                <q-icon name="eva-calendar-outline" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dateArray[1]"
                      mask="YYYY-MM-DD"
                      :options="
                        (date) => date >= firstDate && date <= dateToday
                      "
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

          <q-btn
            v-if="dateArray[0] && dateArray[1]"
            label="Select Dates"
            color="primary"
            icon="done"
            style="width: 100%"
            class="q-mt-md"
            @click="getRecordsFromCustomDate"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Medicine Release -->
    <q-dialog v-model="isMedicineRelease" persistent>
      <q-card style="min-width: 500px; max-width: 750px">
        <div class="q-pa-lg">
          <div class="flex justify-end">
            <q-btn
              v-close-popup
              dense
              color="negative"
              size="0.375rem"
              icon="eva-close-outline"
            />
          </div>
          <p class="text-primary text-weight-bold text-24 text-center q-mb-xl">
            <q-icon name="volunteer_activism" class="q-mr-xs q-gutter-xs" />
            RELEASE MEDICINES
          </p>

          <q-form @submit="addMedicineReleasesMass">
            <div class="flex">
              <q-radio
                v-model="patientDoctor"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="Patient"
                label="Patient"
                @update:model-value="changePatientDoctor"
              />
              <q-radio
                v-model="patientDoctor"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="Personnel"
                label="Personnel"
                @update:model-value="changePatientDoctor"
              />
            </div>

            <div class="row q-mt-sm">
              <div class="col q-mr-md" v-if="patientDoctor === 'Patient'">
                <label class="text-dark"
                  >Patient ID <span class="text-negative">*</span></label
                >
                <q-select
                  outlined
                  hide-bottom-space
                  v-model="patient_id"
                  @filter="patientFilterFunction"
                  option-label="patient_name"
                  option-value="patient_id"
                  :options="patientOptions"
                  use-input
                  emit-value
                  map-options
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  :rules="[
                    (val) =>
                      (val && (val.length > 0 || !isNaN(val))) ||
                      'Required field',
                  ]"
                />
              </div>

              <div class="col q-mr-md" v-else>
                <label class="text-dark"
                  >Personnel ID <span class="text-negative">*</span></label
                >

                <q-select
                  outlined
                  hide-bottom-space
                  v-model="doctor_id"
                  @filter="userFilterFunction"
                  option-label="user_name"
                  option-value="user_id"
                  :options="userOptions"
                  use-input
                  emit-value
                  map-options
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  :rules="[
                    (val) =>
                      (val && (val.length > 0 || !isNaN(val))) ||
                      'Required field',
                  ]"
                  @update:model-value="findDepartment"
                />
              </div>

              <div class="col-5">
                <label class="text-dark"
                  >Department <span class="text-negative">*</span></label
                >
                <q-select
                  hide-bottom-space
                  :disable="patientDoctor !== 'Patient'"
                  :options="filtersDepartment"
                  dense
                  outlined
                  v-model="selectedDepartment"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Required field',
                  ]"
                />
              </div>
            </div>

            <q-separator class="q-my-md" color="primary" />

            <div v-if="(patient_id || doctor_id) && selectedDepartment">
              <div class="q-mb-md">
                <q-btn
                  v-if="medicineArray.length === 0 || btnConditionMass"
                  label="Add"
                  icon="add_circle"
                  color="primary"
                  outline
                  no-caps
                  @click="addMedicineMass"
                />
              </div>

              <div class="row">
                <label class="col text-dark text-bold q-mr-md"
                  >Medicine Name</label
                >
                <label class="col-2 text-dark text-bold q-mr-md"
                  >Quantity</label
                >
                <label
                  v-if="medicineArray.length > 1"
                  class="col-1 text-dark"
                  style="visibility: hidden"
                  >Quantity</label
                >
              </div>

              <div v-for="(medicine, index) in medicineArray" :key="index">
                <div class="row q-mb-md">
                  <q-select
                    v-model="medicine.medicine_details"
                    dense
                    outlined
                    :options="medicineListMass"
                    @filter="medicineFilterFunctionMass"
                    option-label="medicine_name"
                    option-value="medicine_id"
                    use-input
                    emit-value
                    map-options
                    new-value-mode="add-unique"
                    class="col q-mr-md"
                    @update:model-value="buttonConditionMass(index)"
                  />

                  <q-input
                    dense
                    outlined
                    class="col-2 q-mr-md"
                    input-class="text-dark"
                    v-model="medicine.quantity"
                    hide-bottom-space
                    :rules="[(val) => !isNaN(val) || 'Numbers only']"
                    @update:model-value="buttonConditionMass(index)"
                  />

                  <q-icon
                    v-if="medicineArray.length > 1"
                    name="delete"
                    color="negative"
                    class="col-1 cursor-pointer"
                    size="30px"
                    @click="removeMedicineMass(index)"
                  />
                </div>
              </div>
              <div>
                <q-btn
                  v-if="medicineArray.length > 0 && btnCondition"
                  label="Submit"
                  type="submit"
                  no-caps
                  color="primary"
                />
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>

    <MHCDialog :content="$options.components.DeleteMedicineConfirmation" />
  </div>
</template>

<script src="../script/Meds&Supplies/MedicineRelease"></script>

<style scoped lang="scss">
@import "../styles/meds&supplies/medicine_inventory.scss";

.left-panel {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  width: 300px;
}

.record-card {
  border: 1px solid #5f8d4e;
  border-radius: 10px;
  width: 100%;
}

.right-panel {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  width: 100%;
}
</style>
