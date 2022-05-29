<template>
  <div class="task-info">
    <div class="container task-info__container">
      <div class="task-info__item">
        <div class="task-info__status-task">
          <div class="task-info__status-icon">
            <template v-if="task.status === 'inWork'">
              <svg
                data-name="Layer 1"
                id="Layer_1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title />
                <path
                  d="M18,5V3a1,1,0,0,0-2,0V5H8V3A1,1,0,0,0,6,3V5H2V21H22V5Zm2,14H4V7H20Zm-7-9H11v2h2Zm4,0H15v2h2ZM9,14H7v2H9Zm4,0H11v2h2Z"
                />
              </svg>
              <p class="task-info__status-text">В работе</p>
            </template>
            <template v-else-if="task.status === 'overdue'">
              <svg
                data-name="Layer 1"
                id="Layer_1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title />
                <path
                  d="M18,5V3a1,1,0,0,0-2,0V5H8V3A1,1,0,0,0,6,3V5H2V21H22V5Zm2,14H4V7H20Zm-9.87-3L12,14.13,13.87,16,15,14.87,13.13,13,15,11.13,13.87,10,12,11.87,10.13,10,9,11.13,10.87,13,9,14.87Z"
                />
              </svg>
              <p class="task-info__status-text">Просрочена</p>
            </template>
            <template v-else>
              <svg
                data-name="Layer 1"
                id="Layer_1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title />
                <path
                  d="M18,5V3a1,1,0,0,0-2,0V5H8V3A1,1,0,0,0,6,3V5H2V21H22V5Zm2,14H4V7H20Zm-3.94-7.58-1.2-1.2L11.3,13.78,9.14,11.63l-1.2,1.2,3.36,3.36Z"
                />
              </svg>
              <p class="task-info__status-text">Выполнена</p>
            </template>
          </div>
          <template v-if="task.status === 'inWork'">
            <span
              ref="time"
              v-on:ready="childReady = true"
              class="task-info__timer timer"
            >
              {{ runTimer(task.time, task.id) }}
              <span class="timer-days"></span>
              <span class="timer-hours"></span>
              <span class="timer-minutes"></span>
              <span class="timer-seconds"></span>
            </span>
          </template>
        </div>
        <form
          ref="form"
          @submit.prevent="submitForm"
          action="#"
          class="task-info__form"
        >
          <label
            class="task-info__label"
            :class="{ 'task-info__label_active': !inputLock }"
          >
            <p class="task-info__placeholder">Заголовок:</p>
            <input
              :disabled="inputLock"
              v-model="this.task.title"
              type="text"
              name="title"
              required
              class="task-info__input"
            />
          </label>
          <label
            class="task-info__label"
            :class="{ 'task-info__label_active': !inputLock }"
          >
            <p class="task-info__placeholder">Задача:</p>
            <input
              :disabled="inputLock"
              v-model="this.task.task"
              type="text"
              name="task"
              required
              class="task-info__input"
            />
          </label>
          <label
            class="task-info__label"
            :class="{ 'task-info__label_active': !inputLock }"
          >
            <p class="task-info__placeholder">Дата создания:</p>
            <input
              :disabled="inputLock"
              v-model="this.task.time"
              type="datetime-local"
              name="time"
              required
              class="task-info__input create-task__placeholder_time"
            />
          </label>
          <template v-if="this.task.status !== 'done'">
            <label
              class="task-info__label-checkbox"
              :class="{ 'task-info__label-checkbox_disabled': inputLock }"
            >
              <input
                ref="checkbox"
                type="checkbox"
                name="doneTask"
                class="task-info__checkbox"
                :disabled="inputLock"
              />
              Отметить задачу выполненной
            </label>
            <div class="task-info__buttons">
              <button
                :disabled="inputLock"
                type="submit"
                class="task-info__submit"
              >
                Подвердить
              </button>
              <button
                @click="this.inputLock = !this.inputLock"
                type="button"
                class="task-info__edit"
              >
                Редактировать
              </button>
            </div>
            <button
              class="task-info__cancel-edit"
              @click="cancelEdit"
              :class="{ 'task-info__cancel-edit__show': !inputLock }"
              type="button"
            >
              Отменить изменения
            </button>
          </template>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins/mixins.js";

export default {
  mixins: [mixins],
  created() {
    this.task = this.$store.getters.getTaskById(this.id);
    this.taskCopy = JSON.parse(JSON.stringify(this.task));
  },
  name: "TaskInfo",
  props: ["id"],
  data: () => ({
    task: {},
    taskCopy: {},
    inputLock: true,
  }),
  methods: {
    submitForm() {
      let value = this.dataCollectionFromForm(this.$refs.form);
      value.id = this.task.id;

      if (this.$refs.checkbox.checked) {
        value.status = "done";
      }

      this.$router.push({ name: "taskList" });

      this.$store.dispatch("updateTaskList", value);
    },
    cancelEdit() {
      Object.keys(this.task).forEach((item) => {
        this.task[item] = this.taskCopy[item];
      });

      this.inputLock = !this.inputLock;
    },
  },
};
</script>

<style scoped>
.task-info {
  height: calc(100% - 5.125rem);
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-info__container {
  width: 100%;
}

.task-info__item {
  max-width: 50%;
  margin: 0 auto;
}

.task-info__status-task {
  padding: 2rem;
  box-shadow: 0.1rem 0.1rem 0.5rem #fe2852, -0.1rem -0.1rem 0.5rem #fe2852;
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-info__form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #fe2852;
  border-radius: 0 0 0.5rem 0.5rem;
}

.task-info__status-icon {
  display: flex;
  align-items: flex-end;
}

.task-info__status-text {
  color: white;
  letter-spacing: 0.2rem;
  transform: translateY(-0.3rem);
}

.task-info__status-icon svg {
  width: 3.5rem;
  height: 3.5rem;
  fill: white;
  margin-right: 1rem;
}

.task-info__timer {
  color: white;
  font-size: 2rem;
  letter-spacing: 0.2rem;
}

.task-info__timer span {
  padding: 0 0.2rem;
}

.task-info__input {
  color: white;
  font-weight: bold;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  font-size: 1;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  width: 100%;
  transition: box-shadow 0.6s;
}

.task-info__placeholder {
  color: rgba(40, 33, 54, 1);
  transition: margin 0.6s;
}

.task-info__label_active .task-info__input {
  box-shadow: 0.1rem 0.1rem 0.5rem rgb(40, 33, 54),
    -0.1rem -0.1rem 0.5rem rgb(40, 33, 54);
}

.task-info__label_active .task-info__placeholder {
  margin-bottom: 1rem;
}

.task-info__buttons {
  margin-top: 3rem;
  display: flex;
  gap: 1rem;
}

.task-info__buttons button {
  transition-property: background-color, box-shadow;
  transition-duration: 0.4s;
}

.task-info__edit:hover {
  box-shadow: 0.1rem 0.1rem 0.5rem rgb(40, 33, 54),
    -0.1rem -0.1rem 0.5rem rgb(40, 33, 54);
}

.task-info__buttons button {
  padding: 1rem;
  color: white;
  letter-spacing: 0.2rem;
  cursor: pointer;
  border-radius: 0.2rem;
  background-color: rgba(40, 33, 54, 1);
  flex: 1 1 auto;
}

.task-info__submit:disabled {
  cursor: no-drop;
}

.task-info__buttons .task-info__submit {
  box-shadow: 0.1rem 0.1rem 0.5rem rgb(40, 33, 54),
    -0.1rem -0.1rem 0.5rem rgb(40, 33, 54);
  background-color: transparent;
}

.task-info__submit:hover {
  background-color: rgb(40, 33, 54);
}

.task-info__cancel-edit {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  opacity: 0;
  transform: translateY(-100%);
  transition-property: opacity, transform, color;
  transition-duration: 0.6s;
}

.task-info__cancel-edit:hover {
  color: rgb(40, 33, 54);
}

.task-info__cancel-edit__show {
  opacity: 1;
  transform: translateY(0);
}

.task-info__label-checkbox {
  margin-top: 1rem;
  color: white;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: color 0.4s;
}

.task-info__label-checkbox:hover {
  color: rgb(40, 33, 54);
}

.task-info__checkbox {
  margin-right: 0.5rem;
  cursor: pointer;
}

.task-info__checkbox:disabled,
.task-info__label-checkbox_disabled {
  cursor: no-drop;
}

@media (max-width: 64rem) {
  .task-info__item {
    max-width: 70%;
  }
}

@media (max-width: 48rem) {
  .task-info__item {
    max-width: 100%;
  }
}

@media (max-width: 26.5rem) {
  .task-info__buttons {
    flex-wrap: wrap;
  }

  .task-info__input {
    letter-spacing: 0;
  }

  .task-info__status-task {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
}
</style>