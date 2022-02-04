import React from 'react';
import { BoxProps, Box, Flex, Heading, Text, Divider } from '@chakra-ui/react';

interface IPageComposition {
  Heading: React.FC<IPageHeadingProps & BoxProps>;
  Content: React.FC<BoxProps>;
  Footer: React.FC<BoxProps>;
}

const Page: React.FC<BoxProps> & IPageComposition = props => {
  return <Box {...props}>{props.children}</Box>;
};

interface IPageHeadingProps {
  headingPrefix?: JSX.Element;
  heading: string;
  description?: string;
}

Page.Heading = props => {
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

Page.Content = props => (
  <Box mt='4' {...props}>
    {props.children}
  </Box>
);

Page.Footer = props => (
  <Box mt='4' {...props}>
    <Divider m='20px 0' />
    {props.children}
  </Box>
);

export { Page };
