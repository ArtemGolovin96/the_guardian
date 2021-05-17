import React, { Component, useEffect, useState } from 'react';

export default function Main () {

    const [arrNews, setNews] = useState([]);
    const [page, setPage] = useState(0);
    const [query1, setQuery] = useState(0)



    function onSubmitForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = [...formData.values()];
        let query = data[0];
        setQuery(query);
        getFatchData(query, 1   ).then((data) => {
            setNews(data.response.results);
        })
    }

    const getFatchData = async (arg, page) => {
        return await fetch(`https://content.guardianapis.com/search?page=${page}&q=${encodeURIComponent(arg)}&api-key=3ae4a796-1d49-4d04-8974-e3962e2fb188`)
        .then((res) => {
            return res.json();
        })
    }


    function onClickPage(e) {
        getFatchData(query1, e.target.textContent).then((data) => {
            setNews(data.response.results);
        })
    }

 

    useEffect(() => {
        getFatchData('', 1).then((data) => {
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
                                    return <ol><a className="pnews"  target="_blank" href={el.webUrl}> {index+1})  {el.webTitle}</a></ol>
                                        })
                            : 
                                <p className="errdata">Введите корректные данные</p>
                        }
                            <section className="buttonpagecontainer">
                                <p className="pagep">Страницы:</p>
                                <button className="pagebutton" onClick={onClickPage}>1</button>
                                <button className="pagebutton" onClick={onClickPage}>2</button>
                                <button className="pagebutton" onClick={onClickPage}>3</button>
                            </section>
                    </section>

            </main>
        )
}