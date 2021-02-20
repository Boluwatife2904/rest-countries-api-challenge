<template>
  <div class="country">
    <router-link
      :to="{ name: 'CountryInfo', params: { name: country.name } }"
      class="country-link"
    >
      <div class="country-poster">
        <img :src="country.flag" :alt="country.name" />
      </div>
      <div class="country-details">
        <h6>{{ country.name }}</h6>
        <p>
          <span>Population:</span>
          {{ Number(country.population).toLocaleString() }}
        </p>
        <p><span>Region:</span> {{ country.region }}</p>
        <p><span>Capital:</span> {{ country.capital }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
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
        width: 98%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.3s;
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
</style>