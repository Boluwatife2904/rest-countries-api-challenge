<template>
  <div class="country" :class="{ dark: reactive.darkMode }">
    <div class="country-poster"></div>
    <div class="country-details">
      <h6></h6>
      <p></p>
      <p></p>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reactive"],
};
</script>

<style lang="scss" scoped>
.country {
  width: 25%;
  flex: 1 1 25%;
  max-width: 250px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 30px;
  height: 100%;
  transition: all 0.3s;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgb(211, 209, 211) 50%,
      transparent 100%
    );
    transition: all 0.3s;
    animation: shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  .country-poster {
    height: 200px;
    width: 100%;
    background-color: rgb(220, 220, 220);
    transition: all 0.3s;
  }

  .country-details {
    background: none;
    padding: 30px 20px;
    transition: all 0.3s;

    h6 {
      height: 22px;
      margin-bottom: 10px;
      width: 100%;
      background-color: rgb(220, 220, 220);
      transition: all 0.3s;
    }

    p {
      margin-bottom: 10px;
      height: 16px;
      color: hsl(0, 0%, 52%);
      background-color: rgb(220, 220, 220);
      transition: all 0.3s;

      &:nth-child(2) {
        width: 180px;
      }
      &:nth-child(3) {
        width: 150px;
      }
      &:nth-child(4) {
        width: 120px;
      }
    }
  }

  &.dark {
    &::before {
      background: linear-gradient(
        90deg,
        transparent 0%,
        hsl(209, 23%, 22%) 50%,
        transparent 100%
      );
    }

    .country-poster {
      background: hsl(209, 23%, 22%);
    }

    .country-details {
      background: none;

      h6 {
        background-color: hsl(209, 23%, 22%);
      }

      p {
        background-color: hsl(209, 23%, 22%);
      }
    }
  }

  @media screen and (max-width: 1100px) {
    width: 33.3%;
    flex: 1 1 33.3%;
  }

  @media screen and (max-width: 930px) {
    width: 50%;
    flex: 1 1 50%;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
    flex: 1 1 100%;
  }
}

@keyframes shimmer {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}
</style>