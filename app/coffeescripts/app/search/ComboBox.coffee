Ext.define 'SG.search.ComboBox'
  extend: 'Ext.form.ComboBox'
  initComponent: () ->
    products = Ext.create('Ext.data.Store',
      fields: ['name']
      data: [
        { name: 'prod a' }
        { name: 'prod b' }
        { name: 'prod c' }
      ]
    )

    Ext.apply(this,
      fieldLabel: 'Search Products'
      store: products
      queryMode: 'local'
      displayField: 'name'
      valueField: 'name'
    )

    @callParent()

#createSearchCombo = () ->
  #products = Ext.create('Ext.data.Store',
    #fields: ['name']
    #data: [
      #name: 'prod a'
      #name: 'prod b'
      #name: 'prod c' 
    #]
  #)

  #Ext.create('Ext.form.ComboBox',
    #fieldLabel: 'Search Products'
    #store: products
    #queryMode: 'local'
    #displayField: 'name'
    #valueField: 'name'
  #)
