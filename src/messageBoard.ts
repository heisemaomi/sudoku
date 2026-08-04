import { db } from "./firebase";

import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";


const messagesRef = collection(db, "messages");


export function createMessageBoard(container: HTMLElement) {

    const title = document.createElement("h2");
    title.textContent = "Message Board";

    const input = document.createElement("textarea");
    input.placeholder = "Leave a message...";

    const button = document.createElement("button");
    button.textContent = "Send";

    const list = document.createElement("div");
    list.id = "message-list";


    button.onclick = async () => {

        const text = input.value.trim();

        if (!text) {
            return;
        }

        try {
            await addDoc(messagesRef, {
                text: text,
                time: Date.now()
            });

            input.value = "";

        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };


    container.appendChild(title);
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(list);


    listenToMessages(list);
}


function listenToMessages(list: HTMLElement) {

    const q = query(
        messagesRef,
        orderBy("time", "desc")
    );

    onSnapshot(q, (snapshot) => {

        list.innerHTML = "";

        snapshot.forEach(doc => {

            const data = doc.data();

            const item = document.createElement("div");
            item.innerHTML = `
                <div>${data.text}</div>
                <small>${new Date(data.time).toLocaleString()}</small>
            `;

            list.appendChild(item);
        });

    });
}