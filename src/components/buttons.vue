<template>
  <div
    id="dt-button-dropdown"
    class="ml-3 dropdown-content dropdown-menu dropdown-menu-right visible"
    v-if="show"
  >
    <ys-button @click="handleButtonClick" slot="dt-buttons" icon="glyphicon glyphicon-file" label="Excel" id="btnExcel" ></ys-button>
    <ys-button v-show="serverSide" @click="handleButtonClick" slot="dt-buttons" icon="glyphicon glyphicon-file" :label="'Export All To ' + extension.toUpperCase()" id="btnExportAll" ></ys-button>
    <slot ></slot>
  </div>
</template>
<script>
  import YsButton from './button';
export default {
  name: "YsButtons",
  props:{
    show:{
      type: Boolean,
      default: false
    },
    extension: {
      type: String,
      default: 'csv'
    },
    serverSide: {
      type: Boolean,
      default: false
    },
  },
  components: {
    YsButton
  },
  methods: {
    handleButtonClick(button) {
      this.$emit('click',button);
    }
  }
};
</script>

<style lang="scss" scoped>
  .dropdown-content {
    display: none;
    position: absolute;
    min-width: 10rem;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    right: 0;
    z-index: 1;
    margin: 0.125rem 0 0;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  
  .dropdown-content a {
    color: black;
    text-decoration: none;
    display: block;
    box-shadow: none;
    cursor: pointer;
    line-height: inherit;
    padding: .75rem 1.5rem;
  }
  
  .dropdown a:hover {background-color: #ddd;}
  
  .visible {display: block;}
</style>
