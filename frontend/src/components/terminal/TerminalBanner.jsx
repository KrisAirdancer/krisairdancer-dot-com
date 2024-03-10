import './TerminalBanner.css'

export default function TerminalBanner()
{
    // TODO: Move this to a different location. A config file or something?
    let siteVersion = "2.0.1"

    let banner = "  ██████╗███╗   ███╗ ╦╔═╦═╗╦╔═╗╔═╗╦╦═╗╔╦╗╔═╗╔╗╔╔═╗╔═╗╦═╗\n" +
                " ██╔════╝████╗ ████║ ╠╩╗╠╦╝║╚═╗╠═╣║╠╦╝ ║║╠═╣║║║║  ║╣ ╠╦╝\n" +
                " ██║     ██╔████╔██║ ╩ ╩╩╚═╩╚═╝╩ ╩╩╩╚══╩╝╩ ╩╝╚╝╚═╝╚═╝╩╚═\n" +
                " ██║     ██║╚██╔╝██║ The Portfolio of Chris Marston\n" +
                ` ╚██████╗██║ ╚═╝ ██║ v${siteVersion}\n` +
                "  ╚═════╝╚═╝     ╚═╝"

    return (
        <div id='terminal-banner'>
            {banner}
        </div>
    )
}