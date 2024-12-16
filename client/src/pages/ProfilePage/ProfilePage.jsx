import Navbar from '@/layouts/Navbar/Navbar';
import Header from './Header';
import Main from './Main';
import Side from './Side';

function ProfilePage() {
  return (
    // <div>
    //   <Header />
    //   <Main />
    //   <Side />
    // </div>
    <div className="h-full min-h-px overflow-x-hidden bg-secondary p-0">
      <Navbar />
      <Header />
      <div className="md: flex flex-col justify-center overflow-hidden pt-9 md:flex-row">
        <Side />
        {/* <HeaderTabs /> */}
        <Main />
      </div>
    </div>
  );
}

export default ProfilePage;
