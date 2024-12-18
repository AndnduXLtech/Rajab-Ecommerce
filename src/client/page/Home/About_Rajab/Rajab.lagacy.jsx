import brandImage from "@/assets/bathtub-brand.jpg";
import DeidcateTeam from "@/assets/Dedicate_team.jpg";

const Rajablagacy = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap bg-gray-50 p-10 font-sans">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg border">
        <div className="text-center mb-6">
          <p className="text-orange-500 font-semibold text-sm">Our Legacy</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mt-2">
            Rooted in the Industry
          </h2>
        </div>
        <p className="text-gray-600 text-sm lg:text-base leading-6">
          We take pride in our extensive knowledge and experience in the UAE
          contracting industry and have had the pleasure of working with some of
          the largest government and private companies. Our presence in the
          region is widespread, with showrooms located in Rolla, Sajaa
          Industrial Area, Sharjah Industrial Area, and Kalba, and a warehouse
          in Sajaa Industrial Area.
        </p>
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-teal-500 text-lg">
              <i className="fas fa-award"></i>
            </span>
            <p className="text-gray-800 font-medium">27 Years of Trust</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-teal-500 text-lg">
              <i className="fas fa-gem"></i>
            </span>
            <p className="text-gray-800 font-medium">Premium Brands</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-teal-500 text-lg">
              <i className="fas fa-users"></i>
            </span>
            <p className="text-gray-800 font-medium">Dedicated Team</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-teal-500 text-lg">
              <i className="fas fa-network-wired"></i>
            </span>
            <p className="text-gray-800 font-medium">Wide Network</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-teal-500 text-lg">
              <i className="fas fa-shopping-cart"></i>
            </span>
            <p className="text-gray-800 font-medium">Shop Online</p>
          </div>
        </div>
        <div className="mt-6">
          <a
            href="#"
            className="text-teal-500 hover:underline font-medium text-sm"
          >
            Our Brands &gt;
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-6 flex flex-col gap-6 border rounded-lg">
        {/* Image Card 1 */}
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <img
            src={brandImage}
            alt="Premium Brands"
            className="w-full h-[28vh] object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-white rounded px-3 py-1 shadow text-gray-800 font-medium text-sm">
            Premium Brands
          </div>
        </div>

        {/* Image Card 2 */}
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <img
            src={DeidcateTeam}
            alt="Dedicated Team"
            className="w-full h-[28vh] object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-white rounded px-3 py-1 shadow text-gray-800 font-medium text-sm">
            Dedicated Team
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rajablagacy;
