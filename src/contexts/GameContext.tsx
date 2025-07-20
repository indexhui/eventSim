"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  GameState,
  PlayerStats,
  EventResult,
  initialPlayerStats,
  personalityLabels,
  STAT_LIMITS,
  ExtendedEvent,
  GameMode,
  StageState,
  PlayerStatus,
  StageResult,
} from "../types/game";
import {
  getRandomEvent,
  getAvailableOptions as getAvailableOptionsFromManager,
} from "../data/events/event-manager";

// 遊戲動作類型
type GameAction =
  | { type: "START_GAME"; mode?: GameMode }
  | { type: "SELECT_OPTION"; optionKey: string }
  | { type: "NEXT_EVENT" }
  | { type: "RESET_GAME" }
  | { type: "UPDATE_STATS"; stats: Partial<PlayerStats> }
  | { type: "START_REST" }
  | { type: "END_REST" }
  | { type: "SHOW_CONSEQUENCE"; consequence: string }
  | { type: "HIDE_CONSEQUENCE" }
  | { type: "TOGGLE_DEVELOPER_MODE" }
  | { type: "SHOW_STAGE_EVALUATION"; stageResult: StageResult }
  | { type: "HIDE_STAGE_EVALUATION" };

// 擴展的遊戲狀態
interface ExtendedGameState extends GameState {
  isResting: boolean;
  restDays: number;
  currentConsequence: string | null;
  isShowingConsequence: boolean;
  isDeveloperMode: boolean;
  stageResult: StageResult | null; // 當前階段評估結果
}

// 初始階段狀態
const initialStageState: StageState = {
  currentStage: 1,
  currentSubStage: 1,
  eventsInCurrentStage: 0,
  stageHistory: [],
};

// 初始遊戲狀態
const initialState: ExtendedGameState = {
  playerStats: initialPlayerStats,
  currentEvent: null,
  eventHistory: [],
  gameProgress: 0,
  personalityLabels,
  isGameStarted: false,
  isResting: false,
  restDays: 0,
  currentConsequence: null,
  isShowingConsequence: false,
  isDeveloperMode: false,
  gameMode: "infinite",
  stageState: initialStageState,
  activeStatuses: [],
  stageResult: null,
};

// 檢查是否需要休息
function checkRestRequired(stats: PlayerStats): boolean {
  return stats.心情 <= 0 || stats.體力 <= 0;
}

// 檢查儲蓄是否足夠
function checkMoneyRequired(
  stats: PlayerStats,
  requiredAmount: number = 0
): boolean {
  return stats.儲蓄 >= requiredAmount;
}

// 計算當前階段信息
function calculateStageInfo(gameProgress: number): {
  stage: number;
  subStage: number;
  eventsInStage: number;
} {
  const stage = Math.floor(gameProgress / 5) + 1;
  const subStage = Math.floor((gameProgress % 25) / 5) + 1;
  const eventsInStage = gameProgress % 5;

  return { stage, subStage, eventsInStage };
}

// 檢查是否需要階段轉換
function shouldTransitionStage(eventsInCurrentStage: number): boolean {
  return eventsInCurrentStage >= 5;
}

// 計算階段統計數據
function calculateStageStats(
  eventHistory: EventResult[],
  stageStartIndex: number
): Partial<PlayerStats> {
  const stageEvents = eventHistory.slice(stageStartIndex);
  const averageStats: Partial<PlayerStats> = {};

  if (stageEvents.length === 0) return averageStats;

  const statKeys: (keyof PlayerStats)[] = [
    "心情",
    "儲蓄",
    "體力",
    "專注力",
    "時間感",
    "社交傾向",
    "決斷力",
    "好奇心",
    "同理心",
    "穩定性",
  ];

  statKeys.forEach((key) => {
    const totalChange = stageEvents.reduce((sum, event) => {
      return sum + (event.statChanges[key] || 0);
    }, 0);
    averageStats[key] = totalChange / stageEvents.length;
  });

  return averageStats;
}

// 遊戲狀態 reducer
function gameReducer(
  state: ExtendedGameState,
  action: GameAction
): ExtendedGameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        isGameStarted: true,
        currentEvent: getRandomEvent(state.playerStats, 0),
        gameProgress: 0,
        isResting: false,
        restDays: 0,
        currentConsequence: null,
        isShowingConsequence: false,
        gameMode: action.mode || "infinite",
      };

    case "SELECT_OPTION": {
      const { optionKey } = action;
      const currentEvent = state.currentEvent as ExtendedEvent;

      if (!currentEvent) return state;

      const selectedOption = currentEvent.options[optionKey];
      if (!selectedOption) return state;

      // 檢查選項是否可用
      const availableOptions = getAvailableOptionsFromManager(
        currentEvent,
        state.playerStats
      );
      if (!availableOptions[optionKey]) return state;

      // 計算新的屬性值
      const newStats = { ...state.playerStats };
      Object.entries(selectedOption.statChanges).forEach(([stat, change]) => {
        const key = stat as keyof PlayerStats;
        const currentValue = newStats[key];
        const newValue = currentValue + (change as number);

        // 根據不同屬性應用不同的限制
        if (key === "心情" || key === "體力") {
          newStats[key] = Math.max(
            STAT_LIMITS[key].min,
            Math.min(STAT_LIMITS[key].max, newValue)
          );
        } else if (key === "儲蓄") {
          newStats[key] = Math.max(
            STAT_LIMITS[key].min,
            Math.min(STAT_LIMITS[key].max, newValue)
          );
        } else {
          // 人格特質保持原有邏輯
          newStats[key] = Math.max(-10, Math.min(10, newValue));
        }
      });

      // 記錄事件結果
      const eventResult: EventResult = {
        eventId: currentEvent.id,
        selectedOption: optionKey,
        timestamp: Date.now(),
        statChanges: selectedOption.statChanges,
      };

      const updatedState = {
        ...state,
        playerStats: newStats,
        eventHistory: [...state.eventHistory, eventResult],
        gameProgress: state.gameProgress + 1,
        currentConsequence: selectedOption.consequences?.[0] || null,
        isShowingConsequence: true,
      };

      // 階段模式：更新階段狀態
      if (state.gameMode === "stage") {
        const { stage, subStage, eventsInStage } = calculateStageInfo(
          state.gameProgress + 1
        );
        const newStageState = {
          ...state.stageState,
          currentStage: stage,
          currentSubStage: subStage,
          eventsInCurrentStage: eventsInStage,
        };

        // 檢查是否需要階段轉換（當eventsInStage為0時，表示剛完成一個階段）
        if (eventsInStage === 0 && state.gameProgress > 0) {
          console.log(
            `階段轉換觸發: 遊戲進度=${
              state.gameProgress + 1
            }, 階段=${stage}, 子階段=${subStage}, 階段內事件=${eventsInStage}`
          );
          console.log(`事件歷史總數: ${updatedState.eventHistory.length}`);

          // 計算階段結果 - 取最近5個事件（包含剛加入的事件）
          const stageStartIndex = Math.max(
            0,
            updatedState.eventHistory.length - 5
          );
          const stageEvents = updatedState.eventHistory.slice(stageStartIndex);
          const stageStats = calculateStageStats(
            updatedState.eventHistory,
            stageStartIndex
          );

          console.log(`階段開始索引: ${stageStartIndex}`);
          console.log(`階段事件數量: ${stageEvents.length}`);
          console.log(
            `階段事件:`,
            stageEvents.map((e) => e.eventId)
          );

          const stageResult: StageResult = {
            stage: stage,
            subStage: subStage,
            events: stageEvents,
            averageStats: stageStats,
            gainedStatus: [], // 暫時為空，將來會添加狀態獲得邏輯
            timestamp: Date.now(),
          };

          console.log("階段結果:", stageResult);

          // 顯示階段評估
          updatedState.stageResult = stageResult;
          updatedState.isShowingConsequence = false;
          updatedState.currentConsequence = null;
        }

        updatedState.stageState = newStageState;
      }

      // 檢查是否需要休息
      if (checkRestRequired(newStats)) {
        return {
          ...updatedState,
          isResting: true,
          restDays: 1,
        };
      }

      return updatedState;
    }

    case "NEXT_EVENT": {
      const nextEvent = getRandomEvent(state.playerStats, state.gameProgress);

      return {
        ...state,
        currentEvent: nextEvent,
        isShowingConsequence: false,
        currentConsequence: null,
      };
    }

    case "START_REST":
      return {
        ...state,
        isResting: true,
        restDays: 1,
      };

    case "END_REST":
      return {
        ...state,
        isResting: false,
        restDays: 0,
        playerStats: {
          ...state.playerStats,
          心情: Math.min(100, state.playerStats.心情 + 30),
          體力: Math.min(100, state.playerStats.體力 + 50),
        },
      };

    case "SHOW_CONSEQUENCE":
      return {
        ...state,
        currentConsequence: action.consequence,
        isShowingConsequence: true,
      };

    case "HIDE_CONSEQUENCE":
      return {
        ...state,
        isShowingConsequence: false,
        currentConsequence: null,
      };

    case "RESET_GAME":
      return {
        ...initialState,
        personalityLabels: state.personalityLabels,
      };

    case "UPDATE_STATS":
      return {
        ...state,
        playerStats: { ...state.playerStats, ...action.stats },
      };

    case "TOGGLE_DEVELOPER_MODE":
      return {
        ...state,
        isDeveloperMode: !state.isDeveloperMode,
      };

    case "SHOW_STAGE_EVALUATION":
      return {
        ...state,
        isShowingConsequence: false, // Hide previous consequence
        currentConsequence: null,
        isResting: false, // End rest if it was active
        restDays: 0,
        stageResult: action.stageResult,
      };

    case "HIDE_STAGE_EVALUATION":
      return {
        ...state,
        isShowingConsequence: false,
        currentConsequence: null,
        stageResult: null,
      };

    default:
      return state;
  }
}

// 遊戲 Context
interface GameContextType {
  state: ExtendedGameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: (mode?: GameMode) => void;
  selectOption: (optionKey: string) => void;
  nextEvent: () => void;
  resetGame: () => void;
  startRest: () => void;
  endRest: () => void;
  checkRestRequired: (stats: PlayerStats) => boolean;
  checkMoneyRequired: (stats: PlayerStats, requiredAmount?: number) => boolean;
  getAvailableOptions: (event: ExtendedEvent) => Record<string, unknown>;
  toggleDeveloperMode: () => void;
  showStageEvaluation: (stageResult: StageResult) => void;
  hideStageEvaluation: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// 遊戲 Provider 元件
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = (mode?: GameMode) => {
    dispatch({ type: "START_GAME", mode });
  };

  const selectOption = (optionKey: string) => {
    dispatch({ type: "SELECT_OPTION", optionKey });

    // 延遲進入下一個事件，讓玩家看到後果
    setTimeout(() => {
      if (!checkRestRequired(state.playerStats)) {
        dispatch({ type: "NEXT_EVENT" });
      }
    }, 1000); // 從2000ms改為1000ms
  };

  const nextEvent = () => {
    dispatch({ type: "NEXT_EVENT" });
  };

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const startRest = () => {
    dispatch({ type: "START_REST" });
  };

  const endRest = () => {
    dispatch({ type: "END_REST" });
    // 休息結束後進入下一個事件
    setTimeout(() => {
      dispatch({ type: "NEXT_EVENT" });
    }, 1000);
  };

  const getAvailableOptions = (event: ExtendedEvent) => {
    return getAvailableOptionsFromManager(event, state.playerStats);
  };

  const toggleDeveloperMode = () => {
    dispatch({ type: "TOGGLE_DEVELOPER_MODE" });
  };

  const showStageEvaluation = (stageResult: StageResult) => {
    dispatch({ type: "SHOW_STAGE_EVALUATION", stageResult });
  };

  const hideStageEvaluation = () => {
    dispatch({ type: "HIDE_STAGE_EVALUATION" });
  };

  const value: GameContextType = {
    state,
    dispatch,
    startGame,
    selectOption,
    nextEvent,
    resetGame,
    startRest,
    endRest,
    checkRestRequired,
    checkMoneyRequired,
    getAvailableOptions,
    toggleDeveloperMode,
    showStageEvaluation,
    hideStageEvaluation,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// 使用遊戲 Context 的 Hook
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
