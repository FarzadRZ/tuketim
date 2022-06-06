export default {
    state() {
        return {
            itemsInDashboard: []
        }
    },
    mutations: {
        addItem(state, payload) {
            state.itemsInDashboard.push(payload)
        },
        removeItem(state, payload) {
            state.itemsInDashboard = state.itemsInDashboard.filter(item => item.id != payload.id)
        }
    },
    action: {

    }
}