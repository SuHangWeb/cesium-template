<template>
  <div class="ball">
    <div class="water water1"></div>
    <div class="water water2"></div>
    <div class="water water3"></div>
  </div>
</template>
 
<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  watch: {
    option: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {},
};
</script>
  
<style scoped lang="scss">
@keyframes water-waves {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.ball {
  
    
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;

  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  .water {
    position: absolute;
    width: 200%;
    height: 200%;
    animation: water-waves linear infinite;
    &.water1 {
      background-color: #33cfff;
      top: 40%;
      left: -25%;
      opacity: 0.7;
      border-radius: 40%;
      //   animation: inherit;
      animation-duration: 5s;
    }
    &.water2 {
      background-color: #0eaffe;
      top: 45%;
      left: -35%;
      border-radius: 35%;
      opacity: 0.5;
      //   animation: inherit;
      animation-duration: 7s;
    }
    &.water3 {
      top: 50%;
      left: -35%;
      opacity: 0.3;
      background-color: #0f7ae4;
      border-radius: 33%;
      //   animation: inherit;
      animation-duration: 11s;
    }
  }
}
</style>