<template>
  <header class="header">
    <div class="container header__container">
      <template v-if="$route.name == 'main'">
        <router-link
          class="header__link header__link_text-right"
          :to="{ name: 'taskList' }"
        >
          Перейти к списку задач
        </router-link>
      </template>
      <template v-else-if="$route.name == 'taskList'">
        <router-link class="header__link" :to="{ name: 'main' }">
          Перейти к созданию новой задачи
        </router-link>
      </template>
      <template v-else-if="$route.name == 'taskInfo'">
        <router-link class="header__link" :to="{ name: 'taskList' }">
          Перейти к списку задач
        </router-link>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  background-color: #fe2852;
}

.header__container {
  padding: 2rem;
}

.header__link {
  display: block;
  color: white;
  letter-spacing: 0.2rem;
  font-weight: bold;
  transition: color 0.4s;
}

.header__link:hover,
.header__link:focus {
  color: #282136;
}

.header__link_text-right {
  text-align: right;
}
</style>