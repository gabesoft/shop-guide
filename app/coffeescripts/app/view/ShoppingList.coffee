Ext.define 'SG.view.ShoppingList'
  extend: 'Ext.grid.Panel'
  alias: 'widget.shopping-list'
  initComponent: () ->
    store = Ext.create('Ext.data.Store',
      fields: ['name']
      data: [
        { name: 'milk' }
        { name: 'eggs' }
        { name: 'wine' }
        { name: 'shampoo' }
        { name: 'vodka' }
        { name: 'shaving cream' }
        { name: 'paper napkins' }
      ]
    )
    
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
    )

    @callParent()
