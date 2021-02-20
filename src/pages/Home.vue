<template>
  <div class="home" :class="{ light: !reactive.darkMode }">
    <div class="input-and-filter">
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

    <div class="countries-list" v-else>
      <country-item
        v-for="country in filteredByRegion"
        :key="country.name"
        :country="country"
      ></country-item>
    </div>
  </div>
</template>

<script>
import SkeletonLoader from "../components/SkeletonLoader";
import CountryItem from "../components/CountryItem.vue";

export default {
  components: { CountryItem, SkeletonLoader },
  inject: ["reactive"],
  name: "Home",
  data() {
    return {
      loading: true,
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
  },
  mounted() {
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
      });
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
      // console.log(this.countriesList);
    },
  },
};
</script>

<style lang="scss">
.home {
  background: hsl(207, 26%, 17%);
  padding: 50px 60px 50px;
  min-height: 100vh;
  transition: all 0.3s ease-in-out;

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
          transition: all 0.3s ease-in-out;

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
        transition: all 0.3s ease-in-out;

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
  }

  @media screen and (max-width: 768px) {
    padding: 30px 20px 50px;
  }
}
</style>
