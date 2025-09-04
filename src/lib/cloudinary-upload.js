import cloudinary from "./cloudinary";

export async function uploadToCloudinaryFromFile(
  file,
  opts = {}
) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: opts.folder ?? "schools-images",
        resource_type: "image",
        // You can also set: use_filename, unique_filename, overwrite, tags, etc.
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  });
}
