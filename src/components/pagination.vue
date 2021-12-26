<template>
  <div class="row" :id="id+'_pagination'">
    <div class="col-sm-12 col-md-5">
      <div class="dataTables_info" :id="id+'_info'" role="status" aria-live="polite">Showing {{currentRow + 1}} to {{currentRow+limit < total ? currentRow+limit : total }} of {{total}} entries</div>
    </div>
    <div class="col-sm-12 col-md-7">
      <div class="dataTables_paginate paging_simple_numbers" v-if="pages === 0">
        <ul class="pagination" >
          <li class="paginate_button page-item active" >
            <a href="#" data-dt-idx="pageNumber" tabindex="0" class="page-link">1</a>
          </li>
        </ul>
      </div>
      <div class="dataTables_paginate paging_simple_numbers" v-if="pages <= 3 && pages > 0">
        <ul class="pagination">
          <li  class="paginate_button page-item previous"  @click="currentPage!==1 ? previousPage() : ''">
            <a href="#" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
          </li>
          <li
                  v-for="pageNumber in pages"
                  @click="$event => handlePaginationClick($event, pageNumber)"
                  class="paginate_button page-item"
                  :class="pageNumber === currentPage ? 'active' : ''"
          >
            <a href="#" data-dt-idx="pageNumber" tabindex="0" class="page-link">{{ pageNumber }}</a>
          </li>
          <li class="paginate_button page-item next"   @click="currentPage!==pages ? nextPage() : ''">
            <a href="#" data-dt-idx="pages" tabindex="0" class="page-link">Next</a>
          </li>
        </ul>
      </div>
      <div v-if="pages > 3 " class="dataTables_paginate paging_simple_numbers" >
        <!-- pagination type 1 -->
        
        <!-- pagination type 2 -->
        <ul class="pagination" v-if="currentPage < pages - 1 && currentPage > 3" >
          <li :disabled="currentPage===1" class="paginate_button page-item previous"   @click="currentPage!==1 ? previousPage() : ''">
            <a href="#" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
          </li>
          <li
                  @click="$event => handlePaginationClick($event, 1)"
                  class="paginate_button page-item"
                  :class="1 === currentPage ? 'active' : ''"
          >
            <a href="#" data-dt-idx="1" tabindex="0" class="page-link">{{ 1 }}</a>
          </li>
          <li class="paginate_button page-item"> <a href="#"  tabindex="0" class="page-link">&nbsp;....</a></li>
          <li
                  @click="$event => handlePaginationClick($event, currentPage - 1)"
                  class="paginate_button page-item"
          >
            <a href="#" :data-dt-idx="currentPage - 1" tabindex="0" class="page-link">{{ currentPage - 1 }}</a>
          </li>
          <li
                  @click="$event => handlePaginationClick($event, currentPage)"
                  class="paginate_button page-item active"
          >
            <a href="#" :data-dt-idx="currentPage" tabindex="0" class="page-link">{{ currentPage }}</a>
          </li>
          <li
                  @click="$event => handlePaginationClick($event, currentPage + 1)"
                  class="paginate_button page-item"
          >
            <a href="#" :data-dt-idx="currentPage + 1" tabindex="0" class="page-link">{{ currentPage + 1 }}</a>
          </li>
          <li  class="paginate_button page-item"> <a href="#"  tabindex="0" class="page-link">&nbsp;....</a></li>
          <li
                  @click="$event => handlePaginationClick($event, pages)"
                  class="paginate_button page-item"
                  :class="pages === currentPage ? 'active' : ''"
          >
            <a href="#" :data-dt-idx="pages - 1" tabindex="0" class="page-link">{{ pages }}</a>
          </li>
          <li  class="paginate_button page-item next"  @click="currentPage!==pages ? nextPage() : ''">
            <a href="#" data-dt-idx="pages" tabindex="0" class="page-link">Next</a>
          </li>
        </ul>
        <!-- pagination type 3 -->
        <ul class="pagination" v-else>
          <li class="paginate_button page-item previous"  @click="currentPage!==1 ? previousPage() : ''">
            <a href="#" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
          </li>
          <li
                  v-for="pageNumber in pages < 5  ? pages-2 : 3"
                  @click="$event => handlePaginationClick($event, pageNumber)"
                  class="paginate_button page-item"
                  :class="pageNumber === currentPage ? 'active' : ''"
          >
            <a href="#":data-dt-idx="pageNumber" tabindex="0" class="page-link">{{ pageNumber }}</a>
          </li>
          <li  v-if="pages > 5"  class="paginate_button page-item"> <a href="#"  tabindex="0" class="page-link">&nbsp;....</a></li>
          <li
                  @click="$event => handlePaginationClick($event, pages - 1)"
                  class="paginate_button page-item"
                  :class="pages - 1 === currentPage ? 'active' : ''"
          >
            <a href="#" :data-dt-idx="pages - 1" tabindex="0" class="page-link">{{ pages - 1 }}</a>
          </li>
          <li
                  @click="$event => handlePaginationClick($event, pages)"
                  class="paginate_button page-item"
                  :class="pages === currentPage ? 'active' : ''"
          >
            <a href="#" :data-dt-idx="pages" tabindex="0" class="page-link"> {{ pages }}</a>
          </li>
          <li  class="paginate_button page-item next"  @click="currentPage!==pages ? nextPage() : ''">
            <a href="#" data-dt-idx="pages" tabindex="0" class="page-link">Next</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "YsPagination",
    props: {
      id: {
        type: String,
        required:true
      },
      page: {
        type: Number,
        default: 1,
      },
      limit: {
        type: Number,
        default: 10,
      },
      total: {
        type: Number,
        required: true,
      },
      records: {
        type: Number,
        required: true,
      },
      currentRow: {
        type: Number,//table start row index
        required: true
      }
    },
    data() {
      return {
        currentPage: this.page,
        display: false,
        currentLimit: this.limit,
      };
    },
    computed:{
      pages: function() {
        return (this.total / this.limit) > 0 ?  Math.ceil(this.total / this.limit) : 0;
      }
    },
    watch: {
      currentPage: function(value) {
        this.$emit('update:page',value);
        this.$emit('pagination');
      }
    },
    methods: {
      previousPage() {
        this.currentPage > 0 ?  this.currentPage--: '';
      },
      nextPage() {
        this.currentPage < 100 ?  this.currentPage++: '';
      },
      handlePaginationClick(e, page) {
        this.currentPage = page;
      },
    },
  }
</script>
