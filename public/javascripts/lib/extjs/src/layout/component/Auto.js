/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.layout.component.Auto
 * @extends Ext.layout.component.Component
 * @private
 *
 * <p>The AutoLayout is the default layout manager delegated by {@link Ext.Component} to
 * render any child Elements when no <tt>{@link Ext.Component#layout layout}</tt> is configured.</p>
 */

Ext.define('Ext.layout.component.Auto', {

    /* Begin Definitions */

    alias: 'layout.autocomponent',

    extend: 'Ext.layout.component.Component',

    /* End Definitions */

    type: 'autocomponent',

    onLayout : function(width, height) {
        this.setTargetSize(width, height);
    }
});
