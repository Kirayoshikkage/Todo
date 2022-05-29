import {
  createRouter,
  createWebHistory
} from "vue-router";

import Header from '../components/Header.vue';
import CreateTask from '../components/CreateTask.vue';
import TaskList from '../components/TaskList.vue';
import TaskInfo from '../components/TaskInfo.vue';

const routes = [{
    name: 'main',
    path: '/',
    components: {
      'header': Header,
      'main': CreateTask
    }
  }, {
    name: 'taskList',
    path: '/task-list',
    components: {
      'header': Header,
      'main': TaskList
    }
  },
  {
    name: 'taskInfo',
    path: '/task-info/:id',
    props: true,
    components: {
      'header': Header,
      'main': TaskInfo
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;