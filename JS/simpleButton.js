//画布默认共300X150个像素，左上为0，0
/*canvas,document,context都是对象*/
/*添加event listner，使得window.resize 窗口变化，图形跟着缩放 */
let canvas=document.getElementById("myCanvas");
let context=canvas.getContext("2d"); 

/*交互，窗口变换尺寸，图形和文本同步变化 */
window.addEventListener("resize",handleWindowResize);
function handleWindowResize()
{
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        halfCanvasW=canvas.width/2;
        halfCanvasH=canvas.height/2;
        draw();
};

let text=document.getElementById("myText");
window.addEventListener("mousedown",handleMouseDown);
function handleMouseDown(){
        text.innerHTML="You pressed the mouse!"
};
window.addEventListener("mouseup",handleMouseUp);
function handleMouseUp(){
        text.innerHTML="This is some text!"
};

let button=document.getElementById("myButton");
button.addEventListener("click",handleButtonClick);
function handleButtonClick(){
         rectW=Math.floor(Math.random()*200+5);        
         halfRectW=rectW/2;
         rectH =Math.floor(Math.random()*200+5);
         halfRectW=rectW/2;    
         draw();   
}

let halfCanvasW=canvas.width/2;
let halfCanvasH=canvas.height/2;
                
let rectW=40;
let rectH=20;
let halfRectW=rectW/2;
let halfRectH=rectH/2;
        
function draw()
{
        /*清除原画布内容 */
        context.clearRect(0,0,canvas.width,canvas.height);

        /* 开始绘制*/
        context.fillStyle="magenta";
        context.fillRect(halfCanvasW-halfRectW,halfCanvasH-halfRectH,rectW,rectH); 
        
        context.fillStyle="red";
        context.fillRect(0,0,rectW,rectH);
        
        
        context.fillStyle="white";
        context.fillRect(canvas.width-rectW,0,rectW,rectH);
        
        context.fillStyle="blue";
        context.fillRect(0,canvas.height-rectH,rectW,rectH);
        
        context.fillStyle="green";
        context.fillRect(canvas.width-rectW,canvas.height-rectH,rectW,rectH);
              
}

draw();
