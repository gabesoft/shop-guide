/* DO NOT MODIFY. This file was compiled Wed, 15 Jun 2011 14:52:38 GMT from
 * /apps/shop_guide/app/coffeescripts/app/controller/Home.coffee
 */

(function() {
  Ext.define('SG.controller.Home', {
    extend: 'Ext.app.Controller',
    refs: [
      {
        ref: 'grid',
        selector: 'viewport > search-results-grid[region=center]'
      }, {
        ref: 'sbox',
        selector: 'viewport > search-box[region=north]'
      }, {
        ref: 'shopList',
        selector: 'viewport > shopping-list[region=east]'
      }
    ],
    init: function() {
      console.log('home initialized');
      return this.control({
        'viewport > search-results-grid[region=center]': {
          'add-products': function(records) {
            return this.getShopList().addProducts(records);
          }
        },
        'viewport > search-box[region=north]': {
          search: function(query) {
            return this.getGrid().loadProducts(query);
          }
        }
      });
    }
  });
}).call(this);
