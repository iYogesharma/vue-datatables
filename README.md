# Vue DataTables

A light weight component for rendering data tables for VueJS aapplications.

[![GitHub open issues](https://img.shields.io/github/issues/iYogesharma/vue-datatables.svg)](https://github.com/iYogesharma/vue-datatables/issues)
![GitHub](https://img.shields.io/github/license/iYogesharma/vue-datatables.svg)


## Features

[x]  Pagination

[x]  PageSize

[x]  Search

[x]  Provide an Action Button component

[x]  Work with both Client as well as Server side


![vue-datatables](https://github.com/iYogesharma/vue-datatables/blob/master/demo.png)

## Installation
```
npm install @iyogesharma/vue-datatables
```
In your `main.js`

```js
import { VueDatatable } from '@iyogesharma/vue-datatable';

Vue.use(VueDatatable);
```

 If you don't want to reference entire plugin, you can define the component from your component
 
 ```js
import { VueDatatable } from '@iyogesharma/vue-datatable';
       
 export default {
   components: { VueDatatable }
 }
 ```
 
 #### vue-datatable props

| sr no  | Prop  | Description   | Default  |
|--------|-------|---------------|----------|
| 1 |  server-side  |  indicate whether to use server side data tables or not | false  |
| 2 | url  | url to get data for server side data tables. required if server-side is true | null  |
| 3 | option  | prop object containing options set datatable config   | {}  |
| 4 | option.index  | if false remove index column(#)  | true  |
| 5 | columns  | array of objects containing two properties label and sortable [ { label: "name", sortable: true }] | []  |
| 6 | data  | data to be displayed in table  | []  |
| 7 | page  | current selected page  | 1  |
| 8 | limit  | number of records to be displayed per page | 10  |
| 9 | length-menu  | list of option to decide number of records per page |   [10, 15, 20, 40, 80, 100, 200, 500, 1000] |
| 11 | order  | define default ordering ( works only with server side ) |  {  column: 'name', direction: 'ascending'}   |
| 12 | params  | additional parameter to be send along with request like headers or csrf token| {}   |
| 13 | filters  | define default filtering ( works only with server side )  | {  'users.active' : 1}  |
| 14 | filename  | name of the file to be exported from datatable  |  report  |
| 15 | extension  |  extension of the file to be exported from datatable ( server-side ) | csv (currently supported csv,xls,json)   |
| 16 | footer  | whether to display table footer or not | true  |
| 17 | id  | id of the html table element | ys-datatable  |

#### Demo
See [demo/server-side.vue](demo/server-side.vue). <br>
See [demo/default.vue](demo/default.vue).
