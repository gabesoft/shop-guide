Ext.define 'SG.model.Hint'
  extend: 'Ext.data.Model'
  fields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
  ]
  proxy: 
    type: 'rest'
    method: 'GET'
    url: hint_products_path()
    reader:
      type: 'json'

