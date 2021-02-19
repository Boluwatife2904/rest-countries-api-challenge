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

    <div class="countries-list">
      <div class="country" v-for="country in countriesList" :key="country.name">
        <router-link
          :to="{ name: 'CountryInfo', params: { id: country.name } }"
          class="country-link"
        >
          <div class="country-poster">
            <img :src="country.flag" :alt="country.name" />
          </div>
          <div class="country-details">
            <h6>{{ country.name }}</h6>
            <p><span>Population:</span> {{ country.population }}</p>
            <p><span>Region:</span> {{ country.region }}</p>
            <p><span>Capital:</span> {{ country.capital }}</p>
          </div>
        </router-link>
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
      countriesList: null,
    };
  },
  mounted() {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        this.countriesList = data;
        console.log(data);
      });
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: hsl(207, 26%, 17%);
  padding: 50px 60px 50px;
  transition: all 0.5s ease-in-out;

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
    padding: 30px 20px 50px;
  }
}

.countries-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.country {
  width: 25%;
  flex: 1 1 25%;
  max-width: 250px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 30px;
  height: 100%;

  .country-link {
    text-decoration: none;

    .country-poster {
      height: 200px;

      img {
        display: block;
        margin: 0 auto;
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .country-details {
      background: hsl(209, 23%, 22%);
      color: hsl(0, 0%, 100%);
      padding: 30px 20px;

      h6 {
        font-size: 22px;
        margin-bottom: 10px;
      }

      p {
        margin-bottom: 8px;
        color: hsl(0, 0%, 52%);
        font-weight: 600;

        span {
          color: hsl(0, 0%, 100%);
        }
      }
    }
  }
}

.home.light {
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
</style>
