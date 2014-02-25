/*!
 * bibleRef.js v2.3.1 (https://github.com/JoahG/bibleRef.js)
 * Copyright 2014 Joah Gerstenberg
 * Licensed under MIT License (https://github.com/JoahG/bibleRef.js/blob/master/MIT-LICENSE)
 */
$(document).ready(function(){
	// Declare all variables
	var _src, _target, _class, _range, _version, _abbr, _esv, _bg, _url;

	// Set _src to default to esvbible if it is not already set to biblegateway
	_src = bibleRef && bibleRef.src === 'biblegateway' ? 'biblegateway' : 'esvbible';

	// Set _target to default to _self if not already defined
	_target = bibleRef && bibleRef.target ? bibleRef.target : '_self';

	// Set class to empty string if bibleRef.class is not defined
	_class = bibleRef && bibleRef.class ? bibleRef.class : '';

	// Set _range to default to body if not already defined
	_range = bibleRef && bibleRef.range ? bibleRef.range : 'body';

	// Set _version to default to NIV if not already defined
	_version = bibleRef && bibleRef.version ? bibleRef.version : 'NIV';	

	// Set _abbr to default to false if not already defined
	_abbr = bibleRef && bibleRef.abbr ? bibleRef.abbr : false;

	// Set _esv to function returning esvbible.org Bible ref URL
	_esv = function(_p) {
		return "http://www.esvbible.org/" + _p.replace(/\s/g, '+');
	}

	// Set _bg to function returning biblegateway.com Bible ref URL
	_bg = function(_p) {
		return "http://www.biblegateway.com/passage/?search=" + _p.replace(/\s/g, '%20') + "&version=" + _version;
	}

	// Set _url to return appropriate url according to _src setting
	_url = function(_p) {
		return _src === '_esv' ? _esv(_p) : _src === 'biblegateway' ? _bg(_p) : _esv(_p);
	}

	// Search for references in _range HTML, and replace them with the <a> link.
	$(_range).html($(_range).html().replace(/(I+\s)?(\d+\s)?(genesis|exodus|leviticus|numbers|deuteronomy|joshua|judges|ruth|samuel|kings|chronicles|ezra|nehemiah|esther|job|psalm|psalms|proverbs|ecclesiastes|song\sof\ssolomon|song\sof\ssongs|isaiah|jeremiah|lamentations|ezekiel|daniel|hosea|joel|amos|obadiah|jonah|micah|nahum|habakkuk|zephaniah|haggai|zechariah|malachi|matthew|mark|luke|john|acts|romans|corinthians|galatians|ephesians|philippians|colossians|thessalonians|timothy|titus|philemon|hebrews|james|peter|jude|revelation)(\s\d+)?(:\d+)?(\w)?(\-\d+)?(\w)?(:\d+)?(\w)?(((\,|\;)\s\d+)?(:\d+)?(\w)?(\-\d+)?(\w)?(:\d+)?)*/ig, function(_match) {
		return "<a data-bible-ref href='" + _url(_match) + "' target=" + _target + " class='" + _class + "'>" + _match + "</a>";
	}));

	// If _abbr is set to true, search for book abbreviations in HTML and replace with link.
	if (_abbr) {
		$(_range).html($(_range).html().replace(/\s(gen|ge|gn|ex|exod|lev|le|lv|num|nu|nm|nb|deut|dt|josh|jos|jsh|jdg|jg|jdgs|rth|ru|(I+|\d+)\ssam|(I+|\d+)\ssa|\d+kgs|\d+chron|ezr|neh|ne|esth|es|jb|pslm|ps|psa|psm|pss|prov|pr|prv|eccles|ec|qoh|qoheleth|isa|is|jer|je|jr|lam|la|ezek|eze|ezk|dan|da|dn|hos|ho|joe|jl|am|obad|ob|jnh|jon|mic|nah|na|hab|zeph|zep|zp|hag|hg|zech|zec|zc|mal|ml|matt|mt|mrk|mk|mr|luk|lk|jn|jhn|ac|rom|ro|rm|(I+|\d+)\scor|(I+|\d+)\sco|gal|ga|ephes|eph|phil|php|col|(I+|\d+)\sthess|(I+|\d+)\sth|(I+|\d+)\sthes|(I+|\d+)\stim|(I+|\d+)\sti|tit|philem|phm|heb|jas|jm|(I+|\d+)\sjn|(I+|\d+)\sjhn|(I+|\d+)\spet|(I+|\d+)\spe|(I+|\d+)\spt|jud|rev|re)\.(\s\d+)?(:\d+)?(\w)?(\-\d+)?(\w)?(:\d+)?(\w)?(((\,|\;)\s\d+)?(:\d+)?(\w)?(\-\d+)?(\w)?(:\d+)?(\w)?)*/ig, function(_match) {
			return "<a data-bible-ref href='" + _url(_match) + "' target=" + _target + " class='" + _class + "'>" + _match + "</a>";
		}));
	}
});
