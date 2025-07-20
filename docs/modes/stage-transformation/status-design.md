# 狀態系統設計文檔

## 概述

狀態系統是階段蛻變模式的核心機制，通過根據玩家在每個階段的表現給予持續性狀態，影響後續的遊戲體驗。

## 設計理念

### 核心原則

1. **表現驅動**: 狀態獲得完全基於玩家在該階段的實際表現
2. **持續影響**: 狀態會持續影響下一個階段的所有選擇
3. **平衡性**: 正面和負面狀態的獲得條件和效果要平衡
4. **策略性**: 玩家需要考慮當前選擇對下個階段的影響

### 狀態類型

#### 負面狀態

- **內耗**: 心情持續-1
- **疲憊**: 體力消耗加倍
- **焦慮**: 決斷力下降
- **社交恐懼**: 社交選項效果減弱

#### 正面狀態

- **神采奕奕**: 心情持續+1
- **陽光**: 社交選項效果增強
- **專注**: 專注力相關選項效果增強
- **穩健**: 穩定性相關選項效果增強

## 狀態獲得條件

### 負面狀態獲得條件

#### 內耗 (Burnout)

- **觸發條件**: 階段內平均心情 < 30
- **效果**: 所有選項的心情變化 -1
- **持續時間**: 1 個階段
- **描述**: "你感到精神疲憊，對任何事情都提不起勁"

#### 疲憊 (Exhausted)

- **觸發條件**: 階段內平均體力 < 25
- **效果**: 所有選項的體力消耗 ×1.5
- **持續時間**: 1 個階段
- **描述**: "身體感到極度疲憊，需要更多休息"

#### 焦慮 (Anxious)

- **觸發條件**: 階段內決斷力變化 < -2
- **效果**: 決斷力相關選項效果減弱 50%
- **持續時間**: 1 個階段
- **描述**: "你變得猶豫不決，難以做出決定"

#### 社交恐懼 (Social Anxiety)

- **觸發條件**: 階段內社交傾向變化 < -3
- **效果**: 社交選項的效果減弱 30%
- **持續時間**: 1 個階段
- **描述**: "你對社交互動感到緊張和不安"

### 正面狀態獲得條件

#### 神采奕奕 (Energetic)

- **觸發條件**: 階段內平均心情 > 70
- **效果**: 所有選項的心情變化 +1
- **持續時間**: 1 個階段
- **描述**: "你感到精神飽滿，充滿活力"

#### 陽光 (Sunny)

- **觸發條件**: 階段內社交傾向變化 > 3
- **效果**: 社交選項的效果增強 30%
- **持續時間**: 1 個階段
- **描述**: "你變得更加開朗，樂於與人交流"

#### 專注 (Focused)

- **觸發條件**: 階段內專注力變化 > 2
- **效果**: 專注力相關選項效果增強 50%
- **持續時間**: 1 個階段
- **描述**: "你的注意力更加集中，做事更有效率"

#### 穩健 (Stable)

- **觸發條件**: 階段內穩定性變化 > 2
- **效果**: 穩定性相關選項效果增強 50%
- **持續時間**: 1 個階段
- **描述**: "你的情緒更加穩定，不易受到外界影響"

## 技術實現

### 狀態數據結構

```typescript
interface PlayerStatus {
  id: string; // 狀態ID
  name: string; // 狀態名稱
  description: string; // 狀態描述
  effects: StatusEffect[]; // 狀態效果
  duration: number; // 持續階段數 (-1表示永久)
  gainedAt: number; // 獲得時間戳
}

interface StatusEffect {
  type: "stat_modifier" | "option_modifier" | "restore_modifier";
  target: keyof PlayerStats | "all_options" | "social_options";
  value: number;
  condition?: string; // 可選的觸發條件
}
```

### 狀態計算邏輯

```typescript
function calculateStageStatus(
  stageEvents: EventResult[],
  currentStats: PlayerStats
): PlayerStatus[] {
  const statuses: PlayerStatus[] = [];

  // 計算階段統計
  const averageStats = calculateAverageStats(stageEvents);

  // 檢查負面狀態
  if (averageStats.心情 < 30) {
    statuses.push(createBurnoutStatus());
  }

  if (averageStats.體力 < 25) {
    statuses.push(createExhaustedStatus());
  }

  // 檢查正面狀態
  if (averageStats.心情 > 70) {
    statuses.push(createEnergeticStatus());
  }

  return statuses;
}
```

### 狀態效果應用

```typescript
function applyStatusEffects(
  optionStats: Partial<PlayerStats>,
  activeStatuses: PlayerStatus[]
): Partial<PlayerStats> {
  let modifiedStats = { ...optionStats };

  activeStatuses.forEach((status) => {
    status.effects.forEach((effect) => {
      switch (effect.type) {
        case "stat_modifier":
          if (effect.target in modifiedStats) {
            modifiedStats[effect.target] += effect.value;
          }
          break;
        case "option_modifier":
          // 根據狀態類型調整選項效果
          break;
      }
    });
  });

  return modifiedStats;
}
```

## 狀態管理

### 狀態生命週期

1. **獲得**: 階段評估時根據表現獲得
2. **持續**: 在下一個階段的所有選項中生效
3. **更新**: 每個階段結束時重新評估
4. **移除**: 持續時間結束後自動移除

### 狀態疊加規則

- 同類型狀態不會疊加，只保留最新的
- 正面和負面狀態可以同時存在
- 狀態效果按順序應用

### 狀態衝突處理

- 如果獲得衝突狀態，優先保留影響更大的
- 狀態效果衝突時，後獲得的狀態優先

## UI 設計

### 狀態顯示

- 在遊戲 header 中顯示當前活躍狀態
- 使用圖標和顏色區分不同狀態
- 顯示狀態剩餘持續時間

### 狀態效果提示

- 在選項中顯示狀態效果的影響
- 使用不同顏色標示正面和負面影響
- 提供狀態效果的詳細說明

## 平衡性考慮

### 獲得條件平衡

- 負面狀態的觸發條件要合理，不會過於容易獲得
- 正面狀態的觸發條件要有挑戰性，但不會太難
- 確保玩家有機會通過努力獲得正面狀態

### 效果強度平衡

- 狀態效果不能過於強烈，避免破壞遊戲平衡
- 負面狀態的效果要給玩家改進的動力
- 正面狀態的效果要讓玩家感到有價值

### 持續時間平衡

- 狀態持續時間要適中，既不會太短失去意義，也不會太長影響遊戲體驗
- 考慮狀態疊加的可能性，避免過度懲罰

## 測試計劃

### 功能測試

1. 狀態獲得條件測試
2. 狀態效果應用測試
3. 狀態疊加和衝突測試
4. 狀態生命週期測試

### 平衡性測試

1. 狀態獲得頻率測試
2. 狀態效果強度測試
3. 玩家體驗測試
4. 遊戲難度測試

### 用戶體驗測試

1. 狀態顯示清晰度測試
2. 狀態效果理解度測試
3. 狀態系統學習曲線測試
