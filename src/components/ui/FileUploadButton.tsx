import { Box, Button } from "@chakra-ui/react";
import { useRef } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { GoFileDirectoryFill } from "react-icons/go";

const FileInputButton = (props: any) => {
  const ref: any = useRef(null);

  return (
    <Box>
      <input
        {...props}
        ref={ref}
        style={{ display: "none" }}
        type="file"
        accept=".csv, .xls, .xlsx"
      />
      <Button
        style={{ backgroundColor: "transparent", padding: 0 }}
        onClick={() => ref.current?.click()}
        type="button"
      >
        <GoFileDirectoryFill style={{ fontSize: "60px" }} />
      </Button>
    </Box>
  );
};

export default FileInputButton;
