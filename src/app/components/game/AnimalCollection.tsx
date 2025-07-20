"use client"

import { Box, VStack, HStack, Text, Grid, Button, Badge, Dialog } from "@chakra-ui/react"
import { Animal, AnimalCollectionState } from "../../../types/game"
import { animals } from "../../../data/animals"
import { useState } from "react"

interface AnimalCollectionProps {
  collection: AnimalCollectionState
  onToggle?: () => void
  isExpanded: boolean
}

// 獲取稀有度顏色
function getRarityColor(rarity: Animal["rarity"]): string {
  switch (rarity) {
    case "common":
      return "gray.500"
    case "uncommon":
      return "green.500"
    case "rare":
      return "blue.500"
    case "legendary":
      return "purple.500"
    default:
      return "gray.500"
  }
}

// 獲取稀有度文字
function getRarityText(rarity: Animal["rarity"]): string {
  switch (rarity) {
    case "common":
      return "常見"
    case "uncommon":
      return "不常見"
    case "rare":
      return "稀有"
    case "legendary":
      return "傳說"
    default:
      return "未知"
  }
}

export default function AnimalCollection({ collection, onToggle, isExpanded }: AnimalCollectionProps) {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [showModal, setShowModal] = useState(false)

  // 收集進度
  const collectedCount = collection.collectedAnimals.length
  const totalCount = animals.length
  const percentage = Math.round((collectedCount / totalCount) * 100)

  // 檢查動物是否已收集
  const isCollected = (animalId: string) => {
    return collection.collectedAnimals.some((a) => a.id === animalId)
  }

  // 獲取動物遇見次數
  const getEncounterCount = (animalId: string) => {
    return collection.animalEncounters[animalId] || 0
  }

  // 打開動物詳情
  const showAnimalDetail = (animal: Animal) => {
    setSelectedAnimal(animal)
    setShowModal(true)
  }

  if (!isExpanded) {
    // 收起狀態 - 只顯示一個小圖標
    return (
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        bg="white"
        p={3}
        borderRadius="full"
        boxShadow="lg"
        cursor="pointer"
        onClick={onToggle}
        transition="all 0.3s"
        _hover={{ transform: "scale(1.1)" }}
      >
        <HStack gap={2}>
          <Text fontSize="2xl">🦊</Text>
          <Text fontWeight="bold" fontSize="sm">
            {collectedCount}/{totalCount}
          </Text>
        </HStack>
      </Box>
    )
  }

  return (
    <>
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        bg="white"
        p={4}
        borderRadius="xl"
        boxShadow="lg"
        width="320px"
        maxHeight="400px"
        overflowY="auto"
      >
        <VStack align="stretch" gap={3}>
          {/* 標題和關閉按鈕 */}
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">
              動物收集圖鑑
            </Text>
            <Button size="sm" variant="ghost" onClick={onToggle}>
              ✕
            </Button>
          </HStack>

          {/* 收集進度 */}
          <Box>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm">收集進度</Text>
              <Text fontSize="sm" fontWeight="bold">
                {percentage}%
              </Text>
            </HStack>
            <Box bg="gray.200" height="8px" borderRadius="full">
              <Box bg="green.500" height="100%" width={`${percentage}%`} borderRadius="full" transition="width 0.3s" />
            </Box>
          </Box>

          {/* 動物網格 */}
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            {animals.map((animal) => {
              const collected = isCollected(animal.id)
              const encounters = getEncounterCount(animal.id)

              return (
                <Box
                  key={animal.id}
                  p={2}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={collected ? getRarityColor(animal.rarity) : "gray.300"}
                  bg={collected ? "white" : "gray.100"}
                  cursor={collected || encounters > 0 ? "pointer" : "default"}
                  onClick={() => (collected || encounters > 0) && showAnimalDetail(animal)}
                  position="relative"
                  transition="all 0.2s"
                  _hover={collected || encounters > 0 ? { transform: "scale(1.1)" } : {}}
                  title={collected ? animal.name : encounters > 0 ? `已遇見 ${encounters} 次` : "未發現"}
                >
                  <Text fontSize="2xl" textAlign="center" opacity={collected ? 1 : encounters > 0 ? 0.5 : 0.2}>
                    {animal.icon}
                  </Text>

                  {/* 顯示遇見次數標記 */}
                  {!collected && encounters > 0 && (
                    <Badge position="absolute" top="-1" right="-1" fontSize="xs" colorScheme="orange" borderRadius="full">
                      {encounters}
                    </Badge>
                  )}

                  {/* 離開風險標記 */}
                  {collected && collection.pendingAnimalRisk?.animalId === animal.id && (
                    <Badge position="absolute" top="-1" right="-1" fontSize="xs" colorScheme="red" borderRadius="full">
                      !
                    </Badge>
                  )}
                </Box>
              )
            })}
          </Grid>

          {/* 稀有度說明 */}
          <HStack gap={2} fontSize="xs" flexWrap="wrap">
            <HStack gap={1}>
              <Box w={3} h={3} bg="gray.500" borderRadius="sm" />
              <Text>常見</Text>
            </HStack>
            <HStack gap={1}>
              <Box w={3} h={3} bg="green.500" borderRadius="sm" />
              <Text>不常見</Text>
            </HStack>
            <HStack gap={1}>
              <Box w={3} h={3} bg="blue.500" borderRadius="sm" />
              <Text>稀有</Text>
            </HStack>
            <HStack gap={1}>
              <Box w={3} h={3} bg="purple.500" borderRadius="sm" />
              <Text>傳說</Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>

      {/* 動物詳情彈窗 */}
      <Dialog.Root open={showModal} onOpenChange={(details) => setShowModal(details.open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{selectedAnimal?.name}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {selectedAnimal && (
                <VStack align="stretch" gap={3}>
                  <Text fontSize="4xl" textAlign="center">
                    {selectedAnimal.icon}
                  </Text>
                  <Badge colorScheme={getRarityColor(selectedAnimal.rarity).split(".")[0] as string} alignSelf="center">
                    {getRarityText(selectedAnimal.rarity)}
                  </Badge>
                  <Text>{selectedAnimal.description}</Text>
                  {isCollected(selectedAnimal.id) ? (
                    <Text fontSize="sm" color="green.600">
                      ✓ 已收集
                    </Text>
                  ) : null}

                  <VStack align="stretch" gap={2}>
                    <Text fontSize="sm" color="gray.600">
                      遇見次數: {getEncounterCount(selectedAnimal.id)}
                    </Text>
                    {selectedAnimal.unlockCondition && (
                      <Text fontSize="sm" color="gray.600">
                        收集條件: 特定狀態或人格特質
                      </Text>
                    )}
                  </VStack>

                  {collection.pendingAnimalRisk?.animalId === selectedAnimal.id && (
                    <Box bg="red.50" p={3} borderRadius="md">
                      <Text fontSize="sm" color="red.600">
                        ⚠️ {collection.pendingAnimalRisk.reason}
                      </Text>
                    </Box>
                  )}
                </VStack>
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}
