Pain in createJS
======

Hiện nay có rất nhiều thư viện hỗ trợ việc lập trình JS, tiêu biểu như AngularJS, BackboneJS, CreatJS,...
CreateJS là một bộ công cụ cực kỳ tiện dụng, hỗ trợ đầy đủ những thứ bạn cần để lập trình game HTML5, bao gồm:
- EASELJS: chứa API giống với API phát triển game của Flash, giúp tạo các hình ảnh, thành phần có thể chuyển động, mang tính tương tác.
- TWEENJS: tạo chuyển động cho bất cứ thành phần nào, cái này thì được tích hợp sẵn vào EASELJS rồi.
- SOUNDJS: thư viện hỗ trợ tương tác âm thanh, làm game mà không có âm thanh thì sức hấp dẫn giảm đi 1 nửa.
- PRELOADJS: bạn sẽ không muốn game của mình có những hình ảnh, hành động kì cục chỉ vì 1 số hình ảnh hay âm thanh chưa được tải xuống hết trình duyệt đúng không. Thư viện này sẽ giúp bạn giải quyết vấn đề đó.

pain_createjs là một ứng dụng sử dụng CreateJS để tạo ra trò chơi vẽ hình như trò pain trên window.

Trước tiên bạn cần khai báo vùng thao tác đồ họa:
```HTML
<canvas id="myCanvas" width="800" height="600" style="border:1px solid #000;"></canvas>
```

Sử dụng CreateJS với vùng thao tác đồ họa:
```Javascript
canvas = document.getElementById('myCanvas');
stage = new createjs.Stage(canvas);
selected = new createjs.Container();
// Thao tác với vùng selected
stage.addChild(selected);
```

Để vẽ hình hoặc điểm trong vùng thao tác đồ họa, ta sử dụng các hàm trong createJS, ví dụ như:
```Javascript
shape = new createjs.Shape();
// Các thao tác với shape
point = new createjs.Point(x, y)
//..
```

Để hiển thị được điểm hoặc hình vừa vẽ, ta phải update Stage (vùng thao tác đồ họa)
```Javascript
canvas = document.getElementById('myCanvas');
stage = new createjs.Stage(canvas);
// Thao tác đồ họa

stage.update();
```

Về cách sử dụng các hàm của các thư viện trong CreateJS, các bạn có thể tham khảo tutorial sau:
http://www.createjs.com/tutorials/Getting%20Started/

Hy vọng các bạn có những phút giây lập trình game HTML5 thật thú vị cùng CreateJS.
