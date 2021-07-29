import React, {ChangeEvent, FC} from "react";

interface ISearch {
    search: string,
    query: string[]
    setSearch: any,
    setQuery: any,
    setImg: any,
    isGroup: boolean,
    setIsGroup: any,
    isLoad: boolean
    setMessage: any
}


export const Search: FC<ISearch> = ({ search, isGroup, setIsGroup, setImg, query, setQuery, setSearch, isLoad, setMessage}) => {
    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        let value = e.target.value

        value = value.replace(/[^A-Za-z ,]/ig, '')
        setSearch(value)

    }
    function clearHandler() {
        setImg([])
        setSearch('')
    }
    function submitHandler() {
        if (!search) {
            setMessage("заполните поле 'тег'")
            return
        }


        console.log(search)
        setQuery([...search.replaceAll(' ','').split(',')])


    }
    function groupHandler() {
        setIsGroup(!isGroup)
    }

    return (
        <div className="search__block">
            <input className="search__block-input " type="text" value={search} onChange={handleInput}/>
            {
                !isLoad ? <div className="search__block-button green" onClick={submitHandler}>Загрузить</div>
                    : <div className="search__block-button blocked">Загрузка...</div>
            }

            <div className="search__block-button red" onClick={clearHandler}>Очистить</div>
            {
                !isGroup ? <div className="search__block-button blue" onClick={groupHandler}>Групировать</div>
                    : <div className="search__block-button blue" onClick={groupHandler}>Разгрупировать</div>
            }
        </div>
    )
}