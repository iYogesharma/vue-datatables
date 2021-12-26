<template>
  <div class="row">
    <div class="col-sm-1"></div>
    <div class="col-md-10">
      <div class="row">
        <ys-filter
                @change="handleFilterChange"
                :lengthMenu="lengthMenu"
                :limit.sync="query.limit"
                :id="id"
        ></ys-filter>
        <ys-search   :id="id" @click="handleButtonClick" :keyword.sync="query.keyword" @change="handleKeywordChange" :extension="extension" :server-side="serverSide">
          <slot name="dt-buttons" v-show="$slots['dt-buttons']"></slot>
        </ys-search>
      </div>
      <ys-table
              ref="table"
              :id="id"
              :columns="columns"
              :data="tableData"
              :options="{ index: true }"
              :server-side="serverSide"
              :per-page="query.limit"
              :page="query.page"
              :current-row="currentRow"
              @change="handleSortChange"
      >
      <template v-for="column in columns" :slot="'column('+column.label+')'"  slot-scope="{item}">
        <slot :name="'column('+column.label+')'" :item="item">
        </slot>
      </template>
      <template v-for="column in columns" :slot="column.label" slot-scope="{item}">
        <slot :name="'cell('+column.label+')'" :item="item">
        </slot>
      </template>
      </ys-table>
      <ys-pagination
              :id="id"
              @pagination="handlePaginationChange"
              :page.sync="query.page"
              :total="totalRecords"
              :limit="query.limit"
              :current-row="currentRow"
              :records="tableData.length"
      ></ys-pagination>
    </div>
    <div class="col-sm-1"></div>
  </div>
</template>

<script>
  import YsPagination from './pagination';
  import YsFilter from './filter';
  import YsSearch from './search';
  import YsTable from './table';
  import {sortList, resetFilters, resetKeyword, handleFilter,validateFilters, formatJson, snake_case } from '../utills/table';
  import {export_json_to_excel} from '../utills/Export2Excel';
  import axios from 'axios';

  export default {

    name: "YsDatatable",

    components: {
      YsSearch,
      YsFilter,
      YsTable,
      YsPagination
    },

    props: {
      type: {
        type: String,
        default: 'default'
      },
      serverSide: {
        type: Boolean,
        default: false
      },
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
        default: () => []
      },
      data: {
        type: [Array, null],
        default: () => []
      },
      options: {
        type: [Object, null],
        default: () => {
          return { index: false };
        }
      },
      footer: {
        type: [String, Boolean],
        default: true
      },
      page: {
        type: Number,
        default: 1
      },
      limit: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: function() {
          return this.data.length;
        }
      },
      lengthMenu: {
        type: Array,
        default: () => [10, 15, 20, 40, 80, 100, 200, 500, 1000]
      },
      keyword: {
        type: [String,Number],
        default: ''
      },
      order: {
        type: Object,
        default: () => {
          return {
            column: '',
            direction: '',
          };
        }
      },
      params: {
        type: Object,
        default: () => {
          return {};
        }
      },
      filters: {
        type: Object,
        default: () => {
          return {};
        }
      },
      url: {
        type: String,
        default: null
      },
      filename: {
        type: String,
        default: 'report'
      },
      extension: {
        type: String,
        default: 'csv'
      }
    },

    data() {
      return {
        tableData: this.data,
        totalRecords: this.total,
        loading:false,
        query: {
          page: this.page,
          limit: this.limit,
          keyword: this.keyword,
          order: this.order,
          filters: this.filters,
        },
      }
    },

    computed: {
      currentRow: function () {
        return this.query.limit * ( this.query.page -1 );
      }
    },

    watch: {
      filters:{
        handler(val){
          this.query.filters = val;
          this.handleFilter(val)
        },
        deep: true
      }
    },

    created() {
      if( this.url && this.serverSide ) {
        this.getList();
      } else {
        this.totalRecords = this.data.length;
        this.paginate()
      }
    },

    methods: {

      /*****************Datatable Event Handlers************************/

      sortList, resetFilters, resetKeyword, handleFilter,validateFilters,

      handleKeywordChange() {
        if(this.url && this.serverSide  ) {
          this.getList();
        } else {
          this.filterKeywordPaginate();
        }
      },

      handleTableDataChange() {
        if( this.url && this.serverSide) {
          this.getList();
        }else{
          this.paginate();
        }
      },

      handlePaginationChange(e) {
        if(this.url && this.serverSide ) {
          this.getList();
        } else {
          this.paginate() ;
        }
      },

      handleFilterChange(){
        this.query.page = 1;
        if(this.url && this.serverSide ) {
          this.getList();
        } else {
          this.paginate() ;
        }
      },

      handleSortChange(data) {
        this.sortList(data)
      },

      /*****************************************************************/

      /**
       * get data from storage and display in datatable
       * @uses axios
       */
      async getList(){
        await axios.post(this.url,this.query,this.params)
        .then( res => {
          this.tableData = res.data.data;
          this.totalRecords = res.data.total;
        })
        .catch( err => {
          console.log(err)
        })
      },

      /**
       * Handle datatable action button click
       */
      handleButtonClick(button){
        let buttons = [ 'btnExcel', 'btnExportAll' ];
        if( this.$slots['dt-buttons'] && !buttons.includes(button) ) {
          this.$emit( 'click', button );
        } else {
          switch(button) {
            case 'btnExcel':
              this.handleDownload();
              break;
            case 'btnExportAll':
              this.handleExportAll();
              break;
          }
        }
      },

      /**
       * handle export table data to excel on client side
       * @uses utills/Export2Excel
       */
      handleDownload() {
        this.downloading = true;
        var filterVal = []; var tHeader = [];

        this.columns.map( col => {
          tHeader.push(col.label);
          filterVal.push(snake_case(col.label));
        });
        const data = formatJson(filterVal, this.tableData);
        const filename = this.filename;
        export_json_to_excel({
          header:tHeader,
          data,
          filename
        });
        this.downloading = false;
      },

      /**
       * handle server side export of table data
       * @uses file-saver
       */
      async handleExportAll() {
        this.params.responseType = 'blob';
        await axios.post(this.url,{
          export:true,
          ext: this.extension,
        },this.params)
        .then( res => {
          saveAs(res.data, `${this.filename}.${this.extension.toLowerCase()}`);
        })
        .catch( err => {
          console.log(err)
        })
      },

      /**
       * Filter data based on keyword specified and
       * paginate result
       * @return void
       */
      filterKeywordPaginate(){
        if( this.query.keyword && this.query.keyword !== "") {
          let self = this;
          this.tableData = this.data.filter( function(d) {
            return Object.values(d).includes(self.query.keyword)
          } );
          this.paginateTableData();
        } else {
          this.tableData = this.data;
        }
      },

      filterPaginate(){
        var data = [];
        let self = this;
        if(  Object.keys(this.filters).length) {

          Object.keys(self.query.filters).map( key => {
            if( data.length ) {
              data = data.filter( function(d) {
                return  d[key] == self.query.filters[key];
              } );
            } else {
              data = self.data.filter( function(d) {
                return  d[key] == self.query.filters[key];
              } );
            }
          });
          this.tableData = data;
        } else {
          this.tableData = this.data;
        }

        this.paginateTableData();
      },

      paginateTableData() {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        this.tableData.slice((this.query.page - 1) * this.query.limit, this.query.page * this.query.limit);
      },

      /**
       * paginate table data
       */
      paginate() {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        this.tableData =  this.data.slice((this.query.page - 1) * this.query.limit, this.query.page * this.query.limit);
      },
    }

  };
</script>
