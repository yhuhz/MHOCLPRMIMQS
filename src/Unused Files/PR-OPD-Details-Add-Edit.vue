<template>
  <div class="pr-opd-details">
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
    <div class="card-box q-mx-md q-mb-xl">
      <div class="row">
        <div class="col-3 q-pa-md first-col">
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
              Jose Francisco Sinta Perez Sr.
            </p>
          </div>
          <div class="flex justify-between items-center q-mt-sm">
            <p class="text-dark">12A</p>
            <p class="text-dark">Active</p>
          </div>
          <div>
            <!-- Address -->
            <p class="text-center text-primary address-style">
              136, West St. Baligang, Camalig, Albay
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
            <div class="col q-mr-xl text-center">
              <q-input
                dense
                class="q-mb-xs"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              />
              <label class="text-dark">Birth date</label>
            </div>
            <div class="col text-center">
              <q-input
                dense
                class="q-mb-xs"
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              />
              <label class="text-dark">Age</label>
            </div>
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
              <q-select
                v-model="selectedDepartment"
                :options="departmentList"
                dense
                outlined
                color="primary"
                class="department-btn"
              />
            </div>
          </div>

          <div class="row q-my-md">
            <div class="col">
              <q-table dense />
            </div>
          </div>
        </div>

        <q-separator vertical color="primary" size="2px" />

        <!-- OPD Number -->
        <div class="opd-number">
          <p class="text-primary text-weight-bold queue-number">OPD186</p>
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

        <div class="col q-ml-md second-col fit">
          <!-- Preliminary Checkup -->
          <div class="preliminary-checkup">
            <div>
              <p class="bg-primary text-white text-center pc-heading">
                Preliminary Checkup
              </p>
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Done by</p>
              <q-input
                dense
                outlined
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Temperature</p>
              <q-input
                dense
                outlined
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Blood Presuure</p>
              <q-input
                dense
                outlined
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Height</p>
              <q-input
                dense
                outlined
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Weight</p>
              <q-input
                dense
                outlined
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Pulse Rate</p>
              <q-input
                dense
                outlined
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Oxygen Saturation</p>
              <q-input
                dense
                outlined
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="mhc-input-field"
              />
            </div>
          </div>

          <!-- Findings -->
          <div class="findings q-my-lg">
            <div>
              <p
                class="bg-primary text-white text-center findings-heading q-pl-md"
              >
                Findings
                <q-btn
                  unelevated
                  size="xs"
                  color="white"
                  icon="add"
                  text-color="primary"
                  round
                  class="float-right q-mr-md"
                />
              </p>
            </div>
            <div class="q-ma-md">
              <q-input
                dense
                outlined
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="eva-edit-outline"
                    color="primary"
                    class="cursor-pointer"
                  />
                </template>

                <template v-slot:append>
                  <q-icon
                    name="eva-trash-2-outline"
                    color="primary"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <!-- Laboratory Results -->
        <div class="col q-mx-md third-col">
          <div class="laboratory-results fit">
            <p class="bg-primary text-center text-white lr-heading q-pl-md">
              Laboratory Results

              <q-btn
                unelevated
                size="xs"
                color="white"
                icon="add"
                text-color="primary"
                round
                class="float-right q-mr-md"
              />
            </p>
            <div class="q-px-md q-mb-md">
              <q-input
                dense
                outlined
                :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                class="q-mb-md"
              >
                <template v-slot:prepend>
                  <q-icon
                    name="eva-edit-outline"
                    color="primary"
                    class="cursor-pointer"
                  />
                </template>

                <template v-slot:append>
                  <q-icon
                    name="eva-trash-2-outline"
                    color="primary"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </div>

        <!-- Doctors Notes -->
        <div class="col q-mr-md fourth-col">
          <div class="doctors-notes fit">
            <p class="bg-primary text-white text-center dn-heading">
              Doctors Notes
            </p>
            <div class="q-px-md">
              <div class="flex justify-between">
                <p class="text-primary text-weight-bold">Doctor:</p>
                <q-input
                  dense
                  outlined
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                />
              </div>

              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Complaint:</p>
                <q-input
                  dense
                  outlined
                  type="textarea"
                  autogrow
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="q-mb-sm"
                  style="width: 125px"
                />
              </div>

              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Checkup Date:</p>
                <q-input
                  v-model="checkupDate"
                  dense
                  outlined
                  type="date"
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                >
                  <!-- <template v-slot:prepend>
                    <q-icon name="event" color="primary" size="xs" class="cursor-pointer" >
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="checkupDate">
                          <div class="row justify-end items-center">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template> -->
                </q-input>
              </div>

              <div class="flex justify-between items-center q-mb-md">
                <p class="text-primary text-weight-bold">Next Checkup:</p>
                <q-input
                  v-model="nextCheckupDate"
                  dense
                  outlined
                  type="date"
                  :input-style="{ color: '#5f8d4e', fontWeight: '500' }"
                  class="mhc-input-field"
                >
                  <!-- <template v-slot:prepend>
                    <q-icon name="event" color="primary" size="xs" class="cursor-pointer" >
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="nextCheckupDate">
                          <div class="row justify-end items-center">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template> -->
                </q-input>
              </div>
            </div>

            <q-separator color="dark" />

            <div>
              <ul>
                <li class="text-primary q-mb-sm">
                  Patient should drink plenty of water
                </li>
                <li class="text-primary q-mb-sm">Take some bed rest</li>
                <li class="text-primary q-mb-sm">
                  Return for follow-up checkup
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./PR-OPD-Details-Edit"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/opd/pr_opd_details.scss";
</style>
