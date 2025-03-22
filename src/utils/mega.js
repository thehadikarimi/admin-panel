// @ts-nocheck
import { Storage } from "megajs";

export async function uploadToMega([file, fileBuffer], folderName) {
  const [email, password] = process.env.MEGA_CREDENTIALS.split(":");
  const storage = new Storage({ email, password });

  return new Promise((resolve, reject) => {
    storage.once("ready", async () => {
      const folder = await storage.root.children.find(
        (folder) => folder.name === folderName,
      );

      const uploadedFile = await folder.upload(file, fileBuffer, (err, res) => {
        res.link((err, link) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          if (link) resolve(link);
        });
      });
    });
  });
}

export async function deleteFromMega(filesName, folderName) {
  const [email, password] = process.env.MEGA_CREDENTIALS.split(":");
  const storage = new Storage({ email, password });

  return new Promise((resolve, reject) => {
    storage.once("ready", async () => {
      const folder = await storage.root.children.find(
        (folder) => folder.name === folderName,
      );

      Promise.all(
        filesName.map((fileName) => {
          return new Promise((resolve, reject) => {
            const file = folder.find((file) => file.name === fileName);

            if (!file) {
              console.warn(`File not found: ${fileName}`);
              return resolve();
            }

            file.delete(true, (err) => {
              if (err) {
                console.error(err);
                return reject(err);
              }

              resolve();
            });
          });
        }),
      )
        .then(() => resolve())
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  });
}
