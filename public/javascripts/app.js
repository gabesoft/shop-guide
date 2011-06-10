/* DO NOT MODIFY. This file was compiled Fri, 10 Jun 2011 22:44:26 GMT from
 * /apps/shop_guide/app/coffeescripts/app.coffee
 */

(function() {
  Ext.Loader.setConfig({
    enabled: true
  });
  Ext.Loader.setPath({
    AppName: 'app',
    Ext: '/javascripts/lib/extjs/src'
  });
  Ext.require(['Ext.Component', 'Ext.container.Viewport', 'Ext.selection.CheckboxModel', 'Ext.grid.*', 'Ext.data.*']);
  Ext.application({
    name: 'Shop Guide',
    launch: function() {
      var searchCombo;
      searchCombo = Ext.create('SG.search.ComboBox');
      return Ext.create('Ext.container.Viewport', {
        xtype: 'panel',
        layout: {
          type: 'vbox',
          align: 'stretch',
          padding: 5
        },
        bodyPadding: 10,
        items: [
          {
            xtype: 'sg-search-combo'
          }, {
            xtype: 'sg-search-grid'
          }
        ]
      });
    }
  });
}).call(this);
