var main = document.getElementById('main');
var go = document.getElementById('go');
var speed = 5, num = 0, timer, flag = true;
// 将颜色存到数组中
var colors = ['red', 'green', 'black', 'blue'];
// 创建每一行 及每一行中每一列的div
function cDiv() {
    var oDiv = document.createElement('div');
    // 随机取到索引值0至3
    var index = Math.floor(Math.random() * 4);
    // 将每一行设置class
    oDiv.setAttribute('class', 'row');
    // 通过for循环每一行生成四列
    for (var j = 0; j < 4; j++) {
        var iDiv = document.createElement('div');
        oDiv.appendChild(iDiv);
    }
    // 将生成的新的一行插入到main区域的最上边一行
    if (main.childNodes.length == 0) {
        main.appendChild(oDiv);
    } else {
        main.insertBefore(oDiv, main.childNodes[0]);
    }
    // 根据随机数将每一行中随机的div设置成为应该被点击的div
    var clickDiv = main.childNodes[0].childNodes[index];
    // 设置上class类名作为标记  当我们成功点击到此div移除class类名
    clickDiv.setAttribute('class', 'i');
    // 同时将此div设置上随机背景颜色
    clickDiv.style.backgroundColor = colors[index];

}

// 移动函数
function move() {
    clearInterval(timer);
    // 利用定时器将整个main区域向下移动  改变top值向下移动 初始top值为-150px为一列高度那么高
    timer = setInterval(function () {
        var step = parseInt(main.offsetTop) + speed;
        main.style.top = step + 'px';
        // 如果main区域移动到显示区域 top值大于等于零
        // 将main区域移动到初始位置  同时从创建新的一行插入到main区域中
        if (parseInt(main.offsetTop) >= 0) {
            cDiv();
            main.style.top = '-150px';
        }
        // 或得到当前main区域行数 如果len值为6
        var len = main.childNodes.length;
        if (len == 6) {
            // 进行判断移出显示区域最后一行是否有未点击div
            // 如果有则结束游戏
            // 同时将flag置为false  游戏结束后不可以进行任何点击操作
            for (var i = 0; i < 4; i++) {
                if (main.childNodes[len - 1].children[i].classList.contains('i')) {
                    alert('游戏结束，得分：' + num);
                    clearInterval(timer);
                    flag = false;
                }
            }
            // 同时将走过显示区域的最后一行移除  在dom结构中不存在多余结构
            main.removeChild(main.childNodes[len - 1]);
        }
    }, 20)
    bindEvent();
}

function bindEvent() {
    main.addEventListener('click', function (event) {
        if (flag) {
            var tar = event.target;
            // 在进行点击操作  判断当前点击div是否为有颜色的方块 
            // 利用class名进行判断  同时计分加一
            if (tar.className == 'i') {
                tar.style.backgroundColor = '#bbb';
                tar.classList.remove('i');
                num++;
            } else {
                // 如果点到白色小方块  游戏结束 
                alert('游戏结束，得分：' + num);
                clearInterval(timer);
                flag = false;
            }
            // 如果当前分数为10的倍数  提高速度
            if (num % 10 == 0) {
                speed++;
            }
        }
    })
}


// 点击游戏开始按钮
function clickStart() {
    go.addEventListener('click', function () {
        go.style.display = 'none';
        move();
    });
}
clickStart();