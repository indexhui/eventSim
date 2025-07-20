"use client";

import { Box, VStack, Text, Button, Badge, HStack } from "@chakra-ui/react";
import { useGame } from "../../../contexts/GameContext";
import { ExtendedEvent } from "../../../types/game";
import {
  getPersonalityAdjustedOptions,
  addPersonalitySpecificOptions,
} from "../../../data/events/personality-options";
import { getAnimalById, calculateAnimalAffinity, canCollectAnimal } from "../../../data/animals";

interface EventDisplayProps {
  event: ExtendedEvent;
  onSelectOption: (optionKey: string) => void;
}

export function EventDisplay({ event, onSelectOption }: EventDisplayProps) {
  const { state, getAvailableOptions } = useGame();
  const {
    playerStats,
    isShowingConsequence,
    currentConsequence,
    isDeveloperMode,
    animalCollection,
  } = state;

  // 獲取個性調整後的選項
  const personalityAdjustedOptions = getPersonalityAdjustedOptions(
    event,
    playerStats
  );

  // 添加個性特定的選項
  const allOptions = addPersonalitySpecificOptions(
    { ...event, options: personalityAdjustedOptions },
    playerStats
  );

  // 獲取可用的選項
  const availableOptions = getAvailableOptions({
    ...event,
    options: allOptions,
  });

  // 如果正在顯示後果，顯示後果內容
  if (isShowingConsequence && currentConsequence) {
    return (
      <Box
        p={6}
        bg="blue.50"
        borderRadius="lg"
        border="2px solid"
        borderColor="blue.200"
        textAlign="center"
      >
        <VStack gap={4}>
          <Text fontSize="xl" fontWeight="bold" color="blue.800">
            🎯 選擇結果
          </Text>
          <Text fontSize="lg" color="blue.700">
            {currentConsequence}
          </Text>
          <Text fontSize="sm" color="blue.600">
            正在進入下一個事件...
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.300"
    >
      <VStack gap={4} align="stretch">
        {/* 事件標題和分類 */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {event.name}
            </Text>
            <HStack gap={2}>
              <Badge colorScheme="blue" variant="subtle">
                {event.category}
              </Badge>
              <Badge
                colorScheme={
                  event.difficulty === "easy"
                    ? "green"
                    : event.difficulty === "medium"
                    ? "yellow"
                    : "red"
                }
                variant="subtle"
              >
                {event.difficulty}
              </Badge>
            </HStack>
          </HStack>
          <Text fontSize="lg" color="gray.600">
            {event.description}
          </Text>
        </Box>

        {/* 標籤 */}
        {event.tags && event.tags.length > 0 && (
          <HStack gap={2} flexWrap="wrap">
            {event.tags.map((tag) => (
              <Badge key={tag} color="gray.500" variant="outline" fontSize="xs">
                {tag}
              </Badge>
            ))}
          </HStack>
        )}

        {/* 開發者模式：動物遭遇資訊 */}
        {isDeveloperMode && event.animalEncounter && (
          <Box
            bg="purple.50"
            p={3}
            borderRadius="md"
            border="1px solid"
            borderColor="purple.200"
          >
            <Text fontSize="sm" fontWeight="bold" color="purple.800" mb={2}>
              🦊 動物遭遇資訊
            </Text>
            {(() => {
              const animal = getAnimalById(event.animalEncounter.animalId);
              if (!animal) return null;

              const isCollected = animalCollection.collectedAnimals.some(a => a.id === animal.id);
              const encounterCount = animalCollection.animalEncounters[animal.id] || 0;
              const canCollect = canCollectAnimal(animal, playerStats);
              const affinity = calculateAnimalAffinity(animal, playerStats);

              return (
                <VStack align="start" gap={2}>
                  <HStack gap={2}>
                    <Text fontSize="lg">{animal.icon}</Text>
                    <Text fontSize="sm" fontWeight="semibold">{animal.name}</Text>
                    <Badge colorScheme={
                      animal.rarity === 'common' ? 'gray' :
                      animal.rarity === 'uncommon' ? 'green' :
                      animal.rarity === 'rare' ? 'blue' : 'purple'
                    } size="sm">
                      {animal.rarity === 'common' ? '常見' :
                       animal.rarity === 'uncommon' ? '不常見' :
                       animal.rarity === 'rare' ? '稀有' : '傳說'}
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="gray.600">{animal.description}</Text>
                  
                  <HStack gap={4} flexWrap="wrap">
                    <Badge colorScheme={isCollected ? "green" : "gray"} variant="outline" fontSize="xs">
                      {isCollected ? "✓ 已收集" : "未收集"}
                    </Badge>
                    <Badge colorScheme="blue" variant="outline" fontSize="xs">
                      遭遇次數: {encounterCount}
                    </Badge>
                    <Badge colorScheme={canCollect ? "green" : "red"} variant="outline" fontSize="xs">
                      {canCollect ? "✓ 可收集" : "✗ 條件未滿足"}
                    </Badge>
                    <Badge 
                      colorScheme={affinity >= 70 ? "green" : affinity >= 50 ? "yellow" : "red"} 
                      variant="outline" 
                      fontSize="xs"
                    >
                      親和度: {affinity}%
                    </Badge>
                  </HStack>

                  <HStack gap={2} flexWrap="wrap">
                    <Badge colorScheme="purple" variant="subtle" fontSize="xs">
                      遭遇類型: {
                        event.animalEncounter.encounterType === 'sighting' ? '目擊' :
                        event.animalEncounter.encounterType === 'interaction' ? '互動' :
                        event.animalEncounter.encounterType === 'rescue' ? '救援' : '威脅'
                      }
                    </Badge>
                    {event.animalEncounter.collectionChance && (
                      <Badge colorScheme="orange" variant="subtle" fontSize="xs">
                        收集機率: {event.animalEncounter.collectionChance}%
                      </Badge>
                    )}
                  </HStack>

                  {animal.personalityAffinity && animal.personalityAffinity.length > 0 && (
                    <Box>
                      <Text fontSize="xs" fontWeight="bold" color="purple.700" mb={1}>
                        性格親和度要求:
                      </Text>
                      <HStack gap={1} flexWrap="wrap">
                        {animal.personalityAffinity.map((affinity, index) => {
                          const currentValue = playerStats[affinity.trait as keyof typeof playerStats];
                          const distance = Math.abs(currentValue - affinity.idealValue);
                          const isWithinTolerance = distance <= affinity.tolerance;
                          
                          return (
                            <Badge 
                              key={index}
                              colorScheme={isWithinTolerance ? "green" : "red"} 
                              variant="outline" 
                              fontSize="xs"
                            >
                              {affinity.trait}: {affinity.idealValue}±{affinity.tolerance} (當前: {currentValue})
                            </Badge>
                          );
                        })}
                      </HStack>
                    </Box>
                  )}
                </VStack>
              );
            })()}
          </Box>
        )}

        {/* 選項 */}
        <VStack gap={3} align="stretch">
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            選擇你的行動：
          </Text>

          {Object.entries(allOptions).map(([key, option]) => {
            const isAvailable = availableOptions[key];
            const isDisabled = !isAvailable;

            // 檢查為什麼選項不可用
            let disabledReason = "";
            if (!isAvailable && option.conditions) {
              for (const condition of option.conditions) {
                const currentValue =
                  playerStats[condition.stat as keyof typeof playerStats];

                let conditionMet = false;
                switch (condition.operator) {
                  case "gte":
                    conditionMet = currentValue >= condition.value;
                    if (!conditionMet) {
                      disabledReason = `需要 ${condition.stat} ≥ ${condition.value}（當前：${currentValue}）`;
                    }
                    break;
                  case "lte":
                    conditionMet = currentValue <= condition.value;
                    if (!conditionMet) {
                      disabledReason = `需要 ${condition.stat} ≤ ${condition.value}（當前：${currentValue}）`;
                    }
                    break;
                  case "eq":
                    conditionMet = currentValue === condition.value;
                    if (!conditionMet) {
                      disabledReason = `需要 ${condition.stat} = ${condition.value}（當前：${currentValue}）`;
                    }
                    break;
                  case "gt":
                    conditionMet = currentValue > condition.value;
                    if (!conditionMet) {
                      disabledReason = `需要 ${condition.stat} > ${condition.value}（當前：${currentValue}）`;
                    }
                    break;
                  case "lt":
                    conditionMet = currentValue < condition.value;
                    if (!conditionMet) {
                      disabledReason = `需要 ${condition.stat} < ${condition.value}（當前：${currentValue}）`;
                    }
                    break;
                }

                if (!conditionMet) {
                  break; // 找到第一個不滿足的條件就停止
                }
              }
            }

            // 檢查是否為個性特定選項
            const isPersonalityOption =
              key === "D" &&
              (option.text.includes("額外") ||
                option.text.includes("直接") ||
                option.text.includes("深入了解") ||
                option.text.includes("勉強接受") ||
                option.text.includes("再想想") ||
                option.text.includes("逃避"));

            // 檢查是否為內耗選項
            const isBurnoutOption =
              option.text.includes("勉強") ||
              option.text.includes("內耗") ||
              option.text.includes("尷尬") ||
              option.text.includes("不舒服");

            return (
              <Box key={key}>
                <Button
                  w="100%"
                  size="lg"
                  variant={
                    isDisabled
                      ? "outline"
                      : isPersonalityOption
                      ? "solid"
                      : "solid"
                  }
                  colorScheme={
                    isDisabled
                      ? "gray"
                      : isPersonalityOption
                      ? "purple"
                      : isBurnoutOption
                      ? "orange"
                      : "blue"
                  }
                  onClick={() => !isDisabled && onSelectOption(key)}
                  disabled={isDisabled}
                  textAlign="left"
                  justifyContent="flex-start"
                  py={4}
                  px={6}
                  h="auto"
                  whiteSpace="normal"
                >
                  <VStack align="start" gap={1} w="100%">
                    <HStack w="100%" justify="space-between">
                      <Text fontWeight="semibold">
                        {key}. {option.text}
                      </Text>
                      <HStack gap={1}>
                        {isPersonalityOption && (
                          <Badge
                            colorScheme="purple"
                            variant="subtle"
                            fontSize="xs"
                          >
                            個性特化
                          </Badge>
                        )}
                        {isBurnoutOption && (
                          <Badge
                            colorScheme="orange"
                            variant="subtle"
                            fontSize="xs"
                          >
                            可能內耗
                          </Badge>
                        )}
                      </HStack>
                    </HStack>

                    {/* 開發者模式：顯示影響數值 */}
                    {isDeveloperMode && (
                      <Box
                        bg="gray.50"
                        p={2}
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.200"
                        w="100%"
                      >
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          color="gray.700"
                          mb={1}
                        >
                          影響數值：
                        </Text>
                        <HStack gap={2} flexWrap="wrap">
                          {Object.entries(option.statChanges).map(
                            ([stat, value]) => (
                              <Badge
                                key={stat}
                                colorScheme={
                                  value > 0
                                    ? "green"
                                    : value < 0
                                    ? "red"
                                    : "gray"
                                }
                                variant="subtle"
                                fontSize="xs"
                              >
                                {stat}: {value > 0 ? "+" : ""}
                                {value}
                              </Badge>
                            )
                          )}
                        </HStack>
                        
                        {/* 動物相關功能 */}
                        {(option.animalCollection || option.preventAnimalLeave) && (
                          <Box mt={2}>
                            <Text
                              fontSize="xs"
                              fontWeight="bold"
                              color="purple.700"
                              mb={1}
                            >
                              動物功能：
                            </Text>
                            <HStack gap={2} flexWrap="wrap">
                              {option.animalCollection && (
                                <Badge colorScheme="green" variant="subtle" fontSize="xs">
                                  🦊 可能收集動物
                                </Badge>
                              )}
                              {option.preventAnimalLeave && (
                                <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                                  🛡️ 阻止動物離開
                                </Badge>
                              )}
                            </HStack>
                          </Box>
                        )}

                        {option.conditions && option.conditions.length > 0 && (
                          <Box mt={2}>
                            <Text
                              fontSize="xs"
                              fontWeight="bold"
                              color="gray.700"
                              mb={1}
                            >
                              條件限制：
                            </Text>
                            <VStack gap={1} align="start">
                              {option.conditions.map((condition, index) => {
                                const currentValue =
                                  playerStats[
                                    condition.stat as keyof typeof playerStats
                                  ];
                                const isMet = (() => {
                                  switch (condition.operator) {
                                    case "gte":
                                      return currentValue >= condition.value;
                                    case "lte":
                                      return currentValue <= condition.value;
                                    case "eq":
                                      return currentValue === condition.value;
                                    case "gt":
                                      return currentValue > condition.value;
                                    case "lt":
                                      return currentValue < condition.value;
                                    default:
                                      return false;
                                  }
                                })();

                                const operatorText = {
                                  gte: "≥",
                                  lte: "≤",
                                  eq: "=",
                                  gt: ">",
                                  lt: "<",
                                }[condition.operator];

                                return (
                                  <Badge
                                    key={index}
                                    colorScheme={isMet ? "green" : "red"}
                                    variant="outline"
                                    fontSize="xs"
                                  >
                                    {condition.stat} {operatorText}{" "}
                                    {condition.value}
                                    {!isMet && ` (當前: ${currentValue})`}
                                  </Badge>
                                );
                              })}
                            </VStack>
                          </Box>
                        )}
                      </Box>
                    )}

                    {isDisabled && disabledReason && (
                      <Text fontSize="sm" color="red.500">
                        ⚠️ {disabledReason}
                      </Text>
                    )}
                  </VStack>
                </Button>
              </Box>
            );
          })}
        </VStack>

        {/* 提示訊息 */}
        {Object.keys(availableOptions).length === 0 && (
          <Box
            p={4}
            bg="orange.50"
            border="1px solid"
            borderColor="orange.200"
            borderRadius="md"
          >
            <HStack>
              <Text fontSize="lg" color="orange.600">
                ⚠️
              </Text>
              <Text fontSize="sm" color="orange.700">
                目前沒有可用的選項，可能需要調整你的屬性值。
              </Text>
            </HStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
