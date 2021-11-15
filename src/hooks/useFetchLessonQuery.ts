// /**
//  * Types
//  */
// import { ILesson } from '@educt/interfaces';

// /**
//  * Hooks
//  */
// import { useEffect, useState } from 'react';
// import { useErrorHandler } from 'react-error-boundary';
// import useIsMountedRef from './useIsMountedRef';

// type LessonStateType = {
//   data: ILesson | null;
//   error: any;
//   loading: boolean;
//   fetched: boolean;
// };

// const useFetchLessonQuery = (id: string) => {
//   const [state, setState] = useState<LessonStateType>({ data: null, error: null, loading: false, fetched: false });
//   const isMountedRef = useIsMountedRef();
//   const handleError = useErrorHandler();

//   /**
//    * Fetch course handler
//    */
//   useEffect(() => {
//     setState(s => ({ ...s, loading: true }));
//     lessonService
//       .fetchById(id)
//       .then(data => {
//         if (isMountedRef.current) {
//           setState(s => ({ ...s, data: data.data }));
//         }
//       })
//       .catch(error => {
//         if (error.response) {
//           if (isMountedRef.current) {
//             setState(s => ({ ...s, error }));
//           }
//         } else {
//           handleError(error);
//         }
//       })
//       .finally(() => {
//         if (isMountedRef.current) {
//           setState(s => ({ ...s, loading: false, fetched: true }));
//         }
//       });
//   }, [id]);

//   return { ...state };
// };

// export default useFetchLessonQuery;
