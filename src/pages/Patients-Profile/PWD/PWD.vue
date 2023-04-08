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
      <h5 class="text-weight-bold text-dark">PWD RECORDS</h5>
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
            @click="getPWD"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="q-my-xl table">
        <q-table
          :columns="columns"
          :rows="PWD"
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
                label="View"
                icon-right="visibility"
                no-caps
                unelevated
                class="button-100 action-btn"
                @click="
                  $router.push({
                    name: 'patient-details',
                    params: {
                      id: props.row.patient_id,
                    },
                  })
                "
              >
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
  </div>
</template>

<script src="../../script/Patients-Profile/PWD/PWD"></script>

<style scoped lang="scss">
@import "../../styles/patients-profile/search_patients.scss";
</style>
