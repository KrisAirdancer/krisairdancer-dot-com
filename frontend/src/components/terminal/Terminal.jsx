import './Terminal.css'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'

export default function Terminal()
{
    return (
        <div id='terminal'>
            <TerminalOutput />
            <TerminalInput />
        </div>
    )
}