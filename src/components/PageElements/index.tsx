import React from 'react';
import { BoxProps, Box, Flex, Heading, Text, Divider } from '@chakra-ui/react';

interface IPageHeadingProps extends BoxProps {
  headingPrefix?: JSX.Element;
  heading: string;
  description?: string;
}

export const PageWrapper: React.FC<BoxProps> = props => {
  return <Box {...props}>{props.children}</Box>;
};

export const PageHeading: React.FC<IPageHeadingProps> = props => {
  const { headingPrefix, heading, description, ...boxProps } = props;
  return (
    <Box {...boxProps}>
      <Flex alignItems={'center'}>
        {headingPrefix}
        <Heading as='h1'>{heading}</Heading>
      </Flex>
      {description && <Text mt='2'>{description}</Text>}
      {props.children}
      <Divider mt='5' />
    </Box>
  );
};

export const PageContent: React.FC<BoxProps> = props => (
  <Box mt='4' {...props}>
    {props.children}
  </Box>
);

export const PageFooter: React.FC<BoxProps> = props => (
  <Box mt='4' {...props}>
    <Divider m='20px 0' />
    {props.children}
  </Box>
);
