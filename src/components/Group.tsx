import React, {FC} from "react";
import {IImg} from "../int/Interfaces";

interface IGroup {
    img: IImg[]
    isGroup: boolean,
    types: string[]
}

export const Group:FC<IGroup> = ({isGroup, img, types}) => {
    console.log(img)
    // @ts-ignore
    return (
        <div>
            {
                types.map(e=> (

                    <div className={e + ' grouped'}>
                        <p>{e}</p>
                        <div className="photo-group">
                            {
                                img.map(el=>

                                    el.type === e ? (
                                    <div className='main__block-image'>
                                        {

                                           typeof el.photo === 'string' ? <img src={el.photo}  alt=""/> : ''
                                        }

                                    </div>

                                ): null)
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}