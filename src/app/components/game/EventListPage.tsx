"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Container,
  SimpleGrid,
  Badge,
  Flex,
  Code,
  Button,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { getAllEvents } from "../../../data/events/event-manager";
import {
  getEventScene,
  getAvailableLocations,
} from "../../../data/scenes/scene-manager";
import {
  EVENT_CATEGORIES,
  EVENT_DIFFICULTY,
} from "../../../data/events/constants";
import { ExtendedEvent } from "../../../data/events/constants";

// 獲取分類圖標
const getCategoryIcon = (category: string) => {
  switch (category) {
    case EVENT_CATEGORIES.COMMUTE:
      return "🚇";
    case EVENT_CATEGORIES.SOCIAL:
      return "👥";
    case EVENT_CATEGORIES.WORK:
      return "💼";
    case EVENT_CATEGORIES.DAILY_LIFE:
      return "🏠";
    default:
      return "📋";
  }
};

// 獲取難度星星
const getDifficultyStars = (difficulty: string) => {
  switch (difficulty) {
    case EVENT_DIFFICULTY.EASY:
      return "⭐";
    case EVENT_DIFFICULTY.MEDIUM:
      return "⭐⭐";
    case EVENT_DIFFICULTY.HARD:
      return "⭐⭐⭐";
    default:
      return "⭐";
  }
};

// Header組件
function EventListHeader({
  onNavigateToGame,
}: {
  onNavigateToGame: () => void;
}) {
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
      <Flex justify="space-between" align="center">
        {/* 左側：標題 */}
        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
          事件列表
        </Text>

        {/* 右側：回到遊戲按鈕 */}
        <Button
          variant="outline"
          size="sm"
          onClick={onNavigateToGame}
          color="gray.700"
          _hover={{
            color: "gray.300",
          }}
        >
          回到遊戲
        </Button>
      </Flex>
    </Box>
  );
}

// 地點篩選器組件
function LocationFilter({
  selectedLocation,
  onLocationChange,
  availableLocations,
  eventCounts,
}: {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  availableLocations: string[];
  eventCounts: Record<string, number>;
}) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
      p={4}
      mb={6}
    >
      <VStack gap={4} align="stretch">
        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
          地點篩選
        </Text>

        {/* 地點篩選按鈕 */}
        <Wrap gap={2}>
          <WrapItem>
            <Button
              size="sm"
              variant={selectedLocation === "" ? "solid" : "outline"}
              colorScheme="gray"
              onClick={() => onLocationChange("")}
              bg={selectedLocation === "" ? "gray.800" : "transparent"}
              color={selectedLocation === "" ? "white" : "gray.700"}
              borderColor="gray.300"
              _hover={{
                bg: selectedLocation === "" ? "gray.700" : "gray.50",
                color: selectedLocation === "" ? "white" : "gray.600",
              }}
            >
              全部 ({eventCounts[""] || 0})
            </Button>
          </WrapItem>
          {availableLocations.map((location) => (
            <WrapItem key={location}>
              <Button
                size="sm"
                variant={selectedLocation === location ? "solid" : "outline"}
                colorScheme="gray"
                onClick={() => onLocationChange(location)}
                bg={selectedLocation === location ? "gray.800" : "transparent"}
                color={selectedLocation === location ? "white" : "gray.700"}
                borderColor="gray.300"
                _hover={{
                  bg: selectedLocation === location ? "gray.700" : "gray.50",
                  color: selectedLocation === location ? "white" : "gray.600",
                }}
              >
                {location} ({eventCounts[location] || 0})
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Box>
  );
}

// 事件卡片組件
function EventCard({
  event,
  onClick,
}: {
  event: ExtendedEvent;
  onClick: () => void;
}) {
  const scene = getEventScene(event.id);

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
      p={4}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        shadow: "md",
        transform: "translateY(-2px)",
      }}
      onClick={onClick}
    >
      <VStack align="stretch" gap={3}>
        {/* 場景圖預覽 */}
        <Box
          bg="gray.100"
          h="120px"
          borderRadius="md"
          position="relative"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* 場景背景圖片 */}
          {scene.imagePath && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              backgroundImage={`url(${scene.imagePath})`}
              backgroundSize="cover"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              opacity={0.8}
            />
          )}

          {/* 場景描述覆蓋層 */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="rgba(0, 0, 0, 0.7)"
            color="white"
            px={2}
            py={1}
            fontSize="sm"
            fontWeight="medium"
            textAlign="center"
          >
            {scene.description}
          </Box>

          {/* 分類圖標（作為浮水印） */}
          <Text
            fontSize="3xl"
            color="rgba(255, 255, 255, 0.3)"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={1}
          >
            {getCategoryIcon(event.category)}
          </Text>
        </Box>

        {/* 事件標題 */}
        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
          {event.name}
        </Text>

        {/* 事件描述 */}
        <Text fontSize="sm" color="gray.600">
          {event.description}
        </Text>

        {/* 標籤 */}
        <HStack gap={1} flexWrap="wrap">
          {event.tags?.slice(0, 3).map((tag: string, index: number) => (
            <Badge
              key={index}
              colorScheme="blue"
              variant="subtle"
              fontSize="xs"
            >
              {tag}
            </Badge>
          ))}
        </HStack>

        {/* 難度和分類 */}
        <HStack justify="space-between" fontSize="sm" color="gray.600">
          <Text color="gray.600">
            {getDifficultyStars(event.difficulty)} {event.category}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

// 事件詳情 Modal
function EventDetailModal({
  event,
  isOpen,
  onClose,
}: {
  event: ExtendedEvent | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [viewMode, setViewMode] = useState<"normal" | "json">("normal");

  if (!event) return null;

  const scene = getEventScene(event.id);

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="blackAlpha.600"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        bg="white"
        borderRadius="lg"
        maxW="4xl"
        w="full"
        maxH="90vh"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Box
          p={6}
          borderBottom="1px solid"
          borderColor="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="start"
        >
          <VStack align="start" gap={2}>
            <Text fontSize="xl" fontWeight="bold" color="gray.600">
              {event.name}
            </Text>
            <HStack>
              <Badge colorScheme="blue" variant="subtle">
                {event.category}
              </Badge>
              <Badge colorScheme="purple" variant="subtle">
                {event.difficulty}
              </Badge>
            </HStack>
          </VStack>
          <Box
            as="button"
            onClick={onClose}
            fontSize="2xl"
            color="gray.500"
            _hover={{ color: "gray.300" }}
          >
            ×
          </Box>
        </Box>

        {/* Tabs */}
        <Box borderBottom="1px solid" borderColor="gray.200">
          <HStack>
            <Box
              as="button"
              px={4}
              py={3}
              borderBottom="2px solid"
              borderColor={viewMode === "normal" ? "blue.500" : "transparent"}
              color={viewMode === "normal" ? "blue.500" : "gray.600"}
              onClick={() => setViewMode("normal")}
            >
              事件詳情
            </Box>
            <Box
              as="button"
              px={4}
              py={3}
              borderBottom="2px solid"
              borderColor={viewMode === "json" ? "blue.500" : "transparent"}
              color={viewMode === "json" ? "blue.500" : "gray.600"}
              onClick={() => setViewMode("json")}
            >
              JSON 模式
            </Box>
          </HStack>
        </Box>

        {/* Content */}
        <Box flex={1} overflow="auto" p={6}>
          {viewMode === "normal" ? (
            <VStack align="stretch" gap={4}>
              {/* 場景背景 */}
              {scene.imagePath && (
                <Box
                  backgroundImage={`url(${scene.imagePath})`}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  h="200px"
                  borderRadius="md"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="blackAlpha.300"
                    borderRadius="md"
                  />
                  <Box
                    position="absolute"
                    bottom={3}
                    left={3}
                    bg="blackAlpha.700"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                  >
                    📍 {scene.description}
                  </Box>
                </Box>
              )}

              {/* 事件描述 */}
              <Box>
                <Text
                  fontSize="lg"
                  color="gray.600"
                  fontWeight="semibold"
                  mb={2}
                >
                  事件描述
                </Text>
                <Text color="gray.700">{event.description}</Text>
              </Box>

              {/* 標籤 */}
              {event.tags && event.tags.length > 0 && (
                <Box>
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    mb={2}
                    color="gray.600"
                  >
                    標籤
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {event.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        colorScheme="blue"
                        variant="subtle"
                        px={3}
                        py={1}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              )}

              <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  mb={3}
                  color="gray.600"
                >
                  選項
                </Text>
                <VStack align="stretch" gap={3}>
                  {Object.entries(event.options).map(([key, option]) => (
                    <Box
                      key={key}
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="md"
                      p={4}
                    >
                      <VStack align="start" gap={3}>
                        {/* 選項文字 */}
                        <Text fontWeight="semibold" color="blue.600">
                          {key}. {option.text}
                        </Text>

                        {/* 影響素質 */}
                        {option.statChanges && (
                          <Box w="full">
                            <Text
                              fontSize="sm"
                              fontWeight="medium"
                              mb={2}
                              color="gray.600"
                            >
                              影響素質:
                            </Text>
                            <SimpleGrid columns={2} gap={2}>
                              {Object.entries(option.statChanges).map(
                                ([stat, value]) => (
                                  <Box key={stat}>
                                    <Text fontSize="xs" color="gray.600">
                                      {stat}
                                    </Text>
                                    <Text
                                      fontSize="sm"
                                      fontWeight="bold"
                                      color={
                                        value > 0
                                          ? "green.500"
                                          : value < 0
                                          ? "red.500"
                                          : "gray.500"
                                      }
                                    >
                                      {value > 0 ? "+" : ""}
                                      {value}
                                    </Text>
                                  </Box>
                                )
                              )}
                            </SimpleGrid>
                          </Box>
                        )}

                        {/* 條件 */}
                        {option.conditions && option.conditions.length > 0 && (
                          <Box w="full">
                            <Text
                              fontSize="sm"
                              fontWeight="medium"
                              mb={2}
                              color="gray.600"
                            >
                              觸發條件:
                            </Text>
                            <VStack align="start" gap={1}>
                              {option.conditions.map((condition, index) => (
                                <Text
                                  key={index}
                                  fontSize="xs"
                                  color="orange.600"
                                >
                                  {condition.stat} {condition.operator}{" "}
                                  {condition.value}
                                </Text>
                              ))}
                            </VStack>
                          </Box>
                        )}

                        {/* 後果 */}
                        {option.consequences &&
                          option.consequences.length > 0 && (
                            <Box w="full">
                              <Text
                                fontSize="sm"
                                fontWeight="medium"
                                mb={2}
                                color="gray.600"
                              >
                                後果:
                              </Text>
                              <VStack align="start" gap={1}>
                                {option.consequences.map(
                                  (consequence, index) => (
                                    <Text
                                      key={index}
                                      fontSize="xs"
                                      color="gray.600"
                                      fontStyle="italic"
                                    >
                                      • {consequence}
                                    </Text>
                                  )
                                )}
                              </VStack>
                            </Box>
                          )}
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </VStack>
          ) : (
            <Box
              bg="gray.50"
              p={4}
              borderRadius="md"
              maxH="500px"
              overflow="auto"
              position="relative"
            >
              {/* 複製按鈕 */}
              <Button
                size="sm"
                position="absolute"
                top={2}
                right={2}
                zIndex={1}
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(event, null, 2));
                }}
                colorScheme="blue"
                variant="outline"
                color="gray.700"
                _hover={{
                  color: "gray.300",
                }}
              >
                複製
              </Button>
              <Code
                display="block"
                whiteSpace="pre-wrap"
                fontSize="xs"
                bg="transparent"
                color="gray.800"
                fontWeight="medium"
              >
                {JSON.stringify(event, null, 2)}
              </Code>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export function EventListPage({
  onNavigateToGame,
}: {
  onNavigateToGame: () => void;
}) {
  const [selectedEvent, setSelectedEvent] = useState<ExtendedEvent | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const allEvents = getAllEvents();
  const availableLocations = getAvailableLocations();

  // 計算每個地點的事件數量
  const eventCounts: Record<string, number> = useMemo(() => {
    const counts: Record<string, number> = {};

    // 計算總數
    counts[""] = allEvents.length;

    // 計算每個地點的數量
    allEvents.forEach((event) => {
      const scene = getEventScene(event.id);
      counts[scene.description] = (counts[scene.description] || 0) + 1;
    });

    return counts;
  }, [allEvents]);

  // 根據選中的地點篩選事件
  const filteredEvents = useMemo(() => {
    if (!selectedLocation) {
      return allEvents;
    }

    return allEvents.filter((event) => {
      const scene = getEventScene(event.id);
      return scene.description === selectedLocation;
    });
  }, [allEvents, selectedLocation]);

  const handleEventClick = (event: ExtendedEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <Box bg="gray.50" minH="100vh">
      {/* Header */}
      <EventListHeader onNavigateToGame={onNavigateToGame} />

      <Container maxW="container.xl" py={8}>
        <VStack gap={6} align="stretch">
          {/* 標題 */}
          <Box textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" color="gray.800" mb={2}>
              事件列表
            </Text>
            <Text fontSize="lg" color="gray.600">
              共 {allEvents.length} 個事件
            </Text>
          </Box>

          {/* 地點篩選器 */}
          <LocationFilter
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
            availableLocations={availableLocations}
            eventCounts={eventCounts}
          />

          {/* 事件網格 */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </SimpleGrid>
        </VStack>

        {/* 事件詳情 Modal */}
        <EventDetailModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </Container>
    </Box>
  );
}
