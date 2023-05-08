<template>
  <div class="dashboard">
    <div class="q-mx-md q-my-md q-pa-lg">
      <div class="text-center text-primary">
        <label class="text-bold" style="font-size: 30px"
          >Hello {{ keySession && keySession.first_name }}</label
        >
        <p class="content q-mt-sm">What would you like to do today?</p>
      </div>
      <div class="row q-mt-lg">
        <!-- Patient Queue -->
        <fieldset
          class="column queue q-pa-md q-mr-lg shadow-5"
          v-if="keySession && keySession.department !== 4"
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <q-icon name="list" size="50px" color="primary" />
            <label class="text-primary text-bold" style="font-size: 25px"
              >Patient Queue</label
            >
          </div>
          <q-select
            flat
            dense
            outlined
            :options="departmentList"
            v-model="selectedDepartment"
            @update:model-value="getDepartments"
            class="q-mt-md"
            :readonly="
              departmentList && departmentList.length === 1 ? true : false
            "
          />

          <div class="q-mt-lg">
            <div>
              <fieldset class="inside-container current">
                <legend
                  class="text-bold text-center q-px-sm"
                  style="color: #55a15e"
                >
                  CURRENT PATIENT
                </legend>

                <div
                  class="text-center text-bold"
                  v-if="currentPatient && currentPatient.patient_id"
                >
                  <div
                    :style="
                      currentPatient && currentPatient.is_priority === 1
                        ? 'font-size: x-large; cursor: pointer; color: #ff8f00'
                        : 'font-size: x-large; cursor: pointer; color: #55a15e'
                    "
                    @click="
                      $router.push({
                        name: 'patient-details',
                        params: {
                          id: currentPatient.patient_id,
                        },
                      })
                    "
                  >
                    {{ currentPatient && currentPatient.patient_id }}
                  </div>
                  <div
                    :style="
                      currentPatient && currentPatient.is_priority === 1
                        ? 'color: #ff8f00'
                        : 'color: #55a15e'
                    "
                  >
                    {{
                      currentPatient &&
                      currentPatient.first_name +
                        (currentPatient.middle_name
                          ? " " + currentPatient.middle_name
                          : "") +
                        " " +
                        currentPatient.last_name +
                        (currentPatient.suffix
                          ? " " + currentPatient.suffix
                          : "")
                    }}
                  </div>
                  <div v-if="keySession && keySession.department !== 6">
                    <div class="row" v-if="selectedDepartment === 'Front Desk'">
                      <q-btn
                        dense
                        no-caps
                        color="negative"
                        label="Remove"
                        icon="delete"
                        class="col q-mt-xs q-mr-xs"
                        style="width: 100%"
                        @click="
                          isRemoveFromCurrentQueue = !isRemoveFromCurrentQueue
                        "
                      />
                      <q-btn
                        dense
                        no-caps
                        color="primary"
                        label="Done"
                        icon="how_to_reg"
                        class="col q-mt-xs q-ml-xs"
                        style="width: 100%"
                        @click="doneCurrentPatient"
                      />
                    </div>
                    <div class="row" v-else>
                      <q-btn
                        dense
                        no-caps
                        color="primary"
                        label="Done"
                        icon="how_to_reg"
                        class="col q-mt-xs"
                        style="width: 100%"
                        @click="doneCurrentPatient"
                      />
                    </div>
                  </div>
                </div>

                <div v-else class="text-primary text-center text-bold text-20">
                  No Patient
                </div>
              </fieldset>
            </div>

            <div
              class="q-mt-lg text-center"
              v-if="keySession && keySession.department !== 6"
            >
              <label class="text-primary text-bold q-px-sm">
                Call in Next Patient
              </label>
              <div class="q-mt-sm">
                <q-btn
                  style="width: 100%"
                  color="amber-9"
                  :disable="
                    priorityPatients &&
                    priorityPatients[0] &&
                    keySession &&
                    (keySession.department === 5 ||
                      keySession.department === 1 ||
                      keySession.department === 2 ||
                      keySession.department === 3)
                      ? false
                      : true
                  "
                  @click="callInNextPriority"
                >
                  <div style="display: flex; align-items: center">
                    <q-icon name="priority_high" size="30px" />
                    <label style="margin-left: 5px"
                      >priority patients ({{ priorityPatients.length }})</label
                    >
                  </div>
                </q-btn>

                <q-btn
                  style="width: 100%"
                  class="q-mt-sm"
                  color="primary"
                  :disable="
                    otherPatients &&
                    otherPatients[0] &&
                    keySession &&
                    (keySession.department === 5 ||
                      keySession.department === 1 ||
                      keySession.department === 2 ||
                      keySession.department === 3)
                      ? false
                      : true
                  "
                  @click="callInNextPatient"
                >
                  <div style="display: flex; align-items: center">
                    <q-icon name="mic" size="30px" />
                    <label style="margin-left: 5px"
                      >Other patients ({{ otherPatients.length }})</label
                    >
                  </div>
                </q-btn>
              </div>
            </div>

            <!-- Show if Admin -->
            <fieldset
              class="q-mt-lg text-center inside-container current"
              v-if="keySession && keySession.department === 6"
            >
              <legend
                class="text-bold text-center q-px-sm"
                style="color: #55a15e"
              >
                PATIENTS IN QUEUE
              </legend>

              <div
                class="flex justify-between q-mt-sm text-weight-medium text-amber-9"
              >
                <label>Priority Patients:</label>
                <label>{{ priorityPatients.length }}</label>
              </div>

              <div
                class="flex justify-between q-mt-sm text-weight-medium text-primary"
              >
                <label>Non-Priority Patients:</label>
                <label>{{ otherPatients.length }}</label>
              </div>
            </fieldset>

            <!-- List of Patients -->
            <div
              class="q-mt-sm"
              v-if="
                keySession &&
                keySession.department === 5 &&
                keySession.permission_level !== 3
              "
            >
              <div style="text-align: center">
                <q-btn
                  flat
                  no-caps
                  dense
                  label="Show Priority Patients"
                  color="primary"
                  :icon-right="
                    showPriority ? 'arrow_drop_up' : 'arrow_drop_down'
                  "
                  @click="showPriority = !showPriority"
                />
                <div v-if="showPriority">
                  <ol>
                    <li
                      v-for="(queue, index) in priorityPatients"
                      :key="index"
                      class="q-px-sm text-amber-9 text-bold"
                    >
                      <div class="flex justify-between items-center">
                        <label
                          class="text-amber-9 text-bold"
                          style="cursor: pointer; font-size: 16px"
                          clickable
                          @click="
                            $router.push({
                              name: 'patient-details',
                              params: {
                                id: queue.patient_id,
                              },
                            })
                          "
                        >
                          {{ queue.patient_id }}
                        </label>
                        <q-icon
                          v-if="keySession && keySession.department === 5"
                          color="negative"
                          size="20px"
                          name="delete"
                          @click="removeFromQueue(queue.queue_id)"
                        />
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              <div style="text-align: center">
                <q-btn
                  flat
                  no-caps
                  dense
                  label="Show Other Patients"
                  color="primary"
                  :icon-right="showOthers ? 'arrow_drop_up' : 'arrow_drop_down'"
                  @click="showOthers = !showOthers"
                />
                <div v-if="showOthers">
                  <ol>
                    <li
                      v-for="(queue, index) in otherPatients"
                      :key="index"
                      class="q-px-sm text-primary text-bold"
                    >
                      <div class="flex justify-between items-center">
                        <label
                          class="text-primary text-bold"
                          style="cursor: pointer; font-size: 16px"
                          clickable
                          @click="
                            $router.push({
                              name: 'patient-details',
                              params: {
                                id: queue.patient_id,
                              },
                            })
                          "
                        >
                          {{ queue.patient_id }}
                        </label>
                        <q-icon
                          v-if="keySession && keySession.department === 5"
                          color="negative"
                          name="delete"
                          size="20px"
                          @click="removeFromQueue(queue.queue_id)"
                        />
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <div class="col to-do">
          <div class="to-do-grid">
            <div
              class="to-do-box shadow-5"
              v-if="keySession && keySession.department === 6"
              @click="$router.push({ name: 'dashboard' })"
            >
              <q-icon name="bar_chart" size="100px" class="to-do-label" />

              <label class="text-center to-do-label">View Dashboard</label>
            </div>

            <div
              class="to-do-box shadow-5"
              @click="$router.push({ name: 'search-patients' })"
            >
              <q-icon name="group" size="100px" class="to-do-label" />
              <label class="text-center to-do-label"
                >View Patient Profiles</label
              >
            </div>

            <div
              class="to-do-box shadow-5"
              v-if="
                keySession &&
                keySession.department === 5 &&
                keySession.permission_level !== 3
              "
              @click="$router.push({ name: 'add-edit-patient-record' })"
            >
              <q-icon name="person_add" size="100px" class="to-do-label" />
              <label class="text-center to-do-label">Add Patient Profile</label>
            </div>

            <div
              class="to-do-box shadow-5"
              @click="$router.push({ name: 'search-records' })"
            >
              <q-icon
                name="medical_information"
                size="100px"
                class="to-do-label"
              />
              <label class="text-center to-do-label"
                >Search Health Records</label
              >
            </div>

            <div
              class="to-do-box shadow-5"
              @click="$router.push({ name: 'household-records' })"
            >
              <q-icon name="home" size="100px" class="to-do-label" />
              <label class="text-center to-do-label"
                >View Household Records</label
              >
            </div>

            <div
              class="to-do-box shadow-5"
              @click="$router.push({ name: 'pwd-records' })"
            >
              <q-icon name="accessible" size="100px" class="to-do-label" />
              <label class="text-center to-do-label">View PWD Records</label>
            </div>

            <div
              class="to-do-box shadow-5"
              @click="$router.push({ name: 'senior-citizen-records' })"
            >
              <q-icon name="elderly" size="100px" class="to-do-label" />
              <label class="text-center to-do-label"
                >View Senior Citizen Records</label
              >
            </div>

            <div
              class="to-do-box shadow-5"
              @click="$router.push({ name: 'pregnant-women-records' })"
              v-if="
                keySession &&
                keySession.department !== 1 &&
                keySession.department !== 2
              "
            >
              <q-icon name="pregnant_woman" size="100px" class="to-do-label" />
              <label class="text-center to-do-label"
                >View Pregnancy Records</label
              >
            </div>

            <div
              class="to-do-box shadow-5"
              v-if="
                keySession &&
                (keySession.department === 4 ||
                  (keySession.department === 6 &&
                    keySession.permission_level === 1))
              "
              @click="$router.push({ name: 'medicine-inventory' })"
            >
              <q-icon name="medication" size="100px" class="to-do-label" />
              <label class="text-center to-do-label"
                >View Medicine Inventory</label
              >
            </div>

            <div
              class="to-do-box shadow-5"
              v-if="
                keySession &&
                (keySession.department === 4 ||
                  (keySession.department === 6 &&
                    keySession.permission_level === 1))
              "
              @click="$router.push({ name: 'supply-inventory' })"
            >
              <q-icon name="vaccines" size="100px" class="to-do-label" />
              <label class="text-center to-do-label"
                >View Supplies Inventory</label
              >
            </div>

            <div
              class="to-do-box shadow-5"
              v-if="
                keySession &&
                keySession.department === 6 &&
                keySession.permission_level === 1
              "
              @click="$router.push({ name: 'manage-users' })"
            >
              <q-icon name="account_circle" size="100px" class="to-do-label" />
              <label class="text-center to-do-label"
                >Manage User Accounts</label
              >
            </div>

            <div
              class="to-do-box shadow-5"
              v-if="keySession && keySession.department === 6"
              @click="$router.push({ name: 'reports' })"
            >
              <q-icon name="description" size="100px" class="to-do-label" />
              <label class="text-center to-do-label">Generate Reports</label>
            </div>

            <div
              class="to-do-box shadow-5"
              v-if="
                keySession &&
                keySession.department === 6 &&
                keySession.permission_level === 1
              "
              @click="backupDB"
            >
              <q-icon name="cloud_download" size="100px" class="to-do-label" />
              <label class="text-center to-do-label">Backup Database</label>
            </div>

            <div
              class="to-do-box shadow-5"
              v-if="
                keySession &&
                keySession.department === 6 &&
                keySession.permission_level === 1
              "
              @click="openRestoreDBModal"
            >
              <q-icon name="cloud_upload" size="100px" class="to-do-label" />
              <label class="text-center to-do-label"
                >Restore Database to last Backup</label
              >
            </div>

            <q-dialog persistent v-model="isRestoreDB">
              <q-card>
                <div class="q-pa-lg text-center" style="width: 400px">
                  <q-icon name="cloud_upload" size="100px" color="primary" />
                  <div>
                    <p
                      class="text-primary text-weight-bold text-24 text-center"
                    >
                      Are you sure?
                    </p>
                    <p class="text-grey-7 text-center">
                      This will restore the database to its previous version.
                      <span class="text-negative text-center"
                        >This process cannot be undone!</span
                      >
                    </p>
                  </div>

                  <div class="text-center">
                    <q-separator size="2px" color="primary" />
                    <p style="font-size: small" class="q-mt-md text-grey-7">
                      Which database version would you like to restore?
                    </p>
                    <q-select
                      dense
                      outlined
                      :options="DBList"
                      v-model="selectedDB"
                    />
                  </div>

                  <div class="flex items-center justify-between q-mt-lg">
                    <q-btn
                      v-close-popup
                      label="Cancel"
                      no-caps
                      color="grey-7"
                      class="button-120"
                    />

                    <q-btn
                      label="Yes"
                      no-caps
                      color="primary"
                      class="button-120"
                      :disable="selectedDB === null ? true : false"
                      @click="restoreDB"
                    />
                  </div>
                </div>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
      <q-dialog v-model="isRemoveFromCurrentQueue" persistent>
        <q-card class="q-pa-md" style="width: 300px">
          <div>
            <div class="text-center">
              <q-icon name="playlist_remove" size="100px" color="negative" />
              <h6 class="text-negative no-margin">Are you sure?</h6>
              <p class="text-dark m-width-250">
                Do you want to remove this current patient from queue?
              </p>
            </div>

            <div class="flex justify-around q-mt-md">
              <q-btn
                v-close-popup
                label="Cancel"
                no-caps
                color="grey-7"
                class="button-100"
              />
              <q-btn
                color="negative"
                label="Yes"
                no-caps
                class="button-100"
                @click="removeCurrentPatient"
              />
            </div>
          </div>
        </q-card>
      </q-dialog>
    </div>
    <MHCDialog :content="$options.components.RemoveFromQueue" />
  </div>
</template>

<script src="../script/Dashboard/Home.js"></script>

<style lang="scss">
.content {
  justify-content: center;
  align-items: center;
}

.queue {
  border: 2px solid #5f8d4e;
  border-radius: 10px;
  width: 300px;
}

.to-do {
  width: auto;
}

.q-input {
  border-color: #5f8d4e;
}

.inside-container {
  border-radius: 5px;
}

.current {
  border: 2px solid #6bcb77;
}

.priority {
  border: 2px solid #ffa000;
}

.in-queue {
  border: 2px solid #5f8d4e;
}

.to-do-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.to-do-box {
  cursor: pointer;
  border: 2px solid #5f8d4e;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
}

.to-do-box {
  border: 2px solid #5f8d4e;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  transition: all 0.2s ease-in-out;

  .to-do-label {
    color: #5f8d4e;
  }
}

.to-do-box:hover {
  border: 2px solid rgba(95, 141, 78, 1);
  background-color: rgba(95, 141, 78, 1);
  transform: scale(1.1);

  .to-do-label {
    color: white;
  }
}
</style>
