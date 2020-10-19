import React from "react";
import "./Container.css";

const colors = require("./possible-colors.json");

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorNameStr: "Kanye West",
      color: this.ChangeColorFunction(),
      randomQuoteStr: "",
    };
  }

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    fetch("https://api.kanye.rest/")
      .then((response) => response.json())
      .then((parsedJSON) => {
        this.setState({
          randomQuoteStr: parsedJSON.quote,
          href: parsedJSON.quote,
        });
      })
      .catch((error) => console.log("error", error));
  };

  ChangeColorFunction = () => {
    const ColorCode = `${colors.colors[Math.floor(Math.random() * 215)]}AA`;
    document.body.style.color = ColorCode;

    // Esto puede hacerse mejor, faltan tests.
    this.setState({
      color: ColorCode,
    });
  };

  render() {
    return (
      <div className="quote-box" id="quote-box">
        <h2
          id="text"
          style={{ color: this.state.color }}
          onLoadStart={this.fetchData.bind(this)}
        >
          {this.state.randomQuoteStr}
        </h2>
        <h3 id="author" style={{ color: this.state.color }}>
          {this.state.authorNameStr}
        </h3>
        <br />
        <button
          className="button"
          id="new-quote"
          onClick={this.fetchData.bind(this)}
          onMouseUp={this.ChangeColorFunction.bind(this)}
        >
          New quote
        </button>
        <a
          className="twitter-share-button"
          id="tweet-quote"
          href={`${`https://twitter.com/intent/tweet?text=`}"${
            this.state.randomQuoteStr
          }${`" - `}${this.state.authorNameStr}${`&hashtags=quotemaker`}`}
        >
          <img
            id="twitter-img"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F23%2F23931.png&f=1&nofb=1"
            alt="Tweet this quote!"
          />
        </a>
        <footer>
          <p>
            &copy; Made by{" "}
            <a href="https://github.com/juancdominici" target="_blank"
            style={{ color: this.state.color }}>
              <span class="code">&lt;</span> Juan Dominici
              <span class="code">&#47;&gt;</span>
            </a>
          </p>
          <p>
            With{" "}
            <a href="https://kanye.rest/" target="_blank"
            style={{ color: this.state.color }}>
              <span class="code">&lt;</span> Kanye.Rest
              <span class="code">&#47;&gt;</span>
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default Container;
