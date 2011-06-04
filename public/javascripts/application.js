Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath({'AppName': 'app'});
Ext.Loader.setPath({'Ext': 'javascripts/lib/extjs/src' });

Ext.onReady(function () {
  Ext.create('Ext.Component', {
    renderTo: 'container',
    html: 'Ready to start coding'
  });
});
