let userInfo=document.getElementById("userInfo");

let canvas=document.getElementById("myCanvas");
let context=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


window.addEventListener("resize",handleWindwoResize);
function handleWindwoResize(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    //调整窗口后，画布中像素数会变化
    userInfo.innerHTML="canvasW:"+canvas.width+" canvasH:"+canvas.height + "<br>" + 
    "total pixel count:"+(canvas.width*canvas.height);
    //redraw the screen
    draw();
    
}

let canvasX=0;
let canvasY=0;
let r=0;
let g=0;
let b=0;

//let ray=new vector3();
let rayDirection=new Vector3();
let colorVector=new Vector3();

function draw(){
    //画布像素坐标转换为屏幕小数坐标，并且原点为中心，XY正向）
    for(let row=0; row<canvas.height; row++){
        for(let column=0; column<canvas.width; column++){
            canvasX=column/(canvas.width-1);
            canvasY=row/(canvas.height-1);
            console.log(canvasX, canvasY);
            //flip Y coorinates so 0 is bottom of screen and 1 is top
            canvasY=1-canvasY;
            
            //canvasX,canvasY goes from -1.0 to 1.0;
            canvasX*=2; 
            canvasX-=1;
            canvasY*=2; 
            canvasY-=1;

            //let ray Direction is currentPixelPositon(x,y,-1)-CAMERAPosition(0,0,0)
            rayDirection.set(canvasX, canvasY,-0.1);
            rayDirection.normalize();//规范为单位向量，可减小数字加快计算速度
            colorVector.copy(rayDirection);

            //let the color component from (-1..0..1) to (-255..0..255),and then to (255..0..255)
            colorVector.absolute();
            colorVector.multiplyScalar(255);
            colorVector.floor();//取整，可加快计算速度

            //draw one pixel with colorVector color
            context.fillStyle="rgb(" + colorVector.x+","+colorVector.y+","+colorVector.z+")";
            context.fillRect(column,row,1,1);
            
            /*
            r=Math.floor(canvasX*255);
            g=Math.floor(canvasY*255);
            b=Math.floor(255-canvasX*255);     
            context.fillStyle="rgb(" + r+ ","+g+","+b +")";
            context.fillRect(column,rcow,1,1);
            */
        }
      }
}


//没有交互，窗口第一次显示时也绘制！
handleWindwoResize();

