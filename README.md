### Instalation:  
Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  
<br>

-----

### What is this?

A Pikcells code test for job applicants to demonstrate their 
ability to construct a dynamic client side interface built 
using Javascript. Any code snippets used should reference 
original source in comments. Original code is absolutely preferred.

### What should it do?

We want the site visitor to flex their design and creativity skills and create a good looking kitchen. It's most definitely not that our stylists are too busy and we're trying to offload the work onto the user.

1. Fetch the configuration file and present/build a clickable menu to change the layers. The menu should use the names from the json file
2. The items in the menu should be ordered according to the "order" value in the items array
3. It should initialise showing a pre-determined default configuration which is in the json file
4. The user should be able to save their configured image to their computer somehow and the client doesn't want to pay for another server to merge the images :(

The configuration data is available as a json file served from https://lab.pikcells.com/code-exercise/data.json . <br>
Please prefix all image requests with https://lab.pikcells.com/code-exercise/images/ <br>

Only one image/item per layer should be selectable and a visual cue should highlight the currently selected item. The images are transparent and should be layered up by some means. The order of layering can be determined by the "layers" -> "order" property.

### Screenshots:  

