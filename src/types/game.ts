// 玩家屬性介面
export interface PlayerStats {
  心情: number;
  儲蓄: number;
  體力: number;
  專注力: number;
  時間感: number;
  社交傾向: number;
  決斷力: number;
  好奇心: number;
  同理心: number;
  穩定性: number;
}

// 數值限制常數
export const STAT_LIMITS = {
  心情: { min: 0, max: 100 },
  體力: { min: 0, max: 100 },
  儲蓄: { min: 0, max: 9999 },
} as const;

// 事件選項介面
export interface EventOption {
  text: string;
  statChanges: Partial<PlayerStats>;
  conditions?: EventCondition[];
  consequences?: string[]; // 選擇後的後果描述
}

// 事件條件介面
export interface EventCondition {
  stat: keyof PlayerStats;
  operator: "gte" | "lte" | "eq" | "gt" | "lt";
  value: number;
}

// 事件介面
export interface Event {
  id: string;
  name: string;
  description: string;
  category?: string;
  difficulty?: string;
  tags?: string[];
  options: {
    [key: string]: EventOption;
  };
}

// 擴展的事件介面（用於新的事件系統）
export interface ExtendedEvent {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  tags?: string[];
  animalEncounter?: AnimalEncounter; // 動物遭遇
  options: {
    [key: string]: {
      text: string;
      statChanges: Record<string, number>;
      conditions?: Array<{
        stat: string;
        operator: "gte" | "lte" | "eq" | "gt" | "lt";
        value: number;
      }>;
      consequences?: string[];
      animalCollection?: boolean; // 此選項是否會收集動物
      preventAnimalLeave?: boolean; // 此選項是否阻止動物離開
    };
  };
}

// 事件結果介面
export interface EventResult {
  eventId: string;
  selectedOption: string;
  timestamp: number;
  statChanges: Partial<PlayerStats>;
}

// 動物相關介面
export interface Animal {
  id: string;
  name: string;
  species: 'cat' | 'dog' | 'bird' | 'rabbit' | 'hamster' | 'squirrel' | 'duck' | 'hedgehog' | 'turtle' | 'fish' | 'butterfly' | 'mouse';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  description: string;
  icon: string; // emoji or icon representation
  unlockCondition?: {
    stat?: keyof PlayerStats;
    value?: number;
    operator?: "gte" | "lte" | "eq" | "gt" | "lt";
    eventId?: string;
    personalityRange?: { trait: keyof PlayerStats; min: number; max: number }[];
  };
  personalityAffinity?: { // 性格特質會影響動物的親近度
    trait: keyof PlayerStats;
    idealValue: number; // 理想的特質值
    tolerance: number; // 容忍範圍
  }[];
  dateCollected?: number;
}

// 動物收集狀態
export interface AnimalCollectionState {
  collectedAnimals: Animal[];
  animalEncounters: Record<string, number>; // 記錄遇見次數
  pendingAnimalRisk?: { // 當前有離開風險的動物
    animalId: string;
    reason: string;
    eventId: string;
  };
}

// 擴展事件以支援動物遭遇
export interface AnimalEncounter {
  animalId: string;
  encounterType: 'sighting' | 'interaction' | 'rescue' | 'threat'; // threat = 動物可能離開
  collectionChance?: number; // 0-100 收集機率
  leaveCondition?: { // 離開條件（用於威脅事件）
    trait: keyof PlayerStats;
    threshold: number;
    operator: "gte" | "lte";
  };
}

// 人格標籤介面
export interface PersonalityLabels {
  [trait: string]: {
    [range: string]: string;
  };
}

// 遊戲狀態介面
export interface GameState {
  playerStats: PlayerStats;
  currentEvent: ExtendedEvent | null;
  eventHistory: EventResult[];
  gameProgress: number;
  personalityLabels: PersonalityLabels;
  isGameStarted: boolean;
  isResting: boolean; // 是否正在休息
  restDays: number; // 休息天數
  currentConsequence: string | null; // 當前選擇的後果
  isShowingConsequence: boolean; // 是否正在顯示後果
  animalCollection: AnimalCollectionState; // 動物收集狀態
}

// 初始玩家屬性
export const initialPlayerStats: PlayerStats = {
  心情: 60,
  儲蓄: 1000,
  體力: 70,
  專注力: 0,
  時間感: 0,
  社交傾向: 0,
  決斷力: 0,
  好奇心: 0,
  同理心: 0,
  穩定性: 0,
};

// 人格標籤資料
export const personalityLabels: PersonalityLabels = {
  專注力: {
    "-10~-4": "心不在焉",
    "-3~-1": "略分心",
    "0": "中等",
    "1~3": "專注傾向",
    "4~10": "極度專注",
  },
  時間感: {
    "-10~4": "迷糊拖延",
    "5~10": "稍微緊湊",
    "11~17": "有節奏感",
    "18~24": "時間掌控強",
  },
  社交傾向: {
    "-10~-4": "明顯內向",
    "-3~-1": "偏內向",
    "0": "中性",
    "1~3": "偏外向",
    "4~10": "明顯外向",
  },
  決斷力: {
    "-10~-4": "優柔寡斷",
    "-3~-1": "猶豫",
    "0": "中性",
    "1~3": "果斷傾向",
    "4~10": "領導型",
  },
  好奇心: {
    "-10~-4": "抗拒新事物",
    "-3~-1": "保守",
    "0": "中性",
    "1~3": "好奇傾向",
    "4~10": "探索者",
  },
  同理心: {
    "-10~-4": "冷感",
    "-3~-1": "低共感",
    "0": "中性",
    "1~3": "感受力",
    "4~10": "情感敏銳",
  },
  穩定性: {
    "-10~-4": "情緒起伏劇烈",
    "-3~-1": "易受影響",
    "0": "中性",
    "1~3": "穩定傾向",
    "4~10": "冷靜沉著",
  },
};

// 示例事件資料（保留用於向後兼容）
export const sampleEvents: Event[] = [
  {
    id: "EVT001",
    name: "便利商店耳機男",
    description: "排隊時前面的男生戴著耳機，結帳叫了他好幾次都沒反應。",
    options: {
      A: {
        text: "拍拍他提醒一下。",
        statChanges: {
          心情: -2,
          體力: -1,
          決斷力: 1,
          同理心: 1,
        },
      },
      B: {
        text: "默默等店員自己處理。",
        statChanges: {
          心情: -1,
          體力: 0,
          穩定性: 1,
          社交傾向: -1,
        },
      },
    },
  },
  {
    id: "EVT002",
    name: "同事的生日派對",
    description: "同事邀請你參加他的生日派對，但你今天很累。",
    options: {
      A: {
        text: "參加派對，社交一下。",
        statChanges: {
          心情: 3,
          體力: -5,
          社交傾向: 2,
          同理心: 1,
        },
      },
      B: {
        text: "婉拒，回家休息。",
        statChanges: {
          心情: 1,
          體力: 3,
          穩定性: 1,
          社交傾向: -1,
        },
      },
    },
  },
];
