import React, { Component } from 'react';
import { connect } from 'react-redux';

import './FormComponent.scss';

import {addImage, toggleGroup, removeImages, addTag} from '../../redux/image/image.actions';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.gf = 'W71IuhTg3MeFi7Jfk0v36tyUq9IDkr3M';

    this.state = {
      loadImage: false,
      message: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.addImage = this.addImage.bind(this);
    this.removeAllImages = this.removeAllImages.bind(this);
    this.groupImages = this.groupImages.bind(this);
  }
  
  handleInput(e){
    const tag = e.target.value
    if(tag){
      this.props.dispatch(addTag(tag))
    }
  }
  
  async addImage(e){
    const {tag } = this.props;

    if(tag.length > 0){
      
      try {
        this.setState({
          loadImage: true,
          message: ''
        })
        
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${this.gf}&tag=${tag}`);
        const json = await response.json();
        const tagData = {
          id: json.data.id,
          imageUrl: json.data.embed_url,
          tag
        };

        if(json.data.embed_url){
          this.props.dispatch(addImage(tagData))
          this.resetState()
        }else{
          this.resetState('По тегу ничего не найдено')
        }
      } catch (error) {
        console.log(error);
        this.resetState('Произошла http ошибки')
      }
    }else{
      this.setState({
        message: "заполните поле 'тег'"
      })
    }
  }
  removeAllImages(){
    this.props.dispatch(removeImages())
  }
  groupImages(){
    this.props.dispatch(toggleGroup())
  }
  submitForm(e){
    e.preventDefault();
  }
  resetState(message){
    this.setState({
      loadImage: false,
      message
    });
    this.props.dispatch(addTag(''))
  }

  render() {
    const {message, loadImage } = this.state;
    const {tag, group } = this.props;

    return (
      <form className="form" onSubmit={this.submitForm}>
        <div className="form__wrap">
         <input type="text" value={tag}
          name="tag"
          onChange={this.handleInput}
          placeholder="введите тег"
          className="form__input"/>
          <span style={{
            display: message ? 'block' : 'none'
          }}
          className="form__message">{message}</span>
        </div>
       
        <button onClick={this.addImage}
        disabled={loadImage}
        className="form__button form__button_green">{loadImage ? 'Загрузка...' : 'Загрузить'}</button>
        <button onClick={this.removeAllImages}
        className="form__button form__button_red">Очистить</button>
        <button onClick={this.groupImages}
        className="form__button form__button_blue">
        {group ? 'Разгруппировать' : 'Группировать'}</button>
      </form>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    group: state.images.group,
    tag: state.images.tag
  }
};

export default connect(mapStateToProps)(FormComponent);