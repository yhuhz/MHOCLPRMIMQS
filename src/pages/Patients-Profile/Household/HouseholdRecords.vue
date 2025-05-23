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
      <h5 class="text-weight-bold text-dark">HOUSEHOLD RECORDS</h5>
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
              <q-card class="q-pa-md width-700">
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
                <div class="flex justify-between">
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
            @click="getHouseholds"
          />
        </div>

        <!-- Add Household -->
        <div class="flex justify-end negative-margin-38">
          <q-btn
            v-if="
              keySession &&
              (keySession.department === 5 ||
                (keySession.department === 6 &&
                  keySession.permission_level === 1)) &&
              keySession.permission_level !== 3
            "
            @click="isAddHousehold = true"
            outline
            label="Add Household"
            icon-right="eva-home-outline"
            no-caps
            color="primary"
          />
        </div>

        <!-- Add Household Modal -->
        <q-dialog v-model="isAddHousehold" persistent>
          <q-card class="q-pa-lg" style="width: 500px">
            <p class="text-primary text-weight-bold text-center text-18">
              <q-icon name="eva-home q-gutter-xs" size="20px" class="q-mr-sm" />
              ADD HOUSEHOLD
            </p>
            <q-form @submit="addHousehold()">
              <div class="row q-mt-lg">
                <div class="col q-mr-sm">
                  <label class="text-dark"
                    >Household Name <span class="text-negative">*</span></label
                  >

                  <q-input
                    v-model="householdInfo.household_name"
                    dense
                    outlined
                    :input-style="{ color: '#525252' }"
                    placeholder="eg. Perez"
                    class="q-mt-sm"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>

                <div class="col q-ml-sm">
                  <label class="text-dark"
                    >Head of Household
                    <span class="text-negative">*</span></label
                  >

                  <q-input
                    v-model="householdInfo.household_head"
                    dense
                    outlined
                    :input-style="{ color: '#525252' }"
                    placeholder="eg. Jose Perez"
                    class="q-mt-sm"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>
              </div>

              <div class="row q-mt-lg">
                <label class="text-grey-7 text-caption text-center q-mb-md"
                  >If the Province / Municipality / Barangay is not on the list,
                  please input the location and press enter</label
                >
                <div class="col q-mr-sm">
                  <label class="text-dark"
                    >Province <span class="text-negative">*</span></label
                  >

                  <q-select
                    v-model="householdInfo.province"
                    dense
                    outlined
                    :options="provinceList"
                    use-input
                    new-value-mode="add-unique"
                    class="q-mt-sm"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                    @update:model-value="changeProvince"
                  />
                </div>

                <div class="col q-ml-sm">
                  <label class="text-dark"
                    >City / Municipality
                    <span class="text-negative">*</span></label
                  >

                  <q-select
                    v-model="householdInfo.municipality"
                    dense
                    outlined
                    :options="
                      householdInfo.province === 'Albay'
                        ? municipalityList
                        : null
                    "
                    :use-input="
                      householdInfo.province === 'Albay' ? false : true
                    "
                    new-value-mode="add-unique"
                    class="q-mt-sm"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                    @update:model-value="changeMunicipality"
                  />
                </div>
              </div>

              <div class="row q-mt-md">
                <div class="col q-mr-sm">
                  <label class="text-dark"
                    >Barangay <span class="text-negative">*</span></label
                  >

                  <q-select
                    v-if="householdInfo.municipality === 'Camalig'"
                    v-model="householdInfo.barangay"
                    dense
                    outlined
                    :options="brgyOptions"
                    @filter="brgyFilter"
                    use-input
                    new-value-mode="add-unique"
                    class="q-mt-sm"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />

                  <q-input
                    v-else
                    v-model="householdInfo.barangay"
                    dense
                    outlined
                    class="q-mt-sm"
                    :rules="[
                      (val) => (val && val.length > 0) || 'Required field',
                    ]"
                  />
                </div>

                <div class="col q-ml-sm">
                  <label class="text-dark"
                    >House No., Apartment No., Street</label
                  >

                  <q-input
                    v-model="householdInfo.address_line"
                    dense
                    outlined
                    class="q-mt-sm"
                  />
                </div>
              </div>

              <div class="flex justify-between items-center q-mt-lg">
                <q-btn
                  color="primary"
                  type="submit"
                  label="Submit"
                  no-caps
                  class="button-120"
                />
                <q-btn
                  v-close-popup
                  outline
                  color="primary"
                  label="Cancel"
                  no-caps
                  class="button-120"
                />
              </div>
            </q-form>
          </q-card>
        </q-dialog>
      </div>

      <!-- Table -->
      <div class="q-my-xl table">
        <q-table
          :columns="columns"
          :rows="HouseholdsList"
          :pagination="{ rowsPerPage: 10 }"
          :rows-per-page-options="[5, 10, 15, 20, 0]"
          dense
          flat
          class="mhc-table"
        >
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
                          name: 'search-patients',
                          params: { household_id: props.row.household_id },
                        })
                      "
                    >
                      <q-item-section>View Patients</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-eye-outline" />
                      </q-item-section>
                    </q-item>

                    <!-- Edit -->
                    <q-item
                      v-if="
                        keySession &&
                        (keySession.department === 6 ||
                          keySession.department === 5)
                      "
                      clickable
                      class="drop-list"
                      @click="openDialogEdit(props.row)"
                    >
                      <q-item-section>Edit Details</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-edit-outline" />
                      </q-item-section>

                      <template>
                        <!-- Edit Household Modal -->
                        <q-dialog v-model="isEditHousehold" persistent>
                          <q-card class="q-pa-lg" style="width: 500px">
                            <p
                              class="text-primary text-weight-bold text-center text-18"
                            >
                              <q-icon
                                name="eva-home q-gutter-xs"
                                size="20px"
                                class="q-mr-sm"
                              />
                              EDIT HOUSEHOLD
                            </p>
                            <q-form @submit="editHousehold()">
                              <div class="row q-mt-lg">
                                <div class="col q-mr-sm">
                                  <label class="text-dark"
                                    >Household Name
                                    <span class="text-negative">*</span></label
                                  >

                                  <q-input
                                    v-model="householdInfo.household_name"
                                    dense
                                    outlined
                                    :input-style="{ color: '#525252' }"
                                    placeholder="eg. Perez"
                                    class="q-mt-sm"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                  />
                                </div>

                                <div class="col q-ml-sm">
                                  <label class="text-dark"
                                    >Head of Household
                                    <span class="text-negative">*</span></label
                                  >

                                  <q-input
                                    v-model="householdInfo.household_head"
                                    dense
                                    outlined
                                    :input-style="{ color: '#525252' }"
                                    placeholder="eg. Jose Perez"
                                    class="q-mt-sm"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                  />
                                </div>
                              </div>

                              <div class="row q-mt-lg">
                                <label
                                  class="text-grey-7 text-caption text-center q-mb-md"
                                  >If the Province / Municipality / Barangay is
                                  not on the list, please input the location and
                                  press enter</label
                                >
                                <div class="col q-mr-sm">
                                  <label class="text-dark"
                                    >Province
                                    <span class="text-negative">*</span></label
                                  >

                                  <q-select
                                    v-model="householdInfo.province"
                                    dense
                                    outlined
                                    :options="provinceList"
                                    use-input
                                    new-value-mode="add-unique"
                                    class="q-mt-sm"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    @update:model-value="changeProvince"
                                  />
                                </div>

                                <div class="col q-ml-sm">
                                  <label class="text-dark"
                                    >City / Municipality
                                    <span class="text-negative">*</span></label
                                  >

                                  <q-select
                                    v-model="householdInfo.municipality"
                                    dense
                                    outlined
                                    :options="
                                      householdInfo.province === 'Albay'
                                        ? municipalityList
                                        : null
                                    "
                                    :use-input="
                                      householdInfo.province === 'Albay'
                                        ? false
                                        : true
                                    "
                                    new-value-mode="add-unique"
                                    class="q-mt-sm"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                    @update:model-value="changeMunicipality"
                                  />
                                </div>
                              </div>

                              <div class="row q-mt-md">
                                <div class="col q-mr-sm">
                                  <label class="text-dark"
                                    >Barangay
                                    <span class="text-negative">*</span></label
                                  >

                                  <q-select
                                    v-if="
                                      householdInfo.municipality === 'Camalig'
                                    "
                                    v-model="householdInfo.barangay"
                                    dense
                                    outlined
                                    :options="brgyOptions"
                                    @filter="brgyFilter"
                                    use-input
                                    new-value-mode="add-unique"
                                    class="q-mt-sm"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                  />

                                  <q-input
                                    v-else
                                    v-model="householdInfo.barangay"
                                    dense
                                    outlined
                                    class="q-mt-sm"
                                    :rules="[
                                      (val) =>
                                        (val && val.length > 0) ||
                                        'Required field',
                                    ]"
                                  />
                                </div>

                                <div class="col q-ml-sm">
                                  <label class="text-dark"
                                    >House No., Apartment No., Street</label
                                  >

                                  <q-input
                                    v-model="householdInfo.address_line"
                                    dense
                                    outlined
                                    class="q-mt-sm"
                                  />
                                </div>
                              </div>

                              <div
                                class="flex justify-between items-center q-mt-lg"
                              >
                                <q-btn
                                  color="primary"
                                  type="submit"
                                  label="Submit"
                                  no-caps
                                  class="button-120"
                                />
                                <q-btn
                                  v-close-popup
                                  outline
                                  color="primary"
                                  label="Cancel"
                                  no-caps
                                  class="button-120"
                                />
                              </div>
                            </q-form>
                          </q-card>
                        </q-dialog>
                      </template>
                    </q-item>

                    <!-- Delete -->
                    <q-item
                      v-if="
                        keySession &&
                        (keySession.department === 6 ||
                          keySession.department === 5)
                      "
                      clickable
                      class="drop-list-delete"
                      @click="deleteRecord(props.row.household_id)"
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
                v-if="keySession && keySession.department === 6"
                dense
                label="Download"
                icon-right="eva-download-outline"
                no-caps
                color="primary"
                unelevated
                class="button-100 download-btn"
                :disable="HouseholdsList && HouseholdsList[0] ? false : true"
                @click="exportTable"
              />
            </q-th>
          </template>
        </q-table>
      </div>
    </div>

    <MHCDialog :content="$options.components.DeleteHouseholdConfirmation" />
  </div>
</template>

<script src="../../script/Patients-Profile/Household/HouseholdRecords"></script>

<style scoped lang="scss">
@import "../../styles/patients-profile/search_patients.scss";
</style>
