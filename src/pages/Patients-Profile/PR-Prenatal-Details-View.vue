<template>
  <div class="pr-prenatal-view">
    <div class="flex items-center q-px-md">
      <q-btn
      round
      dense
      outline
      icon="west"
      @click="$router.go(-1)"
      class="q-mr-md"
      />
      <h5 class="text-weight-bold">PATIENTS RECORDS</h5>
    </div>

    <!-- Card -->
    <div class="q-mx-md q-mb-xl card-box">
      <div class="row">
        <div class="col-3 q-px-md q-py-md">
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
              Clarisa Magat Calanas
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p>36B</p>
            <p>Active</p>
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
              <q-label>Phone Number</q-label>
            </div>
            <div class="col text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>Sex</q-label>
            </div>
          </div>

          <div class="row q-mb-sm">
            <dv class="col q-mr-xl text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>Birth date</q-label>
            </dv>
            <dv class="col text-center">
              <q-input dense class="q-mb-xs" />
              <q-label>Age</q-label>
            </dv>
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

          <!-- Create New Record -->
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

          <div class="row q-my-md">
            <div class="col">
              <q-table dense  />
            </div>
          </div>
        </div>

        <q-separator vertical color="primary" size="2px" />

        <!-- Prenatal Number -->
         <div class="prenatal-number">
          <p class="text-primary text-weight-bold" style="font-size: 34px;">
            PNL34
          </p>
        </div>
        <!-- Action Button -->
        <div class="action-btn">
          <q-btn
            dense
            label="Edit"
            icon="edit"
            no-caps
            color="primary"
            style="width: 120px"
          />
          <q-btn
            dense
            label="Delete"
            icon="delete"
            no-caps
            color="negative"
            style="width: 120px"
            class="q-ml-md"
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
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Midwife:</p>
              <p class="text-primary">Ma. Juana Santos</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Prev. Full Term:</p>
              <p class="text-primary">2</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Prev. Premature:</p>
              <p class="text-primary">1</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">1st Checkup Date:</p>
              <p class="text-primary">02/02/2023</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-primary text-weight-bold">Last Menstruation:</p>
              <p class="text-primary">12/25/2022</p>
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
            </p>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-weight-bold text-primary">Done by</p>
              <p class="text-primary">John Doe</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-weight-bold text-primary">Temperature</p>
              <p class="text-primary">27C</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-weight-bold text-primary">Blood Pressure</p>
              <p class="text-primary">120/80</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-weight-bold text-primary">Height</p>
              <p class="text-primary">172 cm</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-weight-bold text-primary">Weight</p>
              <p class="text-primary">78 kgs</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-weight-bold text-primary">Pulse Rate</p>
              <p class="text-primary">60 bpm</p>
            </div>
            <div class="flex justify-between items-center q-px-md">
              <p class="text-weight-bold text-primary">Oxygen Saturation</p>
              <p class="text-primary">88%</p>
            </div>

            <q-separator class="separator-2" />

            <div>
              <ul>
                <li class="text-primary q-mb-sm">
                  Pregnancy Normal
                </li>
                <li class="text-primary q-mb-sm">
                  Patient is okay
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- New Checkup -->
        <div class="col q-mr-md fourth-col">
            <div class="new-checkup fit">
              <p class="bg-primary text-white text-weight-bol text-center nc-heading">
                New Checkup
              </p>
              <div class="new-checkup-field fit">
                <div class="text-center">
                  <q-btn
                  icon="add"
                  color="primary"
                  size="30px"
                  class="new-checkup-btn"
                  />
                  <p class="text-primary text-weight-bold q-mt-sm">
                    Add new checkup
                  </p>
                </div>
              </div>
            </div>
        </div>

      </div>
    </div>



  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  @import '../styles/scss/patients-profile/pr_prenatal.scss'
</style>
