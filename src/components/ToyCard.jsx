import React, { Component } from 'react';

class ToyCard extends Component {
  handleDonateClick = () => {
    this.props.donateToy(this.props.id)
  }

  handleLikeClick = () => {
    this.props.likeToy(this.props.id, this.props.likes)
  }


  render() {
    return (
      <div className="card">
        <h2>{this.props.name}</h2>
        <img src={this.props.image} alt={this.props.name} className="toy-avatar" />
        <p>{this.props.likes} Likes </p>
        <button className="like-btn" onClick={this.handleLikeClick}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleDonateClick}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
