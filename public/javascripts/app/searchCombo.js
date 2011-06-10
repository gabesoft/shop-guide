/* DO NOT MODIFY. This file was compiled Fri, 10 Jun 2011 18:34:05 GMT from
 * /apps/shop_guide/app/coffeescripts/app/searchCombo.coffee
 */

(function() {
  var createSearchCombo;
  createSearchCombo = function() {
    var products;
    products = Ext.create('Ext.data.Store', {
      fields: ['name'],
      data: [
        {
          name: 'prod a',
          name: 'prod b',
          name: 'prod c'
        }
      ]
    });
    return Ext.create('Ext.form.ComboBox', {
      fieldLabel: 'Search Products',
      store: products,
      queryMode: 'local',
      displayField: 'name',
      valueField: 'name'
    });
  };
}).call(this);
