import { useState } from 'react'
import './TerminalInput.css'
import TerminalLeader from "./TerminalLeader"

export default function TerminalInput()
{
    let [ userInput, setUserInput ] = useState("help")

    function handleKeyPress(event)
    {
        if (event.key == "Enter")
        {
            console.log("ENTER")
            console.log("INPUT: ", userInput)
        }

        // TODO: I'm going to have to figure out how I want to manage the state of the terminal.
        // > I'll need to append the appropriate component to the UI with the appropriate state (text) depending on what text is passed in.
    }

    return (
        <>
            <TerminalLeader />
            <div>
                <span id="input-symbol">&gt;</span>
                <input type="text"
                    value={userInput}
                    onChange={event => setUserInput(event.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </>
    )
}