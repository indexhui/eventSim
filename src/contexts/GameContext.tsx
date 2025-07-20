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
} from "../types/game";
import {
  getRandomEvent,
  getAvailableOptions as getAvailableOptionsFromManager,
} from "../data/events/event-manager";

// 遊戲動作類型
type GameAction =
  | { type: "START_GAME" }
  | { type: "SELECT_OPTION"; optionKey: string }
  | { type: "NEXT_EVENT" }
  | { type: "RESET_GAME" }
  | { type: "UPDATE_STATS"; stats: Partial<PlayerStats> }
  | { type: "START_REST" }
  | { type: "END_REST" }
  | { type: "SHOW_CONSEQUENCE"; consequence: string }
  | { type: "HIDE_CONSEQUENCE" }
  | { type: "TOGGLE_DEVELOPER_MODE" };

// 擴展的遊戲狀態
interface ExtendedGameState extends GameState {
  isResting: boolean;
  restDays: number;
  currentConsequence: string | null;
  isShowingConsequence: boolean;
  isDeveloperMode: boolean;
}

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

    default:
      return state;
  }
}

// 遊戲 Context
interface GameContextType {
  state: ExtendedGameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: () => void;
  selectOption: (optionKey: string) => void;
  nextEvent: () => void;
  resetGame: () => void;
  startRest: () => void;
  endRest: () => void;
  checkRestRequired: (stats: PlayerStats) => boolean;
  checkMoneyRequired: (stats: PlayerStats, requiredAmount?: number) => boolean;
  getAvailableOptions: (event: ExtendedEvent) => Record<string, unknown>;
  toggleDeveloperMode: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// 遊戲 Provider 元件
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = () => {
    dispatch({ type: "START_GAME" });
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
