<template>
  <router-view name="header"></router-view>
  <router-view name="main"></router-view>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("unloadDataInTaskList");
  },
};
</script>

<style>
html,
body {
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
  border: none;
  background-color: transparent;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  word-wrap: break-word;
}

body {
  background-color: #282136;
}

.container {
  max-width: calc(1400 / 16 * 1rem);
  padding: 0 1rem;
  margin: 0 auto;
}

#app {
  height: 100%;
}
</style>
