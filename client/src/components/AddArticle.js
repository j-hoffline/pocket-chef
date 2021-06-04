import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import $ from 'jquery';

function AddArticle(props) {
    const history = useHistory();
    const [error, setError] = useState("");
    const user = props.currentUser;
    
    //Submit article data to database
    const submitArticle = (event) => {
        event.preventDefault();
        let article = {
            title: $('#title').val(),
            image: $('#imageUrl').val(),
            overview: $('#overview').val(),
            author: user.fullname
        }

        $.post('/node_add_article', article).done((data) => {
            if (data.message === "success") {
                alert("Article Saved")
                $('#title').val("");
                $('#imageUrl').val("");
                $('#overview').val("");
            }
        });
    };

    return(
        <div className="container">
            <h1 className="section-header">Share your expertise.</h1>
            <form onSubmit={submitArticle} method="POST">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" id="title" 
                            placeholder="What do you call your masterpiece?" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL: </label>
                        <input type="text" className="form-control" name="imageUrl" id="imageUrl" 
                            placeholder="https://spaghetti.jpg" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="overview">Overview: </label>
                        <textarea type="text" className="form-control" name="overview" id="overview" 
                            placeholder="What do you want to share about this creation?" style={{height: "200px"}} required></textarea>
                    </div>                   
                    

                    
                    <div style={{color: "red"}}><p>{error}</p></div>
                    <button type="submit" className="btn btn-success m-3">Submit Article</button>
                    <button type="button" className="btn btn-outline-danger m-3" 
                        onClick={()=>{
                            history.goBack();
                        }}>Cancel</button>
                </form>
        </div>
    );
}

export default AddArticle;