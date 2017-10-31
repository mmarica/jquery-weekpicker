;( function( $, window, document, undefined ) {

    "use strict";

    var pluginName = "WeekPicker",
        defaults = {
            firstDay: 1,
            dateFormat: "dd/mm/yy",
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
            createWeekPickerInput( $( this.element ) );
            $( this.element ).datepicker( this.settings );

            $( "body" ).on( "mousemove", ".ui-weekpicker .ui-datepicker-calendar tr",
                function() { $( this ).find( "td a" ).addClass( "ui-state-hover" ); } );

            $( "body" ).on( "mouseleave", ".ui-weekpicker .ui-datepicker-calendar tr",
                function() { $( this ).find( "td a" ).removeClass( "ui-state-hover" ); } );

            return this;
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

    var createWeekPickerInput = function( datePickerInput ) {
        var datePickerId = datePickerInput.attr( "id" );

        if ( datePickerId === undefined ) {
            datePickerId = randomId( "datepicker_" );
            datePickerInput.attr( "id", datePickerId );
        }

        var weekPickerId = datePickerId + "_weekpicker";
        var weekPickerInput = $( "<input type=\"text\" id=\"" + weekPickerId +
            "\" data-datepicker-id=\"" + datePickerId + "\">" );

        datePickerInput.after( weekPickerInput );
        datePickerInput.attr( "data-weekpicker-id", weekPickerId );
    };

    var randomId = function( prefix ) {
        function random() {
            return Math.floor( ( 1 + Math.random() ) * 0x100000000 ).toString( 16 ).substring( 1 );
        }

        var id;

        do {
            id = prefix + random();
        } while ( $( "#" + id ).length );

        return id;
    };
} )( jQuery, window, document );
