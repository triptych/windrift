const React = require('react')
const ReactDOM = require('react-dom')
import PropTypes from 'prop-types'
const Shim = require('es6-shim')

import { Provider, connect } from 'react-redux'
import { createStore, compose } from 'redux'
import { ActionCreators } from 'redux-undo'
import { persistStore, autoRehydrate } from 'redux-persist'
import { showNextSection } from "./actions"
import { Counter } from './components/counter'
import gameApp from './reducers'

class _Game extends React.Component {
  constructor(props) {
    super(props)
    // Dynamically load all JS in the 'chapters' directory as a Chapter object
    this.chapters = []
    props.chaptersList.keys().sort().forEach((filename, index) => {
      let chapter = props.chaptersList(filename).default
      // React requires this be uppercase, hooray
      let C = connect(chapterMapper)(chapter)
      this.chapters.push(<C chapterId={index}/>)
    })
  }
  render() {
    // Display all chapters up to the currentChapter
    return <div>
      <Counter identifier={this.props.config.identifier} />
      {
        Array(this.props.currentChapter + 1).fill().map((_, i) => {
          return <div key={"chapter" + i} className={i === this.props.currentChapter ? 'current-chapter' : 'chapter'}>{this.chapters[i]}</div>
        })
      }
    </div>
  }
}
_Game.contextTypes = {
  config: PropTypes.object,
  chapterList: PropTypes.array
}

const chapterMapper = (state, ownProps) => {
  return {
    currentSection: state.bookmarks.present[ownProps.chapterId],
    inventory: state.inventory.present
  }
}

const mapStateToProps = (state) => {
  return {
    currentChapter: state.bookmarks.present.length - 1
  }
}

/* Jump to a point in time from the browser history, either onload or after a popstate event */
const jumpFromHistory = (store) => {
  if (history.state.hasOwnProperty(store.getState().config.identifier)) {
    let timeOffset = history.state[store.getState().config.identifier] - store.getState().counter.present
    store.dispatch(ActionCreators.jump(timeOffset))
  }
}

export const Game = connect(
  mapStateToProps, {
    showNextSection: showNextSection
  }
)(_Game)

export const startGame = (game) => {
  var store = createStore(gameApp, {config: game.props.config}, autoRehydrate())
  // Set up the localStorage persistence
  persistStore(store, {keyPrefix: game.props.config.identifier})

  // Jump to the current point in history after hydration if there's any state at all
  if (history.state) {
    jumpFromHistory(store)
  }
  
  if (game.props.config.enableUndo) {
    // If we received a browser forward/back, jump to the relevant point in history
    window.addEventListener("popstate", function(e) {
      jumpFromHistory(store)
    })
  }
  ReactDOM.render(<Provider store={store}>{game}</Provider>, document.getElementById('article'))
}
