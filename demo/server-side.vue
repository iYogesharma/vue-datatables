<template>
  <div class="container-fluid" style="margin-top:5%">
    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-md-10">
        <div class="panel panel-default">
          <div class="panel-heading">Vue Datatable Demo</div>

          <div class="panel-body">
            <ys-datatable
                    :server-side="true"
                    url="/api/users"
                    :data="data"
                    :filters="filters"
                    :order="order"
                    :columns="columns"
            >
              <ys-button slot="dt-buttons"  @click="handleButtonClick" icon="glyphicon glyphicon-plus" label="Test" id="AddButton"></ys-button>
            </ys-datatable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { YsDatatable,YsButton }  from "@iyogesharma/vue-datatable";


  export default {
    components: {
      YsButton,
      YsDatatable
    },
    data() {
      return {
        columns: [
          { label: "name", sortable: true },
          { label: "email", sortable: true },
        ],
        filters: {"users.active":1},// used in query like where('users.role_id'=1)
        // note for date range filter yo need to use array like
        // filters: {"users.created_at": ["2020-07-15","2021-07-21"]} ( for date filter to work column name must include either _at or date
        // filters: {"users.status": [1,2]}
        order: {
          column: 'name',
          direction: 'ascending',
        },
      };
    },
    methods: {
      handleButtonClick(button) {
        alert(button)
      }
    }
  };
</script>
