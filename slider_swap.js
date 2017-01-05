/*
a sliding slider. 
__idParnet: the id of the div containing the sliding elements.
The sliding elements must be absolute divs with the class "slider_wrapper"
One of them should also have the class "active"
There should also be 2 divs inside __idparent with the classes:
".right.arrow" and ".left.arrow" a click event handler will
be attached to these
*/
var Slider_Swap = function(__idParent){
    var _self = this;
    _self.private = { 
        parent : null,  
        imageWrappers   : [],  
        active : -1, 
        next : -1, 
        prev : -1, 
        left : -1, 
        width : -1, 
        rightArrow : null, 
        leftArrow : null, 
        transDuration: "", 
        set_objects : function(){
            INNER.parent = document.getElementById(__idParent);
            INNER.imageWrappers = INNER.parent.getElementsByClassName("slider_wrapper");
            INNER.transDuration = parseFloat(window.getComputedStyle(
                INNER.imageWrappers[0])["transitionDuration"]);
            INNER.get_wrapper_dimensions();
            INNER.set_arrows();
            INNER.set_indices();
            INNER.set_sliders_positions();
        }, 
        set_arrows(){
            INNER.rightArrow = INNER.parent.getElementsByClassName("right")[0];
            INNER.leftArrow = INNER.parent.getElementsByClassName("left")[0];
        }, 
        //Sets the next slider to the right of the active slider and
        //the prev slider to the left
        set_sliders_positions(){
             var _value;
            //due to the fact that the sliders may have a transitionDuration
            //they are disabled first
            INNER.disable_transition();
            _value =  INNER.width;
            INNER.imageWrappers[INNER.next].style.transform = 
            "translate3d(" + _value.toString() + "px, 0, 0)"; 
            _value = - INNER.width;
            var x = "translate3d(" + _value.toString() + "px, 0, 0)"; 
            INNER.imageWrappers[INNER.prev].style.transform = 
            "translate3d(" + _value.toString() + "px, 0, 0)"; 
            //100 ms is the time it would normally take for these tranlation
            //to take place.
            window.setTimeout(INNER.enable_transition, 100);
        },

        disable_transition(){
            INNER.imageWrappers[INNER.next].style.visibility = "hidden";
            INNER.imageWrappers[INNER.prev].style.visibility = "hidden";
            INNER.imageWrappers[INNER.next].style.transitionDuration = "0s";
            INNER.imageWrappers[INNER.prev].style.transitionDuration = "0s";
        }, 
        enable_transition(){
            INNER.imageWrappers[INNER.next].style.visibility = "visible";
            INNER.imageWrappers[INNER.prev].style.visibility = "visible";
            INNER.imageWrappers[INNER.next].style.transitionDuration =  INNER.transDuration.toString() + "s";
            INNER.imageWrappers[INNER.prev].style.transitionDuration = INNER.transDuration.toString() + "s";
            //This function is normally called at the end of a click event
            //during this processes click handlers are disabled. The set_handlers
            //is called again to reset the handlers
            INNER.set_handlers();
        }, 
        
        //Make sure image wrappers are set first
        get_wrapper_dimensions : function(){
             INNER.left = INNER.get_css_value_px("Left",
                INNER.imageWrappers[0]);
            INNER.width = INNER.get_css_value_px("Width",
                INNER.imageWrappers[0]);
        },

        //gets the numeric css value of a property which is in units
        // pixels
        get_css_value_px : function(__cssType,__element){
            var _res = INNER.get_css_value(__cssType, __element);
            var _res_num =  _res.substr(0, _res.length -2)     ;
            return parseInt(_res_num);
        }, 
        //gets the css value of a property
        get_css_value : function(__cssType,__element){
            var _style = window.getComputedStyle(__element);
            var _x = _style.getPropertyValue(__cssType);
            return  _style.getPropertyValue(__cssType);;
        }, 
        set_indices : function(__active = -1){
           if (__active ==-1){
                INNER.set_active();
           }
          
           INNER.set_next();
           INNER.set_prev();
        }, 

        //figures out which wrapper has the active attribute
        set_active : function(){
            var classes;
            var classList;
            for (var i = 0 ; i < INNER.imageWrappers.length ; i ++){
                classes = INNER.imageWrappers[i].getAttribute("class");
                if (classes.includes("active")==true){
                    INNER.active = 0;
                    break;
                }
            }
        }, 

        //determiens which wrapper is next in line
        set_next : function(){
            INNER.next = INNER.active + 1;
            if (INNER.next == INNER.imageWrappers.length){
                INNER.next =0;
            }
        },

        //determines which wrapper is previous in line
        set_prev : function(){
            INNER.prev = INNER.active - 1;
            if (INNER.prev == -1){
                INNER.prev =INNER.imageWrappers.length-1;
            }
        }, 
        set_handlers : function(){
            INNER.rightArrow.onclick = INNER.right_click_handler;
            INNER.leftArrow.onclick = INNER.left_click_handler;
        }, 
       disable_handlers : function(){
            INNER.rightArrow.onclick = null;
            INNER.leftArrow.onclick = null;
        }, 
        right_click_handler : function(){
            //clicks happening which the transition is in place
            //will cause problems
            INNER.disable_handlers();
            var _value = - INNER.width;
            INNER.imageWrappers[INNER.active].style.transform = 
                " translate3d(" + _value.toString() + "px, 0, 0)"; 
            INNER.imageWrappers[INNER.next].style.transform = 
                " translate3d(0, 0, 0)"; 
            INNER.inc_active();
        }, 

        left_click_handler : function(){
            //clicks happening which the transition is in place
            //will cause problems
            INNER.disable_handlers();
            var _value =  INNER.width;
            INNER.imageWrappers[INNER.active].style.transform = 
                " translate3d(" + _value.toString() + "px, 0, 0)"; 
            INNER.imageWrappers[INNER.prev].style.transform = 
                " translate3d(0, 0, 0)"; 
            INNER.dec_active();
        }, 
        //increment active
        inc_active : function(){
            INNER.active +=1;
            if (INNER.active  == INNER.imageWrappers.length){
                INNER.active = 0;
            }
            INNER.set_indices(INNER.active);
            window.setTimeout(INNER.set_sliders_positions, INNER.transDuration*1000);
        }, 
        //decrement active
        dec_active : function(){
            INNER.active -=1;
            if (INNER.active  == -1){
                INNER.active = INNER.imageWrappers.length-1;
            }
            INNER.set_indices(INNER.active);
            window.setTimeout(INNER.set_sliders_positions, INNER.transDuration*1000);
        }
    };
    var INNER = _self.private;
    _self.private.set_objects();
    _self.private.set_handlers();

}















