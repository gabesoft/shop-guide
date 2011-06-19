/* DO NOT MODIFY. This file was compiled Sun, 19 Jun 2011 04:58:55 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/CenterLayout.coffee
 */

(function() {
  Ext.define('SG.view.CenterLayout', {
    extend: 'Ext.layout.FitLayout',
    alias: 'layout.center',
    monitorResize: true,
    getLayoutTargetSize: function() {
      var target;
      target = this.container.getLayoutTarget();
      if (!target) {
        return {};
      } else {
        return target.getStyleSize();
      }
    },
    onLayout: function(ct, target) {
      this.callParent();
      if (!ct.collapsed) {
        return this.setItemSize(this.activeItem || ct.items.itemAt(0, this.getLayoutTargetSize()));
      }
    },
    setItemSize: function(item, size) {
      var left, pos, top;
      left = (size.width - item.getWidth()) / 2;
      top = (size.height - item.getHeight()) / 2;
      pos = Ext.apply(item.getEl().getPositioning(), {
        position: 'absolute',
        left: left,
        top: top
      });
      return item.getEl().setPositioning(pos);
    }
  });
}).call(this);
