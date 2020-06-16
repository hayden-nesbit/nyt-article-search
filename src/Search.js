import React, { useState } from 'react'
import apiKey from './apiKey'
import axios from 'axios'
import logo from "./logo.png"

function Search() {

    const [input, setInput] = useState("")
    const [results, setResults] = useState([])
    console.log(results)

    async function getArticle(e) {

        e.preventDefault()
        await axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + input + "&api-key=" + apiKey)
            .then(response => {
                setResults(response.data.response.docs)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    let showArticles = results.length > 0 ? results.map((item, index) => {
        return (
            <div key={index} className="mb-3">
                <h4>{item.headline.main}</h4>
                <h6>{item.byline.original}</h6>
                <a href={item.web_url} target="_blank">read article</a>
            </div>
        )
    })
        :
        null

    return (
        <>
            <div className="form-inline">
                <a href="https://developer.nytimes.com" target="_blank"><img className="mb-2 mr-2"  src={logo} /></a>
                <form onSubmit={getArticle} className="form-inline my-2 my-lg-0 mb-3">
                    <input onChange={(e) => setInput(e.target.value)} value={input} className="form-control mr-sm-2" type="search" placeholder="Find an article" aria-label="Search" />
                    <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            {showArticles}
        </>
    )
}

export default Search;
