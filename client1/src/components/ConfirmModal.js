import React, { useEffect, useState } from 'react'
import { Modal} from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function ConfirmModal(props) {
    const {open, deletedProduct, handleClose, handleUpdateProductList} = props;

    const handleSubmit = async () => {
        try {
          const { data } = await axios.delete(
            process.env.REACT_APP_API +
            `api/v1/product/delete-product/${deletedProduct._id}`
          );
          if(data?.success) {
            toast.success("Product deleted successfully");
            handleClose();
            handleUpdateProductList();
          } else {
            toast.error("Product deleted failed")
          }
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <Modal
            title="Delete Confirmation"
            okText="Delete"
            okType='danger'
            onCancel={handleClose}
            onOk={handleSubmit}
            open={open}
        >
            Are you sure you want to delete <b>{deletedProduct.name}</b>
        </Modal>
    )
}