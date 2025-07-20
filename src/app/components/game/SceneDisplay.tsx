"use client";

import { Box, VStack, Text, Image, Badge } from "@chakra-ui/react";
import { getEventScene } from "../../../data/scenes/scene-manager";
import { ExtendedEvent } from "../../../data/events/constants";

interface SceneDisplayProps {
  event: ExtendedEvent;
}

export function SceneDisplay({ event }: SceneDisplayProps) {
  const scene = getEventScene(event.id);

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
      p={4}
      w="300px"
      flexShrink={0}
    >
      <VStack align="stretch" gap={4}>
        {/* 標題 */}
        <Text fontSize="lg" fontWeight="semibold" color="gray.800">
          場景背景
        </Text>

        {/* 場景圖片 */}
        <Box
          bg="gray.100"
          h="200px"
          borderRadius="md"
          position="relative"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {scene.imagePath ? (
            <Image
              src={scene.imagePath}
              alt={scene.description}
              w="full"
              h="full"
              objectFit="cover"
            />
          ) : (
            <Box
              w="full"
              h="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="gray.200"
            >
              <Text color="gray.500" fontSize="sm">
                無場景圖片
              </Text>
            </Box>
          )}
        </Box>

        {/* 場景資訊 */}
        <VStack align="start" gap={2}>
          <Text fontSize="md" fontWeight="medium" color="gray.700">
            {scene.description}
          </Text>

          <Badge colorScheme="blue" variant="subtle" fontSize="xs">
            {scene.category}
          </Badge>
        </VStack>

        {/* 場景描述 */}
        <Box>
          <Text fontSize="sm" color="gray.600" lineHeight="1.5">
            你現在身處在 {scene.description}。這個場景為當前事件提供了背景氛圍，
            讓你能更好地沉浸在遊戲情境中。
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
