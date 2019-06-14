import React from 'react'

import MathJax from 'react-mathjax2'
import ReactMarkdown from 'react-markdown'
import RemarkMathPlugin from 'remark-math'

export const MarkdownMathRender = props => {
  const newProps = Object.assign({}, props, {
    plugins: [RemarkMathPlugin],
    renderers: Object.assign({},
      props.renderers, {
        math: _props => <MathJax.Node>{_props.value}</MathJax.Node>,
        inlineMath: _props => <MathJax.Node inline>{_props.value}</MathJax.Node>
      })
  }
  )

  return (
    <MathJax.Context input='tex'>
      <ReactMarkdown {...newProps} />
    </MathJax.Context>
  )
}
