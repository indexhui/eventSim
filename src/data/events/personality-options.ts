import { PlayerStats } from "../../types/game";
import { ExtendedEvent } from "./constants";

// 個性特質範圍定義
export const PERSONALITY_RANGES = {
  EXTROVERT: { min: 4, max: 10 }, // 明顯外向
  INTROVERT: { min: -10, max: -4 }, // 明顯內向
  EMPATHETIC: { min: 4, max: 10 }, // 高同理心
  DECISIVE: { min: 4, max: 10 }, // 高決斷力
  CURIOUS: { min: 4, max: 10 }, // 高好奇心
  STABLE: { min: 4, max: 10 }, // 高穩定性
  FOCUSED: { min: 4, max: 10 }, // 高專注力
  INDECISIVE: { min: -10, max: -4 }, // 優柔寡斷
  PEOPLE_PLEASER: { min: -10, max: -4 }, // 討好型人格（社交傾向低但同理心高）
} as const;

// 檢查玩家是否在特定個性範圍內
export function isInPersonalityRange(
  playerStats: PlayerStats,
  trait: keyof PlayerStats,
  range: keyof typeof PERSONALITY_RANGES
): boolean {
  const value = playerStats[trait];
  const { min, max } = PERSONALITY_RANGES[range];
  return value >= min && value <= max;
}

// 檢查是否為討好型人格（社交傾向低但同理心高）
export function isPeoplePleaser(playerStats: PlayerStats): boolean {
  return playerStats.社交傾向 <= -4 && playerStats.同理心 >= 4;
}

// 檢查是否容易內耗（穩定性低且決斷力低）
export function isProneToBurnout(playerStats: PlayerStats): boolean {
  return playerStats.穩定性 <= -4 && playerStats.決斷力 <= -4;
}

// 根據個性特質調整選項文本
export function adjustOptionText(
  originalText: string,
  playerStats: PlayerStats,
  context: string
): string {
  // 社交相關的調整
  if (
    context.includes("社交") ||
    context.includes("搭訕") ||
    context.includes("聊天")
  ) {
    if (isInPersonalityRange(playerStats, "社交傾向", "EXTROVERT")) {
      return originalText
        .replace("主動", "熱情地")
        .replace("打招呼", "興奮地打招呼");
    } else if (isInPersonalityRange(playerStats, "社交傾向", "INTROVERT")) {
      return originalText
        .replace("主動", "勉強地")
        .replace("打招呼", "小聲打招呼");
    }
  }

  // 拒絕相關的調整
  if (
    context.includes("拒絕") ||
    context.includes("不想") ||
    context.includes("不願意")
  ) {
    if (isPeoplePleaser(playerStats)) {
      return originalText
        .replace("拒絕", "勉強拒絕")
        .replace("不想", "不太想")
        .replace("不願意", "有點不願意");
    } else if (isInPersonalityRange(playerStats, "決斷力", "DECISIVE")) {
      return originalText
        .replace("拒絕", "堅定拒絕")
        .replace("不想", "堅決不想")
        .replace("不願意", "堅決不願意");
    }
  }

  // 內耗相關的調整
  if (
    context.includes("內耗") ||
    context.includes("勉強") ||
    context.includes("尷尬")
  ) {
    if (isProneToBurnout(playerStats)) {
      return originalText
        .replace("勉強", "非常勉強")
        .replace("尷尬", "極度尷尬")
        .replace("內耗", "嚴重內耗");
    } else if (isInPersonalityRange(playerStats, "穩定性", "STABLE")) {
      return originalText
        .replace("勉強", "稍微勉強")
        .replace("尷尬", "有點尷尬")
        .replace("內耗", "輕微內耗");
    }
  }

  // 同理心相關的調整
  if (
    context.includes("同理心") ||
    context.includes("幫助") ||
    context.includes("讓座")
  ) {
    if (isInPersonalityRange(playerStats, "同理心", "EMPATHETIC")) {
      return originalText
        .replace("讓座", "立即讓座")
        .replace("幫助", "主動幫助");
    }
  }

  // 決斷力相關的調整
  if (
    context.includes("決斷") ||
    context.includes("提醒") ||
    context.includes("指出")
  ) {
    if (isInPersonalityRange(playerStats, "決斷力", "DECISIVE")) {
      return originalText
        .replace("提醒", "直接提醒")
        .replace("指出", "堅定地指出");
    } else if (isInPersonalityRange(playerStats, "決斷力", "INDECISIVE")) {
      return originalText
        .replace("提醒", "猶豫地提醒")
        .replace("指出", "小聲地指出");
    }
  }

  // 好奇心相關的調整
  if (
    context.includes("探索") ||
    context.includes("嘗試") ||
    context.includes("新事物")
  ) {
    if (isInPersonalityRange(playerStats, "好奇心", "CURIOUS")) {
      return originalText
        .replace("嘗試", "興奮地嘗試")
        .replace("探索", "積極探索");
    }
  }

  // 穩定性相關的調整
  if (
    context.includes("忍耐") ||
    context.includes("等待") ||
    context.includes("冷靜")
  ) {
    if (isInPersonalityRange(playerStats, "穩定性", "STABLE")) {
      return originalText
        .replace("等待", "耐心等待")
        .replace("忍耐", "平靜地忍耐");
    } else if (isProneToBurnout(playerStats)) {
      return originalText
        .replace("等待", "焦躁地等待")
        .replace("忍耐", "痛苦地忍耐");
    }
  }

  return originalText;
}

// 根據個性特質調整選項的數值影響
export function adjustOptionStats(
  originalStats: Record<string, number>,
  playerStats: PlayerStats,
  context: string
): Record<string, number> {
  const adjustedStats = { ...originalStats };

  // 外向玩家在社交場合獲得更多正面影響
  if (
    context.includes("社交") &&
    isInPersonalityRange(playerStats, "社交傾向", "EXTROVERT")
  ) {
    if (adjustedStats.心情) adjustedStats.心情 += 8;
    if (adjustedStats.社交傾向) adjustedStats.社交傾向 += 1;
  }

  // 內向玩家在社交場合受到更多負面影響
  if (
    context.includes("社交") &&
    isInPersonalityRange(playerStats, "社交傾向", "INTROVERT")
  ) {
    if (adjustedStats.心情) adjustedStats.心情 -= 8;
    if (adjustedStats.體力) adjustedStats.體力 -= 5;
  }

  // 討好型人格在拒絕時受到更多內耗
  if (
    (context.includes("拒絕") || context.includes("不想")) &&
    isPeoplePleaser(playerStats)
  ) {
    if (adjustedStats.心情) adjustedStats.心情 -= 12;
    if (adjustedStats.穩定性) adjustedStats.穩定性 -= 3;
    if (adjustedStats.體力) adjustedStats.體力 -= 6;
  }

  // 優柔寡斷的玩家在需要決策時受到更多內耗
  if (
    context.includes("決策") &&
    isInPersonalityRange(playerStats, "決斷力", "INDECISIVE")
  ) {
    if (adjustedStats.心情) adjustedStats.心情 -= 8;
    if (adjustedStats.體力) adjustedStats.體力 -= 4;
    if (adjustedStats.穩定性) adjustedStats.穩定性 -= 2;
  }

  // 高同理心玩家在幫助他人時獲得更多正面影響
  if (
    context.includes("幫助") &&
    isInPersonalityRange(playerStats, "同理心", "EMPATHETIC")
  ) {
    if (adjustedStats.心情) adjustedStats.心情 += 6;
    if (adjustedStats.同理心) adjustedStats.同理心 += 1;
  }

  // 高決斷力玩家在需要決策時獲得更多正面影響
  if (
    context.includes("決策") &&
    isInPersonalityRange(playerStats, "決斷力", "DECISIVE")
  ) {
    if (adjustedStats.心情) adjustedStats.心情 += 4;
    if (adjustedStats.決斷力) adjustedStats.決斷力 += 1;
  }

  // 高穩定性玩家在壓力情況下受到較少負面影響
  if (
    context.includes("壓力") &&
    isInPersonalityRange(playerStats, "穩定性", "STABLE")
  ) {
    if (adjustedStats.心情 && adjustedStats.心情 < 0) adjustedStats.心情 += 4;
    if (adjustedStats.穩定性) adjustedStats.穩定性 += 1;
  }

  // 容易內耗的玩家在衝突情況下受到更多負面影響
  if (
    (context.includes("衝突") || context.includes("尷尬")) &&
    isProneToBurnout(playerStats)
  ) {
    if (adjustedStats.心情) adjustedStats.心情 -= 10;
    if (adjustedStats.體力) adjustedStats.體力 -= 5;
    if (adjustedStats.穩定性) adjustedStats.穩定性 -= 2;
  }

  return adjustedStats;
}

// 根據個性特質過濾或調整選項
export function getPersonalityAdjustedOptions(
  event: ExtendedEvent,
  playerStats: PlayerStats
): ExtendedEvent["options"] {
  const adjustedOptions: ExtendedEvent["options"] = {};

  for (const [key, option] of Object.entries(event.options)) {
    // 根據個性特質調整選項文本
    const adjustedText = adjustOptionText(
      option.text,
      playerStats,
      event.description
    );

    // 根據個性特質調整數值影響
    const adjustedStats = adjustOptionStats(
      option.statChanges,
      playerStats,
      event.description
    );

    adjustedOptions[key] = {
      ...option,
      text: adjustedText,
      statChanges: adjustedStats,
    };
  }

  return adjustedOptions;
}

// 根據個性特質添加特殊選項
export function addPersonalitySpecificOptions(
  event: ExtendedEvent,
  playerStats: PlayerStats
): ExtendedEvent["options"] {
  const options = { ...event.options };

  // 為討好型人格添加額外的妥協選項
  if (
    isPeoplePleaser(playerStats) &&
    (event.description.includes("拒絕") ||
      event.description.includes("不想")) &&
    !Object.values(options).some((opt) => opt.text.includes("勉強接受"))
  ) {
    options.D = {
      text: "勉強接受，但心裡很不舒服",
      statChanges: {
        心情: -15,
        穩定性: -5,
        體力: -4,
        社交傾向: -2,
      },
      consequences: ["你選擇了妥協，但心裡非常不舒服，感覺自己太軟弱了。"],
    };
  }

  // 為優柔寡斷的玩家添加猶豫選項
  if (
    isInPersonalityRange(playerStats, "決斷力", "INDECISIVE") &&
    event.description.includes("決策") &&
    !Object.values(options).some((opt) => opt.text.includes("再想想"))
  ) {
    options.D = {
      text: "再想想，先不做決定",
      statChanges: {
        心情: -8,
        決斷力: -2,
        穩定性: -2,
        體力: -3,
      },
      consequences: ["你選擇了延遲決定，但心裡一直想著這件事，反而更累了。"],
    };
  }

  // 為高同理心玩家添加額外的幫助選項
  if (
    isInPersonalityRange(playerStats, "同理心", "EMPATHETIC") &&
    event.description.includes("幫助") &&
    !Object.values(options).some((opt) => opt.text.includes("額外"))
  ) {
    options.D = {
      text: "額外提供更多幫助",
      statChanges: {
        心情: 12,
        同理心: 2,
        體力: -6,
        儲蓄: -50,
      },
      consequences: ["你提供了超出預期的幫助，對方非常感激。"],
    };
  }

  // 為高決斷力玩家添加直接行動選項
  if (
    isInPersonalityRange(playerStats, "決斷力", "DECISIVE") &&
    event.description.includes("衝突") &&
    !Object.values(options).some((opt) => opt.text.includes("直接"))
  ) {
    options.D = {
      text: "直接採取行動解決問題",
      statChanges: {
        心情: 10,
        決斷力: 2,
        體力: -4,
        社交傾向: 1,
      },
      consequences: ["你果斷地解決了問題，贏得了周圍人的讚賞。"],
    };
  }

  // 為容易內耗的玩家添加逃避選項
  if (
    isProneToBurnout(playerStats) &&
    (event.description.includes("壓力") ||
      event.description.includes("衝突")) &&
    !Object.values(options).some((opt) => opt.text.includes("逃避"))
  ) {
    options.D = {
      text: "選擇逃避，暫時離開",
      statChanges: {
        心情: -10,
        穩定性: -3,
        決斷力: -2,
        體力: 5,
      },
      consequences: ["你選擇了逃避，雖然暫時輕鬆了，但心裡有些愧疚。"],
    };
  }

  return options;
}
