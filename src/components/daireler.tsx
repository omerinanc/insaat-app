import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

const formatCurrency = (amount: number | undefined | null) => {
  if (amount !== undefined && amount !== null) {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2, // Ensure 2 decimal places
      maximumFractionDigits: 2,
    }).format(amount);
  }
  return ""; // Return an empty string or another default value when amount is undefined or null
};

const Daireler: React.FC = () => {
  interface DataType {
    key: string;
    id: string;
    isim_soyisim: string;
    telefon_numarasi: string;
    anlasma_tarihi: string;
    anlasma_miktari: number;
    on_odeme: number;
    taksit_tarihi: string;
    taksit_miktari: number;
    tapu_tarihi: string;
    teslim_tarihi: string;
    kalanmiktar: number;
  }

  const [data, setData] = useState<DataType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get("https://omerinanc.online/api/daire")
      .then((response) => {
        // Calculate kalanmiktar for each item in the data
        const updatedData = response.data.map((item: DataType) => ({
          ...item,
          key: item.id.toString(),
          kalanmiktar: item.anlasma_miktari - item.on_odeme,
        }));
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Network Error:", error);
      });
  }, []);
  const handleEditFinish = (values: DataType) => {
    // Send an HTTP request to update the data in the backend
    axios
      .put(`https://omerinanc.online/api/daire/${values.id}`, values)
      .then((response) => {
        // Handle success response (update the state, show a message, etc.)
        console.log("Data updated successfully:", response.data);

        // Update the state in your component to reflect the changes
        const updatedData = data.map((item) =>
          item.id === values.id ? { ...item, ...values } : item
        );
        setData(updatedData);

        // Exit editing mode
        setIsEditing(false);
      })
      .catch((error) => {
        // Handle error (show an error message, handle retries, etc.)
        console.error("Error updating data:", error);
      });
  };
  const handleDelete = (record: DataType) => {
    // Send an HTTP request to delete the data in the backend
    axios
      .delete(`https://omerinanc.online/api/daire/${record.id}`)
      .then((response) => {
        // Handle success response (show a message, etc.)

        // Update the state in your component to remove the deleted element
        const updatedData = data.filter((item) => item.id !== record.id);
        setData(updatedData);

        // Exit editing mode (if the deleted item was being edited)
        if (editedData && editedData.id === record.id) {
          setIsEditing(false);
          setEditedData(null);
        }
      })
      .catch((error) => {
        // Handle error (show an error message, handle retries, etc.)
        console.error("Error deleting data:", error);
      });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "İsim Soyisim",
      dataIndex: "isim_soyisim",
      key: "isim_soyisim",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "telefon_numarasi",
      key: "telefon_numarasi",
    },
    {
      title: "Anlaşma Tarihi",
      dataIndex: "anlasma_tarihi",
      key: "anlasma_tarihi",
    },
    {
      title: "Anlaşma Miktarı",
      dataIndex: "anlasma_miktari",
      key: "anlasma_miktari",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Ön Ödeme",
      dataIndex: "on_odeme",
      key: "on_odeme",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Taksit Tarihi",
      dataIndex: "taksit_tarihi",
      key: "taksit_tarihi",
    },
    {
      title: "Taksit Miktari",
      dataIndex: "taksit_miktari",
      key: "taksit_miktari",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Tapu Tarihi",
      dataIndex: "tapu_tarihi",
      key: "tapu_tarihi",
    },
    {
      title: "Teslim Tarihi",
      dataIndex: "teslim_tarihi",
      key: "teslim_tarihi",
    },
    {
      title: "Kalan Miktar",
      dataIndex: "kalanmiktar",
      key: "kalanmiktar",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Düzenle / Sil",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <div style={{ marginRight: 0 }}>
          <Button
            className="duzenle"
            style={{ color: "white", backgroundColor: "#001529" }}
            onClick={() => handleEdit(record)}
          >
            Düzenle
          </Button>
          <Button
            className="sil"
            style={{ marginLeft: 8 }}
            onClick={() => handleDelete(record)}
          >
            Sil
          </Button>
        </div>
      ),
    },
  ];
  const handleEdit = (record: DataType) => {
    setIsEditing(true);
    setEditedData(record);
    form.setFieldsValue(record); // Set form fields with the values from the edited record
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data.map((item) => ({
          ...item,
          key: item.id.toString(),
        }))}
      />
      {isEditing && (
        <div>
          <Form
            form={form}
            onFinish={handleEditFinish}
            initialValues={editedData || {}} // Initialize with editedData or an empty object
          >
            <Form.Item label="ID" name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="İsim Soyisim" name="isim_soyisim">
              <Input />
            </Form.Item>
            <Form.Item label="Telefon Numarası" name="telefon_numarasi">
              <Input />
            </Form.Item>
            <Form.Item label="Anlaşma Tarihi" name="anlasma_tarihi">
              <Input />
            </Form.Item>
            <Form.Item label="Anlaşma Miktarı" name="anlasma_miktari">
              <Input />
            </Form.Item>
            <Form.Item label="Ön Ödeme" name="on_odeme">
              <Input />
            </Form.Item>
            <Form.Item label="Taksit Tarihi" name="taksit_tarihi">
              <Input />
            </Form.Item>
            <Form.Item label="Taksit Miktarı" name="taksit_miktari">
              <Input />
            </Form.Item>
            <Form.Item label="Tapu Tarihi" name="tapu_tarihi">
              <Input />
            </Form.Item>
            <Form.Item label="Teslim Tarihi" name="teslim_tarihi">
              <Input />
            </Form.Item>
            <Button htmlType="submit">Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Daireler;
