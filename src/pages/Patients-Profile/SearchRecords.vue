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
      <h5 class="text-weight-bold text-dark">SEARCH HEALTH RECORDS</h5>
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
            class="mhc-select-200 search-select"
          />

          <q-btn
            class="q-mx-lg button-120"
            @click="showFilterModal = true"
            outline
            label="Filters"
            icon-right="eva-funnel-outline"
            no-caps
            color="primary"
          />

          <q-dialog v-model="showFilterModal">
            <q-card class="q-pa-md" style="overflow: hidden; width: 400px">
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

              <div>
                <label class="text-primary text-bold">Department</label>
                <q-select
                  v-model="selectedDepartment"
                  :options="departmentOptions"
                  outlined
                  dense
                  input-class="text-primary"
                  @update:model-value="searchRecords"
                />
              </div>

              <!-- Date Added -->
              <div class="q-mt-md">
                <label class="text-primary text-bold">Date Added</label>
                <div class="flex items-center justify-between">
                  <!-- From -->
                  <q-input
                    v-model="date_added[0]"
                    readonly
                    dense
                    outlined
                    label="From"
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
                          <q-date v-model="date_added[0]"
                            ><template> </template>
                            <q-btn
                              label="done"
                              dense
                              color="primary"
                              v-close-popup
                          /></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>

                  <div class="line"></div>

                  <!-- To -->
                  <q-input
                    v-model="date_added[1]"
                    readonly
                    dense
                    outlined
                    label="To"
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
                          <q-date
                            v-model="date_added[1]"
                            :options="(date) => date >= date_added[0]"
                            ><template> </template>
                            <q-btn
                              label="done"
                              dense
                              color="primary"
                              v-close-popup
                          /></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </q-card>
          </q-dialog>

          <!-- Search -->
          <q-btn
            color="primary"
            label="Search"
            no-caps
            icon-right="eva-search-outline"
            class="button-120"
            @click="searchRecords"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="q-my-xl table">
        <q-table
          dense
          :columns="columns"
          :rows="HealthRecords"
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
                label="View"
                icon-right="visibility"
                no-caps
                unelevated
                class="button-100 action-btn"
                @click="rowClick(props.row)"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-sex="props">
            <q-td :props="props">
              {{ sex[props.row.sex] }}
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script src="../script/Patients-Profile/SearchRecords"></script>

<style scoped lang="scss">
@import "../styles/patients-profile/search_patients.scss";

.q-dialog__inner--minimized > div {
  max-width: 100%;
}

.search-select .q-field__native {
  border-radius: 0px 10px 10px 0px !important;
}
</style>
