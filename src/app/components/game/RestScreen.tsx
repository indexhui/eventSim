"use client";

import { Box, VStack, Text, Button, Center, Container } from "@chakra-ui/react";
import { useGame } from "../../../contexts/GameContext";

export function RestScreen() {
  const { state, endRest } = useGame();
  const { playerStats } = state;

  return (
    <Container maxW="container.xl" py={10}>
      <Center minH="60vh">
        <VStack gap={6} textAlign="center">
          <Box
            p={8}
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.300"
          >
            <Text fontSize="3xl" fontWeight="bold" color="gray.800" mb={4}>
              🛌 需要休息
            </Text>
            <Text fontSize="lg" color="gray.600" mb={6}>
              你的心情或體力已經歸零，需要請假休息一天來恢復。
            </Text>

            <VStack gap={4} mb={6}>
              <Text fontSize="md" color="gray.600">
                當前狀態：
              </Text>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={playerStats.心情 <= 0 ? "red.600" : "gray.700"}
              >
                心情: {playerStats.心情}
              </Text>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={playerStats.體力 <= 0 ? "red.600" : "gray.700"}
              >
                體力: {playerStats.體力}
              </Text>
            </VStack>

            <Text fontSize="md" color="gray.600" mb={6}>
              休息後將恢復：心情 +30，體力 +50
            </Text>

            <Button
              size="lg"
              colorScheme="blue"
              onClick={endRest}
              px={8}
              py={6}
              fontSize="lg"
            >
              休息一天
            </Button>
          </Box>
        </VStack>
      </Center>
    </Container>
  );
}
