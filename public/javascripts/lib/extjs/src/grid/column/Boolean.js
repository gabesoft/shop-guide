/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.grid.column.Boolean
 * @extends Ext.grid.column.Column
 * <p>A Column definition class which renders boolean data fields.  See the {@link Ext.grid.column.Column#xtype xtype}
 * config option of {@link Ext.grid.column.Column} for more details.</p>
 *
 * {@img Ext.grid.column.Boolean/Ext.grid.column.Boolean.png Ext.grid.column.Boolean grid column}
 *
 * ## Code
 *     Ext.create('Ext.data.Store', {
 *        storeId:'sampleStore',
 *        fields:[
 *            {name: 'framework', type: 'string'},
 *            {name: 'rocks', type: 'boolean'}
 *        ],
 *        data:{'items':[
 *            {"framework":"Ext JS 4", "rocks":true},
 *            {"framework":"Sencha Touch", "rocks":true},
 *            {"framework":"Ext GWT", "rocks":true},            
 *            {"framework":"Other Guys", "rocks":false}            
 *        ]},
 *        proxy: {
 *            type: 'memory',
 *            reader: {
 *                type: 'json',
 *                root: 'items'
 *            }
 *        }
 *     });
 *     
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Boolean Column Demo',
 *         store: Ext.data.StoreManager.lookup('sampleStore'),
 *         columns: [
 *             {text: 'Framework',  dataIndex: 'framework', flex: 1},
 *             {
 *                 xtype: 'booleancolumn', 
 *                 text: 'Rocks',
 *                 trueText: 'Yes',
 *                 falseText: 'No', 
 *                 dataIndex: 'rocks'}
 *         ],
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.grid.column.Boolean', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.booleancolumn'],
    alternateClassName: 'Ext.grid.BooleanColumn',

    /**
     * @cfg {String} trueText
     * The string returned by the renderer when the column value is not falsey (defaults to <tt>'true'</tt>).
     */
    trueText: 'true',

    /**
     * @cfg {String} falseText
     * The string returned by the renderer when the column value is falsey (but not undefined) (defaults to
     * <tt>'false'</tt>).
     */
    falseText: 'false',

    /**
     * @cfg {String} undefinedText
     * The string returned by the renderer when the column value is undefined (defaults to <tt>'&#160;'</tt>).
     */
    undefinedText: '&#160;',

    constructor: function(cfg){
        this.callParent(arguments);
        var trueText      = this.trueText,
            falseText     = this.falseText,
            undefinedText = this.undefinedText;

        this.renderer = function(value){
            if(value === undefined){
                return undefinedText;
            }
            if(!value || value === 'false'){
                return falseText;
            }
            return trueText;
        };
    }
});
