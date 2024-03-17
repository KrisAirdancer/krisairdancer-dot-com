import { useState } from 'react'
import './TerminalInput.css'
import TerminalLeader from "./TerminalLeader"

export default function TerminalInput({ onEnter })
{
    let [ userInput, setUserInput ] = useState("")

    function handleKeyPress(event)
    {
        if (event.key == "Enter")
        {
            onEnter(userInput)
            setUserInput("")
        }
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