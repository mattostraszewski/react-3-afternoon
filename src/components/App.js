import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';


class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };


  }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(results => {
      this.setState({ ports: results.data })
    })
  }

  updatePost(id, text) { //why am i passing in id and text. how does that bring us closer to out end goal? Explain the URL please.
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text }).then(results => {
      this.setState({ posts: results.data });
    });
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(results => {
      this.setState({ posts: results.data });
    });
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then(results => {
      this.setState({ posts: results.data });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />

          {
            posts.map(elem => (
              <Posts key={elem.id} text={elem.text} date={elem.date} id={post.id}
                updatePostFn={this.updatePost} deletePostFn={this.deletePost} /> //Please explain what this is doing? 
            ))
          }

        </section>
      </div>
    );
  }
}

export default App;
