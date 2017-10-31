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
            dateFormat: "dd/mm/yy",
            showOtherMonths: true,
            selectOtherMonths: true,
            showWeek: true,
            weekFormat: "w/oo"
        };

    function WeekPicker ( element, options ) {
        this.datePickerInput = $( element );
        this.datePickerId = getDatePickerId( this.datePickerInput );

        this.settings = $.extend( {
            beforeShow: this.beforeShow,
            onClose: this.onClose,
            onSelect: this.onSelect
        }, defaults, options );

        this.init();

        return this;
    }

    $.extend( WeekPicker.prototype, {
        init: function() {
            this.weekPickerInput = createWeekPickerInput( this.datePickerInput );

            // initialize the date picker input, but hide it,
            // so only the week picker version remains visible
            this.datePickerInput.datepicker( this.settings );
            this.datePickerInput.hide();

            this.weekPickerInput.focus( function() {
                this.datePickerInput.show().focus().hide();
            }.bind( this ) );

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
        },
        onSelect: function( dateText, inst ) {
            var datePickerInput = $( "#" + inst.id );
            var weekPickerInput = $( "#" + datePickerInput.attr( "data-weekpicker-id" ) );

            var datepickerValue = $( this ).datepicker( "getDate" );
            var year = datepickerValue.getFullYear();
            var month = datepickerValue.getMonth();

            var dateObj = new Date( year, month, datepickerValue.getDate() );
            var week = $.datepicker.iso8601Week( dateObj );

            if ( week > 50 && month === 0 ) {
                year--;
            }

            weekPickerInput.val( week + "/" + year );
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

    var getDatePickerId = function( datePickerInput ) {
        var datePickerId = datePickerInput.attr( "id" );

        if ( datePickerId === undefined ) {
            datePickerId = generateUniqueId( "datepicker_" );
            datePickerInput.attr( "id", datePickerId );
        }

        return datePickerId;
    };

    var createWeekPickerInput = function( datePickerInput ) {
        var datePickerId = datePickerInput.attr( "id" );
        var weekPickerId = datePickerId + "_weekpicker";
        var weekPickerInput = $( "<input type=\"text\" id=\"" + weekPickerId +
            "\" data-datepicker-id=\"" + datePickerId + "\">" );

        datePickerInput.after( weekPickerInput );
        datePickerInput.attr( "data-weekpicker-id", weekPickerId );

        return weekPickerInput;
    };

    var generateUniqueId = function( prefix ) {
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
