const React = require('react')
import { List, FromInventory, Map, AllButSelection, NextChapter } from '../components'
import { connect } from 'react-redux'
import { RenderSection } from "../components"

export const Chapter = ({currentSection, inventory}) => {
  const languages = ["Twine", "inklewriter", "ChoiceScript"]
  var sections = [
    <section>
      <h2>Introduction</h2>
      <h3>Welcome to Windrift</h3>
      <p>Windrift is a framework for writing interactive stories. </p>
      <p>
        It produces works very much like <List expansions={["other narrative systems", languages, "Twine, inklewriter, or ChoiceScript"]}
                                           conjunction="or" tag="c0_languages"/>—
        frameworks that generate long-form stories that incorporate user choice or action.
      </p>
      <p>
        <Map from={inventory.c0_languages} to={{
          twine: <span>I agree, Twine is excellent! If you’re new to Twine, <a href="https://emshort.wordpress.com/2012/11/10/choice-based-narrative-tools-twine/">Emily Short</a> has an excellent writeup.</span>,
          inklewriter: <span>The folks at inkle have made some great commercial adventure games,
            and with <a href="http://www.inklestudios.com/inklewriter/">inklewriter</a>, you can
          make your own too—no coding required.</span>,
          choicescript: <span>Many award-winning games have been made in this tool from
            Choice of Games. <a href="https://www.choiceofgames.com/make-your-own-games/choicescript-intro/">Give it a shot</a>.
          </span>
        }} />
      </p>
      <aside>
        (And while <FromInventory inventory={inventory.c0_languages} /> is great, you should also
        look into <AllButSelection selection={inventory.c0_languages} expansions={languages} /> too!)

      </aside>

    </section>,
    <section>
      <h3>Should I use Windrift?</h3>
      <p>
        For most interactive narrative authors, the answer is almost certainly
        “no.” Most people should start by looking at <a href="https://twinery.org/">Twine</a>,
        a mature, user-friendly system with a vibrant and welcoming community. Other
        authoring environments are similarly battle-tested and offer a lot of features out of the box.
      </p>
      <p>
        I do not recommend Windrift for non-programmers. You will be required to
        write JavaScript ES2016 source code and to understand the basics of
        JavaScript dependency management and build tools. I provide step-by-step
        instructions for those, but some experience in this area is expected.
      </p>
      <p>
        If <List expansions={["writing code", "dealing with syntax errors", "fighting with transpilers"]} tag="c0_code" nextUnit={null} /> doesn’t
        scare you, <List expansions={["read on", "read on"]} tag="c0_continue"/>.
      </p>
    </section>,
    <section>
      <h3>What is Windrift good for, then?</h3>
      <p>
        Windrift is written on top of React and Redux, two frameworks for creating
        web applications. Redux implements a pattern of strict state management,
        and when I read about it, I thought it might be a good fit for games. React/Redux
        underpins some of the key features of Windrift, which are mostly relevant
        to developers:
      </p>

      <ul>
        <li>Atomic management of state reduces the likelihood of unexpected
        bugs.</li>
        <li> State is immutable, so inconsistencies in the world model should not
        happen.</li>
        <li> You have access to the entire ecosystem of React/Redux plugins,
          not to mention anything you can author in JavaScript,
          allowing your game to potentially make use of real-time data,
        visualizations, or anything you can code.</li>
        <li>React component architecture lends itself to making nice game
          extensions or plugins, which can easily be unit-tested and dropped
          in to the game framework.
        </li>
      </ul>
      <p>
        Windrift adds a few nice-to-have features that aren't often found in
        other interactive narrative systems:
      </p>
      <ul>
        <li>The entire user interface and basic text-reveal system has been
          thoroughly tested in nearly all modern desktop and mobile browsers,
          as well as in most screenreaders. Games can be played entirely via
          keyboard or voice controls.
        </li>
        <li>
          Windrift state management is automatically persisted to the browser
          using HTML5 local storage, so players will not lose their place
          if they close the window or navigate away.
        </li>
        <li>
          Windrift makes use of the <code>pushState</code> API, so the browser
          back button works as it should.
        </li>
        <li>
          Windrift games are automatically packaged with a <a href="https://w3c.github.io/manifest/">Web App Manifest</a>,
          which means your game can be installed on a mobile device and played offline.
        </li>
      </ul>
      <NextChapter chapter={1} />
    </section>
  ]
  return <RenderSection currentSection={currentSection} sections={sections} />
}