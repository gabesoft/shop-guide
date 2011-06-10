/* DO NOT MODIFY. This file was compiled Fri, 10 Jun 2011 18:56:34 GMT from
 * /apps/shop_guide/app/coffeescripts/app/search/ComboBox.coffee
 */

(function() {
  Ext.define('SG.search.ComboBox', {
    extend: 'Ext.form.ComboBox',
    initComponent: function() {
      var products;
      products = Ext.create('Ext.data.Store', {
        fields: ['name'],
        data: [
          {
            name: 'prod a'
          }, {
            name: 'prod b'
          }, {
            name: 'prod c'
          }
        ]
      });
      Ext.apply(this, {
        fieldLabel: 'Search Products',
        store: products,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'name'
      });
      return this.callParent();
    }
  });
}).call(this);
