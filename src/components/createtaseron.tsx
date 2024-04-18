import React, { useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
const Createtaseron: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobType: "",
    agreementAmount: "",
    jobDuration: "",
    paidAmount: "",
    param5: "",
    param6: "",
    param7: "",
    agreementDate: null as dayjs.Dayjs | null, // Specify the type explicitly
  });
  const handleDateChange = (date: dayjs.Dayjs | null, dateString: string) => {
    if (dateString) {
      setFormData({ ...formData, agreementDate: dayjs(dateString) });
    } else {
      setFormData({ ...formData, agreementDate: null });
    }
  };
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        "https://omerinanc.online/api/taseron",
        {
          taseron: {
            iş_türü: formData.jobType,
            anlaşma_miktari: formData.agreementAmount,
            iş_süresi: formData.jobDuration,
            odenen_miktar: formData.paidAmount,
            parametre_5: formData.param5,
            parametre_6: formData.param6,
            parametre_7: formData.param7,
            anlaşma_tarihi:
              formData.agreementDate?.format("YYYY-MM-DD") || null,
          },
        }
      );
      console.log("Element created successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating element:", error);
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
          marginLeft: 170,
          marginTop: 20,
          marginBottom: 1000,
          alignContent: "left",
        }}
      >
        <div style={{ paddingLeft: "20" }}>
          <Form.Item label="İş Türü" labelCol={{ span: 6 }}>
            <Input
              style={{ marginLeft: 0 }}
              placeholder="İş Türü"
              onChange={(e) =>
                setFormData({ ...formData, jobType: e.target.value })
              }
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
          <Form.Item label="İş Süresi" labelCol={{ span: 6 }}>
            <Input
              style={{ marginLeft: 0 }}
              placeholder="İş Süresi"
              onChange={(e) =>
                setFormData({ ...formData, jobDuration: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Ödenen Miktar" labelCol={{ span: 6 }}>
            <Input
              style={{ marginLeft: 0 }}
              placeholder="Ödenen Miktar"
              onChange={(e) =>
                setFormData({ ...formData, paidAmount: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Anlaşma Tarihi" labelCol={{ span: 6 }}>
            <DatePicker
              style={{ marginLeft: 0 }}
              placeholder="Anlaşma Tarihi"
              onChange={handleDateChange}
              value={formData.agreementDate}
            />
          </Form.Item>

          <Form.Item labelCol={{ span: 6 }}>
            <Button onClick={handleFormSubmit} style={{ marginLeft: 150 }}>
              Taşeron Ekle
            </Button>
          </Form.Item>
          <Button
            onClick={() => navigate("/dashboard")}
            style={{ marginLeft: 150 }}
          >
            Ana Sayfa
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Createtaseron;
