/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.grid.column.Template
 * @extends Ext.grid.column.Column
 * 
 * A Column definition class which renders a value by processing a {@link Ext.data.Model Model}'s
 * {@link Ext.data.Model#data data} using a {@link #tpl configured} {@link Ext.XTemplate XTemplate}.
 * 
 *  {@img Ext.grid.column.Template/Ext.grid.column.Template.png Ext.grid.column.Template grid column}
 * 
 * ## Code
 *     Ext.create('Ext.data.Store', {
 *         storeId:'employeeStore',
 *         fields:['firstname', 'lastname', 'senority', 'department'],
 *         groupField: 'department',
 *         data:[
 *             {firstname:"Michael", lastname:"Scott", senority:7, department:"Manangement"},
 *             {firstname:"Dwight", lastname:"Schrute", senority:2, department:"Sales"},
 *             {firstname:"Jim", lastname:"Halpert", senority:3, department:"Sales"},
 *             {firstname:"Kevin", lastname:"Malone", senority:4, department:"Accounting"},
 *             {firstname:"Angela", lastname:"Martin", senority:5, department:"Accounting"}                        
 *         ]
 *     });
 *     
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Column Template Demo',
 *         store: Ext.data.StoreManager.lookup('employeeStore'),
 *         columns: [
 *             {text: 'Full Name',  xtype:'templatecolumn', tpl:'{firstname} {lastname}', flex:1},
 *             {text: 'Deparment (Yrs)', xtype:'templatecolumn', tpl:'{department} ({senority})'}
 *         ],
 *         height: 200,
 *         width: 300,
 *         renderTo: Ext.getBody()
 *     });
 * 
 * @markdown
 */
Ext.define('Ext.grid.column.Template', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.templatecolumn'],
    requires: ['Ext.XTemplate'],
    alternateClassName: 'Ext.grid.TemplateColumn',

    /**
     * @cfg {String/XTemplate} tpl
     * An {@link Ext.XTemplate XTemplate}, or an XTemplate <i>definition string</i> to use to process a
     * {@link Ext.data.Model Model}'s {@link Ext.data.Model#data data} to produce a column's rendered value.
     */
    constructor: function(cfg){
        var me = this,
            tpl;
            
        me.callParent(arguments);
        tpl = me.tpl = (!Ext.isPrimitive(me.tpl) && me.tpl.compile) ? me.tpl : Ext.create('Ext.XTemplate', me.tpl);

        me.renderer = function(value, p, record) {
            var data = Ext.apply({}, record.data, record.getAssociatedData());
            return tpl.apply(data);
        };
    }
});

