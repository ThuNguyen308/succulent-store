import { Modal, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faArrowDown, faArrowUp, faCirclePlus, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { CSVLink } from 'react-csv'
import Papa from 'papaparse'
// import ProductForm from "../../components/Form/ProductForm";
import './../../styles/pages/Admin/ProductList.scss';
import AddProductModal from "../../components/Form/AddProductModal";
import EditProductModal from "../../components/Form/EditProductModal";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "react-toastify";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(10)

  //modal
  const [editedProduct, setEditedProduct] = useState({});
  const [deletedProduct, setDeletedProduct] = useState({});
  const [isOpenCreating, setIsOpenCreating] = useState(false);
  const [isOpenEditing, setIsOpenEditing] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  //sort
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortField, setSortField] = useState('');

  //export csv
  const [dataExport, setDataExport] = useState([]);

  useEffect(() => {
    const getData = setTimeout(() => {
      getPaginatedProduct();
    }, 1000)

    return () => clearTimeout(getData);
  }, [page, sortField, sortBy, search]);

  const getPaginatedProduct = async () => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API + `api/v1/product/get-paginated-products/${page}/${limit}`, {
          search,
          sortBy,
          sortField
        }
      );
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
      alert("Something wrong");
    }
  };

  const handleUpdateProductListFromEditModal = (product) => {
    const cloneProducts = [...products]
    let index = products.findIndex(p => product._id === p._id);
    cloneProducts[index] = product;
    setProducts(cloneProducts);
  }

  const handleDelete = (product) => {
    setDeletedProduct(product);
    setIsOpenConfirm(true);
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
  }

  const getProductsExport = (event, done) => {
    const result = [];
    result.push(["Id", "Name", "Description", "Category", "Price", "Quantity", "Shipping"]);
    products.map((product) => {
      result.push([
        product._id,
        product.name,
        product.description,
        product.category._id,
        product.price,
        product.quantity,
        product.shipping
      ])
    })
    setDataExport(result)
  }

  const addMultiProduct = async (arrayProduct) => {
    try {
      const { data } = await axios.post(process.env.REACT_APP_API + `api/v1/product/create-multi-product`,
        {arrayProduct},
        {
          headers: {
              Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if(data.success) {
        toast.success("Import data csv success");
        getPaginatedProduct();
      }
    } catch (err) {
        toast.success("Import data csv failed");
        console.log(err);
    }
  }

  const getCsvFile = (e) => {
    if(e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if(file.type !== "text/csv") {
        toast.warn("Please import file .csv!")
        return;
      }
      Papa.parse(file, {
        // header: true,
        dynamicTyping: true,
        complete: function(results) {
          let rawData = results.data;
          if(rawData.length > 0) {
            if(rawData[0] && rawData[0].length === 6) {
              if(rawData[0][0] !== 'name' 
              || rawData[0][1] !== "description" 
              || rawData[0][2] !== "category" 
              || rawData[0][3] !== "price" 
              || rawData[0][4] !== "quantity" 
              || rawData[0][5] !== "shipping") {
                toast.error("Wrong format header!");
              } else {
                let result = [];
                rawData.shift();
                rawData.pop();
                rawData.map(item => {
                  result.push({
                    name: item[0],
                    description: item[1],
                    category: item[2],
                    price: item[3],
                    quantity: item[4],
                    shipping: item[5]
                  })
                })
                addMultiProduct(result);
              }
            } else {
              toast.error("Wrong format csv file!");
            }
          }
        }
      });
    }
  }

  return (
    <>
      <h1 className="text-center">Manage Product</h1>
      <div className="d-sm-flex justify-content-between">
        <input 
        className="form-control search-input"
          placeholder="search by name"
          value={search}
          onChange={e => setSearch(e.target.value)} 
        />
        
        <div className="scrollable--without-scrollbar">
          <div className="group-btns">
            <label htmlFor="import" className="btn btn-warning">
              <FontAwesomeIcon icon={faDownload}/>
              <span style={{color: '#fff'}}>Import</span>
            </label>
            <input 
              id="import"
              type="file" 
              hidden 
              onChange={getCsvFile}
            />
            <CSVLink
              data={dataExport}
              filename={"products.csv"}
              className="btn btn-info"
              asyncOnClick={true}
              onClick={getProductsExport}
            >
              <FontAwesomeIcon icon={faUpload}/>
              <span style={{color: '#fff'}}>Export</span>
            </CSVLink>
            <button
              className="btn btn-success"
              onClick={() => {
                setIsOpenCreating(true);
              }}
            >
              <FontAwesomeIcon icon={faCirclePlus} style={{marginRight: 4}}/>
              Add new
            </button>
          </div>
        </div>
      </div>
      <div className="scrollable">
        <table className="table table-bordered mt-3 text-center table-width">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>
                <div className="d-flex justify-content-between">
                  Name
                  <span>
                    <FontAwesomeIcon icon={faArrowDown} onClick={() => handleSort('decs', 'name')} />
                    <FontAwesomeIcon icon={faArrowUp} onClick={() => handleSort('asc', 'name')} />
                  </span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between">
                  Price
                  <span>
                    <FontAwesomeIcon icon={faArrowDown} onClick={() => handleSort('decs', 'price')} />
                    <FontAwesomeIcon icon={faArrowUp} onClick={() => handleSort('asc', 'price')} />
                  </span>
                </div>
              </th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>
                  <img
                    src={
                      process.env.REACT_APP_API +
                      `api/v1/product/product-photo/${product._id}`
                    }
                    className="product-img"
                    width="50"
                  />
                </td>
                <td>{product?.name}</td>
                <td>{product?.price}</td>
                <td>{product?.category?.name}</td>
                <td>{product?.quantity}</td>
                <td>
                  <button
                    className="btn btn-success me-1"
                    onClick={() => {
                      setEditedProduct({...product});
                      setIsOpenEditing(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
            defaultCurrent={1}
            current={page}
            pageSize={limit}
            total={total} 
            onChange={(page)=> {setPage(page)}}
          />

      <AddProductModal
        open={isOpenCreating}
        handleClose={() => setIsOpenCreating(false)}
        handleUpdateProductList = {getPaginatedProduct}
      />

      <EditProductModal
        open={isOpenEditing}
        handleClose={() => setIsOpenEditing(false)}
        editedProduct={editedProduct}
        handleUpdateProductListFromEditModal = {handleUpdateProductListFromEditModal}
      />

      <ConfirmModal
        open={isOpenConfirm}
        handleClose={() => setIsOpenConfirm(false)}
        deletedProduct={deletedProduct}
        handleUpdateProductList = {getPaginatedProduct}
      />

      {/* Modal update/ create */}
      {/* {visible ?
        <Modal
          onCancel={() => {
            setVisible(false);
            setNewProduct({})
          }}
          onOk={handleSubmit}
          open={visible}
        >
          {!editedProduct?._id ? (
            <ProductForm
              title={title}
              product={newProduct}
              setProduct={setNewProduct}
            />
          ) : (
            <ProductForm
              title={title}
              product={editedProduct}
              setProduct={setEditedProduct}
            />
          )}
        </Modal>
        : null
      } */}
    </>
  );
}
