import React, { useEffect, useRef, useState } from 'react';
import { Flex, Box, Icon, Text, Button, Input, AspectRatio, useColorModeValue } from '@chakra-ui/react';
import { MdUpload } from 'react-icons/md';
import { VideoSupportedFormatsEnum } from '@educt/enums';

type VideoUploaderPropsType = {
  onChange: (file: File) => void;
  file?: File | undefined;
};

const VideoUploader: React.FC<VideoUploaderPropsType> = ({ onChange, file }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoObjectUrl, setVideoObjectUrl] = useState<string | undefined>(undefined);

  const onSelectFileHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { files } = e.target;

    if (files && files.length !== 0) {
      const file = files[0];

      if (file.type.match('video.*')) {
        onChange(file);
        setVideoObjectUrl(prevUrl => {
          prevUrl && URL.revokeObjectURL(prevUrl);
          const newUrl = URL.createObjectURL(file);
          return newUrl;
        });
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoObjectUrl]);

  return (
    <Box>
      {file && videoObjectUrl ? (
        <Box>
          <AspectRatio maxH='lg' mt='2'>
            <video ref={videoRef} controls style={{ borderRadius: '5px' }}>
              <source src={videoObjectUrl} />
            </video>
          </AspectRatio>
          <Button
            onClick={onSelectFileHandler}
            leftIcon={<MdUpload />}
            variant={'outline'}
            size='sm'
            mt='2'
            float='right'
          >
            Change video
          </Button>
        </Box>
      ) : (
        <Flex
          p='40px 10px'
          textAlign={'center'}
          borderRadius={'md'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          borderWidth={'1px'}
        >
          <Box bg={useColorModeValue('gray.100', 'gray.700')} p='6' borderRadius={'full'}>
            <Icon as={MdUpload} h={16} w={16} color='gray.400' />
          </Box>
          <Box mt='4'>
            <Text fontSize={'md'}>
              Upload a video file <br />
              <Text as='span' fontSize='sm' color='gray.500'>
                The video will be uploaded to cloud or local storage depending on the server configuration.
              </Text>
            </Text>
          </Box>
          <Button onClick={onSelectFileHandler} mt='6'>
            Select file
          </Button>
        </Flex>
      )}
      <Input
        type='file'
        ref={fileInputRef}
        onChange={onChangeFileHandler}
        maxW={'0'}
        h='0'
        display={'block'}
        opacity={'0'}
        ml='auto'
        mr='auto'
        accept={Object.keys(VideoSupportedFormatsEnum)
          .map(ext => `.${ext.toLowerCase()}`)
          .join(', ')}
      />
    </Box>
  );
};

export default VideoUploader;
