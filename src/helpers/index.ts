import { UserRoleEnum } from '@educt/enums';
import { ICourse, IUserRole, UserCourseType } from '@educt/interfaces';

export function userHasRoles(userRoles: IUserRole[], roles: UserRoleEnum[]): boolean {
  for (let i = 0; i < roles.length; i += 1) {
    if (!userRoles.map(r => r.slug).includes(roles[i])) {
      /**
       * Unable to find current role in user roles
       */
      return false;
    }
  }
  return true;
}

/**
 * Return true if user roles contain any one
 * of roles in second param
 *
 * @param userRoles Current user roles
 * @param roles Roles to check
 */
export function userContainRoles(userRoles: IUserRole[], roles: UserRoleEnum[]): boolean {
  return userRoles.map(r => r.slug).some(r => roles.includes(r));
}

/**
 * Clean object values
 *
 * @param obj Current object that have null values
 * @returns Clean object that don't have null values
 */
export function removeEmptyValues(obj: object) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null));
}

/**
 * Transform object data to FormData
 *
 * @param data Input data
 * @returns Data formatted in FormData
 */
export function transformToFormData(data: object): FormData {
  const formData = new FormData();

  /**
   * Append value to form-data format
   */
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
        return;
      }

      formData.append(key, value);
    }
  });

  return formData;
}

/**
 * Transform bytes to readable format
 *
 * @param bytes Number of bytes
 * @param decimals
 * @returns string
 */
export function transformBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function transformBlobToFile(blob: Blob, fileName: string) {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

/**
 *
 * @param array Array
 * @param from From index
 * @param to To index
 * @returns Reordered array
 */
export function arrayMove<T>(array: T[], from: number, to: number) {
  const result = array.slice();
  const [removed] = result.splice(from, 1);

  result.splice(to, 0, removed);
  return result;
}

export function getDirtyFields<T>(dirtyFields: { [key: string]: boolean | undefined }, data: T) {
  return Object.fromEntries(Object.keys(dirtyFields).map(k => [k, data[k as keyof T]]));
}

export function userHasCourse(findingCourse: ICourse, userCourses?: Array<UserCourseType> | undefined) {
  if (!userCourses) return true;
  return userCourses.some(course => course.id === findingCourse.id);
}
