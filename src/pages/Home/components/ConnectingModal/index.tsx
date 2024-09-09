import { Modal, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"

type ConnectingModalParams = {
    open: boolean,
    message: string
}
export default function ConnectingModal({open, message}: ConnectingModalParams) {
    const [dots, setDots] = useState(".");

    useEffect(() => {
        setTimeout(() => {
            if (dots.length == 3) {
                setDots(".")
                return;
            }

            setDots(dots + ".");
        }, 500);
    })

    return (
        <>
            <Modal
                open={open}
            >
                <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
                    <Stack
                        alignItems={"flex-start"}
                        justifyContent={"center"}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "15px",
                            width: "95%",
                            height: "80%",
                            maxWidth: "380px",
                            maxHeight: "150px",
                            padding: "50px"
                        }}
                    >
                        <Typography variant="h3">{message}{dots}</Typography>
                    </Stack>
                </Stack>

            </Modal>
        </>
    )   
}