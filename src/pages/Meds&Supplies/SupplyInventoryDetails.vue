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
      <h5 class="text-dark text-weight-bold">SUPPLY DETAILS</h5>
    </div>

    <div class="row q-px-md q-mb-xl">
      <!-- Details -->
      <div class="col-3 medicine-details-col">
        <p class="text-primary text-center text-weight-bold text-24 q-mt-sm">
          <q-icon name="bi-capsule-pill" class="q-mr-xs" />
          DETAILS
        </p>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">SUPPLY ID:</p>
          <p class="text-primary">{{ supplyDetails.supply_id }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Supply Name:</p>
          <p class="text-primary">{{ supplyDetails.supply_name }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Supply Type:</p>
          <p class="text-primary">{{ supplyDetails.supply_type }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Manufacturing Date:</p>
          <p class="text-primary">{{ supplyDetails.mfg_date }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Expiration Date:</p>
          <p class="text-primary">{{ supplyDetails.exp_date }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Date Added:</p>
          <p class="text-primary">{{ supplyDetails.date_added }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Quantity Received:</p>
          <p class="text-primary">{{ supplyDetails.quantity }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Quantity Released:</p>
          <p class="text-primary">{{ supplyDetails.quantity_released }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Available In Stock:</p>
          <p class="text-primary">{{ supplyDetails.in_stock }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Quantity Type:</p>
          <p class="text-primary">{{ supplyDetails.quantity_type }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Procured By:</p>
          <p class="text-primary">{{ supplyDetails.procured_by }}</p>
        </div>
        <div class="flex justify-between q-px-md">
          <p class="text-dark">Status:</p>
          <p class="text-primary">{{ status_list[supplyDetails.status] }}</p>
        </div>
      </div>

      <div class="col q-px-md">
        <p class="text-primary text-center text-weight-bold text-24">
          SUPPLY RELEASE
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
                      <q-checkbox
                        v-model="select_all_dept"
                        label="Select All"
                        class="text-dark"
                        size="xs"
                        @update:model-value="select_all_dept_change"
                      />
                      <div
                        v-for="(department, index) in filtersDepartment"
                        :key="index"
                      >
                        <q-checkbox
                          v-model="selectedFiltersDepartment"
                          :val="index + 1"
                          :label="department"
                          size="xs"
                          class="text-dark"
                          :disable="dept_checkbox_disable"
                        />
                      </div>
                    </div>
                    <div class="column q-ml-xl">
                      <label class="text-primary text-weight-bold q-pt-md"
                        >Status</label
                      >
                      <div v-for="(status, index) in filterStatus" :key="index">
                        <q-checkbox
                          v-model="selectedFilterStatus"
                          :val="index"
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
                      <div class="flex items-center justify-start">
                        <q-input
                          dense
                          outlined
                          :input-style="{ color: '#525252' }"
                          hint="From"
                          class="q-mt-sm"
                          v-model="quantityReleased[0]"
                        />
                        <q-input
                          dense
                          outlined
                          :input-style="{ color: '#525252' }"
                          hint="To"
                          class="q-mt-sm"
                          v-model="quantityReleased[1]"
                        />
                      </div>
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
                          v-model="dateReleased[0]"
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
                                <q-date
                                  mask="YYYY-MM-DD"
                                  v-model="dateReleased[0]"
                                />
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
                          v-model="dateReleased[1]"
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
                                <q-date
                                  mask="YYYY-MM-DD"
                                  v-model="dateReleased[1]"
                                />
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
              @click="search"
            />
          </div>

          <!-- Add New Supply Release -->
          <!-- <q-btn
            v-if="keySession && keySession.permission_level !== 3"
            @click="isAddNewSupplyRelease = true"
            dense
            outline
            color="primary"
            label="Add New Supply Release"
            no-caps
            icon-right="bi-capsule-pill"
            padding="5px 12px"
          /> -->

          <!-- Supply Release Modal -->
          <q-dialog v-model="isAddNewSupplyRelease" persistent>
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
                  SUPPLY RELEASE
                </p>

                <q-form @submit="addReleaseRecord" @reset="onReset">
                  <div class="row q-mb-md q-px-lg">
                    <!-- ID -->
                    <div class="col q-mr-md">
                      <label class="text-dark"
                        >User ID <span class="text-negative">*</span></label
                      >

                      <q-select
                        outlined
                        hide-bottom-space
                        v-model="newSupplyRelease.user_id"
                        @filter="userFilterFunction"
                        option-label="user_name"
                        option-value="user_id"
                        :options="userOptions"
                        use-input
                        emit-value
                        map-options
                        dense
                        input-style="padding: 0"
                        input-class="text-right text-primary"
                        class="q-mt-sm"
                        :rules="[
                          (val) =>
                            (val && (val.length > 0 || !isNaN(val))) ||
                            'Required field',
                        ]"
                      />
                    </div>

                    <!-- Supply ID -->
                    <div class="col">
                      <label class="text-dark"
                        >Supply ID <span class="text-negative">*</span></label
                      >
                      <q-input
                        hide-bottom-space
                        dense
                        outlined
                        :input-style="{ color: '#525252' }"
                        class="q-mt-sm bg-grey-4"
                        disable
                        v-model="newSupplyRelease.supply_id"
                        :rules="[
                          (val) => (val && val.length > 0) || 'Required field',
                        ]"
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
                        hide-bottom-space
                        :options="filtersDepartment"
                        dense
                        outlined
                        class="q-mt-sm"
                        v-model="newSupplyRelease.department"
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            !isNaN(val) ||
                            'Required field',
                        ]"
                      />
                    </div>

                    <!-- Quantity -->
                    <div class="col">
                      <label class="text-dark"
                        >Quantity <span class="text-negative">*</span></label
                      >
                      <q-input
                        hide-bottom-space
                        dense
                        outlined
                        placeholder="ex. 3"
                        :input-style="{ color: '#525252' }"
                        class="q-mt-sm"
                        v-model="newSupplyRelease.quantity"
                        :rules="[
                          (val) => (val && val.length > 0) || 'Required field',
                        ]"
                      />
                    </div>
                  </div>

                  <!-- Button -->
                  <div class="flex justify-center items-center q-my-lg">
                    <!-- Submit -->
                    <q-btn
                      color="primary"
                      label="Submit"
                      type="submit"
                      no-caps
                      class="button-120 q-mr-lg"
                    />

                    <!-- Reset -->
                    <q-btn
                      outline
                      color="primary"
                      label="Reset"
                      type="reset"
                      no-caps
                      class="button-120"
                    />
                  </div>
                </q-form>
              </div>
            </q-card>
          </q-dialog>
        </div>

        <!-- Table -->
        <div class="q-mt-lg">
          <q-table
            :columns="columns"
            :rows="SupplyRelease"
            :pagination="{ rowsPerPage: 10 }"
            :rows-per-page-options="[5, 10, 15, 20, 0]"
            :loading="loading"
            flat
            dense
            class="mhc-table"
          >
            <!-- Table Row Slots -->
            <template #body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  v-if="keySession && keySession.permission_level !== 3"
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
                      <q-item
                        clickable
                        class="drop-list"
                        @click="openEditModal(props.row)"
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
                        @click="openDialog(props.row.supply_release_id)"
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
                  :disable="SupplyRelease && SupplyRelease[0] ? false : true"
                  @click="exportTable"
                />
              </q-th>
            </template>
          </q-table>
        </div>
      </div>
    </div>

    <!-- Supply Release Modal EDIT -->
    <q-dialog v-model="isEditSupplyRelease" persistent>
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
            EDIT SUPPLY RELEASE
          </p>

          <q-form @submit="editSupplyRelease" @reset="onReset">
            <div class="row q-mb-md q-px-lg">
              <!-- SUPPLY RELEASE ID -->
              <div class="col q-mr-md">
                <label class="text-dark"
                  >Supply Release ID <span class="text-negative">*</span></label
                >
                <q-input
                  hide-bottom-space
                  dense
                  outlined
                  :input-style="{ color: '#525252' }"
                  class="q-mt-sm bg-grey-4"
                  disable
                  v-model="editMedReleaseInfo.supply_release_id"
                  :rules="[(val) => !isNaN(val) || 'Required field']"
                />
              </div>
              <!-- ID -->
              <div class="col q-mr-md">
                <label class="text-dark"
                  >User ID <span class="text-negative">*</span></label
                >

                <q-select
                  outlined
                  hide-bottom-space
                  v-model="editMedReleaseInfo.user_id"
                  @filter="userFilterFunction"
                  option-label="user_name"
                  option-value="user_id"
                  :options="userOptions"
                  use-input
                  emit-value
                  map-options
                  dense
                  input-style="padding: 0"
                  input-class="text-right text-primary"
                  class="q-mt-sm"
                  :rules="[
                    (val) =>
                      (val && (val.length > 0 || !isNaN(val))) ||
                      'Required field',
                  ]"
                />
              </div>

              <!-- Supply ID -->
              <div class="col">
                <label class="text-dark"
                  >Supply ID <span class="text-negative">*</span></label
                >
                <q-input
                  hide-bottom-space
                  dense
                  outlined
                  :input-style="{ color: '#525252' }"
                  class="q-mt-sm bg-grey-4"
                  disable
                  v-model="editMedReleaseInfo.supply_id"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Required field',
                  ]"
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
                  hide-bottom-space
                  :options="filtersDepartment"
                  dense
                  outlined
                  class="q-mt-sm"
                  v-model="editMedReleaseInfo.department"
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      !isNaN(val) ||
                      'Required field',
                  ]"
                />
              </div>

              <!-- Quantity -->
              <div class="col">
                <label class="text-dark"
                  >Quantity <span class="text-negative">*</span></label
                >
                <q-input
                  hide-bottom-space
                  dense
                  outlined
                  placeholder="ex. 3"
                  :input-style="{ color: '#525252' }"
                  class="q-mt-sm"
                  v-model="editMedReleaseInfo.quantity"
                  :rules="[(val) => !isNaN(val) || 'Required field']"
                />
              </div>
            </div>

            <!-- Button -->
            <div class="flex justify-center items-center q-my-lg">
              <!-- Submit -->
              <q-btn
                color="primary"
                label="Submit"
                type="submit"
                no-caps
                class="button-120 q-mr-lg"
              />
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
    <MHCDialog :content="$options.components.DeleteSupplyConfirmation" />
  </div>
</template>

<script src="../script/Meds&Supplies/SupplyInventoryDetails"></script>

<style lang="scss" scoped>
@import "../styles/meds&supplies/medicine_inventory_details.scss";
</style>
