<template>
  <div class="cards-container">
    <div class="card">
      <div class="card-header">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <h3 class="card-title">{{ header || "Projects" }}</h3>
          <span class="total small badge">{{ total || 0 }}</span>
        </div>

        <button class="btn w-100 add-new" @click="create">
          <i class="bi bi-plus"></i>
        </button>
      </div>

      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions} from "vuex";

export default {
  props: {
    header: String,
    total: Number,
  },
  methods: {
    ...mapActions(["init_modal"]),
    create() {
      let h="save";
      let form = document.querySelector("#form");
      if (this.header) h = this.header.toLowerCase();
      this.init_modal(h);
      form.reset();
    }
  },
};
</script>

<style lang="scss" scoped>
  .card {
    max-width: 350px;
    margin: 2rem;
    border-radius: 6px !important;
    overflow: hidden;
    min-width: 300px;

    .card-header {
      border: none;
      background: var(--bs-gray-100);
      .card-title {
        padding: 0.6rem;
        margin-bottom: 0.5rem;
        letter-spacing: 0.5px;
        font-size: 1.5em;
      }

      .btn {
        background-color: rgba(var(--bs-success-rgb), 0.1254);
        color: var(--bs-green);
        font-weight: 600;

        &.add-new:hover {
          background-color: var(--bs-success);
          color: var(--bs-white);
        }
      }

      .badge {
        font-size: 0.7em;
        display: block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: rgba(var(--bs-success-rgb), 0.1254);
        color: var(--bs-green);
        line-height: 25px;
        margin-left: 0.4rem;
        text-align: center;
        padding: 0 !important;
      }
    }

    .card-body {
      background: var(--bs-light);
      max-height: 400px;
      overflow: hidden;
      overflow-y: auto;
      padding: 1rem;
    }
  }
</style>
