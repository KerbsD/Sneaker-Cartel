import { Link } from 'react-router-dom';

function NavLink(props) {
    return (
        <Link to={props.link}>
            <p className={ props.isScroll ? 'text-center text-sm my-5 md:text-xl md:text-zinc-950 md:my-0' : 'text-center text-sm my-5 md:text-xl md:text-zinc-50 md:my-0'}>{props.label}</p>
        </Link>
    )
}

export default NavLink;