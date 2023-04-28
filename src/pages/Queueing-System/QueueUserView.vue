<template>
  <div class="queuue q-px-lg">
    <div class="text-center q-mt-xl">
      <p class="text-weight-medium text-dark" style="font-size: 1.8rem">
        Now Serving
      </p>

      <q-btn
        v-if="keySession && keySession.department === 5"
        color="primary"
        :label="isHideButton ? 'Show Buttons' : 'Hide Buttons'"
        :icon="isHideButton ? 'visibility' : 'visibility_off'"
        class="fixed-top-right"
        @click="isHideButton = !isHideButton"
      />
    </div>

    <div class="queue-box q-mt-md q-pa-lg">
      <!-- Front Desk -->
      <div class="q-mb-lg">
        <div class="queue-front-desk shadow-5">
          <div class="bg-yellow-8 department">
            <p class="text-center text-white q-py-sm department">Front Desk</p>
          </div>
          <p class="queue-number text-center">
            {{
              currentQueue.Front_Desk != null
                ? currentQueue.Front_Desk.substring(0, 8) === "Priority"
                  ? currentQueue.Front_Desk
                  : "OPD" + currentQueue.Front_Desk
                : ""
            }}
          </p>
        </div>
        <div
          class="flex q-mt-md"
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
            @click="clearQueue(5)"
          />
        </div>
      </div>

      <!-- Doctor's Office -->
      <div class="q-mb-lg">
        <div class="queue-opd shadow-5">
          <div class="bg-yellow-8 department">
            <p class="text-center text-white q-py-sm department">
              Doctor's Office
            </p>
          </div>
          <p class="queue-number text-center">
            {{
              currentQueue.OPD != null
                ? currentQueue.OPD.substring(0, 8) === "Priority"
                  ? currentQueue.OPD
                  : "OPD" + currentQueue.OPD
                : ""
            }}
          </p>
        </div>
        <div
          class="flex q-mt-md"
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
        <div class="queue-dental shadow-5">
          <div class="bg-yellow-8 department">
            <p class="text-center text-white q-py-sm department">Dental</p>
          </div>
          <p class="queue-number text-center">
            {{
              currentQueue.Dental != null
                ? currentQueue.Dental.substring(0, 8) === "Priority"
                  ? currentQueue.Dental
                  : "DNTL" + currentQueue.Dental
                : ""
            }}
          </p>
        </div>
        <div
          class="flex q-mt-md"
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
        <div class="queue-prenatal shadow-5">
          <div class="department">
            <p class="text-center text-white q-py-sm">Prenatal</p>
          </div>
          <p class="queue-number text-center">
            {{
              currentQueue.Prenatal != null
                ? currentQueue.Prenatal.substring(0, 8) === "Priority"
                  ? currentQueue.Prenatal
                  : "PNL" + currentQueue.Prenatal
                : ""
            }}
          </p>
        </div>
        <div
          class="flex q-mt-md"
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
        <div class="queue-imzn shadow-5">
          <div class="bg-yellow-8 department">
            <p class="text-center text-white q-py-sm department">
              Immunization
            </p>
          </div>
          <p class="queue-number text-center">
            {{
              currentQueue.Immunization != null
                ? currentQueue.Immunization.substring(0, 8) === "Priority"
                  ? currentQueue.Immunization
                  : "IMZN" + currentQueue.Immunization
                : ""
            }}
          </p>
        </div>
        <div
          class="flex q-mt-md"
          style="width: 100%; justify-content: center"
          v-if="
            keySession && keySession.department === 5 && isHideButton === false
          "
        >
          <q-btn
            dense
            color="negative"
            label="CLEAR IMZN QUEUE"
            icon="delete"
            class="q-px-md"
            style="width: 100%"
            @click="clearQueue(7)"
          />
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
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  .queue-number {
    font-size: 40px;
    letter-spacing: 2px;
    font-weight: bold;
    color: #fff;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.15);
    text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
  }

  .department {
    font-size: 30px;
    letter-spacing: 2px;
    font-weight: 500;
    text-transform: uppercase;
    border-radius: 5px 5px 0px 0px;
  }

  .queue-front-desk {
    background-color: #f78bf7;
    height: 200px;
    border-radius: 5px;

    .department {
      background-color: #ee37ee;
    }
  }

  .queue-opd {
    background-color: #f1d356;
    height: 200px;
    border-radius: 5px;

    .department {
      background-color: #debb2a;
    }
  }
  .queue-dental {
    background-color: #4d96ff;
    height: 200px;
    border-radius: 5px;

    .department {
      background-color: #2977e8;
    }
  }

  .queue-prenatal {
    background-color: #e59494;
    height: 200px;
    border-radius: 5px;

    .department {
      background-color: #db6868;
    }
  }
  .queue-imzn {
    background-color: #7fa471;
    height: 200px;
    border-radius: 5px;

    .department {
      background-color: #3f8327;
    }
  }
}
.waiting-box {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  .box {
    display: inline-grid;
    border: 2px solid #548d4e;
    border-radius: 10px;
    height: 200px;
    justify-content: center;
    align-items: center;
  }
}

.queue-waiting {
  font-size: 4.5rem;
  letter-spacing: 2px;
  font-weight: bold;
  color: #fff;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.15);
  text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}
</style>
