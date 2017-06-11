//获得主界面
var mainDiv=document.getElementById("maindiv");
//获得开始界面
var startdiv=document.getElementById("startdiv");
//获得游戏中分数显示界面
var scorediv=document.getElementById("scorediv");
//获得分数界面
var scorelabel=document.getElementById("label");
//获得暂停界面
var suspenddiv=document.getElementById("suspenddiv");
//获得游戏结束界面
var enddiv=document.getElementById("enddiv");
//获得游戏结束后分数统计界面
var planscore=document.getElementById("planscore");
//初始化分数
var scores=0;

/*
创建飞机类
*/
function plan(hp,X,Y,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
this.planX=X;
this.planY=Y;
this.imagenode=null;
this.planhp=hp;
this.planscore=score;
this.plansizeX=sizeX;
this.plansizeY=sizeY;
this.planboomimage=boomimage;
this.planisdie=false;
this.plandietimes=0;
this.plandietime=dietime;
this.plansudu=sudu;
//行为
/*
移动行为
*/
this.planmove=function(){
if(scores<=50000){
this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+"px";
}
else if(scores>50000&&scores<=100000){
this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+1+"px";
}
else if(scores>100000&&scores<=150000){
this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+2+"px";
}
else if(scores>150000&&scores<=200000){
this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+3+"px";
}
else if(scores>200000&&scores<=300000){
this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+4+"px";
}
else{
this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+5+"px";
}
}
this.init=function(){
this.imagenode=document.createElement("img");
this.imagenode.style.left=this.planX+"px";
this.imagenode.style.top=this.planY+"px";
this.imagenode.src=imagesrc;
mainDiv.appendChild(this.imagenode);
}
this.init();
}

/*
创建子弹类
*/
function bullet(X,Y,sizeX,sizeY,imagesrc){
this.bulletX=X;
this.bulletY=Y;
this.bulletimage=null;
this.bulletattach=1;
this.bulletsizeX=sizeX;
this.bulletsizeY=sizeY;
//行为
/*
移动行为
*/
this.bulletmove=function(){
this.bulletimage.style.top=this.bulletimage.offsetTop-20+"px";
}
this.init=function(){
this.bulletimage=document.createElement("img");
this.bulletimage.style.left= this.bulletX+"px";
this.bulletimage.style.top= this.bulletY+"px";
this.bulletimage.src=imagesrc;
mainDiv.appendChild(this.bulletimage);
}
this.init();
}

/*
创建单行子弹类
*/
function oddbullet(X,Y){
bullet.call(this,X,Y,6,14,"image/bullet1.png");
}

/*
创建敌机类
*/
function enemy(hp,a,b,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
plan.call(this,hp,random(a,b),-100,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc);
}
//产生min到max之间的随机数
function random(min,max){
return Math.floor(min+Math.random()*(max-min));
}

/*
创建本方飞机类
*/
function ourplan(X,Y){
var imagesrc="image/我的飞机.gif";
plan.call(this,1,X,Y,66,80,0,660,0,"image/本方飞机爆炸.gif",imagesrc);
this.imagenode.setAttribute('id','ourplan');
}

/*
创建本方飞机
*/
var selfplan=new ourplan(120,485);
