/* DO NOT MODIFY. This file was compiled Sun, 19 Jun 2011 17:11:18 GMT from
 * /apps/shop_guide/app/coffeescripts/app/controller/Home.coffee
 */

(function() {
  Ext.define('SG.controller.Home', {
    extend: 'Ext.app.Controller',
    refs: [
      {
        ref: 'grid',
        selector: 'viewport > search-results-grid[ref=search-grid]'
      }, {
        ref: 'sbox',
        selector: 'viewport > search-box[ref=search-box]'
      }, {
        ref: 'shopList',
        selector: 'viewport > shopping-list[ref=shop-list]'
      }
    ],
    init: function() {
      var grid, sbox, selectors;
      grid = this.refs[0].selector;
      sbox = this.refs[1].selector;
      selectors = {};
      selectors[grid] = {
        addproducts: function(records) {
          return this.getShopList().addProducts(records);
        }
      };
      selectors[sbox] = {
        search: function(query) {
          this.getSbox().collapse();
          return this.getGrid().loadProducts(query);
        }
      };
      return this.control(selectors);
    }
  });
}).call(this);
