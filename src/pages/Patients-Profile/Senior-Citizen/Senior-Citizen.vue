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
      <h5 class="text-weight-bold text-dark">SENIOR CITIZEN RECORDS</h5>
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
                    <label class="text-primary text-weight-bold"
                      >Barangay</label
                    >
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
            @click="getSC"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="q-my-xl table">
        <q-table
          :columns="columns"
          :rows="SC"
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
                label="Action"
                icon-right="more_vert"
                no-caps
                unelevated
                class="button-100 action-btn"
              >
                <q-menu
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  style="width: 250px"
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

                    <!-- Add To Queue -->
                    <q-item
                      v-if="
                        keySession &&
                        (keySession.department === 5 ||
                          keySession.department === 6)
                      "
                      clickable
                      class="drop-list"
                      @click="openQueueModal(props.row)"
                    >
                      <q-item-section>Add To Priority Queue</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="post_add" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
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
                :disable="SC && SC[0] ? false : true"
                @click="exportTable"
              />
            </q-th>
          </template>
        </q-table>

        <!-- Add Patient to Queue -->
        <q-dialog v-model="queueOpenModal" persistent>
          <q-card class="q-pa-md" style="width: 400px">
            <div class="flex" style="justify-content: center">
              <q-icon name="help_center" size="xl" color="primary" />
            </div>
            <p
              class="text-primary text-weight-bold text-24 text-center q-mb-lg"
            >
              Which department would you like to add this patient to?
            </p>

            <q-form @submit="addToQueue">
              <div
                class="q-mb-md flex items-center justify-between"
                style="justify-content: center"
              >
                <q-input
                  outlined
                  dense
                  class="q-mr-md"
                  v-model="queueNumber"
                  label="Number"
                  style="width: 150px"
                  hide-bottom-space
                  :rules="[(val) => (!isNaN(val) && val > 0) || '']"
                />
                <q-select
                  flat
                  outlined
                  dense
                  style="width: 200px"
                  :options="departmentArrayQueue"
                  v-model="departmentQueue"
                />
              </div>

              <div class="flex" style="justify-content: center">
                <q-btn
                  dense
                  class="q-px-md q-mr-md"
                  label="Cancel"
                  icon="cancel"
                  color="grey-7"
                  @click="queueOpenModal = !queueOpenModal"
                />
                <q-btn
                  dense
                  class="q-px-md"
                  label="Add to Queue"
                  type="submit"
                  icon="post_add"
                  color="primary"
                />
              </div>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script src="../../script/Patients-Profile/Senior-Citizen/Senior-Citizen"></script>

<style scoped lang="scss">
@import "../../styles/patients-profile/search_patients.scss";
</style>
