<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1>Oops!</h1>
      </div>
      <h2>404 - Page not found</h2>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <router-link to="/admin" class="btn btn-primary"
        >Go To Homepage</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
#notfound {
  position: relative;
  height: 100vh;

  .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-width: 410px;
    width: 100%;
    text-align: center;
    .notfound-404 {
      height: 280px;
      position: relative;
      z-index: -1;

      h1 {
        font-size: 15em;
        margin: 0px;
        font-weight: 900;
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        background: url("../assets/images/error.jpg") no-repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: cover;
        background-position: center;
      }

      h2 {
        color: #000;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 0;
      }

      p {
        color: #000;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 20px;
        margin-top: 0px;
      }

        @media only screen and (max-width: 767px) {
        height: 150px;

        h1 {
          font-size: 7em;
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .notfound .notfound-404 {
    height: 142px;
  }
  .notfound .notfound-404 h1 {
    font-size: 112px;
  }
}
</style>
