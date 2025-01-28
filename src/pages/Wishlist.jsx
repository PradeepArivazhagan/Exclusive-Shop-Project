const Wishlist = () => {
  return (
    <div className="min-h-lvh bg-slate-100 pt-19 pb-10 md:pt-20 lg:px-28">
      <div className="my-2 min-h-lvh bg-white rounded-xs p-4">
        <h1 className="text-2xl font-semibold">Your WishList</h1>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* {productList.map((product) => (
            <Product key={product.id} productDetails={product} />
          ))} */}
          wishlist
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
