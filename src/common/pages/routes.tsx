import { RouteObject } from 'react-router';
import HomePage from './HomePage';
import CoursePage from './CoursePage';
import LessonPage from './LessonPage';
import ExercisePage from './ExercisePage';
import LoginPage from './LoginPage';
import AccountPage from './AccountPage';
import NotFoundPage from './NotFoundPage';

const routes: RouteObject[] = [
  { path: '/prihlasit', element: <LoginPage /> },
  { path: '/ucet', element: <AccountPage /> },
  {
    path: '/kurzy/:courseLink/:chapterLink/:lessonLink',
    element: <LessonPage />,
  },
  {
    path: '/kurzy/:courseLink/:chapterLink/:lessonLink/:sectionLink',
    element: <LessonPage />,
  },
  {
    path: '/kurzy/:courseLink/:chapterLink/:lessonLink/:sectionLink/:excLink',
    element: <ExercisePage />,
  },
  { path: '/kurzy/:courseLink', element: <CoursePage /> },
  { path: '/', element: <HomePage /> },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
