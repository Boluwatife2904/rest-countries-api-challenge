<template>
  <teleport to="body">
    <div class="backdrop" :class="{ light: !darkMode }">
      <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["darkMode"]),
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: hsl(207, 26%, 17%);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s linear;

  .loader {
    width: 120px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: hsl(0, 0%, 98%);
      margin: 8px;
      opacity: 0.6;

      &:nth-child(1) {
        animation: animate 1.5s infinite;
      }

      &:nth-child(2) {
        animation: animate 1.3s infinite;
      }

      &:nth-child(3) {
        animation: animate 1.7s infinite;
      }

      &:nth-child(4) {
        animation: animate 1.1s infinite;
      }

      &:nth-child(5) {
        animation: animate 0.9s infinite;
      }

      &:nth-child(6) {
        animation: animate 0.7s infinite;
      }

      &:nth-child(7) {
        animation: animate 1.1s infinite;
      }

      &:nth-child(8) {
        animation: animate 1.3s infinite;
      }

      &:nth-child(9) {
        animation: animate 1.5s infinite;
      }
    }
  }

  &.light {
    background: hsl(0, 0%, 98%);

    .loader {
      .dot {
        background: hsl(207, 26%, 17%);
      }
    }
  }
}

@keyframes animate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}
</style>