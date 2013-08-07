PLUGINS.svg = function(api, svg, corner, adjustMethod)
{
	var doc = $(document),
		elem = svg[0],
		result = {},
		name, box, position, dimensions;

	// Ascend the parentNode chain until we find an element with getBBox()
	while(!elem.getBBox) { elem = elem.parentNode; }
	if(!elem.getBBox || !elem.parentNode) { return FALSE; }

	// Determine which shape calculation to use
	switch(elem.nodeName) {
		case 'rect':
			position = PLUGINS.svg.toPixel(elem, elem.x.baseVal.value, elem.y.baseVal.value);
			dimensions = PLUGINS.svg.toPixel(elem,
				elem.x.baseVal.value + elem.width.baseVal.value,
				elem.y.baseVal.value + elem.height.baseVal.value
			);

			result = PLUGINS.polys.rect(
				position[0], position[1],
				dimensions[0], dimensions[1],
				corner
			);
		break;

		case 'ellipse':
		case 'circle':
			position = PLUGINS.svg.toPixel(elem,
				elem.cx.baseVal.value,
				elem.cy.baseVal.value
			);

			result = PLUGINS.polys.ellipse(
				position[0], position[1],
				(elem.rx || elem.r).baseVal.value, 
				(elem.ry || elem.r).baseVal.value,
				corner
			);
		break;

		case 'line':
		case 'polygon':
		case 'polyline':
			var len, next,

			points = elem.points || [
				{ x: elem.x1.baseVal.value, y: elem.y1.baseVal.value },
				{ x: elem.x2.baseVal.value, y: elem.y2.baseVal.value }
			];

			for(result = [], i = -1, len = points.numberOfItems || points.length; ++i < len;) {
				next = points.getItem ? points.getItem(i) : points[i];
				result.push.apply(result, PLUGINS.svg.toPixel(elem, next.x, next.y));
			}

			result = PLUGINS.polys.polygon(result, corner);
		break;

		// Unknown shape... use bounding box as fallback
		default: 
			box = elem.getBBox();
			mtx = elem.getScreenCTM();
			root = elem.farthestViewportElement || elem;

			// Return if no createSVGPoint method is found
			if(!root.createSVGPoint) { return FALSE; }

			// Create our point var
			point = root.createSVGPoint();

			// Adjust top and left
			point.x = box.x;
			point.y = box.y;
			tPoint = point.matrixTransform(mtx);
			result.position = {
				left: tPoint.x, top: tPoint.y
			};

			// Adjust width and height
			point.x += box.width;
			point.y += box.height;
			tPoint = point.matrixTransform(mtx);
			result.width = tPoint.x - result.position.left;
			result.height = tPoint.y - result.position.top;
		break;
	}

	// Adjust by scroll offset
	result.position.left += doc.scrollLeft();
	result.position.top += doc.scrollTop();

	return result;
};

PLUGINS.svg.toPixel = function(elem, x, y) {
	var mtx = elem.getScreenCTM(),
		root = elem.farthestViewportElement || elem,
		result, point;

	// Create SVG point
	if(!root.createSVGPoint) { return FALSE; }
	point = root.createSVGPoint();

	point.x = x; point.y = y;
	result = point.matrixTransform(mtx);
	return [ result.x, result.y ];
};