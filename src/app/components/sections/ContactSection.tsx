"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { LuMail, LuInstagram, LuTwitter } from "react-icons/lu";
import { motion, useScroll, useTransform } from "framer-motion";

import { useRef } from "react";

import { LeftCornerTag } from "../ui/LeftCornerTag";

const MotionBox = motion(Box);

export function ContactSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 背景圖大小從 100% 變到 120%
  const backgroundSize = useTransform(
    scrollYProgress,
    [0.4, 1],
    ["100% 100%", "200% 200%"]
  );
  return (
    <Box id="contact" as="section" py={10} bg="white" color="white">
      <Container maxW="container.xl" pt={8}>
        <MotionBox
          ref={ref}
          w="100%"
          bg="white"
          aspectRatio={{ base: 350 / 550, md: 16 / 9 }}
          bgImage={{
            base: "url('/images/contact.jpg')",
            md: "url('/images/contact_lg.jpg')",
          }}
          style={{ backgroundSize }}
          position="relative"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          borderRadius="12px"
          display="flex"
          flexDir="column-reverse"
          //   justifyContent="center"
          alignItems="center"
        >
          <LeftCornerTag>
            <Text fontSize="24px" fontFamily="Poppins" color="black">
              CONTACT
            </Text>
          </LeftCornerTag>
          <Box>
            <Text opacity="0.8">hello@mugiuo.com</Text>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
