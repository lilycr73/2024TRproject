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


let rayDirection=new Vector3();//光线方向向量
let colorVector=new Vector3(); //显示用颜色向量

let skyColor =new Vector3(0.2,0.6,1);//设置天空蓝色
let groundColor =new Vector3(0.2,0.4,0.01);//设置平面色为绿色
let  fogColor =new Vector3(0.7,0.7,0.7);//雾色


let planeOrigin =new Vector3(0,-5,0); //地平面沿着Y轴向下移动：以便视点（0，0，0）可以看到
let planeNormal =new Vector3(0,1,0);//planeNormal.normalize();
let rayOrign=new Vector3(0,0,0);//视点位置
let t=0;



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
            rayDirection.set(canvasX, canvasY,-0.1);//平移
            rayDirection.normalize();//缩放，规范为单位向量，可减小数字加快计算速度
    
            //计算每个像素颜色，如果是与平面交点t,
            t=intersectPlane(planeOrigin,planeNormal,rayOrign,rayDirection);
            if(t < Infinity )
            {
                //colorVector.set(1,1,1);
                //colorVector.copy(groundColor);
                colorVector.mix(groundColor,fogColor,t*0.008);
            }
            else{
                //colorVector.copy(skyColor);
                colorVector.mix(fogColor,skyColor,rayDirection.y * 1.5);
            }

            //将（0..1)表示颜色转换为255表示
            colorVector.multiplyScalar(255);
            colorVector.floor();//取整颜色值，可加快计算速度

            //draw one pixel with colorVector color
            context.fillStyle="rgb(" + colorVector.x+","+colorVector.y+","+colorVector.z+")";
            context.fillRect(column,row,1,1);
            

        }
      }
}


//没有交互，窗口第一次显示时也绘制！
handleWindwoResize();

