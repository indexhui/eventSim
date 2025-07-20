import {
  Box,
  Text,
  VStack,
  IconButton,
  useDisclosure,
  Link,
} from "@chakra-ui/react";

import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

import { ReactNode } from "react";

import { LeftCornerTag } from "./LeftCornerTag";

const MotionBox = motion(Box);

const MenuList = [
  {
    label: "Home",
    id: "home",
  },
  {
    label: "About",
    id: "about",
  },
  {
    label: "走走小日",
    id: "moments-before",
  },
  {
    label: "Contact",
    id: "contact",
  },
];

const menuContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const menuItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FullscreenMenu() {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Menu Button */}
      <IconButton
        aria-label="Open menu"
        onClick={onOpen}
        position="absolute"
        top={4}
        right={4}
        zIndex={2000}
        w="48px"
        h="48px"
        fontSize="2xl"
        borderRadius="12px"
        bg="white"
      >
        <FiMenu />
      </IconButton>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {open && (
          <MotionBox
            pos="fixed"
            inset={0}
            bg="white"
            zIndex={2100}
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Menu Content */}
            <Box
              w="100%"
              h="100%"
              textAlign="center"
              bgColor="#F3F2F1"
              borderRadius="12px"
              position="relative"
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <LeftCornerTag>
                <Text>Menu</Text>
              </LeftCornerTag>
              {/* Close Button */}
              <IconButton
                aria-label="Close menu"
                onClick={onClose}
                position="absolute"
                top={9}
                right={5}
                w="48px"
                h="48px"
                fontSize="2xl"
                borderRadius="12px"
                bg="white"
              >
                <FiX />
              </IconButton>
              <motion.div
                variants={menuContainer}
                initial="hidden"
                animate="show"
                style={{ width: "100%" }}
              >
                <VStack>
                  {MenuList.map((item) => (
                    <motion.div key={item.id} variants={menuItem}>
                      <Link
                        key={item.id}
                        href={`#${item.id}`}
                        color="black"
                        _hover={{
                          textDecoration: "none",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({
                            behavior: "smooth",
                          });
                          onClose?.();
                        }}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </VStack>
              </motion.div>
              {/* 請實作在這裡，不要改其他地方結構尤其是動到樣式 */}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}
