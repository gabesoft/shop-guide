/* DO NOT MODIFY. This file was compiled Fri, 10 Jun 2011 22:00:21 GMT from
 * /apps/shop_guide/app/coffeescripts/app/search/ComboBox.coffee
 */

(function() {
  Ext.define('SG.search.ComboBox', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.sg-search-combo',
    initComponent: function() {
      var store;
      store = Ext.create('Ext.data.Store', {
        fields: ['name'],
        data: [
          {
            name: 'milk'
          }, {
            name: 'coffee'
          }, {
            name: 'shaving cream'
          }, {
            name: 'shampoo'
          }
        ]
      });
      Ext.apply(this, {
        fieldLabel: 'Search Products',
        hideLabel: false,
        hideTrigger: true,
        typeAhead: true,
        store: store,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'name',
        width: 200,
        style: 'margin-top:20px',
        listConfig: {
          loadingText: 'Searching...',
          emptyText: 'No matching products found'
        }
      });
      return this.callParent();
    }
  });
}).call(this);
