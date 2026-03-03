# CikGen - 安全密码生成器

<p align="center">
  <img src="public/icons/icon.png" alt="CikGen Logo" width="128" height="128">
</p>

<p align="center">
  <strong>安全、可定制的随机密码生成器浏览器扩展</strong>
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> •
  <a href="#安装方法">安装方法</a> •
  <a href="#使用指南">使用指南</a> •
  <a href="#技术架构">技术架构</a> •
  <a href="#开发指南">开发指南</a>
</p>

---

## 隐私承诺

**CikGen 不会收集、上传或分享您的任何数据**

- 不收集任何数据
- 不发送网络请求
- 数据仅保存本地
- 完全离线运行

所有密码和历史记录仅保存在您的浏览器本地 IndexedDB 数据库中，完全由您掌控。

---

## 功能特性

### 核心功能

| 功能 | 描述 |
|------|------|
| **密码生成** | 使用 Web Crypto API 生成加密安全的随机密码 |
| **批量生成** | 一次生成多个密码（最多 50 个） |
| **自定义长度** | 支持 4-128 位密码长度 |
| **字符类型选择** | 小写字母、大写字母、数字、特殊符号 |
| **自定义符号** | 可自定义特殊符号字符集 |
| **排除字符** | 排除易混淆字符（如 0O1lI） |
| **一键复制** | 快速复制单个或全部密码到剪贴板 |
| **历史记录** | 自动保存生成的密码，支持搜索和分页 |
| **数据导出** | 导出历史记录为 JSON 文件 |

### 界面特性

- **深色模式**：护眼的深色主题设计
- **响应式布局**：1200px 宽敞布局
- **状态持久化**：页面切换时保留密码数据
- **实时统计**：显示密码强度、可用字符数、字符类型数

---

## 安装方法

### 方式一：从源码构建

```bash
# 克隆项目
git clone https://github.com/cikheo/CikGen.git
cd CikGen

# 安装依赖
npm install

# 构建生产版本
npm run build
```

### 方式二：使用预构建包

下载 `CikGen-v1.0.0.zip` 并解压。

### 加载到浏览器

#### Chrome 浏览器

1. 打开 `chrome://extensions/`
2. 开启右上角 **开发者模式**
3. 点击 **加载已解压的扩展程序**
4. 选择 `dist` 文件夹

#### Edge 浏览器

1. 打开 `edge://extensions/`
2. 开启左下角 **开发人员模式**
3. 点击 **加载解压缩的扩展**
4. 选择 `dist` 文件夹

---

## 使用指南

### 主页 - 密码生成

1. **配置选项**
   - 密码长度：手动输入或选择预设（8/12/16/24/32/48）
   - 生成数量：一次生成 1-50 个密码
   - 字符类型：勾选需要的字符类型
   - 高级选项：自定义符号、排除字符

2. **生成密码**
   - 点击「生成密码」按钮
   - 查看密码强度、可用字符数等统计信息

3. **复制密码**
   - 点击单行复制单个密码
   - 点击「复制全部」复制所有密码

### 历史记录

- **搜索筛选**：按日期范围、密码长度筛选
- **快捷日期**：今天、近7天、近30天、全部
- **分页浏览**：每页显示 50 条记录
- **操作**：复制、删除单条记录，清空全部

### 设置页面

- **数据统计**：查看历史记录总数、今日/本周生成数量
- **数据操作**：导出数据为 JSON、清空历史记录
- **使用帮助**：查看功能说明

---

## 技术架构

### 技术栈

| 技术 | 用途 |
|------|------|
| Vue 3 | 前端框架 |
| Vite | 构建工具 |
| IndexedDB | 本地数据存储 |
| Web Crypto API | 密码生成随机数 |
| Manifest V3 | 浏览器扩展规范 |

### 项目结构

```
cikgen/
├── public/
│   ├── icons/                  # 扩展图标
│   ├── manifest.json           # 扩展配置
│   ├── popup.html              # 弹出页面
│   └── options.html            # 选项页面
├── src/
│   ├── components/
│   │   ├── PasswordGenerator.vue   # 密码生成器
│   │   ├── PasswordHistory.vue     # 历史记录
│   │   └── SettingsPanel.vue       # 设置面板
│   ├── composables/
│   │   └── useIndexedDB.js         # IndexedDB 封装
│   ├── utils/
│   │   ├── passwordGenerator.js    # 密码生成算法
│   │   ├── indexedDB.js            # 数据库操作
│   │   └── constants.js            # 常量定义
│   ├── popup/
│   │   ├── main.js                 # 弹出页入口
│   │   └── App.vue                 # 弹出页主组件
│   └── options/
│       ├── main.js                 # 选项页入口
│       └── App.vue                 # 选项页主组件
├── scripts/
│   └── generate-icons.js       # 图标生成脚本
├── dist/                       # 构建输出
├── vite.config.js              # Vite 配置
└── package.json
```

### 数据存储

**IndexedDB 数据库配置**

| 项目 | 值 |
|------|------|
| 数据库名称 | PasswordGeneratorDB |
| 版本号 | 1 |
| 对象仓库 | passwordHistory |
| 主键 | id (自增) |
| 索引 | createdAt (时间戳) |

**密码记录结构**

```javascript
{
  id: number,              // 自增主键
  password: string,        // 生成的密码
  length: number,          // 密码长度
  includeLowercase: boolean,
  includeUppercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean,
  customSymbols: string,   // 自定义符号
  excludeChars: string,    // 排除字符
  createdAt: number        // 生成时间戳
}
```

---

## 开发指南

### 环境要求

- Node.js >= 16
- npm >= 8

### 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 开发服务器

启动后访问：
- 弹出页：`http://localhost:5173/popup.html`
- 选项页：`http://localhost:5173/options.html`

支持局域网 IP 访问，便于移动设备测试。

---

## 浏览器兼容性

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 88+ |
| Edge | 88+ |
| Brave | 1.20+ |
| Opera | 74+ |

---

## 版本历史

### v1.0.0

- 初始版本发布
- 密码生成器核心功能
- 批量生成支持
- 历史记录管理
- 数据导出功能
- 深色模式 UI

---

## 许可证

MIT License

---

## 贡献

欢迎提交 Issue 和 Pull Request！
