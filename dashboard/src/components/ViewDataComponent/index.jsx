import React, { useState, useEffect, useContext, useRef } from "react";
import { ButtonGroup, useToast } from "@chakra-ui/react";
import { ideasContext } from "../../Context/IdeasContext";
import { ImageModalContext } from "../../Context/ImageModalContext";

import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
  Image,
  Flex,
  VStack,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

import { SectionsContext } from "../../Context/SectionsContext";

const Index = ({ headers, type, DataForLooping }) => {
  const { sections, fetchSections } = useContext(SectionsContext);
  const { ideas, fetchIdeas } = useContext(ideasContext);
  const { ideasWaiting, fetchIdeasWaiting } = useContext(ideasContext);

  // Sections Logic
  const [sectionsName, setSectionName] = useState("");
  const [sectionImage, setSectionImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [addSectionWait, setAddSectionWait] = useState(false);
  const [deleteWait, setDeleteWait] = useState(false);
  const [approveWait, setApproveWait] = useState(false);
  const takeImageRef = useRef(null);

  const { openModal: imageModalOpen, setSelectedImage } =
    useContext(ImageModalContext);
  console.log(DataForLooping);
  const toast = useToast({
    position: "top",
    title: "Container style is updated",
    containerStyle: {
      width: "800px",
      maxWidth: "100%",
    },
  });

  const PR = `${import.meta.env.VITE_APP_ROOT}/images/`;

  useEffect(() => {
    if (sectionImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(sectionImage);
    } else {
      setPreview("");
    }
  }, [sectionImage]);
  const handleDeleteSection = async (id) => {
    if (deleteWait) return;
    try {
      setDeleteWait(true);
      await axios.delete(
        `${import.meta.env.VITE_APP_ROOT}/api/admin/section/${id}`
      );
      toast({
        title: "تم حذف القسم.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setDeleteWait(false);
      fetchSections();
    } catch (error) {
      toast({
        title: "حدقت مشكلة اثناء حذف القسم.",
        description: "We've created your account for you.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setDeleteWait(true);
    }
  };

  const handleAddSection = async (e) => {
    e.preventDefault();
    if (!sectionsName) {
      toast({
        title: " اختر اسم القسم.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setSectionName("");
    setPreview("");
    setSectionImage(null);

    const DATA = {
      sectionName: sectionsName,
    };

    if (sectionImage) {
      const data = new FormData();
      const fileName = Date.now() + sectionImage.name;
      DATA.sectionImage = fileName;
      console.log("IMAGE", sectionImage);
      data.append("name", fileName);
      data.append("file", sectionImage);
      setAddSectionWait(true);

      try {
        await axios.post(`${import.meta.env.VITE_APP_ROOT}/api/upload`, data);
      } catch (error) {
        console.log(error);
        setAddSectionWait(false);
      }
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_ROOT}/api/admin/section`,
        DATA
      );
      toast({
        title: " تمت اضافة القسم  .",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setPreview("");
      fetchSections();
      setAddSectionWait(false);
    } catch (error) {
      toast({
        title: " حدث خطأ اثناء اضافة القسم  .",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setAddSectionWait(false);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file && file.type.substr(0, 5) === "image") {
      setSectionImage(file);
    } else {
      setSectionImage(null);
    }
  };

  //ideas Logic

  //ideas Waiting Logic
  const [isApprovButtonDisaple, setIsApprovButtonDisaple] = useState(false);

  const handleDeleteIdea = async (id) => {
    if (deleteWait) return;
    try {
      setDeleteWait(true);

      await axios.delete(
        `${import.meta.env.VITE_APP_ROOT}/api/admin/idea/${id}`
      );
      toast({
        title: "تم حذف الفكرة.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setDeleteWait(false);
      type === "ideas" ? fetchIdeas() : fetchIdeasWaiting();
    } catch (error) {
      toast({
        title: "حدقت مشكلة اثناء حذف الفكرة.",
        description: "We've created your account for you.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleApproveIdea = async (id) => {
    if (approveWait) return;
    try {
      setApproveWait(true);
      await axios.get(
        `${import.meta.env.VITE_APP_ROOT}/api/admin/approval/${id}`
      );
      toast({
        title: "تم قبول الفكرة.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setApproveWait(false);
      fetchIdeasWaiting();
      fetchIdeas();
    } catch (error) {
      toast({
        title: "حدقت مشكلة اثناء قبول الفكرة.",
        description: "We've created your account for you.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setApproveWait(false);
    }
  };

  return (
    <Box>
      <Flex width={"100%"} justifyContent="space-around">
        {headers.map((h) => (
          <Text fontSize={{ base: "16px", md: "40px", lg: "45px" }}> {h} </Text>
        ))}
      </Flex>
      <Flex flexWrap={"wrap"} marginTop={"2rem"}>
        {DataForLooping.map((s) => (
          <Flex
            justifyContent={"space-evenly"}
            width="100%"
            alignItems={"center"}
            backgroundColor="#EEEE"
            paddingY={"1rem"}
          >
            <Text fontSize={{ base: "16px", md: "20px", lg: "36px" }}>
              {type === "sections" ? s.sectionName : s.ideaDesc}
            </Text>
            <Box flexBasis={"30%"}>
              {typeof s.ideaImage === "string" ||
              typeof s.sectionImage === "string" ? (
                <Image
                  src={`${PR}${
                    type === "sections" ? s.sectionImage : s.ideaImage
                  }`}
                  onClick={() => {
                    setSelectedImage(
                      type === "sections" ? s.sectionImage : s.ideaImage
                    );
                    imageModalOpen();
                  }}
                />
              ) : (
                <Text> لا يوجد صورة </Text>
              )}
            </Box>

            <ButtonGroup textAlign="center">
              <Button
                colorScheme="red"
                onClick={() =>
                  type === "sections"
                    ? handleDeleteSection(s._id)
                    : handleDeleteIdea(s._id)
                }
                size={{ base: "xs", md: "sm", lg: "md" }}
                isLoading={deleteWait}
                loadingText={"جاري الحذف"}
              >
                حذف
              </Button>
              {type === "ideasForWait" && (
                <Button
                  colorScheme="green"
                  onClick={() => handleApproveIdea(s._id)}
                  isLoading={approveWait}
                  loadingText={"جاري قبول الفكرة"}
                  size={{ base: "xs", md: "sm", lg: "md" }}
                >
                  قبول
                </Button>
              )}
            </ButtonGroup>
          </Flex>
        ))}
      </Flex>

      {type === "sections" && (
        <VStack>
          <FormControl marginTop="3rem">
            <FormLabel>اسم القسم</FormLabel>
            <Input
              type="text"
              value={sectionsName}
              onChange={(e) => setSectionName(e.target.value)}
            />
            <FormLabel>صورة القسم</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleChangeImage(e)}
              accept="image/*"
              name="file"
              ref={takeImageRef}
            />
          </FormControl>
          {preview && (
            <Image
              width={"20%"}
              src={preview}
              alignSelf={"flex-start"}
              onClick={() => imageModalOpen()}
            />
          )}
          <Button
            alignSelf={"flex-start"}
            colorScheme={"green"}
            onClick={(e) => handleAddSection(e)}
            isLoading={addSectionWait}
            loadingText={"جاري اضافة القسم"}
          >
            اضافة قسم
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
