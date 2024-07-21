//画布默认共300X150个像素，左上为0，0
/*canvas,document,context都是对象*/
/*添加event listner，使得window.resize 窗口变化，图形跟着缩放 */
let canvas=document.getElementById("myCanvas");
let context=canvas.getContext("2d"); 

let halfCanvasW=canvas.width/2;
let halfCanvasH=canvas.height/2;
        
let rectW=40;
let rectH=20;
        
let halfRectW=rectW/2;
let halfRectH=rectH/2;

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

/*文本的事件处理，鼠标按下和弹起 */
let text=document.getElementById("myText");
window.addEventListener("mousedown",handleMouseDown);
function handleMouseDown(){
        text.innerHTML="You pressed the mouse!"
};
window.addEventListener("mouseup",handleMouseUp);
function handleMouseUp(){
        text.innerHTML="This is some text!"
};

/*按钮的事件处理器，click按钮时，改变方块的大小和颜色 */
let button=document.getElementById("myButton");
button.addEventListener("click",handleButtonClick);
function handleButtonClick(){
         rectW=Math.floor(Math.random()*200+5);        
         halfRectW=rectW/2;
         rectH =Math.floor(Math.random()*200+5);
         halfRectW=rectW/2;    
         draw();   
}


//函数randomizeColorString（）随机产生颜色并转换为颜色字符串，在draw（）中调用
let  colorString="rgb(255,255,255)";
function randomizeColorString()
{//create a new string with the fom "rgb(255,255,255)"
    let r=Math.floor(Math.random()*256);
    let g=Math.floor(Math.random()*256);
    let b=Math.floor(Math.random()*256);    
    colorString="rgb("+r+","+g+","+b+")";
    //console.log(colorString);
}

//函数draw(),根据颜色和大小，在5个位置绘制方块
function draw()
{
        //清除原来画布上的图形
        context.clearRect(0,0,canvas.width,canvas.height);

        randomizeColorString();//产生随机色
        context.fillStyle=colorString;
        context.fillRect(halfCanvasW-halfRectW,halfCanvasH-halfRectH,rectW,rectH); 
        
        randomizeColorString();//产生随机色
        context.fillStyle=colorString;
        context.fillRect(0,0,rectW,rectH);
        
        randomizeColorString();//产生随机色
        context.fillStyle=colorString;
        context.fillRect(canvas.width-rectW,0,rectW,rectH);
        
        randomizeColorString();//产生随机色
        context.fillStyle=colorString;
        context.fillRect(0,canvas.height-rectH,rectW,rectH);
        
        randomizeColorString();//产生随机色
        context.fillStyle=colorString;
        context.fillRect(canvas.width-rectW,canvas.height-rectH,rectW,rectH);
      
        
}

//第一次无交互前绘制图形并显示
draw();
