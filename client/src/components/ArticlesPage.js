import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Loading from './images/loading.gif';
import $ from "jquery";


function ArticlesPage(props) {
    const history = useHistory();
    const user = props.currentUser;
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    //If component is loading, fetch article data from database
    useEffect(() => {
        if (isLoading) {
        $.get('/node_get_all_articles').done((data) => {
            if (data.message === "success") {
                setArticles(data.data);
                setIsLoading(false);
            } else {
                alert(data.message);
            }
        });
        }
    });

    return(
        <section id="articles">
        {isLoading ? 
            <div style={{textAlign: "center"}}><img src={Loading} alt="Loading..." style={{margin: "auto", height: "20%", width: "15%"}}/><h3>scrambling eggs. . .</h3></div> 
        : 
        <div className="container-fluid">
            <h1 className="section-header">Read what's cooking.</h1>
            <hr style={{margin: "0 10% 0 10%"}}/>

            {user && <button type="button" className="btn btn-secondary" onClick={() => {
                history.push("/add_article");
            }}>Add Article</button>}

            <div id="article-grid" className="container" style={{marginTop: "8%"}}>
            <div className="row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 " style={{justifyContent: "center"}}>
                {articles.map((article, idx) => {
                    return(
                        <div className="col">
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
                        </div>
                    );
                })
                }
                </div>
            </div>
            </div>
            }
        </section>
    );
}

export default ArticlesPage;