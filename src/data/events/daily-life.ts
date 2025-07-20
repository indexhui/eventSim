import { ExtendedEvent, EVENT_CATEGORIES, EVENT_DIFFICULTY } from "./constants";

export const dailyLifeEvents: ExtendedEvent[] = [
  {
    id: "EVT001",
    name: "便利商店耳機男",
    description: "排隊時前面的男生戴著耳機，結帳叫了他好幾次都沒反應。",
    category: EVENT_CATEGORIES.DAILY_LIFE,
    difficulty: EVENT_DIFFICULTY.EASY,
    tags: ["日常", "社交", "同理心"],
    options: {
      A: {
        text: "拍拍他提醒一下。",
        statChanges: {
          心情: -5,
          體力: -3,
          決斷力: 3,
          同理心: 3,
        },
        consequences: ["你輕輕拍了拍他的肩膀，他嚇了一跳，連忙道歉。"],
      },
      B: {
        text: "默默等店員自己處理。",
        statChanges: {
          心情: -3,
          體力: 0,
          穩定性: 3,
          社交傾向: -2,
        },
        consequences: ["你選擇了等待，店員最後大聲叫了他。"],
      },
    },
  },
  {
    id: "EVT002",
    name: "電梯裡的尷尬",
    description: "電梯裡只有你和一個陌生人，氣氛有些尷尬。",
    category: EVENT_CATEGORIES.DAILY_LIFE,
    difficulty: EVENT_DIFFICULTY.EASY,
    tags: ["日常", "社交", "尷尬"],
    options: {
      A: {
        text: "主動打招呼聊天。",
        statChanges: {
          心情: 25,
          社交傾向: 4,
          體力: -8,
          同理心: 2,
        },
        consequences: ["對方很友善地回應，你們聊得很開心。"],
      },
      B: {
        text: "保持沉默，看手機。",
        statChanges: {
          心情: 2,
          穩定性: 3,
          社交傾向: -2,
        },
        consequences: ["你們各自安靜地度過了電梯時間。"],
      },
    },
  },
];
