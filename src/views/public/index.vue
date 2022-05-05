<template>
  <div data-spy="scroll" data-target="#navbarNav" data-offset="50">
    <!-- HERO -->
    <section class="hero d-flex flex-column justify-content-center" id="home">
      <div class="text-section">
        <div class="col-lg-8 col-md-10 col-12">
          <div class="hero-text px-3">
            <h4 class="caption" data-aos="fade-up" data-aos-delay="300">
              Project planing just got easier.
            </h4>

            <h1 class="col-sm-9" data-aos="fade-up" data-aos-delay="500">
              Start and keep track of your project with ease.
            </h1>

            <div class="btn-section">
              <a
                href="#about"
                class="btn custom-btn outline-light mt-3"
                data-aos="fade-up"
                data-aos-delay="800"
                >learn more</a
              >
              <a
                href="#how-it-works"
                class="btn custom-btn mt-3"
                data-aos="fade-up"
                data-aos-delay="700"
                >Get started</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="feature" id="feature">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-8 mb-5">
          <h2 data-aos="fade-up" data-aos-delay="400">
            Having a hard time arranging your task?
          </h2>
          <p class="paragraph" data-aos="fade-up" data-aos-delay="500">
            Just create your account and start writing down your project
            details, categorize it and store it all on server in a very
            simplified way.
          </p>

          <router-link
            data-aos="fade-up"
            data-aos-delay="200"
            to="/signup"
            class="btn btn-primary stretch"
          >
            Create an account</router-link
          >
        </div>

        <div class="vertical-divider me-4"></div>

        <div class="col-lg-5 col-md-5 col-sm-8 mb-5col-5">
          <h2 data-aos="fade-up" data-aos-delay="500">
            Availability &amp; Security
          </h2>
          <p class="paragraph" data-aos="fade-up" data-aos-delay="500">
            Our database server is 24hrs active and has a highly commendable
            system security.
          </p>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="about section" id="about">
      <div class="container-fluid row">
        <div class="d-flex">
          <div class="mt-lg-5 mb-lg-0 mb-4 col-lg-5 col-md-10 col-12">
            <h1 class="mb-4 fw-bold" data-aos="fade-up" data-aos-delay="300">
              Who are we?
            </h1>

            <p data-aos="fade-up" data-aos-delay="600">
              We are a community that understands how tough and demanding it can
              be just to be writing down a project plan and description in a
              blank paper, then starts roaming around when the need to start the
              project begins, or can't even keep count of unfinished project you
              have. Even more, the completed projects.
            </p>
          </div>
          <div
            class="mt-lg-5 mb-lg-0 ps-5 p-sm-0"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <img src="@/assets/images/about/2840443.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="class section" id="how-it-works">
      <div class="container-fluid row">
        <div
          class="d-flex align-items-center justify-content-between flex-wrap"
        >
          <div class="mt-lg-5 mb-lg-0 mb-4 col-lg-5 col-md-10 col-12">
            <h1 class="mb-4 fw-bold" data-aos="fade-up" data-aos-delay="300">
              How Does It Work?
            </h1>

            <p data-aos="fade-up" data-aos-delay="600">
              It is a very simple task planing system that intends to help users
              especially project managers save their plans without having to
              store them down on just paper, and it's more reliable and secure.
            </p>
          </div>
          <div
            class="mt-lg-5 mb-lg-0 ps-5 p-sm-0 col-lg-5 col-md-10 col-12"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <img
              src="@/assets/images/work/How-it-works.svg"
              alt="How the project manager works"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="site-footer px-3">
      <div
        class="container-fluid d-flex align-items-center justify-content-between flex-wrap"
      >
        <span>copyright &copy; {{ date }} Taskey Co.</span>

        <ul class="social-icon">
          <div class="list-container" v-for="media in social" :key="media.url">
            <li class="list-item" v-if="media.type === 'tel'">
              <a :href="'tel:' + media.url" class="text-link">
                <span :class="[media.icon, 'icon']"></span>
              </a>
            </li>

            <li class="list-item" v-if="media.type === 'social'">
              <a :href="media.url" :class="[media.icon, 'icon']"></a>
            </li>
          </div>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    const date = new Date().getFullYear();
    return {
      date,
      social: [
        {
          icon: "bi bi-linkedin",
          url: "https://linkedin.com/clintonezeagwuna",
          type: "social",
        },
        {
          icon: "bi bi-twitter",
          url: "https://twitter.com/clintonufere",
          type: "social",
        },
        {
          icon: "bi bi-phone",
          url: "+2348169336721",
          type: "tel",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
