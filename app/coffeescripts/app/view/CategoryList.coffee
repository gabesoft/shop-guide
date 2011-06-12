Ext.define 'SG.view.CategoryList'
  extend: 'Ext.grid.Panel'
  alias: 'widget.category-list'
  initComponent: () ->
    store = Ext.create('Ext.data.Store',
      fields: ['name']
      data: [
        { name: 'dairy' }
        { name: 'eggs' }
        { name: 'wine' }
        { name: 'baby' }
        { name: 'liquor' }
      ]
    )

    Ext.apply(this,
      store: store
      title: 'Categories'
      viewConfig:
        emptyText: 'No categories to display'
        stripeRows: false
        disableSelection: true
        trackOver: false
      hideHeaders: true
      columnLines: false
      columns: [
        { 
          header: '' 
          dataIndex: 'name' 
          flex: 1 
          renderer: (value) ->
            Ext.String.format('<a href="#">{0}</a>', value)
        }
      ]
    )

    @callParent()
