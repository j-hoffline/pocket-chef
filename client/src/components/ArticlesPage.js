import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Img1 from "./images/carousel/mealplanning.jpg";
import Img2 from "./images/carousel/cooking.jpg";
import Img3 from "./images/carousel/couple-cooking.jpg";
import Loading from './images/loading.gif';
import $ from "jquery";

let imgArr = [
    {
        img: Img1,
        title: "Mealplanning - How to get started",
        description: "Tips and Tricks on planning your meals"
    },
    {
        img: Img2,
        title: "Cooking for Beginners",
        description: "Learning how to cook? Here's how to get started."
    }, 
    {
        img: Img3,
        title: "Reigniting Your Family's Love of Cooking",
        description: "Time to dust off the dinner table."
    },
    {
        img: Img3,
        title: "Reigniting Your Family's Love of Cooking",
        description: "Time to dust off the dinner table."
    },
    {
        img: Img3,
        title: "Reigniting Your Family's Love of Cooking",
        description: "Time to dust off the dinner table."
    },
    {
        img: Img3,
        title: "Reigniting Your Family's Love of Cooking",
        description: "Time to dust off the dinner table."
    },
];


function ArticlesPage() {
    const [isLoading, setIsLoading] = useState(true);
        
setTimeout(()=> {
    setIsLoading(false);
    console.log("hi: ", isLoading);
}, 2000);

    return(
        <section id="articles">
        {isLoading ? 
            <div style={{textAlign: "center"}}><img src={Loading} alt="Loading..." style={{margin: "auto", height: "15%", width: "15%"}}/><h3>scrambling eggs. . .</h3></div> 
        : 
        <div className="container-fluid">
            <h1 className="section-header">Read what's cooking.</h1>
            <hr style={{margin: "0 10% 0 10%"}}/>

            <div id="article-grid" className="container" style={{marginTop: "8%"}}>
            <div className="row row-cols-xs-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 g-4" style={{justifyContent: "center"}}>
                {imgArr.map((article, idx) => {
                    return(
                        <div id={idx} className="card">
                        <a href={"/article?article_id=" + idx}>
                            <img src={article.img} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">{article.title}</h5>
                                <p class="card-text">{article.description}</p>
                                <p class="card-text"><small class="text-muted">Author</small></p>
                            </div>
                        </a>
                        </div>
                            // <div id={idx} className="col-6 article-card">
                            //     <a href={"/article?article_id=" + idx}>
                            //         <img src={article.img}/>
                            //         <div className="article-card-text">
                            //             <h4>{article.title}</h4>
                            //             <p>{article.description}</p>
                            //         </div>
                            //     </a>
                            // </div>
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