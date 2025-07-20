import { ExtendedEvent, EVENT_CATEGORIES, EVENT_DIFFICULTY } from "./constants";

export const workEvents: ExtendedEvent[] = [
  {
    id: "EVT101",
    name: "同事的生日派對",
    description: "同事邀請你參加他的生日派對，但你今天很累。",
    category: EVENT_CATEGORIES.WORK,
    difficulty: EVENT_DIFFICULTY.MEDIUM,
    tags: ["工作", "社交", "體力"],
    options: {
      A: {
        text: "參加派對，社交一下。",
        statChanges: {
          心情: 3,
          體力: -5,
          社交傾向: 2,
          同理心: 1,
        },
        consequences: ["派對很熱鬧，你和同事們相處愉快。"],
      },
      B: {
        text: "婉拒，回家休息。",
        statChanges: {
          心情: 1,
          體力: 3,
          穩定性: 1,
          社交傾向: -1,
        },
        consequences: ["你選擇了休息，明天精神會更好。"],
      },
    },
  },
  {
    id: "EVT102",
    name: "緊急加班",
    description: "下班前突然接到緊急任務，需要加班處理。",
    category: EVENT_CATEGORIES.WORK,
    difficulty: EVENT_DIFFICULTY.HARD,
    tags: ["工作", "壓力", "時間"],
    options: {
      A: {
        text: "留下來加班。",
        statChanges: {
          心情: -3,
          體力: -8,
          儲蓄: 200,
          專注力: 1,
          時間感: -1,
        },
        consequences: ["你完成了任務，但感到非常疲憊。"],
      },
      B: {
        text: "拒絕，明天再處理。",
        statChanges: {
          心情: -1,
          體力: 0,
          決斷力: 1,
          穩定性: -1,
        },
        consequences: ["你選擇了休息，但心裡有些不安。"],
      },
    },
  },
  {
    id: "EVT103",
    name: "想起早會",
    description: "妳想起早上一早有個很嚴肅的早會，你可能還沒準備好",
    category: EVENT_CATEGORIES.WORK,
    difficulty: EVENT_DIFFICULTY.MEDIUM,
    tags: ["工作", "領導", "自信"],
    options: {
      A: {
        text: "趕緊準備一下發言內容。",
        statChanges: {
          心情: 2,
          體力: -2,
          決斷力: 2,
          社交傾向: 1,
        },
        consequences: ["你利用通勤時間準備了發言，會議上表現得很好。"],
      },
      B: {
        text: "順其自然，到時候再說。",
        statChanges: {
          心情: 0,
          體力: 0,
          穩定性: 1,
          決斷力: -1,
        },
        consequences: ["你選擇了順其自然，會議上沒有特別表現。"],
      },
    },
  },
];
