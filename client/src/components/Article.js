import { urlencoded } from 'body-parser';
import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import $ from "jquery";

function Article(props) {
    const location = useLocation();
    const [article, setArticle] = useState(location.state.article);
    const [loading, isLoading] = useState(true);
    const user = props.currentUser;

    //Function to save article to user's profile and displays error if no user is logged in
    const saveArticle = (event) => {
        if (!user) {
            alert("User needs to log in to save articles");
            $('#save-article-btn').removeClass('active');
            return;
        }
        else if (!event.target.classList.contains('active')) {
            //Remove article
            $.post('/node_remove_article', article).done((data) => {
                if (data.message === "success") {
                    $('#save-article-subtext').text('X Article Removed');
                    setTimeout(() => {
                        $('#save-article-subtext').text('');
                    }, 1000);
                }
            })
        } else {
            $.post('/node_save_article', article).done((data) => {
                if (data.message === "success") {
                    $('#save-article-subtext').append('&check; Saved');
                    setTimeout(() => {
                        $('#save-article-subtext').text('');
                    }, 1000);
                }
            });
        }
    };

    //Adds user's comment to article if user has not already commented and displays error otherwise
    const addComment = () => {
        let title = $('#comment-title');
        let description = $('#comment-description');

        if (!title.val()) {
            title.addClass("is-invalid");
            return;
        } else if (!description.val()) {
            description.addClass("is-invalid");
            return;
        }
        if (!user) {
            alert("User must be signed in to comment");
            return;
        }

        const comment = {
            headline: title.val(),
            review: description.val(),
            userName: user.fullname
        }

        $.post("/node_add_comment", {article_id: article._id, user: user, comment: comment}).done((data) => {
            console.log(data);
            if (data.message === "login required") {
                $('#login-modal').addClass("show");
            } else if (data.message === "database error") {
                $('#myAlert').addClass('alert-danger show');
                $('#myAlert').append("<strong>Uh oh!</strong> You have already commented on this article");
            } else {
                title.val("");
                description.val("");

                //Add comment to page
                $('#comments').append(`
                <div key=${document.getElementById('comments').children.length} class="card border-light mb-3 comment-card">
                <div class="card-header">${comment.userName}</div>
                <div class="card-body">
                    <h5 class="card-title">${comment.headline}</h5>
                    <p class="card-text">${comment.review}</p>
                </div>
                </div>
                `);
                
                setArticle({...article, comments: [...article.comments, comment]});
                console.log(article);

                $('#myAlert').addClass('alert-success show');
                $('#myAlert').append("<strong>Congrats!</strong> Your comment has been added.");

            }
        });
    };

    return(
        <article>
            <div className="article-header container-fluid" style={{minHeight: "40vh", position: "relative"}}>
                <img src={article.image} style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}/>
                <div class="article-subtext">
                    <h1 className="">{article.title}</h1>
                    <h5>By: {article.author}</h5>
                    <button id="save-article-btn" type="button" className={user && user.savedArticles.find(item => item._id == article._id) ? "btn btn-outline-light active" : "btn btn-outline-light"} role="button" data-bs-toggle="button" onClick={saveArticle}>Save this Article</button>
                    <p id="save-article-subtext" style={{transitionProperty: "all", transitionDuration: "1s"}}></p>
                </div>
            </div>
            <div className="container article-content">
                {article.content}
                <hr style={{margin: "2% 10% 2% 10%"}}/>
            </div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <h3>Comments: </h3>
                    </div>
                    <div className="col-7"></div>
                    <div className="col">
                        <button type="button" className="btn btn-outline-secondary" onClick={addComment}>Add Comment</button>
                    </div>
                </div>
                <div id="myAlert" class="alert alert-dismissible fade" role="alert">
                    
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div id="add-comment-form" className="container">
                    <div class="mb-3">
                        <label htmlFor="comment-title" class="form-label">Title</label>
                        <input type="text" name="comment-title" class="form-control" id="comment-title" placeholder="Best recipe ever!" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="comment-description" class="form-label">Comment:</label>
                        <textarea class="form-control" id="comment-description" rows="3"></textarea>
                    </div>
                </div>
                <section id="comments">
                    {article.comments.map((comment, idx) => {
                        return(
                        <div key={idx} className="card border-light mb-3 comment-card">
                            <div class="card-header">{comment.userName}</div>
                            <div class="card-body">
                                <h5 class="card-title">{comment.headline}</h5>
                                <p class="card-text">{comment.review}</p>
                            </div>
                        </div>
                        );
                    })}
                </section>
            </div>
        </article>
    );
}

export default Article;