import React, { useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import dayjs from "dayjs";

// ...

const Createdaire: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameSurname: "",
    phoneNumber: "",
    agreementDate: null as dayjs.Dayjs | null, // Specify the type explicitly
    agreementAmount: "",
    prePayment: "",
    installmentDate: null as dayjs.Dayjs | null,
    installmentAmount: "",
    titleDeetDate: null as dayjs.Dayjs | null,
    deliveryDate: null as dayjs.Dayjs | null,
  });

  const handleAgreementDateChange = (
    date: dayjs.Dayjs | null,
    dateString: string
  ) => {
    if (dateString) {
      setFormData({ ...formData, agreementDate: dayjs(dateString) });
    } else {
      setFormData({ ...formData, agreementDate: null });
    }
  };
  const handleInstallmentDateChange = (
    date: dayjs.Dayjs | null,
    dateString: string
  ) => {
    if (dateString) {
      setFormData({ ...formData, installmentDate: dayjs(dateString) });
    } else {
      setFormData({ ...formData, installmentDate: null });
    }
  };
  const handleTitleDateChange = (
    date: dayjs.Dayjs | null,
    dateString: string
  ) => {
    if (dateString) {
      setFormData({ ...formData, titleDeetDate: dayjs(dateString) });
    } else {
      setFormData({ ...formData, titleDeetDate: null });
    }
  };
  const handleDeliveryDateChange = (
    date: dayjs.Dayjs | null,
    dateString: string
  ) => {
    if (dateString) {
      setFormData({ ...formData, deliveryDate: dayjs(dateString) });
    } else {
      setFormData({ ...formData, deliveryDate: null });
    }
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post("https://omerinanc.online/api/daire", {
        daire: {
          isim_soyisim: formData.nameSurname,
          telefon_numarasi: formData.phoneNumber,
          anlasma_tarihi: formData.agreementDate?.format("YYYY-MM-DD") || null,
          anlasma_miktari: formData.agreementAmount,
          on_odeme: formData.prePayment,
          taksit_tarihi: formData.installmentDate?.format("YYYY-MM-DD") || null,
          taksit_miktari: formData.installmentAmount,
          tapu_tarihi: formData.titleDeetDate?.format("YYYY-MM-DD") || null,
          teslim_tarihi: formData.deliveryDate?.format("YYYY-MM-DD") || null,
        },
      });
      // Handle a successful response (e.g., show a success message)
      console.log("Daire başarili bir şekilde yaratildi:", response.data);
      navigate("/dashboard"); // Redirect to the dashboard page
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Daireyi yaratirken bir sorun oluştu:", error);
    }
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{
          maxWidth: 600,
          marginLeft: 220,
          marginTop: 20,
          marginBottom: 1000,
        }}
      >
        {/* Add input fields with onChange handlers */}
        <Form.Item label="İsim Soyisim" labelCol={{ span: 6 }}>
          <Input
            style={{ marginLeft: 0 }}
            placeholder="İsim Soyisim"
            onChange={(e) =>
              setFormData({ ...formData, nameSurname: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Telefon Numarası" labelCol={{ span: 6 }}>
          <Input
            style={{ marginLeft: 0 }}
            placeholder="Telefon Numarası"
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Anlaşma Tarihi" labelCol={{ span: 6 }}>
          <DatePicker
            style={{ marginLeft: 0 }}
            placeholder="Anlaşma Tarihi"
            onChange={handleAgreementDateChange}
            value={formData.agreementDate}
          />
        </Form.Item>
        <Form.Item label="Anlaşma Miktarı" labelCol={{ span: 6 }}>
          <Input
            style={{ marginLeft: 0 }}
            placeholder="Anlaşma Miktarı"
            onChange={(e) =>
              setFormData({ ...formData, agreementAmount: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Ön Ödeme Miktarı" labelCol={{ span: 6 }}>
          <Input
            style={{ marginLeft: 0 }}
            placeholder="Ön Ödeme Miktarı"
            onChange={(e) =>
              setFormData({ ...formData, prePayment: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Taksit Tarihi" labelCol={{ span: 6 }}>
          <DatePicker
            style={{ marginLeft: 0 }}
            placeholder="Taksit Tarihi"
            onChange={handleInstallmentDateChange}
            value={formData.installmentDate}
          />
        </Form.Item>
        <Form.Item label="Taksit Miktarı" labelCol={{ span: 6 }}>
          <Input
            style={{ marginLeft: 0 }}
            placeholder="Taksit Miktarı"
            onChange={(e) =>
              setFormData({ ...formData, installmentAmount: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Tapu Teslim Tarihi" labelCol={{ span: 6 }}>
          <DatePicker
            style={{ marginLeft: 0 }}
            placeholder="Tapu Teslim Tarihi"
            onChange={handleTitleDateChange}
            value={formData.titleDeetDate}
          />
        </Form.Item>
        <Form.Item label="Daire Teslim Tarihi" labelCol={{ span: 6 }}>
          <DatePicker
            style={{ marginLeft: 0 }}
            placeholder="Daire Teslim Tarihi"
            onChange={handleDeliveryDateChange}
            value={formData.deliveryDate}
          />
        </Form.Item>

        <Form.Item labelCol={{ span: 6 }}>
          <Button onClick={handleFormSubmit} style={{ marginLeft: 150 }}>
            Daire Ekle
          </Button>
        </Form.Item>
        <Button
          onClick={() => navigate("/dashboard")}
          style={{ marginLeft: 150 }}
        >
          Ana Sayfa
        </Button>
      </Form>
    </>
  );
};

export default Createdaire;
