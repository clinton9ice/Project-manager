<template>
  <div class="cards-container">
    <div class="card">
      <div class="card-header">
        <div class="d-flex align-items-center justify-content-between mb-4">
          <h3 class="card-title">{{ header || "Todo" }}</h3>
          <span class="total small badge">{{ total || 0 }}</span>
        </div>

        <button
          class="btn w-100 add-new"
          @click="create"
          data-bs-toggle="modal"
          :data-bs-target="'#' + header"
        >
          <i class="bi bi-plus"></i>
        </button>
      </div>

      <div class="card-body">
        <slot></slot>
      </div>
    </div>
    <modal :selected="header" :id="header" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "@/components/Modal";
export default {
  components: { Modal },
  props: {
    header: String,
    total: Number,
  },
  methods: {
    ...mapActions(["modal_status"]),
    create() {
      let form = document.querySelector("#form");
      let h = this.header ? this.header.toLowerCase() : "";
      this.modal_status(h);
      form.reset();
    },
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
