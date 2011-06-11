Ext.define 'SG.search.Hint'
  extend: 'Ext.data.Model'
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
  ]
  proxy: 
    type: 'rest'
    method: 'GET'
    url: hint_products_path() #+ '.json'
    reader:
      type: 'json'

    
Ext.define 'SG.search.ComboBox'
  extend: 'Ext.form.ComboBox'
  alias: 'widget.sg-search-combo'
  initComponent: () ->
    #url = '#{hint_products_path  :format => :json}'
    store = Ext.create('Ext.data.Store',
      model: 'SG.search.Hint'
      #fields: ['name']
      #data: [
        #{ name: 'milk' }
        #{ name: 'coffee' }
        #{ name: 'shaving cream' }
        #{ name: 'shampoo' }
      #]
    )

    Ext.apply(this,
      fieldLabel: 'Search Products'
      hideLabel: false
      hideTrigger: true
      typeAhead: false 
      store: store
      queryMode: 'remote'
      displayField: 'name'
      valueField: 'name'
      width: 200
      style: 'margin-top:20px'
      listConfig:
        loadingText: 'Searching...'
        emptyText: 'No matching products found'
    )

    @callParent()
