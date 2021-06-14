<template>
  <div class="col-sm-12 col-md-6">
    <div id="example_filter" class="dataTables_filter">
      <label>Search:
        <input type="search" class="form-control form-control-sm" placeholder="" aria-controls="example"
               @blur="handleSearch" @keyup.enter="handleSearch" @search="handleSearch"></label>
      <div class="dropdown">
        <button @click="toggleDropdown" type="button" class="btn-sm btn btn-secondary ml-3 ysdropbtn" data-toggle="dropdown">
          <i class="glyphicon glyphicon-th"></i>&nbsp;
          <i class="glyphicon glyphicon-triangle-bottom "></i>
        </button>
        <ys-buttons :show.sync="show" @click="handleButtonClick" :extension="extension" :server-side="serverSide">
          <slot ></slot>
        </ys-buttons>
       
      </div>
    </div>
  </div>
</template>
<script>
  
  import YsButtons from './buttons';
  import YsButton from './button';
  export default {
    name: 'YsSearch',
    props: {
      keyword: {
        type: String,
        default: ''
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
      YsButtons,YsButton
    },
    data() {
      return {
        show: false
      }
    },
    created() {
      // Close the dropdown if the user clicks outside of it
      let self = this;
      window.onclick = function(event) {
        if (!event.target.matches('.ysdropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('visible')) {
              self.show=false;
            }
          }
        }
      };
    },
    
    methods: {
      handleSearch(e) {
        this.$emit('update:keyword', e.target.value );
        this.$emit('change');
      },
      handleButtonClick(button){
        this.$emit( 'click', button );
      },
      toggleDropdown() {
          this.show=!this.show
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dropbtn {
    background-color: #04AA6D;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  
  .dropbtn:hover, .dropbtn:focus {
    background-color: #3e8e41;
  }
  
  .dropdown {
    position: relative;
    display: inline-block;
  }

</style>
