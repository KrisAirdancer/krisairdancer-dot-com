import "./TerminalTextOutput.css"

export default function TerminalTextOutput({ content, userInput })
{
    return (
        <div>
            <span id="input-symbol">&gt;</span>
            <span id="input-content">{userInput}</span>
            <div id="terminal-text-output">{content}</div>
        </div>
    )
}