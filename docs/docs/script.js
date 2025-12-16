// Enforce Redirect - JavaScript 功能

class EnforceRedirectManager {
    constructor() {
        this.data = this.loadData();
        this.init();
    }

    // 初始化
    init() {
        this.bindEvents();
        this.renderTable();
    }

    // 綁定事件
    bindEvents() {
        // refresh 按鈕
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });
    }

    // 載入初始資料
    loadData() {
        const savedData = localStorage.getItem('enforceRedirectData');
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        // 預設資料（根據圖片）
        return [
            {
                id: 1,
                domain: 'auat.gsiltslcs.live',
                allowSite: 'Bavet(0)',
                allowAccess: 'Allow',
                redirectUrl: 'https://www.google.com',
                updator: 'jilltest',
                updateDate: '16/12/2025 11:48:45'
            },
            {
                id: 2,
                domain: 'auat.mxtntslcs.live',
                allowSite: 'Mexico(10)',
                allowAccess: 'Allow',
                redirectUrl: 'https://www.google.com',
                updator: 'tony',
                updateDate: '26/04/2022 15:25:19'
            },
            {
                id: 3,
                domain: 'auat.afcktslcs.live',
                allowSite: 'Africa(20)',
                allowAccess: 'Allow',
                redirectUrl: 'https://www.google.com',
                updator: 'tony',
                updateDate: '26/04/2022 16:30:07'
            },
            {
                id: 4,
                domain: 'auat.askatslcs.live',
                allowSite: 'Asia(40)',
                allowAccess: 'NotAllow',
                redirectUrl: 'https://www.google.com',
                updator: 'tony',
                updateDate: '16/11/2022 17:31:29'
            },
            {
                id: 5,
                domain: 'alive.cbtntslcs.live',
                allowSite: 'Cebu(70)',
                allowAccess: 'Allow',
                redirectUrl: 'https://www.google.com',
                updator: 'tony',
                updateDate: '28/05/2024 16:46:29'
            },
            {
                id: 6,
                domain: 'auat.cbtntslcs.live',
                allowSite: 'Cebu(70)',
                allowAccess: 'Allow',
                redirectUrl: 'https://www.google.com',
                updator: 'tony',
                updateDate: '22/05/2024 17:50:32'
            },
            {
                id: 7,
                domain: 'auat.by288bv.com',
                allowSite: 'TechSupport(100)',
                allowAccess: 'Allow',
                redirectUrl: 'https://www.google.com',
                updator: 'tony',
                updateDate: '11/05/2022 14:48:39'
            }
        ];
    }

    // 儲存資料
    saveData() {
        localStorage.setItem('enforceRedirectData', JSON.stringify(this.data));
    }

    // 刷新資料
    refreshData() {
        this.showMessage('正在刷新資料...', 'info');
        
        // 模擬API請求延遲，並更新一些示範資料
        setTimeout(() => {
            // 為展示目的，隨機更新一些時間戳
            const currentTime = this.getCurrentDateTime();
            if (this.data.length > 0) {
                this.data[0].updateDate = currentTime;
                this.data[0].updator = 'github_demo';
                this.saveData();
            }
            
            this.renderTable();
            this.showMessage('資料已更新 - GitHub Pages 展示', 'success');
        }, 500);
    }

    // 渲染表格
    renderTable() {
        const tbody = document.getElementById('enforceTableBody');
        tbody.innerHTML = '';

        this.data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.domain}</td>
                <td>${item.allowSite}</td>
                <td>
                    <button class="${item.allowAccess === 'Allow' ? 'allow-btn' : 'not-allow-btn'}" 
                            onclick="enforceManager.toggleAccess(${item.id})">
                        ${item.allowAccess}
                    </button>
                </td>
                <td>
                    <input type="url" class="redirect-input" 
                           value="${item.redirectUrl}" 
                           onchange="enforceManager.updateRedirectUrl(${item.id}, this.value)">
                </td>
                <td>
                    <button class="update-btn" onclick="enforceManager.updateRedirect(${item.id})">
                        Update
                    </button>
                    <div id="status-${item.id}" class="status-message" style="display: none;"></div>
                </td>
                <td>${item.updator}</td>
                <td>${item.updateDate}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // 切換存取權限
    toggleAccess(id) {
        const item = this.data.find(d => d.id === id);
        if (item) {
            item.allowAccess = item.allowAccess === 'Allow' ? 'NotAllow' : 'Allow';
            item.updateDate = this.getCurrentDateTime();
            item.updator = 'current_user'; // 可以改為實際登入用戶
            
            this.saveData();
            this.renderTable();
            this.showMessage(`存取權限已更新為 ${item.allowAccess}`, 'success');
        }
    }

    // 更新 redirect URL（輸入時即時更新）
    updateRedirectUrl(id, newUrl) {
        const item = this.data.find(d => d.id === id);
        if (item) {
            item.redirectUrl = newUrl;
            this.saveData();
        }
    }

    // 更新 redirect（點擊 Update 按鈕）
    async updateRedirect(id) {
        const item = this.data.find(d => d.id === id);
        const statusDiv = document.getElementById(`status-${id}`);
        
        if (!item) return;

        // 顯示載入狀態
        statusDiv.style.display = 'block';
        statusDiv.className = 'status-message';
        statusDiv.textContent = 'Updating...';

        try {
            // 驗證 URL 是否存在
            const urlExists = await this.validateUrl(item.redirectUrl);
            
            if (urlExists) {
                // 更新成功
                item.updateDate = this.getCurrentDateTime();
                item.updator = 'current_user'; // 可以改為實際登入用戶
                this.saveData();
                
                statusDiv.className = 'status-message status-success';
                statusDiv.textContent = 'Update successful';
                
                // 更新表格中的日期
                setTimeout(() => {
                    this.renderTable();
                }, 1000);
            } else {
                // 更新失敗
                statusDiv.className = 'status-message status-error';
                statusDiv.textContent = 'Update failed';
            }
        } catch (error) {
            // 發生錯誤
            statusDiv.className = 'status-message status-error';
            statusDiv.textContent = 'Update failed';
        }

        // 3秒後隱藏狀態訊息
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }

    // 驗證 URL 是否存在
    async validateUrl(url) {
        try {
            // 檢查 URL 格式
            const urlObj = new URL(url);
            
            // 模擬網路檢查（實際情況下可能需要後端API）
            // 這裡我們假設 google.com 總是存在，其他隨機決定
            if (url.includes('google.com')) {
                return true;
            }
            
            // 模擬隨機成功/失敗（70%成功率）
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(Math.random() > 0.3);
                }, 1000 + Math.random() * 1000); // 1-2秒延遲
            });
            
        } catch (error) {
            return false;
        }
    }

    // 取得當前日期時間
    getCurrentDateTime() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    // 顯示訊息
    showMessage(message, type = 'info') {
        // 移除現有的訊息
        const existingMessage = document.querySelector('.global-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // 創建新訊息
        const messageDiv = document.createElement('div');
        messageDiv.className = `global-message ${type}`;
        messageDiv.textContent = message;
        
        // 設定樣式
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;

        // 設定顏色
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#007bff',
            warning: '#ffc107'
        };
        messageDiv.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(messageDiv);

        // 3秒後自動移除
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// 初始化
let enforceManager;
document.addEventListener('DOMContentLoaded', () => {
    enforceManager = new EnforceRedirectManager();
});

// 全域函數
window.enforceManager = null;
document.addEventListener('DOMContentLoaded', () => {
    window.enforceManager = new EnforceRedirectManager();
});