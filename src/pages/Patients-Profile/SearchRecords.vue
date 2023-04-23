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

          <q-select
            v-model="selectedDepartment"
            :options="departmentOptions"
            outlined
            dense
            label="Department"
            class="q-ml-lg"
            input-class="text-primary"
            style="width: 200px"
            @update:model-value="searchRecords"
          />

          <!-- Search -->
          <q-btn
            color="primary"
            label="Search"
            no-caps
            icon-right="eva-search-outline"
            class="button-120 q-ml-lg"
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

          <!-- Table Header Slots -->
          <!-- <template #header-cell-action="props">
            <q-th :props="props">
              <q-btn
                v-if="keySession && keySession.department === 6"
                dense
                label="Download"
                icon-right="eva-download-outline"
                no-caps
                color="primary"
                unelevated
                :disable="PatientsList && PatientsList[0] ? false : true"
                class="button-100 download-btn"
                @click="exportTable()"
              />
            </q-th>
          </template> -->
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
