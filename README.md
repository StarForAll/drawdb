<div align="center">
    <img width="64" alt="drawdb logo" src="./src/assets/icon-dark.png">
    <h1>drawDB</h1>
</div>

<h3 align="center">Free, simple, and intuitive database schema editor and SQL generator.</h3>



<h3 align="center"><img width="700" style="border-radius:5px;" alt="demo" src="drawdb.png"></h3>

DrawDB is a robust and user-friendly database entity relationship (DBER) editor right in your browser. Build diagrams with a few clicks, export sql scripts, customize your editor, and more without creating an account.

## Getting Started
> <https://github.com/settings/tokens/new>页创建一个名为VITE_GITHUB_ACCESS_TOKEN的token，勾选create  gists  
> 将创建的token记住，在最后run前，将token复制到.env文件中，如：不同的run需要不同的.env文件

### Local Development

```bash
git clone https://github.com/StarForAll/drawdb
cd drawdb
npm install
npm run dev
```

### Build

```bash
git clone https://github.com/StarForAll/drawdb
cd drawdb
npm install
npm run build
```

### Docker Build

```bash
docker build -t drawdb .
docker run -p 3000:80 drawdb
```

### docker run with existing nginx
```bash
#1.构建目录
npm ci  && npm run build
#2.将生成的dist挂载到已有的nginx的html目录下
cp -r dist /new/docker/nginx/html/drawdb
#3.生成ssl和配置drawdb的conf

#重启nginx容器
docker stop nginx-container && docker compose -f /new/docker/nginx/docker-compose.yml up -d
docker logs nginx-container
```
