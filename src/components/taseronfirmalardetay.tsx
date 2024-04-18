import React from "react";
import { Space, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

const TaseronFirmalarDetay: React.FC = () => {
  interface DataType {
    key: string;
    firmaadi: string;
    odemeturu: string;
    odememiktari: string;
    odemetarihi: string;
    aciklama: string;
    isebaslamatarihi: string;
    isinsuresi: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Firma Adı",
      dataIndex: "firmaadi",
      key: "firmaadi",
      render: (text) => <Button>{text}</Button>,
    },
    {
      title: "Ödeme Türü",
      dataIndex: "odemeturu",
      key: "odemeturu",
    },
    {
      title: "Ödeme Miktarı",
      dataIndex: "odememiktari",
      key: "odememiktari",
    },
    {
      title: "Ödeme Tarihi",
      dataIndex: "odemetarihi",
      key: "odemetarihi",
    },
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      key: "aciklama",
    },
    {
      title: "İşe Başlama Tarihi",
      dataIndex: "isebaslamatarihi",
      key: "isebaslamatarihi",
    },
    {
      title: "İşin Süresi",
      dataIndex: "isinsuresi",
      key: "isinsuresi",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button>Firmayı Sil</Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      firmaadi: "Yalıtım",
      odemeturu: "Nakit",
      odememiktari: "250.000 TL",
      odemetarihi: "03/12/2023",
      aciklama: "Not",
      isebaslamatarihi: "03/04/2023",
      isinsuresi: "1 sene",
    },
    {
      key: "2",
      firmaadi: "Elektrik",
      odemeturu: "Kredi Kartı",
      odememiktari: "350.000 TL",
      odemetarihi: "02/01/2023",
      aciklama: "Not",
      isebaslamatarihi: "30/04/2023",
      isinsuresi: "3 ay",
    },
    {
      key: "3",
      firmaadi: "Demir Bağlantıları",
      odemeturu: "Havale",
      odememiktari: "500.000 TL",
      odemetarihi: "15/07/2022",
      aciklama: "Not",
      isebaslamatarihi: "07/10/2022",
      isinsuresi: "3 ay",
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default TaseronFirmalarDetay;
