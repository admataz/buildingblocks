---
author: Adam Davis  
date: 2015-03-24  
description: "the technology behind admataz.com"
keywords: web development, code, javascript, node.js, consultancy
title: admataz.com - the technology behind my website. 
published: true
---

# About admataz.com
[admataz.com](http://admataz.com) is my personal and business portfolio website. It's an ongoing project where I experiment with code, design and words. It has been through many different versions and for what it’s worth, there's a [site manifesto](/articles/site-manifesto). 

The site is powered by [BuildingBlocks](https://github.com/admataz/buildingblocks), a minimal and experimental open source static site publishing system I wrote in using [node.js](http://nodejs.org) as a build tool. You can read more about the project [here](https://github.com/admataz/buildingblocks).

## I make use of various open source tools and libraries:

- [Ractive.js](http://www.ractivejs.org/) my latest favourite library - only used for the animated background blocks right now
- [Handlebars.js](http://handlebarsjs.com/) to handle the layout and presentation templates
- [jsonfile](https://www.npmjs.com/package/jsonfile) to load json files
- [lodash](https://lodash.com/) to manage data in array and object collections
- [marked](https://www.npmjs.com/package/marked) to parse markdown content files
- [meta-marked](https://www.npmjs.com/package/meta-marked) to enhance my markdown with metadata
- [mkdirp](https://www.npmjs.com/package/mkdirp) and [rimraf](https://www.npmjs.com/package/rimraf) to help with file manipulation
- [Gulp.js](http://gulpjs.com/) for the scripted build while I'm developing

[BuildingBlocks](https://github.com/admataz/buildingblocks) is an ongoing project and I will change and refine and reinvent it as I do and learn more. For the latest, check the [project page on GitHub](https://github.com/admataz/buildingblocks)

## the admataz logo
The admataz logo is the longest lasting design element here - I have been using something similar to this logo since about 2000. The type is based on an old Mac Classic font I had called "Game Over". I discovered the scan lines rendered very cleanly at high resolutions, which made it useful to overlay on textured backgrounds and photo imagery, which was all the rage at the time. 

I have many times dissassembled and reassembled each character. The version you see above is compiled using javascript from an array of binaries like those you see mapping tile games, into the SVG render: 

```javascript 
      var admataz = [
      '0000000000011000000000000000000110000000000000000',
      '0000000000011000000000000000000110000000000000000',
      '0111110001111011111100011111011111100111110111111',
      '1100110110011011010110110011000110001100110000110',
      '1100110110011011010110110011000110001100110001100',
      '1101110110011011010110110111000110001101110011000',
      '0110110011111011010110011011000110000110110111111'
    ];
``` 

is dutifully rendered as: 

<div class="svg-logo"></div>



## Images and Typography
I am not a primarily a visual designer, but I enjoy playing with the elements and  processes of design, particularly how they can be generated and controlled by data and code and allow for reactive interaction and playfulness in an interface.  

The graphics on this site, apart from project screenshots, are almost entirely code generated.  
 - The colour blocks are SVG elements generated with JavaScript. The animation on scroll is an experiment in reactive programming with the help of [Ractive.js](http://www.ractivejs.org/). 
 - The graticule background pattern is also SVG, generated from code that is part of the awesome [D3.js](http://d3js.org/) project. 

#### Type for the headings is a webfont called [TravelingTypewriter](http://www.dafont.com/carl.d1364) by [Carl Krull](http://www.carlkrull.dk/)

Type for regular body copy is [Museo Slab](https://typekit.com/fonts/museo-slab) by [exljbris Font Foundry](http://www.exljbris.com) and thanks to Adobe Typekit and my Creative Cloud account. 

I continue to tweak the graphics and typography of this site because it's never quite right.  





