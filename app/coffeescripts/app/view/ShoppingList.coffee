Ext.define 'SG.view.ShoppingList'
  extend: 'Ext.grid.Panel'
  alias: 'widget.shopping-list'
  initComponent: () ->
    store = Ext.create('Ext.data.Store', model: 'SG.model.Product')
    
    Ext.apply(this,
      store: store
      viewConfig:
        emptyText: 'No items in the shopping list'
        stripeRows: false
        disableSelection: true
        trackOver: false
      hideHeaders: true
      title: 'Shopping List'
      columnLines: false
      columns: [
        {
          dataIndex: 'name'
          flex: 1
        }
      ]
      bbar: [
        { xtype: 'button', text: 'Remove All', ref: 'clear-button' }
      ]
    )

    @callParent()

    [clearButton] = @query 'button[ref=clear-button]'
    clearButton.on('click', () => @store.removeAll())

  addProducts: (records) ->
    existing = (r.data.id for r in @store.getRange())
    selected = (r for r in records when r.id not in existing)
    @store.loadData(selected, true)
