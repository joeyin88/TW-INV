# TW-INV — 台灣電子發票系統原型

此專案提供一個以 TypeScript/Express 打造的電子發票系統原型，涵蓋公司帳戶管理、發票開立、載具管理與發票驗證等核心 API。所有資料目前儲存在記憶體中，方便快速原型與未來導入資料庫時的單元測試。

## 功能概覽

- **帳戶管理**：建立公司帳戶與角色資訊。
- **發票管理**：建立、查詢與取得發票明細。
- **載具管理**：新增常用載具型別（手機條碼、自然人憑證等）。
- **發票驗證**：依照發票號碼與隨機碼進行驗證（以尾碼比對模擬）。
- **健康檢查**：`GET /health` 提供監控整合用。

## 專案結構

```
src/
├── app.ts                     # Express 應用程式設定
├── index.ts                   # 進入點，啟動 HTTP 服務
├── config/
│   └── env.ts                 # 環境參數解析
├── lib/
│   └── identifiers.ts         # 識別碼產生工具
└── modules/
    ├── accounts/              # 帳戶領域模組
    └── invoices/              # 發票與載具領域模組
```

## 安裝與執行

```bash
npm install
npm run dev
```

伺服器預設在 `http://localhost:3000` 啟動，可透過 `PORT` 調整。

## 測試

```bash
npm test
```

Vitest 將執行單元測試並產生覆蓋率報告。

## 後續規劃

- 導入資料庫（PostgreSQL）與 ORM（Prisma）以持久化資料。
- 實作財政部電子發票平台 API 封裝與錯誤重試流程。
- 加入 OAuth2 / OpenID Connect 的帳號與權限管理。
- 建立前端管理介面與 CI/CD 流程。
