<template>
  <div class="new-patient-profile q-pb-xl">
    <div class="flex justify-between items-center q-px-md q-py-md">
      <q-btn
        round
        dense
        outline
        icon="west"
        color="dark"
        @click="$router.go(-1)"
      />
      <div>
        <h5 class="text-weight-bold text-dark q-my-lg">
          {{
            route.params.id
              ? "EDIT PATIENT PROFILE"
              : "CREATE NEW PATIENT PROFILE"
          }}
        </h5>
      </div>
      <div></div>
    </div>

    <div
      class="q-py-md q-px-xl"
      style="
        max-width: 800px;
        margin: auto;
        border: 2px solid #5f8d4e;
        border-radius: 10px;
      "
    >
      <q-form @reset="onReset" @submit="onSubmit">
        <div class="q-pt-md">
          <p class="text-primary text-center text-weight-bold text-18">
            <q-icon
              name="mdi-card-text-outline"
              size="xs"
              class="q-mx-sm q-gutter-xs"
            />
            PATIENT ID AND HOUSEHOLD
          </p>
        </div>

        <!-- Patient ID and Household -->
        <div class="row">
          <div class="col q-mr-sm">
            <label class="text-dark">Patient ID</label>
            <q-input
              v-model="personalInformation.patient_id"
              dense
              outlined
              :input-style="{ color: '#525252' }"
              bg-color="grey-3"
              class="q-mt-sm"
              disable
            />
            <p class="col-details">Patient ID is auto-generated</p>
          </div>
          <div class="col q-ml-sm">
            <label class="text-dark"
              >Household ID <span class="text-negative">*</span></label
            >
            <q-select
              v-model="personalInformation.household_id"
              dense
              outlined
              map-options
              :options="householdOptions"
              input-debounce="0"
              option-label="household_name"
              option-value="household_id"
              emit-value
              use-input
              @filter="householdFilterFunction"
              :input-style="{ color: '#525252' }"
              class="q-mt-sm"
              @update:model-value="changeHousehold"
            />
            <p class="col-details">
              Make sure that the household already has a record. For new
              households, click
              <span
                style="cursor: pointer"
                class="text-primary"
                @click="$router.push({ name: 'household-records' })"
                >here</span
              >
            </p>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="q-py-lg">
          <p class="text-primary text-weight-bold text-center text-18">
            <q-icon name="person" size="sm" class="q-mx-sm q-gutter-xs" />
            PERSONAL INFORMATION
          </p>
        </div>
        <div class="row">
          <div class="col-5">
            <!-- Last Name -->
            <label class="text-dark"
              >Last Name <span class="text-negative">*</span></label
            >
            <q-input
              v-model="personalInformation.last_name"
              dense
              outlined
              :input-style="{ color: '#525252' }"
              class="q-mt-sm q-mr-md"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
            />
          </div>

          <div class="col-7">
            <!-- First Name -->
            <label class="text-dark"
              >First Name <span class="text-negative">*</span></label
            >
            <q-input
              v-model="personalInformation.first_name"
              dense
              outlined
              :input-style="{ color: '#525252' }"
              class="q-mt-sm"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-5">
            <!-- Middle Name -->
            <label class="text-dark">Middle Name</label>
            <q-input
              v-model="personalInformation.middle_name"
              dense
              outlined
              :input-style="{ color: '#525252' }"
              class="q-mt-sm q-mr-md"
            />
          </div>

          <div class="col-2">
            <!-- Suffix -->
            <label class="text-dark">Suffix</label>
            <q-input
              v-model="personalInformation.suffix"
              dense
              outlined
              :input-style="{ color: '#525252' }"
              class="q-mt-sm"
            />
          </div>

          <div class="col-5">
            <!-- Phone Number -->
            <label class="text-dark">Phone Number</label>
            <q-input
              v-model="personalInformation.phone_number"
              dense
              outlined
              :input-style="{ color: '#525252' }"
              class="q-mt-sm q-ml-md"
              maxlength="11"
              type="text"
              pattern="[0-9]*"
            />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-3">
            <!-- Sex -->
            <label class="text-dark"
              >Sex <span class="text-negative">*</span></label
            >
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

          <div class="col-3">
            <!-- Date of Birth -->
            <label class="text-dark"
              >Date of Birth <span class="text-negative">*</span></label
            >
            <q-input
              outlined
              dense
              v-model="personalInformation.birthdate"
              :input-style="{ color: '#525252' }"
              class="q-mt-sm"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
              @update:model-value="updateBirthdate"
            >
              <template v-slot:append>
                <q-icon name="eva-calendar-outline" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="personalInformation.birthdate"
                      mask="YYYY-MM-DD"
                      @update:model-value="updateBirthdate"
                    >
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col q-ml-md">
            <label class="text-dark"> Address </label>
            <q-input
              outlined
              disable
              v-model="address"
              dense
              :input-style="{ color: '#525252' }"
              class="q-mt-sm"
              :rules="[(val) => (val && val.length > 0) || 'Required field']"
            />
          </div>
        </div>

        <!-- PWD and Senior Citizens -->
        <div class="q-pt-lg q-pb-sm text-center">
          <p class="text-primary text-weight-bold text-18">
            <q-icon name="accessible" size="sm" class="q-mx-sm q-gutter-xs" />
            PWD & SENIOR CITIZENS
          </p>

          <label class="text-grey-7"
            ><q-icon name="information" color="amber-6" /> Please check if
            applicable</label
          >
        </div>

        <div class="row">
          <div class="col q-mr-sm">
            <!-- PWD -->
            <div class="flex justify-center items-center q-mb-md">
              <q-checkbox
                v-model="isPWD"
                size="xs"
                @update:model-value="onChangePWD"
              >
                <span class="text-dark">Person with Disability (PWD)</span>
                <br />
                <span class="text-dark text-caption text-negative"
                  >Please make sure that the person has a PWD ID</span
                >
              </q-checkbox>
            </div>
            <div class="row" v-if="isPWD">
              <div class="col-4">
                <label class="text-dark"
                  >PWD ID <span class="text-negative">*</span></label
                >
                <q-input
                  v-model="pwd.pwd_id"
                  dense
                  outlined
                  :input-style="{ color: '#525252' }"
                  class="q-my-sm"
                  :rules="[
                    (val) => (val && val.length > 0) || 'PWD ID Required',
                  ]"
                />
              </div>

              <div class="col q-ml-md">
                <label class="text-dark"
                  >Type of Disability
                  <span class="text-negative">*</span></label
                >
                <q-select
                  v-model="pwd.disability"
                  dense
                  outlined
                  :options="disabilityArray"
                  :input-style="{ color: '#525252' }"
                  placeholder="example: Learning Disability"
                  class="q-my-sm"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Required field',
                  ]"
                />
              </div>
            </div>
          </div>

          <div class="col-4">
            <!-- Senior Citizens -->
            <div class="flex justify-center items-center q-mb-md">
              <q-checkbox
                v-model="isSeniorCitizen"
                size="xs"
                @update:model-value="onChangeSC"
                disable
              >
                <span class="text-dark">Senior Citizen</span>
              </q-checkbox>
            </div>

            <div class="row justify-center" v-if="isSeniorCitizen">
              <div class="col">
                <label class="text-dark"
                  >Senior Citizen ID <span class="text-negative">*</span></label
                >
                <q-input
                  v-model="senior_citizen_id"
                  dense
                  outlined
                  :input-style="{ color: '#525252' }"
                  class="q-mt-sm"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Please put No ID if the patient has no PWD ID yet',
                  ]"
                  hint="Please put No ID if the patient has no Senior Citizen ID yet"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="q-py-xl text-center">
          <div>
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
              no-caps
              class="q-mr-lg bottom-btn"
            />
            <q-btn
              outline
              label="Reset"
              type="reset"
              no-caps
              color="primary"
              class="bottom-btn"
            />
          </div>
        </div>
      </q-form>
    </div>
    <MHCDialog :content="$options.components.AddPatientSuccess" />
  </div>
</template>

<script src="../script/Patients-Profile/NewPatientProfile"></script>

<style lang="scss" scoped>
@import "../styles/patients-profile/new_patient_profile.scss";
</style>
