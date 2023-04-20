<template>
  <div class="queuue q-px-lg">
    <div class="text-center q-mt-lg">
      <p class="text-weight-medium text-dark" style="font-size: 1.8rem">
        Now Serving
      </p>
    </div>

    <div class="queue-box q-mt-lg q-mb-xl">
      <div class="q-mb-xl">
        <div class="queue-opd shadow-5">
          <div class="bg-yellow-8 department">
            <p class="text-center text-white q-py-sm department">Opd</p>
          </div>
          <p class="queue-number text-center">
            {{
              currentQueue.OPD != null
                ? currentQueue.OPD.substring(0, 8) === "Priority"
                  ? currentQueue.OPD
                  : "OPD" + currentQueue.OPD
                : "No Patients"
            }}
          </p>
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
                : "No Patients"
            }}
          </p>
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
                : "No Patients"
            }}
          </p>
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
                : "No Patients"
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- Waiting on queue -->
    <div class="q-mt-xl">
      <p
        class="text-center text-dark text-weight-medium"
        style="font-size: 1.8rem"
      >
        Number of Patients Waiting on Queue
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
  </div>
</template>

<script src="../script/Queueing-System/QueueView"></script>

<style lang="scss" scoped>
.queue-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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
  grid-template-columns: repeat(4, 1fr);
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
