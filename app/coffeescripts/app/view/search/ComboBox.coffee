Ext.define 'SG.view.search.ComboBox'
  extend: 'Ext.form.ComboBox'
  alias: 'widget.sg-search-combo'
  initComponent: () ->
    store = Ext.create('Ext.data.Store', model: 'SG.model.Hint')

    Ext.apply(this,
      fieldLabel: 'Search Products'
      hideLabel: false
      hideTrigger: true
      typeAhead: false 
      store: store
      queryMode: 'remote'
      displayField: 'name'
      valueField: 'name'
      width: 200
      style: 'margin-top:20px'
      listConfig:
        loadingText: 'Searching...'
        emptyText: 'No matching products found'
    )

    @callParent()
