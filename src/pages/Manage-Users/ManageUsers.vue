<template>
  <div class="medicine-inventory">
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
      <h5 class="text-dark text-weight-bold">MANAGE USER ACCOUNTS</h5>
    </div>

    <div class="q-px-md">
      <div class="flex justify-between items-center">
        <div class="flex">
          <q-input
            outlined
            dense
            :input-style="{ color: '#525252' }"
            v-model="searchString"
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
            class="mhc-select-200"
          />
          <!-- Filters -->
          <q-btn
            outline
            label="Filters"
            no-caps
            icon-right="eva-funnel-outline"
            color="primary"
            class="q-mx-lg button-120"
            @click="showFilterModal = true"
          >
            <!-- Filters Modal -->
            <q-dialog v-model="showFilterModal">
              <q-card class="dialog-card q-pa-lg">
                <div class="flex justify-between">
                  <!-- Department -->
                  <div class="column">
                    <label class="text-primary text-weight-bold"
                      >Department</label
                    >
                    <q-checkbox
                      v-model="select_all_dept"
                      label="Select All"
                      class="text-dark"
                      size="xs"
                      @update:model-value="select_all_dept_change"
                    />
                    <div
                      v-for="(department, index) in filtersDepartment"
                      :key="index"
                    >
                      <q-checkbox
                        v-model="selectedFiltersDepartment"
                        :val="index + 1"
                        :label="department"
                        size="xs"
                        class="text-dark"
                        :disable="dept_checkbox_disable"
                      />
                    </div>
                  </div>

                  <div class="column q-ml-xl">
                    <label class="text-primary text-weight-bold q-pt-md"
                      >Permission Level</label
                    >
                    <div
                      v-for="(status, index) in filtersPermission"
                      :key="index"
                    >
                      <q-checkbox
                        v-model="selectedFiltersPermission"
                        :val="index + 1"
                        :label="status"
                        size="xs"
                        class="text-dark"
                      />
                    </div>
                  </div>
                  <div class="column q-ml-xl">
                    <label class="text-primary text-weight-bold q-pt-md"
                      >Status</label
                    >
                    <div v-for="(status, index) in statusList" :key="index">
                      <q-checkbox
                        v-model="selectedFilterStatus"
                        :val="index"
                        :label="status"
                        size="xs"
                        class="text-dark"
                      />
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between q-mt-md">
                  <div class="col q-ml-md">
                    <label class="text-weight-bold text-primary"
                      >Date Added</label
                    >
                    <div class="flex items-center justify-between">
                      <!-- From -->
                      <q-input
                        dense
                        outlined
                        hint="From"
                        :input-style="{ color: '#525252' }"
                        class="q-mt-sm width-150"
                        v-model="dateAdded[0]"
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
                                mask="YYYY-MM-DD"
                                v-model="dateAdded[0]"
                              />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                      <div class="line"></div>

                      <!-- To -->
                      <q-input
                        dense
                        outlined
                        hint="To"
                        :input-style="{ color: '#525252' }"
                        class="q-mt-sm width-150"
                        v-model="dateAdded[1]"
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
                                mask="YYYY-MM-DD"
                                v-model="dateAdded[1]"
                              />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
                <!-- Done Button -->
                <div class="flex justify-center items-center q-mt-lg q-mb-md">
                  <q-btn
                    dense
                    color="primary"
                    label="Done"
                    no-caps
                    class="button-80"
                    @click="showFilterModal = !showFilterModal"
                  />
                </div>
              </q-card>
            </q-dialog>
          </q-btn>

          <!-- Search -->
          <q-btn
            color="primary"
            label="Search"
            no-caps
            icon-right="eva-search-outline"
            class="button-120"
            @click="getUsers"
          />
        </div>

        <!-- Add New User -->
        <div>
          <q-btn
            @click="isAddNewUser = true"
            outline
            label="Add New User"
            icon-right="person_add"
            no-caps
            color="primary"
          />
        </div>

        <!-- Modals for Add New User -->
        <q-dialog v-model="isAddNewUser" persistent>
          <q-card>
            <div v-if="isAddUserSuccess">
              <div class="q-px-xl q-py-lg">
                <div class="flex q-py-sm" style="justify-content: center">
                  <q-icon name="add_task" size="xl" color="primary" />
                </div>
                <p
                  class="text-primary text-center text-bold"
                  style="font-size: xx-large"
                >
                  Success!
                </p>

                <p class="text-center text-grey-7" style="font-size: larger">
                  User account successfully created!
                </p>

                <div class="q-px-md">
                  <div class="flex items-center justify-between">
                    <label>User ID:</label>
                    <label class="text-primary">{{ userSuccess.userID }}</label>
                  </div>
                  <div class="flex items-center justify-between">
                    <label>Username:</label>
                    <label class="text-primary">{{
                      userSuccess.username
                    }}</label>
                  </div>
                  <div class="flex items-center justify-between">
                    <label>Password: </label>
                    <label class="text-primary">{{
                      userSuccess.password
                    }}</label>
                  </div>
                </div>

                <div class="flex q-mt-lg" style="justify-content: center">
                  <q-btn
                    color="primary"
                    label="Back"
                    no-caps
                    class="button-120"
                    @click="
                      isAddUserSuccess = !isAddUserSuccess;
                      isAddNewUser = !isAddNewUser;
                    "
                  />
                </div>
              </div>
            </div>

            <div v-else-if="isAddUserFail">
              <div class="q-px-xl q-py-lg">
                <div class="flex q-py-sm" style="justify-content: center">
                  <q-icon name="error" color="negative" size="xl" />
                </div>
                <p
                  class="text-negative text-center text-bold"
                  style="font-size: xx-large"
                >
                  Error!
                </p>

                <p class="text-grey-7" style="font-size: larger">
                  There was some trouble adding this user account
                </p>

                <div class="flex q-mt-lg" style="justify-content: center">
                  <q-btn
                    color="grey-7"
                    label="Back"
                    no-caps
                    class="button-120"
                    @click="isAddUserFail = !isAddUserFail"
                  />
                </div>
              </div>
            </div>

            <div v-else>
              <div class="q-pa-lg">
                <div>
                  <p class="text-primary text-weight-bold text-24 text-center">
                    <q-icon name="person_add" class="q-mr-xs q-gutter-xs" />
                    ADD NEW USER
                    <q-btn
                      v-close-popup
                      dense
                      color="negative"
                      size="0.375rem"
                      icon="eva-close-outline"
                      style="float: right"
                    />
                  </p>
                </div>
                <q-form @submit="addUser" @reset="onReset">
                  <fieldset
                    class="q-mb-md q-px-md"
                    style="border: 2px solid #5f8d4e; border-radius: 5px"
                  >
                    <legend class="q-px-sm text-primary text-bold">
                      PERSONAL INFORMATION
                    </legend>
                    <!-- First Row -->
                    <div class="row q-mt-md">
                      <div class="col">
                        <label class="text-primary text-bold"
                          >First Name
                          <span class="text-negative">*</span></label
                        >
                        <q-input
                          dense
                          outlined
                          class="q-mt-xs q-mr-md"
                          v-model="newUserInfo.first_name"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
                        />
                      </div>

                      <div class="col">
                        <label class="text-primary text-bold"
                          >Middle Name</label
                        >
                        <q-input
                          dense
                          outlined
                          class="q-mt-xs"
                          v-model="newUserInfo.middle_name"
                        />
                      </div>
                    </div>

                    <!-- Second Row -->
                    <div class="row">
                      <div class="col">
                        <label class="text-primary text-bold"
                          >Last Name <span class="text-negative">*</span></label
                        >
                        <q-input
                          dense
                          outlined
                          class="q-mr-md q-mt-xs"
                          v-model="newUserInfo.last_name"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
                        />
                      </div>
                      <div class="col">
                        <label class="text-primary text-bold">Suffix</label>
                        <q-input
                          dense
                          outlined
                          class="q-mt-xs"
                          v-model="newUserInfo.suffix"
                        />
                      </div>
                    </div>

                    <!-- Third Row -->
                    <div class="row">
                      <div class="col">
                        <label class="text-primary text-bold"
                          >Birthdate <span class="text-negative">*</span></label
                        >
                        <q-input
                          dense
                          outlined
                          placeholder="YYYY-MM-DD"
                          class="q-mt-xs"
                          v-model="newUserInfo.birthdate"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
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
                                  mask="YYYY-MM-DD"
                                  label="YYYY-MM-DD"
                                  v-model="newUserInfo.birthdate"
                                />
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>

                      <div class="col q-ml-md">
                        <label class="text-primary text-weight-bold"
                          >Phone Number
                          <span class="text-negative">*</span></label
                        >
                        <q-input
                          dense
                          outlined
                          class="q-mt-xs"
                          v-model="newUserInfo.phone_number"
                          :rules="[
                            (val) =>
                              (val && val.length > 0 && val.length < 12) ||
                              'Invalid phone number',
                          ]"
                        />
                      </div>

                      <div class="column q-ml-md">
                        <!-- Sex -->
                        <label class="text-primary text-weight-bold"
                          >Sex <span class="text-negative">*</span></label
                        >
                        <div class="flex items-center">
                          <div v-for="(sex, index) in sexArray" :key="index">
                            <q-radio
                              v-model="newUserInfo.sex"
                              :val="index"
                              :label="sex"
                              class="text-dark"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset
                    class="q-pa-md q-mb-md"
                    style="border: 2px solid #5f8d4e; border-radius: 5px"
                  >
                    <legend class="q-px-sm text-primary text-bold">
                      JOB INFORMATION
                    </legend>
                    <!-- Fourth Row -->
                    <div class="row">
                      <div class="col">
                        <label class="text-primary text-weight-bold"
                          >Department
                          <span class="text-negative">*</span></label
                        >
                        <q-select
                          v-model="newUserInfo.department"
                          dense
                          outlined
                          :options="departmentArray"
                          class="q-mt-xs"
                          @update:model-value="changeDepartment"
                        />
                      </div>

                      <div class="col q-ml-md">
                        <label class="text-primary text-weight-bold"
                          >Job Title <span class="text-negative">*</span></label
                        >
                        <q-input
                          dense
                          outlined
                          placeholder="ex. Doctor"
                          class="q-mt-xs"
                          v-model="newUserInfo.job_title"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
                        />
                      </div>
                    </div>

                    <!-- Fifth Row -->
                    <div class="row">
                      <div class="col">
                        <!-- Permission Level -->
                        <label class="text-primary text-weight-bold"
                          >Permission Level
                          <span class="text-negative">*</span></label
                        >
                        <q-select
                          v-model="newUserInfo.permission_level"
                          dense
                          outlined
                          :options="permissionArray"
                          class="q-mt-xs"
                          :disable="isPermissionDisabled"
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'Required field',
                          ]"
                          @update:model-value="changePermission"
                        />
                      </div>

                      <div class="col q-ml-md">
                        <!-- Status -->
                        <label class="text-primary text-weight-bold"
                          >Status <span class="text-negative">*</span></label
                        >

                        <q-select
                          v-model="newUserInfo.status"
                          dense
                          outlined
                          :options="statusList"
                          class="q-mt-xs"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <!-- Button for Modals -->
                  <div class="flex justify-center items-center">
                    <!-- Submit -->
                    <q-btn
                      color="primary"
                      label="Submit"
                      type="submit"
                      no-caps
                      class="button-120 q-mr-xl"
                    />
                    <q-btn
                      outline
                      color="primary"
                      label="Reset"
                      type="reset"
                      no-caps
                      class="button-120"
                    />
                  </div>
                </q-form>
              </div>
            </div>
          </q-card>
        </q-dialog>
      </div>

      <!-- Table -->
      <div class="q-my-xl table">
        <q-table
          :columns="columns"
          :rows="UsersList"
          :pagination="{ rowsPerPage: 10 }"
          :rows-per-page-options="[5, 10, 15, 20, 0]"
          flat
          dense
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
                    <q-item
                      clickable
                      class="drop-list"
                      @click="openResetPassword(props.row.user_id)"
                    >
                      <q-item-section>Reset Password</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="lock_reset" />
                      </q-item-section>
                    </q-item>

                    <!-- Edit -->
                    <q-item
                      clickable
                      class="drop-list"
                      @click="editUserModal(props.row)"
                    >
                      <q-item-section>Edit Details</q-item-section>
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-edit-outline" />
                      </q-item-section>
                    </q-item>

                    <!-- Delete -->
                    <q-item
                      clickable
                      class="drop-list-delete"
                      @click="openDialog(props.row.user_id)"
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
        </q-table>
      </div>

      <!-- Modal for Reset Password -->
      <q-dialog persistent v-model="isResetPassword">
        <q-card>
          <div v-if="isPasswordSuccess">
            <div class="q-px-xl q-py-lg">
              <div class="flex q-py-sm" style="justify-content: center">
                <q-icon name="add_task" size="xl" color="primary" />
              </div>
              <p
                class="text-primary text-center text-bold"
                style="font-size: xx-large"
              >
                Success!
              </p>

              <p class="text-center text-grey-7" style="font-size: larger">
                Password reset successful for user account
                {{ resetPasswordID }}
              </p>

              <div class="q-px-md">
                <div class="flex items-center justify-between">
                  <label>New Password: </label>
                  <label class="text-primary">{{ successMessage }}</label>
                </div>
              </div>

              <div class="flex q-mt-lg" style="justify-content: center">
                <q-btn
                  color="primary"
                  label="Back"
                  no-caps
                  class="button-120"
                  @click="
                    isPasswordSuccess = !isPasswordSuccess;
                    isResetPassword = !isResetPassword;
                  "
                />
              </div>
            </div>
          </div>

          <div v-else-if="isPasswordFail">
            <div class="q-px-xl q-py-lg">
              <div class="flex q-py-sm" style="justify-content: center">
                <q-icon name="error" color="negative" size="xl" />
              </div>
              <p
                class="text-negative text-center text-bold"
                style="font-size: xx-large"
              >
                Error!
              </p>

              <p class="text-grey-7" style="font-size: larger">
                There was some trouble resetting this user's password
              </p>

              <div class="flex q-mt-lg" style="justify-content: center">
                <q-btn
                  color="grey-7"
                  label="Back"
                  no-caps
                  class="button-120"
                  @click="
                    isPasswordFail = !isPasswordFail;
                    isResetPassword = !isResetPassword;
                  "
                />
              </div>
            </div>
          </div>

          <div class="q-pa-lg" v-else>
            <div>
              <p
                class="text-primary text-weight-bold text-24 text-center q-mb-lg"
              >
                <q-icon name="lock_reset" class="q-mr-xs q-gutter-xs" />
                RESET PASSWORD

                <q-btn
                  v-close-popup
                  dense
                  color="negative"
                  size="0.375rem"
                  icon="eva-close-outline"
                  style="float: right"
                />
              </p>
            </div>

            <p class="q-mb-lg" style="font-size: larger">
              Are you sure you want to reset the password for user ID
              <span class="text-bold">{{ resetPasswordID }}</span
              >?
            </p>

            <div class="flex items-center justify-between">
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
                @click="resetPassword"
              />
            </div>
          </div>
        </q-card>
      </q-dialog>

      <!-- Modal for Editing User Info -->
      <q-dialog v-model="isEditUser" persistent>
        <q-card>
          <div class="q-pa-lg">
            <div>
              <p class="text-primary text-weight-bold text-24 text-center">
                <q-icon name="person_add" class="q-mr-xs q-gutter-xs" />
                EDIT USER INFO
                <q-btn
                  v-close-popup
                  dense
                  color="negative"
                  size="0.375rem"
                  icon="eva-close-outline"
                  style="float: right"
                />
              </p>
            </div>
            <q-form @submit="editUser" @reset="onReset">
              <fieldset
                class="q-mb-md q-px-md"
                style="border: 2px solid #5f8d4e; border-radius: 5px"
              >
                <legend class="q-px-sm text-primary text-bold">
                  PERSONAL INFORMATION
                </legend>
                <!-- First Row -->
                <div class="row q-mt-md">
                  <div class="col">
                    <label class="text-primary text-bold"
                      >First Name <span class="text-negative">*</span></label
                    >
                    <q-input
                      dense
                      outlined
                      class="q-mt-xs q-mr-md"
                      v-model="editUserInfo.first_name"
                      :rules="[
                        (val) => (val && val.length > 0) || 'Required field',
                      ]"
                    />
                  </div>

                  <div class="col">
                    <label class="text-primary text-bold">Middle Name</label>
                    <q-input
                      dense
                      outlined
                      class="q-mt-xs"
                      v-model="editUserInfo.middle_name"
                    />
                  </div>
                </div>

                <!-- Second Row -->
                <div class="row">
                  <div class="col">
                    <label class="text-primary text-bold"
                      >Last Name <span class="text-negative">*</span></label
                    >
                    <q-input
                      dense
                      outlined
                      class="q-mr-md q-mt-xs"
                      v-model="editUserInfo.last_name"
                      :rules="[
                        (val) => (val && val.length > 0) || 'Required field',
                      ]"
                    />
                  </div>
                  <div class="col">
                    <label class="text-primary text-bold">Suffix</label>
                    <q-input
                      dense
                      outlined
                      class="q-mt-xs"
                      v-model="editUserInfo.suffix"
                    />
                  </div>
                </div>

                <!-- Third Row -->
                <div class="row">
                  <div class="col">
                    <label class="text-primary text-bold"
                      >Birthdate <span class="text-negative">*</span></label
                    >
                    <q-input
                      dense
                      outlined
                      placeholder="YYYY-MM-DD"
                      class="q-mt-xs"
                      v-model="editUserInfo.birthdate"
                      :rules="[
                        (val) => (val && val.length > 0) || 'Required field',
                      ]"
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
                              mask="YYYY-MM-DD"
                              label="YYYY-MM-DD"
                              v-model="editUserInfo.birthdate"
                            />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <div class="col q-ml-md">
                    <label class="text-primary text-weight-bold"
                      >Phone Number <span class="text-negative">*</span></label
                    >
                    <q-input
                      dense
                      outlined
                      class="q-mt-xs"
                      v-model="editUserInfo.phone_number"
                      :rules="[
                        (val) =>
                          (val && val.length > 0 && val.length < 12) ||
                          'Invalid phone number',
                      ]"
                    />
                  </div>

                  <div class="column q-ml-md">
                    <!-- Sex -->
                    <label class="text-primary text-weight-bold"
                      >Sex <span class="text-negative">*</span></label
                    >
                    <div class="flex items-center">
                      <div v-for="(sex, index) in sexArray" :key="index">
                        <q-radio
                          v-model="editUserInfo.sex"
                          :val="index"
                          :label="sex"
                          class="text-dark"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset
                class="q-pa-md q-mb-md"
                style="border: 2px solid #5f8d4e; border-radius: 5px"
              >
                <legend class="q-px-sm text-primary text-bold">
                  JOB INFORMATION
                </legend>
                <!-- Fourth Row -->
                <div class="row">
                  <div class="col">
                    <label class="text-primary text-weight-bold"
                      >Department <span class="text-negative">*</span></label
                    >
                    <q-select
                      v-model="editUserInfo.department"
                      dense
                      outlined
                      :options="departmentArray"
                      class="q-mt-xs"
                      @update:model-value="editChangeDepartment"
                    />
                  </div>

                  <div class="col q-ml-md">
                    <label class="text-primary text-weight-bold"
                      >Job Title <span class="text-negative">*</span></label
                    >
                    <q-input
                      dense
                      outlined
                      placeholder="ex. Doctor"
                      class="q-mt-xs"
                      v-model="editUserInfo.job_title"
                      :rules="[
                        (val) => (val && val.length > 0) || 'Required field',
                      ]"
                    />
                  </div>
                </div>

                <!-- Fifth Row -->
                <div class="row">
                  <div class="col">
                    <!-- Permission Level -->
                    <label class="text-primary text-weight-bold"
                      >Permission Level
                      <span class="text-negative">*</span></label
                    >
                    <q-select
                      v-model="editUserInfo.permission_level"
                      dense
                      outlined
                      :options="permissionArray"
                      class="q-mt-xs"
                      @update:model-value="editChangePermission"
                    />
                  </div>

                  <div class="col q-ml-md">
                    <!-- Status -->
                    <label class="text-primary text-weight-bold"
                      >Status <span class="text-negative">*</span></label
                    >

                    <q-select
                      v-model="editUserInfo.status"
                      dense
                      outlined
                      :options="statusList"
                      class="q-mt-xs"
                    />
                  </div>
                </div>
              </fieldset>

              <!-- Button for Modals -->
              <div class="flex justify-center items-center">
                <!-- Submit -->
                <q-btn
                  color="primary"
                  label="Submit"
                  type="submit"
                  no-caps
                  class="button-120 q-mr-xl"
                />
              </div>
            </q-form>
          </div>
        </q-card>
      </q-dialog>
    </div>

    <MHCDialog :content="$options.components.DeleteUserConfirmation" />
  </div>
</template>

<script src="../script/Manage-Users/ManageUsers"></script>

<style scoped lang="scss">
@import "../styles/meds&supplies/medicine_inventory.scss";
</style>
