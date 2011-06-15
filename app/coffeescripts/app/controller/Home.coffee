Ext.define('SG.controller.Home',
  extend: 'Ext.app.Controller'

  refs: [
    { ref: 'grid',      selector: 'viewport > search-results-grid[region=center]' }
    { ref: 'sbox',      selector: 'viewport > search-box[region=north]' }
    { ref: 'shopList',  selector: 'viewport > shopping-list[region=east]' }
  ]

  init: () ->
    console.log 'home initialized'
    @control(
      'viewport > search-results-grid[region=center]':
        'add-products': (records) -> @getShopList().addProducts(records)
      'viewport > search-box[region=north]':
        search: (query) -> @getGrid().loadProducts(query)
    )
)
