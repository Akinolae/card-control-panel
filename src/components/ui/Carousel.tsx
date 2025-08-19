import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flex, Box } from "@chakra-ui/react";

const sliderVariants = {
  incoming: (direction: any) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: any) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
  type: "just",
};

const Carousel = (props: any) => {
  const { components } = props;
  const [current, setCurrent] = useState(0);
  const [[imageCount, direction], setImageCount] = useState([0, 0]);

  return (
    <Box>
      <Flex flexDir={"column"} gap={"20px"}>
        <Box
          position={"relative"}
          height={"350px"}
          width={"500px"}
          overflow={"hidden"}
          borderRadius={"10px"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{ y: 300, opacity: 0 }}
              transition={sliderTransition}
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                willChange: "transform, opacity",
                backgroundImage: `url(${components[current].bg})`,
              }}
            >
              <p>yesss</p>
            </motion.div>
          </AnimatePresence>
        </Box>
        <Flex justifyContent={"center"} gap={"5px"}>
          {components.map((_, i: number) => {
            return (
              <Box
                cursor={"pointer"}
                key={i}
                h={"10px"}
                w={"10px"}
                background={current === i ? "grey" : "white"}
                borderRadius={"50%"}
                onClick={() => setCurrent(i)}
              />
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Carousel;
