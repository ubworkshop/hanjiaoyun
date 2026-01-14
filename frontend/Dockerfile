FROM node:20-slim

WORKDIR /app

# 复刻依赖文件
COPY package*.json ./

# 安装依赖
RUN npm install --legacy-peer-deps

# 复刻代码
COPY . .

# 暴露端口
EXPOSE 3000

# 运行命令
CMD ["npm", "run", "dev", "--", "--host"]
