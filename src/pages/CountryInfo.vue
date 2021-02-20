<template>
  <div class="about" :class="{ light: !reactive.darkMode }">
    <button class="go-back" @click="goBack"><i class="bx bx-arrow-back"></i> Back</button>
    <div class="country-information">
      <div class="country-poster">
        <img :src="country.flag" :alt="country.name" />
      </div>
      <div class="country-info">
        <h3 class="name">{{ country.name }}</h3>

        <div class="other-info">
          <div class="column">
            <h6>
              Native name: <span> {{ country.nativeName }} </span>
            </h6>
            <h6>
              Population: <span> {{ Number(country.population).toLocaleString() }} </span>
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
          <div class="column">
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
                {{ currency.name }}, </span
              >
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
          <h6>
            Border Countries:
            <span v-for="(border, index) in country.borders" :key="index">
              <router-link
                :to="{ name: CountryInfo, params: { name: border } }"
              >
                {{ border }}
              </router-link></span
            >
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name"],
  watch: {
    name() {
      this.fetchCountry();
    },
  },
  inject: ["reactive"],
  data() {
    return {
      country: [],
    };
  },
  methods: {
    fetchCountry() {
      fetch(`https://restcountries.eu/rest/v2/name/${this.name}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data.length > 0) {
            console.log(data);
            this.country = data[0];
          }
        });
    },
    goBack(){
      this.$router.go(-1);
    }
  },
  mounted() {
    this.fetchCountry();
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
      }
    }

    .country-info {
      width: 40%;
      flex: 1 1 40%;

      .name {
        color: #fff;
        margin-bottom: 30px;
        font-size: 24px;
      }

      .other-info {
        display: flex;

        .column {
          width: 50%;
          flex: 1 1 50%;

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
      }
    }

    .border {
      margin-top: 40px;

      h6 {
        color: #fff;
        font-size: 16px;
        margin-right: 10px;
        font-weight: 500;

        span {
          a {
            display: inline-block;
            padding: 5px 30px;
            margin: 10px;
            box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
            text-decoration: none;
            color: #fff;
            text-transform: capitalize;
            font: inherit;
            font-size: 14px;
          }
        }
      }
    }
  }

  &.light {
    background: hsl(0, 0%, 98%);
  }
}
</style>