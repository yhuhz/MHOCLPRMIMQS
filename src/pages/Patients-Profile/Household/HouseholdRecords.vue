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

    <div class="flex q-px-md">
      <q-input class="account-name-field" outlined dense>
        <template v-slot:prepend>
          <q-icon name="mdi-account-search-outline" />
        </template>
      </q-input>

      <q-select
        class="q-mr-none search-by-btn"
        outlined
        dense
        v-model="selectedSearchBy"
        options-dense
        :options="searchBy"
        label="Search By:"
        style="width: 180px; background-color: #c7e8aa"
      />

      <!-- FILTER MODAL -->
      <q-btn
        class="q-mx-md filter-btn"
        color="primary"
        outline
        label="Filters"
        icon-right="eva-funnel-outline"
        no-caps
        @click="showFilterModal = true"
      >
        <q-dialog v-model="showFilterModal" square>
          <q-card class="q-px-md q-py-sm">
            <div class="row q-px-md q-pt-md">
              <!-- Age -->
              <div class="col">
                <p class="text-primary text-weight-bold">Age</p>
                <div class="flex items-center">
                  <div>
                    <q-input
                    outlined
                    dense
                    style="width: 60px"
                    class="q-mr-lg"
                    />
                    <p class="text-dark">From</p>
                  </div>

                  <div>
                    <q-input
                    outlined
                    dense
                    style="width: 60px"
                    />
                    <p class="text-dark">To</p>
                  </div>
                </div>
              </div>

              <!-- Sex -->
              <div class="col">
                <p class="text-primary text-weight-bold">Sex</p>
                <div v-for="(gender, index) in genderList" :key="index">
                  <q-checkbox
                    v-model="gender_array_model"
                    :val="genderList[index]"
                    :label="gender"
                    class="text-dark"
                  />
                </div>
              </div>

              <!-- Status -->
              <div class="col">
                <p class="text-primary text-weight-bold">Status</p>
                <div v-for="(status, index) in statusList" :key="index">
                  <q-checkbox
                    v-model="status_array_model"
                    :val="statusList[index]"
                    :label="status"
                    class="text-dark"
                  />
                </div>
              </div>
            </div>

            <!-- Date Added -->
            <div class="q-px-md">
              <p class="text-primary text-weight-bold">Date Added</p>
              <div class="flex">
                <div class="q-mr-lg" style="max-width: 150px">
                  <q-input outlined dense v-model="dateAdded.from">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" >
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="dateAdded.from">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" dense flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <p class="text-dark">From</p>
                </div>

                <div style="max-width: 150px">
                  <q-input outlined dense v-model="dateAdded.to" mask="date">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer" >
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="dateAdded.to">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" dense flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <p class="text-dark">To</p>
                </div>
              </div>
            </div>

            <!-- Barangay List -->
            <p class="q-px-md q-mt-lg text-primary text-weight-bold">Barangay</p>
            <div class="q-px-md q-mt-md row">
              <div
                v-for="(brgy, index) in barangayList"
                :key="index"
                class="brgy col-4"
              >
                <q-checkbox
                  v-model="brgy_array_model"
                  :label="brgy"
                  :val="barangayList[index]"
                  class="text-dark"
                />
              </div>
            </div>
            <div class="flex justify-center items-center">
              <q-btn
              label="Done"
              no-caps
              color="primary"
              class="button-100 q-my-md"
              />
            </div>
          </q-card>
        </q-dialog>
      </q-btn>

      <!-- Search Button -->
      <q-btn
        dense
        color="primary"
        label="Search"
        icon-right="eva-search-outline"
        no-caps
        style="width: 120px; margin-right: 10rem"
      />

        <q-btn
          class="add-new-patient-btn"
          icon-right="eva-home-outline"
          outline
          :ripple="false"
          color="primary"
          no-caps
          label="Add Household"
          @click="isAddHousehold = true"
        />

      <!-- Add Household Modal -->
      <q-dialog v-model="isAddHousehold" persistent>
        <q-card bordered class="q-pa-lg dialog-card" style="width: 350px;">
          <p class="text-center text-primary text-weight-bold q-mb-lg">
            <q-icon name="eva-home-outline" class="q-mr-sm q-gutter-xs" />
            ADD HOUSEHOLD
          </p>
          <div>
            <label class="text-dark">Household Name</label>
            <q-input
            dense
            outlined
            placeholder="eg. Perez"
            class="q-mt-sm"
            />
          </div>
          <div class="flex justify-between q-mt-md">
            <q-btn
            dense
            color="primary"
            label="Submit"
            no-caps
            style="width: 120px"
            />
            <q-btn
            dense
            outline
            color="primary"
            label="Cancel"
            no-caps
            style="width: 120px"
            v-close-popup
            />
          </div>
        </q-card>
      </q-dialog>

      <!-- Table -->
      <div class="full-width q-mt-xl">
        <q-table
          :columns="columns"
          :rows="rows"
          flat
          :pagination="{rowsPerPage: 10}"
          :rows-per-page-options="[5, 10, 15, 0]"
          class="mhc-table"
        >
        <template v-slot:body-cell-action>
          <q-td>
            <q-btn
              dense
              label="Action"
              no-caps
              icon-right="more_vert"
              color="primary"
              size="sm"
              unelevated
              padding="6px 0"
              class="button-80"
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
                v-close-popup
                class="drop-list"
                >
                  <q-item-section>View Patient Details</q-item-section>
                  <q-item-section avatar>
                    <q-icon size="xs" name="eva-eye-outline" />
                  </q-item-section>
                </q-item>

                <!-- Edit -->
                <q-item
                clickable
                v-close-popup
                class="drop-list"
                >
                  <q-item-section>Edit Household</q-item-section>
                  <q-item-section avatar>
                    <q-icon size="xs" name="mdi-account-edit-outline" />
                  </q-item-section>
                </q-item>

                <!-- Delete -->
                <q-item
                clickable
                v-close-popup
                class="drop-list-delete"
                @click="openDialog()"
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

        <!-- Download -->
        <template #header-cell-action="props">
          <q-th :props="props">
          <q-btn
          color="primary"
          icon-right="eva-download-outline"
          label="Download"
          dense
          no-caps
          size="sm"
          padding="8px 0"
          class="button-80"
          />
          </q-th>
        </template>

        </q-table>
      </div>
    </div>
    <MHCDialog :content="$options.components.DeleteHouseholdConfirmation" />
  </div>
</template>

<script src="../../script/Patients-Profile/Household/HouseholdRecords">
</script>

<style scoped lang="scss">
  @import "../../styles/patients-profile/search_patients.scss";

  .drop-list {
    color: #5f8d4e;
  }
  .drop-list:hover {
    background-color: #5f8d4e;
    color: #fff;
  }
  .drop-list-delete {
    color: #D75555
  }
  .drop-list-delete:hover {
    background-color: #D75555;
    color: #fff
  }
</style>
