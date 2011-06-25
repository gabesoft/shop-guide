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
          renderer: (value, meta, record) ->
            if record.data.leaf
            then Ext.String.format '<span>{0}</span>', value
            else Ext.String.format '<a action="{0}">{0}</a>', value
        }
      ]
      listeners:
          itemclick: (component, record, item, index, e, options) ->
            if record.data.leaf then
              #TODO: get praducts for category
            else
              #TODO: get praducts for category
              component.store.load
                params:
                  parent: record.data.value
              component.panel.setTitle '<< ' + record.data.name
              @recordStack.push record.data
    )

    @callParent()
    store.load()

    @recordStack = []
    @setTitle 'Categories'
    @header.on 'click', () =>
      if @recordStack.length > 0
        record = @recordStack.pop()
        parent = @recordStack[@recordStack.length - 1]
        @setTitle if parent then '<< ' + parent.name else 'Categories'
        @store.load
          params:
            sibling: record.value



