<template>
  <div>
    <b-container class="mt-5 pt-5">
      <b-row class="justify-content-between">
        <b-col class="col-lg-3">
          <Sidebar />
        </b-col>
        <b-col class="col-lg-9">
          <div v-if="$store.state.itemsInDashboard.length">
            <div
              v-for="machine in $store.state.itemsInDashboard"
              :key="machine.id"
            >
              <Graph :machine="machine" />
            </div>
          </div>
          <b-card v-else class="text-center bg-dark p-4">
            <h4 class="mb-4">You haven't added any machines to dashboard yet</h4>
            <nuxt-link class="btn btn-primary" to="/machines/">
              Add machines
            </nuxt-link>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
