import { Table } from "antd";
import { Link } from "react-router-dom";

const columns =[

    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
     
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Link to={`/namelist/${record.key}`} >
           跳转
          </Link>
        ),
      },
]

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
]
export default function NameList() {
  return (
    <><Table columns={columns} dataSource={data} rowKey={'key'}/></>
  );
}

NameList.route = { [MENU_PATH]: "/namelist"};