import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '~/firebase';

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      alert('Please choose a file first!');
    }
    const fileName = Math.random().toString(36).substring(2, 9);
    const storageRef = ref(storage, `/files/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (err) => reject(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          resolve(url);
        });
      }
    );
  });
};

export default uploadImage;
