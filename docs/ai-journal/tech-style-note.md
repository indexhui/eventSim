# 技術線習慣與專案風格筆記

## 元件設計

- 優先抽出共用元件，props 彈性設計
- 命名以語意為主，區分 UI/功能/動畫
- 動畫元件建議用 MotionBox 包裝 Chakra Box

## 動畫與互動

- 動畫用 framer-motion，與 Chakra UI 結合
- useScroll/useTransform 控制進度，whileInView 控制進場
- 背景滑動用 bgImage + backgroundPositionX
- 動畫觸發時機用 offset/amount 微調

## UI/Style

- 色彩、圓角、陰影、間距等統一用 Chakra props
- 背景圖建議放 public/images，路徑用 /images/xxx
- 響應式設計用 Chakra 的 { base, md, lg } props

## 事件系統

### 事件創建流程

1. **定義事件**：在對應的事件文件中添加事件定義
2. **更新數組**：將事件添加到導出數組中
3. **更新導入**：如果有專門的導入文件，需要更新導入列表
4. **添加場景**：在 scene-manager.ts 中添加場景配置

### 常見錯誤

- **事件不顯示**：檢查是否正確導出和導入
- **場景圖片不顯示**：檢查場景配置和圖片路徑
- **TypeScript 錯誤**：檢查事件結構和類型定義

### 文件架構

```
src/data/events/
├── constants.ts          # 事件常數和類型定義
├── event-manager.ts      # 事件管理器（主要導出）
├── work.ts              # 工作事件（直接導出數組）
├── daily-life.ts        # 生活事件（直接導出數組）
├── social.ts            # 社交事件（直接導出數組）
├── shopping.ts          # 購物事件（直接導出數組）
├── health.ts            # 健康事件（直接導出數組）
├── commute-events.ts    # 通勤事件定義
└── commute.ts           # 通勤事件導入和重新導出
```

## 其他

- 日誌、筆記放 docs/ai-journal，方便團隊知識傳承
- commit 訊息以 feat/fix/chore/ci 為前綴，簡明描述內容
- 新增事件時參考 `docs/ai-journal/event-creation-sop.md`

---

本筆記供團隊成員參考與維護，歡迎補充！
