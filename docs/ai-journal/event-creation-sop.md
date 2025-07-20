# 事件創建標準作業程序 (SOP)

## 錯誤案例記錄

### 問題描述

新增電扶梯事件 `COMMUTE027` 和 `COMMUTE028` 後，在遊戲中看不到新事件。

### 錯誤原因分析

1. **事件定義不完整**：在 `commute-events.ts` 中定義了事件，但沒有導出 `commuteEvents` 數組
2. **導入鏈斷裂**：`commute.ts` 文件沒有導入新事件
3. **架構不一致**：不同事件文件的導出方式不一致

### 根本原因

- `commute-events.ts` 文件只定義了單個事件，沒有導出事件數組
- `commute.ts` 文件負責從 `commute-events.ts` 導入事件並重新導出
- 新增事件時忘記更新 `commute.ts` 的導入列表

## 標準作業程序 (SOP)

### 1. 新增事件前的準備

- [ ] 確認事件類型（通勤、工作、生活等）
- [ ] 確認事件文件結構
- [ ] 檢查是否有對應的場景配置

### 2. 新增事件的步驟

#### 步驟 1：定義事件

```typescript
// 在對應的事件文件中添加事件定義
export const EVENT_ID: ExtendedEvent = {
  id: "EVENT_ID",
  name: "事件名稱",
  description: "事件描述",
  category: EVENT_CATEGORIES.CATEGORY,
  difficulty: EVENT_DIFFICULTY.LEVEL,
  tags: ["標籤1", "標籤2"],
  options: {
    A: {
      text: "選項A",
      statChanges: {
        /* 屬性變化 */
      },
      consequences: ["後果描述"],
    },
    // ... 其他選項
  },
};
```

#### 步驟 2：更新事件數組（如果適用）

```typescript
// 如果事件文件直接導出數組，需要更新數組
export const categoryEvents: ExtendedEvent[] = [
  // ... 現有事件
  NEW_EVENT_ID, // 添加新事件
];
```

#### 步驟 3：更新導入文件（如果適用）

```typescript
// 如果有專門的導入文件（如 commute.ts），需要更新
import {
  // ... 現有導入
  NEW_EVENT_ID, // 添加新導入
} from "./event-file";

export const categoryEvents = [
  // ... 現有事件
  NEW_EVENT_ID, // 添加到數組
];
```

#### 步驟 4：添加場景配置

```typescript
// 在 scene-manager.ts 中添加場景配置
EVENT_ID: {
  id: "EVENT_ID",
  name: "事件名稱",
  description: "場景描述",
  imagePath: "/assets/scenes/path/to/image.jpg",
  category: EVENT_CATEGORIES.CATEGORY,
},
```

### 3. 驗證步驟

- [ ] 檢查 TypeScript 編譯是否通過
- [ ] 檢查 ESLint 是否有錯誤
- [ ] 在遊戲中測試事件是否出現
- [ ] 確認事件選項和後果是否正確
- [ ] 確認場景圖片是否正確顯示

### 4. 文件結構說明

#### 事件文件架構

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

#### 場景文件架構

```
src/data/scenes/
└── scene-manager.ts     # 場景配置和映射
```

### 5. 常見錯誤和解決方案

#### 錯誤 1：事件在遊戲中不顯示

**原因**：事件沒有正確導出或導入
**解決方案**：

1. 檢查事件是否添加到對應的數組中
2. 檢查導入文件是否更新
3. 確認 `event-manager.ts` 中的 `allEvents` 包含新事件

#### 錯誤 2：場景圖片不顯示

**原因**：場景配置缺失或圖片路徑錯誤
**解決方案**：

1. 在 `scene-manager.ts` 中添加場景配置
2. 確認圖片文件存在於正確路徑
3. 檢查圖片路徑是否正確

#### 錯誤 3：TypeScript 編譯錯誤

**原因**：類型不匹配或語法錯誤
**解決方案**：

1. 檢查事件結構是否符合 `ExtendedEvent` 類型
2. 確認所有必需的屬性都已定義
3. 檢查選項和後果的格式是否正確

### 6. 最佳實踐

#### 命名規範

- 事件 ID：使用大寫字母和數字（如 `COMMUTE027`）
- 事件名稱：使用中文描述性名稱
- 文件命名：使用 kebab-case（如 `commute-events.ts`）

#### 代碼組織

- 相關事件放在同一個文件中
- 使用註釋分隔不同類型的事件
- 保持一致的縮進和格式

#### 測試建議

- 每次添加事件後立即測試
- 使用事件列表頁面驗證事件是否正確顯示
- 測試所有選項和後果是否正常工作

### 7. 檢查清單

新增事件時的完整檢查清單：

- [ ] 事件定義完整且正確
- [ ] 事件添加到對應的數組中
- [ ] 導入文件已更新（如果適用）
- [ ] 場景配置已添加
- [ ] TypeScript 編譯通過
- [ ] ESLint 檢查通過
- [ ] 遊戲中事件正常顯示
- [ ] 事件選項和後果正常運作
- [ ] 場景圖片正確顯示

---

**最後更新**：2024-12-19
**更新原因**：新增電扶梯事件時的錯誤經驗總結
