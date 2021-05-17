import React, { Component, useEffect, useState } from 'react';

export default function Main () {

    const [arrNews, setNews] = useState([]);



    function onSubmitForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = [...formData.values()];
        let query = data[0];
        getFatchData(query).then((data) => {
            setNews(data.response.results);
        })
    }

    const getFatchData = async (arg) => {
        return await fetch(`https://content.guardianapis.com/search?q=${arg}&api-key=3ae4a796-1d49-4d04-8974-e3962e2fb188`)
        .then((res) => {
            return res.json();
        })
    }

 

    useEffect(() => {
        getFatchData().then((data) => {
            setNews(data.response.results);
        })
        
    }, [])


        return (
            <main className="main">
                <form className="inputform" placeholder="Поиск" onSubmit={onSubmitForm}>
                    <input placeholder="Поиск" name="search" className="input"></input>
                    <button type="submit" className="button">Поиск Новостей</button>
                    </form>
                    <section className="newslist">
                        { 
                            (arrNews && arrNews.length > 0)
                            ?
                                arrNews.map((el, index) => {
                                    return <ol><a className="pnews" href={el.webUrl}> {index+1})  {el.webTitle}</a></ol>
                                        })
                            : 
                                <p className="errdata">Введите корректные данные</p>
                        }
                    </section>
            </main>
        )
}