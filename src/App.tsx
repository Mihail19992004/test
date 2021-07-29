import React, {useEffect, useState} from 'react';
import {Search} from "./components/Search";
import axios from "axios";
import {Main} from "./components/Main";
import {IImg} from "./int/Interfaces";
import './styles/App.css'




function App() {
    const [search, setSearch] = useState<string>('')
    const [query, setQuery] = useState<string[]>([])
    const [message, setMessage] = useState<string>('')
    const [img, setImg] = useState<any[]>([])
    const [isGroup, setIsGroup] = useState<boolean>(false)
    const [isLoad, setIsLoad] = useState<boolean>(false)

    const getFetch = async () => {

        try {
            setIsLoad(true)
            let arr:any = []
            if (query[0]==='delay') {

                for (let i = 0; i < 5; i++) {
                    const response = await fetch('https://api.giphy.com/v1/gifs/random?api_key=W3af1n8HdTxy4KrXCvIHfPMjNeP9VFV6&tag=&rating=g')
                    const data = await response.json()

                    arr.push({
                        type: 'delay',
                        photo: data.data.image_url,
                        time: new Date()
                    })
                }
                (function fiveSeconds (n) {

                    setImg(prevState => [...prevState, arr[n]])
                    console.log(n++)

                    if (n < 5) setTimeout( fiveSeconds, 1000, n ); // Redo if n <= 5 (and pass n)

                } (0))
                setIsLoad(false)
                return
            }
            if (query.length === 1) {
                const req = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=W3af1n8HdTxy4KrXCvIHfPMjNeP9VFV6&tag=${query[0]}`)

                if (req?.data?.data?.length === 0) {
                    setMessage('По тегу ничего не найдено')

                    setIsLoad(false)
                    return
                }

                // @ts-ignore
                setImg(prevState => [...prevState, {type: query[0], photo: req.data.data.image_url}])
            }
            if (query.length >=2) {
                let arr: IImg | { type: string; photo: any; }[] = []
                for (let i = 0; i < query!.length; i++) {

                    const req = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=W3af1n8HdTxy4KrXCvIHfPMjNeP9VFV6&tag=${query[i]}`)

                    if (req?.data?.data?.length === 0) {
                        setMessage('По тегу ничего не найдено')

                        setIsLoad(false)
                        return
                    }

                    arr.push({type: query[i].trim(), photo: req.data.data.image_url})


                }

                setImg(prevState => [...prevState, arr])
            }




            setIsLoad(false)
        }catch (e) {
            setIsLoad(false)
            setMessage('Произошла http ошибка')
        }
    }
    useEffect(()=> {
        getFetch()
    }, [query])

  // @ts-ignore
    // @ts-ignore
    return (
    <div className="App" onClick={()=> message ? setMessage('') : null}>
        {
            message ? <div className='message__alert'>
                        <p>{message}</p>
                        </div> : null
        }
      <Search setMessage={setMessage} isLoad={isLoad} setIsGroup={setIsGroup} isGroup={isGroup} setImg={setImg} query={query!} search={search!} setQuery={setQuery} setSearch={setSearch} />
      <div className="container">
          <Main setIsGroup={setIsGroup} isGroup={isGroup} data={img} />
      </div>

     </div>
  );
}

export default App;
