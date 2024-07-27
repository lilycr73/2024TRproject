//定义自己的向量vector3
//let myVector=new Vector3(1,2,3);//构造函数，可设置初始值
//若要赋予向量功能，就是加在它的原型上

function Vector3(x = 0, y = 0, z = 0)
{
	this.x = x;
	this.y = y;
	this.z = z;
	return this;
}

Vector3.prototype.set = function(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
	return this;
};

Vector3.prototype.copy = function(otherVector)
{
	this.x = otherVector.x;
	this.y = otherVector.y;
	this.z = otherVector.z;
	return this;
};

Vector3.prototype.add = function(otherVector)
{
	this.x += otherVector.x;
	this.y += otherVector.y;
	this.z += otherVector.z;
	return this;
};

Vector3.prototype.subtract = function(otherVector)
{
	this.x -= otherVector.x;
	this.y -= otherVector.y;
	this.z -= otherVector.z;
	return this;
};

Vector3.prototype.multiplyScalar = function(scalarNumber)
{
	this.x *= scalarNumber;
	this.y *= scalarNumber;
	this.z *= scalarNumber;
	return this;
};

Vector3.prototype.floor = function()
{
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
	this.z = Math.floor(this.z);
	return this;
};

Vector3.prototype.absolute = function()
{
	this.x = Math.abs(this.x);
	this.y = Math.abs(this.y);
	this.z = Math.abs(this.z);
	return this;
};

Vector3.prototype.vectorLength = function()
{
	return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
};

let inverseLength = 0;
Vector3.prototype.normalize = function()
{
	inverseLength = 1 / this.vectorLength();
	this.x *= inverseLength;
	this.y *= inverseLength;
	this.z *= inverseLength;
	return this;
};


//下面函数是为了进行ray和 plane求交和颜色混合用的
Vector3.prototype.dot = function(otherVector)
{
	return (this.x * otherVector.x) + (this.y * otherVector.y) + (this.z * otherVector.z);
};


Vector3.prototype.mix = function(vectorA, vectorB, t)
{
	t = Math.min(t, 1); //make sure 《t《1
	t = Math.max(t, 0);//make sure  0《t
	this.x = vectorA.x + (vectorB.x - vectorA.x) * t;
	this.y = vectorA.y + (vectorB.y - vectorA.y) * t;
	this.z = vectorA.z + (vectorB.z - vectorA.z) * t;
	return this;
};


/*以下知识函数，光线和平面的求交函数，返回交点的t值，无穷大Infinity则无交点
     t=dot((P0-O0) ,N)/ (D,)

*/
let planeO_rayO_vec = new Vector3();
let rayD_dot_planeN = 0;
let result = 0;

function intersectPlane(planeOrigin, planeNormal, rayOrigin, rayDirection)
{   //t= ((P0-O) •N) / (D • N)  需要检验 t>0 才会有交点
	//rayD_dot_planeN is (D • N),planeO_rayO_vec is (P0-O), planeNormal is N
	rayD_dot_planeN = rayDirection.dot(planeNormal);

	//因为当光线和面外法向量同向则点乘>=0，实际眼睛看到的是平面的背面，所以不应该算作能看到的交点！

	if (rayD_dot_planeN >= 0)  
			{
		return Infinity;
	}

	planeO_rayO_vec.copy(planeOrigin);
	planeO_rayO_vec.subtract(rayOrigin);
	result = planeO_rayO_vec.dot(planeNormal) / rayD_dot_planeN;
	//如果T<0,说明平面在视点后面，所以不可能看见
	if (result > 0)
	{
		return result;
	}
	//else{
		return Infinity;//原来没else,显示不正确！？
	//}

}