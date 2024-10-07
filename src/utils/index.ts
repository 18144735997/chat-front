import OSS from "ali-oss";
import dayjs from "dayjs";

/**
 * 生成[a,b]的随机数
 * @param a 区间下限
 * @param b 区间上限
 * @returns {number}
 */
export const generateRandomNumber = (a: number, b: number): number => {
  return Math.floor(Math.random() * b + a);
};

/**
 * 生成随机颜色
 * @returns {string}
 */
export const generateRandomColor = (): string => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

/**
 * 将base64转换为File对象
 * @param base64String base64字符串
 * @param title 文件名字
 * @param file 服务器接收的字段名
 * @returns
 */
export const base64ToFile = (
  base64String: string,
  title: string,
  file = "file"
) => {
  const parts = base64String.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  const formData = new FormData();
  formData.append(file, new Blob([uInt8Array], { type: contentType }), title);

  return formData;
};

/**
 * 判断数据返回格式
 * @param format 需要判断的数据
 * @returns boolean
 */
export const isBool = (format: string): boolean => {
  return format === "位";
};

/**
 * 阿里云oss
 * @param file 上传的文件
 * @param fileName 文件名
 * @param dir 目录名
 * @returns
 */
export const uploadOSS = async (
  file: File,
  fileName: string,
  dir: string = "blog"
) => {
  const date = dayjs(new Date()).format("YYYYMMDD");
  const client = new OSS({
    region: "",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "",
  });
  const res = await client.put(`${dir}/${date}/${fileName}`, file);
  return res.url;
};
