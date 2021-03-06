import React,{useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import '../templates/service.css'
import { BiChevronDown } from "react-icons/bi";

const useStyles = makeStyles((theme) =>({
    toTop: {
        zIndex:2,
        position: 'absolute',
        top: '72vh',
        backgroundColor: '#DCDCDC',
        color: 'black',
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: '#397BA6',
            backgroundColor: '#DCDCDC'
        },
        right: '50%',
        margin: '2rem'
    }
}))

const ScrollBottom = ({
    showBelow,
}) => {

    const classes = useStyles();

    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    const handleClick = () => {
        window[`scrollTo`]({ top: document.body.scrollHeight, behavior: `smooth` })
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    return (
        <div>


                {/* <IconButton onClick={handleClick} className={classes.toTop}> */}
                    <BiChevronDown onClick={handleClick} className='scrollBtn'/>


        </div>
    )
}

export default ScrollBottom

