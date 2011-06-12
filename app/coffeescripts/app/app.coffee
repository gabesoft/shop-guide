Ext.Loader.setConfig (enabled: true)

Ext.Loader.setPath(
  AppName: 'app'
  Ext: '/javascripts/lib/extjs/src'
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
    Ext.create('Ext.container.Viewport',
      xtype: 'panel'
      layout:
        type: 'vbox'
        align: 'stretch'
        padding: 5
      bodyPadding: 10
      items: [
        { xtype: 'search-box' }
        {
          xtype: 'panel'
          layout: 
            type: 'hbox'
            #align: 'stretch'
          border: false
          padding: 0
          items: [
            { 
              xtype: 'category-list' 
              flex: 1 
              style: 'margin: 0 10px 0 0' 
              border: false
            }
            { xtype: 'search-results-grid', flex: 3 }
          ]
        }
      ]
    )
)
