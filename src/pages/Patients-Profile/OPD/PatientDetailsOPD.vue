<template>
  <div class="q-pa-md">
    <!-- Title -->
    <div class="flex justify-end">
      <div class="column items-center">
        <label class="text-primary text-weight-bold text-h4">OPD186</label>
      </div>

      <!-- Action Button -->
      <div class="">
        <q-btn
          @click="$router.push('patient-record-opd-edit')"
          dense
          label="Edit"
          icon="eva-edit-outline"
          no-caps
          color="primary"
          class="q-px-lg"
        />
        <q-btn
          dense
          label="Delete"
          icon="eva-trash-2-outline"
          no-caps
          class="q-px-lg"
          color="negative"
        />
      </div>
    </div>

    <div class="flex q-mt-lg">
      <div class="col q-ml-md">
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
      <div class="col q-mx-md">
        <div class="laboratory-results fit">
          <p class="bg-primary text-center text-white lr-heading">
            Laboratory Results
          </p>
          <div class="q-px-md">
            <q-input dense outlined class="q-mb-md" />
          </div>
        </div>
      </div>

      <!-- Doctors Notes -->
      <div class="col q-mr-md">
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
              <li class="text-primary q-mb-sm">Return for follow-up checkup</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../../script/Patients-Profile/OPD/PR-OPD-Details"></script>

<style lang="scss" scoped>
@import "../../styles/patients-profile/opd/pr_opd_details.scss";
</style>
