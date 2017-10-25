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

        this.settings = $.extend( {
            beforeShow: this.beforeShow,
            onClose: this.onClose
        }, defaults, options );

        return this.init();
    }

    $.extend( WeekPicker.prototype, {
        init: function() {
            $( this.element ).datepicker( this.settings );

            $( "body" ).on( "mousemove", ".ui-weekpicker .ui-datepicker-calendar tr",
                function() { $( this ).find( "td a" ).addClass( "ui-state-hover" ); } );

            $( "body" ).on( "mouseleave", ".ui-weekpicker .ui-datepicker-calendar tr",
                function() { $( this ).find( "td a" ).removeClass( "ui-state-hover" ); } );
        },
        beforeShow: function() {
            $( this ).datepicker( "widget" ).addClass( "ui-weekpicker" );
        },
        onClose: function() {
            $( this ).datepicker( "widget" ).removeClass( "ui-weekpicker" );
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