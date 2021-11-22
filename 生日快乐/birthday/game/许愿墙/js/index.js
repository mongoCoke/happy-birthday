// 封装获取 DOM 的方法
function $(selector) {
    return document.querySelector(selector);
}

// 首先第一步，我们做一些初始化操作
var wishes = ['生日快乐', '赚多多的钱', '开个甜品店']; // 默认的愿望单内容
var bgcColors = ['#96c2f1', '#bbe1f1', '#e3e197', '#f8b3d0', '#ffcc00', 'rgba(255,123,123,1)', 'yellowgreen', 'pink', 'skyblue']; // 许愿单随机的背景颜色
// 接下来我们还需要获取一些节点

var wishList = $('.wishList'); // 获取到许愿单的容器节点
var confirmBtn = $('.confirmBtn'); // 获取下方按钮的节点
var res = $('.res'); // 获取输入框

// 至此，我们的准备工作就做完了

// 渲染方法，接收一个参数，具体的愿望，其实就是一个字符串
function render(wish){
    // 1. 确定一个随机的颜色
    var bgcColor = bgcColors[Math.floor(Math.random() * bgcColors.length)];

    // 2. 还需要确定 left 和 top 的值

    // left 的取值范围 = 许愿单容器的宽度 - 许愿单的宽度
    var left = Math.floor(Math.random() * (wishList.clientWidth - 170));
    // top 的取值范围 = 许愿单容器的高度 - 许愿单的高度
    var top = Math.floor(Math.random() * (wishList.clientHeight - 170));

    // 3. 拼接内容
    // 下面会用到字符串模板
    // var name = 'xiejie';
    // console.log('Hello, ' + name);
    // console.log(`Hello,${name}`); // Hello,xiejie

    wishList.innerHTML += `
        <div class="item" style="top:${top}px;left:${left}px;background-color:${bgcColor}">
            ${wish}
            <div class="close">x</div>
        </div>
    `

}

// 产生新的愿望
function newContent(){
    if(res.value){
        render(res.value);
        res.value = '';
    } else {
        window.alert('请输入内容！');
    }
}


// 绑定事件
function bindEvent(){
    // 1. 发布愿望（按下回车、点击发布按钮）
    document.onkeydown = function(e){
        if(e.key === 'Enter'){
            // 发布愿望
            newContent();
        }
    }
    confirmBtn.onclick = newContent;

    // 2. 拖动事件
    wishList.onmousedown = function(e){
        if(e.target.className === 'item'){
            // 进入此 if，说明用户是在许愿单上面按下的鼠标

            document.onmousemove = function(ev){
                // 目标元素的 left = （mousemove 事件发生时）鼠标到页面的 left - （mousedown 事件发生时）鼠标到事件源的 left
                e.target.style.left = ev.clientX - e.offsetX + 'px';

                // 目标元素的 top = （mousemove 事件发生时）鼠标到页面的 top - （mousedown 事件发生时）鼠标到事件源的 top
                e.target.style.top = ev.clientY - e.offsetY + 'px';

                // 还需要进行一个边界的判断
                if(parseInt(e.target.style.left) <= 0){
                    // 左边界
                    e.target.style.left = '0px';
                }
                if(parseInt(e.target.style.left) >= wishList.clientWidth - 170){
                    // 右边界
                    e.target.style.left = wishList.clientWidth - 170 + 'px';
                }
                if(parseInt(e.target.style.top) <= 0){
                    // 上边界
                    e.target.style.top = '0px';
                }
                if(parseInt(e.target.style.top) >= wishList.clientHeight - 170){
                    // 下边界
                    e.target.style.top = wishList.clientHeight - 170 + 'px';
                }
            }

            // 鼠标抬起的时候，直接将鼠标移动事件删除即可
            document.onmouseup = function(){
                document.onmousemove = null;
            }
        }
    }

    // 3. 关闭愿望单
    document.onclick = function(e){
        if(e.target.className === 'close'){
            // 进入此 if，说明用户点击的是关闭按钮
            wishList.removeChild(e.target.parentNode);
        }
    }
}


function main() {
    // 1. 进行初始化渲染
    for (var i = 0; i < wishes.length; i++) {
        render(wishes[i]);
    }

    // 2. 绑定对应的事件
    bindEvent();
}

main()