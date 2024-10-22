import headerIcon from "../../assets/home/solution/sparkle.svg";
import featureIcon from "../../assets/home/solution/star.svg";

const SolutionCard = ({ title, description, icon, features }) => {
  return (
    <div className="flex items-center gap-10 even:flex-row-reverse even:bg-white">
      <div className="flex-1">
        <div className="mb-5">
          <img src={headerIcon} alt="Sparkle icon" className="mb-2.5" />
          <span className="text-blue-500 text-[22px] font-semibold ml-[15px]">
            Solution
          </span>
          <h3 className="text-5xl text-gray-800 font-semibold mt-2.5 mb-2.5">
            {title}
          </h3>
          <p className="text-base text-gray-600">{description}</p>
        </div>
        <ul className="list-none p-0">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex mb-2.5 mt-8 text-gray-600 text-base font-semibold items-start gap-1"
            >
              <img
                src={featureIcon}
                alt="feature"
                className="text-blue-500 mr-2.5"
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 max-w-1/2">
        <img
          src={icon}
          alt={`${title} illustration`}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default SolutionCard;
