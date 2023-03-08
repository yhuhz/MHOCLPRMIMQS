<template>
  <div class="search-patients">
    <div class="flex items-center q-px-md q-pt-none">
      <q-btn
        round
        outline
        dense
        icon="west"
        class="q-mr-md"
        @click="$router.go(-1)"
      />
      <h5 class="text-weight-bold">PATIENT RECORDS</h5>
    </div>

    <div class="flex q-px-md">
      <q-input class="account-name-field" outlined dense square>
        <template v-slot:prepend>
          <q-icon name="mdi-account-search-outline" />
        </template>
      </q-input>

      <q-select
        class="q-mr-none search-by-btn"
        outlined
        dense
        square
        v-model="selectedSearchBy"
        options-dense
        :options="searchBy"
        label="Search By:"
        style="width: 180px; background-color: #c7e8aa"
      />

      <!-- FILTER MODAL -->
      <q-btn
        class="q-mx-md filter-btn"
        color="primary"
        outline
        label="Filters"
        icon-right="mdi-filter-menu-outline"
        no-caps
        @click="showFilterModal = true"
      >
        <q-dialog v-model="showFilterModal" square>
          <q-card class="q-px-md q-py-sm">
            <div class="row q-px-md q-pt-md">
              <!-- Age -->
              <div class="col">
                <p class="text-primary text-weight-bold">Age</p>
                <div class="flex items-center">
                  <div>
                    <q-input
                    outlined
                    dense
                    style="width: 60px"
                    class="q-mr-lg"
                    />
                    <p>From</p>
                  </div>

                  <div>
                    <q-input
                    outlined
                    dense
                    style="width: 60px"
                    />
                    <p>To</p>
                  </div>
                </div>
              </div>

              <!-- Sex -->
              <div class="col">
                <p class="text-primary text-weight-bold">Sex</p>
                <div v-for="(gender, index) in genderList" :key="index">
                  <q-checkbox
                    v-model="gender_array_model"
                    :val="genderList[index]"
                    :label="gender"
                  />
                </div>
              </div>

              <!-- Status -->
              <div class="col">
                <p class="text-primary text-weight-bold">Status</p>
                <div v-for="(status, index) in statusList" :key="index">
                  <q-checkbox
                    v-model="status_array_model"
                    :val="statusList[index]"
                    :label="status"
                  />
                </div>
              </div>
            </div>

            <!-- Date Added -->
            <div class="q-px-md">
              <p class="text-primary text-weight-bold">Date Added</p>
              <div class="flex">
                <div class="q-mr-lg" style="max-width: 150px">
                  <q-input outlined dense v-model="dateAdded.from">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" >
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="dateAdded.from">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" dense flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <p>From</p>
                </div>

                <div style="max-width: 150px">
                  <q-input outlined dense v-model="dateAdded.to" mask="date">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" >
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="dateAdded.to">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" dense flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <p>To</p>
                </div>
              </div>
            </div>

            <!-- Barangay List -->
            <p class="q-px-md q-mt-lg text-primary text-weight-bold">Barangay</p>
            <div class="q-px-md q-mt-md row">
              <div
                v-for="(brgy, index) in barangayList"
                :key="index"
                class="brgy col-4"
              >
                <q-checkbox
                  v-model="brgy_array_model"
                  :label="brgy"
                  :val="barangayList[index]"
                />
              </div>
            </div>
          </q-card>
        </q-dialog>
      </q-btn>

      <!-- Search Button -->
      <q-btn
        dense
        color="primary"
        label="Search"
        icon-right="search"
        no-caps
        style="width: 120px; margin-right: 10rem"
      />

      <q-btn
        class="add-new-patient-btn"
        icon="person_add_alt"
        outline
        :ripple="false"
        color="primary"
        no-caps
        label="Create New Patient Profile"
        @click="$router.push('add-new-patient-record')"
      />

      <!-- Table -->
      <div class="full-width q-mt-xl">
        <q-table
          :columns="columns"
          :rows="rows"
        >
        <template v-slot:body-cell-action>
          <q-td>
            <q-btn
              dense
              label="Action"
              no-caps
              icon-right="more_vert"
              color="primary"
              size="sm"
              padding="5px 12px"
              unelevated
            >
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-list bordered separator style="max-width: 120px">
                <!-- View -->
                <q-item dense clickable v-ripple to="patient-record-opd-view">
                  <q-item-section class="text-primary text-weight-bold">View</q-item-section>
                  <q-item-section avatar>
                    <q-icon color="primary" size="xs" name="visibility" />
                  </q-item-section>
                </q-item>
                <!-- Edit -->
                <q-item dense clickable v-ripple to="patient-record-opd-edit">
                  <q-item-section class="text-primary text-weight-bold">Edit</q-item-section>
                  <q-item-section avatar>
                    <q-icon color="primary" size="xs" name="mdi-account-edit-outline" />
                  </q-item-section>
                </q-item>
                <!-- Delete -->
                <q-item dense clickable v-ripple>
                  <q-item-section class="text-negative text-weight-bold">Delete</q-item-section>
                  <q-item-section avatar>
                    <q-icon color="negative" size="xs" name="mdi-trash-can-outline" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            </q-btn>
          </q-td>
        </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script src="../script/Patients-Profile/SearchPatients"></script>

<style lang="scss">
@import "../styles/scss/patients-profile/search_patients.scss";
</style>
