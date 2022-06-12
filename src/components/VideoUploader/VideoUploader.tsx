import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Flex, Box, Icon, Text, Button, Input, AspectRatio, useColorModeValue } from '@chakra-ui/react';
import { MdLink, MdUpload } from 'react-icons/md';
import { VideoSupportedFormatsEnum } from '@educt/enums';
import { LessonVideoType } from '@educt/types';

type VideoUploaderPropsType = {
  onChange: (file: File) => void;
  file?: File | LessonVideoType | undefined;
  preloadedVideoUrl?: string | undefined;
  setIsLinkedVideoUrl?: Dispatch<SetStateAction<boolean>>;
};

const VideoUploader: React.FC<VideoUploaderPropsType> = ({
  onChange,
  file,
  preloadedVideoUrl,
  setIsLinkedVideoUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoObjectUrl, setVideoObjectUrl] = useState<string | undefined>(undefined);
  const isPreloadedVideo = preloadedVideoUrl !== undefined;

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

  const ChangeVideoButton = () => (
    <Button mr='1' onClick={onSelectFileHandler} leftIcon={<MdUpload />} variant={'outline'} size='sm' mt='2'>
      Change video
    </Button>
  );

  const ChangeUrlVideoButton = () => (
    <Button
      onClick={() => setIsLinkedVideoUrl && setIsLinkedVideoUrl(true)}
      leftIcon={<MdLink />}
      variant={'outline'}
      size='sm'
      mt='2'
    >
      From URL
    </Button>
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoObjectUrl]);

  useEffect(() => {
    if (file && file instanceof File) {
      setVideoObjectUrl(URL.createObjectURL(file));
    }
  }, []);

  return (
    <Box>
      {file && videoObjectUrl ? (
        <Box>
          <AspectRatio maxH='lg' mt='2'>
            <video ref={videoRef} controls style={{ borderRadius: '5px' }}>
              <source src={videoObjectUrl} />
            </video>
          </AspectRatio>
          <ChangeVideoButton />
        </Box>
      ) : !isPreloadedVideo ? (
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
          <Flex mt='4'>
            <Button size='sm' onClick={onSelectFileHandler} mr='2'>
              Select file
            </Button>
            <Button size='sm' onClick={() => setIsLinkedVideoUrl && setIsLinkedVideoUrl(true)}>
              From URL
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Box>
          <AspectRatio maxH='lg' mt='2'>
            <video controls style={{ borderRadius: '5px' }}>
              <source src={preloadedVideoUrl} />
            </video>
          </AspectRatio>
          <Flex justifyContent={'flex-end'}>
            <ChangeVideoButton />
            <ChangeUrlVideoButton />
          </Flex>
        </Box>
      )}
      <Input
        type='file'
        ref={fileInputRef}
        onChange={onChangeFileHandler}
        maxW={'0'}
        h='0'
        display={'block'}
        required={false}
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
