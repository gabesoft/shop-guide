Ext.define 'SG.model.Category'
  extend: 'Ext.data.Model'
  fields: [
    { name: 'name',   type: 'string' },
    { name: 'value',  type: 'string' },
    { name: 'leaf',   type: 'boolean' },
  ]
