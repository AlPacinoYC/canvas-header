(function(){
	var head=function(){
		var self=this;
		self.init();
		
		}
		head.prototype={
			init:function(){
			self=this;
			 canvas = document.getElementById("myCanvas");
			 ctx = canvas.getContext("2d");
			 image1 = document.getElementById("header");
			 wrap_img = document.querySelector(".wrap_img");
			 pos = document.getElementById('avatarMediaId');
			 MAX_HEIGHT = 256;
			 spbg = document.getElementById("spanbg"); //
			 sp = document.querySelector('.span');
			 var x = 0;
			 sp.onclick = function() {
                //没有图片不做处理
                var src = image1.src;
                if (src.length > 0) {
                    if (src.indexOf("http") == 0) {
                        //是网络图片
                        //x=(x+90)%360;
                        //this.style.webkitTransform="rotateZ("+x+"deg)";
                        //spbg.style.display = "none";
                    }else if (src.indexOf("data") == 0) {
                        //是本地图片
                        x=(x+90)%360;
                        var success = self.readAsDataURL(x);
                        if (success) { 
                            image1.style.display = 'none';
                            t = setInterval(function(){self.to_adopt()}, 100);
                        }else {
                            alert("图片转成data失败");
                        }
                    }else {
                        //未知文件
                    }                    
                    
                }else {
                    //alert("header.src为空");
                }
			}
			 pos.onchange = function() {
				var success = self.readAsDataURL(0);
                if (success) {
                    image1.style.display = 'none'
                    t = setInterval(function(){self.to_adopt()}, 100);
                    setTimeout("clearInterval(t)",5000);
                }else {
                    //alert("图片转成data失败");
                }
			}
			},
			render:function(src,deg) {
				// 创建一个 Image 对象  
				var image = new Image();
				// 绑定 load 事件处理器，加载完成后执行  
				image.onload = function() {
					// 获取 canvas DOM 对象  
					// 如果高度超标  
					if (image.height > MAX_HEIGHT) {
						// 宽度等比例缩放 *=  
						image.width *= MAX_HEIGHT / image.height;
						image.height = MAX_HEIGHT;
					}
					// 获取 canvas的 2d 环境对象,  
					// 可以理解Context是管理员，canvas是房子  
					
					// canvas清屏  
				
					ctx.clearRect(0, 0, canvas.width, canvas.height);
                   // 重置canvas宽高  
					if(image.width < image.height){
					canvas.width = image.width;
					canvas.height = image.width;
					var w=canvas.width/2;
					var h=canvas.height/2;
					ctx.translate(w,h)
					ctx.rotate(deg*Math.PI/180);
					ctx.translate(-w,-h);
					
					ctx.drawImage(image, 0, 0,image.width,image.height);
					//ctx.drawImage(image,(image.width-image.height)/2,0,image.height,image.height,0,0,canvas.height,canvas.height);
					//ctx.drawImage(image,(image.width-image.height)/2,0,image.height,image.height,0,0,image.height,image.height);
					// !!! 注意，image 没有加入到 dom之中  
					}else if(image.width>=image.height){
						canvas.width = image.height;
					    canvas.height = image.height;
					    // 将图像绘制到canvas上  
						var w=canvas.width/2;
						var h=canvas.height/2;
						ctx.translate(w,h)
						ctx.rotate(deg*Math.PI/180);
						ctx.translate(-w,-h);
						ctx.drawImage(image, 0, 0,image.width,image.height);
						//ctx.drawImage(image,50,0,image.height,image.height,0,0,canvas.width,canvas.height);
						//ctx.drawImage(image, 0, 0,image.width,image.height);
						//ctx.drawImage(image,50,0,image.height,image.height,0,0,canvas.width,canvas.height);
						// !!! 注意，image 没有加入到 dom之中  
					}
					
				};
				// 设置src属性，浏览器会自动加载。  
				// 记住必须先绑定事件，才能设置src属性，否则会出同步问题。  
				image.src = src;
				spbg.style.display = "none";
			},
			 imger:function() {
				var img = new Image;
				img.src = image1.src;
				img.onload = function() {
					if (img.width > img.height) {
						image1.style.width = "auto";
						image1.style.height = "100%";
						//如果宽大于高度 则以高度为圆的直径 宽度设为auto
					} else {
						image1.style.height = "auto";
						image1.style.width = "100%";
						//如果宽小于高度 则以宽度为圆的直径 高度设为auto
					}
				};
				image1.style.display = "block";
			},
			 to_adopt:function() {
				var dataUrl = canvas.toDataURL("image/png");
				console.log(dataUrl)
				image1.src = dataUrl;
				self.imger();
			},
			readAsDataURL:function(deg) {
				//检验是否为图像文件  
				var file = pos.files[0];
                if (!/image\/\w+/.test(file.type)) {
                    alert("请选择图片文件！");
                    return false;
                }
				var reader = new FileReader();
				//将文件以Data URL形式读入页面  
				reader.readAsDataURL(file);
                reader.onload = function(e) {
                    var result = document.getElementById("result");
                    //显示文件
                    self.render(this.result,deg);
                }
                return true;
			}
		}
		window['head']=head;
})()
