import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import Layout from "../components/layouts";
import { ifError } from "assert";

const path = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

const qrCodes = async (body: string): Promise<AxiosResponse<any, any>> => {
  const res = await axios.post(`${path}/qrCode`, { url: body });

  return res;
};

const QR: NextPage = () => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [qrCodeReceived, setQrCodeReceived] = useState<boolean>(false);
  const [field, setField] = useState("");

  const handleChange = (event) => {
    setField(event.target.value);
  };

  const handleSubmit = (event) => {
    qrCodes(field).then((value) => {
      if (value.data !== "Empty Data!") {
        setQrCodeData(value.data);
        setQrCodeReceived(true);
      } else {
        setQrCodeReceived(false);
      }
    });
    event.preventDefault();
  };

  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            URL:
            <input
              type="text"
              value={field}
              name="url"
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {qrCodeReceived ? (
          <Image src={qrCodeData} width={300} height={300} />
        ) : null}
      </div>
    </Layout>
  );
};

export default QR;
