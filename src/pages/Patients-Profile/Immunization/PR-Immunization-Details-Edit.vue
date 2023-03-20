<template>
  <div class="pr-immunization-view">
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
        <div class="col q-pa-md">
          <div>
            <q-btn
            class="float-right q-mt-sm"
            size="xs"
            padding="3px"
            icon="edit"
            color="primary"
            outline
            />
            <p class="text-primary text-center text-weight-bold p-name">
              Jerome Jose Magat Calanas
            </p>
            <div class="flex justify-between items-center q-mt-sm">
              <p class="text-dark">36E</p>
              <p class="text-dark">Active</p>
            </div>
            <!-- Address -->
            <div>
            <p class="text-center text-primary" style="font-size: 14px;">
              45, Aroma St., Tagaytay, Camalig, Albay
            </p>
            </div>

            <div class="row q-mb-sm">
              <div class="col q-mr-xl text-center">
                <q-input dense class="q-mb-xs" />
                <label class="text-dark">Phone Number</label>
              </div>
              <div class="col q-mr-xl text-center">
                <q-input dense class="q-mb-xs" />
                <label class="text-dark">Sex</label>
              </div>
            </div>

            <div class="row q-mb-sm">
              <div class="col q-mr-xl text-center">
                <q-input dense class="q-mb-xs" />
                <label class="text-dark">Birth date</label>
              </div>
              <div class="col q-mr-xl text-center">
                <q-input dense class="q-mb-xs" />
                <label class="text-dark">Age</label>
              </div>
            </div>

            <div class="row q-mb-sm">
              <div class="col q-mr-xl text-center">
                <q-input dense class="q-mb-xs" />
                <label class="text-dark">PWD ID</label>
              </div>
              <div class="col q-mr-xl text-center">
                <q-input dense class="q-mb-xs" />
                <label class="text-dark">Type of Disability</label>
              </div>
            </div>

            <div class="row justify-center q-mb-sm">
            <div class="col-6 text-center">
              <q-input dense class="q-mb-xs" />
              <label class="text-dark">Senior Citizen ID</label>
            </div>
          </div>

          <q-separator class="q-my-lg" color="primary" />

          <!-- Create new record -->
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
              dense
              outlined
              color="primary"
              />
            </div>
          </div>

          <!-- Table -->
          <div class="row q-my-md">
            <div class="col">
              <q-table dense />
            </div>
          </div>
          </div>
        </div>

        <q-separator vertical color="primary" size="2px" />

        <!-- Immunization Number -->
        <div class="immunization-number">
          <div class="text-primary text-weight-bold queue-number">
            IMZN15
          </div>
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

        <div class="col-8 q-mx-md second-col">
          <!-- Midwifes Notes -->
          <div class="midwifes-notes fit">
            <div>
              <p class="bg-primary text-white text-center mn-heading">
                Midwife's Notes
              </p>
            </div>

            <div class="row padding">
              <div class="col-5 q-px-md">
              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Midwife:</p>
                <q-input
                dense
                outlined
                :input-style="{color: '#5f8d4e', fontWeight: '500'}"
                class="mhc-input-field"
                />
              </div>
              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Vaccine Used:</p>
                <q-input
                dense
                outlined
                :input-style="{color: '#5f8d4e', fontWeight: '500'}"
                class="mhc-input-field"
                />
              </div>
              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Immunization Date:</p>
                <q-input
                dense
                outlined
                type="date"
                :input-style="{color: '#5f8d4e', fontWeight: '500'}"
                class="mhc-input-field"
                />
              </div>
              <div class="flex justify-between items-center">
                <p class="text-primary text-weight-bold">Next Immunization:</p>
                <q-input
                dense
                outlined
                type="date"
                :input-style="{color: '#5f8d4e', fontWeight: '500'}"
                class="mhc-input-field"
                />
              </div>
            </div>
            <q-separator class="line" vertical size="2px" color="primary" />

            <div class="col">
              <ul class="no-margin">
                <li class="text-primary q-mb-sm">Sample Note</li>
                <li class="text-primary q-mb-sm">Sample Note</li>
                <li class="text-primary q-mb-sm">Sample Note</li>
              </ul>
            </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import '../../styles/patients-profile/immunization/pr_immunization.scss'
</style>
