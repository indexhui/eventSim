import { ExtendedEvent, EVENT_CATEGORIES, EVENT_DIFFICULTY } from "./constants";

export const socialEvents: ExtendedEvent[] = [
  {
    id: "EVT201",
    name: "朋友的求助",
    description: "朋友打電話來，說他遇到困難需要借錢。",
    category: EVENT_CATEGORIES.SOCIAL,
    difficulty: EVENT_DIFFICULTY.HARD,
    tags: ["社交", "金錢", "友情"],
    options: {
      A: {
        text: "借給他一些錢。",
        statChanges: {
          心情: 2,
          儲蓄: -500,
          同理心: 2,
          社交傾向: 1,
        },
        conditions: [{ stat: "儲蓄", operator: "gte", value: 500 }],
        consequences: ["朋友很感激，承諾會盡快還錢。"],
      },
      B: {
        text: "婉拒，但提供其他幫助。",
        statChanges: {
          心情: 1,
          同理心: 1,
          穩定性: 1,
        },
        consequences: ["你提供了建議和情感支持，朋友理解你的處境。"],
      },
    },
  },
  {
    id: "EVT202",
    name: "陌生人的搭訕",
    description: "在咖啡廳裡，一個陌生人主動來和你聊天。",
    category: EVENT_CATEGORIES.SOCIAL,
    difficulty: EVENT_DIFFICULTY.MEDIUM,
    tags: ["社交", "陌生人", "好奇心"],
    options: {
      A: {
        text: "友善地回應，繼續聊天。",
        statChanges: {
          心情: 3,
          社交傾向: 2,
          好奇心: 1,
          體力: -1,
        },
        consequences: ["你們聊得很投機，交換了聯絡方式。"],
      },
      B: {
        text: "禮貌地結束對話。",
        statChanges: {
          心情: 0,
          穩定性: 1,
          社交傾向: -1,
        },
        consequences: ["你禮貌地結束了對話，對方也理解地離開了。"],
      },
    },
  },
  {
    id: "EVT203",
    name: "同學聚會邀請",
    description: "多年未見的同學邀請你參加同學聚會。",
    category: EVENT_CATEGORIES.SOCIAL,
    difficulty: EVENT_DIFFICULTY.MEDIUM,
    tags: ["社交", "回憶", "懷舊"],
    options: {
      A: {
        text: "參加聚會，重溫舊時光。",
        statChanges: {
          心情: 4,
          體力: -3,
          社交傾向: 2,
          儲蓄: -100,
        },
        conditions: [{ stat: "儲蓄", operator: "gte", value: 100 }],
        consequences: ["聚會很溫馨，你重新聯繫了許多老朋友。"],
      },
      B: {
        text: "婉拒，保持現狀。",
        statChanges: {
          心情: -1,
          穩定性: 1,
          社交傾向: -1,
        },
        consequences: ["你選擇了獨處，但心裡有些遺憾。"],
      },
    },
  },
];
