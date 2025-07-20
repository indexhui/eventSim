import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LeftCornerTagProps extends BoxProps {
  children: ReactNode;
  bg?: string;
}

export function LeftCornerTag({
  children,
  bg = "white",
  px = 6,
  py = 4,
  ...boxProps
}: LeftCornerTagProps) {
  return (
    <Box
      zIndex={1}
      pos="absolute"
      top={0}
      left={0}
      bg={bg}
      borderBottomRightRadius="16px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={px}
      py={py}
      {...boxProps}
    >
      <Box
        w="24px"
        h="24px"
        backgroundImage="url(/images/left_offset.svg)"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        pos="absolute"
        bottom="-24px"
        left={0}
      />
      <Box
        w="24px"
        h="24px"
        backgroundImage="url(/images/left_offset.svg)"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        pos="absolute"
        top={0}
        right="-24px"
      />
      {children}
    </Box>
  );
}
