"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { LeftCornerTag } from "../ui/LeftCornerTag";

const MotionBox = motion(Box);

export function AboutSection() {
  return (
    <Box
      id="about"
      position="relative"
      bg="white"
      p={{ base: 4, md: 8 }}
      w="100%"
      py={12}
    >
      <MotionBox
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0.5, y: 20 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.5 }}
        bgColor="#FDF6F3"
        position="relative"
        w="100%"
        py={12}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {/* 內容 */}
        <LeftCornerTag>
          <Text color="black">About</Text>
        </LeftCornerTag>
        <VStack gap={6} pt={10} px={4} maxW="600px">
          <Text
            fontSize="16px"
            textAlign="center"
            lineHeight="1.5 "
            fontWeight="500"
            color="#444"
          >
            以生活日常為靈感，在每個微小的喜好裡撒野。任性探索不預設形式圖像、故事與物件的每種可能，創造值得被喜歡的柔軟與怪誕。
          </Text>
          <Box
            w="100%"
            aspectRatio={415 / 250}
            borderRadius="12px"
            overflow="hidden"
            bg="gray.200"
            bgImage="url(/images/about.jpg)"
            bgSize="cover"
            bgPos="center"
            bgRepeat="no-repeat"
          />
        </VStack>
      </MotionBox>
    </Box>
  );
}
