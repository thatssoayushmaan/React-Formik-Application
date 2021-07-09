import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "./Form";
const URL = `https://jsonplaceholder.typicode.com/posts`;

export default function Container() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  const getPosts = async () => {
    const { data } = await axios.get(URL);
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const initialValues = {
    id: "",
    userId: "",
    title: "",
    body: ""
  };

  const onSubmit = (values, onSubmitProps) => {
    //console.log(values);
    if (values.id) {
      updatePost(values);
      setEditPost(null);
      onSubmitProps.resetForm();
    } else {
      createPost(values);
    }

    onSubmitProps.resetForm();
  };

  const createPost = async ({ userId, title, body }) => {
    //console.log(userId, title, body);
    const { data } = await axios.post(URL, { userId, title, body });

    setPosts([...posts, data]);
  };

  const deletePost = async (postId) => {
    await axios.delete(`${URL}/${postId}`);
    setPosts(posts.filter((post) => post.id === postId));
  };

  const selectData = (post) => {
    setEditPost(post);
  };

  const updatePost = (values) => {
    let postsData = [...posts];
    const postIndex = postsData.findIndex((post) => post.id === values.id);
    posts[postIndex] = values;
    setPosts(posts);
  };

  const validationSchema = Yup.object({
    userId: Yup.number()
      .typeError("UserId must be a number")
      .positive("UserId must be greater than zero"),
    title: Yup.string().required("Required"),
    body: Yup.string().required("Required")
  });

  return (
    <Formik
      initialValues={editPost || initialValues}
      onSubmit={onSubmit}
      validateOnMount
      enableReinitialize
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <div>
            <Form />
            <table>
              <thead>
                <tr>
                  <td>Id</td>
                  <td>UserId</td>
                  <td>Title</td>
                  <td>Body</td>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => {
                  return (
                    <tr key={post.id}>
                      <th scope="row">{post.id}</th>
                      <td>{post.userId}</td>
                      <td>{post.title}</td>
                      <td>{post.body}</td>
                      <td>
                        <button onClick={() => selectData(post)}>Edit</button>
                        <button onClick={() => deletePost(post)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }}
    </Formik>
  );
}
