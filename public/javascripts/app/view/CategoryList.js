/* DO NOT MODIFY. This file was compiled Wed, 22 Jun 2011 14:59:42 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/CategoryList.coffee
 */

(function() {
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
            renderer: function(value) {
              return Ext.String.format('<a href="#" action="{0}">{0}</a>', value);
            }
          }
        ],
        listeners: {
          click: function() {
            return console.log('click', arguments);
          },
          containerclick: function() {
            return console.log('containerclick', arguments);
          },
          headerclick: function() {
            return console.log('headerclick', arguments);
          },
          itemclick: function(component, record, item, index, e, options) {
            component.store.load({
              params: {
                parent: record.data.value
              }
            });
            console.log(component);
            return component.panel.setTitle('<< ' + record.data.name);
          }
        }
      });
      this.callParent();
      store.load();
      this.setTitle('Categories');
      return this.header.on('click', function() {
        return console.log('header.click');
      });
    }
  });
}).call(this);
