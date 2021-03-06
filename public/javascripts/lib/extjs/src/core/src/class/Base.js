/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @author Jacky Nguyen <jacky@sencha.com>
 * @docauthor Jacky Nguyen <jacky@sencha.com>
 * @class Ext.Base
 *
 * The root of all classes created with {@link Ext#define}
 * All prototype and static members of this class are inherited by any other class
 *
 */
(function(flexSetter) {

var Base = Ext.Base = function() {};
    Base.prototype = {
        $className: 'Ext.Base',

        $class: Base,

        /**
         * Get the reference to the current class from which this object was instantiated. Unlike {@link Ext.Base#statics},
         * `this.self` is scope-dependent and it's meant to be used for dynamic inheritance. See {@link Ext.Base#statics}
         * for a detailed comparison
         *
         *     Ext.define('My.Cat', {
         *         statics: {
         *             speciesName: 'Cat' // My.Cat.speciesName = 'Cat'
         *         },
         *
         *         constructor: function() {
         *             alert(this.self.speciesName); / dependent on 'this'
         *
         *             return this;
         *         },
         *
         *         clone: function() {
         *             return new this.self();
         *         }
         *     });
         *
         *
         *     Ext.define('My.SnowLeopard', {
         *         extend: 'My.Cat',
         *         statics: {
         *             speciesName: 'Snow Leopard'         // My.SnowLeopard.speciesName = 'Snow Leopard'
         *         }
         *     });
         *
         *     var cat = new My.Cat();                     // alerts 'Cat'
         *     var snowLeopard = new My.SnowLeopard();     // alerts 'Snow Leopard'
         *
         *     var clone = snowLeopard.clone();
         *     alert(Ext.getClassName(clone));             // alerts 'My.SnowLeopard'
         *
         * @type Class
         * @protected
         */
        self: Base,

        // Default constructor, simply returns `this`
        constructor: function() {
            return this;
        },

        /**
         * Initialize configuration for this class. a typical example:
         *
         *     Ext.define('My.awesome.Class', {
         *         // The default config
         *         config: {
         *             name: 'Awesome',
         *             isAwesome: true
         *         },
         *
         *         constructor: function(config) {
         *             this.initConfig(config);
         *
         *             return this;
         *         }
         *     });
         *
         *     var awesome = new My.awesome.Class({
         *         name: 'Super Awesome'
         *     });
         *
         *     alert(awesome.getName()); // 'Super Awesome'
         *
         * @protected
         * @param {Object} config
         * @return {Object} mixins The mixin prototypes as key - value pairs
         */
        initConfig: function(config) {
            if (!this.$configInited) {
                this.config = Ext.Object.merge({}, this.config || {}, config || {});

                this.applyConfig(this.config);

                this.$configInited = true;
            }

            return this;
        },

        /**
         * @private
         */
        setConfig: function(config) {
            this.applyConfig(config || {});

            return this;
        },

        /**
         * @private
         */
        applyConfig: flexSetter(function(name, value) {
            var setter = 'set' + Ext.String.capitalize(name);

            if (typeof this[setter] === 'function') {
                this[setter].call(this, value);
            }

            return this;
        }),

        /**
         * Call the parent's overridden method. For example:
         *
         *     Ext.define('My.own.A', {
         *         constructor: function(test) {
         *             alert(test);
         *         }
         *     });
         *
         *     Ext.define('My.own.B', {
         *         extend: 'My.own.A',
         *
         *         constructor: function(test) {
         *             alert(test);
         *
         *             this.callParent([test + 1]);
         *         }
         *     });
         *
         *     Ext.define('My.own.C', {
         *         extend: 'My.own.B',
         *
         *         constructor: function() {
         *             alert("Going to call parent's overriden constructor...");
         *
         *             this.callParent(arguments);
         *         }
         *     });
         *
         *     var a = new My.own.A(1); // alerts '1'
         *     var b = new My.own.B(1); // alerts '1', then alerts '2'
         *     var c = new My.own.C(2); // alerts "Going to call parent's overriden constructor..."
         *                              // alerts '2', then alerts '3'
         *
         * @protected
         * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
         * from the current method, for example: `this.callParent(arguments)`
         * @return {Mixed} Returns the result from the superclass' method
         */
        callParent: function(args) {
            var method = this.callParent.caller,
                parentClass, methodName;

            if (!method.$owner) {
                //<debug error>
                if (!method.caller) {
                    Ext.Error.raise({
                        sourceClass: Ext.getClassName(this),
                        sourceMethod: "callParent",
                        msg: "Attempting to call a protected method from the public scope, which is not allowed"
                    });
                }
                //</debug>

                method = method.caller;
            }

            parentClass = method.$owner.superclass;
            methodName = method.$name;

            //<debug error>
            if (!(methodName in parentClass)) {
                Ext.Error.raise({
                    sourceClass: Ext.getClassName(this),
                    sourceMethod: methodName,
                    msg: "this.callParent() was called but there's no such method (" + methodName +
                         ") found in the parent class (" + (Ext.getClassName(parentClass) || 'Object') + ")"
                 });
            }
            //</debug>

            return parentClass[methodName].apply(this, args || []);
        },


        /**
         * Get the reference to the class from which this object was instantiated. Note that unlike {@link Ext.Base#self},
         * `this.statics()` is scope-independent and it always returns the class from which it was called, regardless of what
         * `this` points to during run-time
         *
         *     Ext.define('My.Cat', {
         *         statics: {
         *             totalCreated: 0,
         *             speciesName: 'Cat' // My.Cat.speciesName = 'Cat'
         *         },
         *  
         *         constructor: function() {
         *             var statics = this.statics();
         *  
         *             alert(statics.speciesName);     // always equals to 'Cat' no matter what 'this' refers to
         *                                             // equivalent to: My.Cat.speciesName
         *  
         *             alert(this.self.speciesName);   // dependent on 'this'
         *  
         *             statics.totalCreated++;
         *  
         *             return this;
         *         },
         *  
         *         clone: function() {
         *             var cloned = new this.self;                      // dependent on 'this'
         *  
         *             cloned.groupName = this.statics().speciesName;   // equivalent to: My.Cat.speciesName
         *  
         *             return cloned;
         *         }
         *     });
         *
         *
         *     Ext.define('My.SnowLeopard', {
         *         extend: 'My.Cat',
         *  
         *         statics: {
         *             speciesName: 'Snow Leopard'     // My.SnowLeopard.speciesName = 'Snow Leopard'
         *         },
         *  
         *         constructor: function() {
         *             this.callParent();
         *         }
         *     });
         *
         *     var cat = new My.Cat();                 // alerts 'Cat', then alerts 'Cat'
         *
         *     var snowLeopard = new My.SnowLeopard(); // alerts 'Cat', then alerts 'Snow Leopard'
         *
         *     var clone = snowLeopard.clone();
         *     alert(Ext.getClassName(clone));         // alerts 'My.SnowLeopard'
         *     alert(clone.groupName);                 // alerts 'Cat'
         *
         *     alert(My.Cat.totalCreated);             // alerts 3
         *
         * @protected
         * @return {Class}
         */
        statics: function() {
            var method = this.statics.caller,
                self = this.self;

            if (!method) {
                return self;
            }

            return method.$owner;
        },

        /**
         * Call the original method that was previously overridden with {@link Ext.Base#override}
         *
         *     Ext.define('My.Cat', {
         *         constructor: function() {
         *             alert("I'm a cat!");
         *   
         *             return this;
         *         }
         *     });
         *
         *     My.Cat.override({
         *         constructor: function() {
         *             alert("I'm going to be a cat!");
         *   
         *             var instance = this.callOverridden();
         *   
         *             alert("Meeeeoooowwww");
         *   
         *             return instance;
         *         }
         *     });
         *
         *     var kitty = new My.Cat(); // alerts "I'm going to be a cat!"
         *                               // alerts "I'm a cat!"
         *                               // alerts "Meeeeoooowwww"
         *
         * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
         * @return {Mixed} Returns the result after calling the overridden method
         */
        callOverridden: function(args) {
            var method = this.callOverridden.caller;

            //<debug error>
            if (!method.$owner) {
                Ext.Error.raise({
                    sourceClass: Ext.getClassName(this),
                    sourceMethod: "callOverridden",
                    msg: "Attempting to call a protected method from the public scope, which is not allowed"
                });
            }

            if (!method.$previous) {
                Ext.Error.raise({
                    sourceClass: Ext.getClassName(this),
                    sourceMethod: "callOverridden",
                    msg: "this.callOverridden was called in '" + method.$name +
                         "' but this method has never been overridden"
                 });
            }
            //</debug>

            return method.$previous.apply(this, args || []);
        },

        destroy: function() {}
    };

    // These static properties will be copied to every newly created class with {@link Ext#define}
    Ext.apply(Ext.Base, {
        /**
         * Create a new instance of this Class.
         *
         *     Ext.define('My.cool.Class', {
         *         ...
         *     });
         *      
         *     My.cool.Class.create({
         *         someConfig: true
         *     });
         *
         * All parameters are passed to the constructor of the class.
         *
         * @return {Object} the created instance.
         * @static
         */
        create: function() {
            return Ext.create.apply(Ext, [this].concat(Array.prototype.slice.call(arguments, 0)));
        },

        /**
         * @private
         */
        own: flexSetter(function(name, value) {
            if (typeof value === 'function') {
                this.ownMethod(name, value);
            }
            else {
                this.prototype[name] = value;
            }
        }),

        /**
         * @private
         */
        ownMethod: function(name, fn) {
            var originalFn;

            if (fn.$owner !== undefined && fn !== Ext.emptyFn) {
                originalFn = fn;

                fn = function() {
                    return originalFn.apply(this, arguments);
                };
            }

            //<debug>
            var className;
            className = Ext.getClassName(this);
            if (className) {
                fn.displayName = className + '#' + name;
            }
            //</debug>
            fn.$owner = this;
            fn.$name = name;

            this.prototype[name] = fn;
        },

        /**
         * Add / override static properties of this class.
         *
         *     Ext.define('My.cool.Class', {
         *         ...
         *     });
         *
         *     My.cool.Class.addStatics({
         *         someProperty: 'someValue',      // My.cool.Class.someProperty = 'someValue'
         *         method1: function() { ... },    // My.cool.Class.method1 = function() { ... };
         *         method2: function() { ... }     // My.cool.Class.method2 = function() { ... };
         *     });
         *
         * @param {Object} members
         * @return {Ext.Base} this
         * @static
         */
        addStatics: function(members) {
            for (var name in members) {
                if (members.hasOwnProperty(name)) {
                    this[name] = members[name];
                }
            }

            return this;
        },

        /**
         * Add methods / properties to the prototype of this class.
         *
         *     Ext.define('My.awesome.Cat', {
         *         constructor: function() {
         *             ...
         *         }
         *     });
         *
         *      My.awesome.Cat.implement({
         *          meow: function() {
         *             alert('Meowww...');
         *          }
         *      });
         *
         *      var kitty = new My.awesome.Cat;
         *      kitty.meow();
         *
         * @param {Object} members
         * @static
         */
        implement: function(members) {
            var prototype = this.prototype,
                name, i, member, previous;
            //<debug>
            var className = Ext.getClassName(this);
            //</debug>
            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];

                    if (typeof member === 'function') {
                        member.$owner = this;
                        member.$name = name;
                        //<debug>
                        if (className) {
                            member.displayName = className + '#' + name;
                        }
                        //</debug>
                    }

                    prototype[name] = member;
                }
            }

            if (Ext.enumerables) {
                var enumerables = Ext.enumerables;

                for (i = enumerables.length; i--;) {
                    name = enumerables[i];

                    if (members.hasOwnProperty(name)) {
                        member = members[name];
                        member.$owner = this;
                        member.$name = name;
                        prototype[name] = member;
                    }
                }
            }
        },

        /**
         * Borrow another class' members to the prototype of this class.
         *
         *     Ext.define('Bank', {
         *         money: '$$$',
         *         printMoney: function() {
         *             alert('$$$$$$$');
         *         }
         *     });
         *
         *     Ext.define('Thief', {
         *         ...
         *     });
         *
         *     Thief.borrow(Bank, ['money', 'printMoney']);
         *
         *     var steve = new Thief();
         *
         *     alert(steve.money); // alerts '$$$'
         *     steve.printMoney(); // alerts '$$$$$$$'
         *
         * @param {Ext.Base} fromClass The class to borrow members from
         * @param {Array/String} members The names of the members to borrow
         * @return {Ext.Base} this
         * @static
         * @private
         */
        borrow: function(fromClass, members) {
            var fromPrototype = fromClass.prototype,
                i, ln, member;

            members = Ext.Array.from(members);

            for (i = 0, ln = members.length; i < ln; i++) {
                member = members[i];

                this.own(member, fromPrototype[member]);
            }

            return this;
        },

        /**
         * Override prototype members of this class. Overridden methods can be invoked via
         * {@link Ext.Base#callOverridden}
         *
         *     Ext.define('My.Cat', {
         *         constructor: function() {
         *             alert("I'm a cat!");
         *
         *             return this;
         *         }
         *     });
         *
         *     My.Cat.override({
         *         constructor: function() {
         *             alert("I'm going to be a cat!");
         *
         *             var instance = this.callOverridden();
         *
         *             alert("Meeeeoooowwww");
         *
         *             return instance;
         *         }
         *     });
         *
         *     var kitty = new My.Cat(); // alerts "I'm going to be a cat!"
         *                               // alerts "I'm a cat!"
         *                               // alerts "Meeeeoooowwww"
         *
         * @param {Object} members
         * @return {Ext.Base} this
         * @static
         */
        override: function(members) {
            var prototype = this.prototype,
                name, i, member, previous;

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];

                    if (typeof member === 'function') {
                        if (typeof prototype[name] === 'function') {
                            previous = prototype[name];
                            member.$previous = previous;
                        }

                        this.ownMethod(name, member);
                    }
                    else {
                        prototype[name] = member;
                    }
                }
            }

            if (Ext.enumerables) {
                var enumerables = Ext.enumerables;

                for (i = enumerables.length; i--;) {
                    name = enumerables[i];

                    if (members.hasOwnProperty(name)) {
                        if (prototype[name] !== undefined) {
                            previous = prototype[name];
                            members[name].$previous = previous;
                        }

                        this.ownMethod(name, members[name]);
                    }
                }
            }

            return this;
        },

        /**
         * Used internally by the mixins pre-processor
         * @private
         */
        mixin: flexSetter(function(name, cls) {
            var mixin = cls.prototype,
                my = this.prototype,
                i, fn;

            for (i in mixin) {
                if (mixin.hasOwnProperty(i)) {
                    if (my[i] === undefined) {
                        if (typeof mixin[i] === 'function') {
                            fn = mixin[i];

                            if (fn.$owner === undefined) {
                                this.ownMethod(i, fn);
                            }
                            else {
                                my[i] = fn;
                            }
                        }
                        else {
                            my[i] = mixin[i];
                        }
                    }
                    else if (i === 'config' && my.config && mixin.config) {
                        Ext.Object.merge(my.config, mixin.config);
                    }
                }
            }

            if (my.mixins === undefined) {
                my.mixins = {};
            }

            my.mixins[name] = mixin;
        }),

        /**
         * Get the current class' name in string format.
         *
         *     Ext.define('My.cool.Class', {
         *         constructor: function() {
         *             alert(this.self.getName()); // alerts 'My.cool.Class'
         *         }
         *     });
         *
         *     My.cool.Class.getName(); // 'My.cool.Class'
         *
         * @return {String} className
         */
        getName: function() {
            return Ext.getClassName(this);
        },

        /**
         * Create aliases for existing prototype methods. Example:
         *
         *     Ext.define('My.cool.Class', {
         *         method1: function() { ... },
         *         method2: function() { ... }
         *     });
         *
         *     var test = new My.cool.Class();
         *
         *     My.cool.Class.createAlias({
         *         method3: 'method1',
         *         method4: 'method2'
         *     });
         *
         *     test.method3(); // test.method1()
         *
         *     My.cool.Class.createAlias('method5', 'method3');
         *
         *     test.method5(); // test.method3() -> test.method1()
         *
         * @param {String/Object} alias The new method name, or an object to set multiple aliases. See
         * {@link Ext.Function#flexSetter flexSetter}
         * @param {String/Object} origin The original method name
         * @static
         * @method
         */
        createAlias: flexSetter(function(alias, origin) {
            this.prototype[alias] = this.prototype[origin];
        })
    });

})(Ext.Function.flexSetter);

