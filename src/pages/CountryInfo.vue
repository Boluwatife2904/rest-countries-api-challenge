<template>
  <Loader v-if="isLoading" />
  <div
    class="about"
    :class="{ light: !darkMode }"
    v-else-if="!isLoading && !error"
  >
    <button class="go-back" @click="goBack">
      <i class="bx bx-arrow-back"></i> <span>Back</span>
    </button>
    <div class="country-information">
      <div class="country-poster">
        <img :src="country.flag" :alt="country.name" />
      </div>
      <div class="country-info">
        <h3 class="name">{{ country.name }}</h3>

        <div class="other-info">
          <div class="column column-one">
            <h6>
              Native name: <span> {{ country.nativeName }} </span>
            </h6>
            <h6>
              Population:
              <span> {{ Number(country.population).toLocaleString() }} </span>
            </h6>
            <h6>
              Region: <span> {{ country.region }} </span>
            </h6>
            <h6>
              Sub Region: <span> {{ country.subregion }} </span>
            </h6>
            <h6>
              Capital: <span> {{ country.capital }} </span>
            </h6>
          </div>
          <div class="column column-two">
            <h6>
              Top level domain:
              <span v-for="(tld, index) in country.topLevelDomain" :key="index">
                {{ tld }},
              </span>
            </h6>
            <h6>
              Currencies:
              <span
                v-for="(currency, index) in country.currencies"
                :key="index"
              >
                {{ currency.name }},
              </span>
            </h6>
            <h6>
              Languages:
              <span v-for="(language, index) in country.languages" :key="index">
                {{ language.name }},
              </span>
            </h6>
          </div>
        </div>

        <div class="border">
          <h6>Border Countries:</h6>
          <div class="countries">
            <span v-for="(border, index) in country.borders" :key="index">
              <router-link :to="'/country/' + border">
                {{ border }}
              </router-link></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <Error v-else/>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "../components/Loader.vue";
import Error from "../components/Error.vue"

export default {
  name: "CountryInfo",
  components: { Loader, Error },
  props: ["name"],
  watch: {
    name(newValue) {
      this.fetchCountry(newValue);
    },
  },
  data() {
    return {
      isLoading: false,
      country: {},
      error: false,
    };
  },
  computed: {
    ...mapGetters(["darkMode"]),
  },
  methods: {
    async fetchCountry(name) {
      this.isLoading = true;
      try {
        const response = await fetch(
          `https://restcountries.eu/rest/v2/alpha/${name}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          const error = new Error(
            responseData.message ||
              "Error fetching the country details from our servers."
          );
          throw error;
        }
        this.country = responseData;
        setTimeout(() => {
          this.isLoading = false;
        }, 800);
      } catch {
        this.isLoading = false;
        this.error = true;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchCountry(this.name);
  },
};
</script>

<style lang="scss" scoped>
.about {
  background: hsl(207, 26%, 17%);
  padding: 50px 60px 50px;
  min-height: 100vh;
  transition: all 0.3s;

  .go-back {
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    width: 140px;
    height: 42px;
    border-radius: 5px;
    font: inherit;
    background: transparent;
    color: hsl(0, 0%, 100%);
    justify-content: center;
    margin-bottom: 30px;
    cursor: pointer;

    i {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .country-information {
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .country-poster {
      width: 40%;
      margin-right: 10%;
      flex: 1 1 40%;
      margin-bottom: 30px;

      img {
        height: 400px;
        width: 100%;
        display: block;
        margin: 0 auto;
        object-fit: cover;

        @media screen and (max-width: 768px) {
          height: 300px;
        }
      }

      @media screen and (max-width: 768px) {
        width: 100%;
        margin-right: 0;
        flex: 1 1 100%;
      }
    }

    .country-info {
      width: 40%;
      flex: 1 1 40%;

      .name {
        color: hsl(0, 0%, 100%);
        margin-bottom: 30px;
        font-size: 24px;
      }

      .other-info {
        display: flex;
        flex-wrap: wrap;

        .column {
          width: 50%;
          flex: 1 1 50%;

          @media screen and (max-width: 600px) {
            width: 100%;
            flex: 1 1 100%;
          }

          h6 {
            font-size: 16px;
            margin-bottom: 10px;
            font-weight: 500;
            color: hsl(0, 0%, 100%);

            span {
              color: hsl(0, 0%, 52%);
            }
          }
        }

        .column-one {
          @media screen and (max-width: 600px) {
            margin-bottom: 30px;
          }
        }
      }

      .border {
        margin-top: 40px;
        display: flex;

        h6 {
          color: hsl(0, 0%, 100%);
          font-size: 16px;
          margin-right: 10px;
          font-weight: 500;
          width: 150px;
          flex-shrink: 0;

          @media screen and (max-width: 992px) {
            margin-bottom: 10px;
          }
        }

        .countries {
          span {
            a {
              display: inline-block;
              padding: 5px 30px;
              margin: 0 20px 15px 0;
              box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
              text-decoration: none;
              color: hsl(0, 0%, 100%);
              text-transform: capitalize;
              font: inherit;
              font-size: 14px;
            }
          }
        }

        @media screen and (max-width: 992px) {
          flex-direction: column;
        }
      }

      @media screen and (max-width: 768px) {
        width: 100%;
        flex: 1 1 100%;
      }
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &.light {
    background: hsl(0, 0%, 98%);

    .go-back {
      color: hsl(200, 15%, 8%);
    }

    .country-information {
      .country-info {
        .name {
          color: hsl(200, 15%, 8%);
        }

        .other-info {
          .column {
            h6 {
              color: hsl(200, 15%, 8%);

              span {
                color: hsl(207, 26%, 17%);
              }
            }
          }
        }
      }

      .border {
        margin-top: 40px;

        h6 {
          color: hsl(200, 15%, 8%);
        }
        .countries {
          span {
            a {
              color: hsl(207, 26%, 17%);
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