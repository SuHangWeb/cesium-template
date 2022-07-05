<template>
  <div class="container">
    <!-- <diricon :value="value" type="vehicle" bgColor="#EE782E" /> -->
    <input
      type="range"
      max="100"
      min="0"
      step="1"
      defaultValue="0"
      value="0"
      name="range"
      id="range"
    />
  </div>
</template>
 
<script>
import diricon from "@/common/cesium/Map/Gaode/components/diricon/index.vue";
export default {
  name: "BlankPage",
  components: { diricon },
  data() {
    return {
      value: "metro",
    };
  },
  mounted() {
    const range = document.getElementById("range");
    let number = 0;

    let setI = setInterval(() => {
      if (number > 100) {
        number = 0;
      } else {
        number++;
      }
      range.value = number;
    }, 1000);

    range.onchange = (e) => {
      number = e.target.value
    };

    range.onfocus = () => {
      clearInterval(setI);
      setI = null;
    };

    range.onblur = () => {
      setI = setInterval(() => {
        if (number > 100) {
          number = 0;
        } else {
          number++;
        }
        range.value = number;
      }, 1000);
    };
  },
  methods: {},
};
</script>
  
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: #eee;
}
</style>