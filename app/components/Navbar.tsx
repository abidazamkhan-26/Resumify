import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar backdrop-blur-md bg-white/80 border border-white/20 shadow-sm sticky top-4 z-50">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                    R
                </div>
                <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">RESUMIFY</p>
            </Link>
            <Link to="/upload" className="primary-button w-fit shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar
