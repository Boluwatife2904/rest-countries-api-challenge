<template>
  <div class="home" :class="{ light: !darkMode }">
    <div
      class="input-and-filter"
      v-if="!loading && filteredByRegion && filteredByRegion.length > 0"
    >
      <form @submit.prevent="">
        <div class="input-field">
          <input
            type="text"
            v-model.trim="country"
            @input="searchByName"
            placeholder="Search for a Country"
          />
          <i class="bx bx-search search-icon"></i>
        </div>
      </form>
      <div class="filter-box">
        <select v-model="filter">
          <option value="All">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceanic">Oceanic</option>
        </select>
        <i class="bx bxs-chevron-down"></i>
      </div>
    </div>

    <div class="loading-list" v-if="loading">
      <skeleton-loader v-for="i in 12" :key="i"></skeleton-loader>
    </div>

    <div
      class="countries-list"
      v-if="!loading && filteredByRegion && filteredByRegion.length > 0"
    >
      <country-item
        v-for="country in filteredByRegion"
        :key="country.name"
        :name="country.alpha3Code"
        :country="country"
      ></country-item>
    </div>

    <div class="error-box" v-if="!loading && error">
      <span>&#x1F615; </span>
      <p>
        Sorry but there has been an error, and we are currently unable to
        provide you with information you are currently looking for now due to
        some technical reasons.
      </p>
      <button @click="hideError">Try Again</button>
    </div>
  </div>
</template>

<script>
import SkeletonLoader from "../components/SkeletonLoader";
import CountryItem from "../components/CountryItem.vue";
import { mapGetters } from "vuex";

export default {
  components: { CountryItem, SkeletonLoader },
  name: "Home",
  data() {
    return {
      loading: true,
      error: false,
      country: "",
      filter: "All",
      countriesList: null,
    };
  },
  computed: {
    filteredByRegion() {
      if (this.filter === "All") {
        return this.countriesList;
      } else if (this.filter === "Africa") {
        return this.countriesList.filter(
          (country) => country.region === "Africa"
        );
      } else if (this.filter === "America") {
        return this.countriesList.filter(
          (country) => country.region === "Americas"
        );
      } else if (this.filter === "Asia") {
        return this.countriesList.filter(
          (country) => country.region === "Asia"
        );
      } else if (this.filter === "Europe") {
        return this.countriesList.filter(
          (country) => country.region === "Europe"
        );
      } else if (this.filter === "Oceanic") {
        return this.countriesList.filter(
          (country) => country.region === "Oceania"
        );
      }
      return this.countriesList;
    },
    ...mapGetters(["darkMode"]),
  },
  mounted() {
    this.fetchCountries();
  },
  methods: {
    searchByName(e) {
      if (e.target.value !== "") {
        console.log(this.filteredByRegion);
        this.filteredByRegion.filter((country) => {
          country.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
      }
      return this.filteredByRegion;
    },
    hideError() {
      this.error = false;
      this.fetchCountries();
    },
    fetchCountries() {
      this.loading = true;
      fetch(`https://restcountries.eu/rest/v2/all`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.countriesList = data;
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            this.loading = false;
          }, 2000);
          this.error = true;
        });
    },
  },
};
</script>

<style lang="scss">
.home {
  background: hsl(207, 26%, 17%);
  padding: 50px 60px 50px;
  min-height: 100vh;
  transition: all 0.3s;

  .input-and-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

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
          transition: all 0.3s;

          &::placeholder {
            color: hsl(0, 0%, 100%);
            transition: all 0.3s;
          }
        }

        .search-icon {
          position: absolute;
          left: 20px;
          top: 14px;
          color: hsl(0, 0%, 100%);
          font-size: 22px;
          transition: all 0.3s;
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
        transition: all 0.3s;

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

  .loading-list,
  .countries-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media screen and (max-width: 868px) {
      justify-content: space-around;
    }
  }

  .error-box {
    background: hsl(209, 23%, 22%);
    padding: 40px;
    text-align: center;
    width: 85%;
    margin: 65px auto 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
    border-radius: 8px;

    @media screen and (max-width: 768px) {
      width: 95%;
    }

    span {
      font-size: 50px;
      display: inline-block;
      margin-bottom: 10px;
    }

    p {
      color: hsl(0, 0%, 100%);
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 15px;
      width: 60%;
      margin-left: auto;
      margin-right: auto;

      @media screen and (max-width: 768px) {
        width: 80%;
      }

      @media screen and (max-width: 576px) {
        width: 100%;
      }
    }

    button {
      font: inherit;
      background-color: hsl(207, 26%, 17%);
      color: hsl(0, 0%, 100%);
      outline: none;
      border: none;
      cursor: pointer;
      border-radius: 6px;
      padding: 14px 16px;
      text-transform: uppercase;
      transition: 0.4s;
      width: 150px;
      font-family: "Nunito Sans", sans-serif;
      font-weight: 600;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
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

    .countries-list {
      .country {
        .country-link {
          .country-details {
            background: hsl(0, 0%, 98%);
            color: hsl(200, 15%, 8%);
            padding: 30px 20px;

            p {
              margin-bottom: 8px;
              color: hsl(0, 0%, 52%);
              font-weight: 600;

              span {
                color: hsl(200, 15%, 8%);
              }
            }
          }
        }
      }
    }

    .error-box {
      background: hsl(0, 0%, 98%);

      p {
        color: hsl(200, 15%, 8%);
      }

      button {
        background: hsl(0, 0%, 98%);
        color: hsl(200, 15%, 8%);
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 30px 20px 50px;
  }
}
</style>
