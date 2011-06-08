Ext.Loader.setConfig (enabled: true)

Ext.Loader.setPath(
  AppName: 'app'
  Ext: '/javascripts/lib/extjs/src'
) 

Ext.require('Ext.Component')

Ext.onReady(() -> 
  Ext.create('Ext.Component', 
    renderTo: 'container'
    html: 'Ext-Js Ready'
  )
)
