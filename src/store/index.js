import {
  createStore
} from "vuex";

export default createStore({
  state: {
    taskList: {}
  },
  mutations: {
    UPDATE_TASK_LIST(state, data) {
      state.taskList[data.id] = data;

      localStorage.setItem('taskList', JSON.stringify(state.taskList));
    },
    UNLOAD_DATA_IN_TASK_LIST(state, data) {
      state.taskList = data || {};
    }
  },
  actions: {
    updateTaskList({
      commit
    }, data) {
      commit('UPDATE_TASK_LIST', data);
    },
    unloadDataInTaskList({
      commit
    }) {
      let data = JSON.parse(localStorage.getItem("taskList"));
      commit('UNLOAD_DATA_IN_TASK_LIST', data);
    }
  },
  getters: {
    getTaskList(state) {
      return state.taskList;
    },
    getTaskById: (state) => (id) => state.taskList[id],
  }
});