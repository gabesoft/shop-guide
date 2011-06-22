Ext.define 'SG.view.CategoryList'
  extend: 'Ext.grid.Panel'
  alias: 'widget.category-list'
  initComponent: () ->
    store = Ext.create('Ext.data.Store',
      model: 'SG.model.Category'
      proxy: 
        type: 'ajax'
        method: 'GET'
        url: search_categories_path(format: 'json')
        reader:
          type: 'json'
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
          dataIndex: 'name' 
          flex: 1 
          renderer: (value) ->
            Ext.String.format('<a href="#">{0}</a>', value)
        }
      ]
    )

    @callParent()
