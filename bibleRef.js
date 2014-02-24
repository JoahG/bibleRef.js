/*!
 * bibleRef.js v2.0.0 (https://github.com/JoahG/bibleRef.js)
 * Copyright 2014 Joah Gerstenberg
 * Licensed under MIT License (https://github.com/JoahG/bibleRef.js/blob/master/MIT-LICENSE)
 */
$(document).ready(function(){
	// Declare all variables
	var _src, _target, _range, _class, _version, _refs, _selector, _esv, _bg, _url;

	// Set _src to default to _esvbible if it is not already set to biblegateway
	_src = bibleRef && bibleRef.src === 'biblegateway' ? 'biblegateway' : '_esvbible';

	// Set _target to default to _self if not already defined
	_target = bibleRef && bibleRef.target !== '_self' ? bibleRef.target : '_self';

	// Set class to empty string if bibleRef.class is not defined
	_class = bibleRef && bibleRef.class ? bibleRef.class : '';

	// Set _range to default to body if not already defined
	_range = bibleRef && bibleRef.range !== 'body' ? bibleRef.range : 'body';

	// Set _version to default to NIV if not already defined
	_version = bibleRef && bibleRef.version ? bibleRef.version : 'NIV';	
	
	// Set _selector to default to body if _range is not defined.
	_selector = _range ? '#' + _range : 'body';

	// Set _esv to function returning _esvbible.org Bible ref URL
	_esv = function(_p) {
		return "http://www.esvbible.org/" + _p.replace(/\s/g, '+');
	}

	// Set _bg to function returning biblegateway.com Bible ref URL
	_bg = function(_p) {
		return "http://www.biblegateway.com/passage/?search=" + _p.replace(/\s/g, '%20') + "&version=" + _version;
	}

	// Set _url to return appropriate _url according to _src setting
	_url = function(_p) {
		return _src === '_esv' ? _esv(_p) : _src === 'biblegateway' ? _bg(_p) : _esv(_p);
	}

	// Search for references in HTML, and replace them with the <a> link.
	$(_selector).html($(_selector).html().replace(/(I+\s)?(\d+\s)?(genesis|exodus|leviticus|numbers|deuteronomy|joshua|judges|samuel|kings|chronicles|ruth|ezra|nehemiah|esther|job|psalm|psalms|proverbs|ecclesiastes|song of solomon|isaiah|jeremiah|lamentations|ezekiel|daniel|hosea|joel|amos|obadiah|jonah|micah|nahum|habakkuk|zephaniah|haggai|zechariah|malachi|matthew|mark|luke|john|acts|romans|corinthians|galatians|ephesians|philippians|colossians|thessalonians|timothy|titus|philemon|hebrews|james|peter|jude|revelation)(\s\d+)?(:\d+)?(\-\d+)?(:\d+)?((\,\s\d+)?(:\d+)?(\-\d+)?(:\d+)?)*/ig, function(_match) {
		return "<a data-bible-ref href='" + _url(_match) + "' target=" + _target + " class='" + _class + "'>" + _match + "</a>";
	})); 
});
