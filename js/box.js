//This class stores some basic info on the box. 
class Box
{
    constructor(element)
    {
        //boolean for checking if the box is active or not
        this.isActive = false;
        //the HTMLElement
        this.element = element;
        //the HTMLElement ID
        this.id = element.id;

        this.legacyStyle = element.style.cssText;
    }
}