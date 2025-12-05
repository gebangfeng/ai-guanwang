# 使用nginx作为基础镜像
FROM nginx:alpine

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 删除nginx默认页面
RUN rm -rf ./*

# 复制网站文件到nginx目录
COPY index.html .
COPY about.html .
COPY pricing.html .
COPY product.html .
COPY styles.css .
COPY script.js .
COPY robots.txt .
COPY sitemap.xml .

# 创建自定义nginx配置（可选）
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # SEO文件优化 \
    location = /robots.txt { \
        add_header Content-Type text/plain; \
        access_log off; \
    } \
    \
    location = /sitemap.xml { \
        add_header Content-Type application/xml; \
        access_log off; \
    } \
    \
    # 启用gzip压缩 \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json application/xml; \
    \
    # 缓存静态资源 \
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ { \
        expires 30d; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # HTML文件不缓存，确保SEO更新及时生效 \
    location ~* \.(html)$ { \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
        expires 0; \
    } \
}' > /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
