import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, Button, Space, Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { setSearchName } from './redux/searchSlice';
// import PropTypes from 'prop-types';

export default function SearchProducts() {
  const products = useSelector(state => state.home.products);
  const searchText = useSelector(state => state.home.searchName);
  const dispatch = useDispatch()

  const { Search } = Input

  const [filteredProducts, setfilteredProducts] = useState(products.items);
  const fetchProductsPending = useSelector(state => state.home.fetchProductsPending);

  const handleSearch = (value) => {
    // console.log(products.items);
    dispatch(setSearchName(value))

    setfilteredProducts(products.items.filter(item => {
      return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
    }))
  }

  const handleKeyUp = (e) => {
    // console.log(products.items);
    dispatch(setSearchName(e.target.value))

    setfilteredProducts(products.items.filter(item => {
      return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
    }))
  }
  return (
    <div className="home-search-products">
      {/* Component content: home/SearchProducts */}
      <Spin tip="Loading..." spinning={fetchProductsPending}>
        <h1>Product search page</h1>
        <Search
          suffix={<SearchOutlined />}
          placeholder="Input search text"
          allowClear
          enterButton="Search"
          onSearch={handleSearch}
          onKeyUp={handleKeyUp}
        />
        <ProductsTable data={filteredProducts} />
      </Spin>
    </div>
  );
};

SearchProducts.propTypes = {};
SearchProducts.defaultProps = {};

const ProductsTable = ({ data }) => {
  // const [searchText, setsearchText] = useState('');
  const searchText = useSelector(state => state.home.searchName);
  const [searchedColumn, setsearchedColumn] = useState('');
  const searchInput = useRef(null)
  const dispatch = useDispatch()


  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });

              dispatch(setSearchName(selectedKeys[0]))
              setsearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: text =>
      'name' === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
          text
        ),
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
    },
    {
      title: 'Sku',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    }
  ]

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch(setSearchName(selectedKeys[0]))
    setsearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    dispatch(setSearchName(''))
  };
  return (
    <Table columns={columns} dataSource={data} />
  )
}
