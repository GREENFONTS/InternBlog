export const GetImageUrl = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "eleviounsigned");
    data.append("cloud_name", "elevio");
    let res = await fetch(
      "  https://api.cloudinary.com/v1_1/elevio/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    let result = await res.json();
    return result;
  };