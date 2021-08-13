import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { FiShare2 } from "react-icons/fi";
import io from "socket.io-client";
import queryString from "query-string";
import { store } from "react-notifications-component";

import Header from "../Header/Header";
import UsersList from "../User/Users";
import Dropdown from '../Dropdown/Dropdown';

import "codemirror/mode/python/python";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

let socket = null;

export default function Editor({location}) {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState("");
    const [text, setText] = useState("# Enter your code here");
    const [config, setConfig] = useState({
        mode: { name: "python" },
        theme: "material",
        lineNumbers: true,
    });

    const ENDPOINT = 'http://127.0.0.1:5000/'

    useEffect(() => {
        const { room } = queryString.parse(location.search);
        console.log(room)
        socket = io(ENDPOINT);
    
        let name;
        while (!name) {
          name = prompt("Hi, What is your name?");
        }
    
        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, (error) => {
          if (error) {
            alert(error);
          }
        });
    }, [ENDPOINT, location.search]);


    useEffect(() => {
        socket.on("text", (text) => {
            setText(text);
        });

        socket.on("notification", (notification) => {
            if (notification.type === "connect") {
              store.addNotification({
                message: notification.text,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover: true,
                  touch: true,
                  showIcon: true,
                  click: true,
                },
              });
            } else {
              store.addNotification({
                message: notification.text,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  pauseOnHover: true,
                  touch: true,
                  showIcon: true,
                  click: true,
                },
              });
            }
        });

        socket.on("changeMode", (mode) => {
          setConfig({ mode: mode });
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
            console.log(users);
        });
    }, [])

    const handleText = (text) => {
        socket.emit("sendText", text);
    }

    const handleMode = (e) => {
      setConfig({ mode: e.target.value });
      socket.emit("sendMode", e.target.value);
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        store.addNotification({
          message: "Copied shareable link to clipboard!",
          type: "info",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
            pauseOnHover: true,
            touch: true,
            showIcon: true,
            click: true,
          },
        });
    };

    const modes = [
      { name: "Python", code: "python" },
      { name: "Javascript", code: "javascript" },
      { name: "C/C++/C#", code: "clike" },
      { name: "XML/HTML", code: "xml" }
    ];

    return (
        <div className="container">
            <Header />
            <UsersList users={users} />
            <main>
                <div id="share">
                    <Dropdown 
                      default={config.mode}
                      options={modes}
                      handleDropdown={handleMode}
                    />
                    <button className="btn btn-success" onClick={handleShare}>
                        <span>Share&nbsp;&nbsp;</span>
                        <FiShare2 size={15} />
                    </button>
                </div>
                <CodeMirror
                    value={text}
                    className="codeMirror"
                    options={config}
                    onBeforeChange={(editor, data, value) => {
                        setText(value);
                        handleText(value);
                    }}
                />
            </main>
        </div>
    )
}