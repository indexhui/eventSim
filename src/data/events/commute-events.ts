import { ExtendedEvent, EVENT_CATEGORIES, EVENT_DIFFICULTY } from "./constants";

// 原有通勤事件
export const COMMUTE001: ExtendedEvent = {
  id: "COMMUTE001",
  name: "出門前的猶豫",
  description: "準備出門時，你發現時間還早，但心裡有點不想太早到公司。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["出門", "時間", "心情"],
  options: {
    A: {
      text: "準時出門，早點到公司準備。",
      statChanges: {
        心情: 3,
        時間感: 2,
        專注力: 1,
        體力: -5,
      },
      consequences: ["你選擇了準時出門，到公司時心情平靜，有時間整理思緒。"],
    },
    B: {
      text: "再拖一下，慢慢準備。",
      statChanges: {
        心情: -8,
        時間感: -2,
        穩定性: -1,
        體力: 2,
      },
      consequences: ["你多待了一會，但心裡開始擔心遲到，反而更緊張了。"],
    },
    C: {
      text: "乾脆多睡半小時。",
      statChanges: {
        心情: 6,
        體力: 8,
        時間感: -3,
        決斷力: -1,
      },
      consequences: ["你多睡了一會，精神好多了，但時間有點緊。"],
    },
  },
};

export const COMMUTE002: ExtendedEvent = {
  id: "COMMUTE002",
  name: "早餐的選擇",
  description: "路過早餐店，你聞到香噴噴的味道，但時間有點緊。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["早餐", "時間", "健康"],
  options: {
    A: {
      text: "買個早餐，慢慢享用。",
      statChanges: {
        體力: 12,
        時間感: -2,
        儲蓄: -80,
      },
      consequences: ["你享受了一頓美味的早餐，心情愉悅，但到公司時有點趕。"],
    },
    B: {
      text: "買個簡單的帶走。",
      statChanges: {
        體力: 6,
        儲蓄: -50,
        時間感: 1,
      },
      consequences: ["你買了個簡單的早餐，既填飽了肚子又沒耽誤時間。"],
    },
    C: {
      text: "跳過早餐，直接去公司。",
      statChanges: {
        心情: -8,
        體力: -8,
        時間感: 2,
        儲蓄: 0,
      },
      consequences: ["你選擇了不吃早餐，到公司時肚子有點餓，但時間充裕。"],
    },
  },
};

export const COMMUTE003: ExtendedEvent = {
  id: "COMMUTE003",
  name: "地鐵上的搭訕",
  description: "地鐵上有人主動和你搭話，看起來很友善，但你不太想聊天。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "社交", "拒絕"],
  options: {
    A: {
      text: "熱情回應，聊得很開心。",
      statChanges: {
        心情: 6,
        社交傾向: 2,
        體力: -12,
        同理心: 1,
      },
      conditions: [{ stat: "社交傾向", operator: "gte", value: 1 }],
      consequences: ["你們聊得很投機，但到站時你覺得有點累。"],
    },
    B: {
      text: "禮貌但保持距離。",
      statChanges: {
        心情: -3,
        社交傾向: 0,
        穩定性: 2,
        體力: -3,
      },
      consequences: ["你友善地回應了幾句，但沒有深入交流，心裡有點內耗。"],
    },
    C: {
      text: "假裝沒聽見，低頭看手機。",
      statChanges: {
        心情: -8,
        社交傾向: -1,
        穩定性: 1,
        同理心: -1,
      },
      consequences: ["你選擇了迴避，但心裡有些愧疚，覺得自己不夠友善。"],
    },
    D: {
      text: "直接說不想聊天。",
      statChanges: {
        心情: 2,
        決斷力: 2,
        社交傾向: -1,
        體力: -2,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 1 }],
      consequences: ["你直接表達了想法，對方理解地離開了，你覺得很輕鬆。"],
    },
  },
};

export const COMMUTE004: ExtendedEvent = {
  id: "COMMUTE004",
  name: "電扶梯上的爭議",
  description: "你站在電扶梯右側，後面有人想要從左側快速通過，但你不想讓路。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["通勤", "禮儀", "堅持"],
  options: {
    A: {
      text: "主動讓出左側通道。",
      statChanges: {
        心情: 4,
        同理心: 2,
        決斷力: 1,
        體力: -2,
      },
      consequences: ["你禮貌地讓路，對方感激地點頭致謝，你心裡暖暖的。"],
    },
    B: {
      text: "堅持站在右側，等對方開口。",
      statChanges: {
        心情: -2,
        穩定性: 2,
        同理心: -1,
        體力: -1,
      },
      consequences: ["你堅持了正確的禮儀，但心裡有點不舒服，覺得自己太固執。"],
    },
    C: {
      text: "故意擋住，不讓任何人通過。",
      statChanges: {
        心情: -12,
        同理心: -2,
        穩定性: -1,
        社交傾向: -1,
      },
      consequences: ["你故意阻擋，引起了其他人的不滿，你心裡也有些後悔。"],
    },
  },
};

export const COMMUTE005: ExtendedEvent = {
  id: "COMMUTE005",
  name: "同事的順風車",
  description: "同事看到你，問要不要搭他的順風車去公司。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "社交", "拒絕"],
  options: {
    A: {
      text: "欣然接受，聊得很開心。",
      statChanges: {
        心情: 10,
        社交傾向: 3,
        體力: 8,
        同理心: 1,
      },
      conditions: [{ stat: "社交傾向", operator: "gte", value: 0 }],
      consequences: ["你們在車上聊得很開心，到公司時心情很好。"],
    },
    B: {
      text: "勉強接受，但不太想聊天。",
      statChanges: {
        心情: -8,
        社交傾向: -1,
        體力: 5,
        穩定性: -2,
      },
      consequences: ["你接受了邀請，但全程很尷尬，心裡覺得很內耗。"],
    },
    C: {
      text: "委婉拒絕，說想自己走走。",
      statChanges: {
        心情: 2,
        決斷力: 2,
        社交傾向: -1,
        體力: -3,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 0 }],
      consequences: ["你委婉地拒絕了，同事理解地離開了，你覺得很輕鬆。"],
    },
    D: {
      text: "直接拒絕，說不喜歡搭別人的車。",
      statChanges: {
        心情: -2,
        決斷力: 3,
        社交傾向: -2,
        同理心: -1,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 2 }],
      consequences: [
        "你直接拒絕了，同事看起來有點尷尬，你心裡也有些過意不去。",
      ],
    },
  },
};

// 其他通勤事件
export const COMMUTE006: ExtendedEvent = {
  id: "COMMUTE006",
  name: "捷運上的手機聲",
  description: "捷運上有人大聲講電話，影響了車廂的安靜，你很煩躁。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "噪音", "衝突"],
  options: {
    A: {
      text: "直接上前提醒對方小聲點。",
      statChanges: {
        心情: 5,
        決斷力: 3,
        社交傾向: 1,
        體力: -8,
      },
      conditions: [
        { stat: "決斷力", operator: "gte", value: 2 },
        { stat: "社交傾向", operator: "gte", value: -1 },
      ],
      consequences: ["對方有些尷尬，但還是降低了音量，你覺得很有成就感。"],
    },
    B: {
      text: "用眼神示意，希望對方注意到。",
      statChanges: {
        心情: 1,
        穩定性: 2,
        社交傾向: -1,
        體力: -2,
      },
      consequences: [
        "對方注意到了你的眼神，稍微降低了音量，但你心裡還是很煩躁。",
      ],
    },
    C: {
      text: "戴上耳機，無視噪音。",
      statChanges: {
        心情: -3,
        穩定性: 1,
        同理心: -1,
        體力: -1,
      },
      consequences: ["你選擇了自我隔離，但心裡還是很不舒服，覺得自己太軟弱。"],
    },
    D: {
      text: "換到其他車廂。",
      statChanges: {
        心情: 3,
        決斷力: 1,
        體力: -4,
        穩定性: 1,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 0 }],
      consequences: ["你換到了其他車廂，找到了安靜的環境，心情好多了。"],
    },
  },
};

export const COMMUTE007: ExtendedEvent = {
  id: "COMMUTE007",
  name: "月台上的插隊",
  description: "排隊等車時，有人直接插隊到你前面，你很生氣。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "插隊", "正義感"],
  options: {
    A: {
      text: "直接指出對方的錯誤行為。",
      statChanges: {
        心情: 6,
        決斷力: 3,
        社交傾向: 1,
        體力: -6,
      },
      conditions: [
        { stat: "決斷力", operator: "gte", value: 2 },
        { stat: "社交傾向", operator: "gte", value: -2 },
      ],
      consequences: ["對方有些惱怒，但還是回到了隊伍後面，你覺得很解氣。"],
    },
    B: {
      text: "委婉地提醒對方要排隊。",
      statChanges: {
        心情: 4,
        同理心: 2,
        決斷力: 1,
        體力: -2,
      },
      consequences: ["你友善地提醒，對方不好意思地道歉並重新排隊。"],
    },
    C: {
      text: "默默忍受，不計較。",
      statChanges: {
        心情: -8,
        穩定性: 1,
        決斷力: -1,
        同理心: -1,
      },
      consequences: ["你選擇了忍耐，但心裡很不舒服，覺得自己太軟弱。"],
    },
    D: {
      text: "故意擠回去，製造衝突。",
      statChanges: {
        心情: -15,
        穩定性: -2,
        社交傾向: -1,
        體力: -8,
      },
      consequences: ["你故意製造了衝突，雙方都很不愉快，你心裡也有些後悔。"],
    },
  },
};

export const COMMUTE008: ExtendedEvent = {
  id: "COMMUTE008",
  name: "到公司前的猶豫",
  description: "快到公司了，你突然想起今天有個重要會議，心裡有點緊張。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "工作", "壓力"],
  options: {
    A: {
      text: "深呼吸，調整心態，準備好面對。",
      statChanges: {
        心情: 6,
        穩定性: 3,
        決斷力: 2,
        體力: -3,
      },
      consequences: ["你調整好了心態，準備好面對今天的挑戰。"],
    },
    B: {
      text: "在門口多站一會，整理思緒。",
      statChanges: {
        心情: 2,
        穩定性: 2,
        時間感: -1,
        體力: -1,
      },
      consequences: ["你多花了一點時間整理思緒，感覺好多了。"],
    },
    C: {
      text: "直接衝進去，不想多想。",
      statChanges: {
        心情: -5,
        穩定性: -1,
        決斷力: 1,
        體力: -5,
      },
      consequences: ["你選擇了直接面對，但心裡還是很緊張，感覺準備不足。"],
    },
    D: {
      text: "假裝身體不舒服，請假回家。",
      statChanges: {
        心情: -12,
        穩定性: -3,
        決斷力: -2,
        體力: 8,
      },
      consequences: ["你選擇了逃避，但心裡很愧疚，覺得自己太軟弱了。"],
    },
  },
};

export const COMMUTE009: ExtendedEvent = {
  id: "COMMUTE009",
  name: "後方小孩的哭鬧",
  description: "捷運上後方有小孩在哭鬧，聲音很大，影響了整個車廂的安靜。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "噪音", "同理心"],
  options: {
    A: {
      text: "轉頭看看，給家長一個理解的眼神。",
      statChanges: {
        心情: 3,
        同理心: 2,
        穩定性: 1,
        體力: -1,
      },
      consequences: ["家長感激地對你點點頭，你覺得心裡暖暖的。"],
    },
    B: {
      text: "戴上耳機，專心聽音樂。",
      statChanges: {
        心情: 1,
        穩定性: 2,
        同理心: -1,
        體力: 0,
      },
      consequences: ["你選擇了自我隔離，但心裡有點過意不去。"],
    },
    C: {
      text: "不耐煩地瞪了家長一眼。",
      statChanges: {
        心情: -5,
        同理心: -2,
        穩定性: -1,
        社交傾向: -1,
      },
      consequences: ["家長看起來很尷尬，你心裡也有些後悔。"],
    },
    D: {
      text: "主動上前安慰小孩。",
      statChanges: {
        心情: 8,
        同理心: 3,
        社交傾向: 2,
        體力: -4,
      },
      consequences: ["小孩漸漸安靜下來，家長非常感激你的幫助。"],
    },
  },
};

export const COMMUTE010: ExtendedEvent = {
  id: "COMMUTE010",
  name: "音樂外放的乘客",
  description: "旁邊的乘客戴著耳機但音樂聲很大，整個車廂都聽得到。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "噪音", "社交"],
  options: {
    A: {
      text: "禮貌地提醒對方音量太大。",
      statChanges: {
        心情: 4,
        決斷力: 2,
        社交傾向: 1,
        體力: -2,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 0 }],
      consequences: ["對方有些尷尬，但還是降低了音量。"],
    },
    B: {
      text: "用眼神示意，希望對方注意到。",
      statChanges: {
        心情: 1,
        穩定性: 2,
        社交傾向: -1,
        體力: -1,
      },
      consequences: ["對方注意到了你的眼神，稍微降低了音量。"],
    },
    C: {
      text: "換到其他座位。",
      statChanges: {
        心情: 3,
        決斷力: 1,
        體力: -2,
        穩定性: 1,
      },
      consequences: ["你換到了安靜的座位，心情好多了。"],
    },
    D: {
      text: "默默忍受，不計較。",
      statChanges: {
        心情: -3,
        穩定性: 1,
        決斷力: -1,
        同理心: -1,
      },
      consequences: ["你選擇了忍耐，但心裡很不舒服。"],
    },
  },
};

export const COMMUTE011: ExtendedEvent = {
  id: "COMMUTE011",
  name: "開腳的鄰座",
  description: "旁邊的男生開腳開得很開，佔據了你的空間，你覺得很不舒服。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "空間", "禮儀"],
  options: {
    A: {
      text: "直接提醒對方注意空間。",
      statChanges: {
        心情: 6,
        決斷力: 3,
        社交傾向: 1,
        體力: -3,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 1 }],
      consequences: ["對方有些惱怒，但還是收起了腳。"],
    },
    B: {
      text: "委婉地提醒對方。",
      statChanges: {
        心情: 4,
        同理心: 2,
        決斷力: 1,
        體力: -2,
      },
      consequences: ["你友善地提醒，對方不好意思地道歉。"],
    },
    C: {
      text: "故意擠回去，爭取空間。",
      statChanges: {
        心情: -2,
        穩定性: -1,
        社交傾向: -1,
        體力: -2,
      },
      consequences: ["你們互相擠來擠去，氣氛有些尷尬。"],
    },
    D: {
      text: "默默忍受，往旁邊挪一點。",
      statChanges: {
        心情: -4,
        穩定性: 1,
        決斷力: -1,
        同理心: -1,
      },
      consequences: ["你選擇了忍耐，但心裡很不舒服。"],
    },
  },
};

export const COMMUTE012: ExtendedEvent = {
  id: "COMMUTE012",
  name: "睡著的鄰座",
  description: "旁邊的乘客睡著了，頭漸漸靠到你的肩膀上，你不知該怎麼辦。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["通勤", "尷尬", "同理心"],
  options: {
    A: {
      text: "輕輕推醒對方。",
      statChanges: {
        心情: 3,
        同理心: 2,
        決斷力: 1,
        體力: -1,
      },
      consequences: ["對方醒來後很不好意思地道歉。"],
    },
    B: {
      text: "讓對方繼續睡，自己忍耐。",
      statChanges: {
        心情: 5,
        同理心: 3,
        穩定性: 2,
        體力: -2,
      },
      consequences: ["你選擇了體諒對方，心裡覺得很溫暖。"],
    },
    C: {
      text: "故意動一下，讓對方醒來。",
      statChanges: {
        心情: 1,
        穩定性: 1,
        同理心: -1,
        體力: 0,
      },
      consequences: ["對方醒來後有些尷尬，你心裡也有些過意不去。"],
    },
    D: {
      text: "直接起身換座位。",
      statChanges: {
        心情: 2,
        決斷力: 1,
        體力: -1,
        社交傾向: -1,
      },
      consequences: ["你換到了其他座位，避免了尷尬。"],
    },
  },
};

export const COMMUTE013: ExtendedEvent = {
  id: "COMMUTE013",
  name: "佔位的乘客",
  description: "有人用包包佔了座位，但車廂很擁擠，你很想坐那個位子。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "佔位", "正義感"],
  options: {
    A: {
      text: "直接要求對方移開包包。",
      statChanges: {
        心情: 8,
        決斷力: 3,
        社交傾向: 1,
        體力: -2,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 1 }],
      consequences: ["對方有些不高興，但還是移開了包包。"],
    },
    B: {
      text: "禮貌地詢問是否可以坐這裡。",
      statChanges: {
        心情: 5,
        同理心: 2,
        決斷力: 1,
        體力: -1,
      },
      consequences: ["對方友善地移開了包包，讓你坐下。"],
    },
    C: {
      text: "默默等待其他座位。",
      statChanges: {
        心情: -2,
        穩定性: 1,
        決斷力: -1,
        同理心: -1,
      },
      consequences: ["你選擇了等待，但心裡有些不舒服。"],
    },
    D: {
      text: "故意坐在包包上。",
      statChanges: {
        心情: -5,
        穩定性: -2,
        社交傾向: -1,
        體力: -1,
      },
      consequences: ["對方很生氣，你們起了爭執。"],
    },
  },
};

export const COMMUTE014: ExtendedEvent = {
  id: "COMMUTE014",
  name: "疑似偷拍",
  description: "你注意到旁邊有人拿著手機，角度很奇怪，疑似在偷拍。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.HARD,
  tags: ["通勤", "隱私", "安全"],
  options: {
    A: {
      text: "直接質問對方在做什麼。",
      statChanges: {
        心情: 10,
        決斷力: 4,
        社交傾向: 2,
        體力: -5,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 2 }],
      consequences: ["對方否認並收起手機，你覺得很有正義感。"],
    },
    B: {
      text: "用眼神警告對方。",
      statChanges: {
        心情: 6,
        決斷力: 2,
        社交傾向: 0,
        體力: -2,
      },
      consequences: ["對方注意到了你的眼神，收起了手機。"],
    },
    C: {
      text: "換到其他位置。",
      statChanges: {
        心情: 3,
        決斷力: 1,
        體力: -2,
        穩定性: 1,
      },
      consequences: ["你換到了安全的位置，但心裡還是有些擔心。"],
    },
    D: {
      text: "假裝沒看見，但心裡很不安。",
      statChanges: {
        心情: -8,
        穩定性: -2,
        決斷力: -1,
        體力: -1,
      },
      consequences: ["你選擇了沉默，但心裡很不安和憤怒。"],
    },
  },
};

export const COMMUTE015: ExtendedEvent = {
  id: "COMMUTE015",
  name: "需要座位的老人",
  description: "車廂裡來了一位老人，看起來很累，但沒有人讓座。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["通勤", "讓座", "同理心"],
  options: {
    A: {
      text: "立即起身讓座。",
      statChanges: {
        心情: 12,
        同理心: 4,
        社交傾向: 2,
        體力: -3,
      },
      consequences: ["老人非常感激，你心裡覺得很溫暖。"],
    },
    B: {
      text: "假裝沒看見，繼續坐著。",
      statChanges: {
        心情: -8,
        同理心: -3,
        穩定性: -1,
        社交傾向: -1,
      },
      consequences: ["你選擇了無視，但心裡很愧疚。"],
    },
    C: {
      text: "等別人先讓座。",
      statChanges: {
        心情: -3,
        同理心: -1,
        穩定性: 1,
        體力: 0,
      },
      consequences: ["你等待著別人讓座，但心裡有些不安。"],
    },
    D: {
      text: "提醒其他乘客讓座。",
      statChanges: {
        心情: 8,
        同理心: 2,
        決斷力: 2,
        體力: -2,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 1 }],
      consequences: ["你提醒了其他乘客，有人讓出了座位。"],
    },
  },
};

export const COMMUTE016: ExtendedEvent = {
  id: "COMMUTE016",
  name: "需要座位的老人(站著)",
  description: "車廂裡來了一位老人，看起來很累，但沒有人讓座。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["通勤", "讓座", "同理心"],
  options: {
    A: {
      text: "立即起身讓座。",
      statChanges: {
        心情: 12,
        同理心: 4,
        社交傾向: 2,
        體力: -3,
      },
      consequences: ["老人非常感激，你心裡覺得很溫暖。"],
    },
    B: {
      text: "假裝沒看見，繼續坐著。",
      statChanges: {
        心情: -8,
        同理心: -3,
        穩定性: -1,
        社交傾向: -1,
      },
      consequences: ["你選擇了無視，但心裡很愧疚。"],
    },
    C: {
      text: "等別人先讓座。",
      statChanges: {
        心情: -3,
        同理心: -1,
        穩定性: 1,
        體力: 0,
      },
      consequences: ["你等待著別人讓座，但心裡有些不安。"],
    },
    D: {
      text: "提醒其他乘客讓座。",
      statChanges: {
        心情: 8,
        同理心: 2,
        決斷力: 2,
        體力: -2,
      },
      conditions: [{ stat: "決斷力", operator: "gte", value: 1 }],
      consequences: ["你提醒了其他乘客，有人讓出了座位。"],
    },
  },
};

// 便利商店相關事件
export const COMMUTE022: ExtendedEvent = {
  id: "COMMUTE022",
  name: "便利商店購物",
  description: "路過便利商店，你突然想買些東西。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["購物", "選擇", "便利商店"],
  options: {
    A: {
      text: "買些零食和飲料",
      statChanges: {
        心情: 2,
        體力: -1,
        儲蓄: -3,
      },
      consequences: ["你買了一些零食和飲料，心情變好了，但對健康不太好"],
    },
    B: {
      text: "只買必需品",
      statChanges: {
        儲蓄: 1,
        體力: 1,
      },
      consequences: ["你克制了購物慾望，省下了一些錢"],
    },
    C: {
      text: "什麼都不買",
      statChanges: {
        儲蓄: 2,
        決斷力: 1,
      },
      consequences: ["你成功克制了購物衝動，省下了錢"],
    },
  },
};

export const COMMUTE023: ExtendedEvent = {
  id: "COMMUTE023",
  name: "商品選擇困難",
  description: "面對眾多商品選擇，你感到猶豫不決。該買哪個品牌？哪個口味？",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["選擇困難", "購物", "決策"],
  options: {
    A: {
      text: "選擇最便宜的",
      statChanges: {
        儲蓄: 2,
        心情: -1,
      },
      consequences: ["你選擇了最便宜的選項，省了錢但不太滿意"],
    },
    B: {
      text: "選擇最貴的",
      statChanges: {
        儲蓄: -3,
        心情: 2,
        專注力: 1,
      },
      consequences: ["你選擇了高品質商品，很滿意但花了不少錢"],
    },
    C: {
      text: "選擇中等價位",
      statChanges: {
        儲蓄: -1,
        心情: 1,
        穩定性: 1,
      },
      consequences: ["你在價格和品質間找到了平衡"],
    },
  },
};

export const COMMUTE024: ExtendedEvent = {
  id: "COMMUTE024",
  name: "排隊結帳",
  description: "結帳時發現前面有長長的隊伍，你該如何應對？",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["排隊", "耐心", "時間管理"],
  options: {
    A: {
      text: "耐心等待",
      statChanges: {
        穩定性: 2,
        時間感: -2,
      },
      consequences: ["你耐心地等待，展現了良好的修養"],
    },
    B: {
      text: "換到其他收銀台",
      statChanges: {
        時間感: 1,
        穩定性: -1,
      },
      consequences: ["你找到了更短的隊伍，節省了時間"],
    },
    C: {
      text: "放棄購買",
      statChanges: {
        儲蓄: 1,
        時間感: 1,
        決斷力: 1,
      },
      consequences: ["你決定不買了，省下時間和金錢"],
    },
  },
};

export const COMMUTE025: ExtendedEvent = {
  id: "COMMUTE025",
  name: "商品缺貨",
  description: "你想要買的商品剛好缺貨了，店員建議你選擇其他替代品。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["缺貨", "替代品", "適應"],
  options: {
    A: {
      text: "接受店員建議",
      statChanges: {
        穩定性: 2,
        心情: 1,
      },
      consequences: ["你接受了店員的建議，發現了新的好商品"],
    },
    B: {
      text: "堅持要原商品",
      statChanges: {
        決斷力: 1,
        心情: -1,
        時間感: -1,
      },
      consequences: ["你堅持要原商品，但可能需要等待"],
    },
    C: {
      text: "去其他商店找",
      statChanges: {
        時間感: -2,
        決斷力: 1,
        儲蓄: -1,
      },
      consequences: ["你決定去其他商店尋找，花費了更多時間"],
    },
  },
};

export const COMMUTE026: ExtendedEvent = {
  id: "COMMUTE026",
  name: "店員推薦",
  description: "店員熱情地向你推薦新商品，你該如何回應？",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["推薦", "社交", "決策"],
  options: {
    A: {
      text: "接受推薦",
      statChanges: {
        社交傾向: 1,
        儲蓄: -2,
        心情: 1,
      },
      consequences: ["你接受了店員的推薦，建立了良好的互動"],
    },
    B: {
      text: "禮貌拒絕",
      statChanges: {
        社交傾向: 1,
        決斷力: 1,
        儲蓄: 1,
      },
      consequences: ["你禮貌地拒絕了，展現了良好的社交技巧"],
    },
    C: {
      text: "詢問更多資訊",
      statChanges: {
        社交傾向: 2,
        好奇心: 1,
        時間感: -1,
      },
      consequences: ["你詢問了更多資訊，學到了新知識"],
    },
  },
};

// 電扶梯相關事件
export const COMMUTE017: ExtendedEvent = {
  id: "COMMUTE017",
  name: "電扶梯左側行走",
  description: "你站在電扶梯右側，有人想從左側快速通過，但你擋住了通道",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["電扶梯", "禮讓", "安全"],
  options: {
    A: {
      text: "主動讓出左側空間",
      statChanges: {
        同理心: 2,
        穩定性: 1,
      },
      consequences: ["你主動讓出空間，展現了良好的禮儀"],
    },
    B: {
      text: "保持原位不動",
      statChanges: {
        決斷力: 1,
        穩定性: -1,
      },
      consequences: ["你堅持了正確的禮儀，但心裡有點不舒服"],
    },
    C: {
      text: "提醒對方注意安全",
      statChanges: {
        決斷力: 1,
        同理心: 1,
      },
      consequences: ["你友善地提醒對方，展現了關懷"],
    },
  },
};

export const COMMUTE018: ExtendedEvent = {
  id: "COMMUTE018",
  name: "前方背包擠壓",
  description: "前方乘客的背包快擠到你了",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["電扶梯", "背包", "空間"],
  options: {
    A: {
      text: "禮貌地請對方調整背包",
      statChanges: {
        社交傾向: 2,
        同理心: 1,
      },
      consequences: ["你友善地提醒，對方理解地調整了背包"],
    },
    B: {
      text: "默默往後退一步",
      statChanges: {
        穩定性: 2,
        決斷力: -1,
      },
      consequences: ["你選擇了忍耐，展現了耐心"],
    },
    C: {
      text: "直接推開背包",
      statChanges: {
        決斷力: 2,
        同理心: -2,
      },
      consequences: ["你直接行動，但可能引起衝突"],
    },
  },
};

export const COMMUTE019: ExtendedEvent = {
  id: "COMMUTE019",
  name: "電扶梯故障停機",
  description: "電扶梯突然停止運轉，你被困在中間",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.HARD,
  tags: ["電扶梯", "故障", "應急"],
  options: {
    A: {
      text: "冷靜等待工作人員處理",
      statChanges: {
        穩定性: 2,
        心情: -1,
      },
      consequences: ["你冷靜地等待，展現了良好的應急處理能力"],
    },
    B: {
      text: "嘗試自行走下電扶梯",
      statChanges: {
        決斷力: 2,
        心情: 1,
      },
      consequences: ["你勇敢地嘗試，成功脫困"],
    },
  },
};

export const COMMUTE020: ExtendedEvent = {
  id: "COMMUTE020",
  name: "電扶梯擁擠",
  description: "電扶梯上擠滿了人，你被夾在中間",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["電扶梯", "擁擠", "空間"],
  options: {
    A: {
      text: "耐心等待，保持禮貌",
      statChanges: {
        穩定性: 2,
        同理心: 1,
      },
      consequences: ["你耐心地等待，展現了良好的修養"],
    },
    B: {
      text: "嘗試擠到前面",
      statChanges: {
        決斷力: 2,
        同理心: -1,
      },
      consequences: ["你積極爭取空間，但可能影響他人"],
    },
    C: {
      text: "改走樓梯",
      statChanges: {
        體力: 1,
        穩定性: 1,
      },
      consequences: ["你選擇了更健康的方式，順便運動"],
    },
  },
};

export const COMMUTE021: ExtendedEvent = {
  id: "COMMUTE021",
  name: "電扶梯禮讓老人",
  description: "電扶梯上遇到行動不便的老人",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["電扶梯", "禮讓", "老人"],
  options: {
    A: {
      text: "主動讓出位置並協助",
      statChanges: {
        同理心: 3,
        決斷力: 1,
      },
      consequences: ["你主動協助老人，展現了關懷和領導力"],
    },
    B: {
      text: "保持距離，默默等待",
      statChanges: {
        穩定性: 1,
        同理心: 1,
      },
      consequences: ["你默默地等待，展現了耐心"],
    },
    C: {
      text: "催促老人快點",
      statChanges: {
        同理心: -2,
        心情: 1,
      },
      consequences: ["你催促老人，但心裡有些愧疚"],
    },
  },
};

export const COMMUTE027: ExtendedEvent = {
  id: "COMMUTE027",
  name: "後面的人站很近",
  description: "電扶梯上後面的人站得離你很近，讓你感到不舒服",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["電扶梯", "空間", "不適"],
  options: {
    A: {
      text: "禮貌地請對方保持距離",
      statChanges: {
        決斷力: 2,
        社交傾向: 1,
        體力: -2,
      },
      consequences: ["你友善地提醒，對方理解地往後退了一步"],
    },
    B: {
      text: "默默往前挪一點",
      statChanges: {
        穩定性: 2,
        決斷力: -1,
        體力: -1,
      },
      consequences: ["你選擇了忍耐，默默調整了位置"],
    },
    C: {
      text: "故意往後靠，讓對方感受到壓力",
      statChanges: {
        心情: -3,
        穩定性: -1,
        同理心: -1,
      },
      consequences: ["你故意往後靠，氣氛有些尷尬"],
    },
    D: {
      text: "加快腳步，快速離開",
      statChanges: {
        心情: 1,
        決斷力: 1,
        體力: -3,
      },
      consequences: ["你快速離開了電扶梯，避免了尷尬"],
    },
  },
};

export const COMMUTE028: ExtendedEvent = {
  id: "COMMUTE028",
  name: "前面的人玩手機不走",
  description: "電扶梯快到盡頭了，前面的人還在玩手機，擋住了去路",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["電扶梯", "手機", "阻擋"],
  options: {
    A: {
      text: "禮貌地提醒對方該走了",
      statChanges: {
        決斷力: 2,
        社交傾向: 1,
        體力: -1,
      },
      consequences: ["你友善地提醒，對方趕緊收起手機離開了"],
    },
    B: {
      text: "用眼神示意，希望對方注意到",
      statChanges: {
        穩定性: 2,
        社交傾向: -1,
        體力: 0,
      },
      consequences: ["對方注意到了你的眼神，趕緊離開了"],
    },
    C: {
      text: "從旁邊繞過去",
      statChanges: {
        決斷力: 1,
        體力: -2,
        穩定性: 1,
      },
      consequences: ["你從旁邊繞了過去，避免了衝突"],
    },
    D: {
      text: "故意撞一下，讓對方注意",
      statChanges: {
        心情: -2,
        同理心: -1,
        穩定性: -1,
      },
      consequences: ["你故意撞了一下，對方很不高興，氣氛尷尬"],
    },
  },
};

// 小徑公園事件
export const COMMUTE029: ExtendedEvent = {
  id: "COMMUTE029",
  name: "陌生小徑的誘惑",
  description:
    "你發現了一條從未走過的小徑，看起來可以縮短路程，但你不確定是否安全。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "探索", "冒險"],
  options: {
    A: {
      text: "勇敢嘗試，走這條小徑。",
      statChanges: {
        心情: 8,
        冒險精神: 3,
        時間感: 2,
        體力: -5,
      },
      consequences: ["你選擇了探索新路徑，發現了一條美麗的小徑，心情愉悅。"],
    },
    B: {
      text: "先觀察一下，確認安全再走。",
      statChanges: {
        心情: 2,
        穩定性: 2,
        時間感: -1,
        體力: -2,
      },
      consequences: ["你謹慎地觀察了一會，確認安全後才走，心裡很踏實。"],
    },
    C: {
      text: "還是走熟悉的路，比較安全。",
      statChanges: {
        心情: -3,
        穩定性: 1,
        冒險精神: -1,
        體力: 0,
      },
      consequences: ["你選擇了安全的路線，但心裡有點遺憾，錯過了探索的機會。"],
    },
  },
};

export const COMMUTE030: ExtendedEvent = {
  id: "COMMUTE030",
  name: "小徑上的偶遇",
  description: "在小徑上遇到了一個陌生人，對方看起來很友善，但這條路很偏僻。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["通勤", "社交", "安全"],
  options: {
    A: {
      text: "主動打招呼，聊幾句。",
      statChanges: {
        心情: 6,
        社交傾向: 2,
        同理心: 1,
        體力: -3,
      },
      consequences: [
        "你們聊得很愉快，對方告訴你這條小徑的歷史，你學到了新知識。",
      ],
    },
    B: {
      text: "點頭示意，保持距離。",
      statChanges: {
        心情: 1,
        穩定性: 2,
        體力: -1,
      },
      consequences: ["你禮貌地點頭，對方也友善地回應，氣氛很和諧。"],
    },
    C: {
      text: "加快腳步，快速通過。",
      statChanges: {
        心情: -5,
        穩定性: 1,
        體力: -8,
        社交傾向: -1,
      },
      consequences: ["你選擇了快速通過，心裡有些緊張，但安全到達了目的地。"],
    },
  },
};

export const COMMUTE031: ExtendedEvent = {
  id: "COMMUTE031",
  name: "小徑的岔路選擇",
  description:
    "小徑前方出現了岔路，一條看起來更短但較陡，另一條較平緩但繞遠路。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["通勤", "選擇", "體力"],
  options: {
    A: {
      text: "選擇較短但陡峭的路徑。",
      statChanges: {
        心情: 4,
        體力: -10,
        時間感: 3,
        冒險精神: 1,
      },
      consequences: ["你選擇了挑戰性的路徑，雖然累但節省了時間，很有成就感。"],
    },
    B: {
      text: "選擇平緩但較長的路徑。",
      statChanges: {
        心情: 2,
        體力: -3,
        時間感: -2,
        穩定性: 1,
      },
      consequences: ["你選擇了舒適的路徑，雖然多花了時間，但走得很輕鬆。"],
    },
    C: {
      text: "回到大路，不走小徑了。",
      statChanges: {
        心情: -2,
        體力: 0,
        時間感: -1,
        穩定性: 2,
      },
      consequences: ["你選擇了回到熟悉的大路，雖然繞遠了，但心裡很踏實。"],
    },
  },
};

// 大公園事件
export const COMMUTE032: ExtendedEvent = {
  id: "COMMUTE032",
  name: "晨間公園早餐",
  description: "你決定在公園裡吃早餐，享受早晨的陽光和新鮮空氣。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["早餐", "公園", "放鬆"],
  options: {
    A: {
      text: "找個安靜的角落，慢慢享用。",
      statChanges: {
        心情: 12,
        體力: 8,
        時間感: -3,
        專注力: 2,
      },
      consequences: ["你在公園裡享受了寧靜的早餐時光，心情非常愉悅。"],
    },
    B: {
      text: "在長椅上快速吃完。",
      statChanges: {
        心情: 6,
        體力: 4,
        時間感: 1,
        穩定性: 1,
      },
      consequences: [
        "你快速地在公園裡吃了早餐，既享受了環境又沒耽誤太多時間。",
      ],
    },
    C: {
      text: "邊走邊吃，趕時間。",
      statChanges: {
        心情: 2,
        體力: 2,
        時間感: 2,
        穩定性: -1,
      },
      consequences: ["你邊走邊吃，雖然有點匆忙，但還是享受了公園的氛圍。"],
    },
  },
};

export const COMMUTE033: ExtendedEvent = {
  id: "COMMUTE033",
  name: "鄰居遛狗相遇",
  description: "在公園裡遇到了鄰居在遛狗，狗狗很可愛，鄰居也很友善。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["社交", "鄰居", "寵物"],
  options: {
    A: {
      text: "停下來和鄰居聊天，逗逗狗狗。",
      statChanges: {
        心情: 10,
        社交傾向: 3,
        同理心: 2,
        時間感: -2,
      },
      consequences: ["你和鄰居聊得很開心，狗狗也很喜歡你，心情很好。"],
    },
    B: {
      text: "簡單打個招呼，繼續趕路。",
      statChanges: {
        心情: 4,
        社交傾向: 1,
        時間感: 1,
        穩定性: 1,
      },
      consequences: ["你友善地打了招呼，既保持了社交禮貌又沒耽誤太多時間。"],
    },
    C: {
      text: "假裝沒看見，快速通過。",
      statChanges: {
        心情: -3,
        社交傾向: -1,
        時間感: 2,
        同理心: -1,
      },
      consequences: ["你選擇了迴避，但心裡有些愧疚，覺得自己不夠友善。"],
    },
  },
};

export const COMMUTE034: ExtendedEvent = {
  id: "COMMUTE034",
  name: "公園晨運的誘惑",
  description: "看到公園裡有人在晨運，你也有點想加入，但時間有點緊。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["運動", "健康", "時間"],
  options: {
    A: {
      text: "加入晨運，做簡單的伸展。",
      statChanges: {
        心情: 8,
        體力: 6,
        時間感: -3,
        健康: 2,
      },
      consequences: ["你做了簡單的晨運，身體感覺很舒服，精神也很好。"],
    },
    B: {
      text: "快速走一圈，當作熱身。",
      statChanges: {
        心情: 4,
        體力: 3,
        時間感: -1,
        健康: 1,
      },
      consequences: ["你快速地在公園裡走了一圈，既運動了又沒耽誤太多時間。"],
    },
    C: {
      text: "還是趕時間，直接去公司。",
      statChanges: {
        心情: -2,
        體力: 0,
        時間感: 2,
        健康: -1,
      },
      consequences: ["你選擇了趕時間，但心裡有點遺憾，錯過了運動的機會。"],
    },
  },
};

// 小徑公園負面事件
export const COMMUTE035: ExtendedEvent = {
  id: "COMMUTE035",
  name: "小徑上的迷路",
  description: "你走進了小徑深處，發現自己迷路了，周圍都是陌生的環境。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.HARD,
  tags: ["迷路", "恐慌", "時間"],
  options: {
    A: {
      text: "保持冷靜，慢慢找路。",
      statChanges: {
        心情: -8,
        穩定性: -2,
        時間感: -5,
        體力: -10,
      },
      consequences: [
        "你努力保持冷靜，但心裡還是很恐慌，花了很多時間才找到出路。",
      ],
    },
    B: {
      text: "加快腳步，到處亂走。",
      statChanges: {
        心情: -12,
        穩定性: -3,
        體力: -15,
        時間感: -3,
      },
      consequences: ["你慌張地到處亂走，越走越遠，體力消耗很大。"],
    },
    C: {
      text: "打電話求救。",
      statChanges: {
        心情: -6,
        社交傾向: -2,
        決斷力: -1,
        時間感: -4,
      },
      consequences: ["你打電話求救，但感到很尷尬，浪費了很多時間。"],
    },
  },
};

export const COMMUTE036: ExtendedEvent = {
  id: "COMMUTE036",
  name: "小徑上的野狗",
  description: "小徑上突然出現了幾隻野狗，對著你狂吠，看起來很兇猛。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.HARD,
  tags: ["野狗", "恐懼", "安全"],
  options: {
    A: {
      text: "慢慢後退，保持冷靜。",
      statChanges: {
        心情: -10,
        穩定性: -3,
        體力: -8,
        時間感: -3,
      },
      consequences: ["你慢慢後退，但心裡非常恐懼，花了很多時間才安全離開。"],
    },
    B: {
      text: "轉身就跑。",
      statChanges: {
        心情: -15,
        穩定性: -4,
        體力: -20,
        時間感: -2,
      },
      consequences: ["你驚慌地逃跑，體力消耗極大，心裡留下了陰影。"],
    },
    C: {
      text: "大聲喊叫，試圖嚇走野狗。",
      statChanges: {
        心情: -8,
        社交傾向: -1,
        體力: -5,
        穩定性: -2,
      },
      consequences: ["你大聲喊叫，但野狗更兇了，你感到非常無助。"],
    },
  },
};

export const COMMUTE037: ExtendedEvent = {
  id: "COMMUTE037",
  name: "小徑上的垃圾",
  description: "小徑上到處都是垃圾，空氣中瀰漫著臭味，你感到很不舒服。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["垃圾", "環境", "不適"],
  options: {
    A: {
      text: "快速通過，忍受臭味。",
      statChanges: {
        心情: -6,
        體力: -5,
        穩定性: -1,
        時間感: -1,
      },
      consequences: ["你快速通過，但臭味讓你很不舒服，心情變差了。"],
    },
    B: {
      text: "繞道而行，走更遠的路。",
      statChanges: {
        心情: -4,
        體力: -8,
        時間感: -4,
        穩定性: -1,
      },
      consequences: ["你選擇繞道，但多走了很多路，體力和時間都消耗很大。"],
    },
    C: {
      text: "原路返回，不走這條路了。",
      statChanges: {
        心情: -3,
        體力: -3,
        時間感: -2,
        冒險精神: -2,
      },
      consequences: ["你選擇了放棄，心裡有些遺憾，錯過了探索的機會。"],
    },
  },
};

// 大公園負面事件
export const COMMUTE038: ExtendedEvent = {
  id: "COMMUTE038",
  name: "公園裡的爭吵",
  description: "公園裡有人在激烈爭吵，氣氛很緊張，你剛好路過。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["爭吵", "衝突", "不適"],
  options: {
    A: {
      text: "快速通過，假裝沒看見。",
      statChanges: {
        心情: -5,
        同理心: -1,
        穩定性: -1,
        體力: -2,
      },
      consequences: ["你快速通過，但爭吵的聲音讓你心情變差，心裡有些不安。"],
    },
    B: {
      text: "繞道而行，避開爭吵。",
      statChanges: {
        心情: -3,
        體力: -5,
        時間感: -2,
        穩定性: -1,
      },
      consequences: ["你選擇繞道，多走了很多路，體力消耗很大。"],
    },
    C: {
      text: "試圖勸架，但被捲入爭吵。",
      statChanges: {
        心情: -12,
        社交傾向: -2,
        穩定性: -3,
        體力: -8,
      },
      consequences: ["你試圖勸架，但被捲入了爭吵，心情非常糟糕。"],
    },
  },
};

export const COMMUTE039: ExtendedEvent = {
  id: "COMMUTE039",
  name: "公園裡的噪音",
  description: "公園裡有人在放音樂、跳舞，聲音很大，影響了你的心情。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["噪音", "干擾", "煩躁"],
  options: {
    A: {
      text: "忍受噪音，繼續走自己的路。",
      statChanges: {
        心情: -8,
        穩定性: -2,
        專注力: -3,
        體力: -3,
      },
      consequences: ["你忍受著噪音，但心情變得很煩躁，無法專心。"],
    },
    B: {
      text: "換條路走，避開噪音。",
      statChanges: {
        心情: -4,
        體力: -6,
        時間感: -2,
        穩定性: -1,
      },
      consequences: ["你換了條路，但多走了很多路，體力消耗很大。"],
    },
    C: {
      text: "上前要求他們降低音量。",
      statChanges: {
        心情: -10,
        社交傾向: -2,
        穩定性: -2,
        體力: -4,
      },
      consequences: ["你上前要求，但對方不聽，反而更吵了，你感到很無助。"],
    },
  },
};

export const COMMUTE040: ExtendedEvent = {
  id: "COMMUTE040",
  name: "公園裡的擁擠",
  description: "公園裡擠滿了人，到處都是遊客，你感到很不舒服。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["擁擠", "人群", "不適"],
  options: {
    A: {
      text: "在人群中慢慢前進。",
      statChanges: {
        心情: -6,
        體力: -8,
        穩定性: -2,
        時間感: -3,
      },
      consequences: ["你在擁擠的人群中慢慢前進，體力消耗很大，心情變差。"],
    },
    B: {
      text: "找個安靜的角落等待。",
      statChanges: {
        心情: -4,
        體力: -2,
        時間感: -5,
        穩定性: -1,
      },
      consequences: ["你找了個角落等待，但浪費了很多時間，心裡有些煩躁。"],
    },
    C: {
      text: "直接離開公園，走其他路。",
      statChanges: {
        心情: -3,
        體力: -4,
        時間感: -2,
        社交傾向: -1,
      },
      consequences: ["你選擇離開，但多走了很多路，心裡有些遺憾。"],
    },
  },
};

// 小徑公園詭異事件
export const COMMUTE041: ExtendedEvent = {
  id: "COMMUTE041",
  name: "詭異男子的注視",
  description:
    "小徑上有一個看起來很詭異的男子，一直盯著你看，讓你感到很不舒服。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.HARD,
  tags: ["詭異", "恐懼", "安全"],
  options: {
    A: {
      text: "加快腳步，快速離開。",
      statChanges: {
        心情: -10,
        穩定性: -3,
        體力: -8,
        時間感: -2,
      },
      consequences: ["你加快腳步離開，但心裡非常恐懼，體力消耗很大。"],
    },
    B: {
      text: "假裝打電話，讓對方知道有人注意到你。",
      statChanges: {
        心情: -8,
        穩定性: -2,
        社交傾向: -1,
        體力: -3,
      },
      consequences: ["你假裝打電話，但心裡還是很緊張，感覺很不安。"],
    },
    C: {
      text: "轉身往回走，避開這個人。",
      statChanges: {
        心情: -6,
        體力: -5,
        時間感: -4,
        穩定性: -1,
      },
      consequences: ["你選擇了避開，但多走了很多路，浪費了時間。"],
    },
    D: {
      text: "直視對方，試圖嚇退他。",
      statChanges: {
        心情: -12,
        穩定性: -4,
        決斷力: -2,
        體力: -6,
      },
      consequences: ["你直視對方，但對方沒有退縮，反而讓你更害怕了。"],
    },
  },
};

// 街道詭異事件
export const COMMUTE042: ExtendedEvent = {
  id: "COMMUTE042",
  name: "跟在背後的大叔",
  description:
    "你發現有個大叔一直跟在你後面，已經走了好幾條街了，讓你感到很不安全。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.HARD,
  tags: ["跟蹤", "恐懼", "安全"],
  options: {
    A: {
      text: "加快腳步，試圖甩開他。",
      statChanges: {
        心情: -12,
        穩定性: -3,
        體力: -15,
        時間感: -2,
      },
      consequences: [
        "你加快腳步，但對方也跟著加快，你感到非常恐懼，體力消耗極大。",
      ],
    },
    B: {
      text: "故意繞路，測試他是否真的在跟蹤。",
      statChanges: {
        心情: -8,
        穩定性: -2,
        體力: -10,
        時間感: -5,
      },
      consequences: ["你故意繞路，發現對方真的在跟蹤你，心裡更加不安。"],
    },
    C: {
      text: "走進便利商店，尋求幫助。",
      statChanges: {
        心情: -6,
        社交傾向: -1,
        時間感: -3,
        體力: -2,
      },
      consequences: ["你走進便利商店，但對方在門口等著，你感到很無助。"],
    },
    D: {
      text: "轉身質問對方為什麼跟著你。",
      statChanges: {
        心情: -15,
        穩定性: -4,
        決斷力: -2,
        體力: -8,
      },
      consequences: ["你轉身質問，但對方否認在跟蹤，氣氛變得很尷尬和緊張。"],
    },
  },
};

// 便利商店特價事件
export const COMMUTE043: ExtendedEvent = {
  id: "COMMUTE043",
  name: "限時特價商品",
  description:
    "便利商店裡有商品正在限時特價，價格很吸引人，但你原本沒有打算買東西。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["特價", "購物", "誘惑"],
  options: {
    A: {
      text: "買一些特價商品，反正很便宜。",
      statChanges: {
        心情: 6,
        儲蓄: -50,
        體力: -2,
        時間感: -2,
      },
      consequences: ["你買了一些特價商品，心情很好，但花了一些錢和時間。"],
    },
    B: {
      text: "只買真正需要的東西。",
      statChanges: {
        心情: 3,
        儲蓄: -20,
        決斷力: 2,
        時間感: -1,
      },
      consequences: ["你克制了購物慾望，只買了需要的東西，感覺很有自制力。"],
    },
    C: {
      text: "看看就好，不買任何東西。",
      statChanges: {
        心情: -2,
        儲蓄: 0,
        決斷力: 3,
        時間感: -1,
      },
      consequences: ["你克制了購物衝動，但心裡有點遺憾，錯過了便宜的商品。"],
    },
    D: {
      text: "買很多，囤積起來。",
      statChanges: {
        心情: 8,
        儲蓄: -100,
        體力: -5,
        時間感: -3,
      },
      consequences: ["你買了很多特價商品，心情很好，但花了很多錢和時間。"],
    },
  },
};

// 閘門相關事件
export const COMMUTE044: ExtendedEvent = {
  id: "COMMUTE044",
  name: "閘門卡住",
  description: "你的交通卡在閘門刷卡時卡住了，後面有人在排隊，你感到很尷尬。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["閘門", "交通卡", "尷尬"],
  options: {
    A: {
      text: "反覆刷卡，試圖解決問題。",
      statChanges: {
        心情: -6,
        穩定性: -2,
        時間感: -3,
        體力: -3,
      },
      consequences: ["你反覆刷卡，但卡還是卡住了，後面的人開始不耐煩。"],
    },
    B: {
      text: "尋求站務人員協助。",
      statChanges: {
        心情: -3,
        社交傾向: -1,
        時間感: -4,
        體力: -2,
      },
      consequences: ["你尋求協助，但需要等待站務人員，浪費了很多時間。"],
    },
    C: {
      text: "讓後面的人先過，自己慢慢處理。",
      statChanges: {
        心情: -2,
        同理心: 2,
        時間感: -2,
        穩定性: 1,
      },
      consequences: ["你讓其他人先過，展現了禮貌，但還是要處理自己的問題。"],
    },
    D: {
      text: "強行推開閘門。",
      statChanges: {
        心情: -8,
        穩定性: -3,
        決斷力: -2,
        體力: -5,
      },
      consequences: ["你強行推開閘門，但引起了警報，被站務人員攔下。"],
    },
  },
};

export const COMMUTE045: ExtendedEvent = {
  id: "COMMUTE045",
  name: "餘額不足",
  description: "刷卡時發現交通卡餘額不足，無法通過閘門，你感到很困擾。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["餘額", "交通卡", "金錢"],
  options: {
    A: {
      text: "立即去加值機加值。",
      statChanges: {
        心情: -4,
        儲蓄: -50,
        時間感: -3,
        體力: -2,
      },
      consequences: ["你立即去加值，但浪費了時間，還花了一些錢。"],
    },
    B: {
      text: "用現金買單程票。",
      statChanges: {
        心情: -2,
        儲蓄: -30,
        時間感: -2,
        體力: -1,
      },
      consequences: ["你買了單程票，雖然貴一點，但比較快。"],
    },
    C: {
      text: "回家拿錢包，重新出門。",
      statChanges: {
        心情: -8,
        時間感: -8,
        體力: -10,
        穩定性: -2,
      },
      consequences: ["你回家拿錢包，浪費了很多時間，心情很糟糕。"],
    },
    D: {
      text: "向路人借錢。",
      statChanges: {
        心情: -6,
        社交傾向: -2,
        穩定性: -1,
        體力: -3,
      },
      consequences: ["你向路人借錢，但被拒絕了，感到很尷尬。"],
    },
  },
};

export const COMMUTE046: ExtendedEvent = {
  id: "COMMUTE046",
  name: "閘門故障",
  description: "閘門出現故障，無法正常開啟，大家都在等待維修。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["故障", "等待", "延誤"],
  options: {
    A: {
      text: "耐心等待維修完成。",
      statChanges: {
        心情: -5,
        穩定性: 2,
        時間感: -5,
        體力: -2,
      },
      consequences: ["你耐心等待，展現了良好的修養，但浪費了很多時間。"],
    },
    B: {
      text: "尋找其他閘門。",
      statChanges: {
        心情: -3,
        體力: -4,
        時間感: -2,
        決斷力: 1,
      },
      consequences: ["你找到了其他閘門，但多走了很多路。"],
    },
    C: {
      text: "詢問站務人員其他出口。",
      statChanges: {
        心情: -2,
        社交傾向: 1,
        時間感: -3,
        體力: -2,
      },
      consequences: ["你詢問了其他出口，但需要繞很遠的路。"],
    },
    D: {
      text: "抱怨並要求賠償。",
      statChanges: {
        心情: -8,
        社交傾向: -2,
        穩定性: -2,
        體力: -3,
      },
      consequences: ["你抱怨並要求賠償，但沒有得到回應，心情更糟了。"],
    },
  },
};

export const COMMUTE047: ExtendedEvent = {
  id: "COMMUTE047",
  name: "忘記刷卡",
  description: "你通過閘門時忘記刷卡，被站務人員攔下要求補票。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.EASY,
  tags: ["忘記", "補票", "尷尬"],
  options: {
    A: {
      text: "立即道歉並補票。",
      statChanges: {
        心情: -4,
        儲蓄: -30,
        社交傾向: 1,
        時間感: -2,
      },
      consequences: ["你立即道歉並補票，展現了誠實的態度。"],
    },
    B: {
      text: "辯解說是系統問題。",
      statChanges: {
        心情: -6,
        社交傾向: -2,
        穩定性: -2,
        時間感: -3,
      },
      consequences: ["你辯解說是系統問題，但對方不相信，氣氛變得很尷尬。"],
    },
    C: {
      text: "假裝沒聽見，快速離開。",
      statChanges: {
        心情: -8,
        社交傾向: -3,
        穩定性: -3,
        體力: -5,
      },
      consequences: ["你假裝沒聽見快速離開，但被攔下了，情況更糟。"],
    },
    D: {
      text: "要求查看監控錄像。",
      statChanges: {
        心情: -5,
        決斷力: 1,
        時間感: -5,
        體力: -2,
      },
      consequences: ["你要求查看監控，但浪費了很多時間，最後還是要補票。"],
    },
  },
};

// 測試事件：條件限制驗證
export const COMMUTE048: ExtendedEvent = {
  id: "COMMUTE048",
  name: "條件限制測試事件",
  description:
    "這是一個測試事件，用來驗證各種條件限制的顯示和檢查是否正常工作。",
  category: EVENT_CATEGORIES.COMMUTE,
  difficulty: EVENT_DIFFICULTY.MEDIUM,
  tags: ["測試", "條件", "驗證"],
  options: {
    A: {
      text: "需要儲蓄 ≥ 500（大於等於測試）",
      statChanges: {
        心情: 5,
        儲蓄: -100,
      },
      conditions: [{ stat: "儲蓄", operator: "gte", value: 500 }],
      consequences: ["你成功選擇了需要儲蓄≥500的選項。"],
    },
    B: {
      text: "需要決斷力 ≤ 2（小於等於測試）",
      statChanges: {
        心情: 3,
        決斷力: -1,
      },
      conditions: [{ stat: "決斷力", operator: "lte", value: 2 }],
      consequences: ["你成功選擇了需要決斷力≤2的選項。"],
    },
    C: {
      text: "需要社交傾向 = 0（等於測試）",
      statChanges: {
        心情: 2,
        社交傾向: 1,
      },
      conditions: [{ stat: "社交傾向", operator: "eq", value: 0 }],
      consequences: ["你成功選擇了需要社交傾向=0的選項。"],
    },
    D: {
      text: "需要體力 > 50（大於測試）",
      statChanges: {
        心情: 4,
        體力: -10,
      },
      conditions: [{ stat: "體力", operator: "gt", value: 50 }],
      consequences: ["你成功選擇了需要體力>50的選項。"],
    },
    E: {
      text: "需要心情 < 80（小於測試）",
      statChanges: {
        心情: 5,
        穩定性: 1,
      },
      conditions: [{ stat: "心情", operator: "lt", value: 80 }],
      consequences: ["你成功選擇了需要心情<80的選項。"],
    },
    F: {
      text: "多重條件：儲蓄≥300 且 決斷力≥1",
      statChanges: {
        心情: 6,
        儲蓄: -200,
        決斷力: 1,
      },
      conditions: [
        { stat: "儲蓄", operator: "gte", value: 300 },
        { stat: "決斷力", operator: "gte", value: 1 },
      ],
      consequences: ["你成功選擇了需要多重條件的選項。"],
    },
  },
};

// 導出所有通勤事件
export const commuteEvents: ExtendedEvent[] = [
  COMMUTE001,
  COMMUTE002,
  COMMUTE003,
  COMMUTE004,
  COMMUTE005,
  COMMUTE006,
  COMMUTE007,
  COMMUTE008,
  COMMUTE009,
  COMMUTE010,
  COMMUTE011,
  COMMUTE012,
  COMMUTE013,
  COMMUTE014,
  COMMUTE015,
  COMMUTE016,
  COMMUTE017,
  COMMUTE018,
  COMMUTE019,
  COMMUTE020,
  COMMUTE021,
  COMMUTE022,
  COMMUTE023,
  COMMUTE024,
  COMMUTE025,
  COMMUTE026,
  COMMUTE027,
  COMMUTE028,
  COMMUTE029,
  COMMUTE030,
  COMMUTE031,
  COMMUTE032,
  COMMUTE033,
  COMMUTE034,
  COMMUTE035,
  COMMUTE036,
  COMMUTE037,
  COMMUTE038,
  COMMUTE039,
  COMMUTE040,
  COMMUTE041,
  COMMUTE042,
  COMMUTE043,
  COMMUTE044,
  COMMUTE045,
  COMMUTE046,
  COMMUTE047,
  COMMUTE048,
];
