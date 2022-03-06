import { ProfileListResponse, Paginator } from './api'

type DurationUnit = 1 | 2 | 3 | 4 | 5;

type CourseStatus = 0 | 1 | 2;

export interface Course {
    id: number;
    name: string;
    uid: string; //code
    detail: string;
    startTime: string;
    price: number;
    maxStudents: number;
    star: number;
    status: CourseStatus;
    duration: number;
    durationUnit: DurationUnit;
    cover: string;
    teacherName: string;
    teacherId: number;
    type: CourseType[];
    ctime: string;
    scheduleId: number;
}

export interface CourseShort {
    id: number;
    name: string;
    courseId: number;
}

export interface CourseType {
    id: number;
    name: string;
}

export interface CourseRequest extends Paginator {
    code?: string;
    name?: string;
    type?: number;
    userId?: number;
}

export interface CourseResponse extends ProfileListResponse {
    courses: Course[];
}
