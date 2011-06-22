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
          renderer: (value) ->
            Ext.String.format('<a href="#" action="{0}">{0}</a>', value)
        }
      ]
      #header: Ext.create 'Ext.panel.Header',
        #title: 'Categories'
        #orientation: 'horizontal'
        #dock: 'top'
        #listeners: 
          #click: () -> console.log 'header.click'
      listeners: 
          click: () -> console.log 'click', arguments
          containerclick: () -> console.log 'containerclick', arguments
          headerclick: () -> console.log 'headerclick', arguments
          itemclick: (component, record, item, index, e, options) -> 
            component.store.load 
              params : 
                parent : record.data.value
            console.log component
            component.panel.setTitle '<< ' + record.data.name
    )

    @callParent()
    store.load()

    @setTitle 'Categories'
    @header.on 'click', () -> console.log 'header.click'
