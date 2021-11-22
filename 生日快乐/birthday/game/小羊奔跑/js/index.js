/***
 *  1 ,小羊的运动的动画
 *  2 ,小羊的自身的运动动画
 *  3 , 实现多只羊的生成
 *  4 , 小羊的拖拽 （自身的动画需要变换）
 */

// 一个问题 ，小羊动画
//自身动画+运动动画
// var backNum = 0;
// var sheep = document.getElementsByClassName("sheep")[0];
// var sheepAinimate = setInterval(function () {
//   backNum = backNum + 164;
//   if (backNum == 1312) {
//     backNum = 0;
//   }
//   var cot = sheep.offsetLeft - 10;
//   if (cot <= -164) {
//     clearInterval(sheepRun);
//     console.log("remove");
//   }

//   sheep.style.left = cot + "px";
//   sheep.style.backgroundPosition = -backNum + "px " + 0 + "px";
// }, 100);

//单对象编程

var sheeps = {
  sPars: {
    stage: document.getElementsByClassName("stage")[0],
    backNum: 0,
    speed: 7,
    frequency: 70,
    MaxSheep:8//最大羊的數量
  },

  init: function () {
    this.creatSheep(); //创造多只羊的函数
  },
  creatSheep: function () {
    //创造小羊的模具

    function SheepClass(obj) {
      //构造函数
      this.sheep = document.createElement("div");//創造羊的div
      obj.stage.appendChild(this.sheep);//把羊放到舞台上
      this.sheep.className = "sheep";//給它變成羊
      this.frequency = Math.floor(Math.random() * obj.frequency) + 30;//每個對象上都有不同的頻率
      this.backNum = obj.backNum;
      this.speed = obj.speed;
      this.stage = obj.stage;
      this.top = 0;

      this.currentSpeed = this.speed;//保存當前的速度，為拖拽鬆手繼續跑用
    }

   

   var _this =  this;
    //创造多只羊
    var timer = setInterval(function(){
        var sheepNum = _this.sPars.stage.children.length//舞台上羊的数量

        if(sheepNum<_this.sPars.MaxSheep){
            var oneSheep = new SheepClass(_this.sPars); //生成出羊的对象
            _this.SheepRun(oneSheep);
        }
        

    },1000)


  },
  SheepRun: function (sheepClass) {
    sheepClass.sheepAinimate = setInterval(function () {
        sheepClass.backNum = sheepClass.backNum + 164;
      if (sheepClass.backNum == 1312) {
        sheepClass.backNum = 0;
      }
      var cot = sheepClass.sheep.offsetLeft - sheepClass.speed;
      if (cot <= -164) {
        clearInterval(sheepClass.sheepAinimate);
        sheepClass.stage.removeChild(sheepClass.sheep)
        console.log("remove");
      }

      sheepClass.sheep.style.left = cot + "px";
      sheepClass.sheep.style.backgroundPosition = - sheepClass.backNum + "px " + sheepClass.top + "px";
    },sheepClass.frequency);



    //小羊的拖拽
    sheepClass.sheep.onmousedown = function(e){//鼠標按下
        sheepClass.speed = 0;//不讓小羊移動 速度為0
        sheepClass.top = -128;//背景圖片的位置往上移動128px

        sheepClass.x = e.pageX;//鼠標屏幕上的x坐標
        sheepClass.y = e.pageY;


        document.onmousemove = function(e){ //鼠標移動
            var chax = e.pageX - sheepClass.x ;
            var chay = e.pageY - sheepClass.y ;
            sheepClass.sheep.style.left = chax + sheepClass.sheep.offsetLeft + 'px';
            sheepClass.sheep.style.top = chay + sheepClass.sheep.offsetTop + 'px';

            sheepClass.x = e.pageX;//更新鼠标屏幕上的x坐標
            sheepClass.y = e.pageY;//更新鼠标屏幕上的Y坐標

        }

        this.onmouseup = function(e){//鼠標鬆開
            document.onmousemove = null;

            sheepClass.speed = sheepClass.currentSpeed;//還原當前的速度
            sheepClass.top = 0;
        }
    }


  },
};
sheeps.init(); //入口

