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
                return <TerminalTextOutput content={COMMANDS.banner} userInput={'banner'} />
            case "help":
                return <TerminalTextOutput content={COMMANDS.help} userInput={'help'} />
            case "whois":
                return <TerminalTextOutput content={COMMANDS.about} userInput={'whois'} />
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
let siteVersion = "3.0.0"
let COMMANDS = {
    banner: "╦╔═╦═╗╦╔═╗╔═╗╦╦═╗╔╦╗╔═╗╔╗╔╔═╗╔═╗╦═╗\n" +
            "╠╩╗╠╦╝║╚═╗╠═╣║╠╦╝ ║║╠═╣║║║║  ║╣ ╠╦╝\n" +
            "╩ ╩╩╚═╩╚═╝╩ ╩╩╩╚══╩╝╩ ╩╝╚╝╚═╝╚═╝╩╚═\n" +
            "The Portfolio of Chris Marston\n" +
            `v${siteVersion}\n\n` +
            "Type 'help' for a list of available commands",
    about: "I'm Chris and welcome to my website!\n" +
           "I'm a computer science student in the United States.\n" +
           "When I'm not studying for exams, you'll likely find me\n" +
           "at my keyboard working on a project, climbing, running,\n" +
           "or hiking.",
    help: "'help'      list available commands\n" +
          "'whois'     about me\n" +
          "'banner'    display site banner\n"
}