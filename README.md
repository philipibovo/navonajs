# navona.js

A simple and beautiful photo gallery of pure Javascript

## How to use

1. Add the CSS inside <head> element
...
<link rel="stylesheet" href="css/navona-2.0.0.min.css">
...

2. Add the JS lib

```
<script type="text/javascript" src="js/navona-2.0.0.min.js"></script>
```

3. Build your **_Navona Gallery_** at level 0 of the <body> element

```
<div id="id-my-gallery" class="navona">
  <div>
    <img src="img/image1.jpg">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
  <div>
    <img src="img/image2.jpg">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
  <div>
    <img src="img/image3.jpg">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </div>
</div>
```

5. Show the **_Navona Gallery_** with click
   -- Add class _navona-go_ and add the ID of your galley on attribute _for_

```
<button class="navona-go" for="id-my-gallery" value="Go navona!"></button>
```

```

### For more options, access:

[https://philipi.bovo.me/navonajs/](https://philipi.bovo.me/navonajs/).
```
