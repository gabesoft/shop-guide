Ext.define 'SG.view.SearchResultsGrid'
  extend: 'Ext.grid.Panel'
  alias: 'widget.search-results-grid'
  initComponent: () ->
    selModel = Ext.create('Ext.selection.CheckboxModel'
      injectCheckbox: 0
      mode: 'MULTI'
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
        { text: 'Product', dataIndex: 'name', flex: 5 }
        { text: 'Category', dataIndex: 'category', flex: 2 }
      ]
      bbar: [
        { xtype: 'button', text: 'Add to shopping list', ref: 'add-button'}
      ]
      columnLines: true
      frame: true
      title: 'Search Results'
      iconCls: 'icon-grid'
    )

    @callParent()
    @addEvents('addproducts': true)

    [addButton] = @query 'button[ref=add-button]'
    addButton.on('click', () => 
      selected = (r.data for r in @selModel.getSelection())
      @fireEvent('addproducts', selected)
    )
  
  loadProducts: (query) ->
    @store.load(
      scope: this
      params:
        query: query
      callback: (records, op, success) ->
    )
