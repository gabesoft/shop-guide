Ext.define 'SG.view.search.GridPanel'
  extend: 'Ext.grid.Panel'
  alias: 'widget.sg-search-grid'
  initComponent: () ->
    selModel = Ext.create('Ext.selection.CheckboxModel'
      injectCheckbox: 0
    )
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
      store: store
      selModel: selModel
      columns: [
        { text: 'Product', dataIndex: 'name' }
      ]
      columnLines: true
      frame: true
      title: 'Search Results'
      iconCls: 'icon-grid'
    )

    @callParent()
