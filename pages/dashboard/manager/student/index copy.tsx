import "antd/dist/antd.css";
import { Table, Button, Input, Space, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect, useMemo, useCallback, useCallback } from "react";
import DashLayout from "../../../../components/layout/layout";
import storage from "../../../../lib/service/storage";
import { CourseShort } from "../../../../lib/model/course";
import { BaseType } from "antd/lib/typography/Base";
import TextLink from "antd/lib/typography/Link";
import { formatDistanceToNow } from 'date-fns';
import styled from "styled-components";
import { Student, StudentsResponse } from "../../../../lib/model/student";
import AddStudentForm from "../../../../components/student/add-student";
import ModalForm from "../../../../lib/common/modalForm";
import { IResponse, Paginator, ProfileListPaginator } from "../../../../lib/model/api";
import { omitBy } from "lodash";
import apiService from "../../../../lib/service/apiService";
import { lodashSearch } from "../../../../components/custom-hooks/lodash-search";

const Search = styled(Input.Search)`
  width: 30%;
  display: block;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;


export default function StudentList(
  onlyFresh = true,
  params: Partial<ProfileListPaginator<Paginator>>) {

  const [data, setData] = useState<Student[]>([]);
  const [isModalDisplay, setModalDisplay] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student>();
  const [paginator, setPaginator] = useState<Paginator>({ limit: 20, page: 1 });
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const stringParams = JSON.stringify(params || {});
  const [query, setQuery] = useState<string>("");
  const loadshQuery = lodashSearch(setQuery);

  const req = omitBy(
    { ...paginator, ...(params || {}) },
    (item: string | number | boolean | null) => item === '' || item === null
  ) as any;
  
  const fetchData = useCallback( async () =>{
    await apiService.getStudentsList(req);
  }

  ,[req])

  useEffect(() => {

    setLoading(true)
    
    fetchData()
    /*    axios.get("http://cms.chtoma.com/api/students?page=1&limit=20", {
         headers: { Authorization: `Bearer ${userToken}` },
       })
         .then(function (response) {
           // console.log(response.data.data.students[0]);
           const studentProfile = response.data.data.students
           if (studentProfile) {
             setStudentProfile(studentProfile);
           }
         })
         .catch(function (error) {
           console.log(error);
         }); */
  }, [fetchData, paginator, stringParams]);

  // Search student useMemo 来进行 search 返回
  /*  const filteredData = useMemo(
     () => studentProfile.filter((item) => !searchValue || (item.name).toLowerCase().includes(searchValue.toLowerCase())),
     [searchValue, studentProfile]) */


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
      dataSource={data} columns={columns} loading = {loading } paginator = {paginator}></Table>
      <ModalForm
        title={!!editingStudent ? "Edit Student" : "Add Student"}
        centered
        visible={isModalDisplay}
        cancel={cancel}
      >
        <AddStudentForm
          onFinish={(student: Student) => {

            setModalDisplay(false);
          }}
          student={editingStudent}
        />
      </ModalForm>
    </DashLayout >
  );
}

