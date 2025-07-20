// 事件分類
export const EVENT_CATEGORIES = {
  DAILY_LIFE: "daily-life",
  WORK: "work",
  SOCIAL: "social",
  SHOPPING: "shopping",
  HEALTH: "health",
  COMMUTE: "commute",
} as const;

// 事件難度等級
export const EVENT_DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
} as const;

// 事件觸發條件
export interface EventTrigger {
  minProgress?: number; // 最小遊戲進度
  maxProgress?: number; // 最大遊戲進度
  requiredStats?: Partial<Record<string, number>>; // 需要的屬性值
  excludedStats?: Partial<Record<string, number>>; // 排除的屬性值
  timeOfDay?: "morning" | "afternoon" | "evening" | "night"; // 時間段
  weather?: "sunny" | "rainy" | "cloudy"; // 天氣條件
}

// 擴展的事件介面
export interface ExtendedEvent {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  triggers?: EventTrigger;
  options: {
    [key: string]: {
      text: string;
      statChanges: Record<string, number>;
      conditions?: Array<{
        stat: string;
        operator: "gte" | "lte" | "eq" | "gt" | "lt";
        value: number;
      }>;
      consequences?: string[]; // 選擇後的後果描述
    };
  };
  tags?: string[]; // 事件標籤，用於分類和搜尋
}
