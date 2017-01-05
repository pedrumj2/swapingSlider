# swapingSlider
javascript code required to creating a swaping slider

# usage
1- Put the content you want to slide inside absolute divs with the class "slider_wrapper"
2- Add the class "active" to one of these
3- Put them all inside a parent div. Give it an ID.
4- Create 2 divs with classes ".arrow.right" and ".arrow.lef"

**Example:**
```html
<div id = "swap1">
    <div class = "slider_wrapper active">
    </div>
    <div class = "slider_wrapper">

    </div>
   <div class = "slider_wrapper">

    </div>
    <a  class = "right arrow">
    </a>
    <a class = "left arrow">
    </a>
</div>
          
Once the main window has loaded call this:

```
    var sliderSwap = new Slider_Swap("swap1");
```
