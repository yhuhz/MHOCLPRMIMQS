<template>
  <div class="queuue q-px-lg">
    <div class="text-center q-mt-lg">
      <p class="text-weight-medium text-dark" style="font-size: 1.8rem">
        Now Serving
      </p>
    </div>

    <div class="queue-box q-mt-lg">
      <!-- OPD -->
      <div>
        <div class="queue-opd q-pt-md">
          <div class="flex justify-end items-center">
            <q-btn
              round
              dense
              icon="eva-plus-outline"
              class="bg-white q-mr-lg"
            />
          </div>
          <p class="queue-number text-center">OPD2</p>
          <div class="bg-yellow-8">
            <p class="text-center text-white q-py-sm department">Opd</p>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <q-btn
            outline
            icon="arrow_back_ios"
            label="Previous"
            color="primary"
            no-caps
          />
          <q-btn
            icon-right="arrow_forward_ios"
            label="Next"
            color="primary"
            no-caps
          />
        </div>
      </div>

      <!-- Dental -->
      <div>
        <div class="queue-dental q-pt-md">
          <div class="flex justify-end items-center">
            <q-btn
              round
              dense
              icon="eva-plus-outline"
              class="bg-white q-mr-lg"
            />
          </div>
          <p class="queue-number text-center">DNTL5</p>
          <div class="bg-yellow-8">
            <p class="text-center text-white q-py-sm department">Dental</p>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <q-btn
            outline
            icon="arrow_back_ios"
            label="Previous"
            color="primary"
            no-caps
            style="width: 130px"
          />
          <q-btn
            icon-right="arrow_forward_ios"
            label="Next"
            color="primary"
            no-caps
            style="width: 130px"
          />
        </div>
      </div>

      <!-- Prenatal -->
      <div>
        <div class="queue-prenatal q-pt-md">
          <div class="flex justify-end items-center">
            <q-btn
              round
              dense
              icon="eva-plus-outline"
              class="bg-white q-mr-lg"
            />
          </div>
          <p class="queue-number text-center">PNL9</p>
          <div class="department">
            <p class="text-center text-white q-py-sm">Prenatal</p>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <q-btn
            outline
            icon="arrow_back_ios"
            label="Previous"
            color="primary"
            no-caps
            style="width: 130px"
          />
          <q-btn
            icon-right="arrow_forward_ios"
            label="Next"
            color="primary"
            no-caps
            style="width: 130px"
          />
        </div>
      </div>

      <!-- Immunization -->
      <div>
        <div class="queue-imzn q-pt-md">
          <div class="flex justify-end items-center">
            <q-btn
              round
              dense
              icon="eva-plus-outline"
              class="bg-white q-mr-lg"
            />
          </div>
          <p class="queue-number text-center">IMZN12</p>
          <div class="bg-yellow-8">
            <p class="text-center text-white q-py-sm department">
              Immunization
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <q-btn
            outline
            icon="arrow_back_ios"
            label="Previous"
            color="primary"
            no-caps
            style="width: 130px"
          />
          <q-btn
            icon-right="arrow_forward_ios"
            label="Next"
            color="primary"
            no-caps
            style="width: 130px"
          />
        </div>
      </div>
    </div>

    <!-- Waiting on queue -->
    <div class="q-mt-xl">
      <p
        class="text-center text-dark text-weight-medium"
        style="font-size: 1.8rem"
      >
        Waiting on Queue
      </p>

      <!-- Box -->
      <div class="waiting-box">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { GetQueue, QueueList } from "src/composables/Queue";

export default {
  setup() {
    GetQueue();

    return {};
  },
};
</script>

<style lang="scss" scoped>
.queue-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  .queue-number {
    font-size: 2.5rem;
    letter-spacing: 2px;
    font-weight: bold;
    color: #fff;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.15);
    text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
  }

  .department {
    font-size: 1.15rem;
    letter-spacing: 2px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .queue-opd {
    background-color: #f1d356;

    .department {
      background-color: #debb2a;
    }
  }
  .queue-dental {
    background-color: #4d96ff;

    .department {
      background-color: #2977e8;
    }
  }

  .queue-prenatal {
    background-color: #e59494;

    .department {
      background-color: #db6868;
    }
  }
  .queue-imzn {
    background-color: #7fa471;

    .department {
      background-color: #3f8327;
    }
  }
}
.waiting-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  .box {
    border: 2px solid #548d4e;
    height: 200px;
  }
}
</style>
