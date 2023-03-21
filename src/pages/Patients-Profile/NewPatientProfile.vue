<template>
  <div class="new-patient-profile">
  <div class="flex items-center q-px-md">
      <q-btn
      round
      dense
      outline
      icon="west"
      color="dark"
      @click="$router.go(-1)"
      class="q-mr-md"
      />
      <h5 class="text-weight-bold text-dark">CREATE NEW PATIENT PROFILE</h5>
    </div>

    <!-- Columns -->
    <div class="q-pa-md">
      <div class="row">

        <!-- Patient ID and Household -->
        <q-card class="col col-box q-pa-md">
          <p class="text-primary text-center text-weight-bold">
            <q-icon name="mdi-card-text-outline" size="xs" class="q-mx-sm q-gutter-xs" />
            PATIENT ID AND HOUSEHOLD
          </p>
          <div class="row">
            <div class="col">
              <q-label class="text-dark">Patient ID</q-label>
              <q-input
              v-model="patientIDHousehold.patientID"
              dense
              outlined
              class="q-mt-sm"
              />
              <p class="col-details">Patient ID is auto generated based on the Household ID. you can still edit the Patient ID</p>
            </div>
            <div class="col q-ml-md">
              <q-label class="text-dark">Household ID <span class="text-negative">*</span></q-label>
              <q-input
              v-model="patientIDHousehold.householdID"
              dense
              outlined
              class="q-mt-sm"
              />
              <p class="col-details">
                Make sure that the household already has a record. For new households, click here
              </p>
            </div>
          </div>
          <!-- Second Row -->
          <div class="row">
            <div class="col-6 q-gutter-x-sm">
              <q-label class="text-dark">Status <span class="text-negative">*</span></q-label>
              <q-select
              v-model="patientIDHousehold.status"
              dense
              outlined
              :options="statusList"
              class="q-mt-sm"
              />
              <p class="col-details">
                Choose whether the patient is active, <span class="text-warning">deceased</span>, or the record has been <span class="text-negative">archived</span>.
              </p>
            </div>
          </div>
        </q-card>

        <!-- Address -->
        <q-card class="col col-box q-pa-md">
          <p class="text-primary text-center text-weight-bold">
          <q-icon name="location_on" size="xs" class="q-mx-sm q-gutter-xs" />
            ADDRESS
          </p>
          <div class="row">
            <!-- Municipality -->
            <div class="col">
              <q-label class="text-dark">Municipality <span class="text-negative">*</span></q-label>
              <div>
                <q-radio
                v-model="municipality"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="Camalig"
                label="Camalig"
                class="q-mr-md text-dark"
                />
                <q-radio
                v-model="municipality"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="Outside Camalig"
                label="Outside Camalig"
                class="text-dark"
                />
              </div>
            </div>
            <!-- Barangay -->
            <div class="col">
              <q-label class="text-dark">Barangay <span class="text-negative">*</span></q-label>
              <q-select
              dense
              outlined
              v-model="selectedBarangay"
              :options="barangayList"
              class="q-mt-sm"
              />
              <p class="col-details">If the patient is not from Camalig, choose "Outside Camalig"</p>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <q-label class="text-dark">
                Complete Address <span class="text-negative q-mr-md">*</span>
                <span class="col-details">House No., Street Name, Barangay, Municipality/City, Province</span>
              </q-label>
              <q-input
              outlined
              v-model="completeAddress"
              dense
              placeholder="example: 123 South St., Cotmon, Camalig, Albay"
              class="q-mt-sm"
              />
            </div>
          </div>
        </q-card>
      </div>

      <div class="row q-mt-lg">
        <!-- Personal Information -->
        <q-card class="col col-box q-pa-md">
          <p class="text-primary text-weight-bold text-center">
            <q-icon name="person" size="sm" class="q-mx-sm q-gutter-xs" />
            PERSONAL INFORMATION
          </p>
          <div class="row">
            <!-- Last Name -->
            <div class="col">
              <q-label class="text-dark">Last Name <span class="text-negative">*</span></q-label>
              <q-input
              v-model="personalInformation.lastName"
              dense
              outlined
              class="q-mt-sm q-mr-md"
              />
            </div>
            <!-- First Name -->
            <div class="col">
              <q-label class="text-dark">First Name <span class="text-negative">*</span></q-label>
              <q-input
              v-model="personalInformation.firstName"
              dense
              outlined
              class="q-mt-sm"
              />
            </div>
          </div>

          <div class="row q-mt-md">
            <div class="col">
              <!-- Middle Name -->
              <q-label class="text-dark">Middle Name <span class="text-negative">*</span></q-label>
              <q-input
              v-model="personalInformation.middleName"
              dense
              outlined
              class="q-mt-sm"
              />
            </div>
            <div class="col-2 q-mx-md">
              <!-- Suffix -->
              <q-label class="text-dark">Suffix</q-label>
              <q-input
              v-model="personalInformation.suffix"
              dense
              outlined
              class="q-mt-sm"
              />
            </div>
            <div class="col">
              <!-- Date of Birth -->
              <q-label class="text-dark">Date of Birth<span class="text-negative">*</span></q-label>
              <q-input outlined dense v-model="personalInformation.dateOfBirth" class="q-mt-sm">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="personalInformation.dateOfBirth">
                        <div class="row justify-end items-center">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col q-mr-md">
              <!-- Phone Number -->
              <q-label class="text-dark">Phone Number <span class="text-negative">*</span></q-label>
              <q-input
              v-model="personalInformation.phoneNumber"
              dense
              outlined
              />
            </div>
            <div class="col">
              <q-label class="text-dark">Sex <span class="text-negative">*</span></q-label>
              <div>
                <q-radio
                v-model="personalInformation.sex"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="Male"
                label="Male"
                class="text-dark"
                />
                <q-radio
                v-model="personalInformation.sex"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="Female"
                label="Female"
                class="text-dark"
                />
              </div>
            </div>
          </div>
        </q-card>

        <!-- PWD & Senior CITIZENS -->
        <q-card class="col col-box q-pa-md">
          <p class="text-primary text-weight-bold text-center">
            <q-icon name="accessible" size="sm" class="q-mx-sm q-gutter-xs" />
            PWD & SENIOR CITIZENS
          </p>
          <q-checkbox v-model="isPWD" size="xs">
            <span class="text-dark">I am <span class="text-primary">Person with Disability (PWD)</span></span>
          </q-checkbox>
          <div class="row q-pa-md">
            <div class="col-4">
              <q-label class="text-dark">PWD ID</q-label>
              <q-input
              v-model="pwd.pwdID"
              dense
              outlined
              class="q-my-sm"
              />
            </div>
            <div class="col q-ml-md">
              <q-label class="text-dark">Type of Disability</q-label>
              <q-input
              v-model="pwd.typeOfDisability"
              dense
              outlined
              placeholder="example: Learning Disability"
              class="q-my-sm"
              />
            </div>
          </div>

          <q-checkbox v-model="isSeniorCitizen" size="xs">
            <span class="text-dark">I am a <span class="text-primary">Senior Citizen</span></span>
          </q-checkbox>
          <div class="row q-pa-md">
            <div class="col-4">
              <q-label class="text-dark">Senior Citizen ID</q-label>
              <q-input
              v-model="seniorCitizenID"
              dense
              outlined
              class="q-mt-sm"
              />
            </div>
          </div>
        </q-card>
      </div>

      <div class="q-py-xl text-center">
        <p class="text-primary text-weight-bold q-mb-sm bottom-text">Please check if you have any missing details from the patient</p>
        <p class="q-mb-md text-dark">
          Should there be any missing or incorrect information after creating the patient profile, please search the patient by his/her <span class="text-primary">ID</span> or <span class="text-warning">name</span>, then edit his/her information.
        </p>
        <div>
          <q-btn
          label="Submit"
          dense
          color="primary"
          no-caps
          class="q-mr-lg bottom-btn"
          />
          <q-btn
          outline
          dense
          label="Reset"
          no-caps
          color="primary"
          class="bottom-btn"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script src="../script/Patients-Profile/NewPatientProfile">
</script>

<style lang="scss" scoped>
  @import "../styles/patients-profile/new_patient_profile.scss"
</style>
