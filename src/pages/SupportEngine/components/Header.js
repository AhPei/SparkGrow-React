import closeIcon from './../assets/close-icon.png';

export default function Header({imageUrl, teamName, onClose}) {
  return (
      <div className="sc-header">
        <img className="sc-header--img" src={imageUrl} alt="" />
        <div className="sc-header--team-name"> {teamName} </div>
        <div className="sc-header--close-button" onClick={onClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
    );
}

