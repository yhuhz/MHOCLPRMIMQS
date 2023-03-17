<template>
  <div class="pr-opd-details">
    <div class="flex items-center q-px-md">
      <q-btn
      round
      dense
      outline
      icon="west"
      @click="$router.go(-1)"
      class="q-mr-md"
      />
      <h5 class="text-weight-bold">PATIENTS RECORD</h5>
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
            icon="edit"
            color="primary"
            outline
            />
          <p class="text-primary text-center text-weight-bold" style="font-size: 22px;">
            Jose Francisco Sinta Perez Sr.
          </p>
          </div>
          <div class="flex justify-between items-center">
            <p>12A</p>
            <p>Active</p>
          </div>
          <div>
            <!-- Address -->
            <p class="text-center text-primary" style="font-size: 14px">136, West St. Baligang, Camalig, Albay</p>
          </div>

          <div class="row q-mb-sm">
            <div class="col q-mr-xl text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>Phone Number</q-label>
            </div>
            <div class="col text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>Sex</q-label>
            </div>
          </div>

          <div class="row q-mb-sm">
            <div class="col q-mr-xl text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>Birth date</q-label>
            </div>
            <div class="col text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>Age</q-label>
            </div>
          </div>

          <div class="row q-mb-sm">
            <div class="col q-mr-xl text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>PWD ID</q-label>
            </div>
            <div class="col text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>Type of Disability</q-label>
            </div>
          </div>

          <div class="row justify-center q-mb-sm">
            <div class="col-6 text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>Senior Citizen ID</q-label>
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
              icon="create_new_folder"
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
              <q-table
                :columns="columns"
                :rows="rows"
                dense
              />
            </div>
          </div>
        </div>

        <q-separator vertical color="primary" size="2px"/>

        <!-- OPD Number -->
        <div class="opd-number">
          <p class="text-primary text-weight-bold" style="font-size: 34px;">
            OPD186
          </p>
        </div>
        <!-- Action Button -->
        <div class="action-btn">
          <q-btn
            dense
            label="Submit"
            no-caps
            color="primary"
            style="width: 120px"
          />
          <q-btn
            dense
            outline
            label="Cancel"
            no-caps
            color="primary"
            style="width: 120px"
            class="q-ml-md"
          />
        </div>

        <div class="col q-ml-md second-col fit">
          <!-- Preliminary Checkup -->
          <div class="preliminary-checkup">
            <div>
              <p class="bg-primary text-white text-center pc-heading">Preliminary Checkup</p>
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Done by</p>
              <q-input
              dense
              outlined
              :input-style="{color: '#5f8d4e', fontWeight: '500'}"
              class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Temperature</p>
              <q-input
              dense
              outlined
              :input-style="{color: '#5f8d4e', fontWeight: '500'}"
              class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Blood Presuure</p>
              <q-input
              dense
              outlined
              :input-style="{color: '#5f8d4e', fontWeight: '500'}"
              class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Height</p>
              <q-input
              dense
              outlined
              :input-style="{color: '#5f8d4e', fontWeight: '500'}"
              class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Weight</p>
              <q-input
              dense
              outlined
              :input-style="{color: '#5f8d4e', fontWeight: '500'}"
              class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Pulse Rate</p>
              <q-input
              dense
              outlined
              :input-style="{color: '#5f8d4e', fontWeight: '500'}"
              class="mhc-input-field"
              />
            </div>
            <div class="flex justify-between q-px-md">
              <p class="text-primary text-weight-bold">Oxygen Saturation</p>
              <q-input
              dense
              outlined
              :input-style="{color: '#5f8d4e', fontWeight: '500'}"
              class="mhc-input-field"
              />
            </div>
          </div>

          <!-- Findings -->
          <div class="findings q-my-lg">
            <div>
                <p class="bg-primary text-white text-center findings-heading q-pl-md">
                  Findings
                  <q-btn
                  unelevated
                  size="xs"
                  color="white"
                  icon="add"
                  text-color="primary"
                  round
                  class="float-right q-mr-md" />
                </p>
            </div>
            <div class="q-ma-md">
              <q-input
                dense
                outlined
                :input-style="{color: '#5f8d4e', fontWeight: '500'}"
              >
              <template v-slot:prepend>
                <q-icon name="edit" color="primary" class="cursor-pointer" />
              </template>

              <template v-slot:append>
                <q-icon name="delete" color="primary" class="cursor-pointer" />
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
              :input-style="{color: '#5f8d4e', fontWeight: '500'}"
              class="q-mb-md"
              >
              <template v-slot:prepend>
                <q-icon name="edit" color="primary" class="cursor-pointer" />
              </template>

              <template v-slot:append>
                <q-icon name="delete" color="primary" class="cursor-pointer" />
              </template>
              </q-input>
            </div>
          </div>
        </div>

        <!-- Doctors Notes -->
        <div class="col q-mr-md fourth-col">
          <div class="doctors-notes fit">
            <p class="bg-primary text-white text-center dn-heading">Doctors Notes</p>
            <div class="q-px-md">

              <div class="flex justify-between">
                <p class="text-primary text-weight-bold">Doctor:</p>
                <q-input
                dense
                outlined
                :input-style="{color: '#5f8d4e', fontWeight: '500'}"
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
                :input-style="{color: '#5f8d4e', fontWeight: '500'}"
                class="q-mb-sm"
                style="width: 120px"
                />
              </div>

              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Checkup Date:</p>
                <q-input
                v-model="checkupDate"
                dense
                outlined
                type="date"
                :input-style="{color: '#5f8d4e', fontWeight: '500'}"
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
                :input-style="{color: '#5f8d4e', fontWeight: '500'}"
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
                <li class="text-primary q-mb-sm">Patient should drink plenty of water</li>
                <li class="text-primary q-mb-sm">Take some bed rest</li>
                <li class="text-primary q-mb-sm">Return for follow-up checkup</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script src="../../script/Patients-Profile/OPD/PR-OPD-Details-Edit">
</script>

<style lang="scss" scoped>
  @import "../../styles/patients-profile/opd/pr_opd_details.scss"
</style>
