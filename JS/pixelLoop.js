let userInfo=document.getElementById("userInfo");



let canvas=document.getElementById("myCanvas");
let context=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

userInfo.innerHTML="canvasW:"+canvas.width+" canvasH:"+canvas.height + "<br>" + 
"total pixel count:"+(canvas.width*canvas.height);

//context.fillStyle="megata"; //绘图颜色
//context.fillRect(canvas.width/2,canvas.height/2,4,4);//绘制1个像素方块

//画布像素坐标转换为屏幕小数坐标（原点不变，XY不变）
let canvasX=0;
let canvasY=0;

for(let row=0; row<canvas.height; row++){
    for(let column=0; column<canvas.width; column++){
        canvasX=column/(canvas.width-1);
        canvasY=row/(canvas.height-1);
        r=Math.floor(canvasX*255);
        g=Math.floor(canvasY*255);
        b=Math.floor(255-canvasX*255);     
        context.fillStyle="rgb(" + r+ ","+g+","+b +")";
        context.fillRect(column,row,1,1);
    }
}

