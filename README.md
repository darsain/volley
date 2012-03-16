# Volley

jQuery plugin for dividing and filtering elements based on their visual position. You can use it for running sequential animations on items.

[See the DEMO](http://darsain.github.com/volley)


## Calling

Volley requires all elements to be positioned in a grid, i.e. their widths and heights has to match (otherwise there is no point for calling volley really).

```js
$items.volley( [ startAt ] [, within ] );
```

### [ startAt ]

Starting point for dividing items. By setting different starting point you can divide items into horizontal, vertical, or diagonal rows. Available points are:

+ `top` - `default` divide items into rows from top to bottom
+ `bottom` - divide items into rows from bottom to top
+ `left` - divide items into columns from left to right
+ `right` - divide items into columns from right to left
+ `left-top` - divide items into diagonal rows from left top corner to right bottom corner
+ `right-top` - divide items into diagonal rows from right top corner to left bottom corner
+ `left-bottom` - divide items into diagonal rows from left bottom corner to right top corner
+ `right-bottom` - divide items into diagonal rows from right bottom corner to left top corner

This is an optional argument and can be omitted if you want to just filter items based on `within`.

### [ within ]

DOM element, or a selector for an element that will be used as a visual filter for items.
If an item is positioned completely outside the `within` element, the item will be ignored and won't be inside the returned arrays of items.

Use this option to run animations only on visible elements. If, for example, you have an items within #container, which has a strict size and `overflow: hidden;`,
passing this element as a `within` argument will filter out all items that are not currently visible within it.

You can also pass `window` as a within, which will return only items visible in a current browser window.

***

### returns

Volley returns jQuery wrapped array with rows, each containing DOM elements of passed items based on their visual position and passed starting point.

```js
var rows = $items.volley() = [
	[
		Row1_El1,
		Row1_El2,
		Row1_El3
	],[
		Row2_El1,
		Row2_El2,
		Row2_El3
	],
	...
];
```

In an example above, array returned into `rows` variable is a jQuery object of arrays, not items, so you can't use any element manipulation jQuery methods like `rows.css`, `rows.hide`, etc.,
but you can use `rows.each`, `rows.map`, ...

However, if only `within` has been passed, volley returns regular jQuery object with filtered items based on their visibility within `within` element.


## Examples

Set background to rows of items from top to bottom

```js
$('ul > li').volley().each( function( index, rowOfItems ){

	// Set background color to one row after another with 50ms delay between them
	setTimeout( function(){

		$(rowOfItems).css({ backgroundColor: '#fff' });

	}, index * 50 );

});
```

Set background to all visible items

```js
$('ul > li').volley( window ).css({ backgroundColor: '#fff' });
```
