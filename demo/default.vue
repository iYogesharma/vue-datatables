<template>
  <div class="container-fluid" style="margin-top:5%">
    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-md-10">
        <div class="panel panel-default">
          <div class="panel-heading">Vue Datatable Demo</div>

          <div class="panel-body">
            <ys-datatable
              :data="data"
              :columns="columns"
              :order="order"
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
        data:[{
          "name": "user1",
          "email": "user1@demo.com",
        }, {
          "name": "user2",
          "email": "user2@demo.com",
        }, {
          "name": "user3",
          "email": "user3@demo.com",
        }, {
          "name": "user4",
          "email": "user4@demo.com",
        }, {
          "name": "user5",
          "email": "user5@demo.com",
        }, {
          "name": "user6",
          "email": "user6@demo.com",
        }, {
          "name": "user7",
          "email": "user7@demo.com",
        }, {
          "name": "user8",
          "email": "user8@demo.com",
        }, {
          "name": "user9",
          "email": "user9@demo.com",
        }, {
          "name": "user10",
          "email": "user10@demo.com",
        }]
      };
    },
    methods: {
      handleButtonClick(button) {
        alert(button)
      }
    }
  };
</script>
