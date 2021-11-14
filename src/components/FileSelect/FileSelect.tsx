import React, { useRef } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { MdAttachFile } from 'react-icons/md';
import * as helpres from '@educt/helpers';

/**
 * Hooks
 */
import { useColorModeValue } from '@chakra-ui/color-mode';

type FileSelectPropsType = {
  onChange: (file: File) => void;
  supportedFormats?: string[];
  file?: File | undefined;
};

const FileSelect: React.FC<FileSelectPropsType> = ({ onChange, file, supportedFormats }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle the file input selection
   */
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

      onChange(file);
    }
  };

  return (
    <Box
      backgroundColor={useColorModeValue('gray.50', 'gray.700')}
      p='15px 20px'
      lineHeight='20px'
      borderRadius='md'
      borderWidth='1px'
    >
      <Input type='file' ref={fileInputRef} onChange={onChangeFileHandler} display='none' />
      <Flex justifyContent='space-between' alignItems='center' sx={{ gap: '10px' }}>
        <Box>
          {file ? (
            <Text fontSize='lg' fontWeight='bold'>
              {file.name}
              <br />
              <Text as='small' fontWeight='normal'>
                {helpres.transformBytes(file.size)}
              </Text>
            </Text>
          ) : (
            <Text fontWeight='normal' color='gray'>
              Choose a file...
            </Text>
          )}
          {supportedFormats && (
            <Box mt='1'>
              <Text as='small' fontSize='xs' color='gray.500'>
                Supported formats: {supportedFormats.join(', ')}
              </Text>
            </Box>
          )}
        </Box>
        <Box p='0 5px'>
          <Button onClick={onSelectFileHandler} rightIcon={<MdAttachFile />}>
            Select file
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default FileSelect;
