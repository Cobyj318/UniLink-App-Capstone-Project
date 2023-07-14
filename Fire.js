import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { initializeApp, getApps } from 'firebase/app';
import {getAuth} from "firebase/auth";


class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if (!getApps().length) {
            initializeApp({
                apiKey: "AIzaSyDXBDXZU8yoiykBHaaaIfPr4KIxLFkgc4E",
                authDomain: "uni-link-b79d0.firebaseapp.com",
                projectId: "uni-link-b79d0",
                storageBucket: "uni-link-b79d0.appspot.com",
                messagingSenderId: "286725607317",
                appId: "1:286725607317:web:7c9620e65166dfffa7b09c",
                measurementId: "G-5KPCRH3GPC"

            });
        }
    };

    checkAuth = () => {
        getAuth().onAuthStateChanged(user => {
            if (!user) {
                getAuth().signInAnonymously();

            }
        });
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref("messages")
    }

    get uid() {
        return (getAuth().currentUser || {}).uid;
    }
}

export default new Fire();