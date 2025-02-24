import { useOrderContext } from "../Context/orderContext";
import Header from "../Components/Header";

const Profile = () => {
  const { userDetails, user, frequentOrder } = useOrderContext();

  return (
    <>
      <Header />
      <section className="px-[25px] max-w-[1440px] py-4 mt-20  relative h-[80vh]">
        <div className="flex h-full gap-6 max-[730px]:flex-col">
          <div className="flex flex-col items-center bg-bgWhite h-full py-5 px-4 relative">
            {user && user.imageUrl ? (
              <img src={user.imageUrl} alt="" className="w-28 rounded-full" />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-200" />
            )}
            <h1 className="text-textMd mt-2 font-semibold">
              {userDetails.fullN}
            </h1>
            <p className="text-textSm text-gray-500">{userDetails.email}</p>
          </div>

          <div className="flex flex-col border border-gray-300 shadow-md py-4 px-3 rounded-lg w-full ">
            {user && user.username ? (
              <p className="mb-4 text-textMd font-semibold">
                {user.username} your most orders are...{" "}
              </p>
            ) : (
              <p className="mb-4 text-textMd font-semibold">loading...</p>
            )}

            {frequentOrder.map((orders, i) => (
              <div
                className="bg-bgWhite p-3 mt-3 flex items-center justify-between flex-wrap "
                key={i}
              >
                {orders.name}
                <p className="font-bold ">({orders.count})</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
