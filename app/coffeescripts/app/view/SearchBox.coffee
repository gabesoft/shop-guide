Ext.define 'SG.view.SearchBox'
  extend: 'Ext.form.ComboBox'
  alias: 'widget.search-box'
  fieldLabel: 'Search Products'
  initComponent: () ->
    store = Ext.create('Ext.data.Store',
      model: 'SG.model.Hint'
      proxy:
        type: 'ajax'
        method: 'GET'
        url: hint_products_path(format: 'json')
        reader:
          type: 'json'
    )

    Ext.apply(this,
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
    @addEvents('search': true)

    query = ''
    onSpecialKey = (field, e) ->
      if e.getKey() == e.ENTER and @getValue() != query
        query = @getValue()
        @fireEvent('search', query)

    @on('specialKey', onSpecialKey, this)
