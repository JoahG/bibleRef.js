#bibleRef.js

jQuery plugin to detect Bible references and link to a website where they may be read online.

---

##Usage

####Initialization

To use bibleRef.js in your project, simply call the jQuery `.bibleRef()` method on the jQuery object which you would like searched for Bible references. The jQuery JavaScript library is a dependency of bibleRef.js, so be sure to have it defined before initiating bibleRef.js.

```html
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script> 
	<script src="/path/to/bibleRef.min.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			$('body').bibleRef();
		});
	</script>
```

####Configuration

With its default configurations, bibleRef.js automatically detects all (non-abbreviated) references, and replaces them with their respective links to [esvbible.org](http://esvbible.org). Using the configuration options, though, enables bibleRef.js to be much more powerful.

To use configurations, pass an object containing your configurations into the `.bibleRef()` jQuery method.

```html
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script> 
	<script src="/path/to/bibleRef.min.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			$('body').bibleRef({
				// Configurations will live here
			});
		});
	</script>
```

#####URL Format

bibleRef.js allows you to specify the outputted URL format to enable you to use Bible websites other than [esvbible.org](http://esvbible.org).

To specify a URL format, define the `url` attribute in the object used as a parameter for bibleRef.js:

```html
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script> 
	<script src="/path/to/bibleRef.min.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			$('body').bibleRef({
				url: 'http://www.esvbible.org/$BIBLEREF'
			});
		});
	</script>
```

To customize your URL, there are two variables available in the process of creating it:

 -   `'$BIBLEREF'` returns the Bible Reference being handled. It will be URL parameterized using `urlSpace` (see below).
 -   `'$VERSION'` returns the version set using `version` (see below).

You may also define the `urlSpace` attribute to specify what should be used in the replacement of spaces in the Bible Reference when creating the URL (the default is `'+'`). For example, the configuration to use [biblegateway.com](http://biblegateway.com) with bibleRef.js would be:

```html
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script> 
	<script src="/path/to/bibleRef.min.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			$('body').bibleRef({
				url: 'http://www.biblegateway.com/passage/?search=$BIBLEREF&version=$VERSION',
				urlSpace: '%20'
			});
		});
	</script>
```

The `url` attribute may optionally be set as a function returning the desired format. When using `url` as a function, it should accept two parameters (the same as are listed above).

```html
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script> 
	<script src="/path/to/bibleRef.min.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			$('body').bibleRef({
				url: function($BIBLEREF, $VERSION) {
					return 'http://www.esvbible.org/' + $BIBLEREF.replace(/\s/g, '+')
				}
			});
		});
	</script>
```

To use/contribute other online Bible configurations, check out the [wiki page](https://github.com/JoahG/bibleRef.js/wiki/Other-configurations).

#####Render Format

bibleRef.js also allows you to specify what format the Bible Reference should be displayed in. The desired format should be stored in the `render` attribute.

```html
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script> 
	<script src="/path/to/bibleRef.min.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			$('body').bibleRef({
				render: '<a data-bible-ref href="$URL" target="$TARGET" class="$CLASS">$BIBLEREF</a>'
			});
		});
	</script>
```

Like URL formatting, there are some variables available when using `render`:

 -   `'$BIBLEREF'` returns the Bible Reference being handled.
 -   `'$VERSION'` returns the version set using `version` (see below).
 -   `'$URL'` returns the URL created with the URL Format (see above).
 -   `'$TARGET'` returns the target set with `target` (see below).
 -   `'$CLASS'` returns the class string set with `class` (see below).

The `render` attribute may also optionally be set as a function returning the desired format. When using `render` as a function, it should accept five parameters (the same as are listed above).

```html
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script> 
	<script src="/path/to/bibleRef.min.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			$('body').bibleRef({
				render: function($BIBLEREF, $VERSION, $URL, $TARGET, $CLASS) {
					return '<a data-bible-ref href="' + $URL + '" target="' + $TARGET + '" class="' + $CLASS + '">' + $BIBLEREF + '</a>'
				}
			});
		});
	</script>
```

#####Regex Matching

You also have the option of defining the format of the matched verses with `match`. `match` will define the format of the *tail* of the reference (i.e. the `'3:16-17'` part of `'1 John 3:16-17'`).

```html
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script> 
	<script src="/path/to/bibleRef.min.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			$('body').bibleRef({
				match: '$S$D:$D$W-$D$W:$D$W$R,$S$D:$D$W-$D$W:$D$W$ER'
			});
		});
	</script>
```

As you can see above, the `match` string defaults to `'$S$D:$D$W-$D$W:$D$W$R,$S$D:$D$W-$D$W:$D$W$ER'`. Each of the characters in the string translates to a different Regex string. They translate as follows:

 -   `'$S$D'` translates to `'(\s\d+)?'` (A space, followed by a numeral)
 -   `':$D'` translates to `'(:\d+)?'` (A colon, followed by a numeral)
 -   `'-$D'` translates to `'(\-\d+)?'` (A dash, followed by a numeral)
 -   `'$W'` translates to `'(\w)?'` (Any single word character)
 -   `'$R'` sets the beginning of a repeating section (translates to `'('`)
 -   `'$ER'` sets the end of a repeating section (translates to `')*'`)
 -   A comma (`','`) and a semicolon (`';'`) each translate to their respective characters, in Regex form

Another popular Bible reference form, with each chapter/verse combination being separated with a semicolon (`';'`) may be matched with `'$R$S$D:$D$W-$D$W:$D$W$R,$S$D:$D$W-$D$W:$D$W$ER;$ER'`.

#####Other Configuration Options

There are a few other configuration options available while configuring bibleRef.js. The descriptions of the options, along with their defaults are listed below.

```html
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script> 
	<script src="/path/to/bibleRef.min.js" type="text/javascript"></script>
	<script>
		$(document).ready(function(){
			$('body').bibleRef({
				target: '_self',  // Sets target of the rendered <a>
				class:  '',       // Sets the class of the rendered <a>
				version: 'ESV',   // Sets the Bible version for rendering ($VERSION)
				abbr: false       // Turns abbreviation searching on/off
			});
		});
	</script>
```

##Contributing

If you find a bug, or would like to help out with development, just follow some simple steps:

  1. [Make an issue.](https://github.com/JoahG/bibleRef.js/issues/new)
  2. [Fork the repo.](https://github.com/JoahG/bibleRef.js/fork)
  3. Make your changes.
  4. Commit and create a pull request.

##Author

bibleRef.js is written and maintained by [Joah Gerstenberg](http://www.joahg.com), copyright 2014. All code contained within these files are licensed under an [MIT license](https://github.com/JoahG/bibleRef.js/blob/master/MIT-LICENSE).

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/JoahG/bibleref.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
![](https://ga-beacon.appspot.com/UA-45765973-7/bibleRef.js/home?pixel)
