import React from 'react';
import { observer } from 'mobx-react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Badge, Image, Link, IconButton, Icon } from '@chakra-ui/react';
import { Flex, Box, Heading, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { MdNote, MdMoreHoriz, MdGroup, MdThumbUp, MdVideoLibrary } from 'react-icons/md';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

/**
 * Types
 */
import { ICourse } from '@educt/interfaces';
import { CourseStatusEnum } from '@educt/enums';

/**
 * Components
 */
import CourseStatusBadge from '@educt/components/CourseStatusBadge';

/**
 * Hooks
 */
import { useColorMode } from '@chakra-ui/color-mode';
import { useRootStore } from '@educt/hooks/useRootStore';

export type CourseItemPropsType = {
  course: Omit<ICourse, 'teacher' | 'students' | 'lessons'>;
  onDelete: (course: Pick<ICourse, 'id' | 'title'>) => void;
  onSetStatus: (id: string, status: CourseStatusEnum) => Promise<void>;
};

const CourseItem: React.FC<CourseItemPropsType> = ({ course, onDelete, onSetStatus }) => {
  const {
    userStore: { me },
  } = useRootStore();
  const { colorMode } = useColorMode();

  if (me === null) return null;

  return (
    <Box borderWidth='1px' borderRadius='lg'>
      {(me.isAdmin || me.isTeacher) && (
        <Flex justifyContent='flex-end'>
          <Box position='absolute' zIndex='1' padding='10px'>
            {/* Actions */}
            <Menu isLazy>
              <MenuButton
                as={IconButton}
                backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                aria-label='Actions'
                icon={<MdMoreHoriz size='18px' />}
                _hover={{ backgroundColor: colorMode === 'dark' ? 'gray.600' : 'gray.200' }}
                _active={{ backgroundColor: colorMode === 'dark' ? 'gray.600' : 'gray.200' }}
              />
              <MenuList>
                <MenuItem icon={<EditIcon />}>Edit course</MenuItem>
                {(() => {
                  switch (course.status) {
                    case CourseStatusEnum.DRAFT:
                      return (
                        <MenuItem
                          onClick={() => onSetStatus(course.id, CourseStatusEnum.PUBLISHED)}
                          icon={<CheckIcon />}
                        >
                          Publish
                        </MenuItem>
                      );
                    case CourseStatusEnum.PUBLISHED:
                      return (
                        <MenuItem onClick={() => onSetStatus(course.id, CourseStatusEnum.DRAFT)} icon={<MdNote />}>
                          Mark as Draft
                        </MenuItem>
                      );
                    default:
                      return null;
                  }
                })()}
                <MenuItem
                  onClick={() => onDelete({ id: course.id, title: course.title })}
                  icon={<DeleteIcon />}
                  color='red.500'
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      )}
      <Link
        to={`/course/${course.id}`}
        as={ReactRouterLink}
        display='block'
        textDecoration='none'
        _visited={{ textDecoration: 'none' }}
        _hover={{ textDecoration: 'none' }}
      >
        <Box
          position='relative'
          minHeight='200px'
          backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
          borderTopLeftRadius='lg'
          borderTopRightRadius='lg'
          p='10px'
        >
          {course.image && course.image.url && (
            <Image
              position='absolute'
              top='0'
              bottom='0'
              right='0'
              left='0'
              fit='cover'
              h='100%'
              w='100%'
              borderTopLeftRadius='lg'
              borderTopRightRadius='lg'
              src={course.image.url}
            />
          )}
        </Box>
        <Box p='0 10px' mt='10px' pb='20px'>
          <Flex justifyContent='space-between'>
            <Badge colorScheme='blue'>{course.category.title}</Badge>
            {(me.isAdmin || me.isTeacher) && <CourseStatusBadge status={course.status} />}
          </Flex>
          <Heading as='h2' fontSize='xl' mt='5px'>
            {course.title}
          </Heading>
          <Text>{course.description}</Text>
          <Flex mt='20px' flexWrap='wrap'>
            <Flex alignItems='center' mr='1'>
              <Icon as={MdVideoLibrary} mr='2' />
              <Text mr='4'>{course.lessons_count} lessons</Text>
            </Flex>
            <Flex alignItems='center' mr='1'>
              <Icon as={MdGroup} mr='2' />
              <Text mr='4'>{course.students_count} students</Text>
            </Flex>
            <Flex alignItems='center' mr='1'>
              <Icon as={MdThumbUp} mr='2' />
              <Text>{course.likes_count} likes</Text>
            </Flex>
          </Flex>
        </Box>
      </Link>
    </Box>
  );
};

export default observer(CourseItem);
