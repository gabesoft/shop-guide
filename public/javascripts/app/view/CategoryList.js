/* DO NOT MODIFY. This file was compiled Fri, 24 Jun 2011 17:34:28 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/CategoryList.coffee
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Ext.define('SG.view.CategoryList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.category-list',
    initComponent: function() {
      var store;
      store = Ext.create('Ext.data.Store', {
        model: 'SG.model.Category',
        proxy: {
          type: 'ajax',
          method: 'GET',
          url: search_categories_path({
            format: 'json'
          }),
          reader: {
            type: 'json'
          }
        }
      });
      Ext.apply(this, {
        store: store,
        viewConfig: {
          emptyText: 'No categories to display',
          stripeRows: false,
          disableSelection: true,
          trackOver: false
        },
        hideHeaders: true,
        columnLines: false,
        columns: [
          {
            dataIndex: 'name',
            flex: 1,
            renderer: function(value, meta, record) {
              if (record.data.leaf) {
                return Ext.String.format('<span>{0}</span>', value);
              } else {
                return Ext.String.format('<a action="{0}">{0}</a>', value);
              }
            }
          }
        ],
        listeners: {
          itemclick: function(component, record, item, index, e, options) {
            if (record.data.leaf) {
              ;
            } else {
              component.store.load({
                params: {
                  parent: record.data.value
                }
              });
              component.panel.setTitle('<< ' + record.data.name);
              return this.recordStack.push(record.data);
            }
          }
        }
      });
      this.callParent();
      store.load();
      this.recordStack = [];
      this.setTitle('Categories');
      return this.header.on('click', __bind(function() {
        var parent, record;
        if (this.recordStack.length > 0) {
          record = this.recordStack.pop();
          parent = this.recordStack[this.recordStack.length - 1];
          this.setTitle(parent ? '<< ' + parent.name : 'Categories');
          return this.store.load({
            params: {
              sibling: record.value
            }
          });
        }
      }, this));
    }
  });
}).call(this);
