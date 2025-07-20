import { ExtendedEvent } from "./constants"
import { dailyLifeEvents } from "./daily-life"
import { workEvents } from "./work"
import { socialEvents } from "./social"
import { shoppingEvents } from "./shopping"
import { healthEvents } from "./health"
import { commuteEvents } from "./commute"
import { allAnimalEvents, animalThreatEvents } from "./animal-events"
import { PlayerStats, AnimalCollectionState } from "../../types/game"
import { calculateAnimalAffinity } from "../animals"

// 所有事件集合
export const allEvents: ExtendedEvent[] = [
  ...dailyLifeEvents,
  // ...workEvents,
  // ...socialEvents,
  // ...shoppingEvents,
  // ...healthEvents,
  // ...commuteEvents,
  ...allAnimalEvents,
]

// 獲取所有事件（用於事件列表頁面）
export function getAllEvents(): ExtendedEvent[] {
  return allEvents
}

// 檢查事件觸發條件
function checkEventTrigger(event: ExtendedEvent, playerStats: PlayerStats, gameProgress: number): boolean {
  if (!event.triggers) return true

  const { triggers } = event

  // 檢查遊戲進度
  if (triggers.minProgress && gameProgress < triggers.minProgress) return false
  if (triggers.maxProgress && gameProgress > triggers.maxProgress) return false

  // 檢查屬性要求
  if (triggers.requiredStats) {
    for (const [stat, value] of Object.entries(triggers.requiredStats)) {
      if (value !== undefined && playerStats[stat as keyof PlayerStats] < value) return false
    }
  }

  // 檢查排除條件
  if (triggers.excludedStats) {
    for (const [stat, value] of Object.entries(triggers.excludedStats)) {
      if (value !== undefined && playerStats[stat as keyof PlayerStats] >= value) return false
    }
  }

  return true
}

// 檢查選項條件
function checkOptionConditions(option: ExtendedEvent["options"][string], playerStats: PlayerStats): boolean {
  if (!option.conditions) return true

  for (const condition of option.conditions) {
    const currentValue = playerStats[condition.stat as keyof PlayerStats]

    switch (condition.operator) {
      case "gte":
        if (currentValue < condition.value) return false
        break
      case "lte":
        if (currentValue > condition.value) return false
        break
      case "eq":
        if (currentValue !== condition.value) return false
        break
      case "gt":
        if (currentValue <= condition.value) return false
        break
      case "lt":
        if (currentValue >= condition.value) return false
        break
    }
  }

  return true
}

// 獲取可用的事件
export function getAvailableEvents(playerStats: PlayerStats, gameProgress: number): ExtendedEvent[] {
  return allEvents.filter((event) => {
    // 檢查觸發條件
    if (!checkEventTrigger(event, playerStats, gameProgress)) return false

    // 檢查是否有可用選項
    const hasValidOptions = Object.values(event.options).some((option) => checkOptionConditions(option, playerStats))

    return hasValidOptions
  })
}

// 根據類別獲取事件
export function getEventsByCategory(category: string): ExtendedEvent[] {
  return allEvents.filter((event) => event.category === category)
}

// 根據難度獲取事件
export function getEventsByDifficulty(difficulty: string): ExtendedEvent[] {
  return allEvents.filter((event) => event.difficulty === difficulty)
}

// 根據標籤搜尋事件
export function searchEventsByTags(tags: string[]): ExtendedEvent[] {
  return allEvents.filter((event) => event.tags && tags.some((tag) => event.tags!.includes(tag)))
}

// 隨機選擇事件
export function getRandomEvent(playerStats: PlayerStats, gameProgress: number): ExtendedEvent | null {
  const availableEvents = getAvailableEvents(playerStats, gameProgress)

  if (availableEvents.length === 0) return null

  const randomIndex = Math.floor(Math.random() * availableEvents.length)
  return availableEvents[randomIndex]
}

// 根據進度選擇事件（線性進度）
export function getEventByProgress(gameProgress: number): ExtendedEvent | null {
  if (gameProgress >= allEvents.length) return null
  return allEvents[gameProgress]
}

// 過濾有條件的選項
export function getAvailableOptions(event: ExtendedEvent, playerStats: PlayerStats) {
  const availableOptions: Record<string, ExtendedEvent["options"][string]> = {}

  for (const [key, option] of Object.entries(event.options)) {
    if (checkOptionConditions(option, playerStats)) {
      availableOptions[key] = option
    }
  }

  return availableOptions
}

// 檢查動物威脅事件
export function checkAnimalThreatEvents(playerStats: PlayerStats, animalCollection: AnimalCollectionState): ExtendedEvent | null {
  // 隨機選擇一個已收集的動物檢查親和度
  if (animalCollection.collectedAnimals.length === 0) return null

  for (const collectedAnimal of animalCollection.collectedAnimals) {
    const affinity = calculateAnimalAffinity(collectedAnimal, playerStats)

    // 如果親和度太低（小於30），觸發威脅事件
    if (affinity < 30) {
      // 尋找對應的威脅事件
      const threatEvent = animalThreatEvents.find((event) => event.animalEncounter?.animalId === collectedAnimal.id)

      if (threatEvent) {
        return threatEvent
      }
    }
  }

  return null
}

// 修改getRandomEvent來優先處理動物威脅
export function getRandomEventWithAnimalCheck(
  playerStats: PlayerStats,
  gameProgress: number,
  animalCollection: AnimalCollectionState
): ExtendedEvent | null {
  // 首先檢查是否有動物威脅事件
  const threatEvent = checkAnimalThreatEvents(playerStats, animalCollection)
  if (threatEvent) {
    return threatEvent
  }

  // 如果沒有威脅事件，返回正常的隨機事件
  return getRandomEvent(playerStats, gameProgress)
}
