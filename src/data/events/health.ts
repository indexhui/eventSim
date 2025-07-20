import { ExtendedEvent, EVENT_CATEGORIES, EVENT_DIFFICULTY } from "./constants";

export const healthEvents: ExtendedEvent[] = [
  {
    id: "EVT401",
    name: "感冒症狀",
    description: "你感覺身體有些不舒服，可能是感冒了。",
    category: EVENT_CATEGORIES.HEALTH,
    difficulty: EVENT_DIFFICULTY.MEDIUM,
    tags: ["健康", "疾病", "休息"],
    options: {
      A: {
        text: "去看醫生。",
        statChanges: {
          心情: -1,
          儲蓄: -200,
          體力: 5,
          穩定性: 1,
        },
        conditions: [{ stat: "儲蓄", operator: "gte", value: 200 }],
        consequences: ["醫生開了藥，你很快康復了。"],
      },
      B: {
        text: "在家休息，多喝水。",
        statChanges: {
          心情: 0,
          體力: -3,
          時間感: -1,
        },
        consequences: ["你選擇了自然康復，但恢復得比較慢。"],
      },
    },
  },
  {
    id: "EVT402",
    name: "健身房邀請",
    description: "朋友邀請你一起去健身房運動。",
    category: EVENT_CATEGORIES.HEALTH,
    difficulty: EVENT_DIFFICULTY.MEDIUM,
    tags: ["健康", "運動", "社交"],
    options: {
      A: {
        text: "一起去運動。",
        statChanges: {
          心情: 2,
          體力: -2,
          儲蓄: -150,
          社交傾向: 1,
        },
        conditions: [{ stat: "儲蓄", operator: "gte", value: 150 }],
        consequences: ["運動很累但很充實，你感覺身體更健康了。"],
      },
      B: {
        text: "婉拒，在家運動。",
        statChanges: {
          心情: 1,
          體力: -1,
          穩定性: 1,
          社交傾向: -1,
        },
        consequences: ["你在家做了簡單運動，省下了錢。"],
      },
    },
  },
  {
    id: "EVT403",
    name: "失眠困擾",
    description: "最近總是睡不好，影響了白天的工作。",
    category: EVENT_CATEGORIES.HEALTH,
    difficulty: EVENT_DIFFICULTY.HARD,
    tags: ["健康", "睡眠", "壓力"],
    options: {
      A: {
        text: "去看睡眠專科。",
        statChanges: {
          心情: 1,
          儲蓄: -500,
          體力: 3,
          穩定性: 2,
        },
        conditions: [{ stat: "儲蓄", operator: "gte", value: 500 }],
        consequences: ["醫生給了你專業建議，睡眠問題得到改善。"],
      },
      B: {
        text: "調整作息，放鬆心情。",
        statChanges: {
          心情: 2,
          體力: 1,
          穩定性: 1,
          時間感: 1,
        },
        consequences: ["你調整了生活習慣，睡眠逐漸改善。"],
      },
    },
  },
];
