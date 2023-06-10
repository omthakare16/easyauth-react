import React, {useState, useRef, useEffect} from 'react';
import {useUser} from '../../hooks/useUser/useUser.jsx';
import {useEasyauth} from '../../hooks/useEasyauth/useEasyauth.jsx';
import PropTypes from 'prop-types';


export const UserButton = ({position}) => {
  const auth = useEasyauth();
  const {user} = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    auth.removeUser();
  };

  const handleAccount = () => {
    // Redirect to account page
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cardStyle = {
    position: 'absolute',
    top: '50px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
  };

  if (position === 'left') {
    cardStyle.left = '0';
  } else if (position === 'right') {
    cardStyle.right = '0';
  } else {
    cardStyle.right = '0';
  }

  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <button
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          padding: '0',
          border: 'none',
          backgroundColor: '#ccc',
        }}
        onClick={handleButtonClick}
      >
        <img
          src="data:image/png;base64,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"
          style={{width: '100%', height: '100%'}}
        />
      </button>

      {isOpen && (
        <div
          ref={cardRef}
          style={cardStyle}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <img
              src="data:image/png;base64,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"
              alt="Profile Icon"
              style={{width: '30px', height: '30px', marginRight: '10px'}}
            />
            <div
              style={{
                color: 'black',
                fontSize: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user.email}
            </div>
          </div>
          <button
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '5px 10px',
              marginBottom: '10px',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            style={{
              backgroundColor: '#17a2b8',
              color: '#fff',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
            onClick={handleAccount}
          >
            Account
          </button>
        </div>
      )}
    </div>
  );
};

UserButton.propTypes = {
  position: PropTypes.string,
};
