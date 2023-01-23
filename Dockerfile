# 后面在服务器中安装了docker之后,执行`docker build -t user-center-frontend:v0.0.1`之后就会自动识别Dockerfile文件并执行下面的命令
# 设置一个基础镜像,表示我们这个docker镜像依赖于这个基础镜像,之后就不用我们自己安装nginx了
FROM nginx

# WORKDIR表示工作目录,以后所有的代码都放在线上的这个工作目录中
WORKDIR /usr/share/nginx/html/
# 指定用户
USER root

# 把本地nginx.conf的配置文件复制到系统nginx的配置文件中
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# 把前端经过build自动生成的代码包dist复制到nginx默认能够找到的代码目录下
COPY ./dist  /usr/share/nginx/html/

# 显式的说我们这个项目占用80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
