/*
 *  jquery-weekpicker - v0.1.0
 *  jQuery Weekpicker plugin
 *  http://www.mihai-marica.ro
 *
 *  Made by Mihai Marica
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

	"use strict";

		var pluginName = "WeekPicker",
			defaults = {
                firstDay: 1,
                dateFormat: "dd/m/yy",
                showOtherMonths: true,
                selectOtherMonths: true,
				showWeek: true
            };

		function WeekPicker ( element, options ) {
			this.element = element;

			this.settings = $.extend( {}, defaults, options );
			this.init();
		}

		$.extend( WeekPicker.prototype, {
			init: function() {
				this.yourOtherFunction();
			},
			yourOtherFunction: function() {
                $( this.element ).datepicker( this.settings );
			}
		} );

		$.fn.weekpicker = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new WeekPicker( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
