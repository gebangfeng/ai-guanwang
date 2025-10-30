# Docker 部署说明

本项目使用 Docker 和 Nginx 部署静态网站。

## 快速开始

### 方式一：使用 Docker Compose（推荐）

```bash
# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止容器
docker-compose down
```

访问: http://localhost:8080

### 方式二：使用 Docker 命令

```bash
# 构建镜像
docker build -t chatgpt-claude-website .

# 运行容器
docker run -d -p 8080:80 --name chatgpt-claude-website chatgpt-claude-website

# 查看日志
docker logs -f chatgpt-claude-website

# 停止容器
docker stop chatgpt-claude-website

# 删除容器
docker rm chatgpt-claude-website
```

访问: http://localhost:8080

## 自定义端口

如果需要使用其他端口，可以修改 `docker-compose.yml` 文件中的端口映射：

```yaml
ports:
  - "3000:80"  # 将8080改为你想要的端口
```

或者在 docker run 命令中修改：

```bash
docker run -d -p 3000:80 --name chatgpt-claude-website chatgpt-claude-website
```

## 生产环境部署

在生产环境中，建议：

1. 使用具体的版本标签而不是 latest
2. 配置 HTTPS（使用 nginx-proxy 或 Let's Encrypt）
3. 设置适当的资源限制
4. 配置健康检查

示例：

```bash
docker run -d \
  -p 80:80 \
  --name chatgpt-claude-website \
  --restart unless-stopped \
  --memory="256m" \
  --cpus="0.5" \
  chatgpt-claude-website:1.0.0
```

## 镜像特性

- 基于 `nginx:alpine`，镜像体积小（约 40MB）
- 启用 gzip 压缩
- 静态资源缓存配置
- 支持 SPA 路由

## 故障排查

### 查看容器状态
```bash
docker ps -a
```

### 查看详细日志
```bash
docker logs chatgpt-claude-website
```

### 进入容器调试
```bash
docker exec -it chatgpt-claude-website sh
```

### 验证nginx配置
```bash
docker exec chatgpt-claude-website nginx -t
```
