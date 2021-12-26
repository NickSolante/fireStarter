import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";

const path =
  process.env.NODE_ENV === "production"
    ? "https://firebrand-v8fa3.ondigitalocean.app"
    : "http://localhost:3000";

const qrCodes = async (body: string): Promise<AxiosResponse<string, any>> => {
  const res = await axios.post(`${path}/scan`, { url: body });
  console.log(res);
  return res;
};

const QR: NextPage = () => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [qrCodeReceived, setQrCodeReceived] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => {
          qrCodes("http:google.com").then((value) => {
            setQrCodeData(value.data);
            setQrCodeReceived(true);
          });
        }}
      >
        Clicky
      </button>
      {qrCodeReceived && <Image src={qrCodeData} width={300} height={300} />}
    </div>
  );
};

export default QR;
