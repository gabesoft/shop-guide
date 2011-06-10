Ext.define 'SG.search.ComboBox'
  extend: 'Ext.form.ComboBox'
  alias: 'widget.sg-search-combo'
  initComponent: () ->
    store = Ext.create('Ext.data.Store',
      fields: ['name']
      data: [
        { name: 'milk' }
        { name: 'coffee' }
        { name: 'shaving cream' }
        { name: 'shampoo' }
      ]
    )

    Ext.apply(this,
      fieldLabel: 'Search Products'
      hideLabel: false
      hideTrigger: true
      typeAhead: true
      store: store
      queryMode: 'local'
      displayField: 'name'
      valueField: 'name'
      width: 200
      style: 'margin-top:20px'
      listConfig:
        loadingText: 'Searching...'
        emptyText: 'No matching products found'
    )

    @callParent()
