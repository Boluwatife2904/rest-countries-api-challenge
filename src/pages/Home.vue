<template>
  <div class="home" :class="{ light: !reactive.darkMode }">
    <div class="input-and-filter">
      <form @submit.prevent="search">
        <div class="input-field">
          <input
            type="search"
            v-model="country"
            placeholder="Search for a Country"
          />
          <i class="bx bx-search search-icon"></i>
        </div>
      </form>
      <div class="filter-box">
        <select name="" id="">
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceanic">Oceanic</option>
        </select>
        <i class="bx bxs-chevron-down"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reactive"],
  name: "Home",
  data() {
    return {
      country: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: hsl(207, 26%, 17%);
  padding: 30px 60px;
  transition: all 0.5s ease-in-out;

  .input-and-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;

    form {
      width: 400px;

      .input-field {
        position: relative;

        input {
          width: 100%;
          height: 50px;
          border: none;
          border-radius: 5px;
          background-color: hsl(209, 23%, 22%);
          color: hsl(0, 0%, 100%);
          font: inherit;
          padding: 0 20px 0 60px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

          &::placeholder {
            color: hsl(0, 0%, 100%);
          }
        }

        .search-icon {
          position: absolute;
          left: 20px;
          top: 14px;
          color: hsl(0, 0%, 100%);
          font-size: 22px;
        }
      }

      @media screen and (max-width: 650px) {
        width: 100%;
        margin-bottom: 30px;
      }
    }

    .filter-box {
      width: 100%;
      max-width: 200px;
      position: relative;

      select {
        width: 100%;
        appearance: none;
        border: none;
        outline: none;
        padding: 0 12px;
        height: 50px;
        border-radius: 5px;
        background-color: hsl(209, 23%, 22%);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
        color: hsl(0, 0%, 100%);
        font: inherit;
        cursor: pointer;

        option {
          font: inherit;
        }
      }

      i {
        pointer-events: none;
        position: absolute;
        right: 10px;
        top: 16px;
        color: hsl(0, 0%, 100%);
      }
    }

    @media screen and (max-width: 650px) {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  &.light {
    background: hsl(0, 0%, 98%);

    .input-and-filter {
      form {
        .input-field {
          input {
            color: hsl(200, 15%, 8%);
            background: hsl(0, 0%, 98%);

            &::placeholder {
              color: hsl(200, 15%, 8%);
            }
          }

          .search-icon {
            color: hsl(200, 15%, 8%);
          }
        }
      }

      .filter-box {
        select {
          color: hsl(200, 15%, 8%);
          background: hsl(0, 0%, 98%);
        }

        i {
          color: hsl(200, 15%, 8%);
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 30px 20px;
  }
}
</style>
