import React from 'react';
import { observer } from 'mobx-react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Badge, Image, Link, IconButton, Icon } from '@chakra-ui/react';
import { Flex, Box, Heading, Text } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { MdMoreHoriz, MdGroup, MdThumbUp, MdVideoLibrary } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import * as constants from '@educt/constants';

/**
 * Types
 */
import { ICourse } from '@educt/interfaces';
import type { SetCourseStatusFnType } from '@educt/hooks/queries/course/useSetCourseStatus';
import { CourseStatusEnum } from '@educt/enums';

/**
 * Components
 */
import CourseStatusBadge from '@educt/components/CourseStatusBadge';

/**
 * Hooks
 */
import { useHistory } from 'react-router';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { useRootStore } from '@educt/hooks/useRootStore';

export type CourseItemPropsType = {
  course: Omit<ICourse, 'teacher' | 'students' | 'lessons'>;
  onDelete: (course: Pick<ICourse, 'id' | 'title'>) => void;
  onSetStatus: SetCourseStatusFnType;
};

const CourseItem: React.FC<CourseItemPropsType> = ({ course, onDelete, onSetStatus }) => {
  const {
    userStore: { me },
  } = useRootStore();
  const { colorMode } = useColorMode();
  const history = useHistory();

  const handleEditCourse = () => history.push(`/courses/edit/${course.id}`);

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
                <MenuItem onClick={handleEditCourse} icon={<EditIcon />}>
                  Edit
                </MenuItem>
                {(() => {
                  switch (course.status) {
                    case CourseStatusEnum.DRAFT:
                      return (
                        <MenuItem
                          onClick={() => onSetStatus(course.id, CourseStatusEnum.PUBLISHED)}
                          icon={<AiOutlineEye />}
                        >
                          Publish
                        </MenuItem>
                      );
                    case CourseStatusEnum.PUBLISHED:
                      return (
                        <MenuItem
                          onClick={() => onSetStatus(course.id, CourseStatusEnum.DRAFT)}
                          icon={<AiOutlineEyeInvisible />}
                        >
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
        display='flex'
        flexDir={'column'}
        h='100%'
        textDecoration='none'
        _visited={{ textDecoration: 'none' }}
        _hover={{ textDecoration: 'none' }}
      >
        <Box
          position='relative'
          minHeight='200px'
          backgroundColor={course.color?.hex || useColorModeValue('gray.200', 'gray.700')}
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
              src={course.image ? `${constants.BACKEND_URL + course.image.url}` : undefined}
            />
          )}
        </Box>
        <Flex flexDir={'column'} p='0 10px' mt='10px' pb='20px' h='100%'>
          <Flex justifyContent='space-between'>
            <Badge colorScheme='blue'>{course.category.title}</Badge>
            {(me.isAdmin || me.isTeacher) && <CourseStatusBadge status={course.status} />}
          </Flex>
          <Heading as='h2' fontSize='xl' mt='5px'>
            {course.title}
          </Heading>
          <Text mt='2' mb='4'>
            {course.description}
          </Text>
          <Flex mt='auto' flexWrap='wrap'>
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
        </Flex>
      </Link>
    </Box>
  );
};

export default observer(CourseItem);
