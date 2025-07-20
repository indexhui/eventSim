"use client";

import { Box, Container, Heading, Text } from "@chakra-ui/react";

import {
  motion,
  useScroll,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { useRef, useState } from "react";

import { LeftCornerTag } from "../ui/LeftCornerTag";

const MotionBox = motion(Box);

function AnimatedGrowBox() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const x = useTransform(scrollYProgress, [0.4, 0.5], ["100%", "0%"]);
  const left_x = useTransform(scrollYProgress, [0.5, 0.6], ["-100%", "0%"]);
  // 80% 以前 opacity 都是 0，80%~100% 緩慢淡入
  const opacity = useTransform(scrollYProgress, [0.58, 0.65], [0, 1]);

  return (
    <MotionBox w="100%" ref={ref} display="flex" justifyContent="center">
      <MotionBox
        border="2px solid white"
        borderRadius="12px"
        style={{ scale }}
        aspectRatio={300 / 500}
        bgImage="url(/images/mrt_bg.jpg)"
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
        position="relative"
        overflow="hidden"
        maxW="400px"
        w="100%"
      >
        <MotionBox
          position="absolute"
          right="0"
          style={{ x }}
          top="8%"
          w="40%"
          aspectRatio={147 / 89}
          bgImage="url(/images/inset_right_mrt_01.png)"
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
        ></MotionBox>
        <MotionBox
          position="absolute"
          top="35%"
          bgColor="green"
          style={{ x: left_x }}
          left="0"
          w="40%"
          aspectRatio={158 / 89}
          bgImage="url(/images/inset_left_mrt.png)"
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
        ></MotionBox>
        <MotionBox
          style={{ opacity }}
          position="absolute"
          bottom="-30px"
          right="0"
          left="0"
          margin="0 auto"
          w="80%"
          aspectRatio={200 / 280}
          bgSize="cover"
          bgImage="url(/images/penguin_passby.png)"
        ></MotionBox>
      </MotionBox>
    </MotionBox>
  );
}

export function DailyWalkSection() {
  const [bgX, setBgX] = useState(0);
  const speed = 0.5; // px per frame, 調整速度
  useAnimationFrame(() => {
    setBgX((prev) => (prev - speed) % 1000); // 1000 可改成你的圖寬
  });

  return (
    <Box
      as="section"
      py={{ base: 10, lg: 5 }}
      pt={{ base: 10, lg: 0 }}
      bgColor="white"
    >
      <Container maxW="container.xl">
        <MotionBox
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          w="100%"
          borderRadius="12px"
          bgImage="url(/images/background_noise.png)"
          bgPos="50%"
          bgSize="calc(50 / var(--vw-base-size) * 100vw) auto"
          position="relative"
          bgColor="#C0B2A6"
        >
          <LeftCornerTag>
            <Text color="black">Work</Text>
          </LeftCornerTag>
          <Box
            bgColor="#E1D5CB"
            bgImage="url(/images/background_noise.png)"
            bgPos="50%"
            bgSize="calc(50 / var(--vw-base-size) * 100vw) auto"
            position="relative"
            w="100%"
            pt="100px"
            display="flex"
            justifyContent="center"
            borderRadius="12px"
            flexDir="column"
            alignItems="center"
          >
            <Heading
              py="32px"
              as="h2"
              fontSize="48px"
              color="#9C8472"
              fontWeight="300"
            >
              走走小日
            </Heading>
            <Box
              zIndex="1"
              bgImage="url(/images/walk.png)"
              bgSize="cover"
              bgPos="center"
              bgRepeat="no-repeat"
              w="60%"
              maxW="180px"
              aspectRatio={180 / 300}
            ></Box>
            <Box
              position="absolute"
              bottom="0"
              left="0"
              w="100%"
              overflow="hidden"
              h="200px"
            >
              <MotionBox display="inline-block" w="100%">
                <MotionBox
                  w="100%"
                  h="200px"
                  position="absolute"
                  bottom="0"
                  left="0"
                  bgImage="url(/images/city_bg.png)"
                  bgRepeat="repeat-x"
                  bgSize="auto 100%"
                  style={{
                    backgroundPositionX: `${bgX}px`,
                  }}
                />
              </MotionBox>
            </Box>
          </Box>
          <Box
            w="100%"
            py="100px"
            bgColor="#C0B2A6"
            bgImage="url(/images/background_noise.png)"
            bgPos="50%"
            bgSize="calc(50 / var(--vw-base-size) * 100vw) auto"
            position="relative"
            borderRadius="12px"
          >
            <Box px="15%" w="100%" display="flex" flexDir="column">
              <AnimatedGrowBox />
            </Box>
            <MotionBox
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ amount: 1 }}
              px="12px"
              pt="24px"
              display="flex"
              justifyContent="center"
            >
              <Box maxW="600px">
                <Text fontSize="22px" fontWeight="600">
                  《走走小日》是一款描繪通勤日常的療癒手機遊戲。
                </Text>
                <Text fontSize="14px">
                  透過插畫師小白的筆觸，呈現通勤、意外、咖啡時間等生活片刻。玩家將隨著每一天的展開，進入互動關卡，體驗熟悉的日常，收集共鳴，放鬆心情。
                </Text>
              </Box>
            </MotionBox>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
