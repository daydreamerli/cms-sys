import "antd/dist/antd.css";
import { Table, Button, Input, Space, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import DashLayout from "../../../../components/layout/layout";
import { CourseShort } from "../../../../lib/model/course";
import { BaseType } from "antd/lib/typography/Base";
import TextLink from "antd/lib/typography/Link";
import { formatDistanceToNow } from 'date-fns';
import styled from "styled-components";
import { ProfileRequest, Student, StudentsResponse } from "../../../../lib/model/student";
import AddStudentForm from "../../../../components/student/add-student";
import ModalForm from "../../../../lib/common/modalForm";
import apiService from "../../../../lib/service/apiService";
import { useListEffect } from "../../../../components/custom-hooks/list-effect";
import { lodashSearch } from "../../../../components/custom-hooks/lodash-search";
import { genTableProps } from '../../../../lib/utils/table-utils';
import Link from "next/link";

const Search = styled(Input.Search)`
  width: 30%;
  display: block;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export default function StudentList() {
  const [query, setQuery] = useState<string>('');
  const [isModalDisplay, setModalDisplay] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student>();
  const loadshQuery = lodashSearch(setQuery);
  const { data, loading, paginator, setPaginator, total, setTotal, setData } = useListEffect<
    ProfileRequest,
    StudentsResponse,
    Student
  >(apiService.getStudentsList.bind(apiService), 'students', true, { query });

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_text: any, _record: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sortDirections: ['ascend', 'descend'],
      sorter: (pre: Student, next: Student) => {
        const preCode = pre.name.charCodeAt(0);
        const nextCode = next.name.charCodeAt(0);

        return preCode > nextCode ? 1 : preCode === nextCode ? 0 : -1;
      },
      render: (_: any, record: Student) => (
        <Link href={`/dashboard/manager/student/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Area",
      dataIndex: "country",
      key: "area",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Selected Curriculum",
      dataIndex: "courses",
      render: (courses: CourseShort[]) => courses?.map((item) => item.name).join(", "),
    },
    {
      title: "Student Type",
      dataIndex: "type",
      render: (type: BaseType) => type?.name,
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
      render: (value: string) => formatDistanceToNow(new Date(value), { addSuffix: true }),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Student) => (
        <Space size="middle">
          <TextLink
            onClick={() => {
              setEditingStudent(record);
              setModalDisplay(true);
            }}
          >
            Edit
          </TextLink>

          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={async () => {
              const chosenId: number = record.id;
              console.log(record.id);
              await apiService.deleteStudent(chosenId)
            }}
            okText="Confirm"
            cancelText="Cancel"
          >
            <TextLink>Delete</TextLink>
          </Popconfirm>
        </Space >
      ),
    },
  ];

  const cancel = () => {
    setModalDisplay(false);
    setEditingStudent(null);
  };

  return (
    <DashLayout>
      <FlexContainer>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setModalDisplay(true);
            setEditingStudent(null);
          }}
        >
          Add
        </Button>
        <Search
          placeholder="Search by name"
          onSearch={(value) => setQuery(value)}
          onChange={loadshQuery}
        />
      </FlexContainer>
      <Table
        {...genTableProps({
          data,
          paginator,
          loading,
          setPaginator,
          columns,
          total,
        })}></Table>
      <ModalForm
        title={editingStudent ? "Edit Student" : "Add Student"}
        centered
        visible={isModalDisplay}
        cancel={cancel}
      >
        <AddStudentForm
          onFinish={(student: Student) => {
            if (editingStudent) {
              const index = data.findIndex((item) => item.id === student.id);

              data[index] = student;
              setData([...data]);
            }
            setModalDisplay(false);
          }}
          student={editingStudent}
        />
      </ModalForm>
    </DashLayout >
  );
}

