<template>
  <div class="pr-opd-details">
    <div class="flex items-center q-px-md">
      <q-btn
        round
        dense
        outline
        icon="eva-arrow-back-outline"
        color="dark"
        @click="$router.go(-1)"
        class="q-mr-md"
      />
      <h5 class="text-weight-bold text-dark q-my-lg">PATIENT RECORDS</h5>
    </div>

    <!-- Card -->
    <div class="grid card-box q-mx-md q-mb-xl row">
      <div class="col-3 q-pa-md first-col leftSide col" style="width: 300px">
        <div>
          <q-btn
            class="float-right cursor-pointer q-mt-xs"
            icon="eva-edit-outline"
            size="xs"
            padding="3px"
            outline
            color="primary"
            @click="
              $router.push({
                name: 'add-edit-patient-record',
                query: {
                  id: PatientDetails.patient_id,
                },
              })
            "
          />
          <p class="text-primary text-center text-weight-bold p-name">
            {{
              PatientDetails.first_name +
              (PatientDetails.middle_name === null
                ? ""
                : " " + PatientDetails.middle_name) +
              " " +
              PatientDetails.last_name +
              (PatientDetails.suffix === null
                ? ""
                : " " + PatientDetails.suffix)
            }}
          </p>
        </div>
        <div class="flex justify-between items-center q-mt-sm">
          <p class="text-dark text-bold">{{ PatientDetails.patient_id }}</p>
          <p class="text-dark text-bold">
            {{ status[PatientDetails.status] }}
          </p>
        </div>
        <div>
          <!-- Address -->
          <p class="text-center text-primary address-details">
            {{ PatientDetails.address }}
          </p>
        </div>

        <div class="flex items-center justify-between q-mt-lg">
          <div class="column text-center">
            <label class="text-green-8">{{
              PatientDetails.phone_number
            }}</label>
            <q-separator class="q-mt-sm q-mb-sm" style="width: 120px" />
            <label class="text-dark text-bold">Phone Number</label>
          </div>
          <div class="column text-center">
            <label class="text-green-8">{{ sex[PatientDetails.sex] }}</label>
            <q-separator class="q-mt-sm q-mb-sm" style="width: 120px" />
            <label class="text-dark text-bold">Sex</label>
          </div>
        </div>

        <div class="flex items-center justify-between q-mt-lg">
          <div class="column text-center">
            <label class="text-green-8">{{ PatientDetails.birthdate }}</label>
            <q-separator class="q-mt-sm q-mb-sm" style="width: 120px" />
            <label class="text-dark text-bold">Birth date</label>
          </div>
          <div class="column text-center">
            <label class="text-green-8">{{ PatientDetails.age }}</label>
            <q-separator class="q-mt-sm q-mb-sm" style="width: 120px" />
            <label class="text-dark text-bold">Age</label>
          </div>
        </div>

        <div
          class="flex items-center justify-between q-mt-lg"
          v-if="PatientDetails.pwd_id"
        >
          <div class="column text-center">
            <label class="text-green-8">{{
              PatientDetails.pwd_id === null ? "" : PatientDetails.pwd_id
            }}</label>
            <q-separator class="q-mt-sm q-mb-sm" style="width: 120px" />
            <label class="text-dark text-bold">PWD ID</label>
          </div>
          <div class="column text-center">
            <label class="text-green-8">{{
              PatientDetails.disability === null
                ? ""
                : PatientDetails.disability
            }}</label>
            <q-separator class="q-mt-sm q-mb-sm" style="width: 120px" />
            <label class="text-dark text-bold">Disability</label>
          </div>
        </div>

        <div
          class="row justify-center q-mb-sm q-mt-lg"
          v-if="PatientDetails.senior_citizen_id"
        >
          <div class="column text-center">
            <label class="text-green-8">{{
              PatientDetails.senior_citizen_id === null
                ? ""
                : PatientDetails.senior_citizen_id
            }}</label>
            <q-separator class="q-mt-sm q-mb-sm" style="width: 120px" />
            <label class="text-dark text-bold">Senior Citizen ID</label>
          </div>
        </div>

        <q-separator class="q-my-lg" color="dark" />

        <div class="row q-my-lg">
          <div class="col">
            <q-btn
              dense
              color="primary"
              outline
              label="Create New Record"
              no-caps
              size="sm"
              padding="4px 8px"
              icon="eva-folder-add-outline"
              class="create-btn"
              :disable="selectedDepartment != null ? false : true"
              @click="
                $router.push({
                  name: selectedDepartment + '/patient_records/new',
                  params: {
                    department: selectedDepartment,
                  },
                })
              "
            />
          </div>

          <div class="col">
            <q-select
              v-model="selectedDepartment"
              :options="departmentList"
              dense
              outlined
              color="primary"
              class="department-btn"
              @update:model-value="getRecords()"
            />
          </div>
        </div>

        <div class="row q-my-md">
          <div class="col" v-if="selectedDepartment != null">
            <q-table
              :columns="columns"
              :rows="PatientRecords"
              dense
              @row-click="onRowClick"
            >
            </q-table>
          </div>
        </div>

        <!-- <q-separator vertical size="2px" color="primary" /> -->
      </div>

      <div class="col">
        <q-layout class="pageLayout">
          <router-view />
        </q-layout>
      </div>
    </div>
  </div>
</template>

<script src="../script/Patients-Profile/PatientDetails"></script>

<style lang="scss" scoped>
@import "../styles/patients-profile/opd/pr_opd_details.scss";

.leftSide {
  border-right: solid 2px #5f8d4e;
}

// .grid {
//   display: inline-grid;
//   grid-template-columns: 1fr 1fr;
// }

.pageLayout {
  min-height: 0 !important;
}
</style>
