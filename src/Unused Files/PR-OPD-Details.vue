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
              class="float-right cursor-pointer q-mt-sm"
              icon="eva-edit-outline"
              size="xs"
              padding="3px"
              outline
              color="primary"
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
            <p class="text-center text-primary address-details">
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
              <q-input dense class="q-mb-xs" />
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
                dense
                color="primary"
                outline
                label="Create New Record"
                no-caps
                size="sm"
                padding="4px 8px"
                icon="eva-folder-add-outline"
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
              <q-table :columns="columns" :rows="rows" dense />
            </div>
          </div>
        </div>

        <q-separator vertical size="2px" color="primary" />

        <!-- OPD Number -->
        <div class="opd-number">
          <p class="text-primary text-weight-bold queue-number">OPD186</p>
        </div>
        <!-- Action Button -->
        <div class="action-btn">
          <q-btn
            @click="$router.push('patient-record-opd-edit')"
            dense
            label="Edit"
            icon="eva-edit-outline"
            no-caps
            color="primary"
            class="button-120"
          />
          <q-btn
            dense
            label="Delete"
            icon="eva-trash-2-outline"
            no-caps
            color="negative button-120"
            class="q-ml-md"
          />
        </div>

        <div class="col q-ml-md second-col">
          <!-- Preliminary Checkup -->
          <div class="preliminary-checkup">
            <div>
              <p class="bg-primary text-white text-center pc-heading">
                Preliminary Checkup
              </p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Done by</p>
              <p class="text-primary">John Doe</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Temperature</p>
              <p class="text-primary">27C</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Blood Presuure</p>
              <p class="text-primary">120/80</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Height</p>
              <p class="text-primary">172cm</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Weight</p>
              <p class="text-primary">78kgs</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Pulse Rate</p>
              <p class="text-primary">60 bpm</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Oxygen Saturation</p>
              <p class="text-primary">88%</p>
            </div>
          </div>

          <!-- Findings -->
          <div class="findings q-mt-lg">
            <div>
              <p class="bg-primary text-white text-center findings-heading">
                Findings
              </p>
            </div>
            <div class="q-ma-md">
              <q-input dense outlined class="q-mb-sm" />
            </div>
          </div>
        </div>

        <!-- Laboratory Results -->
        <div class="col q-mx-md third-col">
          <div class="laboratory-results fit">
            <p class="bg-primary text-center text-white lr-heading">
              Laboratory Results
            </p>
            <div class="q-px-md q-mb-md">
              <q-input dense outlined class="q-mb-md" />
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
              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Doctor:</p>
                <p class="text-primary">Juan Dela Cruz</p>
              </div>

              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Complaint:</p>
                <p class="text-primary">Diarrhea</p>
              </div>

              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Checkup Date:</p>
                <p class="text-primary">02/02/2023</p>
              </div>

              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Next Checkup:</p>
                <p class="text-primary">02/10/2023</p>
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

<script src="./PR-OPD-Details"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/opd/pr_opd_details.scss";
</style>
