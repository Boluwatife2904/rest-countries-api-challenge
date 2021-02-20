<template>
  <header :class="{ light: !reactive.darkMode }">
   <router-link :to="{ name: 'Home' }">Where in the world?</router-link>
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
      localStorage.setItem("reactive", JSON.stringify(this.reactive));
    },
  },
  created() {
    const dark = JSON.parse(localStorage.getItem("reactive"));
    this.reactive.darkMode = dark.darkMode;
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.3s !important;
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
  transition: all 0.3s;

  a {
    color: #fff;
    font-size: 18px;
    text-decoration: none;
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
    a {
      color: hsl(200, 15%, 8%);
    }
  }

  @media screen and (max-width: 768px) {
    padding: 25px 20px;
  }
}
</style>
