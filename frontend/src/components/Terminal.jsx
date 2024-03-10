import './Terminal.css'
import TerminalBanner from './TerminalBanner'

export default function Terminal()
{
    return (
        <div id='terminal'>
            <div id='terminal-content'>
                <TerminalBanner />
            </div>
        </div>
    )
}