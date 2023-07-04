<template>
  <div class="medicine-inventory">
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
      <h5 class="text-dark text-weight-bold">SUPPLY INVENTORY</h5>
    </div>

    <div class="q-px-md">
      <div class="flex justify-between items-center">
        <div class="flex">
          <q-input
            outlined
            dense
            :input-style="{ color: '#525252' }"
            v-model="searchString"
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
              <q-card class="width-450 dialog-card q-pa-lg">
                <div class="flex justify-between q-px-sm">
                  <div>
                    <label class="text-primary text-weight-bold q-mb-sm">
                      In Stock
                    </label>
                    <div class="flex items-center">
                      <q-input
                        dense
                        outlined
                        hint="From"
                        class="q-mr-sm"
                        style="width: 5rem"
                        v-model="inStock[0]"
                      />

                      <q-input
                        dense
                        outlined
                        hint="To"
                        class="q-ml-sm"
                        style="width: 5rem"
                        v-model="inStock[1]"
                      />
                    </div>
                  </div>
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

                <!-- Manufacturing Date -->
                <div class="q-mt-lg">
                  <label class="text-primary text-weight-bold"
                    >Manufacturing Date</label
                  >
                  <div class="flex justify-between items-center q-mt-sm">
                    <!-- From -->
                    <q-input
                      dense
                      outlined
                      hint="From"
                      class="width-150"
                      v-model="mfgDate[0]"
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
                            <q-date v-model="mfgDate[0]" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>

                    <div class="line"></div>

                    <!-- TO -->
                    <q-input
                      dense
                      outlined
                      hint="To"
                      class="width-150"
                      v-model="mfgDate[1]"
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
                            <q-date v-model="mfgDate[1]" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>

                <!-- Expiry Date -->
                <div class="q-mt-lg">
                  <label class="text-primary text-weight-bold"
                    >Expiry Date</label
                  >
                  <div class="flex justify-between items-center q-mt-sm">
                    <!-- From -->
                    <q-input
                      dense
                      outlined
                      hint="From"
                      class="width-150"
                      v-model="expDate[0]"
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
                            <q-date v-model="expDate[0]" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>

                    <div class="line"></div>

                    <!-- TO -->
                    <q-input
                      dense
                      outlined
                      hint="To"
                      class="width-150"
                      v-model="expDate[1]"
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
                            <q-date v-model="expDate[1]" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>

                <!-- Date Added -->
                <div class="q-mt-lg">
                  <label class="text-primary text-weight-bold"
                    >Date Added</label
                  >
                  <div class="flex justify-between items-center q-mt-sm">
                    <!-- From -->
                    <q-input
                      dense
                      outlined
                      hint="From"
                      class="width-150"
                      v-model="dateAdded[0]"
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

                    <!-- TO -->
                    <q-input
                      dense
                      outlined
                      hint="To"
                      class="width-150"
                      v-model="dateAdded[1]"
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

                <!-- Done Button -->
                <div class="flex justify-center items-center q-mt-lg q-mb-md">
                  <q-btn
                    dense
                    color="primary"
                    label="Done"
                    no-caps
                    class="button-80"
                    @click="showFilterModal = !showFilterModal"
                  />
                </div>
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
            @click="getRecords"
          />
        </div>
      </div>

      <!-- Add New Supply Stock -->
      <div class="q-mt-lg">
        <q-btn
          v-if="
            keySession &&
            keySession.department === 4 &&
            keySession.permission_level !== 3
          "
          @click="isAddNewSupplyStock = true"
          outline
          label="Add New Supply Stock"
          icon-right="inventory"
          no-caps
          color="primary"
          class="q-mr-xs"
        />
        <q-btn
          v-if="
            keySession &&
            keySession.department === 4 &&
            keySession.permission_level !== 3
          "
          outline
          label="Release Supplies"
          icon-right="fa fa-boxes-packing"
          no-caps
          color="primary"
          class="q-ml-xs"
          @click="isSupplyRelease = !isSupplyRelease"
        />
      </div>

      <!-- Modals for Add New Supply Stock -->
      <q-dialog v-model="isAddNewSupplyStock" persistent>
        <q-card style="min-width: 750px">
          <div class="q-pa-lg">
            <div class="flex justify-end">
              <q-btn
                v-close-popup
                dense
                color="negative"
                size="0.375rem"
                icon="eva-close-outline"
              />
            </div>
            <p
              class="text-primary text-weight-bold text-24 text-center q-mb-xl"
            >
              <q-icon name="inventory" class="q-mr-xs q-gutter-xs" />
              ADD SUPPLY RECORD
            </p>
            <q-form @submit="addSupplyRecord" @reset="onReset">
              <!-- First Row -->
              <div class="row q-mb-md">
                <div class="col">
                  <label class="text-dark"
                    >Supply Name <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. Baygon Gloves"
                    class="q-mr-md q-mt-xs"
                    v-model="newSupplyRecord.supply_name"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>
                <div class="col">
                  <label class="text-dark"
                    >Supply Type <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. Glove"
                    class="q-mt-xs q-mr-md"
                    v-model="newSupplyRecord.supply_type"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>
              </div>

              <!-- Second Row -->
              <div class="row q-mt-lg q-mb-md">
                <div class="col">
                  <label class="text-dark"
                    >Manufacturing Date
                    <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="YYYY-MM-DD"
                    class="q-mt-xs q-mr-md"
                    v-model="newSupplyRecord.mfg_date"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
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
                            label="YYYY-MM-DD"
                            v-model="newSupplyRecord.mfg_date"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col">
                  <label class="text-dark">Expiry Date</label>
                  <q-input
                    dense
                    outlined
                    placeholder="YYYY-MM-DD"
                    class="q-mt-xs"
                    v-model="newSupplyRecord.exp_date"
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
                            label="YYYY-MM-DD"
                            v-model="newSupplyRecord.exp_date"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <!-- Third Row -->
              <div class="row q-mt-lg q-mb-md">
                <div class="col">
                  <label class="text-dark"
                    >Quantity Received
                    <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. 350"
                    class="q-mr-md q-mt-xs"
                    v-model="newSupplyRecord.quantity"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>

                <div class="col">
                  <label class="text-dark"
                    >Quantity Type <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. piece"
                    class="q-mr-md q-mt-xs"
                    v-model="newSupplyRecord.quantity_type"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>

                <div class="col">
                  <label class="text-dark"
                    >Source <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. DOH"
                    class="q-mt-xs"
                    v-model="newSupplyRecord.procured_by"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>
              </div>

              <!-- Button for Modals -->
              <div class="flex justify-center items-center q-mt-xl q-mb-lg">
                <!-- Submit -->
                <q-btn
                  color="primary"
                  label="Submit"
                  type="submit"
                  no-caps
                  class="button-120 q-mr-xl"
                />
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

      <!-- Supplies Release -->
      <q-dialog v-model="isSupplyRelease" persistent>
        <q-card style="min-width: 500px; max-width: 750px">
          <div class="q-pa-lg">
            <div class="flex justify-end">
              <q-btn
                v-close-popup
                dense
                color="negative"
                size="0.375rem"
                icon="eva-close-outline"
              />
            </div>
            <p
              class="text-primary text-weight-bold text-24 text-center q-mb-xl"
            >
              <q-icon name="fa fa-boxes-packing" class="q-mr-xs q-gutter-xs" />
              RELEASE SUPPLIES
            </p>

            <q-form @submit="addSupplyRelease">
              <div class="row q-mt-sm">
                <div class="col q-mr-md">
                  <label class="text-dark"
                    >Personnel ID <span class="text-negative">*</span></label
                  >

                  <q-select
                    outlined
                    hide-bottom-space
                    v-model="supplyReleaseDetails.user_id"
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
                    :rules="[
                      (val) =>
                        (val && (val.length > 0 || !isNaN(val))) ||
                        'Required field',
                    ]"
                    @update:model-value="findDepartment"
                  />
                </div>

                <div class="col-5">
                  <label class="text-dark"
                    >Department <span class="text-negative">*</span></label
                  >
                  <q-select
                    hide-bottom-space
                    disable
                    :options="filtersDepartment"
                    dense
                    outlined
                    v-model="supplyReleaseDetails.department"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>
              </div>

              <q-separator class="q-my-md" color="primary" />

              <div
                v-if="
                  supplyReleaseDetails.user_id &&
                  supplyReleaseDetails.department
                "
              >
                <div class="q-mb-md">
                  <q-btn
                    label="Add"
                    icon="add_circle"
                    color="primary"
                    outline
                    no-caps
                    @click="addSupply"
                  />
                </div>

                <div class="row">
                  <label class="col text-dark text-bold q-mr-md"
                    >Supply Name</label
                  >
                  <label class="col-2 text-dark text-bold q-mr-md"
                    >Quantity</label
                  >
                  <label
                    v-if="supplyReleaseDetails.supplies_array.length > 1"
                    class="col-1 text-dark"
                    style="visibility: hidden"
                    >Quantity</label
                  >
                </div>

                <div
                  v-for="(supply, index) in supplyReleaseDetails.supplies_array"
                  :key="index"
                >
                  <div class="row q-mb-sm">
                    <q-select
                      v-model="supply.supply_id"
                      dense
                      outlined
                      :options="supplyList"
                      @filter="supplyFilterFunction"
                      option-label="supply_name"
                      option-value="supply_id"
                      use-input
                      emit-value
                      map-options
                      new-value-mode="add-unique"
                      hide-bottom-space
                      class="col q-mr-md"
                      :rules="[(val) => val || '']"
                    />

                    <q-input
                      dense
                      outlined
                      class="col-2 q-mr-md"
                      input-class="text-dark"
                      v-model="supply.quantity"
                      hide-bottom-space
                      :rules="[(val) => (val && !isNaN(val)) || '']"
                    />

                    <q-icon
                      v-if="supplyReleaseDetails.supplies_array.length > 1"
                      name="delete"
                      color="negative"
                      class="col-1 cursor-pointer"
                      size="30px"
                      @click="removeSupply(index)"
                    />
                  </div>
                </div>
                <div>
                  <q-btn label="Submit" type="submit" no-caps color="primary" />
                </div>
              </div>
            </q-form>
          </div>
        </q-card>
      </q-dialog>

      <!-- Table -->
      <div class="q-my-md table">
        <q-table
          :columns="columns"
          :rows="SuppliesList"
          :pagination="{ rowsPerPage: 10 }"
          :rows-per-page-options="[5, 10, 15, 20, 0]"
          flat
          dense
          class="mhc-table"
        >
          <!-- In Stock -->
          <template #body-cell-in_stock="props">
            <q-td
              :props="props"
              :style="
                props.row.quantity - props.row.quantity_released <= 100
                  ? 'color: red'
                  : ''
              "
            >
              {{ props.row.quantity - props.row.quantity_released }}
            </q-td>
          </template>

          <!-- Exp Date -->
          <template #body-cell-exp_date="props">
            <q-td :props="props" :class="getExpDateClass(props.row)">
              {{ props.row.exp_date }}
            </q-td>
          </template>

          <!-- Table Row Slots -->
          <template #body-cell-action="props">
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
                          name: 'supply-inventory-details',
                          params: { supply_id: props.row.supply_id },
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
                      v-if="keySession && keySession.permission_level !== 3"
                      clickable
                      class="drop-list"
                      @click="editRecordModal(props.row)"
                    >
                      <q-item-section>Edit Details</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-edit-outline" />
                      </q-item-section>
                    </q-item>

                    <!-- Delete -->
                    <q-item
                      v-if="keySession && keySession.permission_level !== 3"
                      clickable
                      class="drop-list-delete"
                      @click="openDialog(props.row.supply_id)"
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
                class="button-100 download-btn"
                :disable="SuppliesList && SuppliesList[0] ? false : true"
                @click="exportTable"
              />
            </q-th>
          </template>
        </q-table>
      </div>

      <!-- Modal for Editing Medicine Record -->
      <q-dialog v-model="isEditSupplyStock" persistent>
        <q-card style="min-width: 750px">
          <div class="q-pa-lg">
            <div class="flex justify-end">
              <q-btn
                v-close-popup
                dense
                color="negative"
                size="0.375rem"
                icon="eva-close-outline"
              />
            </div>
            <p
              class="text-primary text-weight-bold text-24 text-center q-mb-xl"
            >
              <q-icon name="bi-capsule-pill" class="q-mr-xs q-gutter-xs" />
              EDIT MEDICINE RECORD
            </p>
            <q-form @submit="editSupply">
              <!-- First Row -->
              <div class="row q-mb-md">
                <div class="col">
                  <label class="text-dark"
                    >Supply ID <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    disable
                    class="q-mr-md q-mt-xs bg-grey-4"
                    v-model="editSupplyRecord.supply_id"
                  />
                </div>
                <div class="col">
                  <label class="text-dark"
                    >Supply Name <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. Baygon Gloves"
                    class="q-mr-md q-mt-xs"
                    v-model="editSupplyRecord.supply_name"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>
                <div class="col">
                  <label class="text-dark"
                    >Supply Type <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. Glove"
                    class="q-mt-xs q-mr-md"
                    v-model="editSupplyRecord.supply_type"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>
              </div>

              <!-- Second Row -->
              <div class="row q-mt-lg q-mb-md">
                <div class="col">
                  <label class="text-dark"
                    >Manufacturing Date
                    <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="YYYY-MM-DD"
                    class="q-mt-xs q-mr-md"
                    v-model="editSupplyRecord.mfg_date"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
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
                            label="YYYY-MM-DD"
                            v-model="editSupplyRecord.mfg_date"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col">
                  <label class="text-dark">Expiry Date</label>
                  <q-input
                    dense
                    outlined
                    placeholder="YYYY-MM-DD"
                    class="q-mt-xs"
                    v-model="editSupplyRecord.exp_date"
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
                            label="YYYY-MM-DD"
                            v-model="editSupplyRecord.exp_date"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <!-- Third Row -->
              <div class="row q-mt-lg q-mb-md">
                <div class="col">
                  <label class="text-dark"
                    >Quantity Received
                    <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. 350"
                    class="q-mr-md q-mt-xs"
                    v-model="editSupplyRecord.quantity"
                    :rules="[(val) => !isNaN(val) || 'Required field']"
                  />
                </div>

                <div class="col">
                  <label class="text-dark"
                    >Quantity Type <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. piece"
                    class="q-mr-md q-mt-xs"
                    v-model="editSupplyRecord.quantity_type"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>

                <div class="col">
                  <label class="text-dark"
                    >Source <span class="text-negative">*</span></label
                  >
                  <q-input
                    dense
                    outlined
                    placeholder="ex. DOH"
                    class="q-mt-xs"
                    v-model="editSupplyRecord.procured_by"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>
              </div>

              <!-- Button for Modals -->
              <div class="flex justify-center items-center q-mt-xl q-mb-lg">
                <!-- Submit -->
                <q-btn
                  color="primary"
                  label="Submit"
                  type="submit"
                  no-caps
                  class="button-120 q-mr-xl"
                />
              </div>
            </q-form>
          </div>
        </q-card>
      </q-dialog>
    </div>

    <MHCDialog :content="$options.components.DeleteSupplyConfirmation" />
  </div>
</template>

<script src="../script/Meds&Supplies/SupplyInventory"></script>

<style scoped lang="scss">
@import "../styles/meds&supplies/medicine_inventory.scss";
</style>
