import React from 'react';
import * as helpres from '@educt/helpers';
import { Stack, Flex, Box, Icon, Text, Input, IconButton, Button } from '@chakra-ui/react';
import { MdOutlineFilePresent } from 'react-icons/md';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

/**
 * Hooks
 */
import { useRef } from 'react';
import { FileSupportedFormatsEnum } from '@educt/enums';

type FilesUploaderPropsType = {
  onChange: (files: File[]) => void;
  files?: File[] | undefined;
};

const FilesUploader: React.FC<FilesUploaderPropsType> = ({ onChange, files }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectFileHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Detach file
   */
  const onRemoveSelectedFileHandler = (selectedFile: File) => () => {
    onChange([...Array.from(files?.filter(file => file.name !== selectedFile.name) || [])]);
  };

  /**
   * Attach file
   */
  const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length !== 0) {
      const isAlreadySelected = (files || []).find(selectedFile =>
        Array.from(e.target.files || []).some(file => file.name === selectedFile.name)
      );

      if (isAlreadySelected) return;
      onChange([...Array.from(files || []), ...e.target.files]);
    }
  };

  return (
    <Box>
      <Input
        type='file'
        ref={fileInputRef}
        onChange={onChangeFileHandler}
        display='none'
        multiple
        accept={Object.keys(FileSupportedFormatsEnum)
          .map(ext => `.${ext.toLowerCase()}`)
          .join(', ')}
      />
      {files && (
        <Stack>
          {files.map((file, index) => (
            <Flex
              key={index}
              alignItems={'center'}
              justifyContent={'space-between'}
              p='3'
              bg={'gray.50'}
              borderRadius={'lg'}
            >
              <Flex alignItems={'center'}>
                <Icon as={MdOutlineFilePresent} mr='2' h={4} w={4} />
                <Text overflow={'hidden'} fontSize={'sm'} fontWeight={'medium'} lineHeight={'1rem'}>
                  {file.name}
                  <br />
                  <Text as='small' color='gray.500'>
                    {helpres.transformBytes(file.size)}
                  </Text>
                </Text>
              </Flex>
              <IconButton
                onClick={onRemoveSelectedFileHandler(file)}
                aria-label='remove'
                variant={'unstyled'}
                size='xs'
                icon={<CloseIcon />}
              />
            </Flex>
          ))}
        </Stack>
      )}
      <Button onClick={onSelectFileHandler} float={'right'} leftIcon={<AddIcon />} variant={'outline'} size='sm' mt='3'>
        Upload new
      </Button>
    </Box>
  );
};

export default FilesUploader;
