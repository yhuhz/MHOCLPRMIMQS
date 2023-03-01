<template>
  <div class="search-patients">
    <div class="flex items-center q-px-md q-pt-none">
      <q-btn
        round
        outline
        icon="west"
        class="q-mr-md"
        @click="$router.go(-1)"
      />
      <h5 class="text-weight-bold text-dark q-mr-lg">PATIENT RECORDS</h5>
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
            <div class="flex">
              <!-- AGE -->
              <div class="q-px-xl">
                <p>Age</p>
                <div class="flex">
                  <div>
                    <q-input
                      outlined
                      dense
                      hide-bottom-space
                      style="width: 40px"
                    />
                    <small>From</small>
                  </div>
                  <div class="q-ml-lg">
                    <q-input
                      outlined
                      dense
                      hide-bottom-space
                      style="width: 40px"
                    />
                    <small>To</small>
                  </div>
                </div>
              </div>

              <!-- SEX -->
              <div class="q-pr-xl">
                <p>Sex</p>
                <div>
                  <q-checkbox size="24px" label="Male" />
                </div>
                <div>
                  <q-checkbox size="24px" label="Female" />
                </div>
              </div>

              <!-- STATUS -->
              <div class="q-px-xl">
                <p>Status</p>
                <div>
                  <q-checkbox size="24px" label="Active" />
                </div>
                <div>
                  <q-checkbox size="24px" label="Deceased" />
                </div>
                <div>
                  <q-checkbox size="24px" label="Deleted" />
                </div>
              </div>
            </div>

            <p class="q-px-md q-mt-lg">Barangay</p>
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

      <q-btn
        dense
        color="primary"
        label="Search"
        icon-right="search"
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

      <div class="full-width">
        <Table />
      </div>
    </div>
  </div>
</template>

<script src="../script/SearchPatients/SearchPatients"></script>

<style lang="scss">
@import "../styles/scss/search-patients/search_patients.scss";
</style>
