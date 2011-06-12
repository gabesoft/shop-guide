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
      id: 'container-panel'
      style: 'background: #fff'
      layout: 'border'
      items: [
        {
          region: 'north'
          xtype: 'search-box'
          border: false
          split: true
          margins: '40 450 50 5'
        }
        {
          region: 'west'
          border: false
          xtype: 'category-list'
          margins: '5 5 5 5'
          flex: 1
        }
        {
          region: 'center'
          xtype: 'search-results-grid'
          margins: '5 5 250 5'
          flex: 3
        }
        {
          region: 'east'
          xtype: 'shopping-list'
          border: false
          html: 'shopping list'
          margins: '5 5 5 5'
          flex: 1
        }
        {
          region: 'south'
          xtype: 'panel'
          html: 'footer'
        }
      ]
    )
)
