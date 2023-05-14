// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, addDoc, setDoc, doc } from "firebase/firestore"; 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKqKANsmY0kKgkwbP5XObnh9SD16hHj-g",
  authDomain: "to-do-list-19bb9.firebaseapp.com",
  projectId: "to-do-list-19bb9",
  storageBucket: "to-do-list-19bb9.appspot.com",
  messagingSenderId: "914012383913",
  appId: "1:914012383913:web:cba8dd3a9ad11cc88e17b8",
  measurementId: "G-26B7KE7YWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function getTasks() {
  const allTasks = [];
const querySnapshot = await getDocs(collection(db, "tasks"));
querySnapshot.forEach((doc) => {
  //console.log(`${doc.id} => ${doc.data()}`);
  allTasks.push({...doc.data(), id: doc.id})
});
return allTasks
}
//función para agregar info y conectarla con get Tasks
export async function addTask(taskTitle) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: taskTitle,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function editDocument(title, id) {
  // Add a new document in collection "cities"
await setDoc(doc(db, "tasks", id), {
  title: title,
  completed: true,
});
}