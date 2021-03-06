Ext.define 'SG.model.Product'
  extend: 'Ext.data.Model'
  fields: [
    { name: 'id',         type: 'string' }
    { name: 'name',       type: 'string' }
    { name: 'tags',       type: 'array' }
    { name: 'category',   type: 'string' }
    { name: 'priority',   type: 'int' }
  ]
