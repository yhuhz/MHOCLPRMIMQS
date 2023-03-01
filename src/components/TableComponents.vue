<template>
  <div class="q-mt-xl">
    <q-table
      :columns="columns"
      :rows="rows"
    >

    <!-- Export Button -->
      <!-- <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          />
      </template> -->

      <template v-slot:body-cell-action>
        <q-td>
          <q-btn
          label="See More"
          color="primary"
          no-caps
          dense
          size="sm"
          padding="6px 20px"
        />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  setup() {

    const columns = [
      {
        name: 'patientID', align: 'left', label: 'Patient ID', field: 'patientID', sortable: true
      },
      {
        name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true
      },
      {
        name: 'household', align: 'left', label: 'Household', field: 'household', sortable: true
      },
      {
        name: 'sex', align: 'left', label: 'Sex', field: 'sex', sortable: true
      },
      {
        name: 'age', align: 'left', label: 'Age', field: 'age', sortable: true
      },
      {
        name: 'barangay', align: 'left', label: 'Barangay', field: 'barangay', sortable: true
      },
      {
        name: 'action', align: 'left', label: 'Action', field: '', sortable: false
      }
    ]

    const rows = [
      {
        patientID: '12A',
        name: 'John Doe',
        sex: 'M',
        age: 20,
        barangay: 'Baligang'
      },
      {
        patientID: '12B',
        name: 'Jane Doe',
        sex: 'F',
        age: 21,
        barangay: 'Baligang'
      }
    ]

    return {
      columns,
      rows
    }
  }
}
</script>

<style scoped>
</style>
