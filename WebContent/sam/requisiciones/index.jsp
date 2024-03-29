<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="Content-Style-Type" content="text/css">
        <meta http-equiv="Content-Script-Type" content="text/javascript">

        <title>Tabs - jQuery plugin for accessible, unobtrusive tabs</title>

        <script src="../../include/js/jquery.tabs/jquery-1.1.3.1.pack.js" type="text/javascript"></script>
        <script src="../../include/js/jquery.tabs/jquery.history_remote.pack.js" type="text/javascript"></script>
        <script src="../../include/js/jquery.tabs/jquery.tabs.pack.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function() {

                $('#container-1').tabs();
                $('#container-2').tabs(2);
                $('#container-3').tabs({ fxSlide: true });
                $('#container-4').tabs({ fxFade: true, fxSpeed: 'fast' });
                $('#container-5').tabs({ fxSlide: true, fxFade: true, fxSpeed: 'normal' });
                $('#container-6').tabs({
                    fxFade: true,
                    fxSpeed: 'fast',
                    onClick: function() {
                        alert('onClick');
                    },
                    onHide: function() {
                        alert('onHide');
                    },
                    onShow: function() {
                        alert('onShow');
                    }
                });
                $('#container-7').tabs({ fxAutoHeight: true });
                $('#container-8').tabs({ fxShow: { height: 'show', opacity: 'show' }, fxSpeed: 'normal' });
                $('#container-9').tabs({ remote: true });
                $('#container-10').tabs();
                $('#container-11').tabs({ disabled: [3] });

                $('<p><a href="#">Disable third tab<\/a><\/p>').prependTo('#fragment-28').find('a').click(function() {
                    $(this).parents('div').eq(1).disableTab(3);
                    return false;
                });
                $('<p><a href="#">Activate third tab<\/a><\/p>').prependTo('#fragment-28').find('a').click(function() {
                    $(this).parents('div').eq(1).triggerTab(3);
                    return false;
                });
                $('<p><a href="#">Enable third tab<\/a><\/p>').prependTo('#fragment-28').find('a').click(function() {
                    $(this).parents('div').eq(1).enableTab(3);
                    return false;
                });

            });
        </script>

        <link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs.css" type="text/css" media="print, projection, screen">
        <!-- Additional IE/Win specific style sheet (Conditional Comments) -->
        <!--[if lte IE 7]>
        <link rel="stylesheet" href="../../include/js/jquery.tabs/jquery.tabs-ie.css" type="text/css" media="projection, screen">
        <![endif]-->
        <style type="text/css" media="screen, projection">

            /* Not required for Tabs, just to make this demo look better... */

            body {
                font-size: 16px; /* @ EOMB */
            }
            * html body {
                font-size: 100%; /* @ IE */
            }
            body * {
                font-size: 87.5%;
                font-family: "Trebuchet MS", Trebuchet, Verdana, Helvetica, Arial, sans-serif;
            }
            body * * {
                font-size: 100%;
            }
            h1 {
                margin: 1em 0 1.5em;
                font-size: 18px;
            }
            h2 {
                margin: 2em 0 1.5em;
                font-size: 16px;
            }
            p {
                margin: 0;
            }
            pre, pre+p, p+p {
                margin: 1em 0 0;
            }
            code {
                font-family: "Courier New", Courier, monospace;
            }
        </style>
    </head>
    <body>
    <h2>Simple Tabs</h2>

        <div id="container-1">
            <ul>
                <li><a href="#fragment-1"><span>One</span></a></li>
                <li><a href="#fragment-2"><span>Two</span></a></li>
                <li><a href="#fragment-3"><span>Tabs are flexible again</span></a></li>
            </ul>
            <div id="fragment-1">
                <p>First tab is active by default:</p>
                <pre><code>$(&#039;#container&#039;).tabs();</code></pre>
            </div>
            <div id="fragment-2">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-3">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>

        <h2>Start With Custom Tab</h2>

        <div id="container-2">
            <ul>
                <li><a href="#fragment-4"><span>One</span></a></li>
                <li><a href="#fragment-5"><span>Two</span></a></li>
                <li><a href="#fragment-6"><span>Three</span></a></li>
            </ul>
            <div id="fragment-4">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-5">
                <p>Second tab is active:</p>
                <pre><code>$(&#039;#container&#039;).tabs(2);</code></pre>
                <p>
                    Two alternative ways to specify the active tab will overrule this argument. First a li element
                    (representing one single tab) belonging to the selected tab class, e.g. set the selected tab
                    class (default: "tabs-selected", see option selectedClass) for one of the unordered li elements
                    in the HTML source. In addition if a fragment identifier/hash in the URL of the page refers
                    to the id of a tab container of a tab interface the corresponding tab will  be activated and both
                    the initial argument as well as an eventually declared class attribute will be overruled.
                </p>
            </div>
            <div id="fragment-6">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>

        <h2>Slide Effect</h2>

        <div id="container-3">
            <ul>
                <li><a href="#fragment-7"><span>One</span></a></li>
                <li><a href="#fragment-8"><span>Two</span></a></li>
                <li><a href="#fragment-9"><span>Three</span></a></li>
            </ul>
            <div id="fragment-7">
                <p>
                    Use a slide effect to switch tabs.
                    You can optionally specify the speed for the animation with the option <code>fxSpeed: value</code>.
                    The value is either a string of one of the predefined speeds in jQuery (<code>slow</code>,
                    <code>normal</code>, <code>fast</code>) or an integer value specifying the duration for the animation
                    in milliseconds. If omitted it defaults to <code>normal</code>.
                </p>
                <pre><code>$(&#039;#container&#039;).tabs({ fxSlide: true });</code></pre>
            </div>
            <div id="fragment-8">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-9">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>

        <h2>Fade Effect</h2>

        <div id="container-4">
            <ul>
                <li><a href="#fragment-10"><span>One</span></a></li>
                <li><a href="#fragment-11"><span>Two</span></a></li>
                <li><a href="#fragment-12"><span>Three</span></a></li>
            </ul>
            <div id="fragment-10">
                <p>
                    Use a fade effect to switch tabs.
                    You can optionally specify the speed for the animation with the option <code>fxSpeed: value</code>.
                    The value is either a string of one of the predefined speeds in jQuery (<code>slow</code>,
                    <code>normal</code>, <code>fast</code>) or an integer value specifying the duration for the animation
                    in milliseconds. If omitted it defaults to <code>normal</code>.
                </p>
                <pre><code>$(&#039;#container&#039;).tabs({ fxFade: true, fxSpeed: 'fast' });</code></pre>
            </div>
            <div id="fragment-11">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-12">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>

        <h2>Slide and Fade Effect Combined</h2>

        <div id="container-5">
            <ul>
                <li><a href="#fragment-13"><span>One</span></a></li>
                <li><a href="#fragment-14"><span>Two</span></a></li>
                <li><a href="#fragment-15"><span>Three</span></a></li>
            </ul>
            <div id="fragment-13">
                <p>Use a combined slide and fade effect to switch tabs:</p>
                <pre><code>$(&#039;#container&#039;).tabs({ fxSlide: true, fxFade: true, fxSpeed: 'fast' });</code></pre>
            </div>
            <div id="fragment-14">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-15">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>

        <h2>Callbacks</h2>

        <div id="container-6">
            <ul>
                <li><a href="#fragment-16"><span>One</span></a></li>
                <li><a href="#fragment-17"><span>Two</span></a></li>
                <li><a href="#fragment-18"><span>Three</span></a></li>
            </ul>
            <div id="fragment-16">
                <p>
                    Define callback functions that are invoked at different points in time during the tab switch process.
                    These functions are invoked with three arguments: the first one being the clicked tab (the
                    <code>a</code> element), the second one being the <code>div</code> element that holds the content of
                    the clicked tab and the third one being the <code>div</code> element belonging to the tab that gets hidden.
                    <br>
                    If the onClick callback returns false, the tab switch is canceled. This is especially useful if switching
                    tabs requires form validation before for example.
                </p>
                <pre><code>$(&#039;#container&#039;).tabs({
    fxFade: true,
    fxSpeed: 'fast',
    onClick: function() {
        alert('onClick');
    },
    onHide: function() {
        alert('onHide');
    },
    onShow: function() {
        alert('onShow');
    }
});</code></pre>
            </div>
            <div id="fragment-17">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-18">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>

        <h2>Automatic height</h2>

        <div id="container-7">
            <ul>
                <li><a href="#fragment-19"><span>One</span></a></li>
                <li><a href="#fragment-20"><span>Two</span></a></li>
                <li><a href="#fragment-21"><span>Three</span></a></li>
            </ul>
            <div id="fragment-19">
                <p>Adjust height of all tabs to the largest:</p>
                <pre><code>$(&#039;#container&#039;).tabs({ fxAutoHeight: true });</code></pre>
            </div>
            <div id="fragment-20">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-21">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>

        <h2>Custom animation</h2>

        <div id="container-8">
            <ul>
                <li><a href="#fragment-22"><span>One</span></a></li>
                <li><a href="#fragment-23"><span>Two</span></a></li>
                <li><a href="#fragment-24"><span>Three</span></a></li>
            </ul>
            <div id="fragment-22">
                <p>Define your own custom animation:</p>
                <pre><code>$(&#039;#container&#039;).tabs({ fxShow: { height: &#039;show&#039;, opacity: &#039;show&#039; } });</code></pre>
            </div>
            <div id="fragment-23">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-24">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>

        <h2>Ajax tabs</h2>

        <div id="container-9">
            <ul>
                <li><a href="../../include/js/jquery.tabs/ahah_1.html"><span>One</span></a></li>
                <li><a href="../../include/js/jquery.tabs/ahah_2.html"><span>Two</span></a></li>
                <li><a href="../../include/js/jquery.tabs/ahah_3.html"><span>Three</span></a></li>
            </ul>
        </div>

        <h2>Custom <abbr>HTML</abbr> structure</h2>

        <div id="container-10">
            <div>
                <ul class="tabs-nav">
                    <li><a href="#fragment-25"><span>One</span></a></li>
                    <li><a href="#fragment-26"><span>Two</span></a></li>
                    <li><a href="#fragment-27"><span>Three</span></a></li>
                </ul>
            </div>
            <div>
                <div id="fragment-25" class="tabs-container">
                    <p>
                        If some <abbr>HTML</abbr> structure is required that differs from the default one, attach the classes
                        <code>tabs-nav</code> to the unordered list, respectively <code>tabs-container</code> to each container
                        and let the plugin automatically find the required elements by class.
                    </p>
                </div>
                <div id="fragment-26" class="tabs-container">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </div>
                <div id="fragment-27" class="tabs-container">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </div>
            </div>
        </div>

        <h2>Triggering, disabling, enabling Tabs</h2>
        <div id="container-11">
            <ul class="tabs-nav">
                <li><a href="#fragment-28"><span>One</span></a></li>
                <li><a href="#fragment-29"><span>Two</span></a></li>
                <li><a href="#fragment-30"><span>Three</span></a></li>
            </ul>
            <div id="fragment-28">
                <pre><code>$(&#039;#container&#039;).enableTab(3); // enables third tab
$(&#039;#container&#039;).triggerTab(3); // triggers third tab
$(&#039;#container&#039;).disableTab(3); // disables third tab</code></pre>
                <p>
                    One or more tabs can also be disabled immediatly by simply setting the disabling class for the li element
                    representing that particular tab or by using the <code>disabled</code> option.
                </p>
                <pre><code>&lt;li class=&quot;tabs-disabled&quot;&gt&#8230;&lt;/li&gt;

$(&#039;#container&#039;).tabs({ disabled: [2, 3] });</code></pre>
            </div>
            <div id="fragment-29">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
            <div id="fragment-30">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>

        <h2>Changelog (since release of Version 2)</h2>

        <ul>
            <li>
                2.7.4 - Maintenance release: Compatibility with jQuery 1.1.3; fixed occasionally occuring flicker in Firefox for tabs that don't use animation for switching; fixed ClearType issue in IE 7 for tabs that don't use animation for switching.
            </li>
            <li>
                2.7.3 - Changed CSS so that tabs become flexible in width/height again. <strong>This requires an extra <code>span</code> element inside a tab's anchor element.</strong>
            </li>
            
            <li>
                2.7.2 - New method <code>activeTab</code> to retrieve currently selected tab. Usage: <code>var index = $('#container').activeTab(); // => 1</code>
            </li>
            <li>
                2.7.1 - Added option <code>spinner</code>, which lets you specify the text/image to be shown in a tab while loading remote content. Pass an empty string to entirely disable this behavior. Fixed bug, that allowed the onClick handler to be fired even for disabled and already selected tabs.
            </li>
            <li>
                2.7 - A few frequently requested enhancements and bugfixes. <a href="/2007/04/07/tabs-27-flexibility/">See here for more information.</a>
            </li>
            <li>
                2.6 - Added option for loading tab content via Ajax: <code>remote: true</code></li>
            <li>
                2.5.2 - Avoid flicker (in Firefox) for simple tab switching without animation.
            </li>
            <li>
                2.5.1 - Added support for hiding tab content before tabs initialization to avoid flash of content, fixed little flaw in history support, jQuery 1.1 ready.</li>
            <li>
                2.5 - Added support for disabling/enabling tabs. Disabling tab(s): via option like <code>disabled: [2, 3]</code>
                immediatly, else via <code>$(&#8230;).disableTab(3);</code>. Enabling: <code>$(&#8230;)enableTab(3);</code>.
                A disabled tab is greyed out (using a configurable <abbr title="Cascading Style Sheets">CSS</abbr> class,
                option <code>disabledClass</code>) and isn't clickable.
            </li>
            <li>
                2.4 - New option: <code>bookmarkable</code>, extended callback system: <code>onClick</code>, <code>onHide</code>,
                <code>onShow</code> (<code>onShow</code> replaces former <code>callback</code> option)
            </li>
            <li>
                2.2 - Improved <code>fxAutoHeight</code> option to take window and text resizing into account (was
                <code>fxAutoheight</code>)
            </li>
            <li>2.1 - <a href="http://www.stilbuero.de/2006/11/05/tabs-version-2/">Tabs version 2 released</a></li>
        </ul>

        <h2>Tested with</h2>

        <ul>
            <li>Firefox 2.0</li>
            <li>Firefox 1.5</li>
            <li>Firefox 1.0</li>
            <li>Opera 9.01</li>
            <li>Opera 8.52</li>
            <li>Safari 2.0.4</li>
            <li><abbr title="Internet Explorer">IE</abbr> 7</li>
            <li><abbr title="Internet Explorer">IE</abbr> 6</li>
        </ul>

    </body>
</html>