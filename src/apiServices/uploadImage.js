import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '~/firebase';

const uploadImageToFirebase = (file) => {
  if (file) return;
  const imageName = Math.random().toString(36).substring(2, 9);
  const imageRef = ref(storage, `productImages/${imageName}`);
  uploadBytes(imageRef, file)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => url)
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

export default uploadImageToFirebase;
