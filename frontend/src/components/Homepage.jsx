import './Homepage.css'

export default function Homepage()
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
    <>
    <main>
      <div id='terminal-content'>
        <div id='terminal-banner'>
          {banner}
        </div>
      </div>
    </main>
    </>
  )
}
