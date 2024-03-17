import TerminalLeader from "./TerminalLeader";
import TerminalTextOutput from "./TerminalTextOutput";

export default function TerminalOutput({ command })
{
    console.log(`AT: TerminalOutput(${command})`)

    function renderOutput(command)
    {
        switch(command)
        {
            case "banner":
                return <TerminalTextOutput content={COMMANDS.banner} />
            case "help":
                return <TerminalTextOutput content={COMMANDS.help} />
            case "whois":
                return <TerminalTextOutput content={COMMANDS.about} />
            default:
                return <TerminalTextOutput content={`command not found: '${command}'`} />
        }
    }

    return (
        <>
        <TerminalLeader />
            {renderOutput(command)}
        </>
    )
}

// TODO: Move the site version to a config or something.
let siteVersion = "2.0.1"
let COMMANDS = {
    banner: "╦╔═╦═╗╦╔═╗╔═╗╦╦═╗╔╦╗╔═╗╔╗╔╔═╗╔═╗╦═╗\n" +
            "╠╩╗╠╦╝║╚═╗╠═╣║╠╦╝ ║║╠═╣║║║║  ║╣ ╠╦╝\n" +
            "╩ ╩╩╚═╩╚═╝╩ ╩╩╩╚══╩╝╩ ╩╝╚╝╚═╝╚═╝╩╚═\n" +
            "The Portfolio of Chris Marston\n" +
            `v${siteVersion}\n`,
    about: "Hi! I'm Chris!",
    help: "'help'      list available commands\n" +
          "'whois'     about me\n" +
          "'banner'    display site banner\n"
}