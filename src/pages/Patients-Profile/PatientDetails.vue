<template>
  <div class="pr-opd-details">
    <div class="flex justify-between items-center q-px-md">
      <div class="flex items-center">
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

      <div v-if="$route.params.queue">
        <div
          class="text-center text-grey-7"
          v-if="keySession && keySession.department !== 5"
        >
          <label>Patient Queue</label>
        </div>

        <div class="row">
          <q-btn
            no-caps
            color="negative"
            :label="
              keySession && keySession.department !== 5
                ? 'Remove Patient'
                : 'Remove Patient from Queue'
            "
            icon="playlist_remove"
            class="col"
            @click="isRemoveFromCurrentQueue = !isRemoveFromCurrentQueue"
          />
          <q-btn
            v-if="keySession && keySession.department !== 5"
            no-caps
            color="primary"
            label="Done"
            icon="add_task"
            class="q-ml-md col"
            style="width: 200px"
            @click="isDonePatient = !isDonePatient"
          />
        </div>
      </div>
    </div>

    <!-- Card -->
    <div class="grid card-box q-mx-md q-mb-xl row">
      <div class="col-3 q-pa-md first-col leftSide col" style="width: 300px">
        <div class="flex" style="justify-content: center; align-items: center">
          <q-btn
            v-if="keySession && keySession.department === 5"
            class="q-mt-xs q-mb-xs"
            icon="eva-edit-outline"
            label="Edit Patient Profile"
            no-caps
            color="primary"
            @click="
              $router.push({
                name: 'add-edit-patient-record',
                params: {
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
            {{
              (PatientDetails.address_line !== ""
                ? PatientDetails.address_line + ", "
                : "") +
              PatientDetails.barangay +
              ", " +
              PatientDetails.municipality +
              ", " +
              PatientDetails.province
            }}
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

        <div class="text-grey-7 text-caption text-center">
          <label>Please select your department</label>
        </div>

        <div class="row">
          <div
            class="col"
            v-if="
              keySession &&
              keySession.department !== 4 &&
              keySession.permission_level !== 3 &&
              !isbtnDisabled
            "
          >
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
              :disable="
                keySession &&
                keySession.permission_level !== 3 &&
                selectedDepartment !== null
                  ? false
                  : true
              "
              @click="
                $route.params.queue
                  ? $router.push({
                      name: selectedDepartment + '/patient_records/new',
                      params: {
                        department: selectedDepartment,
                        queue: $route.params.queue,
                      },
                    })
                  : $router.push({
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

    <!-- Remove Patient from Queue -->
    <q-dialog v-model="isRemoveFromCurrentQueue" persistent>
      <q-card class="q-pa-md" style="width: 380px">
        <div>
          <div class="text-center">
            <q-icon name="playlist_remove" size="100px" color="negative" />
            <h5 class="text-negative text-bold no-margin">Are you sure?</h5>
            <p class="text-dark q-mt-xs">
              Do you want to remove this current patient from the queue?
            </p>

            <div v-if="keySession && keySession.department === 5">
              <q-separator color="primary" class="q-my-md q-mx-lg" />
              <p class="text-grey-7">
                <q-icon name="help" color="amber-5" />
                To send the next patient to the Doctor's office, please complete
                the form.
              </p>
            </div>
          </div>

          <div
            class="flex q-mt-md"
            style="justify-content: center; align-items: center"
          >
            <q-btn
              v-close-popup
              label="Cancel"
              no-caps
              color="grey-7"
              style="width: 100%"
            />
            <q-btn
              v-if="priorityPatients && priorityPatients.length !== 0"
              color="amber-9"
              icon="priority_high"
              label="Remove and call next priority patient"
              no-caps
              class="q-mt-sm"
              style="width: 100%"
              @click="callInNextPriority"
            />
            <q-btn
              v-if="otherPatients && otherPatients.length !== 0"
              color="primary"
              icon="mic"
              label="Remove and call next non-priority patient"
              no-caps
              class="q-mt-sm"
              style="width: 100%"
              @click="callInNextPatient"
            />
            <q-btn
              color="grey-2"
              icon="home"
              text-color="text-dark"
              label="Remove and return to home page"
              no-caps
              class="q-mt-sm"
              style="width: 100%"
              @click="doneCurrentPatient"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Done Patient -->
    <q-dialog v-model="isDonePatient" persistent>
      <q-card class="q-pa-md" style="width: 380px">
        <div>
          <div class="text-center">
            <q-icon name="add_task" size="100px" color="primary" />
            <h5 class="text-primary text-bold no-margin">Are you sure?</h5>
            <p class="text-dark q-mt-xs">
              Would you like to call in the next patient?
            </p>
          </div>

          <div
            class="flex q-mt-md"
            style="justify-content: center; align-items: center"
          >
            <q-btn
              v-close-popup
              label="Cancel"
              no-caps
              color="grey-7"
              style="width: 100%"
            />
            <q-btn
              v-if="priorityPatients && priorityPatients.length !== 0"
              color="amber-9"
              icon="priority_high"
              label="Call next priority patient"
              no-caps
              class="q-mt-sm"
              style="width: 100%"
              @click="callInNextPriority"
            />
            <q-btn
              v-if="otherPatients && otherPatients.length !== 0"
              color="primary"
              icon="mic"
              label="Call next non-priority patient"
              no-caps
              class="q-mt-sm"
              style="width: 100%"
              @click="callInNextPatient"
            />
            <q-btn
              color="grey-2"
              icon="home"
              text-color="text-dark"
              label="Return to home page"
              no-caps
              class="q-mt-sm"
              style="width: 100%"
              @click="doneCurrentPatient"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
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
