/*!
 * bibleRef.js v3.0.1 (https://github.com/JoahG/bibleRef.js)
 * Copyright 2014 Joah Gerstenberg
 * Licensed under MIT License (https://github.com/JoahG/bibleRef.js/blob/master/MIT-LICENSE)
 */

(function($) { 
	$.fn.bibleRef = function($scope) {
		$scope = $scope == undefined ? {} : $scope;
		$scope.range = this;
		$scope.target = $scope.target ? $scope.target : '_self';
		$scope.class = $scope.class ? $scope.class : '';
		$scope.version = $scope.version ? $scope.version : 'ESV';
		$scope.abbr = $scope.abbr ? $scope.abbr : false;
		$scope.url = $scope.url ? $scope.url : 'http://www.esvbible.org/$BIBLEREF';
		$scope.urlSpace = $scope.urlSpace ? $scope.urlSpace : '+';
		$scope.render = $scope.render ? $scope.render : '<a data-bible-ref href="$URL" target="$TARGET" class="$CLASS">$BIBLEREF</a>';
		$scope.a = function(bibleRef) { 
			var url = typeof $scope.url == 'function' ? $scope.url(bibleRef, $scope.version) : $scope.url.replace('$BIBLEREF', bibleRef.replace(/\s/g, $scope.urlSpace)).replace('$VERSION', $scope.version.replace(/\s/g, $scope.urlSpace));
			var rendered = typeof $scope.render == 'function' ? $scope.render(bibleRef, $scope.version, url, $scope.target, $scope.class) : $scope.render.replace('$URL', url).replace('$TARGET', $scope.target).replace('$CLASS', $scope.class).replace('$BIBLEREF', bibleRef).replace('$VERSION', $scope.version);
			return rendered;
		};
		$($scope.range).html($($scope.range).html().replace(/(I+\s)?(\d+\s)?(genesis|exodus|leviticus|numbers|deuteronomy|joshua|judges|ruth|samuel|kings|chronicles|ezra|nehemiah|esther|job|psalm|psalms|proverbs|ecclesiastes|song\sof\ssolomon|song\sof\ssongs|isaiah|jeremiah|lamentations|ezekiel|daniel|hosea|joel|amos|obadiah|jonah|micah|nahum|habakkuk|zephaniah|haggai|zechariah|malachi|matthew|mark|luke|john|acts|romans|corinthians|galatians|ephesians|philippians|colossians|thessalonians|timothy|titus|philemon|hebrews|james|peter|jude|revelation)(\s\d+)?(:\d+)?(\w)?(\-\d+)?(\w)?(:\d+)?(\w)?((\,\s?\d+)?(:\d+)?(\w)?(\-\d+)?(\w)?(:\d+)?)*/ig, function(match) {return $scope.a(match);}));
		if ($scope.abbr) { $($scope.range).html($($scope.range).html().replace(/\b(gen|ge|gn|ex|exod|lev|le|lv|num|nu|nm|nb|deut|dt|josh|jos|jsh|jdg|jg|jdgs|rth|ru|(I+|\d+)\ssam|(I+|\d+)\ssa|\d+kgs|\d+chron|ezr|neh|ne|esth|es|jb|pslm|ps|psa|psm|pss|prov|pr|prv|eccles|ec|qoh|qoheleth|isa|is|jer|je|jr|lam|la|ezek|eze|ezk|dan|da|dn|hos|ho|joe|jl|am|obad|ob|jnh|jon|mic|nah|na|hab|zeph|zep|zp|hag|hg|zech|zec|zc|mal|ml|matt|mt|mrk|mk|mr|luk|lk|jn|jhn|ac|rom|ro|rm|(I+|\d+)\scor|(I+|\d+)\sco|gal|ga|ephes|eph|phil|php|col|(I+|\d+)\sthess|(I+|\d+)\sth|(I+|\d+)\sthes|(I+|\d+)\stim|(I+|\d+)\sti|tit|philem|phm|heb|jas|jm|(I+|\d+)\sjn|(I+|\d+)\sjhn|(I+|\d+)\spet|(I+|\d+)\spe|(I+|\d+)\spt|jud|rev|re)\.(\s\d+)?(:\d+)?(\w)?(\-\d+)?(\w)?(:\d+)?(\w)?((\,\s?\d+)?(:\d+)?(\w)?(\-\d+)?(\w)?(:\d+)?(\w)?)*/ig, function(match) {return $scope.a(match);}));}
	};
})(jQuery);