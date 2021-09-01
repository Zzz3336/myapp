<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import MainVue from "./components/main.vue";
export default {
  name: "App",
  components: {
    MainVue
  }
  // mounted() {
  //   var url = "http://localhost:3000";
  //   this.$axios.post(url + "/products").then(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }
};
</script>

<style>
</style>
