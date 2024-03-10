import './TerminalLeader.css'

export default function TerminalLeader()
{
    // TODO: Move these variable into state.
    let username = "guest"
    let currentDirectory = ""

    return (
        <div id="input-leader">
            <span id="username">
                {username}
            </span>
            <span id="site-name">
                @krisairdancer.com ~
            </span>
            {currentDirectory}
        </div>
    )
}