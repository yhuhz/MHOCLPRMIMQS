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
      <div class="q-px-lg">
        <div class="flex items-baseline justify-between q-mb-sm">
          <q-btn
            icon-right="keyboard_arrow_down"
            flat
            dense
            no-caps
            label="Pending"
            color="primary"
          />

          <q-select
            borderless
            dense
            input-class="text-primary text-bold"
            :options="pendingDateArray"
            v-model="selectedPendingDate"
            style="min-width: 100px"
          />
        </div>
        <q-separator color="primary" style="width: 100%" />
      </div>
    </div>

    <MHCDialog :content="$options.components.DeleteMedicineConfirmation" />
  </div>
</template>

<script src="../script/Meds&Supplies/MedicineRelease"></script>

<style scoped lang="scss">
@import "../styles/meds&supplies/medicine_inventory.scss";
</style>
