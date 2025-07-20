'use client';

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Container,
  Center,
  Heading,
  Badge,
} from '@chakra-ui/react';
import { StageResult, PlayerStatus, PlayerStats } from '../../../types/game';

interface StageEvaluationScreenProps {
  stageResult: StageResult;
  onContinue: () => void;
}

export function StageEvaluationScreen({ stageResult, onContinue }: StageEvaluationScreenProps) {
  const { stage, subStage, events, averageStats, gainedStatus } = stageResult;

  return (
    <Box
      bg="gray.50"
      minH="100vh"
    >
      <Container
        maxW="container.lg"
        py={10}
      >
        <VStack
          gap={8}
          align="stretch"
        >
          {/* 標題 */}
          <Center>
            <VStack gap={2}>
              <Heading
                size="xl"
                color="purple.600"
              >
                階段評估
              </Heading>
              <Text
                fontSize="lg"
                color="gray.600"
              >
                第 {stage}-{subStage} 階段完成
              </Text>
            </VStack>
          </Center>

          {/* 階段統計 */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="md"
          >
            <VStack
              gap={6}
              align="stretch"
            >
              <Heading
                size="md"
                color="gray.700"
              >
                階段統計
              </Heading>

              <HStack
                gap={8}
                justify="space-around"
              >
                <VStack>
                  <Text
                    fontSize="sm"
                    color="gray.600"
                  >
                    完成事件
                  </Text>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="blue.500"
                  >
                    {events.length}
                  </Text>
                </VStack>
                <VStack>
                  <Text
                    fontSize="sm"
                    color="gray.600"
                  >
                    平均心情變化
                  </Text>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color={averageStats.心情 && averageStats.心情 > 0 ? 'green.500' : 'red.500'}
                  >
                    {averageStats.心情 ? averageStats.心情.toFixed(1) : '0'}
                  </Text>
                </VStack>
                <VStack>
                  <Text
                    fontSize="sm"
                    color="gray.600"
                  >
                    平均體力變化
                  </Text>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color={averageStats.體力 && averageStats.體力 > 0 ? 'green.500' : 'red.500'}
                  >
                    {averageStats.體力 ? averageStats.體力.toFixed(1) : '0'}
                  </Text>
                </VStack>
                <VStack>
                  <Text
                    fontSize="sm"
                    color="gray.600"
                  >
                    儲蓄變化
                  </Text>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color={averageStats.儲蓄 && averageStats.儲蓄 > 0 ? 'green.500' : 'red.500'}
                  >
                    {averageStats.儲蓄 ? averageStats.儲蓄.toFixed(0) : '0'}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>

          {/* 獲得狀態 */}
          {gainedStatus.length > 0 && (
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              shadow="md"
            >
              <VStack
                gap={4}
                align="stretch"
              >
                <Heading
                  size="md"
                  color="gray.700"
                >
                  獲得狀態
                </Heading>

                <VStack
                  gap={3}
                  align="stretch"
                >
                  {gainedStatus.map((status) => (
                    <Box key={status.id}>
                      <HStack gap={3}>
                        <Box
                          w={4}
                          h={4}
                          borderRadius="full"
                          bg="green.500"
                        />
                        <VStack
                          align="start"
                          gap={1}
                        >
                          <HStack gap={2}>
                            <Badge
                              colorScheme="purple"
                              variant="subtle"
                            >
                              {status.name}
                            </Badge>
                            {status.duration > 0 && (
                              <Badge
                                colorScheme="blue"
                                variant="outline"
                              >
                                持續 {status.duration} 階段
                              </Badge>
                            )}
                          </HStack>
                          <Text
                            fontSize="sm"
                            color="gray.600"
                          >
                            {status.description}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </Box>
          )}

          {/* 建議 */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="md"
          >
            <VStack
              gap={4}
              align="stretch"
            >
              <Heading
                size="md"
                color="gray.700"
              >
                階段建議
              </Heading>

              <VStack
                gap={3}
                align="stretch"
              >
                {generateRecommendations(averageStats).map((recommendation, index) => (
                  <Box key={index}>
                    <HStack gap={3}>
                      <Box
                        w={4}
                        h={4}
                        borderRadius="full"
                        bg="orange.500"
                      />
                      <Text
                        fontSize="sm"
                        color="gray.700"
                      >
                        {recommendation}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </Box>

          {/* 繼續按鈕 */}
          <Center>
            <Button
              size="lg"
              colorScheme="purple"
              onClick={onContinue}
              px={8}
              py={6}
              fontSize="lg"
            >
              進入下一階段
            </Button>
          </Center>
        </VStack>
      </Container>
    </Box>
  );
}

// 生成建議的函數
function generateRecommendations(averageStats: Partial<PlayerStats>): string[] {
  const recommendations = [];

  if (averageStats.心情 && averageStats.心情 < -2) {
    recommendations.push('這階段心情下降較多，建議選擇更多能提升心情的選項');
  }

  if (averageStats.體力 && averageStats.體力 < -3) {
    recommendations.push('體力消耗較大，下階段要注意休息和體力管理');
  }

  if (averageStats.儲蓄 && averageStats.儲蓄 < -100) {
    recommendations.push('財務支出較多，建議注意開銷控制');
  }

  if (averageStats.社交傾向 && averageStats.社交傾向 > 2) {
    recommendations.push('社交互動積極，可以繼續保持這種開放態度');
  }

  if (recommendations.length === 0) {
    recommendations.push('表現平衡，繼續保持當前的選擇策略');
  }

  return recommendations;
}
