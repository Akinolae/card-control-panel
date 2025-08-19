import {
  Box,
  Flex,
  Text,
  Select,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { CustomTable, DashBoardHeaderWrapper } from "../../../components/ui";
import { createClass } from "../../../services/class";
import { IoAddCircleSharp } from "react-icons/io5";
import { addStudent } from "../../../services/student";
import AddStudentModal from "../../../components/modals/AddStudentModal";

const Students = () => {
  const { students, classes, ...rest } = useSelector((data: any) => data.user);
  const [currentClass, setCurrentClass] = useState<string>(
    !!classes.length ? classes[0].class_id : ""
  );
  const [className, setClassName] = useState<string>("");
  const [apiError, setError] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log({ rest, classes, students });

  const toast = useToast();

  const currentClassStudents = students[currentClass] || [];

  const dataSource = useMemo(
    () =>
      currentClassStudents.map((student: any) => ({
        ...student,
      })),
    [currentClassStudents]
  );

  const tableHead = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Middle name",
      dataIndex: "middleName",
      key: "middleName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Guardian Email",
      dataIndex: "guardianEmail",
      key: "guardianEmail",
    },
  ];

  const handleSubmit = async (e: any) => {
    try {
      await addStudent(e);
      onClose();
    } catch (error: any) {
      toast({
        description: error,
        status: "error",
        position: "top-right",
      });
    }
  };

  const createClassFn = async () => {
    setError("");
    try {
      await createClass(className);
    } catch (error: any) {
      setError(error);
    }
  };

  // const fil = !!file && useDataExtractor({ e: file });

  return (
    <Box>
      <AddStudentModal
        classes={classes}
        isOpen={isOpen}
        onClose={onClose}
        className={className}
        handleSubmit={handleSubmit}
        apiError={apiError}
        createClassFn={createClassFn}
        setClassName={setClassName}
      />

      <Box>
        <Flex mt={"5%"} justifyContent={"space-between"} alignItems={"center"}>
          <Box width={"30%"}>
            <Text fontWeight={700}>Classes</Text>
            <Select
              pt={"10px"}
              style={{ width: "100%" }}
              value={currentClass}
              placeholder="Select class"
              onChange={(e) => setCurrentClass(e.target.value)}
            >
              {classes.map((val: any, index: number) => {
                return (
                  <option key={index} value={val.class_id}>
                    {val.label}
                  </option>
                );
              })}
            </Select>
          </Box>
          <Flex alignItems={"center"}>
            <Button
              onClick={onOpen}
              style={{ backgroundColor: "transparent", padding: 0 }}
            >
              <IoAddCircleSharp style={{ fontSize: "24px" }} />
            </Button>
          </Flex>
        </Flex>

        <Box mt={"20px"}>
          <CustomTable
            rowKey={"student_id"}
            size="large"
            tableHead={tableHead}
            dataSource={dataSource}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Students;
