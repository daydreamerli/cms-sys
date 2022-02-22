import { ParsedUrlQuery } from 'querystring';

const AppMenuKeys = {
  homeSubMenu: 'home',
  dashBoard: '/home',
  studentSubMenu: 'students',
  studentList: '/students',
  editStudent: '/students/edit-student',
  studentSelection: '/students/selections',
  courseSubMenu: 'course',
  courseList: '/course',
  editCourse: '/course/edit-course',
  courseType: '/course/course-type',
  teacherSubMenu: 'teacher',
  teacherList: '/teacher',
  managerSubMenu: 'manager',
  managerList: '/manager',
  roleSubMenu: 'role',
  roleList: '/role',
  settingSubMenu: 'settings',
  settingPassword: '/settings',
};

const getSecondaryPathByString = (string) => {
  return string.split('/').pop();
};

export const getBreadcrumb = (path: string, query: ParsedUrlQuery): string => {
  const { id } = query;
  const secondaryPath = path.split('/')[2];

  // 通过路由匹配指定的左侧的导航条显示内容
  if (secondaryPath === getSecondaryPathByString(AppMenuKeys.editCourse)) {
    return id ? 'Edit Course' : 'Add Course';
  } else if (secondaryPath === getSecondaryPathByString(AppMenuKeys.courseType)) {
    return 'Course Type';
  } else if (secondaryPath === getSecondaryPathByString(AppMenuKeys.editStudent)) {
    return id ? 'Edit Student' : 'Add Student';
  } else if (secondaryPath === getSecondaryPathByString(AppMenuKeys.studentSelection)) {
    return 'Chosen';
  }

  const currentPath = path.split('/')[1];

  switch (currentPath) {
    case AppMenuKeys.studentSubMenu:
      return 'Student List';
    case AppMenuKeys.courseSubMenu:
      return 'Course List';
    case AppMenuKeys.managerSubMenu:
      return 'Manager List';
    case AppMenuKeys.roleSubMenu:
      return 'Role List';
    case AppMenuKeys.teacherSubMenu:
      return 'Teacher List';
    case AppMenuKeys.settingSubMenu:
      return 'Configration';
    case AppMenuKeys.homeSubMenu:
      return 'Home';
  }
};
