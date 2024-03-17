
import { useState } from 'react'
import './Terminal.css'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'

export default function Terminal()
{
    let [ terminalOutput, setTerminalOutput ] = useState(["banner"])

    function handleOutputChange(userInput)
    {
        if (userInput === 'clear')
        {
            setTerminalOutput([])
        }
        else
        {
            setTerminalOutput(prevTerminalOutput => {
                return [
                    ...prevTerminalOutput,
                    userInput
                ]
            })
        }
    }

    return (
        <div id='terminal'>
            {terminalOutput.map(command => <TerminalOutput command={command} />)}
            <TerminalInput onEnter={handleOutputChange} />
        </div>
    )
}
