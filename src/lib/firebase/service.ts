import {collection, getDocs, getFirestore, doc, query, where, addDoc, getDoc} from 'firebase/firestore';
import app from './init';
import bcrypt from 'bcrypt';
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

export async function signUp(userData: {
  email: string;
  fullname: string;
  phone: string;
  password: string;
  role?: string
}, callback: Function){
  const q = query(
    collection(firestore, 'users'),
    where('email', '==', userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
  ))

  if (data.length > 0) {
   callback(false);
  } else {
   if (!userData.role) {
    userData.role = 'member';
   }

   userData.password = await bcrypt.hash(userData.password, 10);

   await addDoc(collection(firestore, 'users'), userData)
    .then(() => {
     callback(true);
    })
    .catch((error: any) => {
     callback(false);
     console.log(error);
    });
  }
}

export async function signIn(email: string){
  const q = query(
    collection(firestore, 'users'),
    where('email', '==', email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
  ));

  if (data.length ) {
    return data[0]
  }else{
    return null
  }

 
}

export async function loginWithGoogle(data: any, callback: Function){
  const q = query(
    collection(firestore, 'users'),
    where('email', '==', data.email)
  );

  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => (
    {
      id: doc.id,
      ...doc.data()
    }
  ));

  if (user.length ) {
    callback(user[0]);
  }else{
    data.role = 'member';
    await addDoc(collection(firestore, 'users'), data).then(() => {
      callback(data);
    })
  }
}
