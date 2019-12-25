import React, {Componet} from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Componet {
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todo.completed ?
      'line-thorugh' : 'none'
    }
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <p>{this.props.todo.title}</p>
      </div>
    )
  }
}

// PropTypes
TodoItem.propTypes = {
  todos: PropTypes.array.isRequired
}

export default TodoItem;