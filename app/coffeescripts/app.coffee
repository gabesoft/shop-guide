Ext.Loader.setConfig (enabled: true)

Ext.Loader.setPath(
  AppName: 'app'
  Ext: '/javascripts/lib/extjs/src'
  #Ext: '/javascripts/lib/extjs'
)

Ext.require([
  'Ext.Component',
  'Ext.container.Viewport',
  'Ext.selection.CheckboxModel',
  'Ext.grid.*',
  'Ext.data.*'
])

Ext.application(
  name: 'Shop Guide'
  launch: () ->
    searchCombo = Ext.create('SG.search.ComboBox')

    Ext.create('Ext.container.Viewport',
      xtype: 'panel'
      layout:
        type: 'vbox'
        align: 'stretch'
        padding: 5
      bodyPadding: 10
      items: [
        { xtype: 'sg-search-combo' }
        { xtype: 'sg-search-grid' }
      ]
    )
)
