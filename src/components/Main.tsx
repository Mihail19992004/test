import React, {FC, useState} from "react";

import {Group} from "./Group";





interface IMain {
    data: any[]
    isGroup: boolean,
    setIsGroup: any
}


export const Main:FC<IMain> = ({  data, setIsGroup, isGroup}) => {

    if (isGroup) {


        const arr = data.flat().map(e=> e.type).sort()

        const set =Array.from(new Set(arr))
        console.log(arr, 'set')

        return <Group types={set} img={data.flat()} isGroup={isGroup} />
    }

    return (
        <div className='main__block'>
            {
                data.map(e=>typeof e.photo === 'string' ?
                    <div className='main__block-image'>
                        <img src={e.photo} alt=""/>
                    </div>

                    :
                    <div className='main__block-many-image'>
                        {
                            e.map((el: { photo: string | undefined; })=>
                                <div className='main__block-many-image-border'>
                                    <img src={el.photo} alt=""/>
                                </div>

                            )
                        }
                    </div>)
            }
        </div>
    )
}