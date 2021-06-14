<template>
  <div class="wrapper" :class="{ light: !darkMode }">
    <div class="error">
      <div class="emoji"><span>&#x1F61E;</span></div>
      <div class="text">
        <h4>400 - Bad Request</h4>
        <p>
          An error occured and we can't provide you with the details of the
          country you requested for. Kindly check back later or and try again.
          Thanks.
        </p>
        <router-link to="/">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Error",
  computed: {
    ...mapGetters(["darkMode"]),
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 76px);
  background: hsl(207, 26%, 17%);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  .error {
    max-width: 800px;
    width: 95%;
    margin: 0 auto;
    padding: 40px 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .emoji {
      margin-right: 20px;

      span {
        font-size: 120px;
      }
    }

    .text {
      h4,
      p {
        color: hsl(0, 0%, 98%);
        transition: all 0.3s;
      }
      h4 {
        font-size: 22px;
        margin-bottom: 5px;
        text-transform: uppercase;
      }

      p {
        font-size: 17px;
        line-height: 26px;
        margin-bottom: 15px;
        transition: all 0.3s;
      }

      a {
        padding: 12px 26px;
        color: hsl(200, 15%, 8%);
        border-radius: 30px;
        background-color: #fff;
        text-decoration: none;
        display: inline-block;
      }
    }

    @media screen and (max-width: 600px) {
      flex-direction: column;
      text-align: center;

      .emoji {
        span {
          font-size: 80px;
        }
      }
    }
  }

  &.light {
    background: hsl(0, 0%, 98%);

    .error {
      .text {
        h4,
        p {
          color: hsl(200, 15%, 8%);
        }

        a {
          background-color: hsl(200, 15%, 8%);
          color: #fff;
        }
      }
    }
  }
}
</style>