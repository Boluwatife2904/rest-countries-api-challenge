<template>
  <header :class="{ light: !darkMode }">
   <router-link :to="{ name: 'Home' }">Where in the world?</router-link>
    <button class="theme-switcher" @click="toggle">
      <i class="bx bx-moon" :class="{ 'bxs-moon': darkMode }"></i>
      {{ darkMode ? "Dark Mode" : "Light Mode" }}
    </button>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["darkMode"]),
  },
  methods: {
    toggle() {
      this.$store.commit("toggle")
    },
  },
}
</script>

<style lang="scss">
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