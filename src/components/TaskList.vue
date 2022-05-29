<template>
  <div class="task-list">
    <div class="container">
      <template v-if="Object.keys(this.getTaskList).length">
        <ul class="task-list__grid">
          <li
            v-for="(task, index) in this.getTaskList"
            :key="task.id"
            class="task-list__item"
            :style="{ backgroundColor: checkStatusForColor(task.status) }"
            :class="{
              'task-list__item_in-work': task.status === 'inWork',
              'task-list__item_done': task.status === 'done',
            }"
          >
            <h2 class="task-list__title">
              {{ task.title }}
            </h2>
            <p class="task-list__status">
              {{ checkStatusForText(task.status) }}
            </p>
            <p class="task-list__task">
              <span>
                {{ task.task }}
              </span>
              <template v-if="task.status === 'inWork'">
                <span
                  ref="time"
                  v-on:ready="childReady = true"
                  class="task-list__timer timer"
                >
                  {{ runTimer(task.time, index) }}
                  <span class="timer-days"></span>
                  <span class="timer-hours"></span>
                  <span class="timer-minutes"></span>
                  <span class="timer-seconds"></span>
                </span>
              </template>
            </p>
            <router-link
              :to="{ name: 'taskInfo', params: { id: `${task.id}` } }"
              class="task-list__link"
            >
              Подробнее
            </router-link>
          </li>
        </ul>
      </template>
      <template v-else>
        <h2 class="task-list__empty-task">Список задач пуст &#128579;</h2>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mixins from "../mixins/mixins";

export default {
  name: "TaskList",
  mixins: [mixins],
  computed: {
    ...mapGetters(["getTaskList"]),
  },
  methods: {
    checkStatusForColor(item) {
      switch (item) {
        case "inWork":
          return "#282136";
        case "overdue":
          return "#fe2852";
        case "done":
          return "#99ff99";
      }
    },
    checkStatusForText(item) {
      switch (item) {
        case "inWork":
          return "В работе";
        case "overdue":
          return "Просрочена";
        case "done":
          return "Выполнена";
      }
    },
  },
};
</script>

<style scoped>
.task-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(270 / 16 * 1rem), 1fr));
  grid-template-rows: auto;
  gap: 2rem;
}

.task-list__item {
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.task-list__item::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transition-property: background, box-shadow;
  transition-duration: 0.6s;
}

.task-list__link {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: bold;
  transition-property: opacity, transform;
  transition-duration: 0.6s;
}

.task-list__item:hover:after {
  background-color: rgba(40, 33, 54, 0.9);
  box-shadow: 0.1rem 0.1rem 0.5rem #fe2852, -0.1rem -0.1rem 0.5rem #fe2852;
}

.task-list__item:hover .task-list__link {
  opacity: 1;
}

.task-list__link::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.task-list__item_in-work:hover:after {
  background-color: rgba(254, 40, 82, 0.9);
}

.task-list__item_in-work {
  box-shadow: 0.1rem 0.1rem 0.5rem #fe2852, -0.1rem -0.1rem 0.5rem #fe2852;
}

.task-list {
  padding-top: 5rem;
}

.task-list__title,
.task-list__status,
.task-list__task {
  color: white;
}

.task-list__title {
  text-align: end;
  margin-bottom: 2rem;
}

.task-list__status {
  text-transform: lowercase;
  letter-spacing: 0.1rem;
  margin-bottom: 1rem;
}

.task-list__task {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.task-list__task span {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: unset;
  white-space: nowrap;
  flex: 0 0 50%;
}

.task-list__timer {
  letter-spacing: 0.1rem;
  text-align: end;
}

.task-list__timer span {
  padding: 0 0.2rem;
}

.task-list__item_done {
  box-shadow: 0.1rem 0.1rem 0.5rem #99ff99, -0.1rem -0.1rem 0.5rem #99ff99;
}

.task-list__item_done > * {
  color: #fe2852;
}

.task-list__empty-task {
  text-align: center;
  color: white;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
}
</style>