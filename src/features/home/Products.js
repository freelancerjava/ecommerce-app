import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { beginGetProducts, successGetProducts, failGetProducts } from './redux/productsSlice';
import { Table, Spin } from 'antd';
// import PropTypes from 'prop-types';

export default function Products() {

  const token = useSelector(state => state.home.token);
  const products = useSelector(state => state.home.products);
  const fetchProductsPending = useSelector(state => state.home.fetchProductsPending);
  const dispatch = useDispatch();


  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Cookie", "PHPSESSID=ss6qdir6egs0tkc4791orf0c9j");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    dispatch(beginGetProducts())

    fetch("https://toko.ox-sys.com/variations", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        dispatch(successGetProducts(result))
      })
      .catch(error => {
        console.log('error', error)
        dispatch(failGetProducts())
      });
    return () => {

    }
  }, [dispatch, token]);

  return (
    <div className="home-products">
      <Spin tip="Loading..." spinning={fetchProductsPending}>
        <h1>Products page</h1>
        <ProductsTable data={products.items} />
      </Spin>
    </div>
  );
};

Products.propTypes = {};
Products.defaultProps = {};

const ProductsTable = ({ data }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
  return (
    <Table columns={columns} dataSource={data} />
  )
}
