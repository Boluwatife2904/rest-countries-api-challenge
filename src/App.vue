<template>
  <header :class="{ light: !reactive.darkMode }">
    <h6>Where in the world?</h6>
    <button class="theme-switcher" @click="toggleDarkMode">
      <i class="bx bx-moon" :class="{ 'bxs-moon': reactive.darkMode }"></i>
      {{ reactive.darkMode ? "Dark Mode" : "Light Mode" }}
    </button>
  </header>
  <router-view />
</template>


<script>
export default {
  provide() {
    return {
      reactive: this.reactive,
    };
  },
  data() {
    return {
      reactive: {
        darkMode: true,
      },
    };
  },
  methods: {
    toggleDarkMode() {
      this.reactive.darkMode = !this.reactive.darkMode;
    },
  },
};
</script>

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

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: hsl(209, 23%, 22%);
  padding: 25px 60px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0);
  transition: all 0.5s ease-in-out;

  h6 {
    color: #fff;
    font-size: 18px;
  }

  button {
    display: flex;
    align-items: center;
    color: #fff;
    outline: none;
    border: none;
    background: none;
    font: inherit;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;

    i {
      font-size: 15px;
      margin-top: -2px;
      margin-right: 5px;
    }
  }

  &.light {
    background: hsl(0, 0%, 100%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);

    button,
    h6 {
      color: hsl(200, 15%, 8%);
    }
  }

  @media screen and (max-width: 768px) {
    padding: 25px 20px;
  }
}
</style>
