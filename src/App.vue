<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Auto CRUD Table</h1>
    <div class="table-wrapper">
      <auto-table url="http://59f8db64d4d1700012b76310.mockapi.io/users" ></auto-table>
    </div>
  </div>
</template>

<script>
import AutoTable from "./components/AutoTable.vue";

export default {
  name: "app",
  components: { AutoTable }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

.table-wrapper {
  display: inline-block;
}
</style>
