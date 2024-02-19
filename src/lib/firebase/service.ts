import {collection, getDocs, getFirestore, doc, query, where, addDoc, getDoc} from 'firebase/firestore';
import app from './init';

const firestore = getFirestore(app);


export async function retrieveData(collectionName: string) {
   const snapshot = await getDocs(collection(firestore, collectionName));
   const data = snapshot.docs.map((doc) => (
      {
         id: doc.id,
         ...doc.data()
      }
   ));

   return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const docRef = doc(firestore, collectionName, id);
  const snapshot = await getDoc(docRef);
  return snapshot.data();
}

export async function retrieveDataByField(collectionName: string, field: string, value: string) {
    const q = query(
      collection(firestore, collectionName),
      where(field, '==', value)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => (
      {
        id: doc.id,
        ...doc.data()
      }
    ));
    return data;
}

export async function addData(collectionName: string, data: any, callback: Function) {
  await addDoc(collection(firestore, collectionName), data)
  .then(() => {
   callback(true);
  })
  .catch((error: any) => {
   callback(false);
   console.log(error);
  });
}
