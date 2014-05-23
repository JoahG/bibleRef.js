/*!
 * bibleRef.js v3.1.5 (https://github.com/JoahG/bibleRef.js)
 * Copyright 2014 Joah Gerstenberg
 * Licensed under MIT License (https://github.com/JoahG/bibleRef.js/blob/master/MIT-LICENSE)
 */

(function($) { 
	$.fn.bibleRef = function($scope) {
		
		/* Set Defaults */
		$scope          = $scope          ||  {};
		$scope.target   = $scope.target   ||  '_self';
		$scope.class    = $scope.class    ||  '';
		$scope.version  = $scope.version  ||  'ESV';
		$scope.abbr     = $scope.abbr     ||  false;
		$scope.url      = $scope.url      ||  'http://www.esvbible.org/$BIBLEREF';
		$scope.urlSpace = $scope.urlSpace ||  '+';
		$scope.render   = $scope.render   ||  '<a data-bible-ref href="$URL" target="$TARGET" class="$CLASS">$BIBLEREF</a>';
		$scope.range    = this;

		/* Setup the magic link formatting function */
		$scope.a        = function(bibleRef) { 
			var url = typeof $scope.url == 'function' ? $scope.url(bibleRef, $scope.version) : $scope.url.replace(/\$BIBLEREF/g, bibleRef.replace(/\s/g, $scope.urlSpace)).replace(/\$VERSION/g, $scope.version.replace(/\s/g, $scope.urlSpace));
			return typeof $scope.render == 'function' ? $scope.render(bibleRef, $scope.version, url, $scope.target, $scope.class) : $scope.render.replace(/\$URL/g, url).replace(/\$TARGET/g, $scope.target).replace(/\$CLASS/g, $scope.class).replace(/\$BIBLEREF/g, bibleRef).replace(/\$VERSION/g, $scope.version);
		};

		/* All the regexes */
		$scope.regex    = {

			/* Setup the head, books, and tail regexes */
			match: $scope.match || '$S$D:$D$W-$D$W:$D$W$R,$S$D:$D$W-$D$W:$D$W$ER',
			books: '(genesis|exodus|leviticus|numbers|deuteronomy|joshua|judges|ruth|samuel|kings|chronicles|ezra|nehemiah|esther|job|psalm|psalms|proverbs|ecclesiastes|song\\sof\\ssolomon|song\\sof\\ssongs|isaiah|jeremiah|lamentations|ezekiel|daniel|hosea|joel|amos|obadiah|jonah|micah|nahum|habakkuk|zephaniah|haggai|zechariah|malachi|matthew|mark|luke|john|acts|romans|corinthians|galatians|ephesians|philippians|colossians|thessalonians|timothy|titus|philemon|hebrews|james|peter|jude|revelation' + ($scope.abbr ? '|((gen|ge|gn|ex|exod|lev|le|lv|num|nu|nm|nb|deut|dt|josh|jos|jsh|jdg|jg|jdgs|rth|ru|sam|sa|kgs|chron|ezr|neh|ne|esth|es|jb|pslm|ps|psa|psm|pss|prov|pr|prv|eccles|ec|qoh|qoheleth|isa|is|jer|je|jr|lam|la|ezek|eze|ezk|dan|da|dn|hos|ho|joe|jl|am|obad|ob|jnh|jon|mic|nah|na|hab|zeph|zep|zp|hag|hg|zech|zec|zc|mal|ml|matt|mt|mrk|mk|mr|luk|lk|jn|jhn|ac|rom|ro|rm|cor|co|gal|ga|ephes|eph|phil|php|col|thess|th|thes|tim|ti|tit|philem|phm|heb|jas|jm|jn|jhn|pet|pe|pt|jud|rev|re)(\\.)))' : ')'),
			head: '\\b((I+|\\d+)\\s)?',
			tail: function(){
				return this.match.replace(/\$S\$D/g, '(\\s\\d+)?').replace(/:\$D/g, '(:\\d+)?').replace(/\$W/g, '(\\w)?').replace(/\-\$D/g, '(\\-\\d+)?').replace(/\$R/g, '(').replace(/\$ER/g, ')*').replace(/\,/g, '(\\,)?').replace(/\;/g, '(\\;)?');
			},

			/* Regex compiler function (puts the head, books, and tail together) */
			compiled: function() {
				return new RegExp(this.head + this.books + this.tail(), 'gi');
			}
		};

		/* Find all the references, and pass them through the magic link formatting function */
		$($scope.range).html($($scope.range).html().replace($scope.regex.compiled(), function(match) { return $scope.a(match); }));
	};
})(jQuery);
