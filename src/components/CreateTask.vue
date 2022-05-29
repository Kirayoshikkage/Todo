<template>
  <div class="create-task">
    <div class="container create-task__container">
      <h1 class="lead">Edit task</h1>
      <form
        ref="form"
        @submit.prevent="submitForm"
        action="#"
        class="create-task__form"
      >
        <div ref="alert" class="alert">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5163 8.93451L11.0597 14.7023L8.0959 11.8984"
              stroke-width="2"
            />
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke-width="2"
            />
          </svg>
        </div>
        <label class="create-task__label">
          <p class="create-task__placeholder">Title</p>
          <input
            @focus="placeholderAnimation"
            @blur="placeholderAnimation"
            type="text"
            name="title"
            class="create-task__input"
            required
          />
        </label>
        <label class="create-task__label">
          <p class="create-task__placeholder">Task</p>
          <input
            @focus="placeholderAnimation"
            @blur="placeholderAnimation"
            type="text"
            name="task"
            class="create-task__input"
            required
          />
        </label>
        <label class="create-task__label create-task__label_time">
          <p class="create-task__placeholder create-task__placeholder_time">
            Time
          </p>
          <input
            type="datetime-local"
            name="time"
            class="create-task__input create-task__input_time"
            required
          />
        </label>
        <div class="create-task__buttons">
          <button
            class="create-task__button create-task__button_reset"
            type="button"
            @click="this.$refs.form.reset()"
          >
            Reset
          </button>
          <button
            class="create-task__button create-task__button_submit"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import mixins from "../mixins/mixins.js";

export default {
  name: "CreateTask",
  mixins: [mixins],
  methods: {
    submitForm() {
      let alert = this.$refs.alert;

      alert.classList.add("alert_active");

      setTimeout(() => {
        alert.classList.remove("alert_active");
      }, 1000);

      this.$store.dispatch(
        "updateTaskList",
        this.dataCollectionFromForm(this.$refs.form)
      );
    },
    placeholderAnimation(e) {
      let prevItem = e.target.previousSibling;

      if (e.target.value != "") {
        return;
      }

      prevItem.classList.toggle("create-task__placeholder_animation");
    },
  },
};
</script>

<style scoped>
.create-task__container {
  box-shadow: 0.1rem 0.1rem 0.5rem #fe2852, -0.1rem -0.1rem 0.5rem #fe2852;
  border-radius: 0.2rem;
  padding: 3rem;
  position: relative;
}

.create-task {
  height: calc(100% - 5.125rem);
  display: flex;
  justify-content: center;
  align-items: center;
}

.create-task__form {
  display: flex;
  flex-direction: column;
}

.lead {
  margin-bottom: 3rem;
  color: white;
  letter-spacing: 0.1rem;
}

.create-task__label {
  border-bottom: 0.1rem solid white;
  padding-bottom: 0.5rem;
  position: relative;
  margin-bottom: 5rem;
}

.create-task__label_time {
  margin-bottom: 10rem;
}

.create-task__placeholder {
  color: #fe2852;
  letter-spacing: 0.2rem;
  font-size: 0.8rem;
  font-weight: bold;
}

.create-task__placeholder:not(.create-task__placeholder_time) {
  transition: transform 0.6s;
  transform: translateY(100%);
}

.create-task__input {
  min-width: 400px;
  color: white;
}

.create-task__buttons {
  display: flex;
  gap: 2rem;
}

.create-task__button {
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  flex: 1 1 50%;
  color: white;
  font-weight: bold;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.8rem;
  transition-property: background, border;
  transition-duration: 0.4s;
  border: 0.1rem solid transparent;
}

.create-task__button_reset:hover,
.create-task__button_reset:focus {
  background-color: #fe2852;
}

.create-task__button_submit:hover,
.create-task__button_submit:focus {
  background-color: transparent;
}

.create-task__button_submit {
  background-color: #fe2852;
  border: 0.1rem solid #fe2852;
}

.create-task__placeholder_animation {
  transform: translate(0) !important;
}

.alert {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.alert svg {
  width: 2rem;
  height: 2rem;
  stroke: #99ff99;
  opacity: 0;
  transform: translateY(-50%);
  transition-property: transform, opacity;
  transition-duration: 0.6s;
}

.alert_active svg {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 48rem) {
  .create-task__input {
    min-width: 100%;
  }
}

@media (max-width: 26.5rem) {
  .create-task__input {
    min-width: 100%;
  }
  .create-task__container {
    padding: 2rem;
    margin: 0 1rem;
    max-width: 100%;
  }
  .create-task__buttons {
    flex-wrap: wrap;
  }
  .create-task__label {
    margin-bottom: 2rem;
  }

  .create-task__label_time {
    margin-bottom: 5rem;
  }
}
</style>