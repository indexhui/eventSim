'use client';

import { Box, VStack, HStack, Button, Text, Center, Container, Flex } from '@chakra-ui/react';
import { useGame } from '../../../contexts/GameContext';
import { StatsDisplay } from './StatsDisplay';
import { EventDisplay } from './EventDisplay';
import { SceneDisplay } from './SceneDisplay';
import { RestScreen } from './RestScreen';
import { EventListPage } from './EventListPage';
import AnimalCollection from './AnimalCollection';
import { StageEvaluationScreen } from './StageEvaluationScreen';
import { useState } from 'react';

// 頁面類型
type PageType = 'game' | 'eventList';

// Header組件
function GameHeader({ onNavigateToEventList }: { onNavigateToEventList: () => void }) {
  const { state, resetGame, toggleDeveloperMode } = useGame();
  const { gameProgress, isDeveloperMode, gameMode, stageState } = state;

  return (
    <Box
      bg="gray.50"
      borderBottom="1px solid"
      borderColor="gray.300"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex
        justify="space-between"
        align="center"
      >
        {/* 左側：事件進度 */}
        <HStack gap={4}>
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color="gray.800"
          >
            事件 {gameProgress + 1}
          </Text>
          {gameMode === 'stage' && (
            <Text
              fontSize="md"
              color="purple.600"
              fontWeight="medium"
            >
              階段 {stageState.currentStage}-{stageState.currentSubStage}
            </Text>
          )}
        </HStack>

        {/* 中間：開發者模式開關 */}
        <HStack
          gap={2}
          align="center"
        >
          <Text
            fontSize="sm"
            color="gray.700"
          >
            開發者模式
          </Text>
          <Button
            size="sm"
            variant={isDeveloperMode ? 'solid' : 'outline'}
            colorScheme={isDeveloperMode ? 'gray' : 'purple'}
            onClick={toggleDeveloperMode}
            color={isDeveloperMode ? 'gray.700' : 'gray.700'}
            border="1px solid"
          >
            {isDeveloperMode ? 'ON' : 'OFF'}
          </Button>
        </HStack>

        {/* 右側：按鈕組 */}
        <HStack gap={2}>
          <Button
            variant="outline"
            size="sm"
            onClick={onNavigateToEventList}
            color="gray.700"
          >
            事件列表
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetGame}
            color="gray.700"
          >
            重新開始
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export function GameScreen() {
  const { state, startGame, selectOption, resetGame, hideStageEvaluation } = useGame();
  const {
    playerStats,
    currentEvent,
    isGameStarted,
    gameProgress,
    isResting,
    animalCollection,
    stageResult,
  } = state;

  // 頁面狀態管理
  const [currentPage, setCurrentPage] = useState<PageType>('game');

  // 動物收集面板狀態
  const [isAnimalCollectionExpanded, setIsAnimalCollectionExpanded] = useState(false);

  // 導航到事件列表
  const navigateToEventList = () => {
    setCurrentPage('eventList');
  };

  // 返回遊戲
  const navigateToGame = () => {
    setCurrentPage('game');
  };

  // 事件列表頁面
  if (currentPage === 'eventList') {
    return <EventListPage onNavigateToGame={navigateToGame} />;
  }

  // 階段評估頁面
  if (stageResult) {
    return (
      <StageEvaluationScreen
        stageResult={stageResult}
        onContinue={() => {
          hideStageEvaluation();
          // 這裡將來會添加進入下一階段的邏輯
        }}
      />
    );
  }

  // 遊戲開始畫面
  if (!isGameStarted) {
    return (
      <Box
        bg="gray.50"
        minH="100vh"
      >
        <Container
          maxW="container.xl"
          py={10}
        >
          <Center minH="60vh">
            <VStack
              gap={6}
              textAlign="center"
            >
              <Text
                fontSize="4xl"
                fontWeight="bold"
                color="gray.800"
              >
                走走小日模擬器
              </Text>
              <Text
                fontSize="lg"
                color="gray.600"
                maxW="500px"
              >
                透過不同的選擇，體驗不同的人生路徑。每個決定都會影響你的屬性，塑造獨特的人格特質。
              </Text>
              <HStack gap={4}>
                <Button
                  size="lg"
                  colorScheme="blue"
                  onClick={() => startGame('infinite')}
                  px={8}
                  py={6}
                  fontSize="lg"
                >
                  無限模式
                </Button>
                <Button
                  size="lg"
                  colorScheme="green"
                  onClick={() => startGame('infinite-animal')}
                  px={8}
                  py={6}
                  fontSize="lg"
                >
                  無限混動物
                </Button>
                <Button
                  size="lg"
                  colorScheme="purple"
                  onClick={() => startGame('stage')}
                  px={8}
                  py={6}
                  fontSize="lg"
                >
                  階段蛻變
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={navigateToEventList}
                  px={8}
                  py={6}
                  fontSize="lg"
                  color="gray.700"
                >
                  事件列表
                </Button>
              </HStack>
            </VStack>
          </Center>
        </Container>
      </Box>
    );
  }

  // 休息畫面
  if (isResting) {
    return (
      <Box
        bg="gray.50"
        minH="100vh"
      >
        <GameHeader onNavigateToEventList={navigateToEventList} />
        <RestScreen />
      </Box>
    );
  }

  // 遊戲結束畫面
  if (!currentEvent) {
    return (
      <Box
        bg="gray.50"
        minH="100vh"
      >
        <GameHeader onNavigateToEventList={navigateToEventList} />
        <Container
          maxW="container.xl"
          py={10}
        >
          <Center minH="60vh">
            <VStack
              gap={6}
              textAlign="center"
            >
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color="gray.800"
              >
                遊戲結束
              </Text>
              <Text
                fontSize="lg"
                color="gray.600"
              >
                你已經完成了 {gameProgress} 個事件！
              </Text>
              <HStack gap={4}>
                <Button
                  size="lg"
                  colorScheme="blue"
                  onClick={resetGame}
                  px={8}
                  py={6}
                  fontSize="lg"
                >
                  重新開始
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={navigateToEventList}
                  px={8}
                  py={6}
                  fontSize="lg"
                >
                  查看事件列表
                </Button>
              </HStack>
            </VStack>
          </Center>
        </Container>
      </Box>
    );
  }

  // 主要遊戲畫面
  return (
    <Box
      bg="gray.50"
      minH="100vh"
    >
      <GameHeader onNavigateToEventList={navigateToEventList} />
      <Container
        maxW="container.xl"
        py={6}
      >
        <VStack
          gap={6}
          align="stretch"
        >
          {/* 主要內容區域 */}
          <HStack
            gap={6}
            align="flex-start"
            justify="center"
          >
            {/* 左側：屬性面板 */}
            <Box flexShrink={0}>
              <StatsDisplay stats={playerStats} />
            </Box>

            {/* 中間：事件顯示 */}
            <Box flex={1}>
              <EventDisplay
                event={currentEvent}
                onSelectOption={selectOption}
              />
            </Box>

            {/* 右側：場景背景顯示 */}
            <Box flexShrink={0}>
              <SceneDisplay event={currentEvent} />
            </Box>
          </HStack>
        </VStack>
      </Container>

      {/* 動物收集系統 - 只在動物模式下顯示 */}
      {state.gameMode === 'infinite-animal' && (
        <AnimalCollection
          collection={animalCollection}
          onToggle={() => setIsAnimalCollectionExpanded(!isAnimalCollectionExpanded)}
          isExpanded={isAnimalCollectionExpanded}
        />
      )}
    </Box>
  );
}
