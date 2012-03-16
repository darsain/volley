jQuery(function($){

	// Trigger prettyPrint
	prettyPrint();

	// -----------------------------------------------------------------------------------
	//   Page scripts
	// -----------------------------------------------------------------------------------

	var $tabs = $('#tabs').find('li'),
		$container = $('#sections'),
		$sections = $container.children(),
		hashId = window.location.hash.replace(/^#tab=/, ''),
		initial = hashId && $sections.filter('#'+hashId).length ? hashId : $tabs.eq(0).data('activate'),
		activeClass = 'active',
		hiddenClass = 'hidden';

	// Tabs navigation
	$tabs.on('click', function(e){

		activate( $(this).data('activate') );

		e.preventDefault();

	});

	// Back to top button
	$('a[href="#top"]').on('click', function(e){
		e.preventDefault();
		$(document).scrollTop(0);
	});

	// Populate list items
	$('ul[data-items]').each(function(j,e){

		var	$cont = $(e),
			items = parseInt( $cont.data('items'), 10 ),
			output = '';

		for( var i = 0; i<items; i++ ){
			output += '<li></li>';
		}

		$cont.html( output );

	});

	// Activate section
	function activate( sectionId, noHashChange ){

		if( !noHashChange ) window.location.hash = 'tab='+sectionId;
		$tabs.removeClass(activeClass).filter('[data-activate='+sectionId+']').addClass(activeClass);
		$sections.addClass(hiddenClass).filter('#'+sectionId).removeClass(hiddenClass);

	}

	// Activate initial section
	activate( initial, 1 );

	// -----------------------------------------------------------------------------------
	//   Volley demostrations
	// -----------------------------------------------------------------------------------
	$(".vwrap").each(function(i,e){

		var $wrap = $(e),
			$controls = $wrap.find('.controlbar'),
			$cont = $wrap.find('.volley'),
			$items = $wrap.find('.volley').children(),
			light = 1;

		// Colleys
		$controls.on('click', '[data-direction]', function(){

			var $button = $(this),
				direction = $button.data('direction'),
				offset = 0,
				colorStart = light ? 0 : 155,
				color = 'rgb(' + Math.round( Math.random()*100+colorStart ) + ', ' +
						Math.round( Math.random()*100+colorStart ) + ', ' +
						Math.round( Math.random()*100+colorStart ) + ')';

			light = !light;

			$items.volley( direction, $wrap.find('.within')).each( function(i,e){

				setTimeout( function(){

					$(e).css( 'background-color', color );

				}, offset += 50);

			} );

		});

		// Actions
		$controls.on('click', '[data-action]', function(e){

			var $button = $(this),
				action = $button.data('action'),
				args = $button.data('args');

			switch( action ){

				case 'addWithin':

					args.top = $cont.offset().top - $wrap.offset().top + ( $cont.height() - args.height ) / 2;
					args.left = ( $cont.width() - args.width ) / 2;

					$( $wrap.find('.within')[0] || '<div class="within">').css(args).appendTo( $wrap );

				break;

				case 'removeWithin':

					$wrap.find('.within').remove();

				break;

			}

		});

		// Within move
		$wrap.on('mousedown', '.within', function(e){

			// Ignore other than left mouse button
			if( e.which !== 1 ) return;

			var doc = $(document),
				$within = $(this),
				leftInit = e.clientX,
				topInit = e.clientY,
				posInit = $within.position();

			// Bind dragging events
			doc.bind('mousemove.demo mouseup.demo', function(e){

				var pathX = e.clientX - leftInit,
					pathY = e.clientY - topInit,
					newPos = {
						top: posInit.top + pathY,
						left: posInit.left + pathX
					};

				// Unbind events and remove classes when released
				if( e.type === 'mouseup' ){

					doc.unbind('.demo');

				} else {

					$within.css( newPos );

				}

			});

		});

	});

});