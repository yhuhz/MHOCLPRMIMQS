<template>
  <div class="reports">
    <div class="flex items-center q-px-md">
      <q-btn
        round
        dense
        outline
        icon="eva-arrow-back-outline"
        color="dark"
        class="q-mr-md"
        @click="$router.go(-1)"
      />
      <h5 class="text-weight-bold text-dark">GENERATE REPORTS</h5>
    </div>

    <!-- Card -->
    <div class="q-mx-md q-mb-xl">
      <div class="row">
        <div class="col-3 column">
          <div class="patients-profile q-px-md q-py-sm">
            <p class="text-24 text-white text-weight-bold q-mb-xs">
              Patient Profiles
            </p>
            <div class="card-info">
              <p class="text-white">
                You can view and download summary of patient profiles. You can
                filter the search.
              </p>
              <q-img
                src="../../images/advice.png"
                style="width: 100px; height: 100px"
              />
            </div>
            <div class="flex justify-between q-mt-sm">
              <!-- <q-btn
                label="Filters"
                no-caps
                icon-right="eva-funnel-outline"
                class="bg-white button-120"
                style="color: #5f8d4e"
              /> -->
              <q-btn
                label="Generate"
                no-caps
                icon-right="eva-arrow-forward-outline"
                class="bg-white button-120"
                style="color: #5f8d4e"
                @click="generatePatientReport"
              />
            </div>
          </div>

          <div class="patients-profile q-px-md q-py-sm">
            <p class="text-24 text-white text-weight-bold q-mb-xs">
              Medicine Inventory
            </p>
            <div class="card-info flex items-center justify-between">
              <p class="text-white">
                You can view and download the list of medicines in the
                inventory.
              </p>

              <q-img
                src="../../images/medicine.png"
                style="width: 100px; height: 100px"
              />
            </div>
            <div class="flex justify-between q-mt-sm">
              <!-- <q-btn
                label="Filters"
                no-caps
                icon-right="eva-funnel-outline"
                class="bg-white button-120"
                style="color: #5f8d4e"
              /> -->
              <q-btn
                label="Generate"
                no-caps
                icon-right="eva-arrow-forward-outline"
                class="bg-white button-120"
                style="color: #5f8d4e"
                @click="generateMedicineReport"
              />
            </div>
          </div>

          <div class="patients-profile q-px-md q-py-sm">
            <p class="text-24 text-white text-weight-bold q-mb-xs">
              Supplies Inventory
            </p>
            <div class="card-info">
              <p class="text-white">
                You can view and download the list of supplies in the inventory.
              </p>
              <q-img
                src="../../images/medical.png"
                style="width: 100px; height: 100px"
              />
            </div>
            <div class="flex justify-between q-mt-sm">
              <!-- <q-btn
                label="Filters"
                no-caps
                icon-right="eva-funnel-outline"
                class="bg-white button-120"
                style="color: #5f8d4e"
              /> -->
              <q-btn
                label="Generate"
                no-caps
                icon-right="eva-arrow-forward-outline"
                class="bg-white button-120"
                style="color: #5f8d4e"
                @click="generateSupplyReport"
              />
            </div>
          </div>
        </div>

        <div class="col report-area q-ml-md q-pa-md">
          <div class="q-mr-md" style="width: 320px">
            <q-select
              class="q-mb-sm"
              outlined
              dense
              hint="Select the date"
              v-model="selected"
              :options="options"
              @update:model-value="onChangeDate"
            />

            <!-- Custom Dates -->
            <div v-if="isCustomDate">
              <div class="flex items-center justify-between">
                <!-- From -->
                <q-input
                  dense
                  outlined
                  hint="From"
                  class="width-150"
                  v-model="customDate[0]"
                >
                  <template v-slot:append>
                    <q-icon name="eva-calendar-outline" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="customDate[0]">
                          <div class="row justify-end items-center">
                            <q-btn
                              v-close-popup
                              color="primary"
                              label="Close"
                              dense
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <!-- TO -->
                <q-input
                  dense
                  outlined
                  hint="To"
                  class="width-150 q-ml-md"
                  v-model="customDate[1]"
                >
                  <template v-slot:append>
                    <q-icon name="eva-calendar-outline" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="customDate[1]">
                          <div class="row justify-end items-center">
                            <q-btn
                              v-close-popup
                              color="primary"
                              label="Close"
                              dense
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <div v-if="isPatientReport">
            <!-- <q-btn
              label="Download"
              icon="download"
              class="float-right"
              color="primary"
            /> -->
            <div class="container q-mt-lg">
              <div class="flex justify-center items-center">
                <div class="report-title text-center">
                  <p class="text-weight-bold text report">Patient Reports</p>
                  <p class="report-from">
                    From {{ dateToShow[0] }} to
                    {{ dateToShow[1] }}
                  </p>
                  <q-separator color="primary" size="2px" />
                </div>
              </div>
              <div class="q-mt-lg">
                <div class="flex items-center justify-between q-mb-sm">
                  <label class="record-label q-mr-xl"
                    >Household Records:
                  </label>
                  <label>{{ patientReport.household }}</label>
                </div>

                <div class="flex items-center justify-between q-mb-sm">
                  <label class="record-label q-mr-xl">PWD Records: </label>
                  <label>{{ patientReport.pwd }}</label>
                </div>

                <div class="flex items-center justify-between q-mb-sm">
                  <label class="record-label q-mr-xl"
                    >Senior Citizen Records:
                  </label>
                  <label>{{ patientReport.sc }}</label>
                </div>

                <div class="flex items-center justify-between q-mb-sm">
                  <label class="record-label q-mr-xl"
                    >Pregnancy Records:
                  </label>
                  <label>{{ patientReport.prenatal }}</label>
                </div>

                <div class="flex items-center justify-between q-mb-lg">
                  <label class="record-label q-mr-xl">New Patients: </label>
                  <label>{{ patientReport.patients }}</label>
                </div>

                <div class="flex items-center justify-between q-mb-sm">
                  <label class="record-label q-mr-xl">OPD Records: </label>
                  <label>{{ patientReport.opd }}</label>
                </div>

                <div class="flex items-center justify-between q-mb-sm">
                  <label class="record-label q-mr-xl">Dental Records: </label>
                  <label>{{ patientReport.dental }}</label>
                </div>

                <div class="flex items-center justify-between q-mb-sm">
                  <label class="record-label q-mr-xl"
                    >Prenatal Checkups:
                  </label>
                  <label>{{ patientReport.prenatal_checkup }}</label>
                </div>

                <div class="flex items-center justify-between">
                  <label class="record-label q-mr-xl"
                    >Immunization Records:
                  </label>
                  <label>{{ patientReport.immunization }}</label>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="isMedicineReport">
            <div class="flex justify-center items-center">
              <div class="report-title text-center">
                <p class="text-weight-bold text report">
                  Medicine Inventory Report
                </p>
                <p class="report-from">
                  From {{ dateToShow[0] }} to
                  {{ dateToShow[1] }}
                </p>
                <q-separator color="primary" size="2px" />
              </div>
            </div>
            <div class="q-mt-lg q-mx-md">
              <q-table
                dense
                auto-width
                :header-class="'small-header'"
                :columns="medicineColumns"
                :rows="MedicineData"
                flat
                hide-bottom
                class="full-width"
              />
            </div>
          </div>

          <div v-else-if="isSuppliesReport">
            <div class="flex justify-center items-center">
              <div class="report-title text-center">
                <p class="text-weight-bold text report">
                  Supplies Inventory Report
                </p>
                <p class="report-from">
                  From {{ dateToShow[0] }} to
                  {{ dateToShow[1] }}
                </p>
                <q-separator color="primary" size="2px" />
              </div>
            </div>
            <div class="q-mt-lg q-mx-md">
              <q-table
                dense
                auto-width
                :columns="supplyColumns"
                :rows="SupplyData"
                flat
                hide-bottom
                class="full-width"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../script/Reports/reports"></script>

<style lang="scss" scoped>
@import "../styles/reports/reports.scss";

.small-header th {
  font-size: 12px;
  font-weight: normal;
}
</style>
