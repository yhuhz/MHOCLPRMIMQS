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
            class="mhc-select-200 q-mr-md"
          />

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
          <q-card class="q-pa-lg width-350">
            <p class="text-primary text-weight-bold text-center text-18">
              <q-icon name="eva-home q-gutter-xs" size="20px" class="q-mr-sm" />
              ADD HOUSEHOLD
            </p>
            <q-form @submit="addHousehold()">
              <div class="q-mt-lg">
                <label class="text-dark">Household Name</label>

                <q-input
                  v-model="addHouseholdName"
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
                    <q-item clickable class="drop-list">
                      <q-item-section>View Patients</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-eye-outline" />
                      </q-item-section>
                    </q-item>

                    <!-- Edit -->
                    <q-item
                      clickable
                      class="drop-list"
                      @click="
                        openDialogEdit(
                          props.row.household_name,
                          props.row.household_id
                        )
                      "
                    >
                      <q-item-section>Edit Details</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-edit-outline" />
                      </q-item-section>

                      <template>
                        <!-- Edit Household Modal -->
                        <q-dialog v-model="isEditHousehold" persistent>
                          <q-card class="q-pa-lg width-350">
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
                              <div class="q-mt-lg">
                                <label class="text-dark">Household Name</label>

                                <q-input
                                  v-model="editHouseholdName"
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
                dense
                label="Download"
                icon-right="eva-download-outline"
                no-caps
                color="primary"
                unelevated
                class="button-100 download-btn"
                :disable="downloadDisable"
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
