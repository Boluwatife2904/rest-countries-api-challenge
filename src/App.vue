<template>
  <header>
    <h6>Where in the world?</h6>
    <div class="theme-switcher">
      <h6>Dark Mode</h6>
    </div>
  </header>
  <router-view/>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Nunito Sans", sans-serif;
}

#app {
  color: #2c3e50;
  // background-color: #35495e;
}

</style>
