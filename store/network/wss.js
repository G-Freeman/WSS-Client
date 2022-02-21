// Work only with WSS class
export const state = () => ({
	sockets: [],
	redraw: true
})

export const mutations = {
	add (state, socket) { state.sockets.push(socket.id); },
	del (state, socket) { delete state.sockets[socket.id]; },

	redraw (state) { state.redraw = !state.redraw; }
}

export const actions = {
	add ({commit}, socket) { commit('add', socket) },
	del ({commit}, socket) { commit('del', socket) },

	redraw ({commit}) { commit('redraw') }
}

export const getters = {
	sockets (state) { return state.sockets },
	redraw	(state) { return state.redraw }
}
