import React, { Component } from 'react'
import MarkdownIt from 'markdown-it'
import markdownItFontawesome from 'markdown-it-fontawesome'
import markdownItAttrs from 'markdown-it-attrs'
import markdownItTaskLists from 'markdown-it-task-lists'
import markdownItCenterText from 'markdown-it-center-text'
import hljs from 'highlight.js'
import mermaid from 'mermaid';

// Actual default values
const highlightCode = {
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) { }
    }

    return '' // use external default escaping
  }
}

const markdown = function (markup) {
  var md = new MarkdownIt(highlightCode)
    .use(markdownItFontawesome)
    // .use(markdownItEmoji)
    .use(markdownItAttrs)
    .use(markdownItTaskLists)
    .use(markdownItCenterText)

  md.renderer.rules.emoji = function (token, idx) {
    return '<span class="emoji">' + token[idx].content + '</span>'
  }

  md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    return '<table class="ui celled table">'
  }

  md.renderer.rules.table_close = function (tokens, idx, options, env, self) {
    return '</table>'
  }

  return {
    __html: md.render(markup)
  }
}

export class MarkdownGen extends Component {
  mermaidInit() {
    mermaid.init(undefined, document.getElementsByClassName('language-mermaid'))
  }

  componentDidMount() {
    this.mermaidInit()
  }

  componentDidUpdate() {
    this.mermaidInit()
  }

  render() {
    return (
      <div className="markdown-wrapper" dangerouslySetInnerHTML={markdown(this.props.source)}></div>
    )
  }
}

export default class Markdown extends React.Component {
    render() {
      const { markdownFile } = this.props
      const md = require('./file.md').default;

      return (
        <MarkdownGen source={md} />
      )
    }
  }