import { ExtendedEvent, EVENT_CATEGORIES, EVENT_DIFFICULTY } from "./constants";

export const shoppingEvents: ExtendedEvent[] = [
  {
    id: "EVT301",
    name: "限時特價商品",
    description: "在商場看到你一直想要的商品正在限時特價。",
    category: EVENT_CATEGORIES.SHOPPING,
    difficulty: EVENT_DIFFICULTY.MEDIUM,
    tags: ["購物", "金錢", "慾望"],
    options: {
      A: {
        text: "立即購買。",
        statChanges: {
          心情: 3,
          儲蓄: -800,
          好奇心: 1,
        },
        conditions: [{ stat: "儲蓄", operator: "gte", value: 800 }],
        consequences: ["你買到了心儀的商品，心情很好。"],
      },
      B: {
        text: "考慮一下再說。",
        statChanges: {
          心情: -1,
          穩定性: 1,
          時間感: 1,
        },
        consequences: ["你選擇了理性消費，但錯過了特價。"],
      },
    },
  },
  {
    id: "EVT302",
    name: "街頭推銷員",
    description: "路邊的推銷員向你推銷昂貴的產品。",
    category: EVENT_CATEGORIES.SHOPPING,
    difficulty: EVENT_DIFFICULTY.EASY,
    tags: ["購物", "推銷", "壓力"],
    options: {
      A: {
        text: "聽他介紹，考慮購買。",
        statChanges: {
          心情: -2,
          儲蓄: -300,
          同理心: 1,
          決斷力: -1,
        },
        conditions: [{ stat: "儲蓄", operator: "gte", value: 300 }],
        consequences: ["你買了產品，但後來發現不太實用。"],
      },
      B: {
        text: "禮貌地拒絕。",
        statChanges: {
          心情: 0,
          決斷力: 1,
          穩定性: 1,
        },
        consequences: ["你堅定地拒絕了，推銷員也理解地離開了。"],
      },
    },
  },
  {
    id: "EVT303",
    name: "慈善募款",
    description: "在街上遇到慈善機構的募款活動。",
    category: EVENT_CATEGORIES.SHOPPING,
    difficulty: EVENT_DIFFICULTY.EASY,
    tags: ["購物", "慈善", "同理心"],
    options: {
      A: {
        text: "捐一些錢。",
        statChanges: {
          心情: 2,
          儲蓄: -100,
          同理心: 2,
        },
        conditions: [{ stat: "儲蓄", operator: "gte", value: 100 }],
        consequences: ["你幫助了需要的人，心裡感到溫暖。"],
      },
      B: {
        text: "婉拒捐款。",
        statChanges: {
          心情: -1,
          同理心: -1,
        },
        consequences: ["你選擇了不捐款，但心裡有些愧疚。"],
      },
    },
  },
];
