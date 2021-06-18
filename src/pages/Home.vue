<template>
  <div class="home" :class="{ light: !darkMode }">
    <div class="input-and-filter" v-if="!isLoading">
      <form @submit.prevent="">
        <div class="input-field">
          <input
            type="text"
            v-model.trim="country"
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

    <flex-container v-if="isLoading">
      <skeleton-loader v-for="i in 12" :key="i"></skeleton-loader>
    </flex-container>

    <flex-container
      v-if="!isLoading && filteredCountries && filteredCountries.length > 0"
    >
      <country-item
        v-for="country in filteredCountries"
        :key="country.name"
        :name="country.alpha3Code"
        :country="country"
      ></country-item>
    </flex-container>

    <div class="empty-box" v-if="!isLoading && filteredCountries.length <= 0">
      <span>&#x1F615; </span>
      <p>
        Sorry but we could not find any country that matches your search
        parameters. Please check again to ensure that the country you are
        looking for truly exists.
      </p>
    </div>

    <div class="error-box" v-if="!isLoading && error">
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
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SkeletonLoader from "../components/SkeletonLoader";
import CountryItem from "../components/CountryItem.vue";
import FlexContainer from "../components/FlexContainer.vue"

export default {
  components: { CountryItem, SkeletonLoader, FlexContainer },
  name: "Home",
  setup() {
    const store = useStore();
    // Data
    const isLoading = ref(true);
    const error = ref(false);
    const country = ref("");
    const filter = ref("All");
    const countriesList = ref(null);

    // Methods
    const fetchCountries = async () => {
      isLoading.value = true;
      try {
        const response = await fetch(`https://restcountries.eu/rest/v2/all`);
        const responseData = await response.json();
        countriesList.value = responseData;
        isLoading.value = false;
      } catch (error) {
        console.log(error);
        isLoading.value = false;
        error.value = true;
      }
    };
    fetchCountries();

    const hideError = () => {
      error.value = false;
      fetchCountries();
    };

    // Filtering Methods
    const filterByName = (countries) => {
      if (country.value && country.value !== "") {
        return countries.filter((item) => {
          return item.name.toLowerCase().includes(country.value.toLowerCase());
        });
      }
      return countries;
    };
    const filterByRegion = (countries) => {
      if (filter.value === "All") {
        return countries;
      } else if (filter.value === "Africa") {
        return countries.filter((country) => country.region === "Africa");
      } else if (filter.value === "America") {
        return countries.filter((country) => country.region === "Americas");
      } else if (filter.value === "Asia") {
        return countries.filter((country) => country.region === "Asia");
      } else if (filter.value === "Europe") {
        return countries.filter((country) => country.region === "Europe");
      } else if (filter.value === "Oceanic") {
        return countries.filter((country) => country.region === "Oceania");
      }
      return countries;
    }

    // Computed Properties
    const darkMode = computed(() => store.getters.darkMode);
    const filteredCountries = computed(() => {
      return filterByName(filterByRegion(countriesList.value))      
    });

    return {
      isLoading,
      error,
      country,
      filter,
      darkMode,
      filteredCountries,
      hideError,
    };
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

  .empty-box,
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
