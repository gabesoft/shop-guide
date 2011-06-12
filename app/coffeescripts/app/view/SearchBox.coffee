Ext.define 'SG.view.SearchBox'
  extend: 'Ext.form.ComboBox'
  alias: 'widget.search-box'
  initComponent: () ->
    store = Ext.create('Ext.data.Store', model: 'SG.model.Hint')

    Ext.apply(this,
      fieldLabel: 'Search Products'
      hideLabel: false
      hideTrigger: true
      typeAhead: false
      minChars: 3
      store: store
      queryMode: 'remote'
      displayField: 'name'
      valueField: 'name'
      listConfig:
        loadingText: 'Searching...'
        emptyText: 'No matching products found'
    )

    @callParent()
