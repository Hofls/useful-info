* Minimal component:
    ```
   class HiMessage extends React.Component {
     render() {
       return (
         <div>
           Hi {this.props.name}
         </div>
       );
     }
   }
    ```
* Render component:
    ```
    ReactDOM.render(
     <HiMessage name="John" />,
     document.getElementById('greetings-elem')
    );
    ```
* State:
    ```
    // set state in constructor:
    this.state = { seconds: 0 };
    // update/read in methods:
    this.setState(state => ({
        seconds: state.seconds + 1; // Also calls render() to show new value
    }));
    console.log(this.state.seconds)
    ```
* Board contains squares. How square can change board's state?
    ```
    <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
    />
    ```
* Function component (it's a render without state)
    ```
    function Square(props) {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
    }
    ```
* External plugins:
    ```
    this.md = new Remarkable();
    this.md.render(this.state.value)
    ```
* Properties (props):
    ```
    // pass property "hint":
    return <Square hint={i} />;
    // use property "hint":
    <button className="square">
        {this.props.hint}
    </button>
    ```
* Events:
    * `<button onClick={() => console.log('click')}>`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
* zz
    * `xx`
