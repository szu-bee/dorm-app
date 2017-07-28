<template>
  <div id="top-bar">
    <router-link to="/"><img src="../assets/szu.transformed.png" alt="logo"></router-link>
    <h1>International Student Apartment booking system</h1>
  </div>
</template>

<style lang="less" scoped>
  #top-bar {
    display: flex;
    justify-content: space-around;
    padding: 8px 0;
    background-color: #9d004f;
    background-color: rgb(32, 160, 255);

    h1 {
      padding: 12px 120px 8px 0;
      font-family: serif, Helvetica, sans-serif;
      font-size: 2.4em;
      color: white;
    }
  }
</style>
