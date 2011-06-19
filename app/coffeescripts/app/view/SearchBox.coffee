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
        url: search_producthints_path(format: 'json')
        reader:
          type: 'json'
    )

    Ext.apply(this,
      autoSelect: false
      forceSelection: false
      hideLabel: true
      hideTrigger: true
      typeAhead: false
      queryDelay: 200
      minChars: 3
      store: store
      emptyText: 'Enter a product, category, or manufacturer'
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
    @on('specialKey', (field, e) =>
      if e.getKey() is e.ENTER and @getValue() isnt query
        query = @getValue()
        @fireEvent('search', query)
    )
