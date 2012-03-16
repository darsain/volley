/*!
 * jQuery Volley v1.0.0
 * https://github.com/Darsain/volley
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/MIT
 */

/*jshint eqeqeq: true, noempty: true, strict: true, undef: true, expr: true, smarttabs: true, browser: true */
/*global jQuery:false */

;(function($, undefined){
'use strict';

$.fn.volley = function( arg1, arg2 ){

	var $items = this,
		offsets = $items.map(function(i,e){

			var	$item = $(e),
				of = $item.offset();

			of.right = of.left + $item.outerWidth();
			of.bottom = of.top + $item.outerHeight();

			return of;

		}),
		available = ['top','bottom','left','right','left-top','left-bottom','right-top','right-bottom'],
		startAt = $.inArray( arg1, available ) !== -1 ? arg1 : false,
		map = 0;

	// Build map
	$(startAt ? arg2 : arg1).eq(0).each(function(i,e){

		var $item = $(e);

		map = $item.is( window ) ? { left: $item.scrollLeft(), top: $item.scrollTop() } : $item.offset();
		map.right = map.left + $item.innerWidth();
		map.bottom = map.top + $item.innerHeight();

	});

	// Filter items
	if( map ){

		var newOffsets = [];

		$items = $items.filter(function(i){

			return !( offsets[i].bottom < map.top || offsets[i].top > map.bottom || offsets[i].right < map.left || offsets[i].left > map.right ) && newOffsets.push(offsets[i]);

		});

		offsets = newOffsets;

	}

	// If only map based filter was requested, return filtered items as a jQuery object
	if( !startAt ){

		return $items;

	}

	// Build basic top to bottom rows
	var rows = [],
		rowIndex = -1,
		tempOffset;
	for( var i = 0; i < $items.length; i++ ){

		// Create a new row
		if( offsets[i].top !== tempOffset ){

			rowIndex++;
			rows[rowIndex] = [];
			tempOffset = offsets[i].top;

		}

		// Divide items into rows
		rows[rowIndex].push( $items[i] );

	}

	// Rearrange array according to passed direction argument
	var newRows = [],
		diagonalIterations = rows.length + rows[0].length;
	switch( startAt ){

		case 'bottom':

			rows = rows.reverse();

		break;

		case 'left':
		case 'right':

			for( var k = 0; k < rows[0].length; k++ ){

				newRows[k] = [];

				for( var l = 0; l < rows.length; l++ ){

					rows[l] && rows[l][k] && newRows[k].push(rows[l][k]);

				}

			}

			rows = startAt === 'right' ? newRows.reverse() : newRows;

		break;

		case 'left-top':
		case 'right-bottom':

			for( var m = 0; m < diagonalIterations; m++ ){

				newRows[m] = [];

				for( var n = m; n >= 0; n-- ){

					if( rows[m-n] && rows[m-n][n] ){

						newRows[m].push( rows[m-n][n] );

					}

				}

			}

			rows = startAt === 'right-bottom' ? newRows.reverse() : newRows;

		break;

		case 'right-top':
		case 'left-bottom':

			for( var o = rows[0].length-1; o >= rows[0].length - diagonalIterations; o-- ){

				var nrIndex = newRows.length;
				newRows[nrIndex] = [];

				for( var p = 0; p < rows[0].length; p++ ){

					rows[p] && rows[p][o+p] && newRows[nrIndex].push( rows[p][o+p] );

				}

			}

			rows = startAt === 'left-bottom' ? newRows.reverse() : newRows;

		break;

	}

	return $(rows);

};

})(jQuery);