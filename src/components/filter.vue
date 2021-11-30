<template>
  <div class="col-sm-12 col-md-6">
    <div class="dataTables_length" :id="id+'_length'">
      <label class="dataTables_filter_label">Show
        <select @change="handleLimitChange" name="length"  class="custom-select custom-select-sm form-control form-control-sm">
          <option
                  class="options"
                  v-for="length in lengthMenu"
                  :key="'page' + length"
                  :value="length"
                  v-model="currentLimit"
          >{{ length }}
          </option>
        </select> entries
      </label>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'YsFilter',
    props: {
      id: {
        type: String,
        required:true
      },
      lengthMenu: {
        type: Array,
        default: () => [10, 15, 20, 40, 80, 100, 200, 500, 1000],
      },
      limit: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
        currentLimit: this.limit,
      };
    },
    methods: {
      handleLimitChange(e){
        this.$emit('update:limit',  parseInt(e.target.value));
        this.$emit('change');
      }
    },
  }
</script>
