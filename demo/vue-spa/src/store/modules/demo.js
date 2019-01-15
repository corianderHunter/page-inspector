const demo = {
  state: {
    info: null,
  },
  mutations: {
    setInfo(state, value) {
      state.info = value;
    }
  },
  actions: {
    setInfo(context, value) {
      context.commit('setInfo', value);
    }
  }
};

export default demo;
