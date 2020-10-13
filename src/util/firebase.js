import * as firebase from 'firebase'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCAeH_aaEH5cKcMgFrm8iMBvoSsu-1Y7QA",
    authDomain: "shotsup-mvp.firebaseapp.com",
    databaseURL: "https://shotsup-mvp.firebaseio.com",
    projectId: "shotsup-mvp",
    storageBucket: "shotsup-mvp.appspot.com",
    messagingSenderId: "590362780586",
    appId: "1:590362780586:web:e69ff9dd2439ae22d201d3",
    measurementId: "G-LT64VQCDS1"
};

firebase.initializeApp(config)

export default firebase