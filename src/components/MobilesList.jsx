import { useSelector } from 'react-redux';

function MobilesList() {
  const filteredMobilesList = useSelector((state) => state.filteredMobilesList.filteredMobilesList);

  return (
    <div>
      <h1>MobilesList</h1>
      {filteredMobilesList.map((mobile) => <p key={mobile.id}>{mobile.model}</p>)}
    </div>
  );
}

export default MobilesList;
