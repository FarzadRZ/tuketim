<template>
  <div>
    <b-card class="bg-dark p-4 mb-4">
      <h5 class="mb-4">
        {{ `${machine.name} - ${machine.producer} ${machine.model}` }}
      </h5>
      <highcharts class="chart" :options="chartOptions"/>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connection: "",
      chartOptions: {
        chart: {
          type: "areaspline",
          backgroundColor: "#333",
          margin: 60,
        },
        title: "Power Consumption",
        xAxis: {
          type: "datetime",
          tickPixelInterval: 1000,
        },
        yAxis: {
          title: {
            text: "kWh",
          },
        },
        series: [
          {
            name: "Consumption",
            color: "var(--primary)",
            data: [],
          },
        ],
      },
    };
  },
  props: {
    machine: [Array, Object],
  },
  mounted() {
    // Setup Websocket Connection
    this.connection = new WebSocket("ws://localhost:5000/consumption/");
    console.log("Starting connection to WebSocket Server");

    // Connection Opened
    this.connection.addEventListener("open", () => {
      console.log("%c Connection Established! ", "color: #57eb39");
      this.fetchData(this.machine.id);
    });
    // Message Received
    this.connection.addEventListener("message", (resp) => {
      const response = JSON.parse(resp.data);
      this.updateUsage(response.usage);
    });
  },
  methods: {
    // Update Chart
    updateUsage(usage) {
      this.usage = usage;
      this.chartOptions.series[0].data.push({
        x: new Date().getTime(),
        y: usage,
      });

      // Show lastest 20 updates
      this.chartOptions.series[0].data =
        this.chartOptions.series[0].data.slice(-20);
    },

    // Send Machine ID and fetch consumption  data
    fetchData(id) {
      const data = { machine_id: id };
      this.connection.send(JSON.stringify(data));
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 300px;
}
</style>