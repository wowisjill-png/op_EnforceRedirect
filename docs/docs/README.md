# Enforce Redirect - 域名重新導向管理

一個用於管理域名重新導向的靜態網頁應用程式。

## 功能特色

- ✅ 域名重新導向管理
- ✅ 即時切換存取權限（Allow/NotAllow）
- ✅ URL 驗證和更新功能
- ✅ 自動儲存資料到瀏覽器 localStorage
- ✅ 響應式設計，支援各種螢幕尺寸
- ✅ 純前端實現，無需後端服務

## 線上展示

您可以直接在 GitHub Pages 上查看展示：`https://your-username.github.io/op_EnforceRedirect`

## 本地運行

1. 下載或 clone 此專案
2. 直接開啟 `index.html` 檔案在瀏覽器中

## 部署到 GitHub Pages

### 方法一：透過 GitHub 網頁界面

1. 建立新的 GitHub repository
2. 上傳以下檔案到 repository：
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`

3. 在 repository 設定中：
   - 進入 **Settings** > **Pages**
   - 在 **Source** 選擇 **Deploy from a branch**
   - 選擇 **main** branch
   - 點擊 **Save**

4. 幾分鐘後，您的網站將在 `https://your-username.github.io/repository-name` 可用

### 方法二：使用 Git 命令

```bash
# 1. 建立新 repository 並 clone
git clone https://github.com/your-username/op_EnforceRedirect.git
cd op_EnforceRedirect

# 2. 複製檔案到專案目錄
# 將 index.html, style.css, script.js 複製到此目錄

# 3. 提交並推送
git add .
git commit -m "Initial commit: Enforce Redirect system"
git push origin main

# 4. 在 GitHub 啟用 Pages（如上述方法一步驟3-4）
```

## 檔案結構

```
op_EnforceRedirect/
├── index.html          # 主頁面
├── style.css           # 樣式檔案
├── script.js           # JavaScript 功能
└── README.md           # 說明文件
```

## 技術說明

- **純 HTML/CSS/JavaScript**：無需任何框架或後端服務
- **localStorage**：資料儲存在瀏覽器本地
- **響應式設計**：使用 CSS Grid 和 Flexbox
- **即時更新**：所有操作即時生效並儲存

## 使用說明

1. **刷新資料**：點擊右上角的 "refresh" 按鈕
2. **切換存取權限**：點擊 "Allow" 或 "NotAllow" 按鈕
3. **更新重新導向 URL**：
   - 在 "REDIRECT URL" 欄位輸入新的 URL
   - 點擊 "Update" 按鈕進行驗證和更新
4. **查看狀態**：更新成功會顯示 "Update successful"，失敗會顯示 "Update failed"

## 瀏覽器支援

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 授權

MIT License

## 更新日誌

- **v1.0.0** (2025-12-16)
  - 初始版本發布
  - 完整的域名重新導向管理功能
  - GitHub Pages 支援