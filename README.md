# navonajs
A simple and beuatiful photo gallery

## How to use
1. Add the CSS inside <head> element
...
<link rel="stylesheet" href="css/navona-1.0.x.min.css">
...

2. Add the JQuery
...
<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
...

3. Add the JS file after JQuery
...
<script type="text/javascript" src="js/navona-1.0.x.min.js"></script>
...

4. Build your **_Navona Gallery_** at level 0 of the <body> element
...
<div id="id-my-gallery" class="navona">
  <ul>
    <li>
      <img src="img/image1.jpg">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </li>
    <li>
      <img src="img/image2.jpg">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </li>
    <li>
      <img src="img/image3.jpg">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </li>
  </ul>
</div>
...

5. Show the **_Navona Gallery_** with click
Add class *navona-go* and add the ID of your galley on attribute *for*
...
<button class="navona-go" for="id-my-gallery" value="Go navona!"></button>
...

### For more options, access:
[NavonaJS][https://philipi.bovo.me/navonajs/]