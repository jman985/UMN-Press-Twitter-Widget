import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import Typography from '@material-ui/core/Typography';


const Nav = (props) => (
  <div className="nav" style={{display:"flex",flexDirection:"column"}}>
    <Link className="link-bar" to="/publications">
      <Typography variant='h4' className="nav-title">University of MN Twitter Admin</Typography>
    </Link>
    <div className="nav-right" style={{display:"flex",width:"100%",justifyContent: "space-around"}}>
      <Link className="nav-link" to="/upload" style={{width:"100%",borderRight:'2px solid black'}}>
        {/* Show this link if they are logged in or not,
        but call this link 'Upload Csv' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 
          <Typography variant='h5'>Upload Csv</Typography>
          : 
          <Typography variant='h5'>Login / Register</Typography>
        }
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/publications" style={{width:"100%",borderRight:'2px solid black'}}>
          <Typography variant='h5'>Publications</Typography>
          </Link>
          <Link className="nav-link" to="/tweets" style={{width:"100%",borderRight:'2px solid black'}}>
          <Typography variant='h5'>Tweets</Typography>
          </Link>

          <LogOutButton className="nav-link" />
        </>
      )}

    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
