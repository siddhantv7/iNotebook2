// import react from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {
    // const s1 = {
    //     "name": "Siddhant",
    //     "class": "15"
    // }
    // const [state, setState] = useState(s1);

    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "raj",
    //             "class": "12"
    //         })
    //     }, 1000)
    // }

    const initialNotes = [
        
            {
                "_id": "65e5d39ac1ba318ae6a5ec2a",
                "user": "65e05e399fa84b0c8c9b7a03",
                "title": "My Title",
                "description": "Hello! I  am good?.",
                "tag": "personal",
                "date": "2024-03-04T13:58:50.259Z",
                "__v": 0
            },
            {
                "_id": "65e5d427c1ba318ae6a5ec2d",
                "user": "65e05e399fa84b0c8c9b7a03",
                "title": "My Title2",
                "description": "Hello! I  am good.2",
                "tag": "personal",
                "date": "2024-03-04T14:01:11.728Z",
                "__v": 0
            },
            {
                "_id": "65e5d42dc1ba318ae6a5ec2f",
                "user": "65e05e399fa84b0c8c9b7a03",
                "title": "My Title3",
                "description": "Hello! I  am good.3",
                "tag": "personal",
                "date": "2024-03-04T14:01:17.632Z",
                "__v": 0
            },
            {
                "_id": "65e5d433c1ba318ae6a5ec31",
                "user": "65e05e399fa84b0c8c9b7a03",
                "title": "My Title4",
                "description": "Hello! I  am good.4",
                "tag": "personal",
                "date": "2024-03-04T14:01:23.040Z",
                "__v": 0
            },
            {
                "_id": "65e5d439c1ba318ae6a5ec33",
                "user": "65e05e399fa84b0c8c9b7a03",
                "title": "My Title5",
                "description": "Hello! I  am good.5",
                "tag": "personal",
                "date": "2024-03-04T14:01:29.494Z",
                "__v": 0
            }
        
    ];
    const [notes, setNotes] = useState(initialNotes)
    return (
        // <NoteContext.Provider value={{ state, update }}>
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;