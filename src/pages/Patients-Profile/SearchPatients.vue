<template>
  <div class="search-patients">
    <div class="flex items-center q-px-md q-pt-none">
      <q-btn
        round
        outline
        dense
        icon="eva-arrow-back-outline"
        color="dark"
        class="q-mr-md"
        @click="$router.go(-1)"
      />
      <h5 class="text-weight-bold text-dark">PATIENT RECORDS</h5>
    </div>

    <div class="q-px-md">
      <div class="flex justify-between items-center">
        <div class="flex">
          <q-input
            v-model="searchString"
            outlined
            dense
            :input-style="{ color: '#525252' }"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-account-search-outline" />
            </template>
          </q-input>

          <!-- Search By -->
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
            class="q-mx-lg button-120"
            @click="showFilterModal = true"
          >
            <!-- Filters Modal -->
            <q-dialog v-model="showFilterModal">
              <q-card class="q-pa-md width-700">
                <div class="flex justify-between">
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

                  <!-- Sex -->
                  <div>
                    <label class="text-primary text-weight-bold">Sex</label>
                    <div v-for="(gender, index) in genderList" :key="index">
                      <q-checkbox
                        v-model="gender_array_model"
                        :val="index"
                        :label="gender"
                        class="text-dark"
                      />
                    </div>
                  </div>

                  <!-- Status -->
                  <div>
                    <label class="text-primary text-weight-bold">Status </label>
                    <div v-for="(status, index) in statusList" :key="index">
                      <q-checkbox
                        v-model="status_array_model"
                        :val="index"
                        :label="status"
                        class="text-dark"
                      />
                    </div>
                  </div>
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
                  <label class="text-primary text-weight-bold">Barangay</label>
                  <div>
                    <q-checkbox
                      v-model="select_all_brgy"
                      label="Select All"
                      class="text-dark"
                      @update:model-value="select_all_brgy_change()"
                    />
                    <div class="brgy q-mt-sm">
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
            @click="searchPatients"
          />
        </div>

        <!-- Create New Patient Profile -->
        <div
          class="flex justify-end"
          v-if="
            (keySession.department === 6 || keySession.department === 5) &&
            keySession.permission_level != 3
          "
        >
          <q-btn
            @click="$router.push('add-edit-patient-record')"
            outline
            label="Create New Patient Profile"
            icon-right="bi-person-add"
            no-caps
            color="primary"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="q-my-xl table">
        <q-table
          dense
          :columns="columns"
          :rows="PatientsList"
          :pagination="{ rowsPerPage: 10 }"
          :rows-per-page-options="[5, 10, 15, 20, 0]"
          flat
          class="mhc-table"
          :loading="loading"
          no-data-label="Please search first"
        >
          <!-- Table Row Slots -->
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                dense
                color="primary"
                label="Action"
                icon-right="more_vert"
                no-caps
                unelevated
                class="button-100 action-btn"
              >
                <q-menu
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  class="width-200"
                >
                  <q-list separator dense>
                    <!-- View -->
                    <q-item
                      clickable
                      class="drop-list"
                      @click="
                        $router.push({
                          name: 'patient-details',
                          params: { id: props.row.patient_id },
                        })
                      "
                    >
                      <q-item-section>View Details</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-eye-outline" />
                      </q-item-section>
                    </q-item>

                    <!-- Edit -->
                    <q-item
                      clickable
                      class="drop-list"
                      @click="
                        $router.push({
                          name: 'add-edit-patient-record',
                          query: {
                            id: props.row.patient_id,
                          },
                        })
                      "
                    >
                      <q-item-section>Edit Details</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-edit-outline" />
                      </q-item-section>
                    </q-item>

                    <!-- Delete -->
                    <q-item
                      clickable
                      class="drop-list-delete"
                      @click="deletePatientRecord(props.row.patient_id)"
                    >
                      <q-item-section>Delete Record</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-trash-2-outline" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-td>
          </template>

          <template v-slot:body-cell-sex="props">
            <q-td :props="props">
              {{ sex[props.row.sex] }}
            </q-td>
          </template>

          <!-- Table Header Slots -->
          <template #header-cell-action="props">
            <q-th :props="props">
              <q-btn
                dense
                label="Download"
                icon-right="eva-download-outline"
                no-caps
                color="primary"
                unelevated
                :disable="downloadDisable"
                class="button-100 download-btn"
                @click="exportTable()"
              />
            </q-th>
          </template>
        </q-table>
      </div>
    </div>

    <MHCDialog :content="$options.components.DeletePatientConfirmation" />
  </div>
</template>

<script src="../script/Patients-Profile/SearchPatients"></script>

<style scoped lang="scss">
@import "../styles/patients-profile/search_patients.scss";
</style>
