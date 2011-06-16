Ext.Loader.setConfig (enabled: true)

Ext.Loader.setPath(
  AppName: 'SG'
  Ext: '/javascripts/lib/extjs/src'
)

Ext.require([
  'Ext.Component',
  'Ext.data.Model',
  'Ext.container.Viewport',
  'Ext.selection.CheckboxModel',
  'Ext.layout.container.Border',
  'Ext.grid.*',
  'Ext.data.*'
])

Ext.application(
  name: 'SG'
  controllers: ['Home']
  launch: () ->
    viewport = Ext.create('Ext.container.Viewport',
      xtype: 'panel'
      id: 'viewport'
      style: 'background: #fff'
      layout: 'border'
      items: [
        {
          region: 'north'
          xtype: 'search-box'
          ref: 'search-box'
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
          ref: 'search-grid'
          margins: '5 5 250 5'
          flex: 4
        }
        {
          region: 'east'
          xtype: 'shopping-list'
          ref: 'shop-list'
          margins: '5 5 250 5'
          flex: 2
        }
        {
          region: 'south'
          xtype: 'panel'
          html: 'footer'
        }
      ]
    )
)
