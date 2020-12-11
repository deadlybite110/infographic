//#region Program Init

//The first thing we do is define global variables for the main script file (this file)
var boxcount = document.querySelectorAll(".grow").length;       //the amount of boxes   
let infoboxes = [];     //the main array of boxes
let root = document.documentElement;

//this is a neat method that makes the 'main' function run 10 times a second (1000/100)
//set Update Rate to 1000/100ms
window.setInterval(main, 100, null);

init();
//#endregion

//Initialise arrays 
function init()
{
    //Now we populate (fill in) the array with the HTMLElements
    for(var i = 0; i < boxcount; i++)
    {
        //push adds new member
        var t = document.getElementById("c" + (i + 1));

        infoboxes.push(new Box(t));

        switch(i + 1)
        {
            case 1:
                t.style += `;
                margin-left: 15vw;
                margin-top: 32vh;`;
                console.log("1 done");
            break;
            case 2:
                t.style += `;
                margin-left: 4vw;
                margin-top: 45vh;
                border-color:#8FB077;`;
                console.log("2 done");
            break;
            case 3:
                t.style += `;
                margin-left: 22vw;
                margin-top: 45vh;
                border-color:#8FB077;`;
                console.log("2 done");
            break;
        }
    }

    //Next we add event listeners for triggering JS functions when respective things are done (such as pressing on a div element)
    for(var i = 0; i < boxcount; i++)
    {
        infoboxes[i].element.addEventListener("click", onBoxClick, false);
    }
}

function onBoxClick(e)
{
    var box = e.currentTarget;


    //var box = event.currentTarget;  //I kept using srcElement and target instead of currentTarget and it kept doing weird shit
                                      //moral of the story: don't do that

    //whats happening here is that we assign a Lambda expression (i.e. an anonymous function) to the built-in eventhandler 'ontransitionend'
    box.ontransitionend = () => 
    {
            //this ensures that the smaller boxes below an active box never
            //get drawn above the active box, until it finishes all of its animations

            //if box is not active, remove the 'Top' class (such that it is no longer rendered on top)
        if(!box.isActive)
        {
            box.classList.remove("top");
        }
    };

    //this is the switch that dictates how the box becomes active, transitions its animations, and becomes deactive
    if(box.isActive)
    {
        box.classList.remove("transform-class");
        box.isActive = false;
    }
    else
    {
        box.classList.add("transform-class");
        box.classList.add("top");
        box.isActive = true;
    }
}

//this method is responsible for taking the mouse coordinates and printing them to the paragraph
function main()
{
    //assign event handler to function handleMouseMove()
    document.onmousemove = handleMouseMove;

    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        //write the finished product to our paragraph
        document.getElementById("para").innerHTML = "X: " + convertPXToVW(event.pageX) + ", Y: " + convertPXToVH(event.pageY);
    }
}

function convertPXToVW(px) {
    px -= getOffset(document.getElementsByClassName("main-div")[0]).X;
	return px * (100 / document.documentElement.clientWidth);
}

function convertPXToVH(px) {
    px -= getOffset(document.getElementsByClassName("main-div")[0]).Y;
	return px * (100 / document.documentElement.clientHeight);
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      X: rect.left + window.scrollX,
      Y: rect.top + window.scrollY
    };
  }
