<template>
  <div class="row">
    <div class="col-sm-12 table-responsive">
      <table id="example" class="table ys-table table-striped table-bordered dataTable" style="width: 100%;" role="grid" aria-describedby="example_info">
        <thead v-if="columns.length">
        <tr role="row">
          <th scope="col" style="text-align: center">
            <div v-if="options.index" class="cell">#
              <span class="caret-wrapper" >
                    <i class="sort-caret ascending"  @click=" $event =>  handleSortClick($event, {label:'index', sortable:true}, 'ascending')"></i>
                    <i class="sort-caret descending" @click=" $event =>  handleSortClick($event, {label:'index', sortable:true}, 'descending')"></i>
                  </span>
            </div>
          </th>
          <th v-for="column in columns" scope="col"  tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" :style="column.style">
            <div class="cell">{{column.label}}
              <span v-if="column.sortable" class="caret-wrapper" >
                    <i class="sort-caret ascending"  @click=" $event =>  handleSortClick($event, column, 'ascending')"></i>
                    <i class="sort-caret descending" @click=" $event =>  handleSortClick($event, column, 'descending')"></i>
                  </span>
            </div>
          </th>
        </tr>
        </thead>
        <slot v-else name="header"></slot>
        <tbody v-if="data.length">
        <tr v-for="(row,index) in data" :cell="index" :key="'ys-datatable-row-'+index">
          <th v-if="options.index" style="text-align: center;" scope="row">{{rowIndex+index+1}}</th>
          <td v-for="column in columns" :key="'ys-datatable-row-column-'+column.label">{{row[snake_case(column.label)]}}</td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr cell="0">
          <td :colspan="columns.length ? columns.length+1 : 3" style="text-align: center">No Data Available</td>
        </tr>
        </tbody>
        <tfoot v-if="footer && columns.length">
        <tr >
          <th scope="col" style="text-align: center">
            <div v-if="options.index" class="cell">#
              <span class="caret-wrapper" >
                      <i class="sort-caret ascending"  @click=" $event =>  handleSortClick($event, {label:'index', sortable:true}, 'ascending')"></i>
                      <i class="sort-caret descending" @click=" $event =>  handleSortClick($event, {label:'index', sortable:true}, 'descending')"></i>
                    </span>
            </div>
          </th>
          <th v-for="column in columns" scope="col"  tabindex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" :style="column.style">
            <div class="cell">{{column.label}}
              <span v-if="column.sortable" class="caret-wrapper" >
                      <i class="sort-caret ascending"  @click=" $event =>  handleSortClick($event, column, 'ascending')"></i>
                      <i class="sort-caret descending" @click=" $event =>  handleSortClick($event, column, 'descending')"></i>
                    </span>
            </div>
          </th>
        </tr>
        </tfoot>
        <slot v-else name="footer"></slot>
      </table>
    </div>
  </div>
</template>
<script>
  import {snake_case} from "../utills/table";
  
  export default {
    name: 'YsServerTable',
    props: {
      id: {
        type: String,
        default: "ys-datatable"
      },
      customClass: {
        type: String,
        default: "ys-datatable"
      },
      columns: {
        type: [Array, null],
        default: () => [],
      },
      data: {
        type: [Array, null],
        default: () => [],
      },
      options: {
        type: [Object, null],
        default: () => { return { index: false } },
      },
      footer: {
        type: [String,Boolean],
        default: true
      },
      serverSide : {
        type: Boolean,
        required: true,
      },
      perPage: {
        type: Number,
        default: 10
      },
      page: {
        type: Number,
        default: 1
      },
      currentRow: {
        type: Number,//table start row index
        required: true
      }
    },
    data() {
      return {
        rowIndex: 0
      }
    },
    watch:{
      page: function(){
        this.rowIndex = this.currentRow;
      }
    },
    methods:{
      handleSortClick(e,column,dir) {
        this.$emit('change', { prop: snake_case(column.label) , order: dir, sort: this.serverSide ? 'custom' : 'default' })
      },
      snake_case
    }
  }
</script>
<style lang="scss" scoped>
  th{
    font-weight:bolder;
    text-transform: capitalize;
    font-size:14px;
  }
  .ys-table .caret-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    height: 34px;
    width: 24px;
    vertical-align: middle;
    cursor: pointer;
    overflow: initial;
    position: relative;
  }
  .ys-table .sort-caret.ascending {
    border-bottom-color: #C0C4CC;
    top: 5px;
  }
  .ys-table .sort-caret.descending {
    border-top-color: #C0C4CC;
    bottom: 7px;
  }
  th i.sort-caret {
    padding-right: 18px;
  }
  i.sort-caret.ascending:before,
  i.sort-caret.descending:after {
    border: 4px solid transparent;
    content: "";
    display: block;
    height: 0;
    right: 5px;
    top: 50%;
    position: absolute;
    width: 0;
  }
  i.sort-caret.ascending:before {
    border-bottom-color: #666;
    margin-top: -9px;
  }
  i.sort-caret.descending:after {
    border-top-color: #666;
    margin-top: 1px;
  }
</style>
