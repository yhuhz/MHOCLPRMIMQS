<template>
  <div class="login">
    <label>User Login</label>
    <q-input v-model="loginForm.username" label="Username" />
    <q-input
      v-model="loginForm.password"
      :type="isPwd ? 'password' : 'text'"
      label="Password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-btn class="q-my-md" color="black" label="Login" @click="login()" />
  </div>

  <div class="add_user q-mt-xl">
    <q-form ref="addUserForm">
      <label>Add User</label>
      <q-input
        v-model="addForm.first_name"
        label="First Name"
        :rules="[(val) => (val !== null && val !== '') || '']"
      />
      <q-input v-model="addForm.middle_name" label="Middle Name" />
      <q-input
        v-model="addForm.last_name"
        label="Last Name"
        :rules="[(val) => (val !== null && val !== '') || '']"
      />
      <q-input v-model="addForm.suffix" label="Suffix" />
      <q-select
        placeholder="Select Department"
        v-model="addForm.department"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        option-label="dept_name"
        option-value="dept_id"
        :options="Departments"
        :rules="[(val) => (val !== null && val !== '') || '']"
        hide-bottom-space
        popup-content-class="option-style"
        options-selected-class="selected-class"
        transition-show="scale"
        transition-hide="scale"
      />

      <q-select
        placeholder="Permission Level"
        v-model="addForm.permission_level"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        option-label="label"
        option-value="id"
        :options="pl_options"
        :rules="[(val) => (val !== null && val !== '') || '']"
        hide-bottom-space
        popup-content-class="option-style"
        options-selected-class="selected-class"
        transition-show="scale"
        transition-hide="scale"
      />

      <q-btn
        class="q-my-md"
        color="black"
        label="Login"
        @click="createUser()"
      />
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar, date } from "quasar";
import {
  LoginUser,
  Departments,
  SetDepartments,
  UsersList,
  AddUser,
} from "src/composables/Login";

export default {
  /* eslint-disable */
  name: "Login",
  setup() {
    SetDepartments();
    let isPwd = ref(true);
    let loginForm = ref({
      username: ref(),
      password: ref(),
    });

    const login = () => {
      // console.log(loginForm.value);
      LoginUser(loginForm.value).then((response) => {
        if (response.status === "success") {
          console.log("login success");
        } else {
          console.log("login error");
        }
      });
    };

    var currentdate = new Date();
    var datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate();

    let pl_options = [
      { id: 1, label: "Admin Access" },
      { id: 2, label: "Edit and View" },
      { id: 1, label: "View Only" },
    ];

    const addUserForm = ref(null);

    let addForm = ref({
      first_name: ref(),
      last_name: ref(),
      middle_name: ref(),
      suffix: ref(),
      department: ref(),
      permission_level: ref(),
    });

    const createUser = () => {
      addUserForm.value.validate().then((success) => {
        if (success) {
          let form = ref({
            first_name: addForm.value.first_name,
            middle_name: addForm.value.middle_name,
            last_name: addForm.value.last_name,
            suffix: addForm.value.suffix,
            department: addForm.value.department.dept_id,
            permission_level: addForm.value.permission_level.id,
            date_added: datetime,
          });
          console.log(form.value);

          AddUser(form.value).then((response) => {
            if (response.status === "success") {
              console.log("User successfully Added");
            } else {
              console.log("Failed to add user");
            }
          });
        }
      });
    };

    return {
      isPwd,
      loginForm,
      login,
      addUserForm,
      addForm,
      pl_options,
      createUser,
      Departments,
    };
  },
};
</script>

<style lang="scss" scoped></style>
