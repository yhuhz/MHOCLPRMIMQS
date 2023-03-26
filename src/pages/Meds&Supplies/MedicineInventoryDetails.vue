<template>
  <div class="medicine-inventory-details">
    <div class="flex items-center q-px-md">
      <q-btn
        round
        outline
        dense
        icon="eva-arrow-back-outline"
        color="dark"
        class="q-mr-md"
        @click="$router.go(-1)"
      />
      <h5 class="text-dark text-weight-bold">MEDICINE DETAILS</h5>
    </div>

    <div class="row q-px-md q-mb-xl">
      <!-- Details -->
      <div class="col-3 medicine-details-col">
        <p class="text-primary text-center text-weight-bold text-24 q-mt-sm">
          <q-icon name="bi-capsule-pill" class="q-mr-xs" />
          DETAILS
        </p>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Medicine ID:</p>
          <p class="text-primary">1</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Generic Name:</p>
          <p class="text-primary">Paracetamol</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Brand Name:</p>
          <p class="text-primary">Biogesic</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Classification:</p>
          <p class="text-primary">Analgesic</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Dosage Form:</p>
          <p class="text-primary">Tablet</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Dosage Strength:</p>
          <p class="text-primary">500mg</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">PTR Number:</p>
          <p class="text-primary">22-11-2101</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Batch/Lot Number:</p>
          <p class="text-primary">13-08-713</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Manufacturing Date:</p>
          <p class="text-primary">02/05/2023</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Expiration Date:</p>
          <p class="text-primary">02/05/2026</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Date Added:</p>
          <p class="text-primary">03/20/2023</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Quantity Received:</p>
          <p class="text-primary">500</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Quantity Released:</p>
          <p class="text-primary">200</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Available In Stock:</p>
          <p class="text-primary">300</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Procured By:</p>
          <p class="text-primary">DOH</p>
        </div>
      </div>

      <div class="col q-px-md">
        <p class="text-primary text-center text-weight-bold text-24">
          MEDICINE RELEASE
        </p>
        <div class="flex justify-between">
          <div>
            <!-- Filters -->
            <q-btn
              dense
              outline
              color="primary"
              label="Filters"
              icon-right="eva-funnel-outline"
              no-caps
              class="button-120 q-mr-lg"
            >
              <q-menu>
                <q-card class="q-pa-md dialog-card width-500">
                  <div class="flex justify-between">
                    <!-- Department -->
                    <div class="column">
                      <label class="text-primary text-weight-bold"
                        >Department</label
                      >
                      <div
                        v-for="(department, index) in filtersDepartment"
                        :key="index"
                      >
                        <q-checkbox
                          v-model="selectedFiltersDepartment"
                          :val="filtersDepartment[index]"
                          :label="department"
                          size="xs"
                          class="text-dark"
                        />
                      </div>
                    </div>
                    <div class="column q-ml-xl">
                      <!-- Released To -->
                      <label class="text-primary text-weight-bold"
                        >Released To</label
                      >
                      <div v-for="(release, index) in releaseTo" :key="index">
                        <q-checkbox
                          v-model="selectedReleaseTo"
                          :val="releaseTo[index]"
                          :label="release"
                          size="xs"
                          class="text-dark"
                        />
                      </div>

                      <label class="text-primary text-weight-bold q-pt-md"
                        >Status</label
                      >
                      <div v-for="(status, index) in filterStatus" :key="index">
                        <q-checkbox
                          v-model="selectedFilterStatus"
                          :val="filterStatus[index]"
                          :label="status"
                          size="xs"
                          class="text-dark"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row q-mt-md">
                    <div class="col-3">
                      <label class="text-weight-bold text-primary"
                        >Quantity</label
                      >
                      <q-input
                        dense
                        outlined
                        :input-style="{ color: '#525252' }"
                        class="q-mt-sm"
                      />
                    </div>

                    <div class="col q-ml-md">
                      <label class="text-weight-bold text-primary"
                        >Date Released</label
                      >
                      <div class="flex justify-between">
                        <!-- From -->
                        <q-input
                          dense
                          outlined
                          hint="From"
                          :input-style="{ color: '#525252' }"
                          class="q-mt-sm width-150"
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
                                <q-date />
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>

                        <div class="line"></div>

                        <!-- To -->
                        <q-input
                          dense
                          outlined
                          hint="To"
                          :input-style="{ color: '#525252' }"
                          class="q-mt-sm width-150"
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
                                <q-date />
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </div>
                </q-card>
              </q-menu>
            </q-btn>

            <!-- Search -->
            <q-btn
              dense
              color="primary"
              label="Search"
              icon-right="eva-search-outline"
              no-caps
              class="button-120"
            />
          </div>

          <!-- Add New Medicine Release -->
          <q-btn
            @click="isAddNewMedicineRelease = true"
            dense
            outline
            color="primary"
            label="Add New Medicine Release"
            no-caps
            icon-right="bi-capsule-pill"
            padding="5px 12px"
          />

          <!-- Medicine Release Modal -->
          <q-dialog v-model="isAddNewMedicineRelease" persistent>
            <q-card class="width-700">
              <div class="q-pa-md">
                <div class="flex justify-end">
                  <q-btn
                    v-close-popup
                    dense
                    color="negative"
                    size="0.375rem"
                    icon="eva-close-outline"
                  />
                </div>
                <p class="text-primary text-center text-weight-bold text-24">
                  MEDICINE RELEASE
                </p>

                <div class="q-my-md q-ml-md">
                  <q-radio
                    v-model="selectedReleaseCategory"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="patient"
                    label="Patient"
                    class="text-dark q-mr-md"
                  />
                  <q-radio
                    v-model="selectedReleaseCategory"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="others"
                    label="Doctor/Dentist/Midwife/Staff"
                    class="text-dark"
                  />
                </div>

                <div class="row q-mb-md q-px-lg">
                  <!-- ID -->
                  <div class="col q-mr-md">
                    <label class="text-dark"
                      >ID <span class="text-negative">*</span></label
                    >
                    <q-input
                      dense
                      outlined
                      placeholder="ex. 12A"
                      :input-style="{ color: '#525252' }"
                      class="q-mt-sm"
                    />
                  </div>

                  <!-- Medicine ID -->
                  <div class="col">
                    <label class="text-dark"
                      >Medine ID <span class="text-negative">*</span></label
                    >
                    <q-input
                      dense
                      outlined
                      :input-style="{ color: '#525252' }"
                      class="q-mt-sm"
                    />
                  </div>
                </div>

                <div class="row q-mb-md q-px-lg">
                  <!-- Department -->
                  <div class="col q-mr-md">
                    <label class="text-dark"
                      >Department <span class="text-negative">*</span></label
                    >
                    <q-select
                      :options="department"
                      dense
                      outlined
                      class="q-mt-sm"
                    />
                  </div>

                  <!-- Quantity -->
                  <div class="col">
                    <label class="text-dark"
                      >Quantity <span class="text-negative">*</span></label
                    >
                    <q-input
                      dense
                      outlined
                      placeholder="ex. 3"
                      :input-style="{ color: '#525252' }"
                      class="q-mt-sm"
                    />
                  </div>
                </div>

                <div class="row q-mb-md q-px-lg">
                  <!-- Released By -->
                  <div class="col q-mr-md">
                    <label class="text-dark"
                      >Released By <span class="text-negative">*</span></label
                    >
                    <q-select
                      dense
                      outlined
                      placeholder="ex. 12A"
                      class="q-mt-sm"
                    />
                  </div>

                  <!-- Date Released -->
                  <div class="col">
                    <label class="text-dark"
                      >Date Released <span class="text-negative">*</span></label
                    >
                    <q-input
                      dense
                      outlined
                      placeholder="YYYY-MM-DD"
                      :input-style="{ color: '#525252' }"
                      class="q-mt-sm"
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
                            <q-date />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>

                <!-- Button -->
                <div class="flex justify-center items-center q-my-lg">
                  <!-- Submit -->
                  <q-btn
                    color="primary"
                    label="Submit"
                    no-caps
                    class="button-120 q-mr-lg"
                  />

                  <!-- Reset -->
                  <q-btn
                    outline
                    color="primary"
                    label="Reset"
                    no-caps
                    class="button-120"
                  />
                </div>
              </div>
            </q-card>
          </q-dialog>
        </div>

        <!-- Table -->
        <div class="q-mt-lg">
          <q-table
            :columns="columns"
            :rows="rows"
            :pagination="{ rowsPerPage: 10 }"
            :rows-per-page-options="[5, 10, 15, 20, 0]"
            flat
            class="mhc-table"
          >
            <!-- Table Row Slots -->
            <template #body-cell-action>
              <q-td>
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
                      <!-- Edit -->
                      <q-item clickable class="drop-list">
                        <q-item-section>Edit Details</q-item-section>
                        <q-item-section avatar>
                          <q-icon size="xs" name="eva-edit-outline" />
                        </q-item-section>
                      </q-item>

                      <!-- Delete -->
                      <q-item clickable class="drop-list-delete">
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

            <!-- Slots for Table Header -->
            <template #header-cell-action="props">
              <q-th :props="props">
                <q-btn
                  dense
                  label="Download"
                  no-caps
                  icon-right="eva-download-outline"
                  color="primary"
                  class="button-100 download-btn"
                />
              </q-th>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../script/Meds&Supplies/MedicineInventoryDetails"></script>

<style lang="scss" scoped>
@import "../styles/meds&supplies/medicine_inventory_details.scss";
</style>
