/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 02:32:17 GMT from
 * /apps/shop_guide/app/coffeescripts/app/model/Hint.coffee
 */

(function() {
  Ext.define('SG.model.Hint', {
    extend: 'Ext.data.Model',
    fields: [
      {
        name: 'id',
        type: 'string'
      }, {
        name: 'name',
        type: 'string'
      }
    ],
    proxy: {
      type: 'rest',
      method: 'GET',
      url: hint_products_path(),
      reader: {
        type: 'json'
      }
    }
  });
}).call(this);
