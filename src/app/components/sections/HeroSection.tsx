"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  BoxProps,
} from "@chakra-ui/react";
import { LeftCornerTag } from "../ui/LeftCornerTag";
import { FullscreenMenu } from "../ui/FullscreenMenu";

import { ReactNode } from "react";

function RightCornerTag({
  children,
  ...boxProps
}: { children: ReactNode } & BoxProps) {
  return (
    <Box
      pos="absolute"
      bottom={0}
      right={0}
      bg="white"
      borderTopLeftRadius="24px"
      w="120px"
      h="48px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...boxProps}
    >
      <Box
        w="24px"
        h="24px"
        backgroundImage="url(/images/right_offset.svg)"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        pos="absolute"
        top="-24px"
        right={0}
      />
      <Box
        w="24px"
        h="24px"
        backgroundImage="url(/images/right_offset.svg)"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        pos="absolute"
        bottom="0"
        left="-24px"
      />
      <Text fontSize="16px" fontFamily="Poppins">
        {children}
      </Text>
    </Box>
  );
}

export function HeroSection() {
  return (
    <Box
      as="section"
      id="home"
      display="flex"
      alignItems="center"
      bg="white"
      color="black"
      h={{ base: "unset", lg: "100vh" }}
    >
      <Container maxW="container.xl" pt={8} pb={16}>
        <Box
          w="100%"
          aspectRatio={{ base: 415 / 502, md: 16 / 9 }}
          bgImage={{
            base: `url('/images/mb_hero.jpg')`,
            md: `url('/images/hero_lg.jpg')`,
          }}
          position="relative"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          borderRadius="12px"
        >
          <FullscreenMenu></FullscreenMenu>
          <LeftCornerTag px={4} py={2}>
            <Text fontSize="24px" fontFamily="Poppins">
              Mugio
            </Text>
          </LeftCornerTag>
          {/* 右下 Scroll Down 標籤區塊還原 */}
          <RightCornerTag>Scroll Down</RightCornerTag>
        </Box>
      </Container>
    </Box>
  );
}
