import React, { useState } from 'react';
import * as helpers from '@educt/helpers';
import { Stack, Flex, Box, Icon, Text, Input, IconButton, Button } from '@chakra-ui/react';
import { MdAttachFile, MdOutlineFilePresent } from 'react-icons/md';
import { CloseIcon } from '@chakra-ui/icons';

/**
 * Hooks
 */
import { useRef } from 'react';
import { FileSupportedFormatsEnum } from '@educt/enums';
import { AttachmentFileType } from '@educt/types';

type FilesUploaderPropsType = {
  onChange: (files: File[]) => void;
  files?: File[] | undefined;
  preloadedFiles?: AttachmentFileType[] | undefined;
};

const FileContent: React.FC<{ name: string; size: number }> = ({ name, size }) => (
  <Flex alignItems={'center'}>
    <Icon as={MdOutlineFilePresent} mr='2' h={4} w={4} />
    <Text overflow={'hidden'} fontSize={'sm'} fontWeight={'medium'} lineHeight={'1rem'}>
      {name}
      <br />
      <Text as='small' color='gray.500'>
        {helpers.transformBytes(size)}
      </Text>
    </Text>
  </Flex>
);

const FileWrapper: React.FC = ({ children }) => (
  <Flex alignItems={'center'} justifyContent={'space-between'} p='3' bg={'gray.50'} borderRadius={'lg'}>
    {children}
  </Flex>
);

const FilesUploader: React.FC<FilesUploaderPropsType> = ({ onChange, files, preloadedFiles }) => {
  const [preloaded, setPreloaded] = useState<AttachmentFileType[]>(preloadedFiles || []);
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
      {preloadedFiles && files?.length === 0 && (
        <Stack>
          {preloaded.map((file, index) => (
            <FileWrapper key={index}>
              <FileContent name={file.name} size={file.size} />
              <IconButton
                onClick={() => {
                  setPreloaded(prev => prev.filter(prevFile => prevFile.size !== file.size));
                  onChange([]);
                }}
                aria-label='remove'
                variant={'unstyled'}
                size='xs'
                icon={<CloseIcon />}
              />
            </FileWrapper>
          ))}
        </Stack>
      )}
      {files && (
        <Stack>
          {files.map((file, index) => (
            <FileWrapper key={index}>
              <FileContent name={file.name} size={file.size} />
              <IconButton
                onClick={onRemoveSelectedFileHandler(file)}
                aria-label='remove'
                variant={'unstyled'}
                size='xs'
                icon={<CloseIcon />}
              />
            </FileWrapper>
          ))}
        </Stack>
      )}
      {files?.length === 0 && preloaded?.length === 0 && (
        <Text color={'gray.500'} userSelect={'none'} fontSize={'sm'} textAlign={'center'}>
          No file selected
        </Text>
      )}
      <Button
        onClick={onSelectFileHandler}
        float={'right'}
        leftIcon={<MdAttachFile />}
        variant={'outline'}
        size='sm'
        mt='3'
      >
        Select files
      </Button>
    </Box>
  );
};

export default FilesUploader;
