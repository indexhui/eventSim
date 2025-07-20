"use client";

import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import { PlayerStats, STAT_LIMITS } from "../../../types/game";

interface StatsDisplayProps {
  stats: PlayerStats;
}

// 獲取進度條顏色
function getProgressColor(value: number, maxValue: number = 100): string {
  const percentage = (value / maxValue) * 100;
  if (percentage >= 80) return "green";
  if (percentage >= 60) return "blue";
  if (percentage >= 40) return "yellow";
  if (percentage >= 20) return "orange";
  return "red";
}

// 獲取人格特質線段顏色
function getPersonalityColor(value: number): string {
  if (value > 3) return "blue";
  if (value > 0) return "green";
  if (value < -3) return "red";
  if (value < 0) return "orange";
  return "gray";
}

// 獲取人格特質對立標籤
function getPersonalityLabels(trait: string): { left: string; right: string } {
  const labelMap: Record<string, { left: string; right: string }> = {
    專注力: { left: "容易分心", right: "高度專注" },
    時間感: { left: "時間緊迫", right: "精準有餘裕" },
    社交傾向: { left: "內向", right: "外向" },
    決斷力: { left: "優柔寡斷", right: "果斷決策" },
    好奇心: { left: "保守", right: "好奇探索" },
    同理心: { left: "自我中心", right: "富有同理心" },
    穩定性: { left: "情緒波動", right: "情緒穩定" },
  };

  return labelMap[trait] || { left: "低", right: "高" };
}

// 人格特質線段組件
function PersonalitySlider({ trait, value }: { trait: string; value: number }) {
  const labels = getPersonalityLabels(trait);
  const color = getPersonalityColor(value);

  // 將 -10 到 10 的值映射到 0 到 100 的百分比
  const percentage = ((value + 10) / 20) * 100;

  return (
    <Box w="100%">
      <HStack justify="space-between" mb={1}>
        <Text fontSize="xs" color="gray.700" fontWeight="medium">
          {trait}
        </Text>
        <Text fontSize="xs" fontWeight="bold" color="gray.700">
          {value}
        </Text>
      </HStack>

      {/* 線段背景 */}
      <Box
        w="100%"
        h="6px"
        bg="gray.200"
        borderRadius="full"
        position="relative"
        mb={1}
      >
        {/* 中間點 */}
        <Box
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          w="2px"
          h="8px"
          bg="gray.400"
          borderRadius="full"
        />

        {/* 當前位置指示器 */}
        <Box
          position="absolute"
          left={`${percentage}%`}
          top="50%"
          transform="translate(-50%, -50%)"
          w="12px"
          h="12px"
          bg={`${color}.500`}
          borderRadius="full"
          border="2px solid white"
          zIndex={2}
        />

        {/* 進度條 */}
        <Box
          position="absolute"
          left="0"
          top="0"
          h="100%"
          bg={`${color}.300`}
          borderRadius="full"
          w={`${percentage}%`}
          transition="width 0.3s ease"
        />
      </Box>

      {/* 標籤 */}
      <HStack justify="space-between" fontSize="xs">
        <Text color="gray.600" fontWeight="medium">
          {labels.left}
        </Text>
        <Text color="gray.500" fontWeight="medium">
          中性
        </Text>
        <Text color="gray.600" fontWeight="medium">
          {labels.right}
        </Text>
      </HStack>
    </Box>
  );
}

// 檢查是否需要警告
function getWarningStatus(stats: PlayerStats) {
  const warnings = [];

  if (stats.心情 <= 20) warnings.push("心情低落");
  if (stats.體力 <= 20) warnings.push("體力不足");
  if (stats.儲蓄 <= 100) warnings.push("儲蓄不足");

  return warnings;
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  const basicStats = ["心情", "體力"] as const;
  const personalityTraits = [
    "專注力",
    "時間感",
    "社交傾向",
    "決斷力",
    "好奇心",
    "同理心",
    "穩定性",
  ] as const;
  const warnings = getWarningStatus(stats);

  return (
    <Box
      p={4}
      bg="white"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.300"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.700">
        角色屬性
      </Text>

      {/* 警告訊息 */}
      {warnings.length > 0 && (
        <Box
          p={3}
          bg="orange.50"
          border="1px solid"
          borderColor="orange.200"
          borderRadius="md"
          mb={4}
        >
          <HStack>
            <Text fontSize="lg" color="orange.600">
              ⚠️
            </Text>
            <Text fontSize="sm" color="orange.700">
              {warnings.join("、")}
            </Text>
          </HStack>
        </Box>
      )}

      {/* 基礎數值 */}
      <VStack gap={3} mb={6}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="gray.700"
          alignSelf="flex-start"
        >
          基礎數值
        </Text>

        {/* 心情和體力 */}
        {basicStats.map((stat) => (
          <Box key={stat} w="100%">
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm" color="gray.700">
                {stat}
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="gray.700">
                {stats[stat]}/{STAT_LIMITS[stat].max}
              </Text>
            </HStack>
            <Box
              w="100%"
              h="8px"
              bg="gray.200"
              borderRadius="full"
              overflow="hidden"
            >
              <Box
                h="100%"
                bg={`${getProgressColor(stats[stat])}.500`}
                w={`${(stats[stat] / STAT_LIMITS[stat].max) * 100}%`}
                transition="width 0.3s ease"
              />
            </Box>
          </Box>
        ))}

        {/* 儲蓄 */}
        <Box w="100%">
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" color="gray.700">
              儲蓄
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="green.600">
              ${stats.儲蓄.toLocaleString()}/
              {STAT_LIMITS.儲蓄.max.toLocaleString()}
            </Text>
          </HStack>
          <Box
            w="100%"
            h="8px"
            bg="gray.200"
            borderRadius="full"
            overflow="hidden"
          >
            <Box
              h="100%"
              bg="green.500"
              w={`${(stats.儲蓄 / STAT_LIMITS.儲蓄.max) * 100}%`}
              transition="width 0.3s ease"
            />
          </Box>
        </Box>
      </VStack>

      {/* 人格特質 */}
      <VStack gap={3}>
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="gray.700"
          alignSelf="flex-start"
        >
          人格特質
        </Text>

        <VStack gap={4} w="100%">
          {personalityTraits.map((trait) => (
            <PersonalitySlider key={trait} trait={trait} value={stats[trait]} />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
