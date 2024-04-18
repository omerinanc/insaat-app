import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Pie } from "@ant-design/plots"; // Import the Pie component
import axios from "axios";

const formatCurrency = (amount: number | undefined | null) => {
  if (amount !== undefined && amount !== null) {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  return "";
};

const TaseronFirmalar: React.FC = () => {
  interface DataType {
    key: string;
    id: string;
    iş_türü: string;
    anlaşma_miktari: number;
    anlaşma_tarihi: string;
    iş_süresi: string;
    odenen_miktar: number;
    kalanmiktar: number;
  }
  const [form] = Form.useForm();

  const [data, setData] = useState<DataType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<DataType | null>(null);

  useEffect(() => {
    axios
      .get("https://omerinanc.online/api/taseron")
      .then((response) => {
        const updatedData = response.data.map((item: DataType) => ({
          ...item,
          key: item.id.toString(),
          kalanmiktar: item.anlaşma_miktari - item.odenen_miktar,
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
      .put(`https://omerinanc.online/api/taseron/${values.id}`, values)
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
      .delete(`https://omerinanc.online/api/taseron/${record.id}`)
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
      title: "İş Türü",
      dataIndex: "iş_türü",
      key: "iş_türü",
      // render: (text) => <Button>{text}</Button>,
    },
    {
      title: "Anlaşma Miktarı",
      dataIndex: "anlaşma_miktari",
      key: "anlaşma_miktari",
      render: (amount) => formatCurrency(amount),
    },
    {
      title: "Anlaşma Tarihi",
      dataIndex: "anlaşma_tarihi",
      key: "anlaşma_tarihi",
    },
    {
      title: "İş Süresi",
      dataIndex: "iş_süresi",
      key: "iş_süresi",
    },
    {
      title: "Ödenen Miktar",
      dataIndex: "odenen_miktar",
      key: "odenen_miktar",
      render: (amount) => formatCurrency(amount),
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
        <div style={{ marginRight: -50 }}>
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

  const pieData = data.map((item) => ({
    type: item.iş_türü,
    value: Number(item.anlaşma_miktari),
  }));

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  console.log(pieData);

  return (
    <div className="table">
      <div>
        <Table
          columns={columns}
          dataSource={data.map((item) => ({
            ...item,
            key: item.id.toString(),
          }))}
        />
      </div>
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
            <Form.Item label="İş Türü" name="iş_türü">
              <Input />
            </Form.Item>
            <Form.Item label="Anlaşma Miktarı" name="anlaşma_miktari">
              <Input />
            </Form.Item>
            <Form.Item label="İş Süresi" name="iş_süresi">
              <Input />
            </Form.Item>
            <Form.Item label="Ödenen Miktar" name="odenen_miktar">
              <Input />
            </Form.Item>
            <Form.Item label="Anlaşma Tarihi" name="anlaşma_tarihi">
              <Input />
            </Form.Item>
            <Button htmlType="submit">Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Form>
        </div>
      )}

      <Pie
        {...pieConfig}
        style={{ display: "flex", justifyContent: "center", width: "50%" }}
      />
    </div>
  );
};

export default TaseronFirmalar;
