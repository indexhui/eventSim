import { EVENT_CATEGORIES } from "../events/constants";

// 場景背景配置
export interface SceneConfig {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  category: string;
}

// 場景背景映射表
export const SCENE_MAPPINGS: Record<string, SceneConfig> = {
  // 通勤場景
  COMMUTE001: {
    id: "COMMUTE001",
    name: "出門前的猶豫",
    description: "客廳",
    imagePath: "/assets/scenes/daily-life/living-room.png",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE002: {
    id: "COMMUTE002",
    name: "早餐的選擇",
    description: "廚房",
    imagePath: "/assets/scenes/daily-life/kitchen.png",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE003: {
    id: "COMMUTE003",
    name: "地鐵搭訕",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE004: {
    id: "COMMUTE004",
    name: "電扶梯爭議",
    description: "電扶梯",
    imagePath: "/assets/scenes/commute/escalator.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE005: {
    id: "COMMUTE005",
    name: "同事順風車",
    description: "公車內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE006: {
    id: "COMMUTE006",
    name: "捷運手機聲",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE007: {
    id: "COMMUTE007",
    name: "月台插隊",
    description: "地鐵月台",
    imagePath: "/assets/scenes/commute/metro-platform.png",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE008: {
    id: "COMMUTE008",
    name: "到公司前的猶豫",
    description: "街道",
    imagePath: "/assets/scenes/commute/street.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE009: {
    id: "COMMUTE009",
    name: "小孩哭鬧",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE010: {
    id: "COMMUTE010",
    name: "音樂外放",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE011: {
    id: "COMMUTE011",
    name: "開腳鄰座",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE012: {
    id: "COMMUTE012",
    name: "睡著鄰座",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE013: {
    id: "COMMUTE013",
    name: "佔位乘客",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE014: {
    id: "COMMUTE014",
    name: "疑似偷拍",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE015: {
    id: "COMMUTE015",
    name: "需要座位老人(坐著)",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE016: {
    id: "COMMUTE016",
    name: "需要座位老人(站著)",
    description: "地鐵車廂內",
    imagePath: "/assets/scenes/commute/carriage.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 社交場景
  SOCIAL001: {
    id: "SOCIAL001",
    name: "咖啡廳搭訕",
    description: "咖啡廳",
    imagePath: "/assets/scenes/social/coffee-shop.png",
    category: EVENT_CATEGORIES.SOCIAL,
  },
  SOCIAL002: {
    id: "SOCIAL002",
    name: "同事聚會",
    description: "咖啡廳",
    imagePath: "/assets/scenes/social/coffee-shop.png",
    category: EVENT_CATEGORIES.SOCIAL,
  },
  SOCIAL003: {
    id: "SOCIAL003",
    name: "公園散步",
    description: "公園",
    imagePath: "/assets/scenes/social/park-bench.png",
    category: EVENT_CATEGORIES.SOCIAL,
  },
  SOCIAL004: {
    id: "SOCIAL004",
    name: "電梯對話",
    description: "電梯內",
    imagePath: "/assets/scenes/work/elevator.png",
    category: EVENT_CATEGORIES.SOCIAL,
  },
  SOCIAL005: {
    id: "SOCIAL005",
    name: "會議討論",
    description: "會議室",
    imagePath: "/assets/scenes/work/meeting-room.png",
    category: EVENT_CATEGORIES.SOCIAL,
  },

  // 工作場景
  WORK001: {
    id: "WORK001",
    name: "工作壓力",
    description: "辦公室",
    imagePath: "/assets/scenes/work/modern-office.png",
    category: EVENT_CATEGORIES.WORK,
  },
  WORK002: {
    id: "WORK002",
    name: "同事衝突",
    description: "辦公室",
    imagePath: "/assets/scenes/work/modern-office.png",
    category: EVENT_CATEGORIES.WORK,
  },
  WORK003: {
    id: "WORK003",
    name: "會議發言",
    description: "會議室",
    imagePath: "/assets/scenes/work/meeting-room.png",
    category: EVENT_CATEGORIES.WORK,
  },
  WORK004: {
    id: "WORK004",
    name: "加班決定",
    description: "辦公室",
    imagePath: "/assets/scenes/work/modern-office.png",
    category: EVENT_CATEGORIES.WORK,
  },
  WORK005: {
    id: "WORK005",
    name: "升職機會",
    description: "會議室",
    imagePath: "/assets/scenes/work/meeting-room.png",
    category: EVENT_CATEGORIES.WORK,
  },

  // 生活場景
  DAILY001: {
    id: "DAILY001",
    name: "家庭爭吵",
    description: "客廳",
    imagePath: "/assets/scenes/daily-life/living-room.png",
    category: EVENT_CATEGORIES.DAILY_LIFE,
  },
  DAILY002: {
    id: "DAILY002",
    name: "做飯選擇",
    description: "廚房",
    imagePath: "/assets/scenes/daily-life/kitchen.png",
    category: EVENT_CATEGORIES.DAILY_LIFE,
  },
  DAILY003: {
    id: "DAILY003",
    name: "休息時間",
    description: "臥室",
    imagePath: "/assets/scenes/daily-life/bedroom.png",
    category: EVENT_CATEGORIES.DAILY_LIFE,
  },
  DAILY004: {
    id: "DAILY004",
    name: "看電視",
    description: "客廳",
    imagePath: "/assets/scenes/daily-life/living-room.png",
    category: EVENT_CATEGORIES.DAILY_LIFE,
  },
  DAILY005: {
    id: "DAILY005",
    name: "整理房間",
    description: "臥室",
    imagePath: "/assets/scenes/daily-life/bedroom.png",
    category: EVENT_CATEGORIES.DAILY_LIFE,
  },

  // 便利商店耳機男事件
  EVT001: {
    id: "EVT001",
    name: "便利商店耳機男",
    description: "便利商店",
    imagePath: "/assets/scenes/commute/convenience.jpg",
    category: EVENT_CATEGORIES.DAILY_LIFE,
  },

  // 街道場景相關事件
  EVT102: {
    id: "EVT102",
    name: "緊急加班",
    description: "街道",
    imagePath: "/assets/scenes/commute/street.jpg",
    category: EVENT_CATEGORIES.WORK,
  },
  EVT103: {
    id: "EVT103",
    name: "想起早會",
    description: "街道",
    imagePath: "/assets/scenes/commute/street.jpg",
    category: EVENT_CATEGORIES.WORK,
  },

  // 電扶梯相關事件
  COMMUTE017: {
    id: "COMMUTE017",
    name: "電扶梯左側行走",
    description: "電扶梯",
    imagePath: "/assets/scenes/commute/escalator.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE018: {
    id: "COMMUTE018",
    name: "前方背包擠壓",
    description: "電扶梯",
    imagePath: "/assets/scenes/commute/escalator.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE019: {
    id: "COMMUTE019",
    name: "電扶梯故障停機",
    description: "電扶梯",
    imagePath: "/assets/scenes/commute/escalator.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE020: {
    id: "COMMUTE020",
    name: "電扶梯擁擠",
    description: "電扶梯",
    imagePath: "/assets/scenes/commute/escalator.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE021: {
    id: "COMMUTE021",
    name: "電扶梯禮讓老人",
    description: "電扶梯",
    imagePath: "/assets/scenes/commute/escalator.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 便利商店相關事件
  COMMUTE022: {
    id: "COMMUTE022",
    name: "便利商店購物",
    description: "便利商店",
    imagePath: "/assets/scenes/commute/convenience.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE023: {
    id: "COMMUTE023",
    name: "商品選擇困難",
    description: "便利商店",
    imagePath: "/assets/scenes/commute/convenience.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE024: {
    id: "COMMUTE024",
    name: "排隊結帳",
    description: "便利商店",
    imagePath: "/assets/scenes/commute/convenience.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE025: {
    id: "COMMUTE025",
    name: "商品缺貨",
    description: "便利商店",
    imagePath: "/assets/scenes/commute/convenience.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE026: {
    id: "COMMUTE026",
    name: "店員推薦",
    description: "便利商店",
    imagePath: "/assets/scenes/commute/convenience.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE027: {
    id: "COMMUTE027",
    name: "後面的人站很近",
    description: "電扶梯",
    imagePath: "/assets/scenes/commute/escalator.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE028: {
    id: "COMMUTE028",
    name: "前面的人玩手機不走",
    description: "電扶梯",
    imagePath: "/assets/scenes/commute/escalator.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 小徑公園相關事件
  COMMUTE029: {
    id: "COMMUTE029",
    name: "陌生小徑的誘惑",
    description: "小徑公園",
    imagePath: "/assets/scenes/commute/lanePark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE030: {
    id: "COMMUTE030",
    name: "小徑上的偶遇",
    description: "小徑公園",
    imagePath: "/assets/scenes/commute/lanePark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE031: {
    id: "COMMUTE031",
    name: "小徑的岔路選擇",
    description: "小徑公園",
    imagePath: "/assets/scenes/commute/lanePark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 大公園相關事件
  COMMUTE032: {
    id: "COMMUTE032",
    name: "晨間公園早餐",
    description: "大公園",
    imagePath: "/assets/scenes/commute/harmonyPark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE033: {
    id: "COMMUTE033",
    name: "鄰居遛狗相遇",
    description: "大公園",
    imagePath: "/assets/scenes/commute/harmonyPark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE034: {
    id: "COMMUTE034",
    name: "公園晨運的誘惑",
    description: "大公園",
    imagePath: "/assets/scenes/commute/harmonyPark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 小徑公園負面事件
  COMMUTE035: {
    id: "COMMUTE035",
    name: "小徑上的迷路",
    description: "小徑公園",
    imagePath: "/assets/scenes/commute/lanePark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE036: {
    id: "COMMUTE036",
    name: "小徑上的野狗",
    description: "小徑公園",
    imagePath: "/assets/scenes/commute/lanePark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE037: {
    id: "COMMUTE037",
    name: "小徑上的垃圾",
    description: "小徑公園",
    imagePath: "/assets/scenes/commute/lanePark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 大公園負面事件
  COMMUTE038: {
    id: "COMMUTE038",
    name: "公園裡的爭吵",
    description: "大公園",
    imagePath: "/assets/scenes/commute/harmonyPark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE039: {
    id: "COMMUTE039",
    name: "公園裡的噪音",
    description: "大公園",
    imagePath: "/assets/scenes/commute/harmonyPark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE040: {
    id: "COMMUTE040",
    name: "公園裡的擁擠",
    description: "大公園",
    imagePath: "/assets/scenes/commute/harmonyPark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 小徑公園詭異事件
  COMMUTE041: {
    id: "COMMUTE041",
    name: "詭異男子的注視",
    description: "小徑公園",
    imagePath: "/assets/scenes/commute/lanePark.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 街道詭異事件
  COMMUTE042: {
    id: "COMMUTE042",
    name: "跟在背後的大叔",
    description: "街道",
    imagePath: "/assets/scenes/commute/street.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 便利商店特價事件
  COMMUTE043: {
    id: "COMMUTE043",
    name: "限時特價商品",
    description: "便利商店",
    imagePath: "/assets/scenes/commute/convenience.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },

  // 閘門相關事件
  COMMUTE044: {
    id: "COMMUTE044",
    name: "閘門卡住",
    description: "閘門",
    imagePath: "/assets/scenes/commute/fareGate.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE045: {
    id: "COMMUTE045",
    name: "餘額不足",
    description: "閘門",
    imagePath: "/assets/scenes/commute/fareGate.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE046: {
    id: "COMMUTE046",
    name: "閘門故障",
    description: "閘門",
    imagePath: "/assets/scenes/commute/fareGate.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE047: {
    id: "COMMUTE047",
    name: "忘記刷卡",
    description: "閘門",
    imagePath: "/assets/scenes/commute/fareGate.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
  COMMUTE048: {
    id: "COMMUTE048",
    name: "條件限制測試事件",
    description: "測試",
    imagePath: "/assets/scenes/commute/escalator.jpg",
    category: EVENT_CATEGORIES.COMMUTE,
  },
};

// 預設場景配置
export const DEFAULT_SCENE: SceneConfig = {
  id: "default",
  name: "一般場景",
  description: "一般場景",
  imagePath: "/assets/scenes/default-scene.png",
  category: "GENERAL",
};

// 獲取事件的場景配置
export function getEventScene(eventId: string): SceneConfig {
  return SCENE_MAPPINGS[eventId] || DEFAULT_SCENE;
}

// 根據分類獲取場景列表
export function getScenesByCategory(category: string): SceneConfig[] {
  return Object.values(SCENE_MAPPINGS).filter(
    (scene) => scene.category === category
  );
}

// 獲取所有場景配置
export function getAllScenes(): SceneConfig[] {
  return Object.values(SCENE_MAPPINGS);
}

// 獲取所有可用的地點描述
export function getAvailableLocations(): string[] {
  const locations = new Set<string>();

  Object.values(SCENE_MAPPINGS).forEach((scene) => {
    if (scene.description) {
      locations.add(scene.description);
    }
  });

  return Array.from(locations).sort();
}

// 根據地點描述獲取事件ID列表
export function getEventIdsByLocation(location: string): string[] {
  return Object.entries(SCENE_MAPPINGS)
    .filter(([, scene]) => scene.description === location)
    .map(([eventId]) => eventId);
}

// 場景背景圖片路徑常量
export const SCENE_IMAGES = {
  // 通勤場景
  METRO_CARRIAGE: "/assets/scenes/commute/carriage.jpg",
  METRO_PLATFORM: "/assets/scenes/commute/metro-platform.png",
  ESCALATOR: "/assets/scenes/commute/escalator.jpg",
  BUS_INTERIOR: "/assets/scenes/commute/carriage.jpg",
  CONVENIENCE: "/assets/scenes/commute/convenience.jpg",
  STREET: "/assets/scenes/commute/street.jpg",
  LANE_PARK: "/assets/scenes/commute/lanePark.jpg",
  HARMONY_PARK: "/assets/scenes/commute/harmonyPark.jpg",
  FARE_GATE: "/assets/scenes/commute/fareGate.jpg",

  // 社交場景
  COFFEE_SHOP: "/assets/scenes/social/coffee-shop.png",
  PARK_BENCH: "/assets/scenes/social/park-bench.png",

  // 工作場景
  MODERN_OFFICE: "/assets/scenes/work/modern-office.png",
  MEETING_ROOM: "/assets/scenes/work/meeting-room.png",
  ELEVATOR: "/assets/scenes/work/elevator.png",

  // 生活場景
  LIVING_ROOM: "/assets/scenes/daily-life/living-room.png",
  KITCHEN: "/assets/scenes/daily-life/kitchen.png",
  BEDROOM: "/assets/scenes/daily-life/bedroom.png",

  // 預設場景
  DEFAULT: "/assets/scenes/default-scene.png",
};
