import React, { useEffect, useRef, useState } from 'react'
import apple from '/apple.png'
import orange from '/orange.png'
import banana from "/banana.png"
import cherry from '/cherry.png'
import mango from '/mango.png'
import anar from '/anar.png'
import watermelon from '/watermelon.png'
import strawberry from '/strawberry.png'
import Q_Mark from '/Q_Mark.png'
import Restart from './Restart'
// import { useDispatch, useSelector } from 'react-redux'
// import { check } from '../Features/gameSlice'

let dummy = []
let newArr = []
let idnewArr = []
const PlayGround = () => {
    // const dispatch = useDispatch()
    // const { swapCheck } = useSelector((state) => state.game)
    
    const [count, setcount] = useState(0)

  
    /*******This function generate the random image and id for playing game   */
    // const [newArr, setnewArr] = useState([])
    // const [idnewArr, setidnewArr] = useState([])
    let imgArr = [apple, banana, cherry, orange, mango, anar, watermelon, strawberry]
    let idArr = [1, 2, 3, 4, 5, 6, 7, 8]
    let datagenerate = () => {
        let x = 0;
        while (newArr.length !== 16) {
            let random = Math.round(Math.random() * 7);
            if (newArr.length === 0) {
                newArr.push(imgArr[random])
                idnewArr.push(idArr[random])
            } else {
                for (let i = 0; i < newArr.length; i++) {
                    if (newArr[i] === imgArr[random]) {
                        x += 1
                    }
                }
                if (x === 0 || x === 1) {
                    newArr.push(imgArr[random])
                    idnewArr.push(idArr[random])
                }
            }
            x = 0;
        }
    }

    useEffect(() => {
        datagenerate()
    }, [])


    /*********This function for playing when click the image and its show the changes */
    let play = (e) => {
        if (e.target.tagName === 'IMG') {
            let val = e.target.parentElement.value
            if (e.target.src.includes(Q_Mark)) {
                e.target.src = newArr[val]
                e.target.alt = idnewArr[val]
                setcount(count + 1)
                dummy.push(idnewArr[val])
                for (let i = 0; i < dummy.length; i++) {
                    if (dummy[i] === dummy[i + 1] || dummy[i] === dummy[i - 1]) {
                    } else {
                        if (dummy.length % 2 === 0) {
                            dummy.splice(i, dummy.length)
                        }
                    }
                }
            }
        }
    }

    let ul = useRef();
    let lists;

    //*** This function swapping the image if its not same  */
    useEffect(() => {
        lists = ul.current.children;
        if (dummy.length === 0) {
            setTimeout(() => {
                Array.from(lists).forEach((li) => {
                    li.firstChild.src = Q_Mark
                    li.firstChild.alt = ''
                })
            }, 300)
        } else {
            if (count % 2 == 0) {
                setTimeout(() => {
                    Array.from(lists).forEach((li) => {
                        if (!dummy.includes(Number(li.firstChild.alt))) {
                            li.firstChild.src = Q_Mark
                            li.firstChild.alt = ''
                        }
                    })
                }, 300)
            }
        }
    }, [count])


    //** The function for bounce the images   */
    useEffect(() => {
        lists = ul.current.children;
        setInterval(() => {
            let random = Math.round(Math.random() * 15);
            lists[random].firstChild.style.animation = "example 0.2s ease-in-out 3";
            random > 5 ? random -= 2 : random += 2
            lists[random].firstChild.style.animation = "example 0.2s ease-in-out 3";
            setTimeout(() => {
                Array.from(lists).forEach((li) => {
                    li.firstChild.style = "none"
                })

            }, 2000)
        }, 4000)
    }, [])

    let bestScore  = JSON.parse(localStorage.getItem('bestScore'));
    if(!bestScore  && dummy.length === 16){
        localStorage.setItem("bestScore", JSON.stringify(count));
    }else{
        if(dummy.length === 16 && bestScore > count){
            localStorage.setItem("bestScore", JSON.stringify(count));
        }
    }
    bestScore  = JSON.parse(localStorage.getItem('bestScore'));
    if(bestScore === null){
        bestScore = 0
    }
    return (
        <>
               <div className="header">
                <h3>Score : {count}</h3>
                <h3>Best Score : {bestScore}</h3>
               </div>
            <div className="play_ground">
                <ul ref={ul}>
                    <li onClick={play} value="0"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="1"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="2"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="3"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="4"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="5"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="6"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="7"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="8"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="9"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="10"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="11"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="12"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="13"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="14"><img src={Q_Mark} alt="" /></li>
                    <li onClick={play} value="15"><img src={Q_Mark} alt="" /></li>
                </ul>
            </div>
            {dummy.length === 16 && <Restart score={count} bestScore={bestScore}/>  }
        </>

    )
}

export default PlayGround

