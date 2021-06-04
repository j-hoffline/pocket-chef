import React, { useEffect, useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import $ from 'jquery';
import Loading from './images/loading.gif';
const recipe_100 = require('./recipes100.json');

const popular_recs = recipe_100.recipes.slice(1, 11);

function Profile(props) {
    const location = useLocation();
    const [user, setUser] = useState(false);

    //Submits changes to user name or email
    const submitProfileChanges = () => {
        let fullname = $('#fullname');
        let username = $('#username');
        if (!fullname.val() && !username.val()) {
            return;
        } else {
            console.log(fullname.val());
            if (fullname.val()) {
                $.post('/node_user_fullname_change', {user_id: user._id, fullname: fullname.val()}).done((data)=> {
                    if (data.message === "success") {
                        fullname.addClass("input-success");
                    }
                });
            }
            if (username.val()) {
                $.post('/node_user_username_change', {user_id: user._id, username: username.val()}).done((data)=> {
                    if (data.message === "success") {
                        username.addClass("input-success");
                    }
                });
            }
        }
    };

    //Fetches user profile on reload
    useEffect(() => {
        if (!user) {
        $.get('/node_get_current_user').done((data) => {
            if (data.message === "success") {
                setUser(data.data);
            }
        });
    }
    });

    //If page is waiting on data from back end, display loading animation
    if (!user) {
        return(<div style={{textAlign: "center"}}><img src={Loading} alt="Loading..." style={{margin: "auto", height: "15%", width: "15%"}}/><h3>scrambling eggs. . .</h3></div>); 

    } else {
    return(
        <section id="profile-info">
            <h3 className="section-header">Your Profile</h3>
            <div className="container row">
                <div className="col-lg-5 offset-lg-3">
                    <img src="https://ih1.redbubble.net/image.782439743.8716/st,small,845x845-pad,1000x1000,f8f8f8.jpg"
                        style={{height: "30vh", width: "70%", margin: "15%", borderRadius: "50%"}}/>
                </div>
                <div className="col-lg-4">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Name</span>
                        <input type="text" class="form-control" id="fullname" placeholder={user.fullname} aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Email</span>
                        <input type="text" class="form-control" id="username" placeholder={user.username} aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <button type="button" className="btn btn-success" onClick={submitProfileChanges}>Submit Changes</button>
                </div>
            </div>

            <div style={{margin: "2% 5% 2% 5%"}}>
                <h2>Saved Recipes</h2>
                <div className="row flex-row flex-nowrap"
                    style={{whiteSpace: "nowrap", overflowX: "scroll"}}>
                    {user.savedRecipes.map((rec) => {
                        return (
                                <div className="card w-100" style={{width: '100%'}}>
                                    <Link to={{
                                    pathname: "/recipe_detail",
                                    state: {recipe: rec}
                                }}>
                                    <img className="card-img-top" src={rec.image}
                                            alt="Card image cap"/>
                                    <div className="card-body text-wrap">
                                        <h5 className="card-title">{rec.title}</h5>
                                        <p class="card-text"><small class="text-muted">{rec.postedBy}</small></p>
                                    </div>
                                    </Link>
                                </div>
                        )
                    })}            
                </div>
            </div>
            <div style={{marginLeft: "5%"}}>
                <h2>Saved Articles</h2>
                <div className="row flex-row flex-nowrap"
                    style={{width: "100%", overflowX: "scroll"}}>
                {user.savedArticles.map((article, idx) => {
                    return(
                        <div id={idx} className="card">
                        <Link to={{
                            pathname: "/article",
                            state: {
                                article: article
                            }
                        }}>
                            <img src={article.image} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">{article.title}</h5>
                                <p class="card-text"><small class="text-muted">{article.author}</small></p>
                            </div>
                        </Link>
                        </div>
                    );
                })}
                </div>
            </div>
        </section>
    );
            }
}

export default Profile;