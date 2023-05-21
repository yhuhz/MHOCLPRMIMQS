<template>
  <div class="medicine-inventory">
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
        <h5 class="text-dark text-weight-bold">MEDICINE RELEASE</h5>
      </div>
    </div>

    <div>
      <!-- Pending -->
      <div class="row q-px-lg">
        <!-- Left panel -->
        <div
          v-if="selectedView === 'Pending' && pendingArray.length > 0"
          class="col-4 q-pa-md q-mr-sm left-panel"
          :style="{ height: $q.screen.height - 180 + 'px' }"
        >
          <div class="flex items-baseline justify-between q-mb-sm">
            <q-select
              dense
              outlined
              v-model="selectedView"
              :options="viewOptions"
              style="width: 100px"
            />

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

          <q-scroll-area :style="{ height: $q.screen.height - 300 + 'px' }">
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

        <!-- Right Panel -->
        <div class="right-panel col q-ml-sm q-pa-lg">
          <div
            v-if="pendingArray.length > 0"
            style="justify-content: center; align-items: center"
          >
            <div class="text-center">
              <h3 class="q-my-none text-primary text-bold">
                {{
                  selectedPrescription.opd_id
                    ? "OPD" + selectedPrescription.opd_id
                    : selectedPrescription.dental_id
                    ? "DNTL" + selectedPrescription.dental_id
                    : "PNL Checkup " + selectedPrescription.prenatal_checkup_id
                }}
              </h3>
            </div>

            <q-scroll-area :style="{ height: $q.screen.height - 300 + 'px' }">
              <!-- Prescriptions -->
              <h6 class="q-mt-md text-center q-my-none text-primary text-bold">
                Prescription
              </h6>
              <div class="row">
                <h6 class="col q-my-none text-primary text-bold">
                  Medicine Name
                </h6>
                <h6 class="col-2 q-my-none text-primary text-bold">Quantity</h6>
              </div>

              <div class="q-mt-sm">
                <div
                  v-for="prescription in selectedPrescription.prescription"
                  :key="prescription"
                  class="row"
                >
                  <q-input
                    dense
                    borderless
                    readonly
                    v-model="prescription.medicine_name"
                    class="col"
                    style="border-bottom: 1px solid #525252"
                  />
                  <q-input
                    dense
                    borderless
                    readonly
                    v-model="prescription.quantity"
                    class="col-2"
                    style="border-bottom: 1px solid #525252"
                  />
                </div>
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

    <MHCDialog :content="$options.components.DeleteMedicineConfirmation" />
  </div>
</template>

<script src="../script/Meds&Supplies/MedicineRelease"></script>

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
