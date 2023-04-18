<template>
  <div class="queuue q-px-lg">
    <div class="text-center q-mt-lg">
      <p class="text-weight-medium text-dark" style="font-size: 1.8rem">
        Now Serving
      </p>

      <q-btn
        color="primary"
        :label="isHideButton ? 'Show Buttons' : 'Hide Buttons'"
        :icon="isHideButton ? 'visibility' : 'visibility_off'"
        class="fixed-top-right q-mt-xl"
        @click="isHideButton = !isHideButton"
      />
    </div>

    <div class="queue-box q-mt-lg">
      <div>
        <div class="queue-opd q-pt-md">
          <p class="queue-number text-center">
            {{
              currentQueue.OPD != null
                ? "OPD" + currentQueue.OPD
                : "No Patients"
            }}
          </p>
          <div class="bg-yellow-8">
            <p class="text-center text-white q-py-sm department">Opd</p>
          </div>
        </div>
        <div
          class="flex"
          style="width: 100%; justify-content: center"
          v-if="
            keySession && keySession.department === 5 && isHideButton === false
          "
        >
          <q-btn
            dense
            color="negative"
            label="CLEAR OPD QUEUE"
            icon="delete"
            class="q-px-md"
            style="width: 100%"
            @click="clearQueue(1)"
          />
        </div>
      </div>

      <!-- Dental -->
      <div>
        <div class="queue-dental q-pt-md">
          <p class="queue-number text-center">
            {{
              currentQueue.Dental != null
                ? "DNTL" + currentQueue.Dental
                : "No Patients"
            }}
          </p>
          <div class="bg-yellow-8">
            <p class="text-center text-white q-py-sm department">Dental</p>
          </div>
        </div>
        <div
          class="flex"
          style="width: 100%; justify-content: center"
          v-if="
            keySession && keySession.department === 5 && isHideButton === false
          "
        >
          <q-btn
            dense
            color="negative"
            label="CLEAR Dental QUEUE"
            icon="delete"
            class="q-px-md"
            style="width: 100%"
            @click="clearQueue(2)"
          />
        </div>
      </div>

      <!-- Prenatal -->
      <div>
        <div class="queue-prenatal q-pt-md">
          <p class="queue-number text-center">
            {{
              currentQueue.Prenatal != null
                ? "PNL" + currentQueue.Prenatal
                : "No Patients"
            }}
          </p>
          <div class="department">
            <p class="text-center text-white q-py-sm">Prenatal</p>
          </div>
        </div>
        <div
          class="flex"
          style="width: 100%; justify-content: center"
          v-if="
            keySession && keySession.department === 5 && isHideButton === false
          "
        >
          <q-btn
            dense
            color="negative"
            label="CLEAR prenatal QUEUE"
            icon="delete"
            class="q-px-md"
            style="width: 100%"
            @click="clearQueue(3)"
          />
        </div>
      </div>

      <!-- Immunization -->
      <div>
        <div class="queue-imzn q-pt-md">
          <p class="queue-number text-center">
            {{
              currentQueue.Immunization != null
                ? "IMZN" + currentQueue.Immunization
                : "No Patients"
            }}
          </p>
          <div class="bg-yellow-8">
            <p class="text-center text-white q-py-sm department">
              Immunization
            </p>
          </div>
        </div>
        <div
          class="flex"
          style="width: 100%; justify-content: center"
          v-if="
            keySession && keySession.department === 5 && isHideButton === false
          "
        >
          <q-btn
            dense
            color="negative"
            label="CLEAR immunization QUEUE"
            icon="delete"
            class="q-px-md"
            style="width: 100%"
            @click="clearQueue(7)"
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
        <div class="box">
          <p class="queue-waiting text-primary text-center">
            {{
              waitingQueue.OPD != null && waitingQueue.OPD > 0
                ? waitingQueue.OPD
                : ""
            }}
          </p>
        </div>
        <div class="box">
          <p class="queue-waiting text-primary text-center">
            {{
              waitingQueue.Dental != null && waitingQueue.Dental > 0
                ? waitingQueue.Dental
                : ""
            }}
          </p>
        </div>
        <div class="box">
          <p class="queue-waiting text-primary text-center">
            {{
              waitingQueue.Prenatal != null && waitingQueue.Prenatal > 0
                ? waitingQueue.Prenatal
                : ""
            }}
          </p>
        </div>
        <div class="box">
          <p class="queue-waiting text-primary text-center">
            {{
              waitingQueue.Immunization != null && waitingQueue.Immunization > 0
                ? waitingQueue.Immunization
                : ""
            }}
          </p>
        </div>
      </div>
    </div>
    <MHCDialog :content="$options.components.ClearDepartmentQueueConfirm" />
  </div>
</template>

<script src="../script/Queueing-System/QueueUserView"></script>

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
    display: inline-grid;
    border: 2px solid #548d4e;
    height: 150px;
    justify-content: center;
    align-items: center;
  }
}

.queue-waiting {
  font-size: 2.5rem;
  letter-spacing: 2px;
  font-weight: bold;
  color: #fff;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.15);
  text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}
</style>
