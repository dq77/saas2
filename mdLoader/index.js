const markdown = require('markdown-it')
const hljs = require('highlight.js')
const scriptRe = /^<script(?=(\s|>|$))/i
const styleRe = /^<style(?=(\s|>|$))/i

module.exports = function (src) {
  const md = markdown({
    html: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs" v-pre>
                        <code>
                            ${hljs.highlight(lang, str, true).value}
                        </code>
                    </pre>`
        } catch (error) {
          console.log('error:' + error)
        }
      }
      return `<pre class="hljs">
                <code>${md.utils.escapeHtml(str)}</code>
            </pre>`
    }
  })

  let scriptStr = ''
  let styleStr = ''

  md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content
    if (scriptRe.test(content.trim())) {
      scriptStr = content
      return ''
    } if (styleRe.test(content.trim())) {
      styleStr = content
      return ''
    } else {
      return content
    }
  }

  const html = md.render(src)

  return (
        `<template>\n
            <MarkDown>
                <div class="markdown">${html}</div>\n
            </MarkDown>
        </template>\n
        ${scriptStr}
        ${styleStr}
        `
  )
}
