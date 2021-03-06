(function () {
	'use strict';
	angular
		.module('angular-owl-carousel', [])
		.directive('owlCarousel', [
			'$parse',
			owlCarouselDirective
		]);

	function owlCarouselDirective($parse, $scope) {

		var owlOptions = [
            'number:2',
			'items',
			'margin',
			'loop',
			'center',
			'mouseDrag',
			'touchDrag',
			'pullDrag',
			'freeDrag',
			'merge',
			'mergeFit',
			'autoWidth',
			'startPosition',
			'URLhashListener',
			'nav',
			'navRewind',
			'navText',
			'slideBy',
			'dots',
			'dotsEach',
			'dotData',
			'lazyLoad',
			'lazyContent',
			'autoplay',
			'autoplayTimeout',
			'autoplayHoverPause',
			'smartSpeed',
			'fluidSpeed',
			'autoplaySpeed',
			'dotsSpeed',
			'dragEndSpeed',
			'callbacks',
			'responsive',
			'responsiveRefreshRate',
			'responsiveBaseElement',
			'responsiveClass',
			'video',
			'videoHeight',
			'videoWidth',
			'animateOut',
			'animateIn',
			'fallbackEasing',
			'info',
			'nestedItemSelector',
			'itemElement',
			'stageElement',
			'navContainer',
			'dotsContainer',
			// Classes
			'themeClass',
			'baseClass',
			'itemClass',
			'centerClass',
			'activeClass',
			'navContainerClass',
			'navClass',
			'controlsClass',
			'dotClass',
			'dotsClass',
			//'autoHeightClass',
			// Callbacks
			'onInitialize',
			'onInitialized',
			'onResize',
			'onResized',
			'onRefresh',
			'onRefreshed',
			'onDrag',
			'onDragged',
			'onTranslate',
			'onTranslated',
			'onChange',
			'onChanged',
			'onStopVideo',
			'onPlayVideo',
			'onLoadLazy',
			'onLoadedLazy'
		];

		return {
			restrict: 'A',
			transclude: true,
			scope:$scope,
			link: function (scope, element, attributes, controller, $transclude) {

				var options = {},
					$element = $(element),
					owlCarousel = null,
					propertyName = attributes.owlCarousel;

				for (var i = 0; i < owlOptions.length; i++) {
					var opt = owlOptions[i];
					if (attributes[opt] !== undefined) {
						options[opt] = $parse(attributes[opt])();
					}
				}




			//options.items = 5;
				options.autoWidth = true;
				options.nav = false;
				options.dots= false;
				options.navContainer = false;
				options.loop = true;


/*
    options.navText = [
      "<i class='icon-chevron-left icon-white'><</i>",
      "<i class='icon-chevron-right icon-white'>></i>"
      ]

*/
				console.log('owlscope', scope)

				scope.$watchCollection(propertyName, function (newItems, oldItems) {

					if (owlCarousel) {
						owlCarousel.destroy();
					}
					$element.empty();

					for (var i in newItems) {
						$transclude(function (clone, scope) {
							scope.item = newItems[i];
							$element.append(clone[1]);
						});
					}

					$element.owlCarousel(options);
					owlCarousel = $element.data('owlCarousel');
				});
			}
		};
	}

})();