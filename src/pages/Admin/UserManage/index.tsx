import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { searchUsers } from "@/services/ant-design-pro/api";
import {Image} from "antd";

const columns: ProColumns<API.CurrentUser>[] = [ // 通过columns可以定义表格有哪些列
  {
    dataIndex: 'id', // 对应后端返回数据对象的属性
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username', // 对应后端返回数据对象的属性
    copyable: true, // 是否允许复制
    //ellipsis: true, // 是否允许缩略
    //tip: '标题过长会自动收缩', // 提示
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount', // 对应后端返回数据对象的属性
    copyable: true, // 是否允许复制
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl', // 对应后端返回数据对象的属性
    render: (_, record) => ( // ReactNode代表的是表格中的一个格子(一个节点)，record可以理解为每一行
      // 取record参数的avatarUrl属性，将其展示成一张图片
      <div>
        <Image src={record.avatarUrl} width={100} />  {/*Image组件是ant design自己带的一个组件*/}
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender', // 对应后端返回数据对象的属性
  },
  {
    title: '电话',
    dataIndex: 'phone', // 对应后端返回数据对象的属性
    copyable: true, // 是否允许复制
  },
  {
    title: '邮件',
    dataIndex: 'email', // 对应后端返回数据对象的属性
    copyable: true, // 是否允许复制
  },
  {
    title: '状态',
    dataIndex: 'userStatus', // 对应后端返回数据对象的属性
  },
  {
    title: '星球编号',
    dataIndex: 'planetCode', // 对应后端返回数据对象的属性
  },
  {
    title: '角色',
    dataIndex: 'userRole', // 对应后端返回数据对象的属性
    valueType: 'select', // 用于声明这一列的类型，可枚举的可以定义为select，这样就可以支持下拉菜单
    valueEnum: { // 枚举值
      0: { text: '普通用户', status: 'Default' },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime', // 对应后端返回数据对象的属性
    valueType: 'dateTime', // 用于声明这一列的类型
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    // 高级表格组件
    <ProTable<API.CurrentUser> // 将表格接收的数据类型写成CurrentUser
      columns={columns} // 将上面定义的列传给高级表单
      actionRef={actionRef}
      cardBordered
      // 和后端交互，从request中获取数据返回数据就可以了，这个接口的返回值会自动填充到这个表单中返回数据，不用我们自己去填充了
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers(); // 调用api.ts中searchUsers函数，获得返回当前搜索的用户列表
        return {
          data: userList // 返回这个搜索出来的列表
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
