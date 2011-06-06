Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath({'AppName': 'app'});
Ext.Loader.setPath({'Ext': '/javascripts/lib/extjs/src' });
Ext.require('Ext.Component');
Ext.onReady(function () {
  Ext.create('Ext.Component', {
    renderTo: 'container',
    html: 'Ext-Js Ready'
  });
});
