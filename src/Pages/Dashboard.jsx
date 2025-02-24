import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Header, FilterFood, Foods } from "../Components";
import { useOrderContext } from "../Context/orderContext";
const Dashboard = () => {
  const { isSignedIn } = useOrderContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  if (isSignedIn) {
    return (
      <>
        <Header />
        <div className="mt-28 min-[992px]:filterContainer">
          <FilterFood />
          <section>
            <Foods />
          </section>
        </div>
      </>
    );
  }

  return <h1>Loading...</h1>;
};

export default Dashboard;
