<template>
  <div class="pr-prenatal-view">
    <div class="flex items-center q-px-md">
      <q-btn
        round
        dense
        outline
        icon="eva-arrow-back-outline"
        color="dark"
        @click="$router.go(-1)"
        class="q-mr-md"
      />
      <h5 class="text-weight-bold text-dark">PATIENT RECORDS</h5>
    </div>

    <!-- Card -->
    <div class="q-mx-md q-mb-xl card-box">
      <div class="row">
        <div class="col q-px-md q-py-md">
          <div>
            <q-btn
              class="float-right q-mt-sm"
              size="xs"
              padding="3px"
              icon="eva-edit-outline"
              color="primary"
              outline
            />
            <p class="text-primary text-center text-weight-bold p-name">
              Clarisa Magat Calanas
            </p>
          </div>
          <div class="flex justify-between items-center q-mt-sm">
            <p class="text-dark">36B</p>
            <p class="text-dark">Active</p>
          </div>
          <!-- Address -->
          <div>
            <p class="text-center text-primary address-details">
              45, Aroma St., Tagaytay, Camalig, Albay
            </p>
          </div>

          <div class="row q-mb-sm">
            <div class="col q-mr-xl text-center">
              <q-input
                dense
                class="q-mb-xs"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              />
              <label class="text-dark">Phone Number</label>
            </div>
            <div class="col text-center">
              <q-input
                dense
                class="q-mb-xs"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              />
              <label class="text-dark">Sex</label>
            </div>
          </div>

          <div class="row q-mb-sm">
            <dv class="col q-mr-xl text-center">
              <q-input
                dense
                class="q-mb-xs"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              />
              <label class="text-dark">Birth date</label>
            </dv>
            <dv class="col text-center">
              <q-input
                dense
                class="q-mb-xs"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              />
              <label class="text-dark">Age</label>
            </dv>
          </div>

          <div class="row q-mb-sm">
            <div class="col q-mr-xl text-center">
              <q-input
                dense
                class="q-mb-xs"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              />
              <label class="text-dark">PWD ID</label>
            </div>
            <div class="col text-center">
              <q-input
                dense
                class="q-mb-xs"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              />
              <label class="text-dark">Type of Disability</label>
            </div>
          </div>

          <div class="row justify-center q-mb-sm">
            <div class="col-6 text-center">
              <q-input
                dense
                class="q-mb-xs"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              />
              <label class="text-dark">Senior Citizen ID</label>
            </div>
          </div>

          <q-separator class="q-my-lg" color="dark" />

          <!-- Create New Record -->
          <div class="row q-my-lg">
            <div class="col">
              <q-btn
                color="primary"
                outline
                label="Create New Record"
                no-caps
                icon="eva-folder-add-outline"
                size="sm"
                padding="4px 8px"
                class="create-btn"
              />
            </div>

            <div class="col">
              <q-select dense outlined color="primary" />
            </div>
          </div>

          <div class="row q-my-md">
            <div class="col">
              <q-table dense />
            </div>
          </div>
        </div>

        <q-separator vertical color="primary" size="2px" />

        <!-- Prenatal Number -->
        <div class="prenatal-number">
          <p class="text-primary text-weight-bold queue-number">PNL34</p>
        </div>
        <!-- Action Button -->
        <div class="action-btn">
          <q-btn
            dense
            label="Submit"
            no-caps
            color="primary"
            class="button-120"
          />
          <q-btn
            dense
            outline
            label="Cancel"
            no-caps
            color="primary"
            class="q-ml-md button-120"
          />
        </div>

        <div class="col q-ml-md second-col">
          <!-- Midwifes Notes -->
          <div class="midwifes-notes fit">
            <div>
              <p class="bg-primary text-white text-center mn-heading">
                Midwife's Notes
              </p>
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Midwife:</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Prev. Full Term:</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Prev. Premature:</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">1st Checkup Date:</p>
              <q-input
                outlined
                dense
                type="date"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Last Menstruation:</p>
              <q-input
                outlined
                dense
                type="date"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>

            <q-separator class="separator-1" />

            <div>
              <ul>
                <li class="text-primary q-mb-sm">
                  Patient took PT test - positive
                </li>
                <li class="text-primary q-mb-sm">
                  Patient allergic to mefenamic acid and paracetamol
                </li>
                <li class="text-primary q-mb-sm">
                  Patient experienced 1 miscarriage
                </li>
                <li class="text-primary q-mb-sm">
                  Return for follow up check-up
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!--  -->
        <div class="col q-mx-md third-col">
          <div class="fit">
            <p class="bg-primary text-center text-white date-heading">
              02/02/2023
              <q-btn
                round
                size="xs"
                unelevated
                icon="eva-trash-2-outline"
                class="float-right q-mr-xs"
              />
            </p>
            <div class="flex justify-between q-px-md">
              <p class="text-weight-bold text-primary">Done by</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-weight-bold text-primary">Temperature</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-weight-bold text-primary">Blood Pressure</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-weight-bold text-primary">Height</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-weight-bold text-primary">Weight</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-weight-bold text-primary">Pulse Rate</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-weight-bold text-primary">Oxygen Saturation</p>
              <q-input
                outlined
                dense
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>

            <q-separator class="separator-2" />

            <div>
              <ul>
                <li class="text-primary q-mb-sm">Pregnancy Normal</li>
                <li class="text-primary q-mb-sm">Patient is okay</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- New Checkup -->
        <div class="col q-mr-md fourth-col">
          <div
            class="new-checkup fit"
            :style="{ backgroundColor: toggleNewCheckup ? '#fff' : '#ccc' }"
          >
            <p
              class="bg-primary text-white text-weight-bol text-center nc-heading"
            >
              New Checkup
            </p>
            <div class="new-checkup-field fit" v-if="!toggleNewCheckup">
              <div class="text-center">
                <q-btn
                  @click="toggleNewCheckup = true"
                  icon="eva-plus-outline"
                  color="primary"
                  padding="25px"
                  class="new-checkup-btn"
                />
                <p class="text-primary text-weight-bold q-mt-sm">
                  Add new checkup
                </p>
              </div>
            </div>

            <!-- Field -->
            <div class="field fit" v-else>
              <div class="flex justify-between q-mx-md">
                <p class="text-primary text-weight-bold">Done by</p>
                <q-input
                  dense
                  outlined
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                />
              </div>
              <div class="flex justify-between q-mx-md">
                <p class="text-primary text-weight-bold">Temperature</p>
                <q-input
                  dense
                  outlined
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                />
              </div>
              <div class="flex justify-between q-mx-md">
                <p class="text-primary text-weight-bold">Blood Pressure</p>
                <q-input
                  dense
                  outlined
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                />
              </div>
              <div class="flex justify-between q-mx-md">
                <p class="text-primary text-weight-bold">Height</p>
                <q-input
                  dense
                  outlined
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                />
              </div>
              <div class="flex justify-between q-mx-md">
                <p class="text-primary text-weight-bold">Weight</p>
                <q-input
                  dense
                  outlined
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                />
              </div>
              <div class="flex justify-between q-mx-md">
                <p class="text-primary text-weight-bold">Pulse Rate</p>
                <q-input
                  dense
                  outlined
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                />
              </div>
              <div class="flex justify-between q-mx-md">
                <p class="text-primary text-weight-bold">Oxygen Saturation</p>
                <q-input
                  dense
                  outlined
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                />
              </div>

              <q-separator class="separator-2" />

              <!-- Save-btn -->
              <div class="bg-primary text-white text-center save-field">
                <q-btn flat label="Save" no-caps style="width: 100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./PR-Prenatal-Details-Edit"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/prenatal/pr_prenatal.scss";
</style>
