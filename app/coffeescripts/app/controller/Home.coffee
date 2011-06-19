Ext.define('SG.controller.Home',
  extend: 'Ext.app.Controller'

  refs: [
    { ref: 'grid',      selector: 'viewport > search-results-grid[ref=search-grid]' }
    { ref: 'sbox',      selector: 'viewport > search-box[ref=search-box]' }
    { ref: 'shopList',  selector: 'viewport > shopping-list[ref=shop-list]' }
  ]

  init: () ->
    grid = @refs[0].selector
    sbox = @refs[1].selector
    selectors = {}
    selectors[grid] = addproducts: (records) -> @getShopList().addProducts(records)
    selectors[sbox] =
      search: (query) ->
        @getSbox().collapse()
        @getGrid().loadProducts(query)
    @control selectors
)
