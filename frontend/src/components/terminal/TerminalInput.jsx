import './TerminalInput.css'
import TerminalLeader from "./TerminalLeader"

export default function TerminalInput()
{
    return (
        <>
            <TerminalLeader />
            <div>
                <span id="input-symbol">&gt;</span>
                <input type="text" />
            </div>
        </>
    )
}