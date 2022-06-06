<template>
  <div>
    <b-container class="mt-5 pt-5">
      <b-row class="justify-content-between">
        <b-col class="col-lg-3">
          <Sidebar />
        </b-col>
        <b-col class="col-lg-9">
          <b-card class="bg-dark p-4">
            <h4 class="mb-4">
              <nuxt-link to="/">Dashboard</nuxt-link>
              <span>&gt;</span>
              <span class="text-white">Machines</span>
            </h4>
            <div v-if="error">
              <div v-html="error" />
            </div>
            <div v-else>
              <b-table-simple dark hover>
                <b-thead>
                  <b-tr>
                    <b-th class="table__head">ID</b-th>
                    <b-th class="table__head">Name</b-th>
                    <b-th class="table__head">Producer</b-th>
                    <b-th class="table__head">Model</b-th>
                    <b-th class="table__head">Serial</b-th>
                    <b-th class="table__head">Actions</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="item in machines" :key="item.id">
                    <b-td v-for="td in item" :key="td"><span class="table__item">{{ td }}</span></b-td>
                    <b-td>
                      <b-button
                        v-if="exisitng(item)"
                        variant="danger"
                        @click.prevent="removeItem(item)"
                      >
                        Remove
                      </b-button>
                      <b-button
                        v-else
                        variant="primary"
                        @click.prevent="addItem(item)"
                      >
                        Add
                      </b-button>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      machines: null,
      error: null,
    };
  },
  async fetch() {
    try {
      // Fetch Machines
      const machines = await this.$axios.get(`${this.$config.api}/machines`);
      this.machines = machines.data;
    } catch (error) {
      // Handle error
      this.error =
        "Please make sure the backend is running. More information at <a href='https://gitlab.com/iqvizyon/iqv-front-challenge/-/tree/master/'>https://gitlab.com/iqvizyon/iqv-front-challenge/-/tree/master/</a>";
    }
  },
  methods: {
    // check if item exists
    exisitng(machine) {
      return this.$store.state.itemsInDashboard.filter(
        (item) => item.id == machine.id
      ).length;
    },

    // Add item to vuex  store
    addItem(machine) {
      this.$store.commit("addItem", machine);
    },

    // remove item from vuex store
    removeItem(machine) {
      this.$store.commit("removeItem", machine);
    },
  },
};
</script>

<style lang="scss">
.btn {
  font-size: 14px;
}

.table {
  &__item {
    font-size: 14px;
  }
}
</style>