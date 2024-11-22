let db: any;

// Instance of Firebase FireStore
const getFirestoreInstance = async () => {
    if (!db) {
        const { initializeApp } = await import('firebase/app');
        const { getFirestore } = await import('firebase/firestore');
        const { firebaseConfig } = await import('./firebase.config');

        // Your web app's Firebase configuration
        //IMPORTANT: delete the firebaseConfig when you push to a public repository
        //firebaseConfig is in the .gitignore file

        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    }
    return db;
}

// Functions
export const addProducts = async (product: any) => {
    try {
        const db = await getFirestoreInstance();
        const { setDoc, doc } = await import('firebase/firestore');
        // Use the product's ID when creating the document
        const docRef = doc(db, 'products', product.id);
        await setDoc(docRef, product);
        return true;
    } catch (error) {
        console.error("Error adding document:", error);
        return false;
    }
};

export const getProducts = async () => {
    try {
        const db = await getFirestoreInstance();
        const { getDocs, collection } = await import('firebase/firestore');

        const where = collection(db, 'products');
        const querySnapshot = await getDocs(where);
        const data: any[] = [];

        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        return data;
    } catch (error) {
        console.error("Error getting document:", error);
    };
};