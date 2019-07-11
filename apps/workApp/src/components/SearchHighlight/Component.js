import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Highlight from 'react-highlighter';

const literalExample = `The quick brown fox jumps over the lazy dog
12345
test@gmail.com
http://test.com
http://www.test.com
https://www.test.com
`;

class SearchHighlight extends React.PureComponent {
  state = {
    search: /[A-Za-z]+/,
    text: literalExample,
  }

  updateSearch = (event) => {
    console.log(event.target.value)
    this.setState({
      search: new RegExp(event.target.value),
    })
  }

  render() {
    const style = {
      height: '200px',
    }

    return <>
        <div>
          <label className="f6 b db mb2">Search <span className="normal">(regex)</span></label>
          <textarea id="comment" name="comment" onChange={this.updateSearch} className="db border-box hover-black w-100 ba b--black-20 pa2 br2 mb2" defaultValue={this.state.search}></textarea>
          <small id="comment-desc" className="f6">Create regular expression</small>
        </div>
        <br />
        <div>
          <label className="f6 b db mb2">Text</label>
          <textarea id="comment" name="comment" className="db border-box hover-black w-100 h-50 ba b--black-20 pa2 br2 mb2" style={style} defaultValue={this.state.text}>
          </textarea>
        </div>
        <br />
        <div className="docArea">
          <Highlight search={this.state.search}>{this.state.text}</Highlight>
        </div>
      </>
  }
}

export default SearchHighlight;
