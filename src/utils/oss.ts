import OSS from "ali-oss";
import dayjs from "dayjs";

const date = dayjs(new Date()).format("YYYYMMDD");

// 阿里云oss
export const uploadOSS = async (
  file: File,
  fileName: string,
  dir: string = "blog"
) => {
  const client = new OSS({
    region: "",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "",
  });
  const res = await client.put(`${dir}/${date}/${fileName}`, file);
  return res.url;
};
