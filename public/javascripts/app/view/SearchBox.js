/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 17:21:52 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/SearchBox.coffee
 */

(function() {
  Ext.define('SG.view.SearchBox', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.search-box',
    initComponent: function() {
      var store;
      store = Ext.create('Ext.data.Store', {
        model: 'SG.model.Hint'
      });
      Ext.apply(this, {
        fieldLabel: 'Search Products',
        hideLabel: false,
        hideTrigger: true,
        typeAhead: false,
        minChars: 3,
        store: store,
        queryMode: 'remote',
        displayField: 'name',
        valueField: 'name',
        listConfig: {
          loadingText: 'Searching...',
          emptyText: 'No matching products found'
        }
      });
      return this.callParent();
    }
  });
}).call(this);
