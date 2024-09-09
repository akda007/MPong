import { Button, Stack, TextField } from "@mui/material";
import { MainContent } from "./styles";
import { useContext, useState } from "react";
import { GameContext } from "../../providers/GameContext";
import ConnectingModal from "./components/ConnectingModal";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const {username, setUsername, target, setMatch, setTarget, setWebSocket, setHost} = useContext(GameContext)
    const navigate = useNavigate();
    const [message, setMessage] = useState("Connecting");
    const [open, setOpen] = useState(false);

    const handleConnect = async () => {
        setOpen(true);

        const ws = new WebSocket("ws://localhost:8080");

        ws.addEventListener("open", () => {
            setWebSocket(ws);     
        })

        ws.addEventListener("message", function connect(msg) {
            const response = JSON.parse(msg.data);
            setMessage("Matching")

            switch(response.type) {
                case "connection":
                    console.log(response)

                    setMatch(response.matchId)
                    setHost(response.host)
                    
                    ws.removeEventListener("message", connect);
                    
                    navigate("/game")
                    break;

                default:
                    console.log(response.data)
                    ws.send(JSON.stringify({
                        type: "notify",
                        data: {
                            name: username,
                            target: target
                        }
                    }))
            }
        })
    }


    return (
        <>
            <ConnectingModal open={open} message={message}/>
            <MainContent>
                <Stack 
                component="form"
                sx={{
                    width: "95%",
                    maxWidth: "530px",
                    boxShadow: "3px 3px 10px 10px #55555536",
                    padding: "30px",
                    borderRadius: "20px"
                }}
                gap={4}>
                    <TextField label="Your name" variant="outlined" onChange={(e) => {setUsername(e.target.value)}}></TextField>
                    <TextField label="Oponent name" variant="outlined" onChange={(e) => {setTarget(e.target.value)}}></TextField>
                    
                    <Button variant="outlined" onClick={handleConnect}>Connect!</Button>
                </Stack>
            </MainContent>
        </>
    )
}