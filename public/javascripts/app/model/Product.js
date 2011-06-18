/* DO NOT MODIFY. This file was compiled Sat, 18 Jun 2011 01:08:26 GMT from
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
      }, {
        name: 'category',
        type: 'string'
      }, {
        name: 'priority',
        type: 'int'
      }
    ]
  });
}).call(this);
