Ext.define 'SG.view.CenterLayout'
  extend: 'Ext.layout.FitLayout'
  alias: 'layout.center'
  monitorResize: true

  getLayoutTargetSize: () ->
    target = @container.getLayoutTarget()
    if not target then {} else target.getStyleSize()
  
  onLayout: (ct, target) ->
    @callParent()
    if not ct.collapsed
      @setItemSize (@activeItem || ct.items.itemAt 0, @getLayoutTargetSize())

  setItemSize: (item, size) ->
    left = (size.width - item.getWidth()) / 2
    top = (size.height - item.getHeight()) / 2
    pos = Ext.apply(item.getEl().getPositioning(),
      position: 'absolute'
      left: left
      top: top
    )
    item.getEl().setPositioning(pos)
