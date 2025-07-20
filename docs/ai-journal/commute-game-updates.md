# 走走小日模擬器開發日誌

## 2024-12-19 - 遊戲模式實驗

### 階段蛻變模式開發

- 新增階段蛻變遊戲模式，每 5 個事件為一個階段
- 實現階段評估系統，包含統計數據和建議
- 添加玩家狀態系統設計（待實現）
- 創建階段評估 UI 組件

### 技術實現

- 擴展 GameContext 支持多種遊戲模式
- 新增 StageEvaluationScreen 組件
- 實現階段計算和統計邏輯
- 添加狀態系統類型定義

## 2025-07-21 - 分支合併與架構整合

### 主要任務：合併 main 分支與階段系統

**時間**: 2025-07-21 深夜  
**目標**: 以 main 分支架構為主要方向，整合動物系統和階段系統

### 合併策略

1. **以 main 分支為主要方向**

   - 保持 main 的架構和 lint 規範
   - 使用 `STAT_LIMITS` 常數進行屬性限制
   - 維持 `let updatedState` 的狀態更新模式
   - 保持人格標籤的範圍格式 (如 "-10~-4", "1~3")

2. **支持三種遊戲模式**
   - **無限模式** (`infinite`): 純事件模式，無動物系統
   - **無限混動物模式** (`infinite-animal`): 包含完整的動物收集系統
   - **階段蛻變模式** (`stage`): 階段性評估和狀態系統，無動物

### 技術實現細節

#### 類型系統整合

- 擴展 `GameMode` 類型為 `"infinite" | "infinite-animal" | "stage"`
- 在 `GameState` 中同時包含動物收集和階段系統狀態
- 保持 main 分支的人格標籤定義格式

#### Context 架構整合

- 合併動物系統和階段系統的 action 類型
- 根據遊戲模式選擇不同的事件生成邏輯
- 動物邏輯只在 `infinite-animal` 模式下執行
- 階段邏輯只在 `stage` 模式下執行

#### UI 整合

- 在遊戲開始畫面添加三種模式選擇按鈕
- 動物收集系統只在動物模式下顯示
- 階段信息在階段模式下顯示在 header 中

### 遇到的問題與解決

#### 1. 無限遞迴錯誤

**問題**: `checkRestRequired` 和 `checkMoneyRequired` 函數調用自己

```
Error: Maximum call stack size exceeded
src/contexts/GameContext.tsx (611:5) @ checkRestRequired
```

**解決**: 將遞迴調用改為直接返回邏輯結果

```typescript
// 修復前
const checkRestRequired = (stats: PlayerStats) => {
  return checkRestRequired(stats); // 無限遞迴
};

// 修復後
const checkRestRequired = (stats: PlayerStats) => {
  return stats.心情 <= 0 || stats.體力 <= 0;
};
```

#### 2. TypeScript 類型錯誤

**問題**: `StageEvaluationScreen.tsx` 使用 `any` 類型

```
Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
```

**解決**: 改為使用正確的類型並導入必要的類型

```typescript
// 修復前
function generateRecommendations(averageStats: any): string[];

// 修復後
import { StageResult, PlayerStatus, PlayerStats } from '../../../types/game';
function generateRecommendations(averageStats: Partial<PlayerStats>): string[];
```

### 合併結果

- ✅ 成功合併 main 分支的動物系統
- ✅ 保持 main 分支的架構和程式碼風格
- ✅ 添加階段蛻變模式功能
- ✅ 修復所有編譯錯誤和 lint 問題
- ✅ 支持三種遊戲模式的完整功能

### 下一步計劃

1. 實現狀態獲得邏輯（基於階段表現）
2. 實現狀態效果對遊戲的影響
3. 在階段轉換時實現體力恢復和選項體力消耗調整
4. 實現活躍狀態的 UI 顯示
5. 繼續測試和平衡新模式的遊戲體驗

### 技術債務

- 需要完善狀態系統的實現
- 可能需要優化階段評估的性能
- 考慮添加更多遊戲模式的擴展性設計
