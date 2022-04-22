<template>
  <div class="alert" :class="Alert()" id="Alert">
    <div class="alert-header">
      {{ msg }}
    </div>
    <div class="progress-bar">
      <div class="progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: Boolean,
    success: Boolean,
    msg: String,
  },
  data() {
    return {
      active: "active",
      progressLevel: 0,
    };
  },
  methods: {
    Alert() {
      // Define the message  class
      let className = "";

      if (this.error) {
        this.clear();
        className = `alert-danger ${this.active}`;
      }

      if (this.success) {
        this.clear();
        className = `alert-success ${this.active}`;
      }
      return className;
    },
    clear() {
      setTimeout(() => {
        this.active = "";
      }, 3000);
    },
  },
};
</script>

<style scoped lang="scss">
.alert {
  position: fixed;
  bottom: 20px;
  right: 0;
  left: 0;
  margin: auto;
  max-width: 300px;
  text-align: center;
  transition: all 0.5s linear;
  transform-style: preserve-3d;
  z-index: 1500;
   transform: translateY(300px);
  opacity: 0;
  animation: slideUp 0.5s linear;

  &.alert-success {
    .progress {
      background: rgba(var(--bs-success-rgb), 0.5);
    }
  }

  &.alert-danger {
    .progress {
      background: rgba(var(--bs-danger-rgb), 0.5);
    }
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: inherit;

    .progress {
      height: 6px;
      width: 0;
      border-radius: 0;
      transition: 0.5s ease;
      animation: progress 2s linear forwards 0.5s;
    }
  }
     @keyframes slideUp {
      0% {
        transform: translateY(300px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

  &.active {
        opacity: 1;
        transform: translateY(0);

    .progress {
      @keyframes progress {
        0% {
          width: 100%;
        }
        100% {
          width: 0;
        }
      }
    }
  }

  .alert-header {
    font-weight: 500;
  }
}
</style>
