<template>
  <div class="search-patients">
    <div class="flex items-center q-px-md q-pt-none">
      <q-btn
        round
        outline
        dense
        color="dark"
        icon="eva-arrow-back-outline"
        class="q-mr-md"
        @click="$router.go(-1)"
      />
      <h5 class="text-weight-bold text-dark">PREGNANT WOMEN</h5>
    </div>

    <div class="q-px-md">
      <div class="flex justify-between items-center">
        <div class="flex">
          <!-- Search By -->
          <q-input
            v-model="searchValue"
            outlined
            dense
            :input-style="{ color: '#525252' }"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-account-search-outline" />
            </template>
          </q-input>

          <q-select
            v-model="selectedSearchBy"
            :options="searchBy"
            outlined
            dense
            label="Search By:"
            class="mhc-select-200"
          />

          <!-- Filters -->
          <q-btn
            outline
            label="Filters"
            no-caps
            icon-right="eva-funnel-outline"
            color="primary"
            class="q-mx-md button-120"
            @click="showFilterModal = true"
          >
            <!-- Filters Modal -->
            <q-dialog v-model="showFilterModal">
              <q-card class="q-pa-md width-700" style="overflow: hidden">
                <div class="flex items-center justify-between q-mb-md">
                  <label class="text-bold text-primary" style="font-size: 20px"
                    >FILTERS</label
                  >
                  <q-btn
                    label="Done"
                    class="bg-primary text-white q-px-md"
                    flat
                    dense
                    @click="showFilterModal = !showFilterModal"
                  />
                </div>

                <q-scroll-area style="height: 700px">
                  <div class="flex justify-start">
                    <!-- Age -->
                    <div>
                      <label class="text-primary text-weight-bold">Age</label>
                      <div class="flex justify-between q-mt-sm">
                        <q-input
                          v-model="age[0]"
                          dense
                          outlined
                          hint="From"
                          class="q-mr-lg"
                          style="width: 60px"
                        />

                        <div class="line"></div>

                        <q-input
                          v-model="age[1]"
                          dense
                          outlined
                          hint="To"
                          style="width: 60px"
                        />
                      </div>
                    </div>

                    <!-- Status -->
                    <!-- <div class="q-ml-lg">
                      <label class="text-primary text-weight-bold"
                        >Status
                      </label>
                      <div v-for="(status, index) in statusList" :key="index">
                        <q-checkbox
                          v-model="status_array_model"
                          :val="index"
                          :label="status"
                          class="text-dark"
                        />
                      </div>
                    </div> -->
                  </div>

                  <!-- Date Added -->
                  <div class="q-mt-xl date-added">
                    <label class="text-primary text-weight-bold"
                      >Date Added</label
                    >
                    <div class="flex q-mt-sm">
                      <!-- From -->
                      <q-input
                        v-model="dateAdded[0]"
                        dense
                        outlined
                        hint="From"
                        class="width-150"
                      >
                        <template v-slot:append>
                          <q-icon
                            name="eva-calendar-outline"
                            class="cursor-pointer"
                          >
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="dateAdded[0]" />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                      <div class="line"></div>

                      <!-- To -->
                      <q-input
                        v-model="dateAdded[1]"
                        dense
                        outlined
                        hint="To"
                        class="width-150"
                      >
                        <template v-slot:append>
                          <q-icon
                            name="eva-calendar-outline"
                            class="cursor-pointer"
                          >
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="dateAdded[1]" />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>

                  <!-- Barangays -->
                  <div class="q-mt-xl">
                    <label class="text-primary text-weight-bold"
                      >Barangay</label
                    >
                    <div>
                      <q-btn
                        dense
                        label="Select All"
                        class="q-mt-md q-px-md"
                        color="primary"
                        no-caps
                        @click="select_all_brgy"
                      />

                      <q-btn
                        dense
                        label="Select None"
                        class="q-mt-md q-ml-md q-px-md"
                        color="primary"
                        no-caps
                        @click="select_none_brgy"
                      />
                      <div class="brgy q-mt-sm">
                        <q-checkbox
                          v-model="outsideCamaligCheckbox"
                          label="Outside Camalig"
                          class="text-dark"
                          :disable="brgy_checkbox_disable"
                        />
                        <div v-for="(brgy, index) in barangayList" :key="index">
                          <q-checkbox
                            v-model="brgy_array_model"
                            :val="barangayList[index]"
                            :label="brgy"
                            class="text-dark"
                            :disable="brgy_checkbox_disable"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </q-scroll-area>

                <!-- Button -->
              </q-card>
            </q-dialog>
          </q-btn>

          <!-- Search -->
          <q-btn
            color="primary"
            label="Search"
            no-caps
            icon-right="eva-search-outline"
            class="button-120"
            @click="getPrenatal"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="q-my-xl table">
        <q-table
          :columns="columns"
          :rows="Prenatal"
          :pagination="{ rowsPerPage: 10 }"
          :rows-per-page-options="[5, 10, 15, 20, 0]"
          dense
          flat
          class="mhc-table"
        >
          <!-- Table Row Slots -->
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                dense
                color="primary"
                label="View"
                icon-right="visibility"
                no-caps
                unelevated
                class="button-100 action-btn"
                @click="
                  $router.push({
                    name: 'Prenatal/patient_records',
                    params: {
                      id: props.row.patient_id,
                      record_id: props.row.prenatal_id,
                      department: 'Prenatal',
                    },
                  })
                "
              />
            </q-td>
          </template>

          <!-- Table Header Slots -->
          <template #header-cell-action="props">
            <q-th :props="props">
              <q-btn
                v-if="keySession && keySession.department === 6"
                dense
                label="Download"
                icon-right="eva-download-outline"
                no-caps
                color="primary"
                unelevated
                class="button-100 download-btn"
                :disable="Prenatal && Prenatal[0] ? false : true"
                @click="exportTable"
              />
            </q-th>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script src="../../script/Patients-Profile/Pregnant-Women/PregnantWomen"></script>

<style scoped lang="scss">
@import "../../styles/patients-profile/search_patients.scss";
</style>
