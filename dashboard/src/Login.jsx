import React from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  useToast,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const toast = useToast({
    position: "top",
    title: "Container style is updated",
    containerStyle: {
      width: "800px",
      maxWidth: "100%",
    },
  });

  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPssword] = useState("");

  const handleLogin = async () => {
    if (!password) {
      toast({
        title: "   ادخل كلمة المرور",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_ROOT}/api/admin/login`,
        {
          password: password,
        }
      );

      localStorage.setItem("admin", password);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setPassword("");
      toast({
        title: "كلمة المرور غير صحيحة",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword) {
      toast({
        title: " ادخل كلمة المرور القديمة  ",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (!newPassword) {
      toast({
        title: " ادخل كلمة المرور الجديدة  ",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_ROOT}/api/admin/login/change`,
        {
          newPassword,
          oldPassword,
        }
      );
      toast({
        title: "تم تغيير كلمة المرور    ",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setNewPssword("");
      setOldPassword("");
    } catch (error) {
      console.log(error);
      toast({
        title: "كلمة المرور القديمة غير صحيحة",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      setNewPssword("");
      setOldPassword("");
    }
  };

  //   const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
      bg={formBackground}
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
        <Box marginBottom={"2rem"}>
          <Heading>تسجيل الدخول</Heading>
          <FormLabel mt={"1rem"}> كلمة المرور </FormLabel>
          <Input
            type="password"
            variant="flushed"
            mb={6}
            border="1px"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir={"ltr"}
            paddingLeft={"1rem"}
          />
          <Button colorScheme="teal" mb={3} onClick={handleLogin}>
            تسجيل الدخول
          </Button>
        </Box>

        <Box>
          <Heading>تغيير كلمة السر </Heading>

          <FormLabel mt={"1rem"}> كلمة المرور القديمة </FormLabel>
          <Input
            type="password"
            variant="flushed"
            mb={6}
            border="1px"
            dir={"ltr"}
            paddingLeft={"1rem"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <FormLabel> كلمة المرور الجديدة </FormLabel>
          <Input
            type="password"
            variant="flushed"
            mb={6}
            border="1px"
            dir={"ltr"}
            paddingLeft={"1rem"}
            value={newPassword}
            onChange={(e) => setNewPssword(e.target.value)}
          />
          <Button colorScheme="teal" mb={3} onClick={handleChangePassword}>
            تغيير كلمة المرور
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
