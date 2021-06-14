<template>
  <Error
    :errorCode="404"
    errorName="Page Not found"
    errorMessage="The page you're looking for might have been removed, had its name
          changed or is temporarily unavailable."
  />
</template>

<script>
import Error from "../components/Error.vue";
export default {
  name: "PageNotFound",
  components: { Error },
};
</script>
