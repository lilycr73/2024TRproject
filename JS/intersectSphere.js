let userInfo=document.getElementById("userInfo");

let canvas=document.getElementById("myCanvas");
let context=canvas.getContext("2d");
let aspectRatio=0;

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


window.addEventListener("resize",handleWindwoResize);
function handleWindwoResize(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    aspectRatio=canvas.width/canvas.height;

    //调整窗口后，画布中像素数会变化
    userInfo.innerHTML="canvasW:"+canvas.width+" canvasH:"+canvas.height + "<br>" + 
    "total pixel count:"+(canvas.width*canvas.height);
    //redraw the screen
    draw();
    
}

let canvasX=0;
let canvasY=0;



let rayDirection=new Vector3();//光线方向向量
let colorVector=new Vector3(); //显示用颜色向量

let skyColor =new Vector3(0.2,0.6,1);//设置天空蓝色
let groundColor =new Vector3(0.5,0.5,0.5);//设置平面色灰色
let  fogColor =new Vector3(0.7,0.7,0.7);//雾色
let gradientSkyColor = new Vector3(); //梯度变化/渐变天空色


let planeOrigin =new Vector3(0,-3,0); //地平面沿着Y轴向下移动：以便视点（0，0，0）可以看到
let planeNormal =new Vector3(0,1,0);//planeNormal.normalize();
let rayOrign=new Vector3(0,0,0);//视点位置

let sphereRadius=5;
let spherePosition=new Vector3(0,planeOrigin.y+sphereRadius,-8);//球中心位置
let sphereColor= new Vector3(0.8,0.01,0.01);//红色

let t=0;
let nearestT=0; 

function draw(){
    //画布像素坐标转换为屏幕小数坐标，并且原点为中心，XY正向）
    for(let row=0; row<canvas.height; row++){
        for(let column=0; column<canvas.width; column++){
            canvasX=column/(canvas.width-1);
            canvasY=row/(canvas.height-1);
            //console.log(canvasX, canvasY);
            //flip Y coorinates so 0 is bottom of screen and 1 is top
            canvasY=1-canvasY;
            
            //canvasX,canvasY goes from -1.0 to 1.0;
            canvasX*=2; 
            canvasX-=1;
            canvasY*=2; 
            canvasY-=1;

            canvasX*= aspectRatio;   //aspectRatio=w/h

            //let ray Direction is currentPixelPositon(x,y,-1)-CAMERAPosition(0,0,0)
            rayDirection.set(canvasX, canvasY,-0.1);//平移
            rayDirection.normalize();//缩放，规范为单位向量，可减小数字加快计算速度
            
            //设置天空色是越远则淡的色，即雾色和蓝色的混合，按光线方向Y轴比例混合
            gradientSkyColor.mix(fogColor,skyColor,rayDirection.y*1.5);
            nearestT=Infinity;
            
            //每个光线如果是与球有交点t，则显示球色
            t=intersectSphere(spherePosition,sphereRadius,rayOrign,rayDirection);
            if(t<nearestT){
                nearestT=t;                
                colorVector.copy(sphereColor);
            };
            //计算光线如果与平面交点t,则显示地面色和天空色混合
            t=intersectPlane(planeOrigin,planeNormal,rayOrign,rayDirection);
            if(t <nearestT )
            {
                nearestT=t;  
                colorVector.mix(groundColor,gradientSkyColor,t*0.008);
            };
            //如果nearestT没有修改，则显示渐变天空色
            if(nearestT == Infinity)
            {
                colorVector.copy(gradientSkyColor);                
            };

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

