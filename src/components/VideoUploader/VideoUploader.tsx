import React, { useRef } from 'react';
import { Flex, Box, Icon, Text, Button, Input, AspectRatio, useColorModeValue } from '@chakra-ui/react';
import { MdUpload } from 'react-icons/md';
import { VideoSupportedFormatsEnum } from '@educt/enums';

type VideoUploaderPropsType = {
  onChange: (file: File) => void;
  file?: File | undefined;
};

const VideoUploader: React.FC<VideoUploaderPropsType> = ({ onChange, file }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      file.type.match('video.*') && onChange(file);
    }
  };
  return (
    <Box>
      <Input
        type='file'
        ref={fileInputRef}
        onChange={onChangeFileHandler}
        display='none'
        accept={Object.keys(VideoSupportedFormatsEnum)
          .map(ext => `.${ext.toLowerCase()}`)
          .join(', ')}
      />
      {file ? (
        <Box>
          <AspectRatio maxH='lg' mt='2'>
            <video controls style={{ borderRadius: '5px' }}>
              <source src={URL.createObjectURL(file)} />
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
          p='40px 0'
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
    </Box>
  );
};

export default VideoUploader;
