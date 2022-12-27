import './calc.css';
import React from 'react';

function Btn(props){
  
  let cls = 'btn'
  // console.log(props.active)
  if(props.text === 0){
    cls += ' x2'
  }
  if (props.text === props.active){
    cls = "btn active"
    console.log("[ACTIVE] CLICKED: " + props.active)

  }
  if (props.text === "÷" || props.text === "x" || props.text === '-' || props.text === '+' || props.text === '='){
    cls += " orng"
  }
  else if (props.text === "AC" || props.text === "+/-" || props.text === "%" || props.text === "C"){
    cls += " grey"
  }

  return(
    <div className={cls} onClick={props.onClick}>{props.text}</div>
  )
}

class Board extends React.Component{

  generate_button(id, text){

    return (<Btn
      key = {id}
      text = {text}
      active = {this.props.active}
      onClick = {() => this.props.onClick(text)}

    />)
  }

  render(){
  const buttons = ['=',',',0,'+',3,2,1,'-',6,5,4,'x',9,8,7,'÷','%','+/-']
  this.props.isNull ? buttons.push("AC") : buttons.push("C");
  const btns = buttons.reverse().map((value,index) => {
    return this.generate_button(index, value)
  })
  return(
    <div className="board">{btns}</div>
  )
  }
}
function Result(props){
  return(
    <div className="result">{props.result}</div>
  )
}

class Calc extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active : "",
      current : 0,
      num2 : 0,
      next : false,
      isNull : true,
    }
  }

  calculate(btn){
    if (btn === "÷" || btn === "x" || btn === "+" || btn === "-" || btn === "%"){
      this.setState({
        active : btn,
        num2 : this.state.current,
        next : true
      });
    }
    else if (btn === "AC" ){
      this.setState({
        active : "",
        num2 : 0,
        current : 0,
        next : false,
        isNull : true
      })
    }
    else if (btn === "C"){
      this.setState({
        num2 : 0,
        current : 0,
        next : false,
        isNull : true
      })
    }
    else if (btn === "="){
      this.setState({
        next : true,
        num2 : 0,
        active : ""
        
      })
        
        if (this.state.active === "+"){
          this.setState({
            current : this.state.current + this.state.num2,
          })
        }
        else if(this.state.active === "-"){
          this.setState({
            current : this.state.current - this.state.num2,
          })
        }
        else if(this.state.active === "÷"){
          this.setState({
            current : this.state.current / this.state.num2,
          })
        }
        else if(this.state.active === "x"){
          this.setState({
            current : this.state.current * this.state.num2,
          })
        }
    }

    else {
      if (this.state.next){
        this.setState({
          current : btn,
          next : false
        })
      }
      else{
        this.setState({current : Number(this.state.current.toString() + btn.toString()), isNull : false})
      }
    }
  }
  render(){
  return (
      <div className="calc">
        <div className="phone_box">
          <div className="phone-img"></div>
          <div className="inner">
            <Result
              result = {this.state.current}
            />
            <Board
              onClick = {(btn) => this.calculate(btn)}
              active = {this.state.active}
              isNull = {this.state.isNull}
            />
          </div>
        </div>
      </div>
  );}
}

export default Calc;
