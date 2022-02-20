export const state = () => ({
  test: 'test store string'
})

export const mutations = {
  test(state:any, val:string) { state.test = val; }
}

export const actions = {
  test({commit}:any, val:string) { commit('test', val) }
}

export const getters = {
  test(state:any) { return state.test }
}
