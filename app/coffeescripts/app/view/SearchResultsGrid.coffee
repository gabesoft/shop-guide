Ext.define 'SG.view.SearchResultsGrid'
  extend: 'Ext.grid.Panel'
  alias: 'widget.search-results-grid'
  initComponent: () ->
    selModel = Ext.create('Ext.selection.CheckboxModel'
      injectCheckbox: 0
    )
    store = Ext.create('Ext.data.Store',
      model: 'SG.model.Product'
      proxy:
        type: 'ajax'
        method: 'GET'
        url: products_path(format: 'json')
        reader:
          type: 'json'
    )

    Ext.apply(this,
      store: store
      selModel: selModel
      columns: [
        { text: 'Product', dataIndex: 'name', flex: 1 }
        { text: 'Tags', dataIndex: 'tags' }
      ]
      bbar: [
        { xtype: 'button', text: 'Add to shopping list' }
      ]
      columnLines: true
      frame: true
      title: 'Search Results'
      iconCls: 'icon-grid'
    )

    @callParent()
  
  loadProducts: (query) ->
    console.log('loading...', query)
    @store.load(
      scope: this
      params:
        query: query
      callback: (records, op, success) ->
          console.log(success)
    )
