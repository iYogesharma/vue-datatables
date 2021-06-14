import {export_json_to_excel} from './Export2Excel';

/**
 * Handle tabel filter action
 * @param data value of current filter
 *
 * @return void
 */
export function handleFilter(data) {
  if (data === '' || data === null) {
    this.resetFilters();
  }
  this.query.page = 1;
  this.getList()
}

/**
 * Reset query filters to initial values
 * @return {void}
 */
export function resetFilters() {
  this.query.filters = {};
}

/**
 * Reset query search keyword to initial value
 * @return {void}
 */
export function resetKeyword() {
  this.query.keyword = '';
  this.$emit('change');
}

/**
 * Handle sort action of table
 * @param {object} data sort details
 *
 * @return {void}
 */
export function sortList(data) {
  const { prop, order, sort } = data;
  
  if (order){
    if ( sort === 'default' || prop === 'index') {
      this.$refs['table'].data.sort(() => -1);
    } else {
      this.query.order['column'] = prop;
      this.query.order['direction'] = order;
      this.handleFilter();
    }
  }
}

/**
 * Format json data to array for excel export
 * @param filterVal
 * @param jsonData
 * @returns {array}
 */
export function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]));
}

export function  snake_case(str, del = '_') {
  // str += del;
  str = str.split(' ');
  
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].toLowerCase();
  }
  return str.join(del);
}
