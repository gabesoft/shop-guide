/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 23:57:48 GMT from
 * /apps/shop_guide/app/coffeescripts/app/model/Product.coffee
 */

(function() {
  Ext.define('SG.model.Product', {
    extend: 'Ext.data.Model',
    fields: [
      {
        name: 'id',
        type: 'string'
      }, {
        name: 'name',
        type: 'string'
      }, {
        name: 'tags',
        type: 'array'
      }
    ],
    proxy: {
      type: 'rest',
      method: 'GET',
      url: products_path() + '.json',
      reader: {
        type: 'json'
      }
    }
  });
}).call(this);
