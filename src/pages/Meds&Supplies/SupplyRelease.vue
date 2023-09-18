<template>
  <div class="supply-inventory">
    <div class="flex justify-between items-center q-px-md q-pt-none">
      <div class="flex justify-start items-center">
        <q-btn
          round
          outline
          dense
          icon="eva-arrow-back-outline"
          color="dark"
          class="q-mr-md"
          @click="$router.go(-1)"
        />
        <h5 class="text-dark text-weight-bold">SUPPLY RELEASE</h5>
      </div>
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

    <div>
      <div class="row q-px-lg">
        <div
          class="col-4 q-pa-md q-mr-sm left-panel"
          :style="{ height: $q.screen.height - 180 + 'px' }"
        >
          <div>
            <q-select
              dense
              outlined
              input-class="text-primary text-bold"
              :options="pendingDateArray"
              v-model="selectedPendingDate"
              style="min-width: 100px"
              @update:model-value="changeDate"
            />
          </div>

          <q-separator color="primary" class="q-my-md" />

          <q-scroll-area
            v-if="pendingArray.length > 0"
            :style="{ height: $q.screen.height - 300 + 'px' }"
          >
            <div
              v-for="(prescription, index) in pendingArray"
              :key="index"
              class="row q-mb-sm"
            >
              <div
                class="q-px-md q-py-sm row cursor-pointer record-card"
                :style="
                  selectedIndex !== null && selectedIndex === index
                    ? 'background-color: #5f8d4e; color: white'
                    : 'background-color: white; color: #5f8d4e'
                "
                @click="selectPendingRecord(index)"
              >
                {{
                  prescription.first_name +
                  " " +
                  (prescription.middle_name
                    ? prescription.middle_name + " "
                    : " ") +
                  prescription.last_name +
                  " " +
                  (prescription.suffix ? prescription.suffix : "")
                }}
              </div>
            </div>
          </q-scroll-area>
        </div>

        <div class="right-panel col q-ml-sm q-px-xl q-py-lg">
          <div
            v-if="pendingArray.length > 0"
            style="justify-content: center; align-items: center"
          >
            <div class="text-center">
              <h4 class="q-my-none text-primary text-bold">
                {{
                  selectedRelease.first_name +
                  " " +
                  (selectedRelease.middle_name
                    ? selectedRelease.middle_name + " "
                    : " ") +
                  selectedRelease.last_name +
                  " " +
                  (selectedRelease.suffix ? selectedRelease.suffix : "")
                }}
              </h4>
              <label class="q-mt-md text-bold text-grey-7 text-h5">
                {{ departments[selectedRelease.department - 1] }}
              </label>
            </div>

            <q-scroll-area
              :style="{ height: $q.screen.height - 330 + 'px' }"
              class="q-mt-md"
            >
              <div class="q-mt-md">
                <h6
                  class="q-mt-md text-center q-my-none text-primary text-bold"
                >
                  Supply Release
                  <q-btn
                    v-if="keySession && keySession.department === 4"
                    outline
                    dense
                    no-caps
                    label="Add"
                    icon="add_circle"
                    color="primary"
                    class="q-px-md q-ml-md"
                    @click="addSupply"
                  />
                </h6>
                <div class="row">
                  <label class="col text-dark text-bold q-mr-md"
                    >Supply Name</label
                  >
                  <label class="col-1 text-dark text-bold q-mr-md"
                    >Quantity</label
                  >
                  <label
                    v-if="
                      keySession &&
                      keySession.department === 4 &&
                      keySession.permission_level !== 3 &&
                      selectedRelease.supplies.length > 1
                    "
                    class="col-1 text-dark"
                    style="visibility: hidden"
                    >Quantity</label
                  >
                </div>

                <q-form @submit="editSupplyRelease">
                  <div
                    v-for="(supply, index) in selectedRelease.supplies"
                    :key="index"
                    class="q-mt-md"
                  >
                    <div class="row q-mb-sm">
                      <q-select
                        :readonly="
                          keySession &&
                          (keySession.department !== 4 ||
                            keySession.permission_level === 3)
                        "
                        v-model="supply.supply_details"
                        dense
                        outlined
                        use-input
                        map-options
                        :options="supplyList"
                        @filter="supplyFilterFunction"
                        option-label="supply_name"
                        option-value="supply_id"
                        class="col q-mr-md"
                        hide-bottom-space
                        @update:model-value="buttonCondition"
                        :rules="[(val) => val || '']"
                        :label="supply.release_date ? supply.release_date : ''"
                      />

                      <q-input
                        :readonly="
                          keySession &&
                          (keySession.department !== 4 ||
                            keySession.permission_level === 3)
                        "
                        dense
                        outlined
                        class="col-1 q-mr-md"
                        input-class="text-dark"
                        v-model="supply.quantity"
                        hide-bottom-space
                        @update:model-value="buttonCondition"
                        :rules="[(val) => (val && !isNaN(val)) || '']"
                      />

                      <q-icon
                        v-if="
                          keySession &&
                          keySession.department === 4 &&
                          keySession.permission_level !== 3 &&
                          selectedRelease.supplies.length > 1
                        "
                        name="delete"
                        color="negative"
                        class="col-1 cursor-pointer"
                        size="30px"
                        @click="removeSupply(index)"
                      />
                    </div>
                  </div>

                  <div class="flex q-mt-md" style="justify-content: center">
                    <q-btn
                      v-if="
                        keySession &&
                        keySession.department === 4 &&
                        keySession.permission_level !== 3 &&
                        btnCondition
                      "
                      no-caps
                      color="primary"
                      type="submit"
                      label="Submit"
                      class="q-mr-xs"
                      style="width: 100px"
                    />
                  </div>
                </q-form>
              </div>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="isCustomDate" persistent>
      <q-card style="width: 500px">
        <div class="q-pa-lg">
          <div class="flex justify-end">
            <q-btn
              @click="closeCustomDate"
              dense
              color="negative"
              size="0.375rem"
              icon="eva-close-outline"
            />
          </div>
          <p class="text-primary text-weight-bold text-24 text-center q-mb-xl">
            <q-icon name="calendar_month" class="q-mr-xs q-gutter-xs" />
            SELECT CUSTOM DATES
          </p>

          <div class="flex justify-between items-center q-mt-sm">
            <!-- From -->
            <q-input
              dense
              outlined
              hint="From"
              class="width-150"
              v-model="dateArray[0]"
              readonly
            >
              <template v-slot:append>
                <q-icon name="eva-calendar-outline" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dateArray[0]"
                      mask="YYYY-MM-DD"
                      :options="(date) => date <= dateToday"
                      @update:model-value="changeCustomDate"
                    />
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
              v-model="dateArray[1]"
              readonly
            >
              <template
                v-slot:append
                v-if="
                  dateArray[0] && dateArray[0] !== null && dateArray[0] !== ''
                "
              >
                <q-icon name="eva-calendar-outline" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="dateArray[1]"
                      mask="YYYY-MM-DD"
                      :options="
                        (date) => date >= firstDate && date <= dateToday
                      "
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <q-btn
            v-if="dateArray[0] && dateArray[1]"
            label="Select Dates"
            color="primary"
            icon="done"
            style="width: 100%"
            class="q-mt-md"
            @click="getRecordsFromCustomDate"
          />
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
          <p class="text-primary text-weight-bold text-24 text-center q-mb-xl">
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
                supplyReleaseDetails.user_id && supplyReleaseDetails.department
              "
            >
              <div class="q-mb-md">
                <q-btn
                  label="Add"
                  icon="add_circle"
                  color="primary"
                  outline
                  no-caps
                  @click="addSupplyMass"
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
                    mask="######"
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
                    @click="removeSupplyMass(index)"
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
  </div>
</template>

<script src="../script/Meds&Supplies/SupplyRelease"></script>

<style scoped lang="scss">
@import "../styles/meds&supplies/medicine_inventory.scss";

.left-panel {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  width: 300px;
}

.record-card {
  border: 1px solid #5f8d4e;
  border-radius: 10px;
  width: 100%;
}

.right-panel {
  border: 2px solid #5f8d4e;
  border-radius: 5px;
  width: 100%;
}
</style>
